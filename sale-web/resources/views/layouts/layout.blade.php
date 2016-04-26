<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>首页</title>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="baidu-site-verification" content="OVUcJQ9QEo" />
    <meta name="viewport" content="width=device-width,user-scalable=no, initial-scale=1">
    <meta name="apple-touch-fullscreen" content="yes">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black">
    <meta name="format-detection" content="telephone=no,date=no">
    <link rel="shortcut icon" href="/plug/image/favicon.ico">
    <link rel="stylesheet" type="text/css" href="css/comm.css" />
    <link rel="stylesheet" type="text/css" href="css/@yield('htmlname').css" />
    <script src="js/lib/webconfig.js"></script>
    <script src="js/lib/require.js" defer async="true" data-main="js/@yield('filename')/@yield('htmlname').js" charset="utf-8"></script>
    
</head>
<body>
    @section('sidebar')
    @show


    @yield('content')
</body>
</html>
