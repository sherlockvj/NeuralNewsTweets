// prompt.js

const scenarios = {
  // Basic scenario for generating tweets from news articles
  basicNewsTweet: {
    systemMessage: {
      role: "system",
      content:
        "You are a creative Twitter assistant that returns output in strict JSON format. For each news article, generate a catchy tweet (max 280 characters), aligned with the given tone and stance. Also generate catchy hashtags for the corresponding tweets. Return all tweets in a JSON array with keys: id, hashtags, tweet.",
    },
    userMessage: ({ tone, stance, newsArticles }) => ({
      role: "user",
      content: `Generate a tweet with hashtags for each article with a ${tone} tone and a ${stance} stance.

Return format must be strictly JSON in following format:
[
  {
    "id": 1,
    "hashtags": "#Example", "#exampl2,
    "tweet": "Your tweet here"
  }
]

Articles:
${JSON.stringify(newsArticles, null, 2)}
`,
    }),
  },

  // Scenario for generating tweets based on breaking news and trends
  tweetWithTrends: {
    systemMessage: {
      role: "system",
      content:
        "You are a creative and trend-aware assistant. For each news article, generate a catchy tweet (max 280 characters) and suggest 3 trending hashtags to go with it. Return output in strict JSON format with keys: id, hashtag, tweet.",
    },
    userMessage: ({ tone, stance, newsArticles, trends }) => ({
      role: "user",
      content: `Generate a tweet for each news article below with a ${tone} tone and a ${stance} stance.

Use only one trending hashtag per tweet from the following list:
${trends.map((t) => t.hashtag).join(", ")}

Return format (JSON):
[
  {
    "id": 1,
    "hashtag": "#example","#2ndHashtag",
    "tweet": "Some catchy tweet"
  }
]

News Articles:
${JSON.stringify(newsArticles, null, 2)}
`,
    }),
  },

  // Scenario for generating search queries from trending hashtags
  searchQueriesFromTrends: {
    systemMessage: {
      role: "system",
      content:
        "You are an assistant that converts trending Twitter hashtags into clear news search queries for the newsAPI. Don't include any Date or Time in the queries. Return output in strict JSON format with keys: id, query.",
    },
    userMessage: ({ trends }) => ({
      role: "user",
      content: `Convert into queries:\n${JSON.stringify(trends, null, 2)}`,
    }),
  },
};

/**
 * Gets the system and user messages for a given scenario
 * @param {string} scenario - Scenario key (e.g., "basicNewsTweet")
 * @param {object} params - Parameters like tone, stance, newsArticles, trends
 * @returns {{system: object, user: object}} - System and user message objects
 */
export const getPromptMessages = (scenario, params) => {
  const config = scenarios[scenario];
  if (!config) {
    throw new Error(`Unknown scenario: ${scenario}`);
  }

  return {
    system: config.systemMessage,
    user: config.userMessage(params),
  };
};

export const availableScenarios = Object.keys(scenarios);
