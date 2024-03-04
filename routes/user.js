const router = new require("express").Router();
const verify = require("../middlewares/verify");
const User = require("../models/User");

router.get("/test", verify, (req, res) => {
  res.status(200).send("Hello");
});
router.post("/", verify, async (req, res) => {
  try {
    await User.create(req.body);
    res.status(201).json("User created");
  } catch (e) {
    console.log(e);
    res.status(500).send(e);
  }
});
router.get("/allusers", verify, async (req, res) => {
  try {
    const users = await User.find();
    return res.status(200).json(users);
  } catch (e) {
    res.status(500).json("Internal server error");
  }
});
router.put("/update", verify, async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.body.userId });
    if (user) {
      const { userId, ...others } = req.body;
      await User.findOneAndUpdate({ _id: userId }, others);
      return res.status(201).json("User updated successfully");
    } else {
      return res.status(404).json("user not found");
    }
  } catch (e) {
    console.log(e);
    res.status(500).json("Internal server error");
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id });
    if (user) {
      await User.findOneAndDelete({ _id: req.params.id });
      res.status(202).json("User deleted succcessfully");
    } else {
      res.status(404).json("User not found");
    }
  } catch (e) {
    res.status(500).json("Internal server error");
  }
});
router.put;
module.exports = router;
