import express from "express";
import { loginUser, signupUser } from "../controllers/userController";

const router = express.Router();

// Get all users
router.get("/", () => {});

// Get a single user
router.get("/:id", () => {});

// Login
router.post("/login", loginUser);

// Signup
router.post("/signup", signupUser);

export default router;
