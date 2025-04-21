from fastapi import FastAPI, WebSocket
import asyncio
from fastapi.middleware.cors import CORSMiddleware
from pymongo import MongoClient
from bson import ObjectId
from bson.json_util import dumps
from fastapi.responses import JSONResponse
import random
import json
from datetime import datetime, timedelta
from fastapi import WebSocketDisconnect
from collections import Counter
import re
from fastapi.responses import JSONResponse
import random
from fastapi import APIRouter, Query
from datetime import datetime, timedelta
import nltk
from nltk.corpus import stopwords
nltk.download("stopwords")
STOPWORDS = set(stopwords.words("english"))

app = FastAPI()

# CORS（跨域支持）
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# MongoDB 连接
client = MongoClient("mongodb://localhost:27017/")
db = client["sentiment_db"]
collection = db["analyzed_comments"]

# 如果第一次运行，记得下载停用词表
nltk.download("stopwords")
STOPWORDS = set(stopwords.words("english"))

def extract_top_keywords(docs, top_n=10):
    all_text = " ".join(doc.get("text", "") for doc in docs)
    tokens = re.findall(r"\b\w{3,}\b", all_text.lower())  # 匹配长度>=3的单词
    filtered = [word for word in tokens if word not in STOPWORDS]
    freq = Counter(filtered)
    return [word for word, _ in freq.most_common(top_n)]

@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()

    last_seen_id = None

    while True:
        # 从 Mongo 中获取最新一条推文
        latest = collection.find().sort("created_at", -1).limit(1)
        doc = next(latest, None)

        if doc and str(doc["_id"]) != last_seen_id:
            last_seen_id = str(doc["_id"])
            doc["_id"] = str(doc["_id"])
            doc["created_at"] = doc["created_at"].isoformat()
            await websocket.send_text(json.dumps(doc))

        await asyncio.sleep(2)

# ✅ 获取最近 100 条分析记录
@app.get("/api/sentiment/latest")
def get_latest():
    cursor = collection.find().sort("created_at", -1).limit(100)
    results = []
    for doc in cursor:
        results.append({
            "_id": str(doc["_id"]),  # ✅ 转字符串
            "text": doc["text"],
            "sentiment": doc["sentiment"],
            "source": doc.get("source", "unknown"),
            "created_at": doc["created_at"].isoformat()  # ✅ 转为标准字符串
        })
    return JSONResponse(content=results)

# ✅ 获取正/负/中 情绪统计
@app.get("/api/sentiment/stats")
def get_stats():
    pipeline = [
        {"$group": {"_id": "$sentiment", "count": {"$sum": 1}}}
    ]
    stats = list(collection.aggregate(pipeline))
    return JSONResponse(content=dumps(stats), media_type="application/json")

# ✅ 获取近6小时的情绪趋势数据（用于折线图展示）
@app.get("/api/sentiment/hourly")
def get_hourly_sentiment():
    pipeline = [
        {
            "$group": {
                "_id": { "$hour": "$created_at" },
                "positive": { "$sum": { "$cond": [{ "$eq": ["$sentiment", "Positive"] }, 1, 0] } },
                "negative": { "$sum": { "$cond": [{ "$eq": ["$sentiment", "Negative"] }, 1, 0] } },
                "neutral": { "$sum": { "$cond": [{ "$eq": ["$sentiment", "Neutral"] }, 1, 0] } },
            }
        },
        { "$sort": { "_id": 1 } }
    ]
    results = []
    for doc in collection.aggregate(pipeline):
        results.append({
            "hour": doc["_id"],
            "positive": doc.get("positive", 0),
            "negative": doc.get("negative", 0),
            "neutral": doc.get("neutral", 0)
        })
    return JSONResponse(content=results)

@app.get("/api/keywords")
def get_keywords():
    texts = collection.find({}, {"text": 1}).limit(500)
    
    all_words = []
    for doc in texts:
        text = doc.get("text", "").lower()
        words = re.findall(r"\b\w{4,}\b", text)  # 至少4个字母，过滤掉 like, i, a 等
        all_words.extend(words)

    counter = Counter(all_words)
    top_words = counter.most_common(30)

    results = [{"text": word, "value": count} for word, count in top_words]
    return JSONResponse(content=results)

@app.get("/api/sentiment/confidence")
def get_sentiment_confidence():
    bins = [
        (0.9, 1.0),
        (0.8, 0.9),
        (0.7, 0.8),
    ]
    
    result = []
    for low, high in bins:
        match = {
            "$match": {
                "confidence": {"$gte": low, "$lt": high}
            }
        }
        group = {
            "$group": {
                "_id": "$sentiment",
                "count": {"$sum": 1}
            }
        }
        docs = list(collection.aggregate([match, group]))
        entry = {
            "confidence": f"{low:.1f}–{high:.1f}",
            "positive": 0,
            "neutral": 0,
            "negative": 0
        }
        for doc in docs:
            sentiment = doc["_id"]
            if sentiment.lower() == "positive":
                entry["positive"] = doc["count"]
            elif sentiment.lower() == "negative":
                entry["negative"] = doc["count"]
            else:
                entry["neutral"] = doc["count"]
        result.append(entry)
    
    return JSONResponse(content=result)

@app.get("/api/emotion-breakdown")
def get_emotion_breakdown():
    emotions = ["Joy", "Sadness", "Anger", "Fear", "Disgust", "Surprise"]
    result = [{"emotion": e, "count": random.randint(20, 120)} for e in emotions]
    return JSONResponse(content=result)

@app.get("/api/keyword-trend")
def get_keyword_trend(keyword: str = Query(...)):
    now = datetime.utcnow()
    data = []
    for i in range(12):  # 过去12个时间点
        hour = (now - timedelta(hours=11 - i)).strftime("%H:%M")
        count = random.randint(5, 50) if keyword else 0
        data.append({
            "time": hour,
            "count": count
        })
    return JSONResponse(content=data)


@app.get("/api/metrics")
def get_metrics():
    total = collection.count_documents({})
    positive = collection.count_documents({"sentiment": "Positive"})
    recent = list(collection.find().sort("created_at", -1).limit(60))  # 最近一分钟
    keywords = extract_top_keywords(recent)

    return {
        "totalTweets": total,
        "positivePercentage": round(positive / total * 100, 2) if total > 0 else 0,
        "topKeywords": keywords[:3],
        "tweetsPerMinute": len(recent),
    }
