let express = require('express');
let router = express.Router();
let multer = require('multer');

let storage = multer.diskStorage({
 	//设置上传后文件路径备，需要自己创建。
  destination: function (req, file, cb) {
    cb(null, './public/uploadfile/' + file.fieldname)
 	}, 
 	//给上传文件重命名，获取添加后缀名
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
 });  

let upload = multer({ storage: storage });

router.all('*', function(req, res, next) {  
  res.header("Access-Control-Allow-Origin", "*");  
  res.header("Access-Control-Allow-Headers", "X-Requested-With,Content-Type");  
  res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS"); 
  res.header("Content-Type","multipart/form-data");   
  next();  
});
	
/* 处理文件上传 */
router.post('/', upload.fields([{name: 'simage'}, {name: 'bimage'}, {name: 'limage'}, {name: 'bannerImage'}, {name: 'avtiveSimage'}, {name: 'avtiveBimage'}]), function(req, res, next) {
	
	res.send('success');
	
});

module.exports = router;