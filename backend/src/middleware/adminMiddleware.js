// backend/src/middleware/adminMiddleware.js
import { db } from "../config/firebaseAdmin.js";

export async function adminOnly(req, res, next) {
  try {
    const userDoc = await db.collection("users").doc(req.user.uid).get();

    if (!userDoc.exists) {
      return res.status(403).json({
        success: false,
        message: "User profile not found"
      });
    }

    const userData = userDoc.data();

    if (userData.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Admin access required"
      });
    }

    req.userProfile = userData;
    next();
  } catch (error) {
    next(error);
  }
}