let express = require('express');
let router = express.Router();
let MongoDB = require('../mongodb');
let Home = new require('../models/home');
let config = new require('../config');

/* GET home page. */
router.get('/', function(req, res, next) {
	let ua = req.headers['user-agent'].toLowerCase();  
	let isMobile = ua.match(/(iphone|ipod|ipad|android)/) ? true : false;
		
	let navList = ['首页', '关于我们', '葡萄酒', '精彩活动', '联系我们'];

	/* 美国、法国、意大利、其他 */
	Home.find({}, function(err, home){
		let baseData = { 
			title: '首页', 
			pageName: 'home', 
			'isMobile': isMobile, 
			'navList': navList
		}, dbData = home[0]._doc;
		dbData.products.sort(function(a, b){
			return b.date - a.date
		});
		dbData.actives.sort(function(a, b){
			return b.date - a.date
		});
		Object.keys(dbData.productsClassic).map(function(v, i) {

			if(!dbData.productsClassic[v].length){
				
				delete dbData.productsClassic[v];
			
			} else{

				// 每个国家最多只显示4个产品
				dbData.productsClassic[v] = dbData.productsClassic[v].slice(0, 4);

			}

		});

		// 最多只显示6个活动
		dbData.actives = dbData.actives.slice(0, 6);

		let homeData = Object.assign({}, baseData, dbData);

		// res.json(homeData);
	  	res.render('index', homeData);

	});

});

module.exports = router;