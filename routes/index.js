var express = require('express');
var router = express.Router();
var MongoDB = require('../mongodb');
var Home = new require('../models/home');
var config = new require('../config');
if(config.NODE_ENV === 'production'){
	console.log('production')
} else{
	console.log('development')
}

/* GET home page. */
router.get('/', function(req, res, next) {
	
	var ua = req.headers['user-agent'].toLowerCase();  
	var isMobile = ua.match(/(iphone|ipod|ipad|android)/) ? true : false;
		
	var navList = ['首页', '关于我们', '葡萄酒', '精彩活动', '联系我们'];

	/* 美国、法国、意大利、其他 */
	Home.find({}, function(err, home){
		var baseData = { 
			title: '首页', 
			pageName: 'home', 
			'isMobile': isMobile, 
			'navList': navList
		}, dbData = home[0]._doc;
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

		var homeData = Object.assign({}, baseData, dbData);

		// res.json(homeData);
	  	res.render('index', homeData);

	});

});

module.exports = router;