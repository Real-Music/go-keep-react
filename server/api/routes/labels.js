const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middleware/tokenValidator");
const labelController = require("../controllers/labelController");
const check = require("../middleware/labelValidator");

// fetch all labels
router.get("/userId", (req, res) => {
  res.status(200).json({
    message: "all labels"
  });
});

// create label
router.post("/", verifyToken, labelController.createLabel);

// update
router.patch(
  "/:labelId",
  verifyToken,
  check.labelID,
  labelController.updateLabel
);

// delete label
router.delete(
  "/:labelId",
  verifyToken,
  check.labelID,
  labelController.deleteLabel
);

module.exports = router;
