import express from "express";
import { generateBreakingNewsTweets, generateTrendingTweets } from "../controllers/tweet.controller.js";

const router = express.Router();

router.post("/generate-breaking-news-tweets", generateBreakingNewsTweets);
router.post("/generate-trending-tweets", generateTrendingTweets);

export default router;