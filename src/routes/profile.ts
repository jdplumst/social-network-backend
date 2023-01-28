import express from "express";
import { requireAuth } from "../middleware/requireAuth";
import { getProfiles, createProfile } from "../controllers/profileController";

const router = express.Router();

// Require authentication for all Profile routes
router.use(requireAuth);

// GET all User Profiles
router.get("/", getProfiles);

// GET a single User Profile
router.get("/:id", () => {
  console.log("GET a single User Profile!");
});

// CREATE a new User Profile
router.post("/", createProfile);

// UPDATE a User Profile
router.post("/:id", () => {
  console.log("UPDATE a User Profile!");
});

export default router;
