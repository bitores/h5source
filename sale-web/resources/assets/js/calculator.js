function regN(regid) {
	var v = $("#"+regid).html();
	var newv = v.replace(/[^0-9]/ig,"");
	if(newv =="")  {return 0;}
	else {return newv;}
}

$('.why_txt .close').each(function(){
	$(this).on('click',function(){
		$(this).parents('.why_txt').hide();
	})
})
$('.whyicon').each(function(){
	$(this).on('click',function(){
		$(this).parents('dl').find('.why_txt').hide();
		$(this).parent().find('.why_txt').show();
	})
})

//多项选择(各种险)
$('.calculm_business dd .calculm_title').on('click',function(){
	$(this).toggleClass('calcul_sel2');
	if(!$(this).hasClass('calcul_sel2')){
		$(this).parent().find('small').removeClass('calcul_sel');
		$(this).parent().find('.calculm_money').html('0元');
		calcAll();
	}else{
		$(this).parent().find('small').eq(0).addClass('calcul_sel');	
		calcAll();
	}
});
$('.calculmb .calculm_title').on('click',function(){
	$(this).toggleClass('calcul_sel3');
	if(!$('.calculmb .calculm_title').hasClass('calcul_sel3')){
		$('.calculmb small').removeClass('calcul_sel1');
		$('#busin_third').html('0元');
		calcAll();
	}else{
		$('.calculmb small').eq(4).addClass('calcul_sel1');
		calcAll();
	}
});

function relation(){
//	$('#chkTPL').on('click',function(){
//		if(!$(this).hasClass('calcul_sel3')){
//			$('#chkCarTheft').removeClass('calcul_sel2');
//			$('#chkCarTheft').unbind('click');
//			$('#TYXian').css('color','#999');
//			
//		}else{
//			$('#chkCarTheft').bind('click',function(){
//				$(this).toggleClass('calcul_sel2');
//				calcAll();
//			});
//			$('#TYXian').css('color','#333');
//
//		}
//	});
	$('#chkCarDamage').on('click',function(){
		if(!$(this).hasClass('calcul_sel2')){
			$('#chkNatural,#chkWading,#chkCarGlass,#chkCarScrat').removeClass('calcul_sel2');
			$('#chkNatural,#chkWading,#chkCarGlass,#chkCarScrat').unbind('click');
			$('#chkNatural,#chkWading,#chkCarGlass,#chkCarScrat').parent().find('small').removeClass('calcul_sel');
			$('#NatXian,#WateXian,#GlXian,#ScrXian').css('color','#999');
		}else{
			$('#chkNatural,#chkWading,#chkCarGlass,#chkCarScrat').bind('click',function(){
				$(this).toggleClass('calcul_sel2');
				$(this).parent().find('small').eq(0).addClass('calcul_sel');				
				calcAll();
			});
			$('#NatXian,#WateXian,#GlXian,#ScrXian').css('color','#333');
		}
	})
}
relation();
//单项选择
function changeNO(cur,old){
	$('.calculm_insure dd small').eq(cur).addClass('calcul_sel');
	$('.calculm_insure dd small').eq(old).removeClass('calcul_sel');
}
function changeNO1(cur,old){
	$('.calculmb small').eq(cur).addClass('calcul_sel1');
	$('.calculmb small').eq(old).removeClass('calcul_sel1');
}
$('.calculm_force dd').each(function(){	
	$(this).find('small').each(function(){
		$(this).on('click',function(){
			var cur=$(this).index('.calculm_force dd small');
			var old=$(this).parent().find('small[class^="calcul_sel"]').index('.calculm_force dd small');
			changeNO(cur,old);
			calcAll();
		});
	});
});
$('.calculm_business dd').each(function(){	
	$(this).find('small').each(function(){
		$(this).on('click',function(){
			if(!$(this).parents('dd').find('.calculm_title').hasClass('calcul_sel2'))
				return;
			var cur=$(this).index('.calculm_insure dd small');
			var old=$(this).parent().find('small[class^="calcul_sel"]').index('.calculm_insure dd small');
			changeNO(cur,old);
			calcAll();
		});
	});
});
$('.calculmb small').on('click',function(){
	if(!$(this).parents('.calculmb').find('.calculm_title').hasClass('calcul_sel3'))
		return;		
	var cur=$(this).index('.calculmb small');
	var old=$('.calculmb small[class^="calcul_sel1"]').index('.calculmb small');
	changeNO1(cur,old);
	calcAll();
});


