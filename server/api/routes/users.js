const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const validator = require("../middleware/userValidator");
const { verifyToken } = require("../middleware/tokenValidator");

// login user
router.post("/login", validator.loginValidator, userController.loginUser);

// create a new user
router.post("/signup", validator.createUser, userController.createUser);

// update user details
router.patch(
  "/users/:userId",
  verifyToken,
  validator.validateID,
  userController.updateUser
);

// delete user account
router.delete(
  "/users/:userId",
  verifyToken,
  validator.validateID,
  userController.deleteUser
);

module.exports = router;
