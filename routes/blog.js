const router = new require("express").Router();
const verify = require("../middlewares/verify");
const Blog = require("../models/Blog");
const slugify = require("slugify");

router.get("/test", verify, (req, res) => {
  res.status(200).send("Hello");
});
router.post("/", verify, async (req, res) => {
  try {
    console.log(req.body);
    const { title, ...rest } = req.body;
    const obj = {
      title,
      slug: slugify(title, "_"),
      ...rest,
    };
    const data = await Blog.create(obj);
    res.status(201).json(data);
  } catch (e) {
    console.log(e);
    res.status(500).send(e);
  }
});
router.get("/allposts", async (req, res) => {
  try {
    const posts = await Blog.find();
    return res.status(200).json(posts);
  } catch (e) {
    res.status(500).json("Internal server error");
  }
});
router.put("/update", verify, async (req, res) => {
  try {
    const post = await Blog.findOne({ _id: req.body.postId });
    if (post) {
      const { postId, ...others } = req.body;
      if (req.body?.title) {
        const { title, ...rest } = req.body;
        const obj = {
          title,
          slug: slugify(title, "_"),
          rest,
        };

        await Blog.findOneAndUpdate({ _id: postId }, obj);
      } else {
        await Blog.findOneAndUpdate({ _id: postId }, others);
      }
      return res.status(201).json("Post updated successfully");
    } else {
      return res.status(404).json("Post not found");
    }
  } catch (e) {
    console.log(e);
    res.status(500).json("Internal server error");
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    const post = await Blog.findOne({ _id: req.params.id });
    if (post) {
      await Blog.findOneAndDelete({ _id: req.params.id });
      res.status(202).json("Post deleted succcessfully");
    } else {
      res.status(404).json("Post not found");
    }
  } catch (e) {
    res.status(500).json("Internal server error");
  }
});
router.put;
module.exports = router;
