'use strict';

angular.module('myApp.services')

    .factory('usersService', ['$q', 'Restangular', function ($q, Restangular) {

      var usersRestangular = Restangular.one('users');

      /**
       *  USERS BLOCK
       **/
      var getUsers = function () {
        return usersRestangular.customGET().then(function done(resp) {
          return resp;
        }).catch(function (err) {
          return err;
        });
      };

      var getOneUser = function (userId) {
        if (!userId) {
          return $q.reject();
        }
        return usersRestangular.one(userId).customGET().then(function done(resp) {
          return resp;
        }).catch(function (err) {
          return err;
        });
      };

      var saveUser = function (newUser) {
        if (!newUser) {
          return $q.reject();
        }
        return usersRestangular.customPOST(newUser).then(function done(resp) {
          return resp;
        }).catch(function (err) {
          return err;
        });
      };

      var updateUser = function (updateUserData, userId) {
        if (!updateUserData || !userId) {
          return $q.reject();
        }
        return usersRestangular.one(userId).customPUT(updateUserData).then(function done(resp) {
          return resp;
        }).catch(function (err) {
          return err;
        });
      };

      var removeUser = function (userId) {
        if (!userId) {
          return $q.reject();
        }
        return usersRestangular.one(userId).remove().then(function done(resp) {
          return resp;
        }).catch(function (err) {
          return err;
        });
      };

      return {
        getUsers: getUsers,
        getOneUser: getOneUser,
        saveUser: saveUser,
        updateUser: updateUser,
        removeUser: removeUser
      }

    }]);
