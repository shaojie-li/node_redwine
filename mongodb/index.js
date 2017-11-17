/**
 * mongoose操作类(封装mongodb)
 */

var fs = require('fs');
var path = require('path');
var mongoose = require('mongoose');
var logger = require('pomelo-logger').getLogger('mongodb-log');

mongoose.Promise = global.Promise;

var options = {
    db_user: "lisouljay",
    db_pwd: "lishaojie123",
    db_host: "127.0.0.1",
    db_port: 27017,
    db_name: "redwines"
};

var dbURL = "mongodb://" + options.db_user + ':' + options.db_pwd + '@' + options.db_host + ":" + options.db_port + "/" + options.db_name;

var db = mongoose.connect(dbURL, { useMongoClient: true });

db.on('connected', function (err) {
    if (err) logger.error('Database connection failure');
});

db.on('error', function (err) {
    logger.error('Mongoose connected error ' + err);
});

db.on('disconnected', function () {
    logger.error('Mongoose disconnected');
});
