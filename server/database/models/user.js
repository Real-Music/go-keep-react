"use strict";
const Promise = require("bluebird");
const bcrypt = Promise.promisifyAll(require("bcrypt"));

function hashPassword(user, options) {
  const SALT_FACTOR = 10;
  if (!user.changed("password")) {
    return;
  }

  return bcrypt.hash(user.password, SALT_FACTOR).then(hash => {
    user.setDataValue("password", hash);
  });
}

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
          len: [5, 250]
        }
      },
      profileImg: {
        type: DataTypes.STRING,
        defaultValue: "profile/go-keep.png"
      }
    },
    {
      hooks: {
        beforeCreate: hashPassword,
        beforeUpdate: hashPassword
      }
    }
  );
  User.prototype.comparePassword = function(password) {
    return bcrypt.compare(password, this.password);
  };
  User.associate = models => {
    // associations can be defined here
    User.hasMany(models.Note, { as: "userId" });
  };

  return User;
};
