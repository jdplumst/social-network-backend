import { pool } from "../elephantsql";

export const createLike = async (req, res) => {
  const user_id = req.user.id;
  const post_id = req.params.postid;
  if (!post_id) {
    return res.status(400).json({ err: "Must assign a like to a post" });
  }
  try {
    const like = await pool.query(
      `INSERT INTO Likes ("user_id", "post_id")
                      VALUES ($1, $2) RETURNING *`,
      [user_id, post_id]
    );
    res.status(200).json(like.rows[0]);
  } catch (err) {
    res.status(400).json({ error: err });
  }
};
