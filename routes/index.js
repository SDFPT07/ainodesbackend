var express = require("express");
var router = express.Router();

router.get("/", function (req, res) {
  res.json({ message: "Welcome to the Express API!" });
});

module.exports = router;
