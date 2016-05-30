(function () {
  'use strict';

  angular.module('myApp.directives')

      .directive('deviceMark', function () {
        return {
          restrict: 'E',
          replace: true,
          templateUrl: 'shared/device-mark/device-mark.template.html',
          scope: {
            value: '='
          },
          link: function (scope) {
            scope.showDetails = false;
            scope.deviceList = scope.value;
            console.log('deviceMark', scope.value);
            scope.setCoordinates = function (self) {
              console.log('setCoordinates', self);
            };
            //scope.$on('spinnerStatus', function (event, isActive) {
            //  scope.spinnerActive = isActive;
            //});
          }
        };
      });

})();
