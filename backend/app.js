import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

import connectDB from "./config/db.js";
import { notFound, handleError } from "./middleware/errorHandler.js";

import userRoutes from "./routes/user.js";

dotenv.config();

const port = process.env.PORT || 5000;

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.get("", (req, res) => {
  res.send("API is running...");
});

app.use("/api/users", userRoutes);

app.use(notFound);
app.use(handleError);

app.listen(port, () => console.log(`Server running on port ${port}`));
