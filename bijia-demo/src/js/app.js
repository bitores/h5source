define(["angular",
        'mainController',
        'mainDirective'
       ],function(angular){
    return angular.module("webapp",['ui.router','ngStorage','ngSanitize','webapp.controllers','webapp.directive']);
})