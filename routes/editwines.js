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
	
/* 编辑产品 */
router.post('/', function(req, res, next) {

	let loadData = Object.assign({}, req.body);
	let reqId = loadData._id, reqCountry = loadData.country;
	let baseUrl = req.headers.host || '';

	if(loadData.smallImage.name != undefined){
		loadData.smallImage.url = config.protocol + baseUrl + '/uploadfile/simage/' + loadData.smallImage.name;
	} else{
		loadData.smallImage = {};
	}
	
	if(loadData.largerImage.name != undefined){
		loadData.largerImage.url = config.protocol + baseUrl + '/uploadfile/bimage/' + loadData.largerImage.name;
	} else{
		loadData.largerImage = {};
	}

	if(loadData.listImage.name != undefined){
		loadData.listImage.url = config.protocol + baseUrl + '/uploadfile/limage/' + loadData.listImage.name;
	} else{
		loadData.listImage = {};
	}

	Home.findById('59f72895ca8e128c96492698')
	.exec(function(err, docs){

		if(err) return handleError(err);

		docs.products.map(function(v, i) {
			if(v._id == reqId){

				let smallImg = Object.assign({}, docs.products[i].smallImage),
					largerImg = Object.assign({}, docs.products[i].largerImage),
					listImg = Object.assign({}, docs.products[i].listImage),
					hasSmallImg = !!Object.keys(req.body.smallImage).length,
					hasLargerImg = !!Object.keys(req.body.largerImage).length,
					hasListImg = !!Object.keys(req.body.listImage).length;

				docs.products[i] = loadData;

				if(!hasSmallImg){
					docs.products[i].smallImage = smallImg
				}

				if(!hasLargerImg){
					docs.products[i].largerImage = largerImg
				}

				if(!hasListImg){
					docs.products[i].listImage = listImg
				}

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