import mongoose from "mongoose";
import Profile from "../models/profileModel";
import User from "../models/userModel";

// Get all profiles
export const getProfiles = async (req, res) => {
  const profiles = await Profile.find();
  res.status(200).json(profiles);
};

// Create a profile
export const createProfile = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ error: "Must be signed up as a real user" });
  }
  const user = await User.findOne({ email: email });
  if (!user) {
    return res.status(400).json({ error: "Must be signed up as a real user" });
  }
  try {
    const profile = await Profile.create({
      user_id: user._id,
      first_name: " ",
      last_name: " ",
      location: " ",
      occupation: " ",
      gender: " ",
      birthday: new Date(),
      profile_picture: " ",
      profile_completed: false
    });
    res.status(200).json(profile);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
