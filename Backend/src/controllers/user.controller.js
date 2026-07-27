const userModel = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

async function registration(req, res) {
  const { username, email, password } = req.body;

  const user = await userModel.findOne({ email });

  if (user) {
    return res.json({ message: "user already exist" });
  }

  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);

  const data = await userModel.create({
    username,
    email,
    password: hashPassword,
  });
  res.status(201).json({
    message: "user registered successfully",
    user: {
      id: data._id,
      username: data.username,
      email: data.email,
    },
  });
}

async function login(req, res) {
  const { email, password } = req.body;

  const user = await userModel.findOne({ email }).select("+password");

  if (!user) {
    return res.status(404).json({ message: "user not found" });
  }

  const pass = await bcrypt.compare(password, user.password);

  if (!pass) {
    return res.status(401).json({ message: "Invalid email and password" });
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  res.cookie("token", token, {
    httpOnly: true,
    maxAge: 7 * 24 * 60 * 60 * 1000, //7 days
  });

  res.status(200).json({
    message: "Login successful",
    token,
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
    },
  });
}

async function profile(req, res) {
  const userId = req.user.id;

  const data = await userModel.findById(userId);

  if (!data) {
    return res.status(404).json({ message: "user not found" });
  }
  return res.status(200).json({
    message: "user Profile information",
    user: {
      username: data.username,
      email: data.email,
    },
  });
}
module.exports = { registration, login, profile };
