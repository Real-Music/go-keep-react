const Joi = require("@hapi/joi");

module.exports = {
  labelID: (req, res, next) => {
    const schema = Joi.object({
      labelId: Joi.number().required()
    });

    const { error, value } = schema.validate(req.params);
    if (error) {
      switch (error.details[0].context.key) {
        case "labelId":
          res
            .status(400)
            .json({ error: { message: "labelId must be of type number" } });
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
