var TownshipController = require("../../api/controllers/TownshipController");
var express = require('express');
var router = express.Router();

router.get("/", TownshipController.findAll);

module.exports = router;
