const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  id: {
    type: String,
  },
  name: {
    type: String,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
});

const User = new model("User", userSchema);
module.exports = User;
