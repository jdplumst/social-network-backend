import { pool } from "../elephantsql";
import jsonwebtoken from "jsonwebtoken";

export const requireAuth = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ error: "Authorization token required" });
  }

  const token = authorization.split(" ")[1];

  try {
    const { id } = jsonwebtoken.verify(token, process.env.SECRET);
    const user = await pool.query(`SELECT id FROM Users WHERE id = $1`, [id]);
    req.user = user.rows[0];
  } catch (err) {
    return res.status(401).json({ error: "Request is not authorized" });
  }
  next();
};
