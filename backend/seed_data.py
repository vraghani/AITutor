"""
Script to seed the database with mock data
Run this after starting the server: python seed_data.py
"""
import asyncio
from motor.motor_asyncio import AsyncIOMotorClient
from models import *
from auth import get_password_hash
import os
from dotenv import load_dotenv

load_dotenv()

mongo_url = os.environ.get('MONGO_URL', 'mongodb://localhost:27017/')
db_name = os.environ.get('DB_NAME', 'ai_tutor')

client = AsyncIOMotorClient(mongo_url)
db = client[db_name]

async def seed_users():
    """Seed demo users"""
    print("Seeding users...")
    
    users = [
        {
            **UserInDB(
                id="admin-001",
                email="admin@aitutor.com",
                full_name="Admin User",
                role=UserRole.ADMIN,
                password_hash=get_password_hash("admin123")
            ).dict()
        },
        {
            **UserInDB(
                id="teacher-001",
                email="teacher@aitutor.com",
                full_name="John Teacher",
                role=UserRole.TEACHER,
                password_hash=get_password_hash("teacher123")
            ).dict()
        },
        {
            **UserInDB(
                id="student-001",
                email="student@aitutor.com",
                full_name="Alice Student",
                role=UserRole.STUDENT,
                password_hash=get_password_hash("student123")
            ).dict()
        }
    ]
    
    for user in users:
        await db.users.update_one(
            {"email": user["email"]},
            {"$set": user},
            upsert=True
        )
    
    print(f"✓ Seeded {len(users)} users")

async def seed_books():
    """Seed book library"""
    print("Seeding books...")
    
    books = [
        Book(
            title="NCERT Mathematics Class 10",
            author="NCERT",
            stream=Stream.CBSE,
            class_level=10,
            subject="Mathematics",
            topic="Quadratic Equations",
            summary="Complete guide to quadratic equations including factorization, completing the square, and using the quadratic formula.",
            tags=["algebra", "equations", "ncert"],
            uploaded_by="admin-001",
            approved=True,
            content_url="https://ncert.nic.in/textbook/pdf/jemh101.pdf"
        ),
        Book(
            title="NCERT Physics Class 11",
            author="NCERT",
            stream=Stream.CBSE,
            class_level=11,
            subject="Physics",
            topic="Newton's Laws of Motion",
            summary="Comprehensive coverage of Newton's three laws of motion with real-world applications and problem-solving techniques.",
            tags=["mechanics", "motion", "ncert"],
            uploaded_by="admin-001",
            approved=True,
            content_url="https://ncert.nic.in/textbook/pdf/keph101.pdf"
        ),
        Book(
            title="NCERT Chemistry Class 12",
            author="NCERT",
            stream=Stream.CBSE,
            class_level=12,
            subject="Chemistry",
            topic="Chemical Kinetics",
            summary="Study of reaction rates, rate laws, and factors affecting chemical reactions.",
            tags=["kinetics", "reactions", "ncert"],
            uploaded_by="admin-001",
            approved=True
        ),
        Book(
            title="Biology Fundamentals",
            author="Dr. Smith",
            stream=Stream.CBSE,
            class_level=9,
            subject="Biology",
            topic="Cell Structure",
            summary="Detailed exploration of cell structure, organelles, and their functions in living organisms.",
            tags=["cell", "biology", "fundamentals"],
            uploaded_by="teacher-001",
            approved=True
        ),
        Book(
            title="English Grammar and Composition",
            author="Wren & Martin",
            stream=Stream.ICSE,
            class_level=10,
            subject="English",
            topic="Tenses and Verb Forms",
            summary="Master all English tenses with examples, exercises, and practical applications.",
            tags=["grammar", "tenses", "english"],
            uploaded_by="teacher-001",
            approved=True
        )
    ]
    
    for book in books:
        await db.books.insert_one(book.dict())
    
    print(f"✓ Seeded {len(books)} books")

async def seed_videos():
    """Seed video library"""
    print("Seeding videos...")
    
    videos = [
        Video(
            title="Quadratic Equations - Complete Tutorial",
            teacher_name="Prof. Ramesh Kumar",
            stream=Stream.CBSE,
            class_level=10,
            subject="Mathematics",
            topic="Quadratic Equations",
            video_url="https://www.youtube.com/embed/XKBX0r3J5YU",
            duration=1800,  # 30 minutes
            difficulty=DifficultyLevel.INTERMEDIATE,
            description="Learn to solve quadratic equations using different methods",
            tags=["algebra", "equations", "tutorial"],
            uploaded_by="teacher-001",
            approved=True
        ),
        Video(
            title="Newton's Laws Explained",
            teacher_name="Dr. Priya Sharma",
            stream=Stream.CBSE,
            class_level=11,
            subject="Physics",
            topic="Newton's Laws of Motion",
            video_url="https://www.youtube.com/embed/kKKM8Y-u7ds",
            duration=2400,  # 40 minutes
            difficulty=DifficultyLevel.BEGINNER,
            description="Understanding the fundamental laws of motion with examples",
            tags=["physics", "motion", "laws"],
            uploaded_by="teacher-001",
            approved=True
        ),
        Video(
            title="Chemical Kinetics Basics",
            teacher_name="Prof. Anjali Verma",
            stream=Stream.CBSE,
            class_level=12,
            subject="Chemistry",
            topic="Chemical Kinetics",
            video_url="https://www.youtube.com/embed/xezDt2Gflzs",
            duration=2100,  # 35 minutes
            difficulty=DifficultyLevel.INTERMEDIATE,
            description="Introduction to reaction rates and rate laws",
            tags=["chemistry", "kinetics", "reactions"],
            uploaded_by="teacher-001",
            approved=True
        ),
        Video(
            title="Cell Structure and Functions",
            teacher_name="Ms. Sunita Roy",
            stream=Stream.CBSE,
            class_level=9,
            subject="Biology",
            topic="Cell Structure",
            video_url="https://www.youtube.com/embed/URUJD5NEXC8",
            duration=1500,  # 25 minutes
            difficulty=DifficultyLevel.BEGINNER,
            description="Explore the building blocks of life - cells and their components",
            tags=["biology", "cell", "structure"],
            uploaded_by="teacher-001",
            approved=True
        ),
        Video(
            title="Mastering English Tenses",
            teacher_name="Prof. David Wilson",
            stream=Stream.ICSE,
            class_level=10,
            subject="English",
            topic="Tenses and Verb Forms",
            video_url="https://www.youtube.com/embed/6mD9bvbzBKE",
            duration=1800,  # 30 minutes
            difficulty=DifficultyLevel.INTERMEDIATE,
            description="Complete guide to all 12 English tenses with examples",
            tags=["english", "grammar", "tenses"],
            uploaded_by="teacher-001",
            approved=True
        )
    ]
    
    for video in videos:
        await db.videos.insert_one(video.dict())
    
    print(f"✓ Seeded {len(videos)} videos")

