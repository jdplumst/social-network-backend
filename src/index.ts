require("dotenv").config();
import express from "express";

import userRouter from "./routes/user";
import profileRouter from "./routes/profile";
import postRouter from "./routes/post";

const app = express();
app.use(express.json());

app.use("/api/user", userRouter);
app.use("/api/profile", profileRouter);
app.use("/api/post", postRouter);

app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`);
});
