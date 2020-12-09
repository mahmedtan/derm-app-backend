const Router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const { Error } = require("mongoose");

Router.post("/", async (req, res, next) => {
  const { username, password, name } = req.body;

  const passwordHash = password ? await bcrypt.hash(password, 10) : null;

  const user = new User({
    username,
    passwordHash,
    name,
  });
  try {
    if (password && password.length < 3) {
      throw new Error.ValidatorError({
        message: "password must be atleast 3 characters long",
      });
    }
    const savedUser = await user.save();
    res.status(201).json(savedUser);
  } catch (error) {
    next(error);
  }
});

Router.get("/", async (req, res) => {
  const users = await User.find({});

  res.json(users);
});

module.exports = Router;
