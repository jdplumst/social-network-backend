import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userProfileSchema = new Schema({
  user_id: { type: String, required: true, unique: true },
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  location: { type: String, required: true },
  occupation: { type: String, required: true },
  gender: { type: String, required: true },
  birthday: { type: Date, required: true },
  profile_completed: { type: Boolean, required: true } // True if user finished onboarding
});

export default mongoose.model("UserProfile", userProfileSchema);
