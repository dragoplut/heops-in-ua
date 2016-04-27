'use strict';

angular.module('myApp.floorTwo', ['ui.router'])
    .config(['$stateProvider', function ($stateProvider) {
      $stateProvider
          .state('floor-two', {
            url: '/floor-two',
            templateUrl: 'floortwo/floortwo.html',  // heops-in-ua/
            controller: 'FloorTwoController',
            controllerAs: 'floorTwo'
          })
    }])
    .controller('FloorTwoController', [function () {
      var self = this;
      self.header = 'Floor Two';
      //console.info(self.header);
    }]);
