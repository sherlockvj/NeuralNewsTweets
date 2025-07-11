import express from "express";
import {
  generateBreakingNewsTweets,
  generateBreakingNewsTweetsWithAiTrends,
  generateTrendingTweets,
} from "../controllers/tweet.controller.js";
const router = express.Router();

router.post("/generate-breaking-news-tweets", generateBreakingNewsTweets);
router.post("/generate-trending-tweets", generateTrendingTweets);
router.post("/generate-breaking-news-tweets-with-ai-trends", generateBreakingNewsTweetsWithAiTrends);

export default router;
