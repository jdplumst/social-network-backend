import mongoose from "mongoose";
import Profile from "../models/profileModel";
import User from "../models/userModel";

// Create a profile
export const createProfile = async (req, res) => {
  const { user_id } = req.body;
  if (!user_id) {
    return res.status(400).json({ error: "Must be signed up as a real user" });
  }
  const user = await User.findOne({ user_id });
  if (!user) {
    return res.status(400).json({ error: "Must be signed up as a real user" });
  }
  try {
    const profile = await Profile.create({
      user_id: user_id,
      first_name: " ",
      last_name: " ",
      location: " ",
      occupation: " ",
      gender: " ",
      birthday: new Date(),
      profile_completed: false
    });
    res.status(200).json(profile);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
