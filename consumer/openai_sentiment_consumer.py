import json
import os
from kafka import KafkaConsumer
from dotenv import load_dotenv
from pymongo import MongoClient
from datetime import datetime, timezone
from textblob import TextBlob
from uuid import uuid4

# ✅ Kafka 消费者连接
consumer = KafkaConsumer(
    "raw-comments",
    bootstrap_servers="localhost:9092",
    group_id="sentiment-analyzer",  # 每次运行随机 group id！
    auto_offset_reset="latest",
    enable_auto_commit=True,
    value_deserializer=lambda x: json.loads(x.decode("utf-8"))
)
print(f"🧩 Subscribed to: {consumer.subscription()}")  # 添加调试
# ✅ MongoDB 连接（本地运行用 localhost，容器内用 mongo）
mongo_client = MongoClient("mongodb://localhost:27017/")
db = mongo_client["sentiment_db"]
collection = db["analyzed_comments"]

print("🚀 Listening to Kafka...")

# ✅ 情绪分析函数（使用 TextBlob）
def analyze_sentiment(text):
    blob = TextBlob(text)
    polarity = blob.sentiment.polarity  # -1 ~ 1

    if polarity > 0.2:
        sentiment = "Positive"
    elif polarity < -0.2:
        sentiment = "Negative"
    else:
        sentiment = "Neutral"

    confidence = abs(polarity)  # 把极性作为信心值

    return sentiment, confidence

# ✅ 消费 Kafka 消息并存入数据库
print("🔍 Listening for messages from Kafka topic 'raw-comments'...")

try:
    for message in consumer:
        print("📥 Received message from Kafka")
        data = message.value
        text = data.get("text", "")
        if not text:
            print("⚠️ Empty message, skipping")
            continue

        sentiment, confidence = analyze_sentiment(text)

        result = {
            "text": text,
            "sentiment": sentiment,
            "confidence": confidence,   # ✅ 加这个
            "source": data.get("source", "unknown"),
            "created_at": datetime.now(timezone.utc)
        }
        try: 
            collection.insert_one(result)
            print(f"✅ Analyzed: {text[:40]}... → Sentiment: {sentiment}")
        except Exception as e:
            print(f"❌ Failed to insert into MongoDB: {e}")

except KeyboardInterrupt:
    print("🛑 Consumer stopped manually")

except Exception as e:
    print(f"❌ Error in consumer: {e}")
