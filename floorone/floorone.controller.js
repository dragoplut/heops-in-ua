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
      self.showNoteForm = false;
      self.newNote = '';

      init();

      function init() {
        dataService.eventsList().then(function done(response) {
          self.eventsList = response;
        });
        dataService.notesList().then(function done(response) {
          self.notesList = response;
        });
      }

      self.noteAction = function (action, note) {
        dataService.notesList(action, note).then(function done(resp) {
          toaster.pop({
            type: 'success',
            title: 'Видалено',
            body: 'Замітку видалено!',
            showCloseButton: true
          });
        }).catch(function (err) {
          toaster.pop({
            type: 'error',
            title: 'Помилка',
            body: 'Сталась прикра помилка. Замітку НЕ видалено!',
            showCloseButton: true
          });
        });
      };

      self.addNote = function (action, newNote) {
        var newId = self.notesList[self.notesList.length-1].id + 1;
        var note = {id: newId, message: newNote};
        dataService.notesList(action, note).then(function done(resp) {
          toaster.pop({
            type: 'success',
            title: 'Додано',
            body: 'Замітку додано!',
            showCloseButton: true
          });
        }).catch(function (err) {
          toaster.pop({
            type: 'error',
            title: 'Помилка',
            body: 'Сталась прикра помилка. Замітку НЕ додано!',
            showCloseButton: true
          });
        });
        self.newNote = '';
      };

      //console.info(self.header);
    });
