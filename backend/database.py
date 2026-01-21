from motor.motor_asyncio import AsyncIOMotorClient
from dotenv import load_dotenv
import os

load_dotenv()

mongo_url = os.environ.get('MONGO_URL', 'mongodb://localhost:27017/')
db_name = os.environ.get('DB_NAME', 'ai_tutor')

client = AsyncIOMotorClient(mongo_url)
db = client[db_name]

# Collections
users_collection = db.users
books_collection = db.books
videos_collection = db.videos
quizzes_collection = db.quizzes
quiz_attempts_collection = db.quiz_attempts
chat_sessions_collection = db.chat_sessions
topic_progress_collection = db.topic_progress
student_profiles_collection = db.student_profiles

async def init_db():
    """Initialize database with indexes"""
    # Create indexes for better query performance
    await users_collection.create_index("email", unique=True)
    await books_collection.create_index([("stream", 1), ("class_level", 1), ("subject", 1)])
    await videos_collection.create_index([("stream", 1), ("class_level", 1), ("subject", 1)])
    await quizzes_collection.create_index([("stream", 1), ("class_level", 1), ("subject", 1)])
    await chat_sessions_collection.create_index("user_id")
    await topic_progress_collection.create_index([("user_id", 1), ("subject", 1), ("topic", 1)])
