import axios from "axios";
import { getPromptMessages } from "../constants/prompts.js";

const buildOpenAIUrl = () =>
  `${process.env.AZURE_OPENAI_ENDPOINT}/openai/deployments/${process.env.AZURE_OPENAI_DEPLOYMENT_NAME}/chat/completions?api-version=${process.env.AZURE_OPENAI_API_VERSION}`;

export const generateNewsBasedTweets = async ({
  tone,
  stance,
  newsArticles,
  trends,
}) => {
  const aiPrompt = getPromptMessages("tweetWithTrends", {
    tone,
    stance,
    newsArticles,
    trends,
  });
  const response = await axios.post(
    buildOpenAIUrl(),
    {
      messages: [aiPrompt.system, aiPrompt.user],
      temperature: 0.9,
      max_tokens: 1500,
    },
    {
      headers: {
        "Content-Type": "application/json",
        "api-key": process.env.AZURE_OPENAI_KEY,
      },
    }
  );

  return extractJson(response.data.choices[0].message.content);
};

export const generateBasicNewsTweets = async ({
  tone,
  stance,
  newsArticles,
}) => {
  const aiPrompt = getPromptMessages("basicNewsTweet", {
    tone,
    stance,
    newsArticles,
  });

  const response = await axios.post(
    buildOpenAIUrl(),
    {
      messages: [aiPrompt.system, aiPrompt.user],
      temperature: 0.9,
      max_tokens: 1000,
    },
    {
      headers: {
        "Content-Type": "application/json",
        "api-key": process.env.AZURE_OPENAI_KEY,
      },
    }
  );

  return extractJson(response.data.choices[0].message.content);
};

export const generateSearchQueriesFromTrends = async (trends) => {
  const aiPrompt = getPromptMessages("searchQueriesFromTrends", { trends });
  const response = await axios.post(
    buildOpenAIUrl(),
    {
      messages: [aiPrompt.system, aiPrompt.user],
      temperature: 0.7,
      max_tokens: 1500,
    },
    {
      headers: {
        "Content-Type": "application/json",
        "api-key": process.env.AZURE_OPENAI_KEY,
      },
    }
  );

  return extractJson(response.data.choices[0].message.content);
};

const extractJson = (markdown) => {
  const match = markdown.match(/```json([\s\S]*?)```/);
  if (!match) throw new Error("Invalid JSON format in OpenAI response");
  return JSON.parse(match[1].trim());
};
