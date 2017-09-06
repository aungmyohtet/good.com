"use strict";

var fs = require("fs");
var path = require("path");
var Sequelize = require("sequelize");
var env = process.env.NODE_ENV || "development";
var config = require(path.join(__dirname, "../..", "config", "database.json"))[
  env
];
if (process.env.DATABASE_URL) {
  var sequelize = new Sequelize(process.env.DATABASE_URL);
} else {
  var sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}
var db = {};

fs
  .readdirSync(__dirname)
  .filter(function(file) {
    return file.indexOf(".") !== 0 && file !== "index.js";
  })
  .forEach(function(file) {
    var model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(function(modelName) {
  if ("associate" in db[modelName]) {
    db[modelName].associate(db);
  }
});

// using force update
sequelize.sync({ force: true }).then(function() {
  db.Township.create({ name: "Kamaryut" }).then(function(township) {
    // job1 in Kamaryut
    db.Job.create({
     title: 'Job Title1',
     minSalary: 50000,
     maxSalary: 100000,
     address: '1st Street, Kamaryut',
     interviewDates: 'October 1, October 2',
     companyName: 'Company 1'
    }).then(function(job) {
      job.setTownship(township);
    });
    
    // job2 in Kamaryut
    db.Job.create({
     title: 'Job Title2',
     minSalary: 100000,
     maxSalary: 200000,
     address: '2nd Street, Kamaryut',
     interviewDates: 'October 3, October 4',
     companyName: 'Company 2'
    }).then(function(job) {
      job.setTownship(township);
    });

  });

  db.Township.create({ name: "Insein" }).then(function(township) {
       // job3 in Insein
    db.Job.create({
     title: 'Job Title3',
     minSalary: 50000,
     maxSalary: 100000,
     address: '1st Street, Insein',
     interviewDates: 'October 5, October 6',
     companyName: 'Company 1'
    }).then(function(job) {
      job.setTownship(township);
    });
    
    // job4 in Insein
    db.Job.create({
     title: 'Job Title4',
     minSalary: 100000,
     maxSalary: 200000,
     address: '2nd Street, Kamaryut',
     interviewDates: 'October 7, October 8',
     companyName: 'Company 2'
    }).then(function(job) {
      job.setTownship(township);
    });

  });
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
