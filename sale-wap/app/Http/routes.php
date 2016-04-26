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

//wap 首页
Route::get('/', "HomeController@index");
Route::get('/show',"HomeController@index");
Route::get('/book',"HomeController@index");
Route::get('/class',"HomeController@index");
Route::get('/list',"HomeController@index");
Route::get('/search',"HomeController@index");



Route::get('/show/V',function () {
    return view('/list/show');
});
Route::get('/book/V',function () {
    return view('/list/book');
});
Route::get('/class/V',function () {
    return view('/list/class');
});
Route::get('/list/V',function () {
    return view('/list/list');
});
Route::get('/index/V',function () {
    return view('/index/index');
});
Route::get('/search/V',function () {
    return view('/search/search');
});
Route::get('/brSearch/V',function () {
    return view('/brSearch/brSearch');
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
