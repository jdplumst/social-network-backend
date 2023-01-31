import express from "express";
import { requireAuth } from "../middleware/requireAuth";
import {
  getProfile,
  getProfiles,
  createProfile,
  updateProfilePicture
} from "../controllers/profilesController";

const router = express.Router();

// // Require authentication for all Profile routes
router.use(requireAuth);

// // GET all User Profiles
router.get("/", getProfiles);

// // GET a single User Profile
router.get("/:id", getProfile);

// // CREATE a new User Profile
router.post("/", createProfile);

// // UPDATE User Profile Info
router.patch("/info/:id", () => {
  console.log("UPDATE User Profile Info!");
});

// UPDATE User Profile Picture
router.patch("/picture/:id", updateProfilePicture);

export default router;
