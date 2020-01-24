"use strict";
module.exports = (sequelize, DataTypes) => {
  const NoteLabel = sequelize.define("NoteLabel", {}, {});
  NoteLabel.associate = function(models) {
    // associations can be defined here
    NoteLabel.belongsTo(models.Note);
    NoteLabel.belongsTo(models.Label);
  };
  return NoteLabel;
};
