(function(namespace,$){
var wxInit = function(){
	this.appId = ''; // 必填，公众号的唯一标识
    this.timestamp = ''; // 必填，生成签名的时间戳
    this.nonceStr = ''; // 必填，生成签名的随机串
    this.signature = '';// 必填，签名，见附录1
    
    this.title = "";
    this.link = "";
    this.desc = "";
    this.imgUrl = "";
}
wxInit.prototype = {
	init: function(appId,timestamp,nonceStr,signature,debug){
		this.appId = appId;
		this.timestamp = timestamp;
		this.nonceStr = nonceStr;
		this.signature = signature;
		var scope = this;
		wx.config({
		    debug: debug, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
		    appId: scope.appId, // 必填，公众号的唯一标识
		    timestamp: scope.timestamp, // 必填，生成签名的时间戳
		    nonceStr: scope.nonceStr, // 必填，生成签名的随机串
		    signature: scope.signature,// 必填，签名，见附录1
		    jsApiList: ['onMenuShareTimeline','onMenuShareAppMessage','onMenuShareQQ','onMenuShareWeibo','onMenuShareQZone'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
		});
	},
	config: function(obj){
		this.title = obj.title;
		this.desc = obj.desc;
		this.link = obj.link;
		this.imgUrl = obj.imgUrl;
	}
}
var wxObj = new wxInit();
wx.ready(function(){

    // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
    wx.onMenuShareTimeline({
	    title: wxObj.desc, // 分享标题
	    link: wxObj.link, // 分享链接
	    imgUrl: wxObj.imgUrl, // 分享图标
	    success: function () { 
	        // 用户确认分享后执行的回调函数
	    },
	    cancel: function () { 
	        // 用户取消分享后执行的回调函数
	    }
	});
	
	wx.onMenuShareAppMessage({
	    title: wxObj.title, // 分享标题
	    link: wxObj.link, // 分享链接
	    imgUrl: wxObj.imgUrl, // 分享图标
	    desc:wxObj.desc,
	    success: function () { 
	        // 用户确认分享后执行的回调函数
	    },
	    cancel: function () { 
	        // 用户取消分享后执行的回调函数
	    }
	});
	wx.onMenuShareQQ({
	    title: wxObj.title, // 分享标题
	    link: wxObj.link, // 分享链接
	    imgUrl: wxObj.imgUrl, // 分享图标
	    desc:wxObj.desc,
	    success: function () { 
	       // 用户确认分享后执行的回调函数
	    },
	    cancel: function () { 
	       // 用户取消分享后执行的回调函数
	    }
	});
	wx.onMenuShareWeibo({
	    title: wxObj.title, // 分享标题
	    link: wxObj.link, // 分享链接
	    imgUrl: wxObj.imgUrl, // 分享图标
	    desc:wxObj.desc,
	    success: function () { 
	       // 用户确认分享后执行的回调函数
	    },
	    cancel: function () { 
	        // 用户取消分享后执行的回调函数
	    }
	});
	wx.onMenuShareQZone({
	    title: wxObj.title, // 分享标题
	    link: wxObj.link, // 分享链接
	    imgUrl: wxObj.imgUrl, // 分享图标
	    desc:wxObj.desc,
	    success: function () { 
	       // 用户确认分享后执行的回调函数
	    },
	    cancel: function () { 
	        // 用户取消分享后执行的回调函数
	    }
	});
});
wx.error(function(res){

    // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
	
});
namespace.wxObj = wxObj;
})(window,window.Zepto||window.jQuery)
