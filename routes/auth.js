const router = new require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.get("/", (req, res) => {
  res.status(200).send("it works");
});

router.post("/signup", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    return res.status(409).json("User already exists");
  }
  const saltOrRounds = 10;
  const hash = await bcrypt.hash(password, saltOrRounds);
  await User.create({ email, password: hash });
  return res.status(200).json("User created");
});

router.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      return res
        .cookie("accessToken", token, {
          httpOnly: true,
        })
        .status(200)
        .json("Logged in");
    }
    return res.status(401).json("Invalid credentials");
  }
  return res.status(404).json("User not found");
});

router.get("/signout", (req, res) => {
  res.clearCookie("accessToken");
  res.status(200).json("Logged out");
});
module.exports = router;
