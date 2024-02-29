const router = new require("express").Router();
const verify = require("../middlewares/verify");
const Category = require("../models/Category");

router.get("/test", verify, (req, res) => {
  console.log(req.user);
  res.status(200).send("Hello");
});
router.post("/", verify, async (req, res) => {
  try {
    await Category.create(req.body);
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
router.put("/update", verify, async (req, res) => {
  try {
    const category = await Category.findOne({ _id: req.body.catId });
    if (category) {
      const { catId, ...others } = req.body;
      await Category.findOneAndUpdate({ _id: catId }, others);
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
