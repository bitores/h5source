(function(namespace, $) {
	var Toast = function(context) {
		this.context = !!context ? context : document.body;
		this.toastTimer = null;
		this.displayTimer = null;
		this.init(0)
	};
	Toast.prototype = {
		constructor: Toast,
		BOTTOM: 1,
		CENTER: 2,
		init: function(POS) {
			switch (POS) {
				case this.BOTTOM:
					this.context.insertAdjacentHTML("beforeEnd", '<div id="toastMessage" style="z-index:1003;font-size: 1em;position: fixed;bottom:25%;width: 100%;opacity:0;text-align: center;display: none;transition: opacity 1s ease-out;display: none; opacity: 0;"><span id="toastMsg" style="display:inline-block;max-width:80%;word-wrap:break-word;white-space:pre-wrap;color:#fff;background: rgba(0, 0, 0, 0.6);border-radius: 2px;padding: 0.2rem 0.3rem;text-align: center;margin: 0 auto;"></span></div>');
					break;
				case this.CENTER:
					this.context.insertAdjacentHTML("beforeEnd", '<div id="toastMessage" style="z-index:1003;font-size: 1em;position:fixed;left:0;top:50%;margin-left:0;width: 100%;opacity:0;text-align: center;display: none;display: none; opacity: 0;"><span id="toastMsg" style="display:inline-block;max-width:80%;word-wrap:break-word;white-space:pre-wrap;color:#fff;background: rgba(0, 0, 0, 0.6);border-radius: 2px;padding: 0.2rem 0.3rem;;text-align: center;margin: 0 auto;"></span></div>');
					break;
				default:
					this.context.insertAdjacentHTML("beforeEnd", '<div id="toastMessage" style="z-index:1003;font-size: 1em;position: fixed;bottom:25%;width: 100%;opacity:0;text-align: center;display: none;transition: opacity 1s ease-out;display: none; opacity: 0;"><span id="toastMsg" style="display:inline-block;max-width:80%;word-wrap:break-word;white-space:pre-wrap;color:#fff;background: rgba(0, 0, 0, 0.6);border-radius: 2px;padding: 0.2rem 0.3rem;;text-align: center;margin: 0 auto;"></span></div>')
			}
		},
		selector: function(s) {
			return document.getElementById(s)
		},
		insertMsg: function(s, html) {
			this.selector(s).innerHTML = html
		},
		makeText: function(msg, interval) {
			var scope = this;
			interval = !!interval ? parseInt(interval) : 1000;
			if (this.toastTimer != null) {
				clearTimeout(this.toastTimer);
				clearTimeout(this.displayTimer)
			}
			scope.selector("toastMessage").style.opacity = 1;
			scope.insertMsg("toastMsg", msg);
			scope.selector("toastMessage").style.display = "block";
			scope.toastTimer = setTimeout(function() {
				scope.selector("toastMessage").style.opacity = 0;
				scope.displayTimer = setTimeout(function() {
					scope.selector("toastMessage").style.display = "none"
				}, 1000)
			}, interval)
		},
		show: function(msg, interval) {
			this.makeText(msg, interval)
		}
	};
	namespace.Toast = Toast;
	var log = new Toast();
	namespace.Log = log;
	var volid_ret = true;
	var ignorHidden = true;
	var InRule = {
		w: {
			tit: "提示信息",
			nul: "不能为空 ",
			err: "请填写正确信息！",
			undef: "datatype未定义！",
			reck: "两次输入的内容不一致！",
			r: "通过信息验证！",
			c: "正在检测信息…",
			s: "请{填写|选择}{0|信息}！",
			v: "所填信息没有经过验证，请稍后…",
			p: "正在提交数据…",
			"*": "不能为空！",
			"*6-20": "请填写6到20位任意字符！",
			"n": "请填写数字！",
			"n6-20": "请填写6到20位数字！",
			"s": "不能输入特殊字符！",
			"s6-18": "请填写6到18位字符！",
			"post": "邮政编码格式不对！",
			"name": "姓名格式不对！",
			"mobile": "请输入有效的11位手机号码！",
			"email": "邮箱地址格式不对！",
			"card": "身份证号码格式不对！",
			"url": "请填写网址！"
		},
		reg: {
			"match": /^(.+?)(\d+)-(\d+)$/,
			"*": /[\w\W]+/,
			"*6-20": /^[\w\W]{6,20}$/,
			"n": /^\d+$/,
			"n6-20": /^\d{6,20}$/,
			"s": /^[\u4E00-\u9FA5\uf900-\ufa2d\w\.\s]+$/,
			"s6-18": /^[\u4E00-\u9FA5\uf900-\ufa2d\w\.\s]{6,18}$/,
			"post": /^[0-9]{6}$/,
			"name": /^[\w\W]{2,20}$/,
			"mobile": /^13[0-9]{9}$|14[0-9]{9}|15[0-9]{9}$|18[0-9]{9}$/,
			"email": /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
			"card": /^\d{15}|\d{18}$/,
			"url": /^(\w+:\/\/)?\w+(\.\w+)+.*$/,
			"button": ""
		}
	};
	var addRule = function(flag, reg, tip) {
		InRule["reg"][flag] = reg;
		InRule["w"][flag] = tip
	};
	var $Input = (function(ignore) {
		if (ignore) {
			return $("input").not("[type=hidden],[type=button]")
		} else {
			return $("input").not("[type=button]")
		}
	})(ignorHidden);
	var $Select = $("select");
	namespace.getvolid = function() {
		for (var i = 0, len = $Input.length; i < len; i++) {
			var $this = $($Input[i]);
			if ($this.attr("volid") == "false") {
				$this.blur();
				return false
			}
		}
		return true
	};
	$Input.each(function() {
		$(this).attr("volid", "false")
	});
	$Input.on("blur", function(number, ele) {
		var $type = this.getAttribute("datatype"),
			$tipmsg = this.getAttribute("tipmsg"),
			$nullmsg = this.getAttribute("nullmsg"),
			$errormsg = this.getAttribute("errormsg"),
			$recheck = this.getAttribute("recheck");
		if (!$type) {
			$tipmsg = InRule["w"]["undef"];
			////console.log($tipmsg, ele);
			return
		} else {
			if (!$tipmsg) {
				$tipmsg = InRule["w"][$type]
			}
			if (!$nullmsg) {
				$nullmsg = InRule["w"]["nul"]
			}
			if (!$errormsg) {
				$errormsg = InRule["w"]["err"]
			}
			if (!$recheck) {
				$recheck = InRule["w"]["reck"]
			}
			var val = $(this).val();
			var reg = InRule["reg"][$type];
			if (val != "") {
				if (reg) {
					if (reg.test(val)) {
						$(this).css({
							"border-color": ""
						});
						$(this).attr("volid", "true")
					} else {
						$(this).css({
							"border-color": "rgb(255,78,0)"
						});
						$(this).attr("volid", "false");
						msgbox($tipmsg)
					}
				} else {
					//console.log($type, reg, "no reg")
				}
			} else {
				$(this).css({
					"border-color": "rgb(255,78,0)"
				});
				$(this).attr("volid", "false");
				msgbox($nullmsg)
			}
		}
	});
	$Select.on("change", function() {
		//console.log($(this).val())
	});
	var spliteNum = function(strNum) {
		if (strNum.length <= 3) {
			return strNum
		}
		if (!/^(\+|-)?(\d+)(\.\d+)?$/.test(strNum)) {
			return strNum
		}
		var a = RegExp.$1,
			b = RegExp.$2,
			c = RegExp.$3;
		var re = new RegExp();
		re.compile("(\\d)(\\d{3})(,|$)");
		while (re.test(b)) {
			b = b.replace(re, "$1,$2$3")
		}
		return a + "" + b + "" + c
	};
	namespace.spliteNum = spliteNum;

	function accAdd(arg1, arg2) {
		var r1, r2, m, c;
		try {
			r1 = arg1.toString().split(".")[1].length
		} catch (e) {
			r1 = 0
		}
		try {
			r2 = arg2.toString().split(".")[1].length
		} catch (e) {
			r2 = 0
		}
		c = Math.abs(r1 - r2);
		m = Math.pow(10, Math.max(r1, r2));
		if (c > 0) {
			var cm = Math.pow(10, c);
			if (r1 > r2) {
				arg1 = Number(arg1.toString().replace(".", ""));
				arg2 = Number(arg2.toString().replace(".", "")) * cm
			} else {
				arg1 = Number(arg1.toString().replace(".", "")) * cm;
				arg2 = Number(arg2.toString().replace(".", ""))
			}
		} else {
			arg1 = Number(arg1.toString().replace(".", ""));
			arg2 = Number(arg2.toString().replace(".", ""))
		}
		return (arg1 + arg2) / m
	}
	Number.prototype.add = function(arg) {
		return accAdd(this, arg)
	};
	namespace.accAdd = accAdd;

	function accSub(arg1, arg2) {
		var r1, r2, m, n;
		try {
			r1 = arg1.toString().split(".")[1].length
		} catch (e) {
			r1 = 0
		}
		try {
			r2 = arg2.toString().split(".")[1].length
		} catch (e) {
			r2 = 0
		}
		m = Math.pow(10, Math.max(r1, r2));
		n = (r1 >= r2) ? r1 : r2;
		return ((arg1 * m - arg2 * m) / m).toFixed(n)
	}
	Number.prototype.sub = function(arg) {
		return accSub(this, arg)
	};
	namespace.accSub = accSub;

	function accMul(arg1, arg2) {
		var m = 0,
			s1 = arg1.toString(),
			s2 = arg2.toString();
		try {
			m += s1.split(".")[1].length
		} catch (e) {}
		try {
			m += s2.split(".")[1].length
		} catch (e) {}
		return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m)
	}
	Number.prototype.mul = function(arg) {
		return accMul(this, arg)
	};
	namespace.accMul = accMul;

	function accDiv(arg1, arg2) {
		var t1 = 0,
			t2 = 0,
			r1, r2;
		try {
			t1 = arg1.toString().split(".")[1].length
		} catch (e) {}
		try {
			t2 = arg2.toString().split(".")[1].length
		} catch (e) {}
		with(Math) {
			r1 = Number(arg1.toString().replace(".", ""));
			r2 = Number(arg2.toString().replace(".", ""));
			return (r1 / r2) * pow(10, t2 - t1)
		}
	}
	Number.prototype.div = function(arg) {
		return accDiv(this, arg)
	};
	namespace.accDiv = accDiv;
	Date.prototype.Format = function(fmt) {
		var o = {
			"M+": this.getMonth() + 1,
			"d+": this.getDate(),
			"h+": this.getHours(),
			"m+": this.getMinutes(),
			"s+": this.getSeconds(),
			"q+": Math.floor((this.getMonth() + 3) / 3),
			"S": this.getMilliseconds()
		};
		if (/(y+)/.test(fmt)) {
			fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length))
		}
		for (var k in o) {
			if (new RegExp("(" + k + ")").test(fmt)) {
				fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)))
			}
		}
		return fmt
	};
	LS = {
		isNotPrivateMode: true,
		check: function() {
			var scope = this;
			var testPrivateModeKey = "testPrivateModeKey",
				storage = window.localStorage;
			try {
				storage.setItem(testPrivateModeKey, "No");
				storage.removeItem(testPrivateModeKey)
			} catch (error) {
				scope.isNotPrivateMode = false;
				if (error.code === DOMException.QUOTA_EXCEEDED_ERR && storage.length === 0) {
					msgbox('你的浏览器开启了"无痕浏览"模式，请先关闭"无痕浏览"再使用。', 5000)
				} else {
					throw error
				}
			}
		},
		setItem: function(key, value) {
			if (this.isNotPrivateMode) {
				if (this.getItem(key) !== undefined) {
					this.removeItem(key)
				}
				localStorage.setItem(key, value)
			}
		},
		getItem: function(key) {
			if (this.isNotPrivateMode) {
				var v = localStorage.getItem(key);
				return v === null ? undefined : v
			}
			return null
		},
		removeItem: function(key) {
			if (this.isNotPrivateMode) {
				localStorage.removeItem(key)
			}
		},
		clear: function() {
			if (this.isNotPrivateMode) {
				localStorage.clear()
			}
		},
		each: function(callback) {
			var list = this.obj(),
				fn = callback || function() {},
				key;
			for (key in list) {
				if (fn.call(this, key, this.getItem(key)) === false) {
					break
				}
			}
		},
		obj: function() {
			var list = {},
				i = 0,
				n, key;
			if (localStorage.isVirtualObject) {
				list = localStorage.key(-1)
			} else {
				n = localStorage.length;
				for (; i < n; i++) {
					key = localStorage.key(i);
					list[key] = this.getItem(key)
				}
			}
			return list
		}
	};
	LS.check();
	namespace.LS = LS;
	var getQueryString = function(key) {
		var reg = new RegExp("(^|&)"+key+"=([^&]*)(&|$)");
        var result = window.location.search.substr(1).match(reg);
        return result?decodeURIComponent(result[2]):null;
	};
	namespace.getQueryString = getQueryString;
	var thumb = function(url, format) {
		var i = url.lastIndexOf(".");
		return i >= 0 ? (url.substr(0, i) + (format == undefined ? "_thumb" : ("." + format)) + url.substr(i)) : url
	};
	namespace.thumb = thumb;
	var ua = navigator.userAgent.toLowerCase();
	var enableScroll = function(selector) {
		if (/iphone|ipad|ipod/.test(ua)) {
			$(selector).css({
				"overflow-x": "hidden",
				"overflow-y": "auto",
				"height": "100%",
				"-webkit-overflow-scrolling": "auto",
				"-webkit-transform": "translate3d(0,0,0)"
			})
		} else {
			if (/android/.test(ua)) {}
		}
	};
	namespace.enableScroll = enableScroll;
	try {
		if (!!localStorage.kqc == false) {
			localStorage.kqc = {}
		}
		localStorage.kqc.test = localStorage.kqc
	} catch (e) {
		Log.show("您的浏览器默认开启了无痕浏览模式，请在  Settings → Safari → Privacy → Private Browsing → off")
	}

	function replaceSubString(str, n) {
		var sub = "";
		try {
			sub = str.substring(0, n - 1);
			for (var i = n - 1, len = str.length; i < len; i++) {
				sub += "*"
			}
		} catch (e) {}
		return sub
	}

	function $http_post($http, $param) {
		$param.sess_id = localStorage.kqc_sess_id;
		$param["terminal"] = 1;
		return $http.post(gateway, $param).success(function(res) {
			if(9==res.code) {
				localStorage.kqc_backurl = location.href;
				location.href = $user_login;
			} else {
				if(!!res.sess_id){
					localStorage.kqc_sess_id = res.sess_id;
				}else{
					Log.show("服务器正忙");
				}
			}
		}).error(function(xhr, textStatus, errorThrown) {
			Log.show("服务器异常繁忙！")
		})
	}
	namespace.$http_post = $http_post;

	function encontentedit(sellector) {
		$(sellector).attr("contenteditable", "true");
		$(sellector).css({
			"white-space": "nowrap"
		});
		$(sellector + ":empty:before").css({
			"content": "attr(placeholder)",
			"color": "#bbb"
		});
		$(sellector + ":focus:before").css({
			"content": "none"
		});
		$(sellector).on("keydown", function() {
			var theEvent = window.event || e;
			var code = theEvent.keyCode || theEvent.which;
			////console.log(code);
			if (code == 13) {
				return false
			}
			if ($(this).html().length >= $(this).attr("maxlength") && code !== 8) {
				return false
			}
		})
	}
	namespace.encontentedit = encontentedit;

    //格式化参数
    function formatParams(data) {
        var arr = [];
        for (var name in data) {
            arr.push(encodeURIComponent(name) + "=" + encodeURIComponent(data[name]));
        }
        arr.push(("v=" + Math.random()).replace(".",""));
        return arr.join("&");
    }
    
        function ajax(options) {
        options = options || {};
        options.type = (options.type || "GET").toUpperCase();
        options.dataType = options.dataType || "json";
        var params = formatParams(options.data);

        //创建 - 非IE6 - 第一步
        if (window.XMLHttpRequest) {
            var xhr = new XMLHttpRequest();
        } else { //IE6及其以下版本浏览器
            var xhr = new ActiveXObject('Microsoft.XMLHTTP');
        }

        //接收 - 第三步
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                var status = xhr.status;
                if (status >= 200 && status < 300) {
                    options.success && options.success(xhr.responseText, xhr.responseXML);
                } else {
                    options.fail && options.fail(status);
                }
            }
        }

        //连接 和 发送 - 第二步
        if (options.type == "GET") {
            xhr.open("GET", options.url + "?" + params, true);
            xhr.send(null);
        } else if (options.type == "POST") {
            xhr.open("POST", options.url, true);
            //设置表单提交时的内容类型
            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            xhr.send(params);
        }
    }
	
	function isLogin(suc) {
		if (!!localStorage.kqc_sess_id == false) {
			localStorage.kqc_backurl = location.href;
			location.href = $user_login;
			return false;
		}
			
		$.ajax({
			type: "post",
			url: gateway,
			async: true,
			dataType: "json",                       //请求方式
	        data: {
				"uri": "bijia_product.isLogin",
				"sess_id": localStorage.kqc_sess_id,
				"param": {}
			},        //请求参数
	        success: function (res, xml) {
	            // 此处放成功后执行的代码
	            if (res.code == "0") {
					try{
						suc(res)
					}catch(e){
					}
				} else {
					localStorage.kqc_backurl = location.href;
					location.href = $user_login
				}
	        }
	    });
	}
	namespace.isLogin = isLogin;
	
	function isLogin2(suc) {
		if (!!localStorage.kqc_sess_id == false) {
			return false;
		}
		$.ajax({
			type: "post",
			url: gateway,
			async: true,
			dataType: "json",
			data: JSON.stringify({
				"uri": "bijia_product.isLogin",
				"sess_id": localStorage.kqc_sess_id,
				"param": {}
			}),
			success: function(res) {
				if (res.code == "0") {
					try{
						suc(res)
					}catch(e){
					}
				}
			}
		})
	}
	namespace.isLogin2 = isLogin2;

})(window, window.Zepto||window.jQuery);