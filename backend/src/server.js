import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.routes.js";
import categoryRoutes from "./routes/category.routes.js";
import recordingRoutes from "./routes/recording.routes.js";
import studentRoutes from "./routes/student.routes.js";
import vocabRoutes from "./routes/vocab.routes.js";
import contactRoutes from "./routes/contact.routes.js";
import liveClassRoutes from "./routes/liveClass.routes.js";

dotenv.config();

const app = express();

const allowedOrigins = [
  process.env.FRONTEND_URL,
  "http://localhost:5173",
  "http://localhost:5174"
].filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error(`CORS blocked for origin: ${origin}`));
    },
    credentials: true
  })
);

app.use(express.json({ limit: "50mb" }));

app.get("/api", (req, res) => {
  res.json({
    success: true,
    message: "NihonSensei API is running on Firebase Functions"
  });
});

app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "NihonSensei backend is running"
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/recordings", recordingRoutes);
app.use("/api/students", studentRoutes);
app.use("/api/vocab", vocabRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/live-classes", liveClassRoutes);

app.use((err, req, res, next) => {
  console.error("API Error:", err);

  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Server error"
  });
});

export default app;