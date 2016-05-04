var express = require('express');
var demo = express();

demo.get('/', function (req, res) {
  res.send('Hello World!');
});

var server = demo.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
});