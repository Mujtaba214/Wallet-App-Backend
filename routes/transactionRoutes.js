import express from "express";
import {
  createTransaction,
  deleteTransactionById,
  getTransactionByUserId,
  getTransactionSummaryByUserId,
} from "../controller/transactionController.js";

const router = express.Router();

router.get("/:userId", getTransactionByUserId);
router.post("/", createTransaction);
router.delete("/:id", deleteTransactionById);
router.get("/summary/:userId", getTransactionSummaryByUserId);

export default router
