
<div ng-controller="ClassController">
    <div ng-class="{c_color1:type.c1, c_color2:type.c2}">@{{text}}</div>
    <button ng-click="c1()">c1</button>
    <button ng-click="c2()">c2</button>
</div>