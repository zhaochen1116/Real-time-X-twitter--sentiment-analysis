# 🧠 SentinelSense – Real-Time Sentiment Analysis with Kafka & AI

**SentinelSense** is a real-time sentiment analysis system built with Kafka, AI models, and a modern React dashboard. It ingests live or simulated comment streams, performs emotion classification (positive, negative, neutral), and visualizes insights via an interactive frontend. Ideal for customer feedback tracking, brand monitoring, or real-time dashboards.

---

## ⚙️ Tech Stack

- **Streaming**: Kafka Producer (supports Fake data / Twitter Stream)
- **AI Processing**: Kafka Consumer + TextBlob or OpenAI GPT-3.5
- **Database**: MongoDB (stores processed sentiment results)
- **Real-Time**: WebSocket push to frontend
- **Backend**: FastAPI (Python)
- **Frontend**: React + Tailwind CSS + Recharts

---

## 📊 Visualization Modules

- 📝 Real-time Tweet List
- 📊 Sentiment Pie Chart
- 📈 Hourly Sentiment Trend Chart
- 🌐 Keyword Word Cloud
- 🔎 Sentiment Confidence Histogram
- 📊 Emotion Category Breakdown
- 🎯 Sentiment Ratio Gauge
- 🏆 Top Influential Tweets
- 📟 Real-Time KPI Metrics

---

## 📦 Project Structure

```
SentinelSense/
├── client/                  # React frontend
│   ├── components/          # Chart and UI modules
│   └── pages/Dashboard.jsx  # Main dashboard
├── producer/                # Kafka producers (Fake/Twitter)
├── consumer/                # Kafka consumer + sentiment classifier
├── api/                     # FastAPI backend
├── docker-compose.yml       # Kafka + MongoDB + Backend services
```

---

## 🚀 Getting Started

### 1. Start services via Docker

```bash
docker-compose up -d
```

### 2. Start backend API

```bash
cd api
uvicorn main:app --reload --port 8000
```

### 3. Start React frontend

```bash
cd client
npm install
npm run dev
```

### 4. Optional: Start fake data producer

```bash
python producer/dummy_producer.py
```

---

## 🖼️ Live Dashboard Preview

> Includes dynamic WebSocket updates, real-time charts, and animated transitions for new tweets.
![alt text](assets/firefox_PG6d06asMT.gif)
---

## 🧠 AI Sentiment Classification

You can toggle between:
- `TextBlob`: lightweight local polarity classifier
- `OpenAI GPT`: rich context-aware emotional judgment (requires API key)

---

## 📎 License

MIT License