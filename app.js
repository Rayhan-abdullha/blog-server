const express = require("express");
const cors = require("cors");
const app = express();
const authRoute = require("./routes/auth");
const userRoute = require("./routes/user");
const postsRoute = require("./routes/post");
const categoryRoute = require("./routes/categories");
const multer = require("multer");

app.use(express.json());
app.use(cors());

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postsRoute);
app.use("/api/categories", categoryRoute);
app.use("/images", express.static("images"));

const storage = multer.diskStorage({
  destination: (req, _file, cb) => {
    cb(null, "images");
  },
  filename: (req, _file, cb) => {
    cb(null, req.body.name);
  },
});

const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), async (req, res) => {
  res.status(200).json("file has been uploded");
});

module.exports = app;