async def seed_quizzes():
    """Seed quizzes"""
    print("Seeding quizzes...")
    
    quizzes = [
        Quiz(
            title="Quadratic Equations - Practice Quiz",
            stream=Stream.CBSE,
            class_level=10,
            subject="Mathematics",
            topic="Quadratic Equations",
            difficulty=DifficultyLevel.INTERMEDIATE,
            questions=[
                QuizQuestion(
                    question="What is the standard form of a quadratic equation?",
                    options=[
                        "ax + b = 0",
                        "ax² + bx + c = 0",
                        "ax³ + bx² + cx + d = 0",
                        "ax² + b = 0"
                    ],
                    correct_answer=1,
                    explanation="The standard form of a quadratic equation is ax² + bx + c = 0, where a ≠ 0"
                ),
                QuizQuestion(
                    question="If the discriminant (b² - 4ac) is negative, the quadratic equation has:",
                    options=[
                        "Two real and equal roots",
                        "Two real and distinct roots",
                        "No real roots",
                        "One real root"
                    ],
                    correct_answer=2,
                    explanation="When discriminant is negative, the equation has no real roots (complex roots)"
                ),
                QuizQuestion(
                    question="What is the sum of roots of equation x² - 5x + 6 = 0?",
                    options=["5", "-5", "6", "-6"],
                    correct_answer=0,
                    explanation="Sum of roots = -b/a = -(-5)/1 = 5"
                )
            ],
            created_by="teacher-001"
        ),
        Quiz(
            title="Newton's Laws - Quick Test",
            stream=Stream.CBSE,
            class_level=11,
            subject="Physics",
            topic="Newton's Laws of Motion",
            difficulty=DifficultyLevel.BEGINNER,
            questions=[
                QuizQuestion(
                    question="Newton's First Law is also known as:",
                    options=[
                        "Law of Action-Reaction",
                        "Law of Inertia",
                        "Law of Acceleration",
                        "Law of Gravity"
                    ],
                    correct_answer=1,
                    explanation="Newton's First Law is called the Law of Inertia - an object at rest stays at rest"
                ),
                QuizQuestion(
                    question="According to Newton's Second Law, F = ma. If mass doubles and acceleration remains constant, force:",
                    options=[
                        "Remains same",
                        "Doubles",
                        "Halves",
                        "Becomes zero"
                    ],
                    correct_answer=1,
                    explanation="Force is directly proportional to mass, so if mass doubles, force doubles"
                )
            ],
            created_by="teacher-001"
        ),
        Quiz(
            title="Cell Structure Quiz",
            stream=Stream.CBSE,
            class_level=9,
            subject="Biology",
            topic="Cell Structure",
            difficulty=DifficultyLevel.BEGINNER,
            questions=[
                QuizQuestion(
                    question="Which organelle is known as the powerhouse of the cell?",
                    options=[
                        "Nucleus",
                        "Mitochondria",
                        "Ribosome",
                        "Golgi apparatus"
                    ],
                    correct_answer=1,
                    explanation="Mitochondria produce energy (ATP) for the cell, hence called the powerhouse"
                ),
                QuizQuestion(
                    question="What is the function of the cell membrane?",
                    options=[
                        "Protein synthesis",
                        "Energy production",
                        "Controls what enters and exits the cell",
                        "DNA storage"
                    ],
                    correct_answer=2,
                    explanation="Cell membrane is selectively permeable and controls the movement of substances"
                )
            ],
            created_by="teacher-001"
        )
    ]
    
    for quiz in quizzes:
        await db.quizzes.insert_one(quiz.dict())
    
    print(f"✓ Seeded {len(quizzes)} quizzes")

async def main():
    print("Starting database seed...")
    print("="*50)
    
    try:
        await seed_users()
        await seed_books()
        await seed_videos()
        await seed_quizzes()
        
        print("="*50)
        print("✓ Database seeded successfully!")
        print("\nTest Credentials:")
        print("-" * 50)
        print("Admin:   admin@aitutor.com / admin123")
        print("Teacher: teacher@aitutor.com / teacher123")
        print("Student: student@aitutor.com / student123")
        print("-" * 50)
        
    except Exception as e:
        print(f"✗ Error seeding database: {str(e)}")
    finally:
        client.close()

if __name__ == "__main__":
    asyncio.run(main())
