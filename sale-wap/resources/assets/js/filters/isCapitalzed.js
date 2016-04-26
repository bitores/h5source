define(['zepto', 'angular'], function (nnd, angular) {
    //过滤器
    function isCapitalzed() {
//		console.log(str);
        return function (str) {
            console.log(str)
            console.log(typeof str)
            str = '过滤器';
            return str
        }
    };
    
    return isCapitalzed;
}); 