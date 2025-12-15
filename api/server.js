import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import { initDB } from "../config/db.js";
import { rateLimiter } from "../middleware/rateLimiter.js";
import transactionRoutes from "../routes/transactionRoutes.js";

dotenv.config();

const app = express();

// middlewares
app.use(cors());
app.use(express.json());
app.use(rateLimiter);

// routes
app.use("/api/transactions", transactionRoutes);

// health check
app.get("/", (req, res) => {
  res.send("API running on Vercel");
});

// ⚠️ IMPORTANT: DB init WITHOUT listen
let dbInitialized = false;

app.use(async (req, res, next) => {
  if (!dbInitialized) {
    await initDB();
    dbInitialized = true;
  }
  next();
});

export default app; // ✅ REQUIRED FOR VERCEL
