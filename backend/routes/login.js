const express = require("express");
const loginRouter = express.Router();
const User = require("../model/registerModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();


loginRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("User not found");
    }
    bcrypt.compare(password, user.password, (err, result) => {
      if (err) {
        res.status(500).json({ msg: err.message });
      } else {
        const authToken = jwt.sign(
          { userID: user._id },
          process.env.AUTH_TOKEN,
          {
            expiresIn: "1d",
          }
        );
        const refreshToken = jwt.sign(
          { userID: user._id },
          process.env.REFRESH_TOKEN,
          {
            expiresIn: "7d",
          }
        );
        res.cookie("authToken", authToken, {
          httpOnly: true,
          maxAge: 1000 * 60 * 60,
          sameSite: "none",
          secure: true,
        });
        res.cookie("refreshToken", refreshToken, {
          httpOnly: true,
          maxAge: 1000 * 60 * 60 * 24 * 7,
          sameSite: "none",
          secure: true,
        });
        res
          .status(200)
          .json({ msg: "Login successful", user, authToken, refreshToken });
      }
    });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});

module.exports = loginRouter