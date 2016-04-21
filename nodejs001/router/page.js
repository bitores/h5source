exports.router = function(app){
	app.get('/',function(req, res){
		res.sendfile('./views/index.html');
	});

	app.get('/ejstpl',function(req, res){
		res.render('index.ejs',{title:'使用EJS模板进行渲染'});
	});

	app.get('/jade',function(req, res){
		res.render('index.jade',{title:'使用JADE模板进行渲染'});
	});
}