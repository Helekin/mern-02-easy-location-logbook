import mongoose from "mongoose";

import User from "../models/user.js";
import Place from "../models/place.js";

import asyncHandler from "../middleware/asynHandler.js";

import getCoordsForAddress from "../utils/getLocation.js";

const createPlace = asyncHandler(async (req, res) => {
  const { title, description, address } = req.body;

  const coordinates = await getCoordsForAddress(address);

  const createdPlace = new Place({
    title: title,
    description: description,
    address: address,
    location: coordinates,
    image: "",
    creator: req.user._id,
  });

  const user = await User.findById(req.user._id);

  if (!user) {
    res.status(404);
    throw new Error("Could not find user for provided id");
  }

  const session = await mongoose.startSession();

  session.startTransaction();

  await createdPlace.save({ session: session });

  user.places.push(createdPlace);

  await user.save({ session: session });

  await session.commitTransaction();

  res.status(201).json({ place: createdPlace });
});

export { createPlace };
