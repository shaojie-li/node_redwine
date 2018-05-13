let express = require('express');
let router = express.Router();
let MongoDB = require('../mongodb');
let Home = new require('../models/home');
let config = new require('../config');

/* GET proddtail page. */
router.get('/:id', function(req, res, next) {
	let ua = req.headers['user-agent'].toLowerCase();  
	let isMobile = ua.match(/(iphone|ipod|ipad|android)/) ? true : false;
		
	let navList = ['首页', '葡萄酒', '精彩活动'];

	Home.find({}, function(err, home){
		let baseData = { 
			title: '葡萄酒-详情', 
			pageName: 'proddetail', 
			'isMobile': isMobile, 
			'navList': navList
		}, dataArr = [], dbData = home[0]._doc.productsClassic;

		baseData.proddtailData = null;

		dataArr = dbData['美国'].concat(dbData['法国'], dbData['意大利'], dbData['其他']);

		for (let i = 0;i < dataArr.length;i++) {
			if(dataArr[i]._id == req.params.id) {
				baseData.proddtailData = dataArr[i];
				baseData.title = dataArr[i].name + '-' + dataArr[i].types;
			}
		};

		res.render('proddetail', baseData);
		// res.json(baseData);

	});

});

module.exports = router;