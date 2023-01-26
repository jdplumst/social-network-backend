CREATE DATABASE SocialNetwork;

CREATE TABLE Users(
  user_id SERIAL PRIMARY KEY,
  email VARCHAR(255),
  password VARCHAR(50)
);