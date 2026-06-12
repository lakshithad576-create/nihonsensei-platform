import { onRequest } from "firebase-functions/v2/https";
import app from "./src/server.js";

export const api = onRequest(
  {
    region: "us-central1",
    timeoutSeconds: 300,
    memory: "1GiB",
    cors: true // කෙලින්ම Firebase Function මට්ටමෙන් CORS enable කිරීම
  },
  app
);