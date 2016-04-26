define(['zepto','angular','angular-route','angular-resource'
    ], function (nnd,angular,angular_route,angular_resource
    ) {

    //注释对应控制器作用
    function ListController($scope,Index,Community){

        // var datas = GetCatList.Getparams().data.tickets;
        
        // Index.GethotBbsa().then(function(params){
        //     console.log(params)
        //     $scope.text = params;
        // },function() {
        //     console.log(params)
        // })
   
        // console.log(GetCatList.Getparams())
        // console.log(GetCatList.Getparams().data.tickets)
        Index.GethotBbs().then(function(params){
            console.log(params)
            $scope.text = params;
        },function() {
            console.log(params)
        })
        //Help.Gethelp().then(function(params){
        //    console.log(params)
        //    $scope.text = params;
        //},function() {
        //    console.log(params)
        //})

        //var source="f2ds23",path="www.baidu.com",user_agent="即可我",channel="fjdsl",client_type="djslfjlds",access_token="djsljfldksjflajslfs";
        //Community.Getcountinfo(source,path,user_agent,channel,client_type,access_token).then(function (data) {
        //    console.log(data);
        //}, function (data) {
        //    console.log(data);
        //})
        //Community.Getmyorder().then(function (data) {
        //    console.log(data);
        //}, function (data) {
        //    console.log(data);
        //})
        //Community.Addorder().then(function (data) {
        //    console.log(data);
        //}, function (data) {
        //    console.log(data);
        //});
        //var car_id=6;
        //Community.Getitembaseinfo(car_id).then(function (data) {
        //    console.log(data);
        //}, function (data) {
        //    console.log(data);
        //});
        //var car_id=6;
        //Community.Getitemplayimg(car_id).then(function (data) {
        //    console.log(data);
        //}, function (data) {
        //    console.log(data);
        //});
        //Community.Getdeallog().then(function (data) {
        //    console.log(data);
        //}, function (data) {
        //    console.log(data);
        //});
        //var car_id=1;
        //Community.Getitemparam(car_id).then(function (data) {
        //    console.log(data);
        //}, function (data) {
        //    console.log(data);
        //});
        //var pid=0;
        //Community.Getcargetgory(pid).then(function (data) {
        //    console.log(data);
        //}, function (data) {
        //    console.log(data);
        //});

          $scope.list = [
              {
                  name:"index",
                  href:"/"
              },
              {
                  name:"show",
                  href:"/show"
              },
              {
                  name:"book",
                  href:"/book"
              },
              {
                  name:"class",
                  href:"/class"
              },
          ]
    }

    return ListController;
});