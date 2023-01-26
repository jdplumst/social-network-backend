import User from "../models/userModel";
import { jsonwebtoken as jwt } from "jsonwebtoken";
import validator from "validator";
import bcrypt from "bcrypt";

// Generate JWT
const generateToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "1h" });
};

// Login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: "All fields must be filled" });
  }

  const user = await User.findOne({ email });
};

// Signup user
const signupUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: "All fields must be filled" });
  }
  if (!validator.isEmail(email)) {
    return res.status(400).json({ error: "Must use a valid email" });
  }
  if (!validator.isStrongPassword(password)) {
    return res.status(400).json({
      error:
        "Password not strong enough. Must be at least 8 characters long with at least 1 lowercase letter, 1 uppercase letter, 1 number, and 1 symbol."
    });
  }

  const exists = await User.findOne({ email });
  if (exists) {
    return res
      .status(400)
      .json({ error: "There already exists an account with this email." });
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  const user = await User.create({ email: email, password: hash });
  const token = generateToken(user._id);
  res.status(200).json({ email, token });
};

export { loginUser, signupUser };
