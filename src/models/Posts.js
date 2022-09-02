const mongoose = require("../db/db");

const newPost = new mongoose.Schema({
  title: {
    type: String,
    require: true,
  },

  description: {
    type: String,
    require: true,
  },

  content: {
    type: String,
    require: true,
  },

  date: {
    type: Date,
    default: Date.now(),
  },
});

const Post = mongoose.model("posts", newPost);
module.exports = Post;
