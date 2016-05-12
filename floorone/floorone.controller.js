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
    .controller('FloorOneController', function (dataService, toaster) {
      var self = this;

      self.header = 'Перший поверх.';
      self.minus = false;

      self.memoSave = function (newMemo) {
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

      init();

      function init() {
        eventsList();
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

      function memoGet () {
        dataService.memoGet().then(function done(response) {
          self.notesList = response;
        });
      }

    });
