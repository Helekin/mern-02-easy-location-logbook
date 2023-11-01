import express from "express";

import { signUp, login, getUsers, logout } from "../controllers/user.js";

const router = express.Router();

router.post("/signup", signUp);

router.post("/login", login);

router.post("/logout", logout);

router.get("/", getUsers);

export default router;
