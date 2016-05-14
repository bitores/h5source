define([],function(){

	var math = {};

	math.Int = function(){
		return function(str){
			return parseInt(str);
		}
	}

	math.Fraction = function(){
		return function(str){
			return String(str).split('.')[1];
		}
	}

	math.NumberSplit = function(){
		return function(strNum){
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
		}
	}

	math.add = function(){
		return function(arg1, arg2){
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
	}

	math.sub = function(){
		return function(arg1, arg2){
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
	}

	math.mul = function(){
		return function(arg1, arg2){
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
	}

	math.div = function(){
		return function(arg1, arg2){
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
	}



	return math;
})