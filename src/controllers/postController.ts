import { pool } from "../elephantsql";

// Get all Posts
export const getPosts = async (req, res) => {
  const posts = await pool.query(
    `SELECT po.user_id, po.description, po.comments, po.likes, po.create_date, po.modify_date, pr.first_name, pr.last_name, pr.profile_picture
    FROM Posts po join Profiles pr on po.user_id = pr.user_id`
  );
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
    const curr_date = new Date();
    const post = await pool.query(
      `INSERT INTO Posts ("user_id", "description", "comments", "likes", "create_date", "modify_date")
      VALUES ($1, $2, 0, 0, $3, $4) RETURNING *`,
      [user_id, description, curr_date, curr_date]
    );
    res.status(200).json(post.rows[0]);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
