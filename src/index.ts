require("dotenv").config();

import express from "express";
import { pool } from "./database";

import usersRouter from "./routes/users";

const app = express();
app.use(express.json());

app.use("/api/users", usersRouter);

app.listen(process.env.PORT);
