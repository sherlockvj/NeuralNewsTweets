import * as TweetService from "../services/tweet.service.js";
import { logError } from "../utils/logger.js";

export const generateBreakingNewsTweets = async (req, res) => {
  try {
    const response = await TweetService.handleBreakingNewsTweets(req.body);
    res.json({ tweets: response });
  } catch (error) {
    logError(error);
    res.status(500).json({ error: "Failed to generate tweets" });
  }
};

export const generateTrendingTweets = async (req, res) => {
  try {
    const response = await TweetService.handleTrendingTweets(req.body);
    res.json({ tweets: response });
  } catch (error) {
    logError(error);
    res.status(500).json({ error: "Failed to generate tweets" });
  }
};

export const generateBreakingNewsTweetsWithAiTrends = async (req, res) => {
  try {
    const response = await TweetService.handleBreakingNewsTweetsWithAiTrends(req.body);
    res.json({ response: response });
  } catch (error) {
    logError(error);
    res.status(500).json({ error: "Failed to generate tweets with AI trends" });
  }
};