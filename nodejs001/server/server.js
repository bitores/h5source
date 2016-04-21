

function getClientIp(req) {
    return req.headers['x-forwarded-for'] ||
    req.connection.remoteAddress ||
    req.socket.remoteAddress ||
    req.connection.socket.remoteAddress;
};

function getIPAdress(){  
    var interfaces = require('os').networkInterfaces();  
    for(var devName in interfaces){  
          var iface = interfaces[devName];  
          for(var i=0;i<iface.length;i++){  
               var alias = iface[i];  
               if(alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal){  
                     return alias.address;  
               }  
          }  
    }  
}

function start(app) {
  // 过滤器
  
	var serverp = app.listen(app.get('port'), function(){
		// var host = serverp.address().address;
		var host2 = getIPAdress();
		var port = serverp.address().port;

		// console.log('App listening at http://%s:%s',host1, port);
		console.log('App listening at http://%s:%s',host2, port);

	});
}

exports.start = start;
