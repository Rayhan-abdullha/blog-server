const router = require("express").Router();
const Post = require("../models/Post");
const fs = require("fs");

// Create Post
router.post("/", async (req, res) => {
  const newPost = new Post(req.body);
  try {
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  } catch (err) {
    res.status(err.status || 500).json({
      code: err.status || 500,
      message: err.message || "Inter server error",
    });
  }
});

// Update
router.put("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.userName === req.body.userName) {
      try {
        const updatedPost = await Post.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        );
        res.status(200).json(updatedPost);
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(401).json("You can update only your post!");
    }
  } catch (err) {
    res.status(err.status || 500).json({
      code: err.status || 500,
      message: err.message || "Inter server error",
    });
  }
});

// Delete
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json("Post not Found");
    }
    let directoryPath = __dirname;
    directoryPath = directoryPath.replace("routes", "images");
    directoryPath = `${directoryPath}\\${post.photo}`;
    await Post.findByIdAndDelete(id);
    if (fs.existsSync(directoryPath)) {
      fs.unlinkSync(directoryPath);
    }
    return res.status(200).json("Post deleted");
  } catch (err) {
    console.log(err.message);
    res.status(err.status || 500).json({
      code: err.status || 500,
      message: err.message || "Inter server error",
    });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({ code: 404, message: "Post not found" });
    }
    return res.status(200).json({ code: 200, data: post });
  } catch (err) {
    res.status(err.status || 500).json({
      code: err.status || 500,
      message: err.message || "Inter server error",
    });
  }
});

//GET ALL POSTS
router.get("/", async (req, res) => {
  const userName = req.query.user;
  const catName = req.query.cat;

  try {
    let posts;
    if (userName) {
      posts = await Post.find({ userName });
    } else if (catName) {
      posts = await Post.find({
        categories: {
          $in: [catName],
        },
      });
    } else {
      posts = await Post.find();
    }
    res.status(200).json(posts);
  } catch (err) {
    res.status(err.status || 500).json({
      code: err.status || 500,
      message: err.message || "Inter server error",
    });
  }
});
module.exports = router;
