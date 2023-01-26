import express from "express";
const router = express.Router();

// Login
router.post("/login", (req, res) => {
  res.json({ msg: "login" });
});

// Signup
router.post("/signup", (req, res) => {
  res.json({ msg: "signup" });
});

export default router;
