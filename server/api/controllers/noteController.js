"use strict";
const { User, Note, Label, NoteLabel } = require("../../database/models");
const notelabeController = require("./notelabelController");

module.exports = {
  // fetch all note
  fetchAllNote: async (req, res, next) => {
    try {
      if (!(await User.findByPk(req.params.userId)))
        return res.status(400).json({
          error: {
            message: `No valid entry found for provided id ${req.params.userId}`
          }
        });

      const { count, rows } = await Note.findAndCountAll({
        where: { UserId: req.params.userId }
      });

      res.status(200).json({ count: count, notes: rows });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: { message: error } });
    }
  },

  // fetch pin note
  fetchPinNote: async (req, res, next) => {
    try {
      if (!(await User.findByPk(req.params.userId)))
        return res.status(400).json({
          error: {
            message: `No valid entry found for provided id ${req.params.userId}`
          }
        });

      const { count, rows } = await Note.findAndCountAll({
        where: { UserId: req.params.userId, pin: true },
        order: [["updatedAt", "DESC"]]
      });

      res.status(200).json({ count: count, notes: rows });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: { message: error } });
    }
  },

  //   fetch unpin notes
  fetchUnpinNote: async (req, res, next) => {
    try {
      if (!(await User.findByPk(req.params.userId)))
        return res.status(400).json({
          error: {
            message: `No valid entry found for provided id ${req.params.userId}`
          }
        });

      const { count, rows } = await Note.findAndCountAll({
        where: { UserId: req.params.userId, pin: false },
        order: [["updatedAt", "DESC"]]
      });

      res.status(200).json({ count: count, notes: rows });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: { message: error } });
    }
  },

  // create note
  createNote: async (req, res, next) => {
    try {
      if (!(await User.findByPk(req.body.UserId)))
        return res.status(400).json({
          error: {
            message: `User doesn't exist`
          }
        });

      await Note.create(req.body).then(async response => {
        if (req.body.label) {
          // If label, update NoteLabel tabel and return succes
          const state = await notelabeController.associate(
            req.body.label,
            response.id
          );

          // Validate state
          if (state.message.status) {
            res.status(200).json({
              message: "Note created",
              createdNote: response
            });
          } else {
            // Delete Created Note
            await response.destroy().then(deletedNote => {
              res.status(400).json({ error: { message: state.message.error } });
            });
          }
        }

        // if no label exist on req.body
        res.status(200).json({
          message: "Note created",
          createdNote: response
        });
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: { message: error } });
    }
  },

  // update note
  updateNote: async (req, res, next) => {
    try {
      const note = await Note.findByPk(req.params.noteId);

      if (note)
        return await note.update(req.body).then(async response => {
          if (req.body.label) {
            // If label, update NoteLabel tabel and return succes
            const state = await notelabeController.associate(
              req.body.label,
              response.id
            );

            // Validate state
            if (state.message.status) {
              res.status(200).json({
                message: "Note updated",
                note: response
              });
            } else {
              // Delete Created Note
              await response.destroy().then(deletedNote => {
                res.status(400).json({
                  error: {
                    message: state.message.error
                  }
                });
              });
            }
          }

          // if no label exist on req.body
          res.status(200).json({
            message: "Note updated",
            note: response
          });
        });

      res.status(400).json({
        error: {
          message: `No valid entry found for provided id ${req.params.noteId}`
        }
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: { message: error } });
    }
  },

  // deletee note
  deleteCreate: async (req, res, next) => {
    try {
      const note = await Note.findByPk(req.params.noteId);

      if (note)
        return await note.destroy().then(response => {
          res.status(200).json({
            message: "Note deleted",
            note: response
          });
        });

      res.status(400).json({
        error: {
          message: `No valid entry found for provided id ${req.params.noteId}`
        }
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: { message: error } });
    }
  }
};
