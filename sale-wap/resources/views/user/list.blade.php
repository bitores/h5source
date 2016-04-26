<ul ng-controller="ListController">
    <li ng-repeat="lists in list">
        <a ng-href="@{{lists.href}}" ng-bind="lists.name"></a>
    </li>
</ul>