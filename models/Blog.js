const { Schema, model } = require("mongoose");

const blogSchema = new Schema(
  {
    id: {
      type: String,
    },
    title: {
      type: String,
    },
    slug: {
      type: String,
    },
    image: {
      type: [String],
    },
    desc: {
      type: String,
    },
    category: {
      type: Object,
    },
    tags: {
      type: Array,
    },
  },
  { timestamps: true }
);

const Blog = new model("Blog", blogSchema);
module.exports = Blog;
