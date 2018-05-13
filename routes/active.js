let express = require('express');
let router = express.Router();
let MongoDB = require('../mongodb');
let Home = new require('../models/home');

/* GET activeList page. */
router.get('/', function(req, res, next) {
	let ua = req.headers['user-agent'].toLowerCase();  
	let isMobile = ua.match(/(iphone|ipod|ipad|android)/) ? true : false;

	let navList = ['首页', '葡萄酒', '精彩活动'];

	let baseData = { title: '活动列表页', pageName: 'active', 'isMobile': isMobile, 'navList': navList};

	Home.findById('59f72895ca8e128c96492698')
	.select({'actives': 1})
	.exec(function(err, activeList){
		if(err) return handleError(err);
		let dbData = activeList._doc;
		dbData.actives.sort(function(a, b){
			return b.date- a.date;
		})
		let data = Object.assign({}, baseData, dbData);

		res.render('active', data);
	});
  
});

router.get('/:id', function(req, res, next) {
	let ua = req.headers['user-agent'].toLowerCase();  
	let isMobile = ua.match(/(iphone|ipod|ipad|android)/) ? true : false;

	let navList = ['首页'];

	let baseData = { title: '活动详情', pageName: 'active', 'isMobile': isMobile, 'navList': navList};

	Home.findById('59f72895ca8e128c96492698')
	.select({'actives': 1})
	.exec(function(err, activeList){
		if(err) return handleError(err);
		let dbData = activeList._doc;
		let localData = [];
		baseData.activeDetail = null;
		localData = dbData.actives.filter(function(v, i){
			return v._id == req.params.id;
		});
		baseData.activeDetail = localData[0];
		baseData.title = localData[0].titleSecond;
		let data = Object.assign({}, baseData);

		res.render('activedetail',data);
	});
});


module.exports = router;
