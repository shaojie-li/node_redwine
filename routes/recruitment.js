var express = require('express');
var router = express.Router();

/* GET prodList page. */
router.get('/', function(req, res, next) {
	var ua = req.headers['user-agent'].toLowerCase();  
	var isMobile = ua.match(/(iphone|ipod|ipad|android)/) ? true : false;

	var navList = ['首页', '葡萄酒', '精彩活动'];

	var baseData = { title: '招聘详情页', pageName: 'recruitment', 'isMobile': isMobile, 'navList': navList};
  
  res.render('recruitment', baseData);
  
});

module.exports = router;
