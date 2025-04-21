import React, { useEffect, useState } from "react";
import {
  LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer
} from "recharts";

export default function KeywordTrendLine({ keyword = "refund" }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchTrend = () => {
      fetch(`http://localhost:8000/api/keyword-trend?keyword=${keyword}`)
        .then(res => res.json())
        .then(json => setData(json))
        .catch(err => console.error("❌ Failed to fetch keyword trend:", err));
    };

    fetchTrend();
    const interval = setInterval(fetchTrend, 10000); // 每10秒更新
    return () => clearInterval(interval);
  }, [keyword]);

  return (
    <div className="p-4 bg-white rounded-xl shadow">
      <h2 className="text-xl font-semibold mb-4">📈 Keyword Trend – <span className="text-blue-600">{keyword}</span></h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <XAxis dataKey="time" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="count" stroke="#3b82f6" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
