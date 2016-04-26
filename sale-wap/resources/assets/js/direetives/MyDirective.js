define(['zepto', 'angular'], function (nnd, angular) {
    
     //过滤器
    function MyDirective() {
        return{
            trstrict:'E',
            template:'<a href="http://google.com">click me to go to Google</a>'
        }
    };
    
    return MyDirective;
    
});