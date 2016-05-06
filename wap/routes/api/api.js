var express = require('express');
var request= require('request');
var router = express.Router();



//user  req.params.id == 用户ID
router.get('/', function(req, res, next) {
  	res.json({ user: 'tobi' ,title: 'appname'});
});

//模拟正式数据请求
router.get('/ins', function(req, res, next) {
	/*正式数据*/
	request('http://test.webapp.baai.com/hk/index.json',function(error,response,body){
	/*判断请求是否成功*/
		if (!error && response.statusCode == 200) {
			/*把字符串转换为json*/
			var data=JSON.parse(body); 
			/*渲染模板*/
			res.json(data);
			res.end();
		}
	});
});

//user  req.params.id == 用户ID
router.all('*', function(req, res, next) {
  	res.status(404).json({ error: '404' });
	res.status(500).json({ error: '500' });
});

module.exports = router;