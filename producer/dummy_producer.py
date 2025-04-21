from kafka import KafkaProducer
import json
import time
import random

producer = KafkaProducer(
    bootstrap_servers="localhost:9092",
    value_serializer=lambda x: json.dumps(x).encode("utf-8")
)

comments = [
    "Just got a refund from Amazon, super fast!",
    "Delivery delayed again... I'm frustrated.",
    "This product is absolutely amazing, exceeded expectations!",
    "The app is okay, but sometimes it crashes unexpectedly.",
    "Customer support was friendly and quick to respond.",
    "Still waiting for my package. Not happy.",
    "Excellent service, highly recommend!",
    "Terrible packaging. Item arrived broken.",
    "Finally got my order. Everything looks good.",
    "Worst experience ever. Never ordering again.",
    "Pretty good value for the price.",
    "Live chat agent was very helpful.",
    "Tracking number not updating. What’s going on?",
    "So happy with this purchase!",
    "Quality not what I expected. Feels cheap.",
    "Refund issued instantly. That’s impressive.",
    "Love the new design of the app!",
    "Received a different item than what I ordered.",
    "Fast shipping and well-packed. Thank you!",
    "Very disappointing customer experience.",
    "Neutral feeling about the product. It works.",
    "Amazing quality and fast delivery.",
    "I’m so angry, still no delivery after 10 days.",
    "Love it! 5 stars from me.",
    "Had to return the product. Didn’t work.",
    "Support team solved my issue in 5 minutes!",
    "Not sure how I feel about this one...",
    "This brand always delivers great service.",
    "Received a used item instead of new. Disgusting.",
    "Perfectly packed and arrived early.",
    "Too expensive for the quality.",
    "App UI is much better now!",
    "Why does it take 3 days to ship something?",
    "Completely satisfied. Will order again.",
    "Refund denied for no reason. Unacceptable.",
    "Could be better. Could be worse.",
    "Customer service was rude and unhelpful.",
    "Package stolen and no support. Seriously?",
    "Loved the packaging and attention to detail!",
    "Faulty item and delayed replacement. Not cool.",
    "App lags when searching products.",
    "Received extra goodies in my box. Nice touch!",
    "The return process was super smooth.",
    "Very poor experience. Never again.",
    "Just okay. Nothing stood out.",
    "You guys nailed it. Great job!",
    "Phone line support was down all day.",
    "Chatbot actually worked well this time.",
    "What a joke. I want my money back.",
    "Positive vibes only. Great experience!",
    "Received item earlier than expected!",
    "Overpriced for what you get.",
    "I expected more from this brand.",
    "Simple and fast checkout process!",
    "Still waiting for someone to respond to my ticket.",
    "Everything was perfect, no complaints.",
    "Item missing from the package. Help?",
    "Best customer service I’ve ever experienced.",
    "Had to explain my issue 3 times.",
    "This app update made everything worse.",
    "Fast, friendly, and efficient service.",
    "Refund processed in under 10 minutes!",
    "Zero stars if I could.",
    "Ordered 2 items, only received 1.",
    "Nice product. Will buy again.",
    "Very buggy app interface.",
    "Order arrived wet. Packaging failure.",
    "Exactly what I wanted!",
    "Support team ghosted me after initial reply.",
    "Item as described. Good experience.",
    "Waited 15 minutes in chat queue. Worth it.",
    "Just horrible. Can't believe this happened.",
    "Totally satisfied!",
    "Mediocre service for a premium price.",
    "Love how easy returns are.",
    "Never buying from this store again.",
    "Fast refund and kind staff!",
    "Product doesn’t match the photos.",
    "Can’t track my shipment. Super annoying.",
    "Flawless experience from start to finish.",
    "Still no refund after 2 weeks. Scam?",
    "Exactly as advertised. Thumbs up!",
    "Crashes every time I click checkout.",
    "Received a thank-you note inside. Wow!",
    "The app UI is so clean and smooth.",
    "Wrong size, wrong color. Disappointed.",
    "Perfect gift idea. Love it!",
    "Support asked me to call a number that doesn’t work.",
    "Everything arrived intact and on time.",
    "Feels a bit cheap but does the job.",
    "Worst packaging ever. Torn box.",
    "Very responsive support. Surprised me!",
    "Still no update after 5 days...",
    "Impressed with how fast everything went.",
    "Refund was refused. What a joke.",
    "Best unboxing experience ever!",
    "Received apology email. Appreciate the gesture.",
    "Great product, terrible service.",
    "This was a smooth ride. Thanks!",
    "Do you even care about your customers?",
    "Pleasantly surprised with the quality!",
    "Support sent me a discount code. Nice!",
    "Completely unprofessional response.",
    "Fast and reliable. Well done."
]

print("🚀 Starting dummy producer...")

try:
    while True:
        comment = random.choice(comments)
        producer.send("raw-comments", {"text": comment, "source": "dummy"})
        print(f"🟢 Sent: {comment}")
        time.sleep(1)  # 每 2 秒发送一条，可以按需调整
except KeyboardInterrupt:
    print("🛑 Stopping producer.")
finally:
    producer.flush()
    producer.close()
