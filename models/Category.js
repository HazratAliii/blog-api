const { Schema, model } = require("mongoose");

const categorySchema = new Schema(
  {
    id: {
      type: String,
    },

    categorySlug: {
      type: String,
    },
    title: {
      type: String,
    },
  },
  { timestamps: true }
);

const Category = new model("Category", categorySchema);
module.exports = Category;
