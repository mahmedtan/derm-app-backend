const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const config = require("../utils/config");
const Router = require("express").Router();

Router.post("/", async (req, res) => {
  const user = await User.findOne({ username: req.body.username });
  const correctCredentials = !user
    ? false
    : await bcrypt.compare(req.body.password, user.passwordHash);
  if (!correctCredentials) {
    return res.status(401).json({ error: "username or password is invalid" });
  }
  const { username, name, _id } = user;
  const userForToken = {
    username,
    id: _id,
  };
  const token = jwt.sign(userForToken, config.SECRET);
  res.status(200).json({ token, username, name, id: _id });
});

module.exports = Router;
