console.log('load e.js');
require(['http://example.com/api/data.json?callback=define'],function(data){
	console.log('e.js:',data);
});