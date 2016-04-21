var express = require('express')
  router = express.Router(),	
  formidable = require('formidable'),
    fs = require('fs'),
    TITLE = 'formidable上传示例',
  AVATAR_UPLOAD_FOLDER = '/avatar/'

exports.router = function(app,eventEmitter, events){
	app.post('/upload', function(req, res){
		var form = new formidable.IncomingForm();   //创建上传表单
	    form.encoding = 'utf-8';		//设置编辑
	    form.uploadDir = 'public' + AVATAR_UPLOAD_FOLDER;	 //设置上传目录
	    form.keepExtensions = true;	 //保留后缀
	    form.maxFieldsSize = 2 * 1024 * 1024;   //文件大小

	  form.parse(req, function(err, fields, files) {

	    if (err) {
	      res.locals.error = err;
	      res.render('index', { title: TITLE });
	      return;		
	    }  
	     
	    var extName = '';  //后缀名
	    switch (files.fulAvatar.type) {
	      case 'image/pjpeg':
	        extName = 'jpg';
	        break;
	      case 'image/jpeg':
	        extName = 'jpg';
	        break;		 
	      case 'image/png':
	        extName = 'png';
	        break;
	      case 'image/x-png':
	        extName = 'png';
	        break;		 
	    }

	    if(extName.length == 0){
	        res.locals.error = '只支持png和jpg格式图片';
	        res.render('index', { title: TITLE });
	        return;				   
	    }

	    var avatarName = Math.random() + '.' + extName;
	    var newPath = form.uploadDir + avatarName;

	    console.log(newPath);
	    fs.renameSync(files.fulAvatar.path, newPath);  //重命名
	  });

	  res.locals.success = '上传成功';
	  res.send('上传成功');
	});
	app.post('/api',function(req, res){
		// res.set({'Content-Type':'text/json','Encodeing':'utf8'}); 
		res.send({code:0,msg:"你的请求已返回",data:[]});
	});

	// express 支持的 restful 的请求
	app.post('/api/:api',function(req, res){
		// res.set({'Content-Type':'text/json','Encodeing':'utf8'}); 
		console.log();
    	res.send(req.params['api'])
	});

	app.post('/api/:api1/:api2',function(req, res){

		eventEmitter.emit('xxxx',23,"a");
		// res.set({'Content-Type':'text/json','Encodeing':'utf8'});  
    	res.send(req.params['api1']+" : "+req.params['api2'])
	});
}