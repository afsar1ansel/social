const mongoose = require("mongoose");
const { post } = require("../routes/register");

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  device: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  }
  
},{
    versionKey: false
});

const Post = mongoose.model("userPost", postSchema);
module.exports = Post;
