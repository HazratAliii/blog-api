const router = new require("express").Router();
const verify = require("../middlewares/verify");
const Comment = require("../models/Comment");

router.get("/test", verify, (req, res) => {
  console.log(req.user);
  res.status(200).send("Hello");
});
router.post("/", verify, async (req, res) => {
  try {
    await Comment.create(req.body);
    res.status(201).json("Comment posted");
  } catch (e) {
    console.log(e);
    res.status(500).send(e);
  }
});
router.get("/allcomments", verify, async (req, res) => {
  try {
    const comments = await Comment.find();
    return res.status(200).json(comments);
  } catch (e) {
    res.status(500).json("Internal server error");
  }
});

router.get("/:id", verify, async (req, res) => {
  try {
    const comment = await Comment.findOne({ _id: req.params.id });
    if (comment) {
      return res.status(200).json(comment);
    } else {
      return res.staus(404).json("Comment not found");
    }
  } catch (e) {
    return res.status(500).json(e);
  }
});
router.put("/update", verify, async (req, res) => {
  try {
    const comment = await Comment.findOne({ _id: req.body.comId });
    if (comment) {
      const { comId, ...others } = req.body;
      await Comment.findOneAndUpdate({ _id: comId }, others);
      return res.status(201).json("Comment updated successfully");
    } else {
      return res.status(404).json("Comment not found");
    }
  } catch (e) {
    console.log(e);
    res.status(500).json("Internal server error");
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    const comment = await Comment.findOne({ _id: req.params.id });
    if (comment) {
      await Comment.findOneAndDelete({ _id: req.params.id });
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
