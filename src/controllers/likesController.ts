import { pool } from "../elephantsql";

// Get all Likes
export const getAllLikes = async (req, res) => {
  const likes = await pool.query(
    `SELECT l.id, l.post_id, l.user_id, pr.first_name, pr.last_name, pr.profile_picture 
    FROM Likes l 
    INNER JOIN Profiles pr on l.user_id = pr.user_id`
  );
  res.status(200).json(likes.rows);
};

// Get all Likes for a Post
export const getLikes = async (req, res) => {
  const post_id = req.params.postid;
  if (!post_id) {
    return res
      .status(400)
      .json({ err: "Must retrieve likes from an existing post" });
  }
  const likes = await pool.query(
    `SELECT pr.first_name, pr.last_name, pr.profile_picture 
    FROM Likes l 
    INNER JOIN Posts po on l.post_id = po.id 
    INNER JOIN Profiles pr on l.user_id = pr.user_id
    WHERE l.post_id = $1`,
    [post_id]
  );
  res.status(200).json(likes.rows);
};

// Create a Like
export const createLike = async (req, res) => {
  const user_id = req.user.id;
  const post_id = req.params.postid;
  if (!post_id) {
    return res.status(400).json({ err: "Must assign a like to a post" });
  }

  // Check if user already likes the post
  const check = await pool.query(
    `SELECT * FROM Likes WHERE user_id = $1 AND post_id = $2`,
    [user_id, post_id]
  );
  if (check.rowCount > 0) {
    return res
      .status(400)
      .json({ error: "Cannot add multiple likes to the same post" });
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

export const deleteLike = async (req, res) => {
  const user_id = req.user.id;
  const post_id = req.params.postid;
  if (!post_id) {
    return res.status(400).json({ err: "Post must exist" });
  }

  const like = await pool.query(
    `DELETE From Likes WHERE user_id = $1 AND post_id = $2 RETURNING *`,
    [user_id, post_id]
  );
  res.status(200).json(like.rows);
};
