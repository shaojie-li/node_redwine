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
	
/* 删除banner图 */
router.post('/', function(req, res, next) {

	let loadData = Object.assign({}, req.body);
	let reqName = loadData.name;

	Home.findById('59f72895ca8e128c96492698')
	.exec(function(err, docs){

		if(err) return handleError(err);

		docs.bannerImg.map(function(v, i) {
			
			if(v.name == reqName){

				docs.bannerImg.splice(i, 1);
					
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