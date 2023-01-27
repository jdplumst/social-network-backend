require("dotenv").config();
import express from "express";
import mongoose from "mongoose";

mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Listening on port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });

import userRouter from "./routes/user";
import profileRouter from "./routes/profile";

const app = express();
app.use(express.json());

app.use("/api/user", userRouter);
app.use("/api/profile", profileRouter);
