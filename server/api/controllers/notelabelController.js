"use strict";
const { NoteLabel } = require("../../database/models");

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
            console.log(error);
            return {
              message: {
                status: false,
                error: `Invalid label`
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
