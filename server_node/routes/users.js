const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  res.json({ msg: "user work 77777" });
});

// localhost:3001/users/showInfo
router.get("/showInfo", async (req, res) => {
  res.json({ msg: "Show info" });
});

module.exports = router;
