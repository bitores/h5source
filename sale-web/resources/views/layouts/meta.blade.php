<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<title>{if !empty($_sconfig['title'])}{$_sconfig['title']}{else}{:join('_', $_stitle)}{/if}</title>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta http-equiv="X-UA-Compatible" content="IE=Edge,chrome=1" />
<meta name="renderer" content="webkit" />
{if $_SERVER["REQUEST_URI"] == '/' || $_SERVER["REQUEST_URI"] == '' }
<meta name="keywords" content="{$_sconfig['key']}" />
<meta name="description" content="{$_sconfig['desc']}"/>
{else}
<meta name="keywords" content="{if !empty($_sconfig['title'])}{$_sconfig['title']}{else}{:join('_', $_stitle)}{/if}" />
<meta name="description" content="{if !empty($_sconfig['title'])}{$_sconfig['title']}{else}{:join('_', $_stitle)}{/if}"/>
{/if}
<meta name="apple-mobile-web-app-capable" content="yes" />
<meta name="apple-mobile-web-app-status-bar-style" content="black" />
<meta name="format-detection" content="telephone=no, email=no">
<meta http-equiv="x-dns-prefetch-control" content="on" />
<link rel="stylesheet" type="text/css" href="/css/common.css">
<link href="{__STATIC_URL__}images/kqc.ico?201508142" type="image/x-icon" rel="icon" /> 
<link href="{__STATIC_URL__}images/kqc.ico?201508142" type="image/x-icon" rel="shortcut icon" />
<script type="text/javascript" src="/js/lib/webconfig.js"></script>
<script src="js/lib/require.js" defer async="true" data-main="js/index.js" charset="utf-8"></script>
<script type="text/javascript" src="/js/lib/jquery.min.js"></script>
<script type="text/javascript" src="/js/lib/jquery.lazyload.min.js?{_CACHE_VER_}"></script>
<script type="text/javascript" src="/js/common2.js?{_CACHE_VER_}"></script>
<script type="text/javascript" src="/js/common.js?{_CACHE_VER_}"></script>