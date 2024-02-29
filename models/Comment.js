const { Schema, model } = require("mongoose");

const commentSchema = new Schema(
  {
    id: {
      type: String,
    },

    userId: {
      type: String,
      required: true,
    },
    postId: {
      type: String,
      required: true,
    },

    comment: {
      type: String,
      required: "true",
    },
    parentCommentId: {
      type: String,
    },
  },
  { timestamps: true }
);

const Comment = new model("Comment", commentSchema);
module.exports = Comment;
