import mongoose from "mongoose";
import Profile from "../models/profileModel";
import User from "../models/userModel";

// Get all profiles
export const getProfiles = async (req, res) => {
  const profiles = await Profile.find();
  res.status(200).json(profiles);
};

// Get a single profile
// export const getProfile = async (req, res) => {
//   const user_id = req.params.id;
//   console.log(user_id);
//   res.status(200);
// };

// Create a profile
export const createProfile = async (req, res) => {
  const user_id = req.user._id;
  try {
    const profile = await Profile.create({
      user_id: user_id,
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
