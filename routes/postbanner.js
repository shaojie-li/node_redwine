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
	
/* 添加产品 */
router.post('/', function(req, res, next) {

	var loadData = Object.assign([], req.body),tips = 'success',reqData = [];

	var loadData = loadData.map(function(v, i){
		return JSON.parse(v);
	});
	
	for(var i = 0;i < loadData.length;i++){
		reqData[i] = {};
		reqData[i].name = loadData[i].name;
		reqData[i].url = '/uploadfile/' + loadData[i].name;
	}
	console.log(reqData)
	Home.findById('59f72895ca8e128c96492698', function(err, docs){
		if(err) return handleError(err);
		var bannerArr = [], reqArr = [];

		for(var i = 0;i < docs.bannerImg.length;i++){
			bannerArr.push(docs.bannerImg[i].name)
		}

		for(var i = 0;i < reqData.length;i++){
			reqArr.push(reqData[i].name)
		}
		
		var allArr = bannerArr.concat(reqArr)
		var setArr = Array.from(new Set(allArr))
		tips = allArr.length > setArr.length ? 'isRepeat' : 'success';
		for(var i = 0;i < reqData.length;i++){
			tips === 'success' ? docs.bannerImg.push(reqData[i]) : '';
		}
		docs.save(function(err){
			if(err) return handleError(err);
			res.send(tips);
		    return;
		}); 
	});

});

module.exports = router;