var express = require('express');
var path = require('path');
var fs = require('fs');
var url = require('url');
var app = express();

app.set('port', process.env.PORT || 3000);
app.set('views','./views');
app.set('view engine','jade');
app.engine('jade',require('jade').__express);
app.engine('ejs',require('ejs').__express);

var mime = require("./server/mime").types;
app.use(function(req, res, next){
	// var host1 = getClientIp(req);
	// console.log('getClientIp:',host1);
	console.log('过滤器一');
	var pathname=__dirname+url.parse(req.url).pathname;
	var ext = path.extname(pathname);
	ext = ext ? ext.slice() : 'unknown';

	var contentType = mime[ext] || "text/plain";
		res.writeHead(200, {"Content-Type": contentType});

	next();
});

app.use(function(req, res, next){

	console.log('过滤器二');
	next();
})

app.use(function(req, res, next){

	console.log('过滤器三');
	next();
})



//  http://blog.fens.me/nodejs-log4js/
var log4js = require('log4js');
log4js.configure({
	appenders: [
		{type: 'console'},//控制台输出
		{
			type: 'file', // 文件输出
			filename: 'logs/access.log',
			maxLogSize: 1024,
			backups: 3,
			category: 'normal'
		}
	]
});
var logger = log4js.getLogger('normal');
logger.setLevel('INFO');

app.use(log4js.connectLogger(logger, {level:log4js.levels.INFO}));

var events = require('events');
var eventEmitter = new events.EventEmitter();
var e = require('./event/listener');
e.start(eventEmitter,events);


var server = require('./server/server');
server.start(app);


var page = require('./router/page');
var api = require('./router/api');
page.router(app);
api.router(app, eventEmitter);
logger.info('测试日志信息');


