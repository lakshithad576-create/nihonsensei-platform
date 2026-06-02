// backend/src/routes/student.routes.js
import express from "express";
import { db } from "../config/firebaseAdmin.js";
import { protect } from "../middleware/authMiddleware.js";
import { adminOnly } from "../middleware/adminMiddleware.js";

const router = express.Router();

router.get("/", protect, adminOnly, async (req, res, next) => {
  try {
    const snapshot = await db.collection("users").get();

    const students = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    res.json({
      success: true,
      data: students
    });
  } catch (error) {
    next(error);
  }
});

router.patch("/:uid/permissions", protect, adminOnly, async (req, res, next) => {
  try {
    const { uid } = req.params;
    const { permissions } = req.body;

    await db.collection("users").doc(uid).update({
      permissions,
      updatedAt: new Date().toISOString()
    });

    res.json({
      success: true,
      message: "Student permissions updated"
    });
  } catch (error) {
    next(error);
  }
});

export default router;