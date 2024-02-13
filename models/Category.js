const { Schema, model } = require("mongoose");

const categorySchema = new categorySchema(
  {
    id: {
      type: String,
    },

    categorySlug: {
      title: String,
    },
    title: {
      title: String,
    },
  },
  { timestamps: true }
);

const Category = new model("Category", categorySchema);
module.exports = Category;
