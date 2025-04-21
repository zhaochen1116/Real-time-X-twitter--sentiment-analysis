import React, { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

export default function EmotionCategoryBreakdown() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchEmotions = () => {
      fetch("http://localhost:8000/api/emotion-breakdown")
        .then(res => res.json())
        .then(json => setData(json))
        .catch(err => console.error("❌ Failed to fetch emotion breakdown:", err));
    };

    fetchEmotions();
    const interval = setInterval(fetchEmotions, 10000); // 每10秒刷新
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-4 bg-white rounded-xl shadow">
      <h2 className="text-xl font-semibold mb-4">🎭 Emotion Category Breakdown</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="emotion" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="count" fill="#38bdf8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
