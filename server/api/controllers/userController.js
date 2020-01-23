"use strict";
const { User } = require("../../database/models");
const token = require("../middleware/tokenValidator");

module.exports = {
  // log in user
  loginUser: async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ where: { email: email } });

      if (!user)
        return res
          .status(403)
          .json({ error: { message: "The login information was incorrect" } });

      const isPasswordValid = await user.comparePassword(password);
      if (!isPasswordValid)
        return res
          .status(403)
          .json({ error: { message: "The login information was incorrect" } });

      res
        .status(200)
        .json({ user: user, token: token.jwtSignUser(user.toJSON) });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: { message: error } });
    }
  },

  // create a new user
  createUser: async (req, res, next) => {
    try {
      if (await User.findOne({ where: { email: req.body.email } }))
        return res
          .status(403)
          .json({ error: { message: "This email is already in use" } });

      const user = await User.create(req.body);
      res.status(200).json({
        message: "User created",
        createdUser: {
          id: user.id,
          fname: user.fname,
          lname: user.lname,
          email: user.email,
          password: user.password,
          updatedAt: user.updatedAt,
          createdAt: user.createdAt
        }
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: { message: error } });
    }
  },

  // update user details
  updateUser: async (req, res, next) => {
    try {
      const user = await User.findByPk(req.params.userId);

      if (user)
        return await user.update(req.body).then(response => {
          res.status(200).json({
            message: "User updated",
            user: response
          });
        });

      res.status(403).json({
        message: `No valid entry found for provided id ${req.params.userId}`
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: { message: error } });
    }
  },

  // delete user account
  deleteUser: async (req, res, next) => {
    try {
      const user = await User.findByPk(req.params.userId);

      if (user)
        return await user.destroy().then(response => {
          res.status(200).json({
            message: "User deleted",
            user: response
          });
        });

      res.status(403).json({
        mmessage: `No valid entry found for provided id ${req.params.userId}`
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: { message: error } });
    }
  }
};
