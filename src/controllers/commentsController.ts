import { pool } from "../elephantsql";

// Get all Comments
export const getComments = async (req, res) => {
  const comments = await pool.query(
    `SELECT c.id, c.post_id, c.user_id, c.description, c.create_date, c.modify_date, pr.first_name, pr.last_name, pr.profile_picture 
    FROM Comments c 
    INNER JOIN Profiles pr on c.user_id = pr.user_id
    ORDER BY c.modify_date ASC`
  );
  res.status(200).json(comments.rows);
};

// Create a Comment
export const createComment = async (req, res) => {
  const post_id = req.params.postid;
  if (!post_id) {
    return res
      .status(400)
      .json({ err: "Must retrieve likes from an existing post" });
  }
  const user_id = req.user.id;
  const { description } = req.body;
  if (!description) {
    return res
      .status(400)
      .json({ err: "Comment must contain at least 1 character" });
  }

  try {
    const curr_date = new Date();
    const comment = await pool.query(
      `INSERT INTO Comments ("user_id", "post_id", "description", "create_date", "modify_date")
      VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [user_id, post_id, description, curr_date, curr_date]
    );
    res.status(200).json(comment.rows[0]);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
