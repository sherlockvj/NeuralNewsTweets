import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:5000/api",
});

API.interceptors.request.use((req) => {
    const token = localStorage.getItem("token");
    if (token) req.headers.Authorization = `Bearer ${token}`;
    return req;
});

export const login = (data) => API.post("/auth/login", data);
export const register = (data) => API.post("/auth/register", data);
export const getBreakingTweets = (data) =>
    API.post("/tweets/generate-breaking-news-tweets", data);
export const getTrendingTweets = (data) =>
    API.post("/tweets/generate-trending-tweets", data);
