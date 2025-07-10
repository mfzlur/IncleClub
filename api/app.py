from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_jwt_extended import create_access_token, JWTManager
import random
from flask_jwt_extended import jwt_required
import os
from api.memes import sample_memes
from api.quotes import sample_quotes


# --- Application Initialization ---
app = Flask(__name__)

# # --- App Configuration ---
# app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY', 'a-fallback-secret-key-for-dev')
# app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL')
# app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# --- Extensions Initialization ---
CORS(app)
# db = SQLAlchemy(app)
bcrypt = Bcrypt(app)
# jwt = JWTManager(app)

# # --- Database Models ---
# class User(db.Model):
#     id = db.Column(db.Integer, primary_key=True)
#     username = db.Column(db.String(20), unique=True, nullable=False)
#     password = db.Column(db.String(60), nullable=False)

# # NEW: Quote model
# class Quote(db.Model):
#     id = db.Column(db.Integer, primary_key=True)
#     text = db.Column(db.String(500), nullable=False)
#     author = db.Column(db.String(100), nullable=False)

# # NEW: Add the Meme model
# class Meme(db.Model):
#     id = db.Column(db.Integer, primary_key=True)
#     imageUrl = db.Column(db.String(500), nullable=False)

#     def __repr__(self):
#         return f"Meme('{self.imageUrl}')"

# # This block creates tables and seeds the Quote table if empty.
# with app.app_context():
#     db.create_all()

#     if Quote.query.count() == 0:

#         for q in sample_quotes:
#             db.session.add(Quote(text=q['text'], author=q['author']))


#     # NEW: Check if the Meme table is empty and seed it
#     if Meme.query.count() == 0:

#         for m in sample_memes:
#             db.session.add(Meme(imageUrl=m['imageUrl']))
#         db.session.commit()


# --- API Routes ---

@app.route('/api/register', methods=['POST'])
def register():
    try:
        data = request.get_json()
        if not data or 'username' not in data or 'password' not in data:
            return jsonify({"message": "Missing username or password"}), 400

        user = User.query.filter_by(username=data['username']).first()
        if user:
            return jsonify({"message": "Username already exists"}), 409

        hashed_password = bcrypt.generate_password_hash(data['password']).decode('utf-8')
        new_user = User(username=data['username'], password=hashed_password)
        
        db.session.add(new_user)
        db.session.commit()
        
        return jsonify({"message": "User created successfully"}), 201

    except Exception as e:
        # If any error occurs, roll back the session and log the error
        # db.session.rollback()
        app.logger.error(f"Error in /api/register: {e}")
        return jsonify({"message": "An internal error occurred during registration"}), 500


@app.route('/api/login', methods=['POST'])
def login():
    try:
        data = request.get_json()
        if not data or 'username' not in data or 'password' not in data:
            return jsonify({"message": "Missing username or password"}), 400

        user = User.query.filter_by(username=data['username']).first()

        if user and bcrypt.check_password_hash(user.password, data['password']):
            access_token = create_access_token(identity={'username': user.username})
            return jsonify(access_token=access_token), 200
        
        return jsonify({"message": "Invalid credentials"}), 401

    except Exception as e:
        app.logger.error(f"Error in /api/login: {e}")
        return jsonify({"message": "An internal error occurred during login"}), 500

# UPDATED: This route now uses the more efficient offset method
@app.route('/api/quote', methods=['GET'])
def get_quote():
    # 1. Get the total number of rows in the table
    # row_count = Quote.query.count()

    # if row_count > 0:
    #     # 2. Generate a random number to use as an offset
    #     random_offset = random.randint(0, row_count - 1)
        
    #     # 3. Fetch the single row at that random offset
    #     random_quote = Quote.query.offset(random_offset).first()
        
    #     return jsonify({"text": random_quote.text, "author": random_quote.author})
    
    # return jsonify({"message": "No quotes found"}), 404
    return jsonify(random.choice(sample_quotes))



# UPDATED: This route also uses the more efficient offset method
@app.route('/api/meme', methods=['GET'])
def get_meme():
    # # 1. Get the total number of rows
    # row_count = Meme.query.count()

    # if row_count > 0:
    #     # 2. Generate a random offset
    #     random_offset = random.randint(0, row_count - 1)
        
    #     # 3. Fetch the single row at that offset
    #     random_meme = Meme.query.offset(random_offset).first()
        
    #     return jsonify({"imageUrl": random_meme.imageUrl})
    
    # return jsonify({"message": "No memes found"}), 404
    return jsonify(random.choice(sample_memes))



# # --- NEW: Secure endpoints for adding content ---

# @app.route('/api/quote/add', methods=['POST'])
# @jwt_required()
# def add_quote():
#     data = request.get_json()
    
#     # You could use get_jwt_identity() here to see who submitted it,
#     # but for now, we'll just add the quote to the main list.
    
#     new_quote = Quote(text=data['text'], author=data['author'])
#     db.session.add(new_quote)
#     db.session.commit()
    
#     return jsonify({"message": "Quote added successfully"}), 201

# @app.route('/api/meme/add', methods=['POST'])
# @jwt_required()
# def add_meme():
#     data = request.get_json()
    
#     new_meme = Meme(imageUrl=data['imageUrl'])
#     db.session.add(new_meme)
#     db.session.commit()
    
#     return jsonify({"message": "Meme added successfully"}), 201
