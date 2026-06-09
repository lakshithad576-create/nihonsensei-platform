// backend/src/server.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";

// ─── ROUTE IMPORTS ───────────────────────────────────────
import authRoutes from "./routes/auth.routes.js";
import categoryRoutes from "./routes/category.routes.js";
import recordingRoutes from "./routes/recording.routes.js";
import studentRoutes from "./routes/student.routes.js";
import vocabRoutes from "./routes/vocab.routes.js";
import contactRoutes from "./routes/contact.routes.js";
import liveClassRoutes from "./routes/liveClass.routes.js";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
  })
);

app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "NihonSensei backend is running"
  });
});

// ─── MOUNT ROUTES ────────────────────────────────────────
app.use("/api/auth", authRoutes); // (Removed the duplicate line here)
app.use("/api/categories", categoryRoutes);
app.use("/api/recordings", recordingRoutes);
app.use("/api/students", studentRoutes);
app.use("/api/vocab", vocabRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/live-classes", liveClassRoutes);

// ─── ERROR HANDLING ──────────────────────────────────────
app.use((err, req, res, next) => {
  console.error(err);

  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Server error"
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});