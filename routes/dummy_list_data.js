var express = require('express');
var router = express.Router();
var db = require('../helper/db/mysql');
var validateAccessToken = require('./validate_access_token');

var dummyListData = function(req, res) {
    var dummyJsonArray = [];

    for(var i=0; i<10; i++) {
        dummyJsonArray.push({
            "data" : "user data " + i,
        });
    }
    res.send({array: dummyJsonArray});
}
router.post('/', [dummyListData]);
module.exports = router;
