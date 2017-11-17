let express = require('express');
let router = express.Router();
let http = require('http');
let mongoose = require('mongoose');
let Home = require('../models/home');
let config = new require('../config');

router.all('*', function(req, res, next) {  
  res.header("Access-Control-Allow-Origin", "*");  
  res.header("Access-Control-Allow-Headers", "X-Requested-With,Content-Type");  
  res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS"); 
  res.header("Content-Type","multipart/form-data");   
  next();  
});
	
/* 添加产品 */
router.post('/', function(req, res, next) {

	let loadData = Object.assign([], req.body),tips = 'success',reqData = [];
	let baseUrl = req.headers.host || '';

	loadData = loadData.map(function(v, i){
		return JSON.parse(v);
	});
	
	for(let i = 0;i < loadData.length;i++){
		reqData[i] = {};
		reqData[i].name = loadData[i].name;
		reqData[i].url = config.protocol + baseUrl + '/uploadfile/' + loadData[i].name;
	}
	console.log(reqData)
	Home.findById('59f72895ca8e128c96492698', function(err, docs){
		if(err) return handleError(err);
		let bannerArr = [], reqArr = [];

		for(let i = 0;i < docs.bannerImg.length;i++){
			bannerArr.push(docs.bannerImg[i].name)
		}

		for(let i = 0;i < reqData.length;i++){
			reqArr.push(reqData[i].name)
		}
		
		let allArr = bannerArr.concat(reqArr)
		let setArr = Array.from(new Set(allArr))
		tips = allArr.length > setArr.length ? 'isRepeat' : 'success';
		for(let i = 0;i < reqData.length;i++){
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