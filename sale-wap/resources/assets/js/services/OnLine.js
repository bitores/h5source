define(['zepto','angular','angular-route','angular-resource'
    ], function (nnd, angular,angular_route,angular_resource) {
    
    var ONLINE,                 //网络是否连接
        IMG_SISE;               //根据网络给出的默认尺寸
        
    //判断当前网络是否连接
    function isOnLine() {
        if(typeof navigator.onLine != "undefined"){
            ONLINE = (navigator.onLine == true ? true : false)
            alert(ONLINE); 
        }
        
    }
    isOnLine();
         
         
    //根据网速 设定不同网络状态下的图片加载大小
    function isWifi(params) {
        var start = new Date().getTime();
        if(ONLINE == true){
            var img = new Image();
            // var img = document.createElement("IMG");
            // img.id = "isWifi";
            // img.style.display ="none";
            img.src = "/favicon.ico?v=" + new Date().getTime();
            img.onload = function (){
                var end = new Date().getTime();
                var delet = end - start;
                if (delta > 200) {
                    //网速差
                    IMG_SISE = IMG_3G_SISE;
                } else if (delta > 100) {
                    //网速一般
                    IMG_SISE = IMG_4G_SISE;
                } else {
                    //网速快
                    IMG_SISE = IMG_WIFI_SISE;
                }
            };
        }else{
            //如果无法
            IMG_SISE = IMG_4G_SISE;
        }
    }
    
    return {
        
    };
});