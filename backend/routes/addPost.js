const express = require("express");
const addPostRouter = express.Router();
const auth = require("../middleware/auth.middleware");
const Post = require("../model/postModel");
const User = require("../model/registerModel")
const useragent = require("express-useragent");


addPostRouter.use(useragent.express());

// POST route to add a post
addPostRouter.post("/add", auth, async (req, res) => {
  const { title, body, userID } = req.body;

  if (!title || !body) {
    return res.status(400).json({ message: "All fields are mandatory" });
  }

  const deviceType = req.useragent.isMobile
    ? "MOBILE"
    : req.useragent.isTablet
    ? "TABLET"
    : "PC";

  try {
    const post = new Post({
      title,
      body,
      device: deviceType,
      userId: userID,
    });

    await post.save();

    await User.updateOne({ _id: userID }, { $push: { posts: post._id } });

    res.status(201).json({ message: "Post created successfully", post });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create post", error });
  }
});

// GET route to fetch posts
addPostRouter.get("/", auth, async (req, res) => {
  const { userId } = req.query; // Access userId from query string

  try {
    console.log(userId);
    const posts = await Post.find({ userId });
    if (!posts) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.status(200).json(posts); // Send posts as JSON
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to fetch posts", error });
  }
});

//patch

addPostRouter.patch("/update/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.body.userID;

    await Post.updateOne({ _id: id, userID: userId }, req.body)
      .then(() => {
        res.status(200).json({ msg: "Post updated successfully" });
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

addPostRouter.delete("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.body.userID;
    await Post.deleteOne({ _id: id, userID: userId })
      .then(() => {
        res.status(200).json({ msg: "Post deleted successfully" });
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = addPostRouter;
