import { pool } from "../elephantsql";

// Get all profiles
export const getProfiles = async (req, res) => {
  const profiles = await pool.query(`SELECT * FROM PROFILES`);
  res.status(200).json(profiles.rows);
};

// Get a single profile
export const getProfile = async (req, res) => {
  const user_id = req.params.id;

  // Ensure a valid user_id is used
  if (!user_id || isNaN(user_id)) {
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

// Create a profile
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
    res.status(200).json(...profile.rows);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Update Profile Info
export const updateProfileInfo = async (req, res) => {
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
      `UPDATE Profiles
      SET first_name = $1, last_name = $2, location = $3, occupation = $4, gender = $5, birthday = $6 WHERE user_id =  $7
      RETURNING *`,
      [first_name, last_name, location, occupation, gender, birthday, user_id]
    );
    res.status(200).json(...profile.rows);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Update Profile Picture
export const updateProfilePicture = async (req, res) => {
  const user_id = req.user.id;
  const { profile_picture } = req.body;
  if (!profile_picture) {
    return res.status(400).json({ error: "Must select a profile picture" });
  }

  try {
    const profile = await pool.query(
      `UPDATE Profiles
      SET profile_picture = $1, profile_completed = true WHERE user_id = $2
      RETURNING *`,
      [profile_picture, user_id]
    );
    res.status(200).json(...profile.rows);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
