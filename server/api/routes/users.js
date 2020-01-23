const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const validator = require("../middleware/userValidator");
const { verifyToken } = require("../middleware/tokenValidator");

// login user
router.post("/login", userController.loginUser);

// create a new user
router.post("/signup", validator.createUser, userController.createUser);

// update user details
router.patch("/:userId", verifyToken, userController.updateUser);

// delete user account
router.delete("/:userId", verifyToken, userController.deleteUser);

module.exports = router;
