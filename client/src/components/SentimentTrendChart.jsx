import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";

export default function SentimentTrendChart() {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const fetchHourlyData = () => {
      fetch("http://localhost:8000/api/sentiment/hourly")
        .then(res => res.json())
        .then(data => {
          const formatted = data
            .filter(item => item.hour !== null)
            .map(item => ({
              ...item,
              hour: typeof item.hour === "string" ? item.hour : `${item.hour.toString().padStart(2, '0')}:00`
            }));
          setChartData(formatted);
        })
        .catch(err => {
          console.error("❌ Failed to fetch hourly sentiment:", err);
        });
    };
  
    fetchHourlyData(); // 第一次加载
    const interval = setInterval(fetchHourlyData, 10000); // 每 60 秒拉取一次
  
    return () => clearInterval(interval); // 组件卸载时清理定时器
  }, []);

  return (
    <div className="bg-white rounded-xl shadow p-4">
      <h2 className="text-xl font-semibold mb-4 border-b pb-2">📈 Hourly Sentiment Trend</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData}>
          <XAxis dataKey="hour" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="positive" stroke="#22c55e" name="Positive 😊" />
          <Line type="monotone" dataKey="negative" stroke="#ef4444" name="Negative 😡" />
          <Line type="monotone" dataKey="neutral" stroke="#eab308" name="Neutral 😐" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
