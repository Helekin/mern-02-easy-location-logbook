import express from "express";
import dotenv from "dotenv";

dotenv.config();

import connectDB from "./config/db.js";

const port = process.env.PORT || 5000;

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("", (req, res) => {
  res.send("API is running...");
});

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }

  res.status(error.code || 500);
  res.json({ message: error.message || "An unknow error ocurred!" });
});

app.listen(port, () => console.log(`Server running on port ${port}`));
