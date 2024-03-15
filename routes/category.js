const router = new require("express").Router();
const verify = require("../middlewares/verify");
const Category = require("../models/Category");
const slugify = require("slugify");
router.get("/test", verify, (req, res) => {
  console.log(req.user);
  res.status(200).send("Hello");
});
router.post("/", verify, async (req, res) => {
  try {
    const obj = {
      title: req.body.title,
      categorySlug: slugify(req.body?.title, "_"),
    };
    await Category.create(obj);
    res.status(201).json("Category posted");
  } catch (e) {
    console.log(e);
    res.status(500).send(e);
  }
});
router.get("/allcategories", verify, async (req, res) => {
  try {
    const categories = await Category.find();
    return res.status(200).json(categories);
  } catch (e) {
    res.status(500).json("Internal server error");
  }
});

router.get("/:id", verify, async (req, res) => {
  try {
    const cat = await Category.findOne({ _id: req.params.id });
    if (cat) {
      return res.status(200).json(cat);
    } else {
      return res.staus(404).json("Category not found");
    }
  } catch (e) {
    return res.status(500).json(e);
  }
});

router.put("/update", verify, async (req, res) => {
  try {
    const category = await Category.findOne({ _id: req.body.catId });
    if (category) {
      const { catId, ...others } = req.body;
      if (req.body?.title) {
        const { title, ...rest } = req.body;
        const obj = {
          title,
          categorySlug: slugify(title, "_"),
          rest,
        };
        await Category.findOneAndUpdate({ _id: catId }, obj);
      } else {
        await Category.findOneAndUpdate({ _id: catId }, others);
      }
      return res.status(201).json("Category updated successfully");
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
    const category = await Category.findOne({ _id: req.params.id });
    if (category) {
      await Category.findOneAndDelete({ _id: req.params.id });
      res.status(202).json("Category deleted succcessfully");
    } else {
      res.status(404).json("Category not found");
    }
  } catch (e) {
    console.log("errr", e);
    res.status(500).json("Internal server error");
  }
});
router.put;
module.exports = router;
