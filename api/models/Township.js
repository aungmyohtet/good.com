"use strict";

module.exports = function(sequelize, Sequelize) {
  var Township = sequelize.define(
    "Township",
    {
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
          len: [1, 50]
        }
      }
    }
  );
  
  return Township;
};
