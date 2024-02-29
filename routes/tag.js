const router = new require("express").Router();
const verify = require("../middlewares/verify");
const Tag = require("../models/Tag");

router.get("/test", verify, (req, res) => {
  console.log(req.user);
  res.status(200).send("Hello");
});
router.post("/", verify, async (req, res) => {
  try {
    await Tag.create(req.body);
    res.status(201).json("Tag posted");
  } catch (e) {
    console.log(e);
    res.status(500).send(e);
  }
});
router.get("/alltags", verify, async (req, res) => {
  try {
    const tags = await Tag.find();
    return res.status(200).json(tags);
  } catch (e) {
    res.status(500).json("Internal server error");
  }
});
router.put("/update", verify, async (req, res) => {
  try {
    const tag = await Tag.findOne({ _id: req.body.tagId });
    if (tag) {
      const { tagId, ...others } = req.body;
      await Tag.findOneAndUpdate({ _id: tagId }, others);
      return res.status(201).json("Tag updated successfully");
    } else {
      return res.status(404).json("Tag not found");
    }
  } catch (e) {
    console.log(e);
    res.status(500).json("Internal server error");
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    const tag = await Tag.findOne({ _id: req.params.id });
    if (tag) {
      await Tag.findOneAndDelete({ _id: req.params.id });
      res.status(202).json("Comment deleted succcessfully");
    } else {
      res.status(404).json("Comment not found");
    }
  } catch (e) {
    console.log("errr", e);
    res.status(500).json("Internal server error");
  }
});
router.put;
module.exports = router;
