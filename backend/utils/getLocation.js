import axios from "axios";

import asyncHandler from "../middleware/asynHandler.js";

const getCoordsForAddress = asyncHandler(async (address) => {
  const response = await axios.get(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
      address
    )}&key=${process.env.API_KEY}`
  );

  console.log(response.data);

  const data = response.data;

  if (!data || data.status === "ZERO_RESULTS") {
    throw new Error("Invalid credentials, could not log you in");
  }

  const coordinates = data.results[0].geometry.location;

  return coordinates;
});

export default getCoordsForAddress;
