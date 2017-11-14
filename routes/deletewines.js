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
	
/* 删除活动 */
router.post('/', function(req, res, next) {

	let loadData = Object.assign({}, req.body);
	let reqId = loadData.id, reqCountry = loadData.country;

	Home.findById('59f72895ca8e128c96492698')
	.exec(function(err, docs){

		if(err) return handleError(err);

		docs.products.map(function(v, i) {
			
			if(v._id == reqId){

				docs.products.splice(i, 1);

				var filterProducts = docs.products.filter(function(v1, i1) {
					if(reqCountry === '美国' || reqCountry === '意大利' || reqCountry === '法国'){
						return v1.country === reqCountry;
					} else{
						return (v1.country !== '美国' && v1.country !== '意大利' && v1.country !== '法国');
					}
				});

				switch(reqCountry){
					case '美国':
						docs.productsClassic['美国'] = filterProducts;
						break;
					case '意大利':
						docs.productsClassic['意大利'] = filterProducts;
						break;
					case '法国':
						docs.productsClassic['法国'] = filterProducts;
						break;
					default:
						docs.productsClassic['其他'] = filterProducts;
						break;
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