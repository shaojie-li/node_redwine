var express = require('express');
var router = express.Router();
var Home = new require('../models/home');

router.all('*', function(req, res, next) {  
  res.header("Access-Control-Allow-Origin", "*");  
  res.header("Access-Control-Allow-Headers", "X-Requested-With,Content-Type");  
  res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS"); 
  next();  
});

router.get('/', function(req, res, next) {

	Home.findById('59f72895ca8e128c96492698')
	.select({'actives': 1})
	.exec(function(err, home){
		if(err) return handleError(err);
		res.json(home.actives);
	});
	

});


module.exports = router;