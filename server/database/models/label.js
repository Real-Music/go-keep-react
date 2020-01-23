"use strict";
module.exports = (sequelize, DataTypes) => {
  const Label = sequelize.define(
    "Label",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      }
    },
    {}
  );
  Label.associate = function(models) {
    // associations can be defined here
    Label.belongsToMany(models.Note, { through: "NoteLabel" });
  };
  return Label;
};
