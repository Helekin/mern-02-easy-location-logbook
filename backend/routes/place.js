import express from "express";

import { createPlace } from "../controllers/place.js";

import { protect } from "../middleware/authHandler.js";

const router = express.Router();

router.post("/", protect, createPlace);

export default router;
