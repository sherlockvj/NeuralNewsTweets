import * as NewsService from "./news.service.js";
import * as TrendService from "./trend.service.js";

export const handleBreakingNewsTweets = async ({
  location,
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

  console.log(newsArticles);

  console.log("Fetching Twitter trends...");
  const trends = await TrendService.fetchTwitterTrends(location);

  // STEP - console.log("Generating tweets based on news articles and trends...");
  
  return [newsArticles, trends];
};