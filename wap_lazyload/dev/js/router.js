define([], function(){
    return {
        defaultRoutePath: '/',
        routes: {
            '/': {
                templateUrl: '/index/V',
                dependencies: [
                    'js/controller/indexCtrl'
                ]
            },
            '/index': {
                templateUrl: '/index2/V',
                dependencies: [
                    'js/controller/indexCtrl2'
                ]
            },
            '/index.html': {
                templateUrl: '/index3/V',
                dependencies: [
                    'js/controller/indexCtrl3'
                ]
            },

            '/error/404': {
                templateUrl: '/error/404/V',
                dependencies: [
                    'js/controller/ErrorController'
                ]
            },
            '/error/500': {
                templateUrl: '/error/500/V',
                dependencies: [
                    'js/controller/ErrorController'
                ]
            }
        }
    };
});