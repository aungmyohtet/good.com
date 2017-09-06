var models = require("../models");

module.exports = {
  findAll: function(req, res, next) {
    models.Township.findAll().then(function(townships) {
      res.json(townships);
    });
  }
};
