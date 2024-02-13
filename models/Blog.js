const { Schema, model } = require("mongoose");

const blogSchema = new Schema(
  {
    id: {
      type: String,
    },
    name: {
      title: String,
    },
    slug: {
      type: String,
      required: true,
    },
    image: {
      type: String,
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
