import express from "express";
import { requireAuth } from "../middleware/requireAuth";
import { getComments } from "../controllers/commentsController";

const router = express.Router();

// Require authentication for all Likes routes
router.use(requireAuth);

// GET all Comments
router.get("/", getComments);

// CREATE a Comment on a POST
router.post("/:postid", (req, res) => {
  res.status(200).json({ msg: "CREATE a Comment on a Post!" });
});

export default router;
