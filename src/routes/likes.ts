import express from "express";
import { requireAuth } from "../middleware/requireAuth";
import {
  getAllLikes,
  getLikes,
  createLike,
  deleteLike
} from "../controllers/likesController";

const router = express.Router();

// Require authentication for all Likes routes
router.use(requireAuth);

// GET Likes for a single Post
router.get("/", getAllLikes);

// GET Likes for a single Post
router.get("/:postid", getLikes);

// CREATE a Like
router.post("/:postid", createLike);

// DELETE a Like from a Post
router.delete("/:postid", deleteLike);

export default router;
