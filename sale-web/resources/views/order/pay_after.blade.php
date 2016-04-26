<!--{include common/meta_dialog.tpl.html}-->
<link rel="stylesheet" type="text/css" href="{__CTPL_URL__}css/common.css">
<script> 
    $(function(){
        setTimeout(function(){
            api.size(460, 230);
        }, 10);

        <!-- {完成支付} -->
        $('#pay_suc').on('click',function(){
            parent.location.reload();
            $('#dialog-close-btn').trigger('click');
        });

        <!-- {重新选择} -->
        $('#re_choose').on('click',function(){
            $('#dialog-close-btn').trigger('click');
        });
    });
</script>
<style>
.pay-popup{
    width:460px;
    height: 230px;
    background-color: #fff;
    position: relative;
}
.popup-middle{
    width:300px;
    margin: 0 auto;
    padding-top: 60px;
}
.remind{
    margin: 0px auto 30px auto;
    color:#999;
}
.remind i{
    width:44px;
    height: 45px;
    background: url({__CTPL_URL__}images/new_index.png) -66px -556px no-repeat;
    display: inline-block;
    vertical-align: middle;
    float: left;
    margin-right: 20px;
}
.remind h2{
    font-size:22px;
    color:#ff3300;
    padding-bottom: 5px;
}
.popup-btn a{
    width: 130px;
    height: 40px;
    line-height: 40px;
    border-radius: 5px;
    color:#fff;
    text-align: center; 
    background-color: #ccc;
    display: inline-block;
    margin-left: 12px;
    font-size:15px;
}
.popup-btn a.active{
    background-color: #ff3300;
}
</style>
</head>
<body style="background:#fff">
<!--{include common/header_dialog.tpl.html}-->
<div style="width:460px;height: 230px;overflow: hidden;">
    <div class="pay-popup">
        <i class="icon-times-circle-c " title="关闭" id="dialog-close-btn"></i>
        <div class="popup-middle">
            <div class="remind">
                <i></i>
                <h2>请在新页面上完成付款</h2>
                <p>付款前请不要关闭该窗口</p>
            </div>
            <div class="popup-btn">
                <a href="javascript:;" class="active" id="pay_suc" title="已完成付款" >已完成付款</a>
                <a href="javascript:;" title="重新选择" id="re_choose">重新选择</a>
            </div>
        </div>
    </div>
</div>
<!--{include common/footer_dialog.tpl.html}-->
