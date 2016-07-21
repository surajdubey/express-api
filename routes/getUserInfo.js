var express = require('express');
var router = express.Router();
var db = require('../helper/db/mysql');
var validateAccessToken = require('./validate_access_token');

var getUserInfo = function(req, res) {
  if(validateAccessToken(req, function(user_id) {
      console.log('User ID is ' + user_id);
    if(user_id == -1) {
      res.send({success: false, message: "Invalid Access Token"});
    } else {
      db.query('SELECT username,name FROM users WHERE user_id = ?', user_id, function(error, result) {
        var username = result[0].username;
        var name = result[0].name;
        res.send({success: true, name: name, username: username});
      })
    }
  }));
}

router.post('/', [getUserInfo]);
module.exports = router;
