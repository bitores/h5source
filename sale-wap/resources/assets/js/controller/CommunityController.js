//社区
define(['zepto','angular','angular-route','angular-resource'
], function (nnd,angular,angular_route,angular_resource
) {

    //注释对应控制器作用
    function CommunityController($scope,Community){

        //数据静态化处理

        /* 文章相关 */
        var num=20;
        Community.Getcategory(num).then(function (data) {
            console.log(data);
        }, function (data) {
            console.log(data);
        });
        /* 文章列表 */
        Community.Gettable(num).then(function (data) {
            console.log(data);
        }, function (data) {
            console.log(data);
        });
        /* 文章详情 */
        var id=16;
        Community.Getdetail(id).then(function (data) {
            console.log(data);
        }, function (data) {
            console.log(data);
        });
    }

    return CommunityController;
});