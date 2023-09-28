const router = require("express").Router();
const User = require("../models/User");

// upadate
router.patch("/:id", async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);
  const userId = req.body.userId || user.userId;
  const userName = req.body.userName || user.userName;
  const email = req.body.email || user.email;
  const profilePic = req.body.profilePic || user.profilePic;
  try {
    if (req.body.userId !== req.params.id) {
      return res.status(401).json("Permision Denied");
    }
    const upadateUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: { userId, userName, email, profilePic },
      },
      { new: true }
    );

    return res.status(200).json(upadateUser);
  } catch (err) {
    return res.status(err.status || 500).json({
      code: err.status || 500,
      message: err.message || "Inter server error",
    });
  }
});

//GET USER
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, ...others } = user._doc;
    res.status(200).json(others);
  } catch (err) {
    res.status(err.status || 500).json({
      code: err.status || 500,
      message: err.message || "Inter server error",
    });
  }
});

module.exports = router;
