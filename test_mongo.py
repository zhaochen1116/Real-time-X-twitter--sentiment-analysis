# from pymongo import MongoClient

# client = MongoClient("mongodb://localhost:27017/")
# db = client["sentiment_db"]
# collection = db["analyzed_comm"]

# result = collection.insert_one({"test": "hello from tester"})
# print("✅ Mongo insert success:", result.inserted_id)
from kafka import KafkaConsumer
from pymongo import MongoClient
from datetime import datetime, timezone
import json

consumer = KafkaConsumer(
    "raw-comments",
    bootstrap_servers="localhost:9092",
    group_id=f"sentiment-analyzer-debug",
    auto_offset_reset="latest",
    value_deserializer=lambda x: json.loads(x.decode("utf-8")),
)

client = MongoClient("mongodb://localhost:27017/")
db = client["sentiment_db"]
collection = db["analyzed_comments"]

print("🚀 Listening to Kafka...")

for msg in consumer:
    data = msg.value
    print("📥 Kafka:", data)

    doc = {
        "text": data.get("text", "empty"),
        "sentiment": "Test",
        "source": "debug",
        "created_at": datetime.now(timezone.utc)
    }

    try:
        collection.insert_one(doc)
        print("✅ Inserted to Mongo")
    except Exception as e:
        print("❌ Mongo Error:", e)
