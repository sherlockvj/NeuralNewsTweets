import axios from "axios";

const API = axios.create({
    baseURL: process.env.REACT_APP_NEURALNEWSTWEETS_BASE_URL
});
console.log("process.env.NEURALNEWSTWEETS_BASE_URL: " + process.env.NEURALNEWSTWEETS_BASE_URL)

API.interceptors.request.use((req) => {
    const token = localStorage.getItem("token");
    if (token) req.headers.Authorization = `Bearer ${token}`;
    return req;
});

export const login = (data) => API.post("/api/auth/login", data);
export const register = (data) => API.post("/api/auth/register", data);
export const verifyOtp = (data) => API.post("/api/auth/verify-otp", data);
export const getBreakingTweets = (data) =>
    API.post("/api/tweets/generate-breaking-news-tweets", data);
export const getTrendingTweets = (data) =>
    API.post("/api/tweets/generate-trending-tweets", data);

