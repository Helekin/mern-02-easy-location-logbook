import mongoose from "mongoose";

import User from "../models/user.js";
import Place from "../models/place.js";

import asyncHandler from "../middleware/asyncHandler.js";

const createPlace = asyncHandler(async (req, res) => {
  const { title, description, address } = req.body;

  const createdPlace = new Place({
    title: title,
    description: description,
    address: address,
    image: req.file.path,
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

const updatePlace = asyncHandler(async (req, res) => {
  const { title, description } = req.body;
  const placeId = req.params.pid;

  const place = await Place.findById(placeId);

  if (!place) {
    res.status(404);
    throw new Error("Could not find place for provided id");
  }

  if (place.creator.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("You are not allowed to edit this place");
  }

  place.title = title;
  place.description = description;

  await place.save();

  res.status(200).json({ place: place });
});

const deletePlace = asyncHandler(async (req, res) => {
  const placeId = req.params.pid;

  const place = await Place.findById(placeId).populate("creator");

  if (!place) {
    res.status(404);
    throw new Error("Could not find place for this id");
  }

  if (place.creator._id.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("You are not allowed to delete this place");
  }

  const session = await mongoose.startSession();

  session.startTransaction();

  await place.deleteOne({ session: session });

  place.creator.places.pull(place);

  await place.creator.save({ session: session });

  await session.commitTransaction();

  res.status(200).json({ message: "Deleted place" });
});

const getPlaceById = asyncHandler(async (req, res) => {
  const placeId = req.params.pid;

  const place = await Place.findById(placeId);

  if (!place) {
    res.status(404);
    throw new Error("Could not find place for this id");
  }

  res.json({ place: place });
});

const getPlacesByUserId = asyncHandler(async (req, res) => {
  const userId = req.params.uid;

  const userWithPlaces = await User.findById(userId).populate("places");

  if (!userWithPlaces || userWithPlaces.places.length === 0) {
    return res.json({ places: [] });
  }

  res.json({ places: userWithPlaces.places.map((place) => place) });
});

export {
  createPlace,
  updatePlace,
  deletePlace,
  getPlaceById,
  getPlacesByUserId,
};
