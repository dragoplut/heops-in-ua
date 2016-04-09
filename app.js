'use strict';

var myApp = angular.module('myApp', [
      'ui.router',
      'ngDialog',
      'myApp.dataCykle',
      'myApp.floorOne',
      'myApp.floorTwo'
    ]);


myApp.config(['$stateProvider', '$urlRouterProvider',
    function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/main');
        $stateProvider
            .state('main', {
                //abstract: true,
                url: '/main',
                templateUrl: 'shared/layout.html',
                controller: ['$scope', function ($scope) {

                }]
            });
    }
]);

myApp.run(['$rootScope', '$state', '$stateParams',
    function ($rootScope, $state, $stateParams) {
        console.info('myApp.run');
    }
]);