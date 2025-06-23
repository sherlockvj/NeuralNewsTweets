import * as TweetService from "../services/tweet.service.js";

export const generateBreakingNewsTweets = async (req, res) => {
    try {
        const response = await TweetService.handleBreakingNewsTweets(req.body);
        console.log("Generated tweets:", response);
        res.json({"response:":response});
    } catch (error) {
        res.status(500).json({ error: "Failed to generate tweets" });
    }
};

export const generateTrendingTweets = async (req, res) => {
    res.send("Received request to generate trending tweets (news from trending hashtags)");
};

