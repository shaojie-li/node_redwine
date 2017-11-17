var express = require('express');
var router = express.Router();
var MongoDB = require('../mongodb');
var Home = new require('../models/home');

/* GET activeList page. */
router.get('/', function(req, res, next) {
	var ua = req.headers['user-agent'].toLowerCase();  
	var isMobile = ua.match(/(iphone|ipod|ipad|android)/) ? true : false;

	var navList = [];

	var baseData = { title: '活动列表页', pageName: 'active', 'isMobile': isMobile, 'navList': navList};

	Home.findById('59f72895ca8e128c96492698')
	.select({'actives': 1})
	.exec(function(err, activeList){
		if(err) return handleError(err);
		var dbData = activeList._doc;
		var data = Object.assign({}, baseData, dbData);

		res.render('active', data);
	});
  
});

module.exports = router;
