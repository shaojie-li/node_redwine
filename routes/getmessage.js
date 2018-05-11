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
	.select({'message': 1})
	.exec(function(err, msg){
        if(err) return handleError(err);
        msg.message.sort(function(a, b){
			return b.date- a.date;
		})
		res.json(msg.message);
	});
	

});


module.exports = router;