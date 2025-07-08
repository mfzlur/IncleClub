from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_bcrypt import Bcrypt
from flask_jwt_extended import create_access_token, JWTManager
import random
import os

# --- App Configuration ---
app = Flask(__name__)
# IMPORTANT: Change this to a strong, random secret key in a real application
app.config['SECRET_KEY'] = 'your-super-secret-key-change-me'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///site.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# --- Extensions Initialization ---
CORS(app)
db = SQLAlchemy(app)
migrate = Migrate(app, db)
bcrypt = Bcrypt(app)
jwt = JWTManager(app)

# --- Database Model ---
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(20), unique=True, nullable=False)
    password = db.Column(db.String(60), nullable=False)

    def __repr__(self):
        return f"User('{self.username}')"

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

# --- NEW: Authentication API Routes ---

@app.route('/api/register', methods=['POST'])
def register():
    data = request.get_json()
    user = User.query.filter_by(username=data['username']).first()
    if user:
        return jsonify({"message": "Username already exists"}), 409

    hashed_password = bcrypt.generate_password_hash(data['password']).decode('utf-8')
    new_user = User(username=data['username'], password=hashed_password)
    db.session.add(new_user)
    db.session.commit()
    return jsonify({"message": "User created successfully"}), 201

@app.route('/api/login', methods=['POST'])
def login():
    data = request.get_json()
    user = User.query.filter_by(username=data['username']).first()

    if user and bcrypt.check_password_hash(user.password, data['password']):
        access_token = create_access_token(identity={'username': user.username})
        return jsonify(access_token=access_token), 200
    
    return jsonify({"message": "Invalid credentials"}), 401



@app.route('/api/quote', methods=['GET'])
def get_quote():
    return jsonify(random.choice(quotes))

# UPDATED: New endpoint to get a random media item
@app.route('/api/media', methods=['GET'])
def get_media():
    """Returns a random media item from the list."""
    random_media = random.choice(media_items)
    return jsonify(random_media)

# Vercel needs the 'app' object to be available
# Make sure the 'if __name__ == '__main__':' block is removed for Vercel deployment



