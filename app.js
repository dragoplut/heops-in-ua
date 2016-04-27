'use strict';

angular.module('myApp', [
      'ui.router',
      'ngDialog',
      'uiSwitch',
      'toaster',
      'ngAnimate',
      'myApp.services',
      'myApp.directives',
      'myApp.dataCycle',
      'myApp.floorOne',
      'myApp.floorTwo'
    ])

    .config(['$stateProvider', '$urlRouterProvider', '$locationProvider',
      function ($stateProvider, $urlRouterProvider, $locationProvider) {
        $urlRouterProvider.otherwise('/main');
        $stateProvider
            .state('main', {
              //abstract: true,
              url: '/main',
              templateUrl: 'shared/layout.html', // heops-in-ua/
              controller: ['$scope', 'dataService', function ($scope, dataService) {
                $scope.historyLog = dataService.historyLog;
              }]
            });
        //$locationProvider.html5Mode({
        //  enabled: true,
        //  requireBase: false
        //});
      }
    ])

    .run(['$rootScope', '$state', '$stateParams',
      function ($rootScope, $state, $stateParams) {
        console.info('myApp.run');
      }
    ]);

angular.module('myApp.services', []);
angular.module('myApp.directives', []);