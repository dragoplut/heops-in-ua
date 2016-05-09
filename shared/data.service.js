'use strict';

angular.module('myApp.services')

    .factory('dataService', ['$q', '$location', 'Restangular', function ($q, $location, Restangular) {
      var API_KEY = '?apiKey=uuRNSH5q_v3QcAfoI7SHeJYf8zmj5_gM';
      var notes = [
        {id: 101, message: 'Замінити пробки в лічильнику.'},
        {id: 102, message: 'Усунути збої в роботі термостата котла.'}
      ];

      var getUsers = function () {
        console.log('getUsers 1');
        return Restangular.all('user' + API_KEY).getList().then(function done(response) {
          console.log('getUsers response: ', response);
          return response.plain();
        }).catch(function (err) {
          return $q.reject(err);
        });
      };

      var historyBase = [];
      var historyLog = function (eventInfo, action) {
        if (!eventInfo && !action) {
          return historyBase;
        } else if (eventInfo && !action) {
          historyBase.push(eventInfo);
          return historyBase;
        } else if (!eventInfo && action) {
          if (action == 'clear') {
            historyBase = [];
            return historyBase;
          }
        }
      };

      var eventsList = function () {
        var defer = $q.defer();
        var output = [];
        var today = new Date();
        var events = [
          'Опалення',
          'Кондиціонування',
          'Сигналізація будинку',
          'Електронний замок вхідних дверей',
          'Лампочка в кухні',
          'Лампочка в залі',
          'Лампочка на подвір’ї',
          'Годування папуги :-)'
        ];
        for (var i = 0; i < 8; i++) {
          output.push({id: i + 1, date: today, title: events[i], eventSwitch: 'enabled'})
        }
        defer.resolve(output);
        return defer.promise;
      };

      var notesList = function (action, note) {
        var defer = $q.defer();
        if (action && note) {
          if (action === 'add') {
            notes.push(note);
          } else if (action === 'remove') {
            for (var i = 0; i < notes.length; i++) {
              if (notes[i].id === note.id) {
                notes.splice(i, 1);
              }
            }
          }
        }
        defer.resolve(notes);
        return defer.promise;
      };

      return {
        eventsList: eventsList,
        historyLog: historyLog,
        getUsers: getUsers,
        notesList: notesList
      };

    }]);