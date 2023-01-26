require("dotenv").config();

import express from "express";
import { pool } from "./database";

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(process.env.PORT);
