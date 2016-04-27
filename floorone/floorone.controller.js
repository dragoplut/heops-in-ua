'use strict';

angular.module('myApp.floorOne', ['ui.router'])
    .config(['$stateProvider', function ($stateProvider) {
      $stateProvider
          .state('floor-one', {
            url: '/floor-one',
            templateUrl: 'floorone/floorone.html',  // heops-in-ua/
            controller: 'FloorOneController',
            controllerAs: 'floorOne'
          })
    }])
    .controller('FloorOneController', [function () {
      var self = this;
      self.header = 'Floor One';
      //console.info(self.header);
    }]);
