const { Schema, model } = require("mongoose");

const categorySchema = new Schema(
  {
    id: {
      type: String,
    },

    title: {
      type: String,
    },
    categorySlug: {
      type: String,
    },
  },
  { timestamps: true }
);

const Category = new model("Category", categorySchema);
module.exports = Category;
