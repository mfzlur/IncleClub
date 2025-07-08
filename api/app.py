from flask import Flask, jsonify
from flask_cors import CORS
import random

app = Flask(__name__)
CORS(app)

# Sample data for quotes
quotes = [
    {"text": "The only way to do great work is to love what you do.", "author": "Steve Jobs"},
    {"text": "Innovation distinguishes between a leader and a follower.", "author": "Steve Jobs"},
    {"text": "The future belongs to those who believe in the beauty of their dreams.", "author": "Eleanor Roosevelt"},
    {"text": "Strive not to be a success, but rather to be of value.", "author": "Albert Einstein"},
    {"text": "Life is what happens when you're busy making other plans.", "author": "John Lennon"},
    {"text": "Behenchod Maa Chuda", "author": "arse"},
]


# NEW: Expanded media data with different types
media_items = [
    {"type": "youtube", "videoId": "S3G3e246a4g"},
    {"type": "image", "url": "https://images.unsplash.com/photo-1611162617213-6d22e525b3a3?q=80&w=1000"},
    {"type": "gif", "url": "https://media.giphy.com/media/3o7TKSjR5k4i3Nn1XW/giphy.gif"},
    {"type": "video", "url": "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"},
    {"type": "youtube", "url": "https://www.youtube.com/shorts/uXb6yDOLp6s"} 
]





@app.route('/api/quote', methods=['GET'])
def get_quote():
    return jsonify(random.choice(quotes))

# UPDATED: New endpoint to get a random media item
@app.route('/api/media', methods=['GET'])
def get_media():
    """Returns a random media item from the list."""
    random_media = random.choice(media_items)
    return jsonify(random_media)


