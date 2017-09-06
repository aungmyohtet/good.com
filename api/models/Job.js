"use strict";

module.exports = function(sequelize, Sequelize) {
  var Job = sequelize.define("Job", {
    title: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [1, 50]
      }
    },
    minSalary: {
      type: Sequelize.DOUBLE,
      allowNull: false
    },
    maxSalary: {
      type: Sequelize.DOUBLE,
      allowNull: false
    },
    address: {
      type: Sequelize.STRING,
      allowNull: false
    },
    // for simplicity, interviewDates is comma separated date string list
    interviewDates: {
      type: Sequelize.STRING,
      allowNull: false
    },
    companyName: {
      type: Sequelize.STRING,
      allowNull: false
    }
  });
  Job.associate = function(models) {
    Job.belongsTo(models.Township);
  };

  return Job;
};
