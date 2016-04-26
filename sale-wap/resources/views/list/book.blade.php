<div ng-controller="BookController">
    <div class="list">list</div>
    <div ng-repeat="book in books">
        <span>@{{text}}</span>
        <span>@{{book.number | currency}}</span>
        <span>@{{book.id}}</span>
    </div>
    <div>
        <button ng-click="remove($index)">remove</button>
    </div>
</div>