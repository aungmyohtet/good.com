var models = require("../models");

module.exports = {
  findAll: function(req, res, next) {
    models.Job.findAll().then(function(jobs) {
      res.json(jobs);
    });
  },
  search: function(req, res, next) {
    var townshipId = req.param("township");
    var salary = parseFloat(req.param("salary"));
    models.Job.find({
        where: {
            TownshipId: townshipId,
            minSalary: {
                $gte: salary
            }
        }
    }).then(function(jobs) {
      res.json(jobs);
    });
  }
};
