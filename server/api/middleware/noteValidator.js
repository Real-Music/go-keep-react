const Joi = require("@hapi/joi");

module.exports = {
  /** Create New User Validator */
  UserID: (req, res, next) => {
    const schema = Joi.object({
      UserId: Joi.number().required()
    });

    const { error, value } = schema.validate({ UserId: req.body.UserId });
    if (error) {
      switch (error.details[0].context.key) {
        case "UserId":
          res.status(400).json({
            error: {
              message: "UserId is required"
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

  userID: (req, res, next) => {
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
  },

  noteID: (req, res, next) => {
    const schema = Joi.object({
      noteId: Joi.number().required()
    });

    const { error, value } = schema.validate(req.params);
    if (error) {
      switch (error.details[0].context.key) {
        case "noteId":
          res
            .status(400)
            .json({ error: { message: "noteId must be of type number" } });
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
