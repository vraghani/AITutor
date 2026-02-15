-- D1 Database Schema for AI Tutor

-- Users table
CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  full_name TEXT NOT NULL,
  role TEXT DEFAULT 'student',
  stream TEXT,
  class_level INTEGER,
  subjects TEXT,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP
);

-- Self assessments table
CREATE TABLE IF NOT EXISTS self_assessments (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  subject TEXT NOT NULL,
  topic TEXT NOT NULL,
  level TEXT NOT NULL,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE UNIQUE INDEX IF NOT EXISTS idx_user_subject_topic ON self_assessments(user_id, subject, topic);

-- Books table
CREATE TABLE IF NOT EXISTS books (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  author TEXT NOT NULL,
  stream TEXT NOT NULL,
  class_level INTEGER NOT NULL,
  subject TEXT NOT NULL,
  topic TEXT NOT NULL,
  summary TEXT,
  content_url TEXT,
  tags TEXT,
  uploaded_by TEXT,
  status TEXT DEFAULT 'pending',
  verified_by TEXT,
  verified_at TEXT,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (uploaded_by) REFERENCES users(id)
);

-- Videos table
CREATE TABLE IF NOT EXISTS videos (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  teacher_name TEXT NOT NULL,
  stream TEXT NOT NULL,
  class_level INTEGER NOT NULL,
  subject TEXT NOT NULL,
  topic TEXT NOT NULL,
  video_url TEXT,
  duration INTEGER,
  difficulty TEXT NOT NULL,
  description TEXT,
  tags TEXT,
  uploaded_by TEXT,
  status TEXT DEFAULT 'pending',
  verified_by TEXT,
  verified_at TEXT,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (uploaded_by) REFERENCES users(id)
);

-- Quizzes table
CREATE TABLE IF NOT EXISTS quizzes (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  stream TEXT NOT NULL,
  class_level INTEGER NOT NULL,
  subject TEXT NOT NULL,
  topic TEXT NOT NULL,
  difficulty TEXT NOT NULL,
  questions TEXT NOT NULL,
  created_by TEXT,
  status TEXT DEFAULT 'pending',
  verified_by TEXT,
  verified_at TEXT,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (created_by) REFERENCES users(id)
);

-- Quiz attempts table
CREATE TABLE IF NOT EXISTS quiz_attempts (
  id TEXT PRIMARY KEY,
  quiz_id TEXT NOT NULL,
  user_id TEXT NOT NULL,
  answers TEXT NOT NULL,
  score REAL NOT NULL,
  completed_at TEXT DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (quiz_id) REFERENCES quizzes(id),
  FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Chat sessions table
CREATE TABLE IF NOT EXISTS chat_sessions (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  subject TEXT,
  topic TEXT,
  context_type TEXT DEFAULT 'doubt',
  created_at TEXT DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Chat messages table
CREATE TABLE IF NOT EXISTS chat_messages (
  id TEXT PRIMARY KEY,
  session_id TEXT NOT NULL,
  role TEXT NOT NULL,
  content TEXT NOT NULL,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (session_id) REFERENCES chat_sessions(id)
);

-- Topic progress table
CREATE TABLE IF NOT EXISTS topic_progress (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  stream TEXT NOT NULL,
  class_level INTEGER NOT NULL,
  subject TEXT NOT NULL,
  topic TEXT NOT NULL,
  mastery_level REAL DEFAULT 0,
  time_spent INTEGER DEFAULT 0,
  quiz_attempts INTEGER DEFAULT 0,
  average_score REAL DEFAULT 0,
  last_accessed TEXT DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE UNIQUE INDEX IF NOT EXISTS idx_user_progress ON topic_progress(user_id, subject, topic);
