import express from "express";
import { db } from "../config/firebaseAdmin.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

const LIVE_CLASS_CATEGORY = "Live Zoom Classes";

const requireAdmin = (req, res, next) => {
  const role = req.user?.role;

  if (role !== "admin" && role !== "ADMIN") {
    return res.status(403).json({
      success: false,
      message: "Admin access required",
    });
  }

  next();
};

// Student/Admin: get live classes
router.get("/", protect, async (req, res, next) => {
  try {
    const snapshot = await db
      .collection("live_classes")
      .orderBy("datetime", "asc")
      .get();

    const classes = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return res.json({
      success: true,
      data: classes,
    });
  } catch (error) {
    console.error("Get live classes error:", error);
    next(error);
  }
});

// Admin: create live class
router.post("/", protect, requireAdmin, async (req, res, next) => {
  try {
    const { title, link, datetime } = req.body;

    if (!title || !link || !datetime) {
      return res.status(400).json({
        success: false,
        message: "title, link, and datetime are required",
      });
    }

    const classRef = db.collection("live_classes").doc();

    const liveClass = {
      id: classRef.id,
      title: title.trim(),
      link: link.trim(),
      category: LIVE_CLASS_CATEGORY,
      datetime,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    await classRef.set(liveClass);

    return res.status(201).json({
      success: true,
      message: "Live class scheduled successfully",
      data: liveClass,
    });
  } catch (error) {
    console.error("Create live class error:", error);
    next(error);
  }
});

// Admin: delete live class
router.delete("/:id", protect, requireAdmin, async (req, res, next) => {
  try {
    const liveClassRef = db.collection("live_classes").doc(req.params.id);
    const liveClassDoc = await liveClassRef.get();

    if (!liveClassDoc.exists) {
      return res.status(404).json({
        success: false,
        message: "Live class not found",
      });
    }

    await liveClassRef.delete();

    return res.json({
      success: true,
      message: "Live class deleted successfully",
    });
  } catch (error) {
    console.error("Delete live class error:", error);
    next(error);
  }
});

export default router;