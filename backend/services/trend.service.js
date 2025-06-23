import axios from "axios";
import { codeToWoeid } from "../constants/woeid.js";

export const fetchTwitterTrends = async (location) => {
  const woeid = codeToWoeid[location] || "1";

  const res = await axios.post(
    `https://${process.env.RAPIDAPI_HOST}/twitter/request.php`,
    new URLSearchParams({ woeid }),
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "X-RapidAPI-Host": process.env.RAPIDAPI_HOST,
        "X-RapidAPI-Key": process.env.RAPIDAPI_KEY,
      },
    }
  );

  return formatTrendingHashtags(res.data.trends);
};

const formatTrendingHashtags = (rawTrends) => {
  return Object.values(rawTrends)
    .slice(0, 10)
    .map((trend) => ({
      hashtag: trend.name,
      domain: trend.domainContext || "",
      popularity: trend.volumeShort || trend.volume?.toString() || "Unknown",
    }));
};