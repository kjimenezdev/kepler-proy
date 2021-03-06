
-- Schema to store data

CREATE TABLE IF NOT EXISTS user (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS trivia (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    description TEXT
    created TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    modified TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS question(
  id INTEGER NOT NULL,
  trivia INTEGER NOT NUL,
  created TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  modified TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
  FOREIGN KEY (trivia) REFERENCES trivia(id)
);

CREATE TABLE IF NOT EXISTS question_option(
  id INTEGER NOT NULL,
  trivia INTEGER NOT NULL,
  question INTEGER NOT NULL,
  position INTEGER NOT NULL
  content TEXT,
  FOREIGH KEY (trivia, question) REFERENCES question(trivia, id)
);

CREATE TABLE IF NOT EXISTS trivia_response (
  trivia INTEGER NOT NULL,
  user INTEGER NOT NULL,
  created TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP.:
);

CREATE TABLE IF NOT EXISTS option_reponse (
  user INTEGER NOT NULL,
  question INTEGER NOT NULL,
  option INTEGER NOT NULL

);





