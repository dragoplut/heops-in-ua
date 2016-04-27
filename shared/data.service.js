'use strict';

angular.module('myApp.services')

    .factory('dataService', function ($q) {

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

      return {
        eventsList: eventsList,
        historyLog: historyLog
      };

    });