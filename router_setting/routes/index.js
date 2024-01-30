const express = require("express");

// ** express router
const router = express.Router();

// ** GET / 요청
router.get("/", (req, res) => {
  res.send("Hello Index Router!");
});

// ** router export
module.exports = router;
