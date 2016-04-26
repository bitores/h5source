;// upload callback function
var uidimg0 = function (file) {
        $('#co_customer_image0').val(file.file);
        $("#user_idimg0").find('iframe').hide();
        $("#user_idimg0").find('.reupload_btn').show();
        $("#user_idimg0").find('img').attr("src", UPLOAD_URL + REX.thumb(file.file, '300x200')).show();
    },
    uidimg1 = function (file) {
        $('#co_customer_image1').val(file.file);
        $("#user_idimg1").find('iframe').hide();
        $("#user_idimg1").find('.reupload_btn').show();
        $("#user_idimg1").find('img').attr("src", UPLOAD_URL + REX.thumb(file.file, '300x200')).show();
    },

    // 地区选取回调
    a4scallback = function (obj) {
        $('#co_a4s_id').val($(obj).attr('data-id'));
        $('#a4s_region').html($(obj).attr('data-name'));
    },

    // 用户所在地选取回调
    cuscallback = function (data) {
        console.log(data);
        var id = 0;
        var dataid=[];
        if (data[2]['name'] == '') {
            id = data[1].id;
            dataid[0]=data[0].id;
            dataid[1]=data[1].id;
            dataid[2]=data[1].id;
            $('#cus_region').html(data[0]['name'] + " " + data[1]['name']);
        }
        else {
            id = data[2]['id'];
            dataid[0]=data[0].id;
            dataid[1]=data[1].id;
            dataid[2]=data[2].id;
            $('#cus_region').html(data[0]['name'] +" "+ data[1]['name'] + " " + data[2]['name']);
            
        }
        $('#co_region0').val(dataid[0]);
        $('#co_region1').val(dataid[1]);
        $('#co_region2').val(dataid[2]);
        
        REX.get_json($('#co_a4s_id').attr('data-url') + data[1].id, function (d) {
            if (d.fees == '0') {
                $('#label_freight').html('待客服确认');
                $('#label_freight1').html('待客服确认');
            }
            else {
                $('#label_freight').html(d.fees + '元');
                $('#label_freight1').html(d.fees + '元');
            }
            $('#co_freight').val(d.fees);
            $('#co_release_region').val(d.release);
            $('#co_distance').val(d.distance);
        });
    },

    // 表单提交
    submit_form = function () {
        REX.formpost ('#order_form', function (d) {
            if (d.code == '0') {
                REX.msg('操作成功', function () {
                    location.href = d.url;
                });
            }
            else {
                if (typeof(d.error) != undefined) {
                    for (var key in d.error) {
                        REX.msg(d.error[key]);
                        break;
                    }
                }
                else {
                    REX.msg(d.msg);
                }
            }
        }, function (d) {
            REX.msg('服务器繁忙, 请稍后再试!');
        });
    };

$(function(){
	
	$('#co_customer_name').keyup(function(){
		if($(this).val().length>10){
			$(this).val($(this).val().substring(0,10));
		}
		
	});
	
	$('#co_customer_id').keyup(function(){
		if($(this).val().length>18){
			$(this).val($(this).val().substring(0,18));
		}
		
	});

	$('#co_customer_mobile').keyup(function(){
		if($(this).val().length>11){
			$(this).val($(this).val().substring(0,11));
		}		
	});

    // 重新上传按钮
    $('.reupload_btn').on('click', function () {
        $(this).parent().find("iframe").show();
        $(this).parent().find(".reupload_btn").hide();
        $(this).parent().find("img").hide();
    });

    // 配送方式选择按钮事件
    $('#desposit_select li').on('click', function () {
        $(this).siblings().removeClass('select');
        $(this).addClass('select');
        $('.desposit').hide();
        $('.desposit').eq($(this).index()).show();
        if($(this).index()=='0')
        	$('#co_dmode').val(1);
        else
        	$('#co_dmode').val(2);
        //$('#co_dmode').val($(this).index() + 1);
    });

    /* {{{  dialog */
    $('.dialog').on('click', function () {
        REX.dialog(this);
    });
    /* }}} */

    // 4s店点击事件处理
    $('#a4s_list').on('click', 'p', function () {
        if ($(this).attr('data-val') != undefined) {
            $('#co_a4s_id').val($(this).attr('data-val'));
            $('#a4s_list').find('.active-bg').removeClass('active-bg');
            $(this).addClass('active-bg');
        }
    });

    // 表单提交
    $('#co_submit').on('click', function () {
        if ($('#co_customer_name').val() == '' || $('#co_customer_name').val() == $('#co_customer_name').attr('placeholder')) {
            REX.msg('请输入购车人真实姓名', function () {
                REX.focus($('#co_customer_name'), 50);
            });
        }
        else if (!/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i.test($('#co_customer_id').val()) || $('#co_customer_id').val() == $('#co_customer_id').attr('placeholder')) {
            REX.msg('请输入购车人的身份证号码', function () {
                REX.focus($('#co_customer_id'), 50);
            });
        }
        else if (!/^1\d{10}$/.test($('#co_customer_mobile').val()) || $('#co_customer_mobile').val() == $('#co_customer_mobile').attr('placeholder')) {
            REX.msg('请输入购车人联系电话', function () {
                REX.focus($('#co_customer_mobile'), 50);
            });
        }
        else if (!/^\d{4}\-\d{2}\-\d{2}\/pre\_\w+\.[a-z]+$/i.test($('#co_customer_image0').val())) {
            REX.msg('请输入上传购车人身份证正面照片', function () {
                REX.focus($('#co_customer_image0'), 50);
            });
        }
        else if (!/^\d{4}\-\d{2}\-\d{2}\/pre\_\w+\.[a-z]+$/i.test($('#co_customer_image1').val())) {
            REX.msg('请输入上传购车人身份证反面照片', function () {
                REX.focus($('#co_customer_image1'), 50);
            });
        }
        else {
//        	submit_form ();
//             4S 店自提
//          if ($('#co_dmode').val() == '1') {
//              if (parseInt($('#co_a4s_id').val()) == 0) {
//                  REX.msg('请选择4S店');
//              }
//              else {
//                  submit_form ();
//              }
//          }
//          else 
		  //$('#co_dmode').val('2');
		  if($('#co_dmode').val()=='0')
		  	$('#co_dmode').val(2);
          if ($('#co_dmode').val() == '2') {
              if (parseInt($('#co_region0').val()) == 0 || parseInt($('#co_region1').val()) == 0) {
                  REX.msg('请选择配送地址');
              }
            else 
//            if ($('#co_addr').val() == '') {
//                REX.msg('请输入配送详细地址');
//                REX.focus($('#co_addr'));
//            }
//              else 
              {
                  submit_form ();
              }
          }else{
          	 submit_form ();
          	//REX.msg('请选择配送方式 ');
          }
        }

    });

});