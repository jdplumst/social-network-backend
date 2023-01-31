require("dotenv").config();
import express from "express";

import usersRouter from "./routes/users";
import profilesRouter from "./routes/profiles";
import postsRouter from "./routes/posts";

const app = express();
app.use(express.json());

app.use("/api/users", usersRouter);
app.use("/api/profiles", profilesRouter);
app.use("/api/posts", postsRouter);

app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`);
});
