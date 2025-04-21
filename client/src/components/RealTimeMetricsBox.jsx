import React, { useEffect, useState } from "react";

export default function RealTimeMetricsBox() {
  const [metrics, setMetrics] = useState({
    totalTweets: 0,
    positivePercentage: 0,
    topKeywords: [],
    tweetsPerMinute: 0,
  });

  useEffect(() => {
    const fetchData = () => {
      fetch("http://localhost:8000/api/metrics")
        .then(res => res.json())
        .then(data => {
          setMetrics({
            totalTweets: data.totalTweets || 0,
            positivePercentage: data.positivePercentage || 0,
            topKeywords: data.topKeywords || [],
            tweetsPerMinute: data.tweetsPerMinute || 0,
          });
        })
        .catch(err => console.error("❌ Failed to fetch metrics:", err));
    };

    fetchData();
    const interval = setInterval(fetchData, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col gap-2 w-full">
      <div className="bg-white rounded-xl shadow p-4 space-y-2">

        <div className="bg-gray-50 rounded-lg p-3 h-[75px] flex flex-col justify-center">
          <p className="text-sm text-gray-500">Total Tweets</p>
          <p className="text-2xl font-bold text-blue-600">{metrics.totalTweets}</p>
        </div>

        <div className="bg-gray-50 rounded-lg p-3 h-[75px] flex flex-col justify-center">
          <p className="text-sm text-gray-500">Positive Sentiment</p>
          <p className="text-2xl font-bold text-green-600">{metrics.positivePercentage}%</p>
        </div>

        <div className="bg-gray-50 rounded-lg p-3 h-[75px] flex flex-col justify-center">
          <p className="text-sm text-gray-500">Top Keywords</p>
          <p className="text-md text-gray-800">{metrics.topKeywords.join(", ")}</p>
        </div>

        <div className="bg-gray-50 rounded-lg p-3 h-[75px] flex flex-col justify-center">
          <p className="text-sm text-gray-500">Tweets/Min</p>
          <p className="text-2xl font-bold text-purple-600">{metrics.tweetsPerMinute}</p>
        </div>

      </div>
    </div>
  );
}
