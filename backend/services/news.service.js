import axios from "axios";
import dayjs from "dayjs";

export const fetchBreakingNews = async ({
  location,
  category,
  startTime,
  endTime,
}) => {
  let url = `https://newsapi.org/v2/top-headlines?apiKey=${process.env.NEWS_API_KEY}`;
  if (location) url += `&country=${location}`;
  if (category) url += `&category=${category}`;
  if (startTime) url += `&from=${dayjs(startTime).format("YYYY-MM-DD")}`;
  if (endTime) url += `&to=${dayjs(endTime).format("YYYY-MM-DD")}`;
  url += "&pageSize=10";

  const res = await axios.get(url);
  return res.data.articles || [];
  
};

export const fetchArticlesForQueries = async (queries) => {
  const allArticles = [];

  for (const { query, hashtag } of queries) {
    const url = `https://newsapi.org/v2/everything?q=${encodeURIComponent(
      query
    )}&language=en&pageSize=1&apiKey=${process.env.NEWS_API_KEY}`;
    const res = await axios.get(url);
    const article = res.data.articles[0];

    if (article) {
      allArticles.push({
        hashtag,
        headline: article.title,
        body: article.description || "",
        image: article.urlToImage,
        url: article.url,
      });
    }
  }

  return allArticles;
};