const router = new require("express").Router();
const verify = require("../middlewares/verify");
const Blog = require("../models/Blog");
const slugify = require("slugify");
const upload = require("../middlewares/multer");

router.get("/test", verify, (req, res) => {
  res.status(200).send("Hello");
});

router.post(
  "/",
  verify,
  upload.fields([{ name: "image", maxCount: 20 }]),
  async (req, res) => {
    try {
      const filePaths = req.files.image?.map((file) => file.path);
      console.log("file path ", req.files);
      const data = await Blog.create({
        title: req.body.title,
        category: req.body.category,
        tags: req.body.tags,
        desc: req.body.desc,
        slug: slugify(req.body.title, "_"),
        image: filePaths,
      });

      res.status(201).json(data);
    } catch (e) {
      console.log(e);
      res.status(500).send(e);
    }
  }
);

router.get("/allposts", async (req, res) => {
  try {
    const posts = await Blog.find();
    return res.status(200).json(posts);
  } catch (e) {
    res.status(500).json("Internal server error");
  }
});
router.get("/blogs", async (req, res) => {
  try {
    const q = req.query.category || "unknown";

    const blogs = await Blog.find({ "category.name": q })
      .sort({ createdAt: -1 })
      .limit(5)
      .exec();
    if (blogs) {
      return res.status(200).json(blogs);
    } else {
      const blogs = await Blog.find().sort({ createdAt: -1 }).limit(5).exec();
      return res.status(200).json(blogs);
    }
  } catch (e) {
    return res.status(500).json(e);
  }
});
router.get("/:slug", async (req, res) => {
  console.log(req.params.slug);
  try {
    const post = await Blog.findOne({ slug: req.params.slug });
    if (post) {
      return res.status(200).json(post);
    } else {
      return res.staus(404).json("Blog not found");
    }
  } catch (e) {
    return res.status(500).json("Internal serevr error");
  }
});
// router.put("/update", verify, async (req, res) => {
//   try {
//     const post = await Blog.findOne({ _id: req.body.postId });
//     if (post) {
//       const { postId, ...others } = req.body;
//       if (req.body?.title) {
//         const { title, ...rest } = req.body;
//         const obj = {
//           title,
//           slug: slugify(title, "_"),
//           rest,
//         };

//         await Blog.findOneAndUpdate({ _id: postId }, obj);
//       } else {
//         await Blog.findOneAndUpdate({ _id: postId }, others);
//       }
//       return res.status(201).json("Post updated successfully");
//     } else {
//       return res.status(404).json("Post not found");
//     }
//   } catch (e) {
//     console.log(e);
//     res.status(500).json("Internal server error");
//   }
// });

router.put(
  "/:id",
  verify,
  upload.fields([{ name: "image", maxCount: 20 }]),
  async (req, res) => {
    try {
      const filePaths = req.files.image?.map((file) => file.path);
      console.log("file path ", req.files);

      const blog = await Blog.findById(req.params.id);
      if (!blog) {
        return res.status(404).send("Blog post not found");
      }

      blog.title = req.body.title || blog.title;
      blog.category = req.body.category || blog.category;
      blog.tags = req.body.tags || blog.tags;
      blog.desc = req.body.desc || blog.desc;
      blog.slug = slugify(req.body.title || blog.title, "_");
      if (filePaths) {
        blog.image = filePaths;
      }

      const updatedBlog = await blog.save();

      res.status(200).json(updatedBlog);
    } catch (e) {
      console.log(e);
      res.status(500).send(e);
    }
  }
);

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
