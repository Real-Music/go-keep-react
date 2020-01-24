"use strict";
const { User, Note, Label, NoteLabel } = require("../../database/models");

module.exports = {
  // create label
  createLabel: async (req, res, next) => {
    try {
      if (await Label.findOne({ where: { name: req.body.name } }))
        return res.status(400).json({
          message: "This label name is already in use"
        });

      const label = await Label.create(req.body);
      res.status(200).json({
        message: "Label created",
        createdLabel: label
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: { message: error } });
    }
  },

  // update
  updateLabel: async (req, res, next) => {
    try {
      const label = await Label.findByPk(req.params.labelId);

      if (label)
        return await label
          .update(req.body)
          .then(response => {
            res.status(200).json({ message: "Label updated", labe: response });
          })
          .catch(error => {
            res.status(400).json({
              error: { message: "This label name is already in use" }
            });
          });

      res.status(400).json({
        error: {
          message: `No valid entry found for provided id ${req.params.labelId}`
        }
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: { message: error } });
    }
  },

  // delete label
  deleteLabel: async (req, res, next) => {
    try {
      const label = await Label.findByPk(req.params.labelId);

      if (label)
        return await label.destroy().then(response => {
          res.status(200).json({ message: "Label deleted", label: response });
        });

      res.status(400).json({
        error: {
          message: `No valid entry found for provided id ${req.params.labelId}`
        }
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: { message: error } });
    }
  }
};
