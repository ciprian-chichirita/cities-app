var express = require('express');
var router = express.Router();
var path = require('path');
var fs = require('fs');

/* GET users listing. */
router.get('/', function(req, res, next) {
  var citiesJSON = path.resolve('files','cities.json');
  fs.readFile(citiesJSON, function (err, data) {
    if (err) {
      next(err); // Pass errors to Express.
    } else {
      res.json(JSON.parse(data));
    }
  });
});

module.exports = router;