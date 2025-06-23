import express from "express";
import cors from "cors";
import tweetRoutes from "./routes/tweet.routes.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/tweets", tweetRoutes);

export default app;