"use strict";
const { Note, Label, NoteLabel } = require("../../database/models");

module.exports = {
  associate: async (label, noteId) => {
    try {
      if (Array.isArray(label) && typeof label === "object") {
        const data = label.map(id => {
          return { LabelId: id, NoteId: noteId };
        });

        return await NoteLabel.bulkCreate(data)
          .then(response => {
            return { message: { status: true } };
          })
          .catch(error => {
            return {
              message: {
                status: false,
                error: `One of the label does not exist`
              }
            };
          });
      }

      return {
        message: { status: false, error: `Label must be a typeof array` }
      };
    } catch (error) {
      return { message: { status: false, error: error } };
    }
  }
};
