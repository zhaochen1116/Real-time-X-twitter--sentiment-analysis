import axios from "axios";

const BASE_URL = "http://localhost:8000";

export const fetchLatestTweets = async () => {
  const res = await axios.get(`${BASE_URL}/api/sentiment/latest`);
  return res.data;
};

export const fetchSentimentStats = async () => {
  const res = await axios.get(`${BASE_URL}/api/sentiment/stats`);
  return res.data;
};

export const fetchHourlySentiment = async () => {
  const res = await axios.get(`${BASE_URL}/api/sentiment/hourly`);
  return res.data;
};
