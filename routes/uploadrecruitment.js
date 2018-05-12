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
	
/* 添加职位 */
router.post('/', function(req, res, next) {

	let loadData = Object.assign({}, req.body);
	let baseUrl = req.headers.host || '';
	
	Home.findById('59f72895ca8e128c96492698', function(err, docs){
        if(err) return handleError(err);
        console.log(loadData)
		docs.recruitment.unshift(loadData);
		docs.save(function(err){
		    res.send('success');
		    return;
		}); 
	});

});

module.exports = router;