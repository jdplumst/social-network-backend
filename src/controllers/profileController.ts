import mongoose from "mongoose";
import Profile from "../models/profileModel";
import User from "../models/userModel";

// Get all profiles
export const getProfiles = async (req, res) => {
  const profiles = await Profile.find();
  res.status(200).json(profiles);
};

// Get a single profile
export const getProfile = async (req, res) => {
  const user_id = req.params.id;
  if (!user_id || !mongoose.Types.ObjectId.isValid(user_id)) {
    return res.status(400).json({ error: "No such profile" });
  }

  const profile = await Profile.findOne({ user_id: user_id });
  res.status(200).json(profile);
};

// Create a profile
export const createProfile = async (req, res) => {
  const user_id = req.user._id;
  const { first_name, last_name, location, occupation, gender, birthday } =
    req.body;
  if (
    !first_name ||
    !last_name ||
    !location ||
    !occupation ||
    !gender ||
    !birthday
  ) {
    return res.status(400).json({ error: "All fields must be filled" });
  }

  try {
    const profile = await Profile.create({
      user_id: user_id,
      first_name: first_name,
      last_name: last_name,
      location: location,
      occupation: occupation,
      gender: gender,
      birthday: birthday,
      profile_picture: " ",
      profile_completed: false
    });
    res.status(200).json(profile);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
