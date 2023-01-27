import express from "express";
import { createProfile } from "../controllers/profileController";

const router = express.Router();

// CREATE a new User Profile
router.post("/", createProfile);

// UPDATE a User Profile
router.post("/:id", () => {
  console.log("UPDATE a User Profile!");
});

export default router;
