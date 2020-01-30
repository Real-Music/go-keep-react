const Joi = require("@hapi/joi");

module.exports = {
  /** Create New User Validator */
  createUser: (req, res, next) => {
    const schema = Joi.object({
      fname: Joi.string().regex(new RegExp("^[a-zA-Z_ ]{2,15}$")),
      lname: Joi.string().regex(new RegExp("^[a-zA-Z]{2,15}$")),
      email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ["com", "fr", "net"] } })
        .required(),
      password: Joi.string()
        .min(5)
        .max(30)
        .required()
    });

    const { error, value } = schema.validate(req.body);
    if (error) {
      switch (error.details[0].context.key) {
        case "fname":
          res.status(400).json({
            error: {
              type: "fname",
              message: "Only letters are allow for fname"
            }
          });
          break;
        case "lname":
          res.status(400).json({
            error: {
              type: "lname",
              message: "Only letters are allow lname"
            }
          });
          break;
        case "email":
          res.status(400).json({
            error: {
              type: "email",
              message: "Invalid email format"
            }
          });
          break;
        case "password":
          res.status(400).json({
            error: {
              type: "password",
              message: "Password must have a min character of 5"
            }
          });
          break;
        default:
          res.status(400).json({
            error: {
              message: "Invalid User Credentails"
            }
          });
          break;
      }
    } else {
      next();
    }
  },

  // Login validator
  loginValidator: (req, res, next) => {
    const schema = Joi.object({
      email: Joi.string()
        .email({
          minDomainSegments: 2,
          tlds: { allow: ["com", "fr", "net"] }
        })
        .required(),
      password: Joi.string()
        .min(5)
        .max(30)
        .required()
    });

    const { error, value } = schema.validate(req.body);
    if (error) {
      switch (error.details[0].context.key) {
        case "email":
          res.status(400).json({
            error: { message: "Invalid email or password" }
          });
          break;

        case "password":
          res.status(400).json({
            error: { message: "Invalid email or password" }
          });
          break;

        default:
          res.status(400).json({
            error: {
              message: "Invalid User Credentails"
            }
          });
          break;
      }
    } else {
      next();
    }
  },

  validateID: (req, res, next) => {
    const schema = Joi.object({
      userId: Joi.number().required()
    });

    const { error, value } = schema.validate(req.params);
    if (error) {
      switch (error.details[0].context.key) {
        case "userId":
          res
            .status(400)
            .json({ error: { message: "userId must be of type number" } });
          break;

        default:
          res.status(400).json({
            error: {
              message: "Invalid User Credentails"
            }
          });
          break;
      }
    } else {
      next();
    }
  }
};
