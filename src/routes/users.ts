import express from "express";
import { loginUser, signupUser } from "../controllers/usersController";

const router = express.Router();

// Login
router.post("/login", loginUser);

// Signup
router.post("/signup", signupUser);

export default router;
