@extends('layouts.layout')

<!-- 返回模板数据 -->
@section('filename', 'user')
@section('htmlname', 'user_order')


<!-- 定义子页面 -->
@section('sidebar')
    @parent
    <p>模板</p>
@endsection

<!-- 定义子模板 -->
@include('login')


@section('content')
    <!-- 路由推送到前端数据 -->
    <p>{{$name}}</p>
@endsection
