import * as NewsService from "./news.service.js";
import * as TrendService from "./trend.service.js";
import * as OpenAIService from "./openai.service.js";

export const handleBreakingNewsTweets = async ({
  location,
  tone,
  stance,
  category,
  startTime,
  endTime,
}) => {
  console.log("Fetching breaking news articles...");
  const newsArticles = await NewsService.fetchBreakingNews({
    location,
    category,
    startTime,
    endTime,
  });

  console.log("Fetching Twitter trends...");
  const trends = await TrendService.fetchTwitterTrends(location);

  console.log("Generating tweets based on news articles and trends...");
  const tweets = await OpenAIService.generateNewsBasedTweets({
    tone,
    stance,
    newsArticles,
    trends,
  });

  return tweets;
};

export const handleTrendingTweets = async ({ location, tone, stance }) => {
  const trends = await TrendService.fetchTwitterTrends(location);
  const queries = await OpenAIService.generateSearchQueriesFromTrends(trends);
  const articles = await NewsService.fetchArticlesForQueries(queries);

  const tweets = await OpenAIService.generateBasicNewsTweets({
    tone,
    stance,
    newsArticles: articles,
  });

  return tweets;
};

export const handleBreakingNewsTweetsWithAiTrends = async ({
  location,
  tone,
  stance,
  category,
  startTime,
  endTime,
}) => {
  console.log("Fetching breaking news articles...");
  const newsArticles = await NewsService.fetchBreakingNews({
    location,
    category,
    startTime,
    endTime,
  });

  console.log("Fetching Twitter trends...");
  const trends = await TrendService.fetchTwitterTrends(location);

  const tweets = await OpenAIService.generateBasicNewsTweets({
    tone,
    stance,
    newsArticles,
  });

  return { tweeets: tweets, currentTrends: trends };
};
