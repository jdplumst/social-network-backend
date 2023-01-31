import express from "express";
import { requireAuth } from "../middleware/requireAuth";

const router = express.Router();

// // Require authentication for all Profile routes
router.use(requireAuth);

// // GET all Posts
router.get("/", (req, res) => {
  console.log("Get all Posts!");
  res.status(200).json({ msg: "Get all Posts!" });
});

// // GET Posts from a single User
router.get("/:userid", () => {
  console.log("Get Posts from a single User!");
});

// // CREATE a new Post
router.post("/", () => {
  console.log("Create a Post!");
});

// // UPDATE a Post
router.patch("/:id", () => {
  console.log("UPDATE Post!");
});

export default router;
