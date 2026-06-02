// backend/src/routes/category.routes.js
import express from "express";
import { db } from "../config/firebaseAdmin.js";
import { protect } from "../middleware/authMiddleware.js";
import { adminOnly } from "../middleware/adminMiddleware.js";

const router = express.Router();

router.get("/", protect, async (req, res, next) => {
  try {
    const snapshot = await db.collection("categories").orderBy("createdAt", "desc").get();

    const categories = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    res.json({
      success: true,
      data: categories
    });
  } catch (error) {
    next(error);
  }
});

router.post("/", protect, adminOnly, async (req, res, next) => {
  try {
    const { name } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({
        success: false,
        message: "Category name is required"
      });
    }

    const docRef = await db.collection("categories").add({
      name: name.trim(),
      createdAt: new Date().toISOString(),
      createdBy: req.user.uid
    });

    res.status(201).json({
      success: true,
      message: "Category created",
      data: {
        id: docRef.id,
        name: name.trim()
      }
    });
  } catch (error) {
    next(error);
  }
});

export default router;