var express = require('express');
var router = express.Router();
var db = require('../helper/db/mysql');
var accessToken = require('./get_access_token');

var checkIfUserExists = function(req, res, next) {
    var name = req.body.name;
    var username = req.body.username;
    var password = req.body.password;

    //TODO: Server side validations, don't rely on client

    db.query('SELECT * FROM users WHERE username = ?', [username], function(err, rows) {
    if(err) {
      res.send({success: false, "message": "Error code: 01"});
    } else {
      if(rows.length > 0) {
        res.send({"success": false, "message": "User already Exists"});
      } else {
        req.name = req.body.name;
        req.username = req.body.username;
        req.password = req.body.password;
        next();
      }
    }
    })};

    var insertUser = function(req, res) {
        var name = req.name;
        var username = req.username;
        var password = req.password;

        var postData = {name: name, username: username, password: password};
        db.query('INSERT INTO users SET ?', postData, function(err, result) {
        if(err) {
          res.send({"success": false, "message": "Error code: 02"});
        } else {
            accessToken(username, function(access_token) {
              console.log('returned ' + access_token);
              res.send({"success": true, "message": "Signup success", "access_token": access_token});

            });
          }
        });
    }

router.post('/', [checkIfUserExists, insertUser]);

module.exports = router;
