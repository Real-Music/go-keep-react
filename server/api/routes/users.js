const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.get("/", (req, res) => {
  res.status(200).json({
    message: "You just hit the user routes"
  });
});

module.exports = router;
