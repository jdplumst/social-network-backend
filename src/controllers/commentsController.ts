import { pool } from "../elephantsql";

// Get all Comments
export const getComments = async (req, res) => {
  const comments = await pool.query(
    `SELECT c.id, c.post_id, c.user_id, c.description, c.create_date, c.modify_date, pr.first_name, pr.last_name, pr.profile_picture 
    FROM Comments c 
    INNER JOIN Profiles pr on c.user_id = pr.user_id`
  );
  res.status(200).json(comments.rows);
};
