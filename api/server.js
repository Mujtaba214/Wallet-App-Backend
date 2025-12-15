import express from "express";
import dotenv from "dotenv";
import { initDB } from "../config/db.js";
import { rateLimiter } from "../middleware/rateLimiter.js";
import transactionRoutes from "../routes/transactionRoutes.js";

dotenv.config();

const app = express();

//middlewares
app.use(rateLimiter);
app.use(express.json());

app.use("/api/transactions", transactionRoutes);

// async function initDB() {
//   try {
//     await db`CREATE TABLE IF NOT EXISTS transactions (
//         id SERIAL PRIMARY KEY,
//         user_id VARCHAR(255) NOT NULL,
//         title VARCHAR(255) NOT NULL,
//         amount DECIMAL(10,2) NOT NULL,
//         category VARCHAR(255) NOT NULL,
//         created_at DATE NOT NULL DEFAULT CURRENT_DATE
//         );`;
//     console.log("Database initialized successfully");
//   } catch (error) {
//     console.log("Error in initializing database:", error);
//     process.exit(1);
//   }
// }

// app.post("/api/transactions", async (req, res) => {
//   try {
//     const { title, amount, category, user_id } = req.body;

//     if (!title || !amount || !category || !user_id) {
//       return res.status(400).json({ msg: "All fields are required" });
//     }

//     const transactions = await db`
//     INSERT INTO transactions(user_id,title,amount,category)
//     VALUES(${user_id},${title},${amount},${category})
//     RETURNING *`;

//     console.log(transactions);
//     res.status(201).json(transactions[0]);
//   } catch (error) {
//     console.log("Error in transactions", error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// });

// app.get("/api/transactions/:userId", async (req, res) => {
//   try {
//     const { userId } = req.params;

//     if (!userId) {
//       return res.status(400).json({ msg: "No UserID found" });
//     }

//     const transactions = await db`
//     SELECT * FROM transactions WHERE user_id=${userId}
//     ORDER BY created_at DESC`;

//     // console.log(transactions);
//     res.status(201).json(transactions);
//   } catch (error) {
//     console.log("Error in transactions", error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// });

// app.delete("/api/transactions/:id", async (req, res) => {
//   try {
//     const { id } = req.params;

//     if (!id) {
//       return res.status(400).json({ msg: "No id found" });
//     }

//     const result = await db`
//    DELETE FROM transactions WHERE id=${id}
//     RETURNING *`;

//     if (result.length === 0) {
//       return res.status(404).json({ message: "Transaction not found" });
//     }

//     res.status(200).json({ message: "Transaction deleted successfully" });
//   } catch (error) {
//     console.log("Error in transactions", error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// });

// app.get("/api/transactions/summary/:userId", async (req, res) => {
//   try {
//     const { userId } = req.params;

//     if (!userId) {
//       return res.status(400).json({ msg: "No UserID found" });
//     }

//     const balanceResult = await db`
//     SELECT COALESCE(SUM(amount), 0) AS balance
//     FROM transactions
//     WHERE user_id = ${userId}
//     `;

//     const incomeResult = await db`
//     SELECT COALESCE(SUM(amount), 0) AS income
//     FROM transactions
//     WHERE user_id = ${userId}
//     AND amount > 0
//     `;

//     const expensesResult = await db`
//     SELECT COALESCE(SUM(amount), 0) AS expenses
//     FROM transactions
//     WHERE user_id = ${userId}
//     AND amount > 0
//     `;

//     res.status(201).json({
//       balance: balanceResult[0].balance,
//       income: incomeResult[0].income,
//       expense: expensesResult[0].expenses,
//     });
//   } catch (error) {
//     console.log("Error in transactions", error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// });

initDB().then(() => {
  app.listen(process.env.PORT || 5000, () => {
    console.log(`server running on port ${process.env.PORT || 5000}`);
  });
});
