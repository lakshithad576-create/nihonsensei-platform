import express from "express";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { PutObjectCommand, S3Client, DeleteObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import multer from "multer";
import { db } from "../config/firebaseAdmin.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

const requireAdmin = (req, res, next) => {
  if (req.user?.role !== "admin") {
    return res.status(403).json({
      success: false,
      message: "Admin access required",
    });
  }

  next();
};

const r2 = new S3Client({
  region: "auto",
  endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  forcePathStyle: true,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
  },
});

const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, callback) => {
      const uploadDir = path.join(os.tmpdir(), "nihonsensei-uploads");
      fs.mkdir(uploadDir, { recursive: true }, (error) => callback(error, uploadDir));
    },
    filename: (req, file, callback) => {
      const safeName = createSafeFileName(file.originalname || "video.mp4");
      callback(null, `${Date.now()}-${safeName}`);
    },
  }),
  limits: {
    fileSize: 1024 * 1024 * 1024,
  },
});


const createSafeFileName = (fileName = "video.mp4") => {
  return fileName
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9._-]/g, "");
};

const uploadRecordingToR2 = async ({ file, fileName, fileType }) => {
  const safeFileName = createSafeFileName(fileName || file.originalname || "video.mp4");
  const key = `recordings/${Date.now()}-${safeFileName}`;

  await r2.send(
    new PutObjectCommand({
      Bucket: process.env.R2_BUCKET_NAME,
      Key: key,
      Body: fs.createReadStream(file.path),
      ContentType: fileType || file.mimetype || "application/octet-stream",
    })
  );

  return {
    key,
    publicUrl: `${process.env.R2_PUBLIC_URL}/${key}`,
  };
};

// Admin: generate presigned upload URL
router.post("/presign", protect, requireAdmin, async (req, res, next) => {
  try {
    const { fileName, fileType } = req.body;

    if (!fileName || !fileType) {
      return res.status(400).json({
        success: false,
        message: "fileName and fileType are required",
      });
    }

    const allowedTypes = ["video/mp4", "video/webm", "video/quicktime"];

    if (!allowedTypes.includes(fileType)) {
      return res.status(400).json({
        success: false,
        message: "Only MP4, WebM, and MOV videos are allowed",
      });
    }

    const safeFileName = createSafeFileName(fileName);
    const key = `recordings/${Date.now()}-${safeFileName}`;

    const command = new PutObjectCommand({
      Bucket: process.env.R2_BUCKET_NAME,
      Key: key,
      ContentType: fileType,
    });

    const uploadUrl = await getSignedUrl(r2, command, {
      expiresIn: 60 * 5,
    });

    const publicUrl = `${process.env.R2_PUBLIC_URL}/${key}`;

    return res.json({
      success: true,
      data: {
        uploadUrl,
        key,
        publicUrl,
      },
    });
  } catch (error) {
    next(error);
  }
});

// Admin: upload video through the backend so the browser never talks to R2 directly
router.post(
  "/upload",
  protect,
  requireAdmin,
  upload.single("videoFile"),
  async (req, res, next) => {
    let uploadedFilePath = req.file?.path;

    try {
      const { title, category, date } = req.body;

      if (!title || !category || !date) {
        return res.status(400).json({
          success: false,
          message: "title, category, and date are required",
        });
      }

      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: "videoFile is required",
        });
      }

      const allowedTypes = ["video/mp4", "video/webm", "video/quicktime"];

      if (!allowedTypes.includes(req.file.mimetype)) {
        return res.status(400).json({
          success: false,
          message: "Only MP4, WebM, and MOV videos are allowed",
        });
      }

      const { key, publicUrl } = await uploadRecordingToR2({
        file: req.file,
        fileName: req.file.originalname,
        fileType: req.file.mimetype,
      });

      const recordingRef = db.collection("recordings").doc();
      const recording = {
        id: recordingRef.id,
        title: title.trim(),
        category,
        date,
        videoUrl: publicUrl,
        videoKey: key,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      await recordingRef.set(recording);

      return res.status(201).json({
        success: true,
        message: "Recording uploaded successfully",
        data: recording,
      });
    } catch (error) {
      next(error);
    } finally {
      if (uploadedFilePath) {
        fs.unlink(uploadedFilePath, () => {});
      }
    }
  }
);

// Admin: save recording metadata after successful R2 upload
router.post("/", protect, requireAdmin, async (req, res, next) => {
  try {
    const { title, category, date, videoUrl, videoKey } = req.body;

    if (!title || !category || !date || !videoUrl || !videoKey) {
      return res.status(400).json({
        success: false,
        message: "title, category, date, videoUrl, and videoKey are required",
      });
    }

    const recordingRef = db.collection("recordings").doc();

    const recording = {
      id: recordingRef.id,
      title: title.trim(),
      category,
      date,
      videoUrl,
      videoKey,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    await recordingRef.set(recording);

    return res.status(201).json({
      success: true,
      message: "Recording saved successfully",
      data: recording,
    });
  } catch (error) {
    next(error);
  }
});

// Student/Admin: get recordings
router.get("/", protect, async (req, res, next) => {
  try {
    const snapshot = await db
      .collection("recordings")
      .orderBy("createdAt", "desc")
      .get();

    const recordings = snapshot.docs.map((doc) => doc.data());

    return res.json({
      success: true,
      data: recordings,
    });
  } catch (error) {
    next(error);
  }
});

// Admin: delete recording
router.delete("/:id", protect, requireAdmin, async (req, res, next) => {
  try {
    const recordingDoc = await db
      .collection("recordings")
      .doc(req.params.id)
      .get();

    if (!recordingDoc.exists) {
      return res.status(404).json({
        success: false,
        message: "Recording not found",
      });
    }

    const recording = recordingDoc.data();

    if (recording.videoKey) {
      await r2.send(
        new DeleteObjectCommand({
          Bucket: process.env.R2_BUCKET_NAME,
          Key: recording.videoKey,
        })
      );
    }

    await db.collection("recordings").doc(req.params.id).delete();

    return res.json({
      success: true,
      message: "Recording deleted successfully",
    });
  } catch (error) {
    next(error);
  }
});

export default router;