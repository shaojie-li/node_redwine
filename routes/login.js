let express = require('express');
let router = express.Router();
let http = require('http');
let mongoose = require('mongoose');
let Home = require('../models/home');

router.all('*', function(req, res, next) {  
  res.header("Access-Control-Allow-Origin", "*");  
  res.header("Access-Control-Allow-Headers", "X-Requested-With,Content-Type");  
  res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS"); 
  res.header("Content-Type","multipart/form-data");   
  next();  
});
	
/* 登陆 */
router.post('/', function(req, res, next) {

	let loadData = Object.assign({}, req.body);
	let reqName = loadData.account, reqPass = loadData.pass;
	
	Home.findById('59f72895ca8e128c96492698', function(err, docs){
		if(err) return handleError(err);
		let userObj = docs.user.filter(function(v, i){
			return v.account === reqName && v.pass === reqPass;
		});
		userObj.length ? res.json({code: 1, result: reqName}) : res.send({code: 0});
	});

});

module.exports = router;