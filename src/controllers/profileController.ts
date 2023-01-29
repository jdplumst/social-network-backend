import { pool } from "../elephantsql";

// Get all profiles
export const getProfiles = async (req, res) => {
  const profiles = await pool.query(`SELECT * FROM PROFILES`);
  res.status(200).json(profiles.rows);
};

// // Get a single profile
export const getProfile = async (req, res) => {
  const user_id = req.params.id;
  if (!user_id) {
    return res.status(400).json({ error: "No such profile" });
  }

  const profile = await pool.query(
    `SELECT * FROM PROFILES WHERE user_id = $1`,
    [user_id]
  );

  // When user signs up, set their profile to null initially
  if (profile.rowCount === 0) {
    return res.status(200).json(null);
  }

  res.status(200).json(...profile.rows);
};

// // Create a profile
export const createProfile = async (req, res) => {
  const user_id = req.user.id;
  const { first_name, last_name, location, occupation, gender, birthday } =
    req.body;
  if (
    !first_name ||
    !last_name ||
    !location ||
    !occupation ||
    !gender ||
    !birthday
  ) {
    return res.status(400).json({ error: "All fields must be filled" });
  }

  try {
    const profile = await pool.query(
      `INSERT INTO Profiles ("user_id", "first_name", "last_name", "location", "occupation", "gender", "birthday", "profile_picture", "profile_completed") 
      VALUES ($1, $2, $3, $4, $5, $6, $7, ' ', false) RETURNING *`,
      [user_id, first_name, last_name, location, occupation, gender, birthday]
    );
    console.log(profile);
    res.status(200).json(...profile.rows);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
