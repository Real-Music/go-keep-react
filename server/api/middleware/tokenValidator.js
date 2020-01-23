const config = require("../../database/config/config");
const jwt = require("jsonwebtoken");

module.exports = {
  jwtSignUser: user => {
    return jwt.sign({ email: user.email }, config.authentication.jwtSecret, {
      expiresIn: 60 * 60 * 24 * 7
    });
  },
  verifyToken: (req, res, next) => {
    try {
      const token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, config.authentication.jwtSecret);
      req.userData = decoded;
      next();
    } catch (error) {
      return res.status(401).json({
        error: {
          message: "Authentication failed"
        }
      });
    }
  }
};
