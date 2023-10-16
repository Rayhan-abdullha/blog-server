const express = require("express");
const cors = require("cors");
const app = express();
const authRoute = require("./routes/auth");
const userRoute = require("./routes/user");
const postsRoute = require("./routes/post");

app.use(express.json());
app.use(cors());

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postsRoute);

app.get("/", (_req, res) => {
  res.status(200).json({
    status: 200,
    message: "Server is running...",
  });
});

app.use((_req, _res, next) => {
  const error = new Error("Notfound 404");
  error.status = 404;
  next(error);
});

app.use((err, _req, res, _next) => {
  if (err.status) {
    return res.status(err.status).json({ error: err.message });
  }
  return res.status(500).json({ error: "Server is occurred!" });
});

module.exports = app;
