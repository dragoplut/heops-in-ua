'use strict';

angular.module('myApp.dataCycle', ['ui.router', 'uiSwitch', 'toaster', 'ngAnimate'])
    .config(['$stateProvider', function ($stateProvider) {
      $stateProvider
          .state('data-cycle', {
            url: '/data-cycle',
            templateUrl: 'datacycle/datacycle.html', // heops-in-ua/
            controller: 'DataCycleController',
            controllerAs: 'dataCycle'
          })
    }])
    .controller('DataCycleController', function (toaster, dataService) {
      var self = this;
      self.header = 'Data Cycle';
      self.activeEvent = false;
      self.historyLog = dataService.historyLog();

      init();

      function init() {
        dataService.eventsList().then(function done(response) {
          self.evetsList = response;
        });
      }

      self.testToaster = function () {
        toaster.pop({
          type: 'info',
          title: 'Toaster',
          body: 'Testing some text',
          showCloseButton: true
        });
      }

    });
