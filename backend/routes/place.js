import express from "express";

import {
  createPlace,
  deletePlace,
  getPlaceById,
  updatePlace,
  getPlacesByUserId,
} from "../controllers/place.js";

import { protect } from "../middleware/authHandler.js";

const router = express.Router();

router.get("/:pid", getPlaceById);

router.get("/user/:uid", getPlacesByUserId);

router.post("/", protect, createPlace);

router.put("/:pid", protect, updatePlace);

router.delete("/:pid", protect, deletePlace);

export default router;
