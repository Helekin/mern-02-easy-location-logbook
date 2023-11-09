import express from "express";

import {
  createPlace,
  deletePlace,
  getPlaceById,
  updatePlace,
  getPlacesByUserId,
} from "../controllers/place.js";

import { protect } from "../middleware/authHandler.js";
import uploadImage from "../middleware/uploadImage.js";

const router = express.Router();

router.get("/:pid", getPlaceById);

router.get("/user/:uid", getPlacesByUserId);

router.post("/", [uploadImage.single("image"), protect], createPlace);

router.put("/:pid", protect, updatePlace);

router.delete("/:pid", protect, deletePlace);

export default router;
