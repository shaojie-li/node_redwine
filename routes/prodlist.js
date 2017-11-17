var express = require('express');
var router = express.Router();
var Home = new require('../models/home');

/* GET prodList page. */
router.get('/', function(req, res, next) {
	var ua = req.headers['user-agent'].toLowerCase();  
	var isMobile = ua.match(/(iphone|ipod|ipad|android)/) ? true : false;

	var navList = [];

	var baseData = { title: '葡萄酒列表页', pageName: 'prodList', 'isMobile': isMobile, 'navList': navList};

	
  	res.send('prodlist');
});

module.exports = router;
