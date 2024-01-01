// External Modules
const asyncHandler = require("express-async-handler");
const { randomBytes } = require("crypto");
// Model
const userModel = require("../models/model");

// ----------------------------------------------------------- USER -----------------------------------------------------------

// GET
// All Users
exports.getUsers = asyncHandler(async (req, res) => {
  const users = await userModel.find();
  if (users.length === 0) {
    res.status(404);
    throw new Error("No users Found");
  }

  res.status(200).json(users);
});

// GET
// User Details
exports.getUserDetails = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  const user = await userModel.findOne({ user_id: userId });
  if (!user) {
    res.status(404);
    throw new Error(`User ${userId} not Found`);
  }

  res.status(200).json(user);
});

// POST
// User Details
exports.createUser = asyncHandler(async (req, res) => {
  const {
    firstName,
    lastName,
    age,
    email,
    phoneNumber,
    gender,
    address,
    pinCode,
  } = req.body;
  if (!req.body) {
    res.status(404);
    throw new Error("Please fill all the fields");
  }

  const userExists = await userModel.findOne({
    $or: [{ email: email }, { phoneNumber: phoneNumber }],
  });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await userModel.create({
    user_id: randomBytes(4).toString("hex"),
    firstName,
    lastName,
    age,
    email,
    phoneNumber,
    gender,
    address,
    pinCode,
  });

  res.status(200).json({ message: "User created successfully", user });
});

// PUT
// User Details
exports.updateUser = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  const user = await userModel.findOne({ user_id: userId });
  if (!user) {
    res.status(404);
    throw new Error(`User ${userId} not Found`);
  }
  if (!req.body) {
    res.status(404);
    throw new Error("Please fill what to edit");
  }

  const id = user._id;
  const updatedUser = await userModel.findByIdAndUpdate(id, req.body, {
    new: true,
  });

  res
    .status(200)
    .json({ message: `User ${userId} updated successfully`, updatedUser });
});

// DELETE
// User
exports.deleteUser = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  const user = await userModel.findOne({ user_id: userId });
  if (!user) {
    res.status(404);
    throw new Error(`User ${userId} not Found`);
  }
  const id = user._id;
  await userModel.findByIdAndDelete(id);

  res.status(200).json({ message: `User ${userId} deleted successfully` });
});
