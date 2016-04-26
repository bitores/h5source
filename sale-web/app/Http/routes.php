<?php

/*
|--------------------------------------------------------------------------
| Routes File
|--------------------------------------------------------------------------
|
| Here is where you will register all of the routes in an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

//首页
Route::get('/', function () {
    return view('index',['name' => 'lin','STATIC_URL' => 'http://static.kuaiqiangche.com/static','UPLOAD_URL' => 'http://static,kuaiqiangche.com/data/attachment']);
});

//DEMO
Route::get('/demo', function () {
    return view('demo',['name' => 'lin']);
});

//注册登录
Route::get('/login', function () {
    return view('login');
});

/* 车辆信息(品牌选车) */
Route::get('/car', function () {
    return view('car/index');
});
//车辆列表
Route::get('/car/car_list', function () {
    return view('car/car_list');
});
//车辆详情
Route::get('/car/car_details', function () {
    return view('car/car_details');
});

/* 用戶中心 */
//用戶中心
Route::get('/user/user_order', function () {
    return view('user/user_order');
});

/* 下訂單 */
//下訂單
// ---提交订单
Route::get('/order', function () {
    return view('order/order_1');
});
// ---确认订单
Route::get('/order/order_2', function () {
    return view('order/order_2');
});
// ---选择支付方式
Route::get('/order/order_3', function () {
    return view('order/order_3');
});
// ---支付成功
Route::get('/order/success', function () {
    return view('order/success');
});


/* 车友社区 原新车咨询*/
//社区首页
Route::get('/community', function () {
    return view('community/index');
});
//社区列表
Route::get('/community/list', function () {
    return view('community/list');
});
//社区详情
Route::get('/community/view', function () {
    return view('community/view');
});

//测试
/* 帮助中心 */
//帮助中心
Route::get('/help', function () {
    return view('help/help');
});



/* 关于我们 */
//招商合作
Route::get('/about/cooperation', function () {
    return view('about/cooperation');
});
//服務保險
Route::get('/about/insurance', function () {
    return view('about/insurance');
});
//比價
Route::get('/about/price', function () {
    return view('about/price');
});


/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| This route group applies the "web" middleware group to every route
| it contains. The "web" middleware group is defined in your HTTP
| kernel and includes session state, CSRF protection, and more.
|
*/

Route::group(['middleware' => ['web']], function () {
    //
});

Route::group(['middleware' => 'web'], function () {
    Route::auth();

    Route::get('/home', 'HomeController@index');
});

Route::group(['middleware' => 'web'], function () {
    Route::auth();

    Route::get('/home', 'HomeController@index');
});
