const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

const auth = (req, res, next) => {
  const token = req.headers.authorization;

  try {
    req.user = jwt.verify(token, "secret");
    next();
  } catch {
    res.status(401).json({ msg: "Invalid token" });
  }
};

router.post("/score", auth, async (req, res) => {
  const user = await User.findById(req.user.id);
  user.score = req.body.score;
  await user.save();

  res.json({ msg: "Score saved" });
});

module.exports = router;