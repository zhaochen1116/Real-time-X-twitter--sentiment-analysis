// TopInfluentialTweets.jsx
const topTweets = [
    { text: "Amazing service!", sentiment: "Positive", likes: 124 },
    { text: "Terrible bug in the app.", sentiment: "Negative", likes: 98 },
  ];
  
  export default function TopInfluentialTweets() {
    return (
      <div className="p-4 bg-white rounded-xl shadow h-[300px] overflow-y-auto">
        <h2 className="text-xl font-semibold mb-4">🏆 Top Influential Tweets</h2>
        <ul className="space-y-2">
          {topTweets.map((tweet, idx) => (
            <li key={idx} className="p-2 rounded border">
              <p>{tweet.text}</p>
              <p className="text-xs text-gray-500">
                Sentiment: <strong>{tweet.sentiment}</strong> | ❤️ {tweet.likes}
              </p>
            </li>
          ))}
        </ul>
      </div>
    );
  }
  