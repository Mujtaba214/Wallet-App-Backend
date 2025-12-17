import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import { rateLimiter } from "../middleware/rateLimiter.js";
import transactionRoutes from "../routes/transactionRoutes.js";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: "*", // allow all for mobile apps
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json());
app.use(rateLimiter);

app.use("/api/transactions", transactionRoutes);

app.get("/", (req, res) => {
  res.send("API running on Vercel + Neon");
});

export default app;
