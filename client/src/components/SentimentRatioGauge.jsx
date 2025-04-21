import React, { useEffect, useState } from "react";
import {
  RadialBarChart,
  RadialBar,
  Legend,
  Tooltip,
  ResponsiveContainer
} from "recharts";

const COLORS = {
  Positive: "#22c55e",
  Neutral: "#eab308",
  Negative: "#ef4444"
};

export default function SentimentRatioGauge() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchStats = () => {
      fetch("http://localhost:8000/api/sentiment/stats")
        .then(res => res.json())
        .then(raw => {
          const parsed = JSON.parse(raw);
          const transformed = parsed.map(item => ({
            name: item._id,
            value: item.count,
            fill: COLORS[item._id] || "#999"
          }));
          setData(transformed);
        })
        .catch(err => {
          console.error("❌ Failed to fetch sentiment stats:", err);
        });
    };

    fetchStats(); // 初次加载
    const interval = setInterval(fetchStats, 10000); // 每 10 秒刷新
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-4 bg-white rounded-xl shadow">
      <h2 className="text-xl font-semibold mb-4">🎯 Sentiment Ratio Gauge</h2>
      <ResponsiveContainer width="100%" height={250}>
        <RadialBarChart
          cx="45%"
          cy="40%"
          innerRadius="40%"
          outerRadius="80%"
          barSize={15}
          data={data}
        >
          <RadialBar
            minAngle={15}
            background
            clockWise
            dataKey="value"
          />
          <Legend iconSize={10} layout="horizontal" verticalAlign="bottom" />
          <Tooltip />
        </RadialBarChart>
      </ResponsiveContainer>
    </div>
  );
}
