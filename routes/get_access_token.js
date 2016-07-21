var express = require('express');
var router = express.Router();
var db = require('../helper/db/mysql');
var crypto = require('crypto');
var INVALID_USER = -1;

var getAccessToken = function(username, callback) {
  var access_token = generateAccessToken();
  console.log('Generated token is ' + access_token);

  var user_id = getUserId(username, function(user_id) {
    console.log('USER ID ' + user_id);
    if(user_id == INVALID_USER) {
      return callback(INVALID_USER);
    } else {
      var postData = {user_id: user_id, access_token: access_token};
      db.query('INSERT INTO access_tokens SET ?', postData, function(err, res) {
        if(err) {
          return callback(INVALID_USER);
        } else {
          return callback(access_token);
        }
      });
    }

  });
}

function generateAccessToken() {
  var accessToken = crypto.randomBytes(48).toString('hex');
  return accessToken;
}

function getUserId(username, callback) {
  console.log('passed '  + username);
  db.query('SELECT * FROM users WHERE username = ? ', [username], function(err, result) {
    if(err) {
      console.log('inside error');
      callback(INVALID_USER);
    } else {
      console.log('inside success');
      if(result.length == 0) {
        callback(INVALID_USER);
      } else {
        callback(result[0].user_id);
      }
    }
  });
}

module.exports = getAccessToken;
