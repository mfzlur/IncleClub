from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_jwt_extended import create_access_token, JWTManager
import random
import os

# --- Vercel-Friendly App Initialization ---

# Define a writable path in the serverless environment for the instance folder
instance_path = os.path.join('/tmp', 'instance')

# Initialize the Flask app with a custom, writable instance path
app = Flask(__name__, instance_path=instance_path)

# Ensure the instance folder exists every time the function starts
# This is necessary because the /tmp directory can be cleared.
try:
    os.makedirs(app.instance_path)
except OSError:
    # An error is raised if the directory already exists, which is fine.
    pass

# --- App Configuration ---
app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY', 'a-fallback-secret-key-for-dev')

# Configure the database URI to also be in the writable /tmp directory
db_path = os.path.join('/tmp', 'site.db')
app.config['SQLALCHEMY_DATABASE_URI'] = f'sqlite:///{db_path}'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False


# --- Extensions Initialization ---
CORS(app)
db = SQLAlchemy(app) # This line should now succeed
bcrypt = Bcrypt(app)
jwt = JWTManager(app)


# --- Database Model (remains the same) ---
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(20), unique=True, nullable=False)
    password = db.Column(db.String(60), nullable=False)


# --- IMPORTANT: Ensure Database and Tables are Created ---
# This block creates the site.db file and User table if they don't exist
with app.app_context():
    db.create_all()


# --- Your API Routes (remain the same) ---

@app.route('/register', methods=['POST'])
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

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    user = User.query.filter_by(username=data['username']).first()

    if user and bcrypt.check_password_hash(user.password, data['password']):
        access_token = create_access_token(identity={'username': user.username})
        return jsonify(access_token=access_token), 200
    
    return jsonify({"message": "Invalid credentials"}), 401

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
