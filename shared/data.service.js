'use strict';

angular.module('myApp.services')

    .factory('dataService', ['$q', '$location', 'Restangular', function ($q, $location, Restangular) {

      var memoRestangular = Restangular.one('memo');

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

      var memoGet = function () {
        return memoRestangular.customGET().then(function done(resp) {
          return resp.plain();
        });
      };

      var memoSave = function (newMemo) {
        var newData = {
          message: newMemo
        };
        return memoRestangular.customPOST(newData)
      };

      var memoRemove = function (id) {
        if (!id) {
          return $q.reject();
        }
        return memoRestangular.one(id).remove().then(function done(resp) {
          return resp;
        }).catch(function () {
          return $q.reject();
        });
      };

      return {
        eventsList: eventsList,
        historyLog: historyLog,
        getUsers: getUsers,
        memoGet: memoGet,
        memoSave: memoSave,
        memoRemove: memoRemove
      };

    }]);