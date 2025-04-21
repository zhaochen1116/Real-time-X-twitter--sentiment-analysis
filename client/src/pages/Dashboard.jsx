import React from "react";
import TweetList from "../components/TweetList";
import SentimentPieChart from "../components/SentimentPieChart";
import SentimentTrendChart from "../components/SentimentTrendChart";
import KeywordWordCloud from "../components/KeywordWordCloud";
import SentimentConfidenceHistogram from "../components/SentimentConfidenceHistogram";
import TopInfluentialTweets from "../components/TopInfluentialTweets";
import SentimentRatioGauge from "../components/SentimentRatioGauge";
import EmotionCategoryBreakdown from "../components/EmotionCategoryBreakdown";
import KeywordTrendLine from "../components/KeywordTrendLine";
import RealTimeMetricsBox from "../components/RealTimeMetricsBox";

export default function Dashboard() {
  // return (
  //   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-6">
      
  //     {/* 📝 实时推文 */}
  //     <div className="col-span-1">
  //       <TweetList />
  //     </div>

  //     {/* 📊 情绪饼图 */}
  //     <div className="bg-white rounded-xl shadow p-4">
  //       <SentimentPieChart />
  //     </div>

  //     {/* 🎯 情绪比例仪表盘 */}
  //     <div className="bg-white rounded-xl shadow p-4">
  //       <SentimentRatioGauge />
  //     </div>

  //     {/* 📈 情绪趋势图（跨两列） */}
  //     <div className="col-span-2 bg-white rounded-xl shadow p-4">
  //       <SentimentTrendChart />
  //     </div>

  //     {/* 🌐 关键词词云 */}
  //     <div className="bg-white rounded-xl shadow p-4">
  //       <KeywordWordCloud />
  //     </div>

  //     {/* 🔎 情绪信心直方图 */}
  //     <div className="bg-white rounded-xl shadow p-4">
  //       <SentimentConfidenceHistogram />
  //     </div>

  //     {/* 🏆 Top 推文 */}
  //     <div className="col-span-1 bg-white rounded-xl shadow p-4">
  //       <TopInfluentialTweets />
  //     </div>

  //     {/* ...在 Dashboard 中合适位置加上 👇 */}
  //     <div className="bg-white rounded-xl shadow p-4 col-span-1">
  //       <EmotionCategoryBreakdown />
  //     </div>

  //     <div className="col-span-2">
  //       <KeywordTrendLine keyword="refund" />
  //     </div>

  //     <main className="p-6">
  //       <RealTimeMetricsBox />
  //       {/* 其他组件在后面继续 */}
  //     </main>

  //   </div>
  // );

  return (
    <div className="p-6 space-y-6">
      {/* 自适应卡片区域 */}
      <div className="grid gap-4 grid-cols-[repeat(auto-fit,minmax(360px,1fr))]">

        {/* 模块卡片封装 */}
        <div className="bg-white rounded-xl shadow p-3 h-[400px] overflow-hidden">
          <TweetList />
        </div>

        <div className="bg-white rounded-xl shadow p-3 h-[400px] overflow-hidden">
          <SentimentPieChart />
        </div>

        <div className="bg-white rounded-xl shadow p-3 h-[400px] overflow-hidden">
          <SentimentRatioGauge />
        </div>

        <div className="bg-white rounded-xl shadow p-3 h-[400px] overflow-hidden">
          <KeywordWordCloud />
        </div>

        <div className="bg-white rounded-xl shadow p-3 h-[400px] overflow-hidden">
          <SentimentTrendChart />
        </div>

        <div className="bg-white rounded-xl shadow p-3 h-[400px] overflow-hidden">
          <KeywordTrendLine keyword="refund" />
        </div>

        <div className="bg-white rounded-xl shadow p-3 h-[400px] overflow-hidden">
          <EmotionCategoryBreakdown />
        </div>

        {/* ✅ 将实时指标也作为最后一个卡片嵌入 */}
        <div className="bg-white rounded-xl shadow p-3 h-[400px] overflow-hidden">
          <RealTimeMetricsBox />
        </div>

        <div className="bg-white rounded-xl shadow p-3 h-[400px] overflow-hidden">
        <SentimentConfidenceHistogram />
        </div>

        <div className="bg-white rounded-xl shadow p-3 h-[400px] overflow-hidden">
        <TopInfluentialTweets />
        </div>

      </div>
    </div>
  );
}
