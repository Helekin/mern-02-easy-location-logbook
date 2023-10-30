import asyncHandler from "../middleware/asynHandler.js";

import generateToken from "../utils/generateToken.js";

import User from "../models/user.js";

const signUp = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email: email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists, please login instead");
  }

  const user = await User.create({
    name: name,
    email: email,
    password: password,
  });

  if (user) {
    generateToken(res, user._id);

    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
    });
  } else {
    res.status(400);
    throw new Error("Signing up failed, please try again later");
  }
});

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email: email });

  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id);

    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } else {
    res.status(403);
    throw new Error("Invalid credentials, could not log you in");
  }
});

const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({}).select("-password");

  res.status(200).json(users);
});

export { signUp, login, getUsers };
