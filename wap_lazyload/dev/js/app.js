define(['router','loading'], function (router,loading) {
    function dependencyResolverFor(dependencies) {
        var definition = {
            resolver: ['$q','$rootScope', function($q, $rootScope) {
                var deferred = $q.defer();

                require(dependencies, function() {
                    $rootScope.$apply(function() {
                        deferred.resolve();
                    });
                });

                return deferred.promise;
            }]
        }

        return definition;
    }

    var app = angular.module('app', ['ngRoute', "ngResource", "ngAnimate", "ngMessages", "ngCookies"]);

    // console.log(Filters);
    app.service('loading',loading);

    app.config(function($routeProvider, $locationProvider, $controllerProvider, $compileProvider, $filterProvider, $provide, $httpProvider) {
        app.controller = $controllerProvider.register;
        app.directive  = $compileProvider.directive;
        app.filter     = $filterProvider.register;
        app.factory    = $provide.factory;
        app.service    = $provide.service;

        $locationProvider.html5Mode(true);

        if(router.routes !== undefined) {
            angular.forEach(router.routes, function(route, path) {
                $routeProvider.when(path, {templateUrl:route.templateUrl, resolve:dependencyResolverFor(route.dependencies)});
            });
        }

        if(router.defaultRoutePaths !== undefined) {
            $routeProvider.otherwise({redirectTo:router.defaultRoutePaths});
        }

        $httpProvider.interceptors.push('loading')
    });

   return app;
});