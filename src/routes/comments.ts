import express from "express";
import { requireAuth } from "../middleware/requireAuth";
import { getComments, createComment } from "../controllers/commentsController";

const router = express.Router();

// Require authentication for all Likes routes
router.use(requireAuth);

// GET all Comments
router.get("/", getComments);

// CREATE a Comment on a POST
router.post("/:postid", createComment);

export default router;
