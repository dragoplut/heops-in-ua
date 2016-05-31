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
    .controller('FloorOneController', function ($q, $rootScope, $scope, $window,
                                                toaster,
                                                dataService) {
      var self = this;

      self.header = 'Перший поверх.';
      self.minus = false;
      self.changedDevices = [];

      self.deviceChanged = function (device) {
        for (var i = 0; i < self.changedDevices.length; i++) {
          if (self.changedDevices[i]._id == device._id) {
            self.changedDevices.splice(i, 1);
          }
        }
        self.changedDevices.push(device);
        console.log(self.changedDevices);
      };

      self.memoSave = function (newMemo) {
        console.log('self.memoSave newMemo:', newMemo);
        dataService.memoSave(newMemo).then(function done() {
          toaster.pop({
            type: 'success',
            title: 'Додано',
            body: 'Замітку додано!',
            showCloseButton: true
          });
          resetNewMemo();
          memoGet();
        }).catch(function () {
          toaster.pop({
            type: 'error',
            title: 'Помилка',
            body: 'Сталась прикра помилка. Замітку НЕ додано!',
            showCloseButton: true
          });
        });
      };

      self.memoRemove = function (id) {
        dataService.memoRemove(id).then(function done() {
          toaster.pop({
            type: 'success',
            title: 'Видалено',
            body: 'Замітку видалено!',
            showCloseButton: true
          });
          memoGet();
        }).catch(function () {
          toaster.pop({
            type: 'error',
            title: 'Помилка',
            body: 'Сталась прикра помилка. Замітку НЕ видалено!',
            showCloseButton: true
          });
        });
      };

      self.updateDevices = function () {
        var errMessage = false;
        var defer = $q.defer();
        if (self.changedDevices.length) {
          for (var i = 0; i < self.changedDevices.length; i++) {
            dataService.updateDevice(self.changedDevices[i]).then(function done(resp) {
              if (i === self.changedDevices.length) {
                defer.resolve(resp);
              }
            }).catch(function (err) {
              toaster.pop({
                type: 'warning',
                title: 'Сталась помилка.',
                body: 'При збереженні! ' + $window._.get(err, 'data.error.message', ''),
                timeout: 3500
              });
              errMessage = true;
              return defer.reject(err)
            });
          }
        }
        if (!errMessage) {
          toaster.pop({
            type: 'success',
            title: 'Створено!',
            body: '"' + newEvent.title + '" успішно додано в базу!',
            timeout: 3500
          });
        }
        return defer.promise;
      };

      self.detailsShow = function (device) {
        //console.log(device.title);
        $rootScope.$broadcast('markDetailsShow', {data: device});
      };

      self.detailsHide = function () {
        $rootScope.$broadcast('markDetailsHide');
      };

      self.cancelEdit = function () {
        self.changedDevices = [];
        getDevices();
      };


      init();

      function init() {
        getDevices();
        memoGet();
        resetNewMemo();
      }

      function resetNewMemo () {
        self.showNoteForm = false;
        self.newNote = '';
      }

      function eventsList () {
        dataService.eventsList().then(function done(response) {
          self.eventsList = response;
        });
      }

      function getDevices () {
        dataService.getDevices().then(function done(response) {
          self.devicesList = response;
        })
      }

      function memoGet () {
        dataService.memoGet().then(function done(response) {
          self.notesList = response;
        });
      }

    });
