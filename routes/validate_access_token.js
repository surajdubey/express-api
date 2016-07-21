var express = require('express');
var router = express.Router();
var db = require('../helper/db/mysql');
var INVALID_USER_ID = -1;

var validateAccessToken = function(req, callback) {
  var access_token = req.headers['access_token'];
  db.query('SELECT * FROM access_tokens WHERE access_token = ?', access_token, function(error, result) {
    if(error) {
      return callback(INVALID_USER_ID);
    } else {
      if(result.length == 0) {
        return callback(INVALID_USER_ID);
      } else {
        return callback(result[0].user_id);
      }
    }
  });
}

module.exports = validateAccessToken;
