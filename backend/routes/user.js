import express from "express";

import { signUp, login, getUsers, logout } from "../controllers/user.js";

import uploadImage from "../middleware/uploadImage.js";

const router = express.Router();

router.post("/signup", uploadImage.single("image"), signUp);

router.post("/login", login);

router.post("/logout", logout);

router.get("/", getUsers);

export default router;
