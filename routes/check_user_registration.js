var express = require('express');
var router = express.Router();

var db = require('../helper/db/mysql');
var validateAccessToken = require('./validate_access_token');

var checkAccessToken = function(req, res, next) {
    validateAccessToken(req, function(user_id) {
        if(user_id == -1) {
            res.send({"success": false, "message": "access token is invalid"});
        } else {
            next();
        }
    });
}

var checkIfUserIsRegistered = function(req, res, next) {
    var username = req.body.username;
    db.query("SELECT username FROM users WHERE username = ?",[username], function(err, rows) {
        if(err) {
            res.send({success : false, message: "internal error occured 02"});
        } else {
            if(rows.length > 0) {
                res.send({ success : true, message : "username registered with us"});
            } else {
                res.send({ success : false, message : "username not registered with us"});
            }
        }
    });
}

router.post('/', [checkAccessToken, checkIfUserIsRegistered]);

module.exports = router;
