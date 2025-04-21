import { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

export default function SentimentConfidenceHistogram() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchConfidence = () => {
      fetch("http://localhost:8000/api/sentiment/confidence")
        .then(res => res.json())
        .then(json => setData(json))
        .catch(err => console.error("❌ Failed to fetch confidence data:", err));
    };

    fetchConfidence();
    const interval = setInterval(fetchConfidence, 10000); // 每 10 秒刷新
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-4 bg-white rounded-xl shadow">
      <h2 className="text-xl font-semibold mb-4">🔎 Sentiment Confidence Histogram</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="confidence" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="positive" stackId="a" fill="#22c55e" />
          <Bar dataKey="negative" stackId="a" fill="#ef4444" />
          <Bar dataKey="neutral" stackId="a" fill="#eab308" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
