'use strict';

var myApp = angular.module('myApp', [
  'ui.router',
  'ngDialog',
  'myApp.dataCykle',
  'myApp.floorOne',
  'myApp.floorTwo'
]);


myApp.config(['$stateProvider', '$urlRouterProvider', '$locationProvider',
  function ($stateProvider, $urlRouterProvider, $locationProvider) {
    $urlRouterProvider.otherwise('/main');
    $stateProvider
        .state('main', {
          //abstract: true,
          url: '/main',
          templateUrl: 'shared/layout.html', // heops-in-ua/
          controller: ['$scope', function ($scope, dataCykle) {
            $scope.historyLog = dataCykle.historyLog;
          }]
        });
    //$locationProvider.html5Mode({
    //  enabled: true,
    //  requireBase: false
    //});
  }
]);

myApp.run(['$rootScope', '$state', '$stateParams',
  function ($rootScope, $state, $stateParams) {
    console.info('myApp.run');
  }
]);