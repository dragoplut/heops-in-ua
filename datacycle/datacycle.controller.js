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
    .controller('DataCycleController', function ($q, ngDialog, toaster, dataService) {
      var self = this;
      self.header = 'Події та пристрої.';
      self.title = {
        edit: 'Форма редагування',
        create: 'Форма створення'
      };
      self.activeEvent = false;
      self.changedDevices = [];
      self.historyLog = dataService.historyLog();
      self.showForm = false;
      self.showOptions = false;

      self.showUsers = function () {
        dataService.getUsers().then(function done(response) {
          console.log('showUsers: ', response);
        }).catch(function (err) {
          console.log('err: ', err);
          $q.reject(err);
        });
      };

      self.saveUpdatedData = function (updatedEvent) {
        dataService.updateEvent(updatedEvent).then(function done(resp) {
          updateDevices().then(function (resp) {
            self.cancelEdit();
            toaster.pop({
              type: 'success',
              title: 'Готово',
              body: 'Зміни по "' + updatedEvent.title + '" та його пристроях додано в базу!',
              showCloseButton: true
            });
          }).catch(function () {
            toaster.pop({
              type: 'error',
              title: 'Сталась прикра помилка',
              body: 'Зміни по "' + updatedEvent.title + '" та його пристроях НЕ додано!',
              showCloseButton: true
            });
          });
          return resp;
        }).catch(function (err) {
          return err;
        });
        function updateDevices () {
          var defer = $q.defer();
          if (self.changedDevices.length) {
            for (var i = 0; i < self.changedDevices.length; i++) {
              dataService.updateDevice(self.changedDevices[i]).then(function done(resp) {
                if (i === self.changedDevices.length) {
                  defer.resolve(resp);
                }
              }).catch(function (err) {
                return defer.reject(err)
              });
            }
          }
          return defer.promise;
        }
      };

      self.changeEventDevicesStatus = function (event) {
        for (var i = 0; i < self.devicesList.length; i++) {
          for (var k = 0; k < event.devicesId.length; k++) {
            if (self.devicesList[i]._id === event.devicesId[k]) {
              self.devicesList[i].status = event.status;
              var isChanged = false;
              for (var m = 0; m < self.changedDevices.length; m++) {
                if (self.changedDevices[m]._id === event.devicesId[k]) {
                  self.changedDevices[m] = self.devicesList[i];
                  isChanged = true;
                }
              }
              if (!isChanged) {
                self.changedDevices.push(self.devicesList[i]);
              }
            }
          }
        }
        self.activeEvent = event;
        console.log('self.changedDevices', self.changedDevices);
      };

      self.setUnsetLocation = function (device, event) {
        console.log(event.title, device.title, event);
        for (var i = 0; i < self.changedDevices.length; i++) {
          if (self.changedDevices[i]._id == device._id) {
            self.changedDevices.splice(i, 1);
          }
        }
        if (device.parentLocationId) {
          device.parentLocationId = false;
          device.status = false;
          for (var k = 0; k < event.devicesId.length; k++) {
            if (event.devicesId[k] === device._id) {
              event.devicesId.splice(k, 1);
            }
          }
        } else {
          device.parentLocationId = event._id;
          device.status = event.status;
          event.devicesId.push(device._id);
        }
        self.changedDevices.push(device);
        console.log(self.changedDevices);
      };

      self.updateForm = function (event) {
        if (!event || self.showForm === event._id) {
          self.showForm = false;
          self.activeEvent = false;
        } else {
          self.showForm = event._id;
          self.activeEvent = event;
        }
      };

      self.editEventDialog = function (event, title) {
        self.activeEvent = event;
        ngDialog.open({
          template: 'datacycle/datacycle-edit-event.dialog.html',
          className: 'ngdialog-theme-default edit-event-dialog',
          controller: ['$scope', function ($scope) {
            $scope.title = title;
            $scope.event = event;
            $scope.devicesList = self.devicesList;
            $scope.setUnsetLocation = function (device, activeEvent) {
              self.setUnsetLocation(device, activeEvent);
            };
            $scope.confirm = function () {
            };
            $scope.cancelEdit = function () {
              self.cancelEdit();
            }
          }]
        });
      };

      self.removeEventDialog = function (event) {
        ngDialog.open({
          template: 'shared/ok-cancel.dialog.html',
          className: 'ngdialog-theme-default',
          controller: ['$scope', function ($scope) {
            $scope.title = 'Ви справді хочете видалити "' + event.title + '"?';
            $scope.confirm = function () {
              dataService.removeEvent(event._id).then(function done() {
                self.cancelEdit();
                toaster.pop({
                  type: 'success',
                  title: 'Видалено',
                  body: '"' + event.title + '" успішно видалено!',
                  timeout: 3500
                })
              }).catch(function (err) {
                toaster.pop({
                  type: 'warning',
                  title: 'Прикра помилка.',
                  body: 'Подію не видалено! ' + $window._.get(err, 'data.error.message', ''),
                  timeout: 3500
                });
              });
            };
          }]
        });
      };

      self.cancelEdit = function () {
        init();
      };

      init();

      function init() {
        self.changedDevices = [];
        self.activeEvent = false;
        self.showForm = false;
        self.showOptions = false;
        getEvents();
        getDevices();
      }

      function getEvents () {
        dataService.getEvents().then(function done(response) {
          self.evetsList = response;
        });
      }

      function getDevices () {
        dataService.getDevices().then(function done(response) {
          self.devicesList = response;
        })
      }

    });
