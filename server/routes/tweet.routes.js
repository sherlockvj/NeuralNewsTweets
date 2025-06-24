import express from "express";
import {
  generateBreakingNewsTweets,
  generateBreakingNewsTweetsWithAiTrends,
  generateTrendingTweets,
} from "../controllers/tweet.controller.js";
import { authenticate, authorizeRoles } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/generate-breaking-news-tweets", authenticate, authorizeRoles("user"), generateBreakingNewsTweets);
router.post("/generate-trending-tweets", authenticate, authorizeRoles("user"), generateTrendingTweets);
router.post("/generate-breaking-news-tweets-with-ai-trends", authenticate, authorizeRoles("user"), generateBreakingNewsTweetsWithAiTrends);

export default router;
