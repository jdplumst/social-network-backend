import express from "express";

const router = express.Router();

// CREATE a new User Profile
router.post("/", () => {
  console.log("CREATE a new User Profile!");
});

// UPDATE a User Profile
router.post("/:id", () => {
  console.log("UPDATE a User Profile!");
});

export default router;
