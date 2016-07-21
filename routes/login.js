var express = require('express');
var router = express.Router();
var db = require('../helper/db/mysql');
var accessToken = require('./get_access_token');

var userLogin = function(req, res, next) {
  var username = req.body.username;
  var password = req.body.password;

  db.query('SELECT * FROM users WHERE username = ? AND password = ?', [username, password], function(err, result) {
    if(err) {
      res.send({success: false, "message": "Error code login 01"});
    } else {
      if(result.length > 0) {
        accessToken(username, function(access_token) {
          res.send({success:true, access_token: access_token});
        });
      } else {
        res.send({success: false, "message": "Invalid credentials"})
      }
    }
  })
}

router.post('/', [userLogin]);

module.exports = router;
