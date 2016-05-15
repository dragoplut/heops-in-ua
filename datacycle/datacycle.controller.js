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
    .controller('DataCycleController', function ($q, toaster, dataService) {
      var self = this;
      self.header = 'Події та пристрої.';
      self.activeEvent = false;
      self.historyLog = dataService.historyLog();
      self.showForm = false;

      self.showUsers = function () {
        dataService.getUsers().then(function done(response) {
          console.log('showUsers: ', response);
        }).catch(function (err) {
          console.log('err: ', err);
          $q.reject(err);
        });
      };

      self.changeEventStatus = function (updatedEvent) {
        if (!updatedEvent) {
          return $q.reject();
        }
        dataService.updateEvent(updatedEvent).then(function done(resp) {
          getEvents();
          return resp;
        }).catch(function (err) {
          return err;
        });
      };

      self.setUnsetLocation = function (device, locationId) {
        if (device.parentLocationId) {
          device.parentLocationId = false;
        } else {
          device.parentLocationId = locationId;
        }
      };

      self.updateForm = function (eventId) {
        if (!eventId || self.showForm === eventId) {
          self.showForm = false;
        } else {
          self.showForm = eventId;
        }
      };

      init();

      function init() {
        getEvents();
        getDevices();
      }

      function getEvents () {
        dataService.getEvents().then(function done(response) {
          self.evetsList = response;
          self.locationId = self.evetsList[0]._id;
        });
      }

      function getDevices () {
        dataService.getDevices().then(function done(response) {
          self.devicesList = response;
        })
      }

    });
