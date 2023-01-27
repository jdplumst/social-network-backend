import express from "express";
import { getProfiles, createProfile } from "../controllers/profileController";

const router = express.Router();

// GET all User Profiles
router.get("/", getProfiles);

// CREATE a new User Profile
router.post("/", createProfile);

// UPDATE a User Profile
router.post("/:id", () => {
  console.log("UPDATE a User Profile!");
});

export default router;
