import { neon } from "@neondatabase/serverless";
import dotenv from "dotenv";

dotenv.config();

export const db = neon(process.env.DATABSE_URL);

export const initDB = async () => {
  try {
    await db`CREATE TABLE IF NOT EXISTS transactions (
        id SERIAL PRIMARY KEY,
        user_id VARCHAR(255) NOT NULL,
        title VARCHAR(255) NOT NULL,
        amount DECIMAL(10,2) NOT NULL,
        category VARCHAR(255) NOT NULL,
        created_at DATE NOT NULL DEFAULT CURRENT_DATE
        );`;
    console.log("Database initialized successfully");
  } catch (error) {
    console.log("Error in initializing database:", error);
    process.exit(1);
  }
};
