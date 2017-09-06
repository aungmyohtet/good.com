var JobController = require("../../api/controllers/JobController");
var express = require('express');
var router = express.Router();

router.get("/", JobController.findAll);

router.get("/search", JobController.search);
module.exports = router;
