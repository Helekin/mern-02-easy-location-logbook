import asyncHandler from "../middleware/asyncHandler.js";

import generateToken from "../utils/generateToken.js";

import User from "../models/user.js";

const signUp = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email: email }).select("-password");

  if (userExists) {
    res.status(400);
    throw new Error("User already exists, please login instead");
  }

  const user = await User.create({
    name: name,
    email: email,
    image: req.file.path,
    password: password,
  });

  if (user) {
    generateToken(res, user._id);

    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      image: req.file.path,
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
      image: user.image,
      email: user.email,
    });
  } else {
    res.status(403);
    throw new Error("Invalid credentials, could not log you in");
  }
});

const logout = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });

  res.status(200).json({ message: "Logged out successfully" });
});

const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({}).select("-password");

  res.status(200).json(users);
});

export { signUp, login, logout, getUsers };
