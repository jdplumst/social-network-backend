import express from "express";
import { requireAuth } from "../middleware/requireAuth";

const router = express.Router();

// Require authentication for all Profile routes
router.use(requireAuth);

// GET Likes for a single Post
router.get("/:postid", () => {
  console.log("GET Likes for a single Post!");
});

// Create a Like
router.post("/:postid", () => {
  console.log("Create a Like!");
});

export default router;
