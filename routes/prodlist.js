let express = require('express');
let router = express.Router();
let MongoDB = require('../mongodb');
let Home = new require('../models/home');

/* GET prodList page. */
router.get('/', function(req, res, next) {
	let ua = req.headers['user-agent'].toLowerCase();  
	let isMobile = ua.match(/(iphone|ipod|ipad|android)/) ? true : false;

	let navList = [];

	let baseData = { title: '葡萄酒-列表', pageName: 'prodList', 'isMobile': isMobile, 'navList': navList};

	let reqCountry = req.query.country,
		reqType = req.query.type,
		reqPage = req.query.page;

	Home.findById('59f72895ca8e128c96492698')
	.select({'products': 1, '_id': 0})
	.exec(function(err, prodList){
		if(err) return handleError(err);
		let dbData = prodList._doc;
		let data = Object.assign({}, baseData, dbData);
		data.country = [];
		data.type = [];
		
		data.country = data.products.map(function(v, i){
			return v.country
		});
		data.type = data.products.map(function(v, i){
			return v.types
		});
		data.country = Array.from(new Set(data.country));
		data.type = Array.from(new Set(data.type));
		data.params = {
			country: reqCountry || '',
			type: reqType || '',
			page: reqPage || ''
		};
		data.products = data.products.filter(function(v, i){
			if(data.params.country === '' && data.params.type !== ''){
				return v.types === reqType;
			} else if(data.params.type === '' && data.params.country !== ''){
				return v.country === reqCountry;
			} else if(data.params.type !== '' && data.params.country !== ''){
				return v.country === reqCountry && v.types === reqType;
			}  else{
				return v;
			}
		});
		data.products.sort(function(a, b){
			return b.date - a.date
		});
		res.render('prodlist', data);
	});

});

module.exports = router;