//事件焦点
$('[focusval]').on('focus',function(){
	var val=$.trim($(this).val());
	var oldval=$(this).attr('focusval');
	if(val==oldval){
		$(this).css('color','#000').val('');
	}
});
$('[focusval]').on('blur',function(){
	var val=$.trim($(this).val());
	var oldval=$(this).attr('focusval');
	if(val==''){
		$(this).css('color','#999').val(oldval);
	}
});


//------------------------common function---------------------------------------
function SetSpanValueByBrowerType(control, value) {
    $("#" + control).html(value);
}
//6701->6,701
function formatCurrency(num) {
    num = num.toString().replace(/\$|\,/g, '');
    if (isNaN(num)) num = "0";
    sign = (num == (num = Math.abs(num)));
    num = Math.floor(num * 100 + 0.50000000001);
    num = Math.floor(num / 100).toString();
    for (var i = 0; i < Math.floor((num.length - (1 + i)) / 3); i++)
        num = num.substring(0, num.length - (4 * i + 3)) + ',' + num.substring(num.length - (4 * i + 3));
    return (((sign) ? '' : '-') + num);
}
//35.3->353000
function formatCurrencyWToK(num) {
    num = num.toString().replace(/\$|\,/g, '');
    if (isNaN(num)) num = "0";
    sign = (num == (num = Math.abs(num)));
    num = Math.floor(num * 10000 + 0.50000000001).toString();
    return (((sign) ? '' : '-') + num);
}
//4.784->4784
function GetIntValue(num) {
    num = num.toString().replace(/\,/g, '');
    return parseInt(num);
}

//车费计算器
function calcAll() {
	setTimeout(function(){
		CompultInsure();    //交强险
		//CompultTravel();    //车船税
	    BusinThird();    //第三方责任险
	    BusinCar();    //车辆损失险
	    
	    BusinStolen();    //全车盗抢险
	    BusinGlass();    //玻璃单独破碎险
	    BusinNatural();    //自燃损失险
	    BusinWade();    //涉水险
	    BusinScrat();    //车身划痕险
	    BusinDrive();    //司机座位责任险
	    BusinPassenger();    //乘客座位责任险
	    BusinSpec();    //不计免赔特约险
	
	    calcCommonTotalNew();    //商业保险合计
	    calcForce();   //强制保险合计
	    calcMarket();   //新车指导价
	},10);
    

}

//交强险
function CompultInsure(){
	var JQsure;
	var JQxian=$('.calcul_sel').parent().find('small').index($('.calcul_sel'));
	if($('#nakeMoney').val()=='请输入裸车价格'||$('#nakeMoney').val()=='') {
		$('#compult_insure').html('0元');
	}
	else{
		if(JQxian==0) JQsure=950;
		if(JQxian==1) JQsure=1100;
		$('#compult_insure').html(formatCurrency(JQsure)+'元');
	}
}
//车船税
//function CompultTravel(){
//	if($('#nakeMoney').val()=='请输入裸车价格'||$('#nakeMoney').val()=='') {
//		$('#compult_travel').html('0元');
//	}
//	else{
//		$('#compult_travel').html('400元')
//	}
//}

