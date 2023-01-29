CREATE TABLE Profiles(
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  location VARCHAR(100) NOT NULL,
  occupation VARCHAR(100) NOT NULL,
  gender VARCHAR(100) NOT NULL,
  birthday DATE NOT NULL,
  profile_picture VARCHAR(50) NOT NULL,
  profile_completed BOOLEAN NOT NULL,
  FOREIGN KEY(user_id) REFERENCES Users(id)
)