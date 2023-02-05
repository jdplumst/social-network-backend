import { pool } from "../elephantsql";
import jsonwebtoken from "jsonwebtoken";
import validator from "validator";
import bcrypt from "bcrypt";

// Generate JWT
const generateToken = (id) => {
  return jsonwebtoken.sign({ id }, process.env.SECRET, { expiresIn: "1h" });
};

// Login user
export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: "All fields must be filled" });
  }

  const userResult = await pool.query("SELECT * FROM Users WHERE email = $1", [
    email
  ]);
  const user = userResult.rows[0];
  if (userResult.rowCount === 0) {
    return res.status(400).json({ error: "Incorrect email" });
  }

  const pwdMatch = await bcrypt.compare(password, user.password);
  if (!pwdMatch) {
    return res.status(400).json({ error: "Incorrect password" });
  }

  const token = generateToken(user.id);
  const user_id = user.id;
  res.status(200).json({ id: user_id, email: email, token: token });
};

// Signup user
export const signupUser = async (req, res) => {
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

  const numUsers = await pool.query("SELECT * FROM Users WHERE email = $1", [
    email
  ]);
  if (numUsers.rowCount > 0) {
    return res
      .status(400)
      .json({ error: "There already exists an account with this email." });
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  const result = await pool.query(
    `INSERT INTO Users ("email", "password") VALUES ($1, $2) RETURNING *`,
    [email, hash]
  );
  const user = result.rows[0];
  const token = generateToken(user.id);
  const user_id = user.id;
  res.status(200).json({ id: user_id, email: email, token: token });
};