//第三者责任险
function BusinThird(){
	var JQxian=$('.calcul_sel').parent().find('small').index($('.calcul_sel'));
	var ZRxian=$('.calcul_sel1').parent().find('small').index($('.calcul_sel1'));
	var num;
	if($('#nakeMoney').val()=='请输入裸车价格'||$('#nakeMoney').val()==''){
		num=0;
	}else{
		if($('#chkTPL').hasClass('calcul_sel3')){
				if(JQxian==0){
				if(ZRxian==0)   num=671;
				if(ZRxian==1)	num=940;
				if(ZRxian==2)	num=1141;
				if(ZRxian==3)	num=1275;
				if(ZRxian==4)	num=1515;
				if(ZRxian==5)	num=1973;
			}else if(JQxian==1){
				if(ZRxian==0)	num=573;
				if(ZRxian==1)	num=803;
				if(ZRxian==2)	num=975;
				if(ZRxian==3)	num=1090;
				if(ZRxian==4)	num=1295;
				if(ZRxian==5)	num=1686;
			}
		}else{
			num=0;
		}
	}	
	$('#busin_third').html(formatCurrency(parseInt(num*0.9))+'元');
}
//车辆损失险
function BusinCar() {
	var rate = 0.0128;
	var JQxian=$('.calcul_sel').parent().find('small').index($('.calcul_sel'));
	if($('#nakeMoney').val()=='请输入裸车价格'||$('#nakeMoney').val()==''){
		result=0;
	}else{		
		if($('#CLXian .calculm_title').hasClass('calcul_sel2')){
			if(JQxian==1){
				var baseCost = 646;
			}else{
				var baseCost = 539;
			}
		}else{
			result=0;
		}
	}
	var result = parseInt(($('#nakeMoney').val() * rate + baseCost)*0.9);
	$('#busin_car').html(formatCurrency(result)+'元');	
}
//涉水险
function BusinWade() {
	if($('#nakeMoney').val()=='请输入裸车价格'||$('#nakeMoney').val()==''){
		$('#busin_wade').html('0元');
	}else{
		if($('#CLXian .calculm_title').hasClass('calcul_sel2')&&$('#WateXian .calculm_title').hasClass('calcul_sel2')){
			var cDamage = $('#nakeMoney').val() * 0.002;
			$('#busin_wade').html(formatCurrency(parseInt(cDamage*0.9))+'元');	
		}else{
			$('#busin_wade').html('0元');
		}
	}	
}
//全车盗抢险
function BusinStolen() {
	var JQxian=$('.calcul_sel').parent().find('small').index($('.calcul_sel'));
	if($('#nakeMoney').val()=='请输入裸车价格'||$('#nakeMoney').val()==''){
		$('#busin_stolen').html('0元');
	}else{
		if($('#DQXian .calculm_title').hasClass('calcul_sel2')){		
			if(JQxian==1){
				$('#busin_stolen').html(formatCurrency(parseInt(($('#nakeMoney').val() * 0.0044 + 140)*0.9))+'元');
			}else{
				$('#busin_stolen').html(formatCurrency(parseInt(($('#nakeMoney').val() * 0.0053 + 120)*0.9))+'元');
			}
		}else{
			$('#busin_stolen').html('0元')
		}
	}	
}
//玻璃单独破碎险
function BusinGlass() {
	var JQxian=$('.calcul_sel').parent().find('small').index($('.calcul_sel'));
	var GlXian=$('#GlXian small').index($('#GlXian small.calcul_sel'));	
	if($('#nakeMoney').val()=='请输入裸车价格'||$('#nakeMoney').val()==''){
		$('#busin_glass').html('0元');
	}else{
		if($('#CLXian .calculm_title').hasClass('calcul_sel2')&&$('#GlXian .calculm_title').hasClass('calcul_sel2')){
			if(GlXian==0){
				if(JQxian==1){
					$('#busin_glass').html(formatCurrency(parseInt($('#nakeMoney').val() * 0.002*0.9))+'元');
				}else{
					$('#busin_glass').html(formatCurrency(parseInt($('#nakeMoney').val() * 0.0019*0.9))+'元');
				}			
			}
			if(GlXian==1){
				if(JQxian==1){
					$('#busin_glass').html(formatCurrency(parseInt($('#nakeMoney').val() * 0.0032*0.9))+'元');
				}else{
					$('#busin_glass').html(formatCurrency(parseInt($('#nakeMoney').val() * 0.0031*0.9))+'元');
				}			
			}
		}else{
			$('#busin_glass').html('0元');
		}
	}	
}
//自燃损失险
function BusinNatural() {
	if($('#nakeMoney').val()=='请输入裸车价格'||$('#nakeMoney').val()==''){
		$('#busin_natural').html('0元');
	}else{
		if($('#NatXian .calculm_title').hasClass('calcul_sel2')){
			$('#busin_natural').html(formatCurrency(parseInt($('#nakeMoney').val() * 0.002*0.9))+'元');
		}else{
			$('#busin_natural').html('0元');
		}
	}	
}
//不计免赔特约险
function BusinSpec() {
	if($('#nakeMoney').val()=='请输入裸车价格'||$('#nakeMoney').val()==''){
		$('#busin_spec').html('0元');
	}else{
//		if($('#CLXian .calculm_title').hasClass('calcul_sel2')&&$('.calculmb .calculm_title').hasClass('calcul_sel3')&&$('#TYXian .calculm_title').hasClass('calcul_sel2')){
//			var total = GetIntValue(regN('busin_car')) + GetIntValue(regN('busin_third'));
//			$('#busin_spec').html(formatCurrency(Math.round(total * 0.2))+'元');
//		}else{
//			$('#busin_spec').html('0元');
//		}  
		
		$('#busin_spec').html(formatCurrency(parseInt((regN('busin_car')*0.15+regN('busin_third')*0.15+regN('busin_drive')*0.15+regN('busin_passenger')*0.15+regN('busin_stolen')*0.20+regN('busin_scrat')*0.15+regN('busin_wade')*0.20)*0.9))+'元');
	}
}
//乘客责任险（//所选金额*费率*（座位数-1）。如果没有座位数，则*4）
function BusinPassenger() {
	var JQxian=$('.calcul_sel').parent().find('small').index($('.calcul_sel'));
	var PassXian=$('#PassXian small').index($('#PassXian small.calcul_sel'));
	if($('#nakeMoney').val()=='请输入裸车价格'||$('#nakeMoney').val()==''){
		$('#busin_passenger').html('0元');
	}else{
		if($('#PassXian .calculm_title').hasClass('calcul_sel2')){
			if(JQxian==0){
				if(PassXian==0){
					$('#busin_passenger').html(parseInt(10000 * 0.0026 * 4*0.9)+'元');
				}
				if(PassXian==1){
					$('#busin_passenger').html(parseInt(20000 * 0.0026 * 4*0.9)+'元');
				}
				if(PassXian==2){
					$('#busin_passenger').html(parseInt(50000 * 0.0026 * 4*0.9)+'元');
				}		
			}else{
				if(PassXian==0){
					$('#busin_passenger').html(parseInt(10000 * 0.0025 * 4*0.9)+'元');
				}
				if(PassXian==1){
					$('#busin_passenger').html(parseInt(20000 * 0.0025 * 4*0.9)+'元');
				}
				if(PassXian==2){
					$('#busin_passenger').html(parseInt(50000 * 0.0025 * 4*0.9)+'元');
				}
			}
		}
	}
}
//司机责任险
function BusinDrive() {
	var JQxian=$('.calcul_sel').parent().find('small').index($('.calcul_sel'));	
	var DrXian=$('#DrXian small').index($('#DrXian small.calcul_sel'));
	if($('#nakeMoney').val()=='请输入裸车价格'||$('#nakeMoney').val()==''){
		$('#busin_drive').html('0元');
	}else{
		if($('#DrXian .calculm_title').hasClass('calcul_sel2')){
			if(JQxian==0){
				if(DrXian==0){
					$('#busin_drive').html(parseInt(10000 * 0.0041*0.9)+'元');
				}
				if(DrXian==1){
					$('#busin_drive').html(parseInt(20000 * 0.0041*0.9)+'元');
				}
				if(DrXian==2){
					$('#busin_drive').html(parseInt(50000 * 0.0041*0.9)+'元');
				}
			}else{
				if(DrXian==0){
					$('#busin_drive').html(parseInt(10000 * 0.0039*0.9)+'元');
				}
				if(DrXian==1){
					$('#busin_drive').html(parseInt(20000 * 0.0039*0.9)+'元');
				}
				if(DrXian==2){
					$('#busin_drive').html(parseInt(50000 * 0.0039*0.9)+'元');
				}
			}				
		}
	}
}
//车身划痕险
function BusinScrat() {
	var num;
	if($('#nakeMoney').val()=='请输入裸车价格'||$('#nakeMoney').val()==''){
		num=0;
	}else{
		if($('#CLXian .calculm_title').hasClass('calcul_sel2')&&$('#ScrXian .calculm_title').hasClass('calcul_sel2')){
			var ScrXian=$('#ScrXian small').index($('#ScrXian small.calcul_sel'));
			if($('#nakeMoney').val() < 300000){
				if(ScrXian==0)	num=400;
				if(ScrXian==1)	num=570;
				if(ScrXian==2)	num=760;
				if(ScrXian==3)	num=1140;
			}else if($('#nakeMoney').val() > 500000){
				if(ScrXian==0)	num=850;
				if(ScrXian==1)	num=1100;
				if(ScrXian==2)	num=1500;
				if(ScrXian==3)	num=2250;
			}else{
				if(ScrXian==0)	num=585;
				if(ScrXian==1)	num=900;
				if(ScrXian==2)	num=1170;
				if(ScrXian==3)	num=1780;
			}
		}
	}
	$('#busin_scrat').html(formatCurrency(parseInt(num*0.9))+'元');
}


