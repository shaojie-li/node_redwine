let express = require('express');
let router = express.Router();
let http = require('http');
let fileUrl = 'http://localhost:3001/postfile/'

router.all('*', function(req, res, next) {  
  res.header("Access-Control-Allow-Origin", "*");  
  res.header("Access-Control-Allow-Headers", "X-Requested-With,Content-Type");  
  res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS"); 
  res.header("Content-Type","multipart/form-data");   
  next();  
});
	
/* 添加产品 */
router.post('/', function(req, res, next) {

	let loadData = Object.assign({}, req.body);

	res.send('success');

});

module.exports = router;