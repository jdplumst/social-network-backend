CREATE TABLE Posts(
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL,
  description VARCHAR(255) NOT NULL,
  create_date TIMESTAMPTZ NOT NULL,
  modify_date TIMESTAMPTZ NOT NULL,
  FOREIGN KEY(user_id) REFERENCES Users(id)
)