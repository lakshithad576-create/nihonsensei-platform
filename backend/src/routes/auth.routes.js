// backend/src/routes/auth.routes.js
import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer"; // 👈 Required for sending emails
import { db } from "../config/firebaseAdmin.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// 📧 Setup Email Transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER, // e.g., your_email@gmail.com
    pass: process.env.EMAIL_PASS  // e.g., your_app_password
  }
});

const createToken = (user) => {
  return jwt.sign(
    { uid: user.uid, email: user.email, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || "7d" }
  );
};

// 1️⃣ NEW ROUTE: Request OTP (Does NOT create a user yet)
router.post("/send-otp", async (req, res, next) => {
  try {
    const { email } = req.body;
    
    if (!email) return res.status(400).json({ success: false, message: "Email is required" });
    const normalizedEmail = email.toLowerCase().trim();

    // Check if the user is already fully registered
    const existingUser = await db.collection("users").where("email", "==", normalizedEmail).limit(1).get();
    if (!existingUser.empty) {
      return res.status(409).json({ success: false, message: "This email is already registered." });
    }

    // Generate a 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = Date.now() + 10 * 60 * 1000; // Expires in 10 mins

    // Save OTP temporarily in a separate Firestore collection
    await db.collection("otps").doc(normalizedEmail).set({
      otp,
      expiresAt
    });

    // Send the email
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: normalizedEmail,
      subject: 'Your NihonSensei Verification Code',
      html: `<h2>Welcome to NihonSensei!</h2>
             <p>Your verification code is: <b style="font-size: 24px; color: #de1d4d; letter-spacing: 2px;">${otp}</b></p>
             <p>This code will expire in 10 minutes.</p>`
    };

    await transporter.sendMail(mailOptions);

    res.json({ success: true, message: "OTP sent successfully" });
  } catch (error) {
    next(error);
  }
});


// 2️⃣ UPDATED ROUTE: Verify OTP & Create Account
router.post("/signup", async (req, res, next) => {
  try {
    const { firstName, lastName, email, phone, district, address, password, confirmPassword, otp } = req.body;

    if (!firstName || !lastName || !email || !password || !otp) {
      return res.status(400).json({ success: false, message: "All fields and OTP are required" });
    }

    if (password !== confirmPassword) return res.status(400).json({ success: false, message: "Passwords do not match" });
    if (password.length < 8) return res.status(400).json({ success: false, message: "Password must be at least 8 characters" });

    const normalizedEmail = email.toLowerCase().trim();

    // STEP A: Verify the OTP
    const otpDocRef = db.collection("otps").doc(normalizedEmail);
    const otpDoc = await otpDocRef.get();

    if (!otpDoc.exists) {
      return res.status(400).json({ success: false, message: "No OTP found. Please request a new code." });
    }

    const otpData = otpDoc.data();
    
    if (otpData.otp !== otp) {
      return res.status(400).json({ success: false, message: "Invalid verification code." });
    }
    
    if (Date.now() > otpData.expiresAt) {
      return res.status(400).json({ success: false, message: "Verification code has expired." });
    }

    // STEP B: OTP is valid! Now we actually create the user account.
    const passwordHash = await bcrypt.hash(password, 10);
    const userRef = db.collection("users").doc();

    const userData = {
      uid: userRef.id,
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: normalizedEmail,
      phone: phone || "",
      district: district || "",
      address: address || "",
      passwordHash,
      role: "student",
      status: "ACTIVE", // Created directly as an active user!
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    await userRef.set(userData);

    // Clean up the used OTP so it can't be used again
    await otpDocRef.delete();

    // Generate Token
    const token = createToken(userData);

    const safeUser = {
      uid: userData.uid,
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
      phone: userData.phone,
      district: userData.district,
      address: userData.address,
      role: userData.role,
      status: userData.status
    };

    return res.status(201).json({
      success: true,
      message: "Account created successfully",
      token,
      user: safeUser
    });
  } catch (error) {
    next(error);
  }
});

// LOGIN
router.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Email and password are required" });
    }

    const normalizedEmail = email.toLowerCase().trim();
    const userSnapshot = await db.collection("users").where("email", "==", normalizedEmail).limit(1).get();

    if (userSnapshot.empty) {
      return res.status(401).json({ success: false, message: "Invalid email or password" });
    }

    const userDoc = userSnapshot.docs[0];
    const userData = userDoc.data();

    if (userData.status !== "ACTIVE") {
      return res.status(403).json({ success: false, message: "Your account is not active" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, userData.passwordHash);

    if (!isPasswordCorrect) {
      return res.status(401).json({ success: false, message: "Invalid email or password" });
    }

    const token = createToken(userData);

    const safeUser = {
      uid: userData.uid,
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
      phone: userData.phone,
      district: userData.district,
      address: userData.address,
      role: userData.role,
      status: userData.status
    };

    return res.json({ success: true, message: "Login successful", token, user: safeUser });
  } catch (error) {
    next(error);
  }
});

// GET LOGGED-IN USER
router.get("/me", protect, async (req, res, next) => {
  try {
    const userDoc = await db.collection("users").doc(req.user.uid).get();

    if (!userDoc.exists) return res.status(404).json({ success: false, message: "User not found" });

    const userData = userDoc.data();

    const safeUser = {
      uid: userData.uid,
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
      phone: userData.phone,
      district: userData.district,
      address: userData.address,
      role: userData.role,
      status: userData.status
    };

    res.json({ success: true, user: safeUser });
  } catch (error) {
    next(error);
  }
});

// LOGOUT
router.post("/logout", protect, async (req, res) => {
  return res.json({ success: true, message: "Logout successful. Please remove token from frontend." });
});

export default router;