import express from "express";

import { signUp, login, getUsers } from "../controllers/user.js";

const router = express.Router();

router.post("/signup", signUp);

router.post("/login", login);

router.get("/", getUsers);

export default router;
