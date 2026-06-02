// backend/src/routes/recording.routes.js
import express from "express";
import { db } from "../config/firebaseAdmin.js";
import { protect } from "../middleware/authMiddleware.js";
import { adminOnly } from "../middleware/adminMiddleware.js";

const router = express.Router();

router.get("/", protect, async (req, res, next) => {
  try {
    const snapshot = await db.collection("recordings").orderBy("createdAt", "desc").get();

    const recordings = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    res.json({
      success: true,
      data: recordings
    });
  } catch (error) {
    next(error);
  }
});

router.post("/", protect, adminOnly, async (req, res, next) => {
  try {
    const { title, categoryId, date, videoUrl, thumbnailUrl } = req.body;

    if (!title || !categoryId) {
      return res.status(400).json({
        success: false,
        message: "Title and category are required"
      });
    }

    const docRef = await db.collection("recordings").add({
      title,
      categoryId,
      date: date || new Date().toISOString(),
      videoUrl: videoUrl || "",
      thumbnailUrl: thumbnailUrl || "",
      createdAt: new Date().toISOString(),
      createdBy: req.user.uid
    });

    res.status(201).json({
      success: true,
      message: "Recording created",
      data: {
        id: docRef.id
      }
    });
  } catch (error) {
    next(error);
  }
});

export default router;