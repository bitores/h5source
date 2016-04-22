(function(namespace, $) {
	var canvas = document.createElement("canvas");
	var ctx = canvas.getContext("2d");
	var tCanvas = document.createElement("canvas");
	var tctx = tCanvas.getContext("2d");
	var maxsize = 200 * 1024;
	var pp = "";

	function bindpicker(selector,oInput, feedback) {
//		pp = selector;
//		$(selector).on("click", function(e) {
//			oInput = $('<input type="file" name="file" capture="camera" style="position: absolute !important;clip: rect(1px 1px 1px 1px); clip: rect(1px,1px,1px,1px);float: left;cursor:pointer;"  class="invisible" accept="image/png,image/gif,image/jpg,image/jpeg">');
//			oInput.appendTo($("body"));
//			oInput.trigger("click");
			oInput.on("change", function() {
				file = this.files[0];
				if (!/\/(?:jpeg|jpg|png|gif)/i.test(file.type)) {
					return
				}
				Log.show("加载预览图");
				var reader = new FileReader();
				reader.onload = function() {
					var result = this.result;
					var img = new Image();
					img.src = result;
					reader.onload = reader.onerror = null;
					if (result.length <= maxsize) {
						img = null;
						upload(result, feedback);
						return
					}
					Log.show("压缩图片");
					if (img.complete) {
						callback()
					} else {
						img.onload = callback
					}

					function callback() {
						var data = compress(img);
						upload(data, feedback);
						img = null
					}
				};
				reader.readAsDataURL(file)
			})
//		})
	}
	namespace.bindpicker = bindpicker;

	function compress(img) {
		var initSize = img.src.length;
		var width = img.width;
		var height = img.height;
		var ratio;
		if ((ratio = width * height / 4000000) > 1) {
			ratio = Math.sqrt(ratio);
			width /= ratio;
			height /= ratio
		} else {
			ratio = 1
		}
		canvas.width = width;
		canvas.height = height;
		ctx.fillStyle = "#fff";
		ctx.fillRect(0, 0, canvas.width, canvas.height);
		var count;
		if ((count = width * height / 1000000) > 1) {
			count = ~~(Math.sqrt(count) + 1);
			var nw = ~~(width / count);
			var nh = ~~(height / count);
			tCanvas.width = nw;
			tCanvas.height = nh;
			for (var i = 0; i < count; i++) {
				for (var j = 0; j < count; j++) {
					tctx.drawImage(img, i * nw * ratio, j * nh * ratio, nw * ratio, nh * ratio, 0, 0, nw, nh);
					ctx.drawImage(tCanvas, i * nw, j * nh, nw, nh)
				}
			}
		} else {
			ctx.drawImage(img, 0, 0, width, height)
		}
		var ndata = canvas.toDataURL("image/jpeg", 0.1);
		tCanvas.width = tCanvas.height = canvas.width = canvas.height = 0;
		return ndata
	}

	function upload(data, callback) {
		Log.show("正在上传");
		var pecent = 0,
			loop = null;
		var xhr = new XMLHttpRequest();
		xhr.open("post", gateway);
		xhr.onreadystatechange = function(res) {
			if (xhr.readyState == 4) {
				var jsonData = JSON.parse(xhr.responseText);
				clearInterval(loop);
				var ret = JSON.parse(xhr.response);
//				$(pp).show();
				if (ret.code === 0) {
					Log.show("上传成功");
					if (callback) {
						callback(ret)
					}
				} else {
					Log.show(ret.msg + ",重新上传")
				}
			}
		};
		xhr.upload.addEventListener("progress", function(e) {
			if (loop) {
				return
			}
			pecent = ~~(100 * e.loaded / e.total) / 2;
			if (pecent == 50) {
				mockProgress()
			}
		}, false);

		function mockProgress() {
			if (loop) {
				return
			}
			loop = setInterval(function() {
				pecent++;
				Log.show("正在上传" + pecent + "%");
				if (pecent == 99) {
					clearInterval(loop)
				}
			}, 100)
		}
		xhr.send(JSON.stringify({
			"uri": "common.upload_base",
			"sess_id": localStorage.kqc_sess_id,
			"param": {
				"type": 0,
				"file": data
			}
		}))
	}
	namespace.uploadimg = upload;
})(window, window.jQuery || window.Zepto);