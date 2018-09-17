
DROP TABLE IF EXISTS user;
DROP TABLE IF EXISTS user_score;
DROP TABLE IF EXISTS question;
DROP TABLE IF EXISTS question_option;


-- Table to store users
CREATE TABLE IF NOT EXISTS user (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL
);

-- Table to store user-scores
CREATE TABLE IF NOT EXISTS user_score(
  user_id INTEGER NOT NULL PRIMARY KEY,
  score INTEGER NOT NULL,
  created TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP PRIMARY KEY,
  FOREIGN KEY (user_id) REFERENCES user (id)
);

-- Table to store questions
CREATE TABLE IF NOT EXISTS question(
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  content TEXT NOT NULL,
  idx_correct INTEGER -- Indicates the option correct index
);

-- Table to store question options
CREATE TABLE IF NOT EXISTS question_option(
  question_id INTEGER NOT NULL PRIMARY KEY,
  option_id INTEGER NOT NULL PRIMARY KEY,
  content TEXT NOT NULL,
  position INTEGER NOT NULL,
  FOREIGN KEY (question_id) REFERENCES question(id)
  );
