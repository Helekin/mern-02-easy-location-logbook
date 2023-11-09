import mongoose from "mongoose";

const placeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  // location: {
  //   lat: { type: Number, required: true }, // Use this when you have a google key
  //   lng: { type: Number, required: true }, // Use this when you have a google key
  // },
  creator: { type: mongoose.Types.ObjectId, required: true, ref: "user" },
});

const Place = mongoose.model("place", placeSchema);

export default Place;
