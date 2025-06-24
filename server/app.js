import express from "express";
import cors from "cors";
import tweetRoutes from "./routes/tweet.routes.js";
import authRoutes from "./routes/auth.routes.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/tweets", tweetRoutes);
app.use("/api/auth", authRoutes);

export default app;
