import { pool } from "../elephantsql";

// Get all Posts
export const getPosts = async (req, res) => {
  const posts = await pool.query(`SELECT * FROM Posts`);
  res.status(200).json(posts.rows);
};

// Create a Post
export const createPost = async (req, res) => {
  const user_id = req.user.id;
  const { description } = req.body;
  if (!description) {
    return res
      .status(400)
      .json({ err: "Post must contain at least 1 character" });
  }

  try {
    const post = await pool.query(
      `INSERT INTO Posts ("user_id", "description", "commments", "likes")
      VALUES ($1, $2, 0, 0) RETURNING *`,
      [user_id, description]
    );
    res.status(200).json(post.rows[0]);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
