var express = require("express");
var router = express.Router();

router.get("/", function (req, res) {
  res.json([
    { id: 1, name: "John Doe" },
    { id: 2, name: "Jane Doe" },
  ]);
});

module.exports = router;
