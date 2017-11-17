let express = require('express');
let router = express.Router();

/* GET prodList page. */
router.get('/', function(req, res, next) {
	let ua = req.headers['user-agent'].toLowerCase();  
	let isMobile = ua.match(/(iphone|ipod|ipad|android)/) ? true : false;

	let navList = ['首页', '葡萄酒', '精彩活动'];

	let baseData = { title: '招聘详情页', pageName: 'recruitment', 'isMobile': isMobile, 'navList': navList};
  
  res.render('recruitment', baseData);
  
});

module.exports = router;
