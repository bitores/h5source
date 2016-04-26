@include('layouts/meta')
<link rel="stylesheet" type="text/css" href="/css/newview.css"/>
<link rel="stylesheet" type="text/css" href="/css/index/index_new.css"/>
<link href="{url:'sale-view-id-%d',$car['cc_id']}" rel="canonical" />

<script type="text/javascript" src="/js/modal.js"></script>
<script>

	var uploadUrl='{__UPLOAD_URL__}/';
	var morecarapi='{url:'@category-carlist-v-vv-ccbsy2-dd'}';
    var hotNum=1;
	var rec="{url:'@sale-recommend-pn-~'}";
	var carpircenow={$car['cc_price']};
	var carpirceold={$car['cc_price1']};
	var ccid={$car['cc_id']};
	var apiPrice="http://api.kuaiqiangche.com";
	$(function(){
		    $('#nevic-city2 p').click(function(e){
		    	e.stopPropagation();   
		    	$('.total-city').show();
		    	$('#city').hide();
		    });
	  	var city = $("#city");    
	    var text='';
	    $("#province li").on("click",function  (e) {
	        e.stopPropagation();       	
	    	var rid = this.id;
	    	$('#region0').val(rid);
	    	city.empty();
	    	text = $(this).html()+' ';
	    	parent.REX.ajaxpost({
	            'url'   : '{surl:'@sale-getregion~'}',
	            'data'  : 'id=' + rid + '&level=2' ,
	            'succ'  : function (res) {
	                 if (res.code == '0') {
	                	 $.each(res.data,function  (i,value) {
	                    	   city.append("<li id="+value.id+">"+value.name+"</li>");
	                   });
	                	 city.show();
	                 }
	            }
	        });
	    });
	
	    city.delegate("li","click",function  (e) {
	        e.stopPropagation();
	        text +=$(this).html();
	        $(this).addClass("linked").siblings().removeClass("linked");
	        $('#nevic-city2 p i').text(text);
	        $('#region1').val(this.id);
	        $('#nevic-city2').find(".total-city").hide();
	        city.empty();
	    }) 
	    $(document).click(function  () {
	    	$('.total-city').hide();
	    })
	})
        
</script>
	<script type="text/javascript" src="/js/newview.js"></script>
</head>

<body>
	@include('layouts/header')
	<div class="nevi">
		<div class="nevi-tit">

			<span>您的位置 : </span><a href="/">首页 </a>&nbsp;> &nbsp;<a href="{url:'category'}">品牌选车 </a>&nbsp;> &nbsp;<a href="{url:'@category-carlist-v-%d',$car['cc_cds_id']}">{$car['bsy_name']}</a>&nbsp;> &nbsp;<a href="" class="infonow">{$car['cc_bsy2_name']}</a>

		</div>
		<div class="nevi-connect">
			<div class="nevicon-top clearfix">
				<div class="nevic-left">
					<div class="nevicon-car">
						<img src="{__UPLOAD_URL__}{$car['cc_cover']}"/ width="464" height="309" alt="{$car['cc_bsy2_name']}">
					</div>
					<ul class="clearfix">
						<li class="nevi-ul1">厂商直购</li>
						<li class="nevi-ul2">低价专供</li>
						<li class="nevi-ul3">杜绝加价</li>
						<li class="nevi-ul4">安享质保</li>
					</ul>
					<div class="nevishare">
						<span>分享到：</span>
						<a href="javascript:;" title="分享到微信" class="share-btn share_weixin" data-url="{url:'wap:carres-cardetail-ccid_%d%scdsid_%d',$car['cc_id'],'/',$cds['cds_id']}" data-type="wechat" data-image="{__UPLOAD_URL__}{$cds['cds_cover']|thumb,600x400}"><i class="weixin"></i></a>
						<a href="javascript:;" title="分享到新浪微博" class="share-btn share_xinlang" data-type="sina" data-image="{__UPLOAD_URL__}{$car['cds_cover']|thumb,600x400}"><i class="weibo"></i></a>
						<a href="javascript:;" title="分享到QQ空间" class="share-btn  share_qq" data-type="qzone" data-image="{__UPLOAD_URL__}{$car['cds_cover']|thumb,600x400}"><i class="tencent-qq"></i></a>
						<p><a class="no-margin" href="{url:'@news-view-id-59'}" target="_blank">分享即送666红包</a><i class="redpaper"></i>
					</div>
				</div>
				<div class="nevic-right">
					<!-- <p class="nevnum">车辆编号：<span>112348</span></p> -->
					<h1 class="nevicname">
					{if  $car['cc_sale_type']==1}
					<span class="nevihas">现车</span>
					{elseif $car['cc_sale_type']==2}
					<span class="nevihas">预售</span>
					{/if}
					{$car['cc_bsy2_name']}</h1>
					
					<div class="nevic-face">
						<dl class="nevic-color">
							<dt>外观：</dt>
							<dd><i class="nevcolimg" style="background:#{$car['color1']}"></i>{$car['color1_name']}</dd>
						</dl>
						<dl class="nevic-color">
							<dt>内饰：</dt>
							<dd><i class="nevcolimg"  style="background:#{$car['color2']}"></i>{$car['color2_name']}</dd>
						</dl>
					</div>
					
					<div class="nevic-money clearfix">
						<div class="nevic-mon">￥<strong>{$car['cc_price']}</strong>万</div>
						<div class="nevic-easy">
							<i>优惠{$car['cc_price1']-$car['cc_price']}万元</i>
							<span>指导价:￥<strong>{$car['cc_price1']}</strong>万</span>
						</div>
					</div>
					<p class="nevic-calcul">
						<span id="J_price_calculator" class="" data-backdrop="static" href="#" data-toggle="modal" data-target="#calculator" data-backdrop="static">
		                    <em>车款计算器</em>
		                </span>
					</p>
					
					<!-- <div class="nevic-offer">
						<h5>提车城市</h5>
						<div class="nevic-city" id="nevic-city">
							<p><i id="city">请选择城市</i><span></span></p>		
							<input type="hidden" name="region1" id="region1" value="" />	
							<input type="hidden" name="cds_id" id="cds_id" value="{$car['cc_cds_id']}" />				
							<ul class="city-select1">
							{foreach $car['get_region'] $k $v}
								<li id="{$v['ip_region1']}" name="{$v['ip_register']}">{$v['ip_region1_name']}</li>
							{/foreach}
							</ul>
						</div>
						<div class="nevic-lice">支持上牌：<span>全国</span></div>
					</div> -->
					<div class="nevic-offer">
						<h5>提车城市</h5>
						<div class="nevic-city" id="nevic-city2">
							<p ><i>请选择城市</i><span></span></p>
							<input type="hidden" name="region0" id="region0" value="" />
							<input type="hidden" name="region1" id="region1" value="" />
							<div class="total-city">
								<ul class="province"  id="province">
								{foreach $car['region'] $k $v}
								<li id="{$v['id']}" >{$v['name']}</li>
								{/foreach}
								</ul>
								<ul class="pro-city" id="city">
								</ul>
							</div>						
						</div>
					</div>
					{if $car['cc_sale_kind'] == 2}
					<!-- 询价车 -->
					<p class="nevic-chat">如果想咨询其他城市请联系客服：<strong>400-626-9191</strong></p>
					{else}
					<!-- 自采车 -->

					<p class="nevic-chat">车辆具体运费请咨询客服：<strong>400-626-9191</strong></p>
					{/if}

					<div class="nevic-price">
					{if $car['cc_sale_type'] ==1}
						<a class='btnDC' href="javascript:;" id="sale_order_btn" data-url="{url:'@sale-order'}">支付定金<span>{$car_deposit}</span>元</a>
					{elseif $car['cc_sale_type'] ==2}
					<a style="background-color:#ccc" href="javascript:void(0);" >支付定金<span>{$car_deposit}</span>元</a>
					{else}
						<a class='btnDC' href="javascript:;" id="sale_order_btn" data-url="{url:'@sale-order'}">支付定金<span>{$car_deposit}</span>元</a>
					{/if}
					</div>
				</div>
			</div>
			<div class="page-banner">
				<a href="{url:'@help-index-id-22'}" target="_blank"><img src="/images/page-banner.jpg" alt=""></a>
			</div>
			<!-- 购车流程 -->
			<div class="nevicon nevi-process" id="nevi-process">
				<p class="nevititle"><span><i></i>how to buy</span>购车流程<strong>.....................................................................................................................</strong></p>
				<!-- 询价车 购车流程-->
				{if $car['cc_sale_kind'] == 2}
		        <div class="pro-content">
		            <ul class="clearfix">
		                <li>
		                    <b><i class="register"></i></b>
		                    <p>在线选车</p>
		                    <div class="text-in">在线选择车型</div>
		                </li>
		                <li><span></span></li>
		                <li>
		                    <b><i class="arrange deposit"></i></b>
		                    <p>支付定金</p>
		                    <div class="text-in">确认购车<br>支付定金</div>
		                </li>
		                <li><span></span></li>
		                <li>
		                    <b><i class="see-car"></i></b>
		                    <p>陪同看车</p>
		                    <div class="text-in">专业销售顾问全程陪同到4S店看车</div>
		                </li>
		                <li><span></span></li>
		                <li>
		                    <b><i class="buy-car"></i></b>
		                    <p>成功提车</p>
		                    <div class="text-in">在4S店支付尾款，办理保险上牌等手续</div>
		                </li>
		            </ul>
		        </div>
		        {else}
		        <!-- 自采车 购车流程 -->
		        <div class="pro-content">
		            <ul class="clearfix">
		                <li>
		                    <b><i class="register"></i></b>
		                    <p>在线选车</p>
		                    <div class="text-in">在线选择车型</div>
		                </li>
		                <li><span></span></li>
		                <li>
		                    <b><i class="arrange deposit"></i></b>
		                    <p>支付定金</p>
		                    <div class="text-in">确认购车<br>支付定金</div>
		                </li>
		                <li><span></span></li>
		                <li>
		                    <b><i class="see-car"></i></b>
		                    <p>平台发车</p>
		                    <div class="text-in">车辆出库、验车，短信通知您发车信息</div>
		                </li>
		                <li><span></span></li>
		                <li>
		                    <b><i class="buy-car"></i></b>
		                    <p>成功提车</p>
		                    <div class="text-in">在4S店或合作提车点提车，支付尾款</div>
		                </li>
		            </ul>
		        </div>
		        {/if}
			</div>
			<!-- 车型介绍 -->
			<div class="nevicon nevi-models" id="nevi-model">
				<p class="nevititle"><span><i></i>introduce</span>车型介绍<strong>.....................................................................................................................</strong></p>
		        <div class="car-detail">{$car['detail']|html}</div>
			</div>
			<!-- 参数配置 -->
			<div class="nevicon nevi-para" id="nevi-para">
				<p class="nevititle"><span><i></i>parameters</span>参数配置<strong>.....................................................................................................................</strong></p>
				<dl class="clearfix base-para">
					<dt>基本参数</dt>
					{if $car['config']['1']['车身结构']}<dd><span>车身结构：</span>{$car_config[1]['车身结构']}</dd>{/if}
					{if $car_config[1]['变速箱']}<dd class="nevnoline"><span>变速箱：</span>{$car_config[1]['变速箱']}</dd>{/if}
					{if $car_config[1]['长*宽*高(mm)']}<dd><span>长宽高：</span>{$car_config[1]['长*宽*高(mm)']}</dd>{/if}
					{if $car_config[1]['环保标准']}<dd class="nevnoline"><span>环保标准：</span>{$car_config[1]['环保标准']}</dd>{/if}
					{if $car_config[1]['燃料形式']}<dd><span>燃料形式：</span>{$car_config[1]['燃料形式']}</dd>{/if}
					{if $car_config[1]['最高车速(km/h)']}<dd class="nevnoline"><span>最高车速：</span>{$car_config[1]['最高车速(km/h)']}km/h</dd>{/if}
					{if $car_config[1]['工信部综合油耗(L/100km)']}<dd><span>综合油耗：</span>{$car_config[1]['工信部综合油耗(L/100km)']}L/100km</dd>{/if}
					<dd class="nevnoline"></dd>

				</dl>

				<dl class="clearfix base-para">
					<dt>发动机</dt>
					{if $car['config'][2]['排量(mL)']}<dd><span>排量：</span>{$car_config[2]['排量(mL)']}mL</dd>{/if}
					{if $car_config[2]['最大功率转速(rpm)']}<dd class="nevnoline"><span>最大功率转速：</span>{$car_config[2]['最大功率转速(rpm)']}</dd>{/if}
					{if $car_config[2]['进气形式']}<dd ><span>进气形式：</span>{$car_config[2]['进气形式']}</dd>{/if}
					{if $car_config[2]['最大马力(Ps)']}<dd class="nevnoline"><span>最大马力：</span>{$car_config[2]['最大马力(Ps)']}Ps</dd>{/if}
					{if $car_config[2]['最大功率(kW)']}<dd ><span>最大功率：</span>{$car_config[2]['最大功率(kW)']}kW</dd>{/if}
					{if $car_config[2]['最大扭矩(N·m)']}<dd class="nevnoline"><span>最大扭矩：</span>{$car_config[2]['最大扭矩(N·m)']}N·m</dd>{/if}
					{if $car_config[2]['最大扭矩转速(rpm)']}<dd ><span>最大扭矩转速：</span>{$car_config[2]['最大扭矩转速(rpm)']}rpm</dd>{/if}
					<dd class="nevnoline"></dd>

				</dl>
				<dl class="clearfix base-para">
					<dt>底盘制动</dt>			
					{if $car_config[3]['驱动方式']}<dd><span>驱动方式：</span>{$car_config[3]['驱动方式']}</dd>{/if}
					{if $car_config[3]['助力类型']}<dd class="nevnoline"><span>助力类型：</span>{$car_config[3]['助力类型']}</dd>{/if}
					{if $car_config[3]['车体结构']}<dd ><span>车体结构：</span>{$car_config[3]['车体结构']}</dd>{/if}
					{if $car_config[3]['驻车制动类型']}<dd class="nevnoline"><span>驻车制动：</span>{$car_config[3]['驻车制动类型']}</dd>{/if}
					{if $car_config[3]['前悬架类型']}<dd ><span>前悬架类型：</span>{$car_config[3]['前悬架类型']}</dd>{/if}
					{if $car_config[3]['后悬架类型']}<dd class="nevnoline"><span>后悬架类型：</span>{$car_config[3]['后悬架类型']}</dd>{/if}

				</dl>
				<dl class="clearfix neviinfo">
					<dt>
						<ul>
						{foreach $config_groups $k $v}
			                {if $k > 3}
			                	<li  class="qc-param {if $k == 4} current{/if}"><a href="javascript:;" title="点击查看配置详情">{$v}</a><span>/</span></li>
			                {/if}
		                {/foreach}

						</ul>
					</dt>
   
		    {foreach $config_groups $k $v}
			    {if $k > 3}
			    <div class="param-more {if $k != 4} dp_none{/if}">   
			            {foreach $car_config[$k] $ck $cv}
				          <dd class="param-detial ">{$ck}<span>{$cv}</span></dd>  	
			            {/foreach}
			    </div>
			    {/if} 
		    {/foreach}

				</dl>
				<div class="nevstandard">
					<p class="nevstand1"><span></span>标配</p>
					<p class="nevstand2"><span></span>选配</p>
					<p class="nevstand3"><span></span>无</p>
				</div>
			</div>
			<!-- 服务保障 -->
			<div class="nevicon nevi-service" id="nevi-service">
				<p class="nevititle"><span><i></i>guarantee</span>服务保障<strong>.....................................................................................................................</strong></p>
		        <ul>
		        	<li>
		        		<h4><span class="nevi-serv1"></span>担保交易</h4>
		        		<p>为了保障您的资金安全，快抢车支持支付宝及各大在线支付渠道，提供在线担保交易，您付款后，定金冻结在支付宝，验车确认后定金再转账给快抢车，让您放心购车。<br />
网上支付定金建议选择“支付宝付款”，享受“担保交易服务”，保障资金安全。在快抢车上支付定金使用支付宝进行支付时，是受《支付宝服务协议》交易保护条款保障的。</p>
		        	</li>
		        	<li>
		        		<h4><span class="nevi-serv2"></span>上牌无忧</h4>
		        		<p>快抢车为您提供无忧上牌服务，由上牌员约定时间陪同完成。<br />
如需自行上牌，快抢车提醒您需要带齐：购车发票、合格证原件、购置税完税证明、交强险原件、车主身份证原件（外地人员需持半年以上暂住证）等资料。</p>
		        	</li>
		        	<li>
		        		<h4><span class="nevi-serv3"></span>全国联保</h4>
		        		<p>快抢车会为您提供品牌厂商或授权经销商开具的正规发票，可享受全国联保，该品牌全国4S店都能查到您所购买的车款，凭车辆保修手册即可享受联保。</p>
		        	</li>
		        	<li>
		        		<h4><span class="nevi-serv4"></span>金融贷款</h4>
		        		<p>提出贷款请求——提交身份证审核——提供收入证明申请——选择金融产品——签订车贷合同——贷款发放——按时还贷，如需贷款，请联系快抢车客服人员。</p>
		        	</li>
		        </ul>
			</div>
			<!-- 车辆实拍 -->
			<div class="nevicon nevi-cars clearfix">
				<p class="nevititle"><span><i></i>gallery</span>车辆实拍<strong>.....................................................................................................................</strong></p>
				<div class="nevicarimg" id="nevicarimg">
								<img src="{__UPLOAD_URL__}{$ret[0]['img_file']|thumb,900x600}"/>
				</div>
				<div class="nevicar-right">
					<p class="nevi-up"><span></span></p>
					<div class="neviovh">
						<ul>
						 {foreach $ret $k $v}
							<li><img src="{__UPLOAD_URL__}{$v['img_file']|thumb,300x200}"/></li>
						{/foreach}
						</ul>
					</div>
					<p class="nevi-down"><span></span></p>
				</div>
			</div>
		</div>
		<div class="nevi-recom">
			<div class="nevire-title">
				<span>车型推荐</span><i>特价新车火热推荐！</i>
				<p><a href="javascript:;" id="hotchange">换一批</a></p>
			</div>
			<div class="nevire-list">
				<ul class="clearfix disc-list" id="hostlist">
				{foreach $hotcars $k $v}
					<li class="nevimp">
						<a href="{url:'@category-carlist-v-%d-ccbsy2-%d',$v['cc_cds_id'],$v['cc_bsy2']}" target="_blank" ><img style="width:241px;height:160px;"src="{__UPLOAD_URL__}{$v['cc_cover']|thumb,300x200}"></a>
						<div class="nevcon">
							<h3><a href="{url:'@category-carlist-v-%d-ccbsy2-%d',$v['cc_cds_id'],$v['cc_bsy2']}" target="_blank" >{$v['cc_bsy2_name']}</a></h3>
							<p class="nevire-guide">指导价：￥<span>{$v['cc_price1']}</span>万</p>
							<p class="nevire-free">优惠价：<i>￥</i><span>{$v['cc_price']}</span><i>万</i></p>
						</div>
						<!-- <div class="nevred">特价</div> -->
					</li>
					{/foreach}				
				</ul>
			</div>
		</div>
	</div>
	<!-- 隐藏导航 -->
	<div class="scroll-nav" id="scroll-nav">
		<div class="nav-center">
			<ul>
				<li><a href="#nevi-process">购车流程</a></li>
				<li><a href="#nevi-model">车型介绍</a></li>
				<li><a href="#nevi-para">参数配置</a></li>
				<li><a href="#nevi-service">服务保障</a></li>
			</ul>
			<div class="k_good"><a class='btnDC' href="javascript:;" data-url="{url:'@sale-order'}">支付定金<span>{$car_deposit}</span>元</a></div>
			<div class="tel-img"><img src="/images/calculator/tel.png" alt=""></div>
		</div>
	</div>

	<!-- 计算器模态框（Modal） -->
	<div class="modal fade in" id="calculator" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
		<div class="modal-dialog" style='width:350px'>

			<div class="modal-content">
				<div class="modals-header" style='padding:20px 15px 20px 50px;min-height:30px;color:rgb(5,5,5);background: url(http://kuaiqiangche.cn/static/images/modalsIco.png) no-repeat 28px 24px;font-size:13px;'>
					<span class='modals-carname' style='float: left;width:90%;'>
                 
             </span>
					<span class='modals-close' style='float: right;cursor: pointer;'>
                 <img style='padding-top:5px;' src='{__STATIC_URL__}images/modalsclose.png' />
             </span>
				</div>

				<div class='modals-num' style='height:45px;background:#ff3300;padding:20px 30px;'>
					<span style='float: left;height:45px;color:#FFF;font-size:14px;'>总价：</span>
					<span class='modals-total' style='font-size:40px;color:#FFF;font-weight: bold;  float: left;text-align: center;width: 248px;'></span>
				</div>

				<div class='modals-tip' style='background: rgb(51,51,51);height:30px;padding-left:30px;color:rgb(169,169,169);line-height: 30px;'>
					预估价格仅供参考，最终以实际成交价为主
				</div>
				<ul class='modals-ul' id='total_ul'>
					<li>裸车价:<span class='money'><span class='rmb'>&nbsp;</span></span>
					</li>
					<li>购置税:<span class='money'><span class='rmb'>&nbsp;</span></span>
					</li>
					<li>车船使用税:<span class='money'><span class='rmb'>&nbsp;</span></span>
					</li>
					<li>上牌费用:<span class='money'><span class='rmb'>&nbsp;</span></span>
					</li>
					<li>交强险:<span class='money'><span class='rmb'>&nbsp;</span></span>
					</li>
					<li>商业保险(预估):<span class='moneys'><span class='rmb'>&nbsp;</span></span> 
					</li>
					<li style='display: none'>运费(预估):<span class='money'></span>
					</li>
				</ul>
			</div>

		</div>
	</div>
	<!-- 右侧浮动返回顶部等 -->
	@include('layouts/float')
	
	@include('layouts/newfooter')
	
	
</body>
</html>
