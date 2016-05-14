// http://www.qingdou.me/2170.html
;
$(function(){
	$("title").html("[WXS]代码图片互转工具");
	$("#runjs").click(function(){
		eval($("#js").val());
	});
	$("#topng").click(function(){
		toPng($("#js").val());
	});
	$("#tojs").click(function(){
		tojs("png");
	});
	$("#canvastoimg").click(function(){
		c2img("png","pngImg");
	});
	$("#clear").click(function(){
		$("#js").val("");
	});
});

//将js代码编码为图片
function toPng(jsorg){
	var canvas  = document.getElementById("png");
	var context = canvas.getContext("2d");
	var width  = Math.ceil(Math.sqrt(jsorg.length / 3));
	var height = width;
	$("#png").attr("width",width).attr("height",height);
	$("#png").width(width).height(height);
	var imageData = context.createImageData(width, height);
	
	var a = stringToHex(jsorg);
	var arr = a.split(",");
	for(var i = 0,j=0;j<width*height*4;i++,j++){
		if((j+1)%4==0){
			imageData.data[j]=255;
			j++;
		}
		if(i<arr.length)
			imageData.data[j] = arr[i];
	}
//console.log(imageData.data);
	context.putImageData(imageData, 0, 0);
}

//解析图片为js代码
function tojs(canvasId){
	var canvas  = document.getElementById(canvasId);
	var context = canvas.getContext("2d");
	var width  = $("#"+canvasId).width();
	var height = $("#"+canvasId).height();
	var imageData = context.getImageData(0, 0, width, height);
//console.log(imageData.data);
	var str = "";
	for(var i = 0;i<imageData.data.length;i++){
		if((i+1)%4==0)
			continue;
		str += imageData.data[i]!=0?hexToString(imageData.data[i]):'';
	}
	$("#js").val(str);
}

//生成png
function c2img(canvasId,imgId){
	var canvas  = document.getElementById(canvasId);
	var dataURL = canvas.toDataURL("image/png", 1.0);
	$("#"+imgId).attr("src",dataURL);
}

//字符串转换为十六进制
function stringToHex(str){
	var val="";
	for(var i=0;i<str.length;i++){
		if(val == "")
			val = str.charCodeAt(i).toString(10);
		else
			val += "," + str.charCodeAt(i).toString(10);
	}
	return val;
}

//十六进制转换为字符串
function hexToString(str){
	return String.fromCharCode(parseInt(str,10));
}

//读取显示图片至canvas
function onPngFileChange(source){
	var file = source.files[0];
	if(window.FileReader) {  
		var fr = new FileReader();  
		fr.onloadend = function(e) {
			var img = new Image();
			img.src = e.target.result;
			img.onload = function(){				
				var canvas  = document.getElementById("png");
				var context = canvas.getContext("2d");
				$("#png").attr("width",this.width).attr("height",this.height);
				$("#png").width(this.width).height(this.height);
				context.drawImage(this,0,0);
			}
			//$("#pngImg").attr("src",e.target.result);
		};  
		fr.readAsDataURL(file);  
	}  
}