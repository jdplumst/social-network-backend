CREATE TABLE Comments(
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL,
  post_id INTEGER NOT NULL,
  description VARCHAR(255) NOT NULL,
  create_date TIMESTAMPTZ NOT NULL,
  modify_date TIMESTAMPTZ NOT NULL,
  FOREIGN KEY(user_id) REFERENCES Users(id),
  FOREIGN KEY(post_id) REFERENCES Posts(id)
)