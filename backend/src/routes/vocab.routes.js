// backend/src/routes/vocab.routes.js
import express from "express";
import { db } from "../config/firebaseAdmin.js";
import { protect } from "../middleware/authMiddleware.js";
import { adminOnly } from "../middleware/adminMiddleware.js";

const router = express.Router();

router.get("/today", async (req, res, next) => {
  try {
    const doc = await db.collection("daily_vocab").doc("today").get();

    res.json({
      success: true,
      data: doc.exists ? doc.data() : { words: [] }
    });
  } catch (error) {
    next(error);
  }
});

router.put("/today", protect, adminOnly, async (req, res, next) => {
  try {
    const { words } = req.body;

    if (!Array.isArray(words) || words.length !== 5) {
      return res.status(400).json({
        success: false,
        message: "Exactly 5 vocabulary words are required"
      });
    }

    await db.collection("daily_vocab").doc("today").set({
      words,
      updatedAt: new Date().toISOString(),
      updatedBy: req.user.uid
    });

    res.json({
      success: true,
      message: "Daily vocabulary updated"
    });
  } catch (error) {
    next(error);
  }
});

export default router;