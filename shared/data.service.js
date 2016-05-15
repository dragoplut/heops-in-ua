'use strict';

angular.module('myApp.services')

    .factory('dataService', ['$q', '$location', 'Restangular', function ($q, $location, Restangular) {

      var historyBase = [];

      /**
       *  RESTANGULAR VARIABLES
       **/
      var eventsRestangular = Restangular.one('events');
      var devicesRestangular = Restangular.one('devices');
      var memoRestangular = Restangular.one('memo');

      /**
       *  EVENTS BLOCK
       **/
      var getEvents = function () {
        return eventsRestangular.customGET().then(function done(resp) {
          return resp;
        }).catch(function (err) {
          return err;
        });
      };

      var getOneEvent = function (eventId) {
        if (!eventId) {
          return $q.reject();
        }
        return eventsRestangular.one(eventId).customGET().then(function done(resp) {
          return resp;
        }).catch(function (err) {
          return err;
        });
      };

      var saveEvent = function (newEvent) {
        if (!newEvent) {
          return $q.reject();
        }
        return eventsRestangular.customPOST(newEvent).then(function done(resp) {
          return resp;
        }).catch(function (err) {
          return err;
        });
      };

      var updateEvent = function (updatedEventData) {
        if (!updatedEventData) {
          return $q.reject();
        }
        return eventsRestangular.one(updatedEventData._id).customPUT(updatedEventData).then(function done(resp) {
          return resp;
        }).catch(function (err) {
          return err;
        });
      };

      var removeEvent = function (eventId) {
        if (!eventId) {
          return $q.reject();
        }
        return eventsRestangular.one(eventId).remove().then(function done(resp) {
          return resp;
        }).catch(function (err) {
          return err;
        });
      };

      /**
       *  DEVICES BLOCK
       **/
      var getDevices = function () {
        return devicesRestangular.customGET().then(function done(resp) {
          return resp;
        }).catch(function (err) {
          return err;
        });
      };

      var getOneDevice = function (deviceId) {
        if (!deviceId) {
          return $q.reject();
        }
        return devicesRestangular.one(deviceId).customGET().then(function done(resp) {
          return resp;
        }).catch(function (err) {
          return err;
        });
      };

      var saveDevice = function (newDevice) {
        if (!newDevice) {
          return $q.reject();
        }
        return devicesRestangular.customPOST(newDevice).then(function done(resp) {
          return resp;
        }).catch(function (err) {
          return err;
        });
      };

      var updateDevice = function (updatedDeviceData) {
        if (!updatedDeviceData) {
          return $q.reject();
        }
        return devicesRestangular.one(updatedDeviceData._id).customPUT(updatedDeviceData).then(function done(resp) {
          return resp;
        }).catch(function (err) {
          return err;
        });
      };

      var removeDevice = function (deviceId) {
        if (!deviceId) {
          return $q.reject();
        }
        return devicesRestangular.one(deviceId).remove().then(function done(resp) {
          return resp;
        }).catch(function (err) {
          return err;
        });
      };

      /**
       *  MEMO BLOCK
       **/
      var memoGet = function () {
        return memoRestangular.customGET().then(function done(resp) {
          return resp.plain();
        });
      };

      var memoSave = function (newMemo) {
        console.log('dataService memoSave newMemo:', newMemo);
        var newData = {
          message: newMemo
        };
        console.log('self.memoSave newData:', newData);
        return memoRestangular.customPOST(newData).then(function done(resp) {
          console.log('memoSave resp:', resp);
          return resp;
        });
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
        getEvents: getEvents,
        getOneEvent: getOneEvent,
        saveEvent: saveEvent,
        updateEvent: updateEvent,
        removeEvent: removeEvent,
        getDevices: getDevices,
        getOneDevice: getOneDevice,
        saveDevice: saveDevice,
        updateDevice: updateDevice,
        removeDevice: removeDevice,
        eventsList: eventsList,
        historyLog: historyLog,
        memoGet: memoGet,
        memoSave: memoSave,
        memoRemove: memoRemove
      };

    }]);