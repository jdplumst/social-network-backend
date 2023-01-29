-- import mongoose from "mongoose";

-- const Schema = mongoose.Schema;

-- const userSchema = new Schema({
--   email: { type: String, required: true, unique: true },
--   password: { type: String, required: true }
-- });

-- export default mongoose.model("User", userSchema);

CREATE TABLE Users(
  id SERIAL PRIMARY KEY,
  email VARCHAR(50) UNIQUE,
  password VARCHAR(255)
)