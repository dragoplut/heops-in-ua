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
    .controller('FloorTwoController', function (dataService) {
      var self = this;
      self.header = 'Другий поверх.';

      init();

      function init() {
        dataService.eventsList().then(function done(response) {
          self.eventsList = response;
        });
      }

      //console.info(self.header);
    });
