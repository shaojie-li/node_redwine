let express = require('express');
let router = express.Router();
let MongoDB = require('../mongodb');
let Home = new require('../models/home');

/* GET activeList page. */
router.get('/', function(req, res, next) {
	let ua = req.headers['user-agent'].toLowerCase();  
	let isMobile = ua.match(/(iphone|ipod|ipad|android)/) ? true : false;

	let navList = [];

	let baseData = { title: '活动列表页', pageName: 'active', 'isMobile': isMobile, 'navList': navList};

	Home.findById('59f72895ca8e128c96492698')
	.select({'actives': 1})
	.exec(function(err, activeList){
		if(err) return handleError(err);
		let dbData = activeList._doc;
		let data = Object.assign({}, baseData, dbData);

		res.render('active', data);
	});
  
});

module.exports = router;