//强制保险合计
function calcForce() {    
	var forceTotal=GetIntValue(regN('compult_insure'))
	//var forceTotal=GetIntValue(regN('compult_insure'))+GetIntValue(regN('compult_travel'));	
	SetSpanValueByBrowerType('compulsorytotal', formatCurrency(Math.round(forceTotal)));
}
calcForce();
//商业保险合计

function calcCommonTotalNew() {
    var commonTotal = 0;   

    if ($('#chkTPL').hasClass('calcul_sel3')&&!isNaN(regN('busin_third'))) {
        commonTotal += parseFloat(GetIntValue(regN('busin_third')+'元'));
    }

    if ($('#chkCarDamage').hasClass('calcul_sel2')&&!isNaN(regN('busin_car'))) {
        commonTotal += GetIntValue(regN('busin_car')+'元');
    }
    if ($('#chkCarTheft').hasClass('calcul_sel2')&&!isNaN(regN('busin_spec'))) {
        commonTotal += GetIntValue(regN('busin_spec')+'元');
    }
    if ($('#chkCarStolen').hasClass('calcul_sel2')&&!isNaN(regN('busin_stolen'))) {
        commonTotal += GetIntValue(regN('busin_stolen')+'元');
    }
    if ($('#chkCarGlass').hasClass('calcul_sel2')&&!isNaN(regN('busin_glass'))) {
        commonTotal += GetIntValue(regN('busin_glass')+'元');
    }
    if ($('#chkNatural').hasClass('calcul_sel2')&&!isNaN(regN('busin_natural'))) {
        commonTotal += GetIntValue(regN('busin_natural')+'元');
    }
    if ($('#chkWading').hasClass('calcul_sel2')&&!isNaN(regN('busin_wade'))) {
        commonTotal += parseFloat(regN('busin_wade')+'元');
    }
    if ($('#chkCarScrat').hasClass('calcul_sel2')&&!isNaN(regN('busin_scrat'))) {
        commonTotal += parseFloat(regN('busin_scrat')+'元');
    }
    if ($('#chkCarDrive').hasClass('calcul_sel2')&&!isNaN(regN('busin_drive'))) {
        commonTotal += GetIntValue(regN('busin_drive')+'元');
    }
    if ($('#chkpassenger').hasClass('calcul_sel2')&&!isNaN(regN('busin_passenger'))) {
        commonTotal += GetIntValue(regN('busin_passenger')+'元');
    }
    SetSpanValueByBrowerType('businesstotal', formatCurrency(Math.round(commonTotal)));
    return commonTotal;
}
calcCommonTotalNew();
//新车指导价
 function calcMarket() {
    var MarketTotal = formatCurrency(parseInt(regN('compulsorytotal'))+parseFloat(regN('businesstotal')));
    $("#calc_guide").html(MarketTotal);
    SetSpanValueByBrowerType('calc_guide', MarketTotal);
}
calcMarket();