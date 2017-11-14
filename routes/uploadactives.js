var express = require('express');
var router = express.Router();
var http = require('http');
var mongoose = require('mongoose');
var Home = require('../models/home');

router.all('*', function(req, res, next) {  
  res.header("Access-Control-Allow-Origin", "*");  
  res.header("Access-Control-Allow-Headers", "X-Requested-With,Content-Type");  
  res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS"); 
  res.header("Content-Type","multipart/form-data");   
  next();  
});
	
/* 添加活动 */
router.post('/', function(req, res, next) {

	var loadData = Object.assign({}, req.body);


	loadData.listImg.url = 'http://localhost:3001/uploadfile/' + loadData.listImg.name;
	
	loadData.detailImg = loadData.detailImg.map(function(v, i){
		var midObj = {};
		midObj.url = 'http://localhost:3001/uploadfile/' + v.name;
		midObj.name = v.name;
		return midObj;
	});

	console.log(loadData)
	
	Home.findById('59f72895ca8e128c96492698', function(err, docs){
		if(err) return handleError(err);
		docs.actives.push(loadData);
		docs.save(function(err){
		    res.send('success');
		    return;
		}); 
	});

});

module.exports = router;