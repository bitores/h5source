<div class="calcul_bottom clear">
	<div class="calculb_con">
		<div class="clear">
			<div class="messTitle">
				<div class="calculb_mail">
					<p>留下您的意向车型和联系方式</p>
					<p class="messTitleTxt">快抢车将在第一时间为您抢好车</p>
				</div>
				<p class="bottomInput">
					<input id="txt_foot_name" type="text" class="placeholder" placeholder="您的姓名"  maxlength="15" onKeyDown="if(this.value.length >= 15){ return false }">
				</p>
				<p class="bottomInput">
					<input id="txt_foot_car" type="text" class="placeholder" placeholder="请填写意向车型"  maxlength="90" onKeyDown="if(this.value.length >= 90){ return false }">
				</p>
				<p class="bottomInput">
					<input id="txt_foot_phone" type="text" class="placeholder" placeholder="您的联系方式"  maxlength="11" onKeyDown="if(this.value.length >= 11){ return false }">
				</p>
				<!-- 验证码 -->
				<p class="bottomInput codeInput">
					<!-- <input id="txt_foot_code" type="text" class="placeholder" placeholder="验证码"> -->
					<input type="tel" name="user[user_verify]" id="user_verify" placeholder="" maxlength="4" class="placeholder yz-code verify"  />
					<a href="javascript:;" data-url="{url:'@misc-sms-mobile-~'}" data-id="imgcode" class="get-sms-verify-b" id="code-dialog-btn" >获取验证码</a>
				</p>
				<p class="postBtn">
					<input class='btn_post' onclick="getInfo()" type="button" value="确定发送" />
				</p>
			</div>
			<div class="bottomBox" >
				<p class='about_logo'><img src="/images/about.png" /></p>
				<p class='about_line'>--------------------------------------------------------------</p>
				<p>快抢车隶属于磁锋网络科技（杭州）有限公司，公司致力于打造全国最值得消费者信赖的互联网汽车销售金融服务平台，集厂商直供新车、汽车金融服务为一体，为消费者提供最便捷的购车服务和汽车金融解决方案。</p>
				<p class="postBtn">
					<input onclick="location.href='{url:'@page'}'" type="button" value="查看详情 +" />
				</p>
			</div>
			<div class="calculb_us">
				<p class="calculb_pay"><img src="/images/calculator/code.jpg"/></p>
				<div class="weixin">
					<p class="wx_wel">欢迎关注快抢车微信号</p>
					<p class="wx_name">kuaiqiangche</p>
				</div>
				<div class="weibo"><a target='_blank' href='http://weibo.com/p/1006065496620099/home'>快抢车官方微博</a></div>
			</div>
		</div>
		<div class="calculb_link">
			{if $link}
			友情链接 : {foreach $link $k $v}
			<a href='{$v['url']}' title="{$v['name']}" target="_blank"  {if  $v['nofollow'] ==1 } rel="nofollow" {/if} >{$v['name']}</a> {/foreach}
			{/if}
			<br />
			<a>磁锋网络科技（杭州）有限公司</a>
			<!--<a>南京磁宁网络科技有限公司</a><br />
			<a>南京地址：南京市秦淮区中山东路300号长发中心B栋16楼1607 电话：025-82216523</a>-->
		</div>
	</div>
</div>
<div class="calcul_footer">
地址：浙江省杭州市西湖区紫荆花路2号联合大厦B座11楼&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;公司邮箱：service@kuaiqiangche.com
<br>
	工信部备案号：浙ICP备15043579号-2 COPYRIGHT © 2015,KUAIQIANGCHE.COM ALL RIGHTS RESERVED
</div>
<div id='cnzz_id' style='background:#2a2a2a;'></div>
<div id='footer_box_message' style='width:100%;height:50px;position:fixed;bottom:20%;z-index:99999;display:none;'><div style='margin:0 auto;width:200px;height:50px;line-height:50px;color:#333;background:#FFF;text-align:center;opacity:1;'>提交成功</div></div>
<script>
	var footapi='{url:'@index-form'}';
</script>
<script type="text/javascript" src="/js/footer.js">
	
</script>
<div style="display:none">
    <img src='http://pmp.insigrid.com/crowds/retag?v=1&v_id=10068&z_id=B0805C6C-DE4E-0EBE-B180-3B4C356A790F' />
</div>
<script type="text/javascript">
var cnzz_protocol = (("https:" == document.location.protocol) ? " https://" : " http://");
document.getElementById('cnzz_id').innerHTML=unescape("%3Cspan id='cnzz_stat_icon_1254581010'%3E%3C/span%3E%3Cscript src='" + cnzz_protocol + "s11.cnzz.com/z_stat.php%3Fid%3D1254581010%26show%3Dpic' type='text/javascript'%3E%3C/script%3E");
document.write(unescape("%3Cspan id='cnzz_stat_icon_1254581010'%3E%3C/span%3E%3Cscript src='" + cnzz_protocol + "s11.cnzz.com/z_stat.php%3Fid%3D1254581010%26show%3Dpic' type='text/javascript'%3E%3C/script%3E"));
</script>
<script language="javascript" src="http://dft.zoosnet.net/JS/LsJS.aspx?siteid=DFT46190010&lng=cn"></script>