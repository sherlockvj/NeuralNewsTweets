import dotenv from "dotenv";
import { MongoClient } from "mongodb";

dotenv.config();
const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

let db;

export async function connectDB() {
  try {
    await client.connect();
    db = client.db(process.env.MONGODB_DBNAME || "project_sirin");
    console.log("MongoDB connected successfully!");
  } catch (err) {
    console.error("MongoDB connection failed:", err);
    throw err;
  }
}

export function getDB() {
  if (!db) {
    throw new Error("DB not connected. Call connectDB() first.");
  }
  return db;
}

