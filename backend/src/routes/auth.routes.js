// backend/src/routes/auth.routes.js
import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { db } from "../config/firebaseAdmin.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

const createToken = (user) => {
  return jwt.sign(
    {
      uid: user.uid,
      email: user.email,
      role: user.role
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN || "7d"
    }
  );
};

// SIGNUP
router.post("/signup", async (req, res, next) => {
  try {
    const {
      firstName,
      lastName,
      email,
      phone,
      district,
      address,
      password,
      confirmPassword
    } = req.body;

    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "First name, last name, email and password are required"
      });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Passwords do not match"
      });
    }

    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 8 characters"
      });
    }

    const normalizedEmail = email.toLowerCase().trim();

    const existingUserSnapshot = await db
      .collection("users")
      .where("email", "==", normalizedEmail)
      .limit(1)
      .get();

    if (!existingUserSnapshot.empty) {
      return res.status(409).json({
        success: false,
        message: "Email already registered"
      });
    }

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
      status: "ACTIVE",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    await userRef.set(userData);

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
      message: "Signup successful",
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
      return res.status(400).json({
        success: false,
        message: "Email and password are required"
      });
    }

    const normalizedEmail = email.toLowerCase().trim();

    const userSnapshot = await db
      .collection("users")
      .where("email", "==", normalizedEmail)
      .limit(1)
      .get();

    if (userSnapshot.empty) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password"
      });
    }

    const userDoc = userSnapshot.docs[0];
    const userData = userDoc.data();

    if (userData.status !== "ACTIVE") {
      return res.status(403).json({
        success: false,
        message: "Your account is not active"
      });
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      userData.passwordHash
    );

    if (!isPasswordCorrect) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password"
      });
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

    return res.json({
      success: true,
      message: "Login successful",
      token,
      user: safeUser
    });
  } catch (error) {
    next(error);
  }
});

// GET LOGGED-IN USER
router.get("/me", protect, async (req, res, next) => {
  try {
    const userDoc = await db.collection("users").doc(req.user.uid).get();

    if (!userDoc.exists) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

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

    res.json({
      success: true,
      user: safeUser
    });
  } catch (error) {
    next(error);
  }
});

// LOGOUT
router.post("/logout", protect, async (req, res) => {
  return res.json({
    success: true,
    message: "Logout successful. Please remove token from frontend."
  });
});

export default router;