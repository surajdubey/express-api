var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.send({"success": "true"});
});

router.post('/', function(req, res, next) {
  res.send({"success": "true"});
});

module.exports = router;
