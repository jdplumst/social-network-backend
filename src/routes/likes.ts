import express from "express";
import { requireAuth } from "../middleware/requireAuth";
import { getLikes, createLike } from "../controllers/likesController";

const router = express.Router();

// Require authentication for all Profile routes
router.use(requireAuth);

// GET Likes for a single Post
router.get("/:postid", getLikes);

// Create a Like
router.post("/:postid", createLike);

export default router;
