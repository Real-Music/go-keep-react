"use strict";
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      fname: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          is: ["^[a-zA-Z]+$", "i"]
        }
      },
      lname: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          is: ["^[a-zA-Z]+$", "i"]
        }
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true
        }
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [8, 250]
        }
      }
    },
    {}
  );
  User.associate = models => {
    // associations can be defined here
    // User.hasMany(models.Notes, {
    //   foreignKey: "userId"
    // });
  };
  return User;
};
