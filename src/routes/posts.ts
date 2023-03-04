import express from "express";
import { requireAuth } from "../middleware/requireAuth";
import {
  getPosts,
  getUserPosts,
  createPost
} from "../controllers/postsController";

const router = express.Router();

// Require authentication for all Profile routes
router.use(requireAuth);

// GET all Posts
router.get("/", getPosts);

// GET Posts from a single User
router.get("/:userid", getUserPosts);

// CREATE a new Post
router.post("/", createPost);

// UPDATE a Post
router.patch("/:id", () => {
  console.log("UPDATE Post!");
});

export default router;
