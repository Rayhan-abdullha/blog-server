const router = require("express").Router();
const Category = require("../models/Category");

router.post("/", async (req, res) => {
  const newCat = new Category(req.body);
  try {
    const savedCat = await newCat.save();
    res.status(200).json(savedCat);
  } catch (err) {
    res.status(err.status || 500).json({
      code: err.status || 500,
      message: err.message || "Inter server error",
    });
  }
});

router.get("/", async (req, res) => {
  try {
    const cats = await Category.find();
    res.status(200).json(cats);
  } catch (err) {
    res.status(err.status || 500).json({
      code: err.status || 500,
      message: err.message || "Inter server error",
    });
  }
});

module.exports = router;
