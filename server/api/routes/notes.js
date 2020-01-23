const express = require("express");
const router = express.Router();
const controller = require("../controllers/noteController");
const { verifyToken } = require("../middleware/tokenValidator");
const check = require("../middleware/noteValidator");

// fetch all note
router.get("/:userId", verifyToken, check.userID, controller.fetchAllNote);

// fetch all pin note
router.get("/:userId/pin", verifyToken, check.userID, controller.fetchPinNote);

// fetch all unpin note
router.get(
  "/:userId/unpin",
  verifyToken,
  check.userID,
  controller.fetchUnpinNote
);

// create note
router.post("/", verifyToken, check.UserID, controller.createNote);

// update note
router.patch("/:noteId", verifyToken, check.noteID, controller.updateNote);

// deletee note
router.delete("/:noteId", verifyToken, check.noteID, controller.deleteCreate);

module.exports = router;
