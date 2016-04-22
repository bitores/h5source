(function(){
	jQuery(".logo").on('click',function(e){
		e.stopPropagation();
		location.href = $home_index;
	});
		
	jQuery(".login").on('click',function(){

		if(!!localStorage.kqc_sess_id == false){	
			localStorage.kqc_backurl = location.href;
			location.href = $user_login;
			return;
		}
		
		jQuery.ajax({
			type:"post",
			url: gateway,
			async:true,
			dataType: "JSON",
			data    : JSON.stringify({
			    "uri": "bijia_product.isLogin",
			    "sess_id":localStorage.kqc_sess_id,
			    "param" :{
			    }
			}),
			success : function (res) {
				if(res.code == '0'){
					location.href = $user_mine;
				}else if(res.code == '1'){
					location.href = $home_index;
				}else{
					localStorage.kqc_backurl = location.href;
					location.href = $user_login;
				}
            }
		});	
		
	});
})();
