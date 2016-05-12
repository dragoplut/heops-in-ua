'use strict';

angular.module('myApp', [
      'ui.router',
      'ngDialog',
      'uiSwitch',
      'toaster',
      'ngAnimate',
      'restangular',
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
              controller: ['$scope', '$location', 'dataService', function ($scope, $location, dataService) {
                $scope.historyLog = dataService.historyLog;
                $scope.bigImg = 'assets/img/Var_1.png';
                $scope.title1 = '3D план будинку.';
                $scope.title2 = 'Андрій і Олександр зі щукою.';
                $scope.title = $scope.title1;
              }]
            });
        //$locationProvider.html5Mode({
        //  enabled: true,
        //  requireBase: false
        //});
      }
    ])

    .config(function (RestangularProvider) {
      RestangularProvider.setBaseUrl('https://heops-smart-home.herokuapp.com/');

      RestangularProvider.addResponseInterceptor(function (data, operation, what, url, response) {
        return response.data.data;
      });

      RestangularProvider.setRestangularFields({
        id: "_id",
        route: "restangularRoute",
        selfLink: "self.href"
      });
    })


    .run(['$rootScope', '$state', '$stateParams',
      function ($rootScope, $state, $scope, $stateParams) {
        //console.info('myApp.run');
      }
    ]);

angular.module('myApp.services', []);
angular.module('myApp.directives', []);