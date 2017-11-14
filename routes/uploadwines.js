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

	var loadData = Object.assign({}, req.body);

	loadData.smallImage.url = 'http://localhost:3001/uploadfile/' + loadData.smallImage.name;

	loadData.largerImage.url = 'http://localhost:3001/uploadfile/' + loadData.largerImage.name;

	loadData.listImage.url = 'http://localhost:3001/uploadfile/' + loadData.listImage.name;
	console.log(loadData)
	Home.findById('59f72895ca8e128c96492698', function(err, docs){
		if(err) return handleError(err);
		docs.products.push(loadData);
		switch(loadData.country){
			case '美国':
				docs.productsClassic['美国'].push(loadData);
				break;
			case '意大利':
				docs.productsClassic['意大利'].push(loadData);
				break;
			case '法国':
				docs.productsClassic['法国'].push(loadData);
				break;
			default:
				docs.productsClassic['其他'].push(loadData);
				break;
		}
		docs.save(function(err){
	    res.send('success');
	    return;
	  }); 
	});

});

module.exports = router;