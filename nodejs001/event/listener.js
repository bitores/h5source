exports.start = function( eventEmitter, events ) {
	// 事件监听
	eventEmitter.on('xxxx',function(){
		console.log('xxxx change',arguments.length);
		for (var i = arguments.length - 1; i >= 0; i--) {
			console.log("\nArgv:",arguments[i]);
		};
	});

	// 事件监听
	eventEmitter.once('once',function(){
		console.log('once change',arguments.length);
		for (var i = arguments.length - 1; i >= 0; i--) {
			console.log("\nArgv:",arguments[i]);
		};
	});

	console.log(events.EventEmitter.listenerCount(eventEmitter,'xxxx')+"个监听事件");
}

