const express = require("express");
const registerRouter = express.Router();
const bcrypt = require("bcrypt");
const User = require("../model/registerModel");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
require("dotenv").config();

registerRouter.post("/register", async (req, res) => {

    // res.send("Hello World!");
  try {
    const { name, email, password, gender } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(409)
        .json({ error: true, message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      gender,
    });

    await newUser.save();

    res
      .status(201)
      .json({ error: false, message: "User registered successfully" });
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).json({ error: true, message: "Something went wrong" });
  }
});

module.exports = registerRouter;
