import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { fetchSentimentStats } from '../api';

const COLORS = {
  Positive: "#22c55e",
  Negative: "#ef4444",
  Neutral: "#eab308",
  Unknown: "#06b6d4",
  Test: "#a855f7"
};

export default function SentimentPieChart() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = () => {
      fetchSentimentStats()
        .then(res => {
          const parsed = JSON.parse(res);
          setData(parsed.map(item => ({
            name: item._id,
            value: item.count,
            fill: COLORS[item._id] || "#94a3b8"  // 默认灰色
          })));
        })
        .catch(err => console.error("❌ Failed to fetch sentiment stats:", err));
    };

    fetchData();
    const interval = setInterval(fetchData, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-4 bg-white rounded-xl shadow">
      <h2 className="text-xl font-semibold mb-4">📊 Sentiment Distribution</h2>
      <ResponsiveContainer width="100%" height={260}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            outerRadius={90}
            label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.fill} />
            ))}
          </Pie>
          <Tooltip />
          <Legend layout="horizontal" verticalAlign="bottom" align="center" />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
