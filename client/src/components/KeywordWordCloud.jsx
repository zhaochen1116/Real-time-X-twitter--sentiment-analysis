// KeywordWordCloud.jsx
import ReactWordcloud from "react-wordcloud";
import React, { useEffect, useState } from "react";

export default function KeywordWordCloud() {
  const [words, setWords] = useState([]);

  useEffect(() => {
    const fetchData = () => {
      fetch("http://localhost:8000/api/keywords")
        .then(res => res.json())
        .then(data => setWords(data))
        .catch(err => console.error("❌ Failed to fetch keywords:", err));
    };

    fetchData();
    const interval = setInterval(fetchData, 10000); // 每10秒更新
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-4 bg-white rounded-xl shadow">
      <h2 className="text-xl font-semibold mb-4">🌐 Keyword Word Cloud</h2>
      <div style={{ height: 300 }}>
        <ReactWordcloud
          words={words}
          options={{
            fontSizes: [14, 40],
            rotations: 2,
            rotationAngles: [-90, 0],
            fontFamily: "sans-serif"
          }}
        />
      </div>
    </div>
  );
}
