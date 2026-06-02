// backend/src/middleware/authMiddleware.js
import jwt from "jsonwebtoken";
import { db } from "../config/firebaseAdmin.js";

export async function protect(req, res, next) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized. No token provided."
      });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const userDoc = await db.collection("users").doc(decoded.uid).get();

    if (!userDoc.exists) {
      return res.status(401).json({
        success: false,
        message: "User no longer exists"
      });
    }

    const userData = userDoc.data();

    if (userData.status !== "ACTIVE") {
      return res.status(403).json({
        success: false,
        message: "Account is not active"
      });
    }

    req.user = {
      uid: userData.uid,
      email: userData.email,
      role: userData.role
    };

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token"
    });
  }
}