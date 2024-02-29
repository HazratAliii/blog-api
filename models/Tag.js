const { Schema, model } = require("mongoose");

const tagSchema = new Schema(
  {
    id: {
      type: String,
    },

    title: {
      type: String,
      required: true,
    },
    tagSlug: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Tag = new model("Tag", tagSchema);
module.exports = Tag;
