@extends('layouts.layout')

@section('content')
    <body>
        <div ng-controller="KqcController">
            <div class="loding">
                <img src="/loading.gif?imageView2/2/q/90/w/200" />
            </div>
            <div ng-view></div>
        </div>
    </body>
@endsection