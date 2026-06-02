// backend/src/routes/vocab.routes.js
import express from "express";
import { db } from "../config/firebaseAdmin.js";
import { protect } from "../middleware/authMiddleware.js";
import { adminOnly } from "../middleware/adminMiddleware.js";

const router = express.Router();

router.get("/today", async (req, res, next) => {
  try {
    const doc = await db.collection("daily_vocab").doc("today").get();

    return res.json({
      success: true,
      data: doc.exists
        ? doc.data()
        : {
            words: [],
          },
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
        message: "Exactly 5 vocabulary words are required.",
      });
    }

    const cleanedWords = words.map((word, index) => ({
      id: index + 1,
      kanji: String(word.kanji || "").trim(),
      romaji: String(word.romaji || "").trim(),
      meaning: String(word.meaning || "").trim(),
    }));

    const hasInvalidWord = cleanedWords.some(
      (word) => !word.kanji || !word.romaji || !word.meaning
    );

    if (hasInvalidWord) {
      return res.status(400).json({
        success: false,
        message: "Kanji/Kana, Romaji, and Meaning are required for all 5 words.",
      });
    }

    await db.collection("daily_vocab").doc("today").set({
      words: cleanedWords,
      updatedAt: new Date().toISOString(),
      updatedBy: req.user.uid,
    });

    return res.json({
      success: true,
      message: "Daily vocabulary updated successfully.",
      data: {
        words: cleanedWords,
      },
    });
  } catch (error) {
    next(error);
  }
});

export default router;