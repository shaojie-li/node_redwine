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
	
/* 编辑活动 */
router.post('/', function(req, res, next) {

	let loadData = Object.assign({}, req.body);
	let reqId = loadData._id;
	let baseUrl = req.headers.host || '';

	if(loadData.listImg.name != undefined){
		loadData.listImg.url = config.protocol + baseUrl + '/uploadfile/avtiveSimage/' + loadData.listImg.name;
	} else{
		loadData.listImg = {};
	}

	loadData.detailImg = loadData.detailImg.map(function(v, i){
		if(v.name != undefined){
			var midObj = {};
			midObj.url = config.protocol + baseUrl + '/uploadfile/avtiveBimage/' + v.name;
			midObj.name = v.name;
			return midObj;
		} else{
			return [];
		}
	});
	Home.findById('59f72895ca8e128c96492698')
	.exec(function(err, docs){

		if(err) return handleError(err);

		docs.actives.map(function(v, i) {
			if(v._id == reqId){

				let smallImg = Object.assign({}, docs.actives[i].listImg),
						largerImg = Object.assign([], docs.actives[i].detailImg),
						hasSmallImg = !!Object.keys(req.body.listImg).length,
						hasLargerImg = !!req.body.detailImg.length;

				docs.actives[i] = loadData;

				if(!hasSmallImg){
					docs.actives[i].listImg = smallImg
				}

				if(!hasLargerImg){
					docs.actives[i].detailImg = largerImg
				}
					
			}

		});

		docs.save(function(err){
			if(err) return handleError(err);
	    res.send('success');
	    return;
	  });

	});

});

module.exports = router;