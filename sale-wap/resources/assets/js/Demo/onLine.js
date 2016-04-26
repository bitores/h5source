(function(){
var network = function(){
    var monitor = this;
     
    /**
     * @param {Funcation} speedInterval
     */
    var speedInterval = null;
    /**
     * @param {Function} networkInterval
     */
    var networkInterval = null;
    /**
     * @param {Function} reNetworkInterval
     */
    var reNetworkInterval = null;
    var time = 5000;
      
    /**
     * 获取网络连接状态
     */
    var getConnectState = function(){
        return navigator.onLine ? 1 : 0;
    }; 
    /**
     * 网络中断
     */
    var disconnect = function(){
        // TODO ... 
        console.log("网速中断");
        window.clearInterval(reNetworkInterval);
        reNetworkInterval = null;
         
        endSpeed();
        endNetwork();
         
        window.setTimeout(function(){
            reNetworkInterval = window.setInterval(function(){
                if (getConnectState() == 1) {
                    window.clearInterval(reNetworkInterval);
                    reNetworkInterval = null;
                    startSpeed();
                    startNetwork();
                } else {
                    window.clearInterval(reNetworkInterval);
                    reNetworkInterval = null;
                    disconnect();
                }
            }, time);
        }, 2 * time);
    };
 
    /**
     * 网络速度
     */
    var speed = {
            /**
             * 网速过慢
             */
            bad : function(){
                 
                                // TODO ... 
                console.log("网速过慢");
                 
                window.setTimeout(function(){
                    if(getConnectState() == 1) {
                        window.clearInterval(networkInterval);
                        networkInterval = null;
                        startSpeed();
                    } else {
                        disconnect();
                    }
                }, 2 * time);
            },
            /**
             * 网速中等
             */
            medium : function(){
                                // TODO ... 
                console.log("网速中等");
            },
            /**
             * 网速极佳
             */
            great : function(){
                                // TODO ... 
                console.log("网速极佳");
            }
    };
     
    /**
     * 开启速度监测
     * @private
     */
    var startSpeed = function(){
         
        window.clearInterval(speedInterval);
        speedInterval = null;
        if(getConnectState() == 1) {
            speedInterval = window.setInterval(function(){
                var start = new Date().getTime();
                if (getConnectState() == 1) {
                    var img = document.getElementById("networkSpeedImage");
                    if (!!!img) {
                        img = document.createElement("IMG");
                        img.id = "networkSpeedImage";
                        img.style.display = "none";
                        document.body.appendChild(img);
                    }
                     
                    try {
                        img.src = "http://www.baidu.com/img/baidu_jgylogo3.gif?_t=" + new Date().getTime();
                        img.onload = function(){
                            var end = new Date().getTime();
                            var delta = end - start;
                            if (delta > 200) {
                                speed.bad();
                            } else if (delta > 100) {
                                speed.medium();
                            } else {
                                speed.great();
                            }
                        };
                    } catch(e){
                        speed.bad();
                    }
                } else {
                    // TODO 网络断开
                    disconnect();
                }
            }, time);
        }else {
            // TODO 网络断开
            disconnect();
        }
    };
     
    /**
     * 停止速度监测
     * @private
     */
    var endSpeed = function(){
        window.clearInterval(speedInterval);
        speedInterval = null;
    };
     
    /**
     * 开启网络连接监测
     * @private
     */
    var startNetwork = function(){
        if (getConnectState() == 1) {
            networkInterval = window.setInterval(function(){
                if (getConnectState() == 0) {
                    disconnect();
                }
            }, time);
        } else{
            disconnect();
        }
    };
     
    /**
     * 结束网络连接监测
     * @private 
     */
    var endNetwork = function(){
        window.clearInterval(networkInterval);
        networkInterval = null;
    };
    /**
     * 网络监控开始
     */
    this.start = function(){
        startNetwork();
        startSpeed();
    };
    /**
     * 停止网络监控
     */
    this.stop = function(){
        endSpeed();
        endNetwork();
    };
};
     window.network = new network();
}).call(this);
 
 
// 调用的时候,直接调用network.start();
