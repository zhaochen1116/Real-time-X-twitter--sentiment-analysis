import React, { useEffect, useState } from "react";
import { fetchLatestTweets } from "../api";

export default function TweetList() {
  const [tweets, setTweets] = useState([]);
  const [highlightedId, setHighlightedId] = useState(null);

  // 初次加载：从 API 获取推文列表
  useEffect(() => {
    fetchLatestTweets()
      .then((data) => {
        if (Array.isArray(data)) {
          setTweets(data);
        } else {
          console.warn("Invalid tweet data:", data);
          setTweets([]);
        }
      })
      .catch((err) => {
        console.error("❌ Failed to fetch tweets:", err);
      });
  }, []);

  // WebSocket 实时推送
  useEffect(() => {
    const socket = new WebSocket("ws://localhost:8000/ws");

    socket.onopen = () => {
      console.log("✅ WebSocket connected");
    };

    socket.onmessage = (event) => {
    try {
      const raw = JSON.parse(event.data);
      const newTweet = {
        ...raw,
        _id: raw._id?.$oid || Date.now(), // 处理 Mongo _id
        created_at: raw.created_at?.$date || new Date().toISOString()
      };

      setHighlightedId(newTweet._id); // ✅ 高亮逻辑
      setTweets(prev => {
        const updated = [JSON.parse(JSON.stringify(newTweet)), ...prev];
        return updated.slice(0, 100);
      });
      // 取消高亮
      setTimeout(() => setHighlightedId(null), 1000);
    } catch (err) {
      console.error("❌ WebSocket data parse error", err);
    }
  };


    socket.onerror = (e) => {
      console.error("WebSocket error:", e);
    };

    return () => socket.close();
  }, []);

  return (
    <div className="bg-white rounded-xl shadow p-4 h-[500px] overflow-y-auto">
      <h2 className="text-xl font-semibold mb-4 border-b pb-2">
        📝 Real-Time Tweets
      </h2>
      <ul className="space-y-3">
        {Array.isArray(tweets) && tweets.map((tweet, idx) => (
          <li
            key={tweet._id || idx}
            className={`
              p-3 rounded-lg border shadow-sm transition-all duration-500
              ${tweet.sentiment === "Positive" ? "border-green-300 bg-green-50" :
                tweet.sentiment === "Negative" ? "border-red-300 bg-red-50" :
                "border-yellow-300 bg-yellow-50"
              }
              ${tweet.text === highlightedId ? "ring-2 ring-blue-400 scale-[1.02]" : ""}
            `}
          >
            <p className="text-sm">{tweet.text}</p>
            <p className="text-xs mt-1 text-gray-500">
              Sentiment: <strong>{tweet.sentiment}</strong>
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
