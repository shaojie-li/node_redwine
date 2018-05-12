let express = require('express');
let router = express.Router();
let MongoDB = require('../mongodb');
let Home = new require('../models/home');

/* GET recruitment page. */
router.get('/:id', function(req, res, next) {
	let ua = req.headers['user-agent'].toLowerCase();  
	let isMobile = ua.match(/(iphone|ipod|ipad|android)/) ? true : false;

	let navList = ['首页', '葡萄酒', '精彩活动'];

	Home.find({}, function(err, home){
		let baseData = { 
			title: '招聘详情', 
			pageName: 'recruitment', 
			'isMobile': isMobile, 
			'navList': navList
		}, dbData = home[0]._doc.recruitment, data = {};

		baseData.recruitment = null;

		for (let i = 0;i < dbData.length;i++) {
			if(dbData[i]._id == req.params.id) {
				baseData.recruitment = dbData[i];
				baseData.recruitment.zhize = baseData.recruitment.zhize.replace("\n", "<br />");
				baseData.recruitment.zige = baseData.recruitment.zige.replace("\n", "<br />");
			}
		};

		res.render('recruitment', baseData);

	});
  
});

module.exports = router;
