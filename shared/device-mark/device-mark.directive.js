(function () {
  'use strict';

  angular.module('myApp.directives')

      .directive('deviceMark', function ($document, $rootScope) {
        return {
          restrict: 'E',
          replace: true,
          //transclude: true,
          templateUrl: 'shared/device-mark/device-mark.template.html',
          scope: {
            value: '=value'
          },
          link: function (scope, element, attr) {
            var startX = 0, startY = 0, x = 0, y = 0;

            scope.showDetails = false;
            scope.device = scope.value;
            scope.markTitle = scope.device.title[0];

            scope.setCoordinates = function () {
              scope.device.positionOnPlan = {top: element.css('top'), left: element.css('left')};
              console.log('setCoordinates', scope.device.positionOnPlan);
            };

            if (scope.device && scope.device.positionOnPlan) {
              element.css({
                top: scope.device.positionOnPlan.top,
                left: scope.device.positionOnPlan.left
              });
            }

            element.on('mousedown', function (event) {
              event.preventDefault();
              if (x === 0 && y === 0 && startX === 0 && startY === 0) {
                x = parseInt(scope.device.positionOnPlan.left);
                y = parseInt(scope.device.positionOnPlan.top);
              }
              startX = event.pageX - x;
              startY = event.pageY - y;
              //console.log('mousedown startX:', startX, 'startY:', startY, 'x:', x, 'y:', y, 'event.pageX:', event.pageX, 'event.pageY:', event.pageY);
              $document.on('mousemove', mousemove);
              $document.on('mouseup', mouseup);
            });

            function mousemove (event) {
              y = event.pageY - startY;
              x = event.pageX - startX;
              //console.log('startX:', startX, 'startY:', startY, 'x:', x, 'y:', y, 'event.pageX:', event.pageX, 'event.pageY:', event.pageY);
              //console.log('x:', x, 'y:', y);
              if (x <= 0) {
                x = 0;
              } else if (x >= 440) {
                x = 440;
              }
              if (y <= 36) {
                y = 36;
              } else if (y >= 785) {
                y = 785;
              }
              element.css({
                top: y + 'px',
                left: x + 'px'
              });
            }

            function mouseup () {
              $document.off('mousemove', mousemove);
              $document.off('mouseup', mouseup);
            }

            $rootScope.$on('markDetailsShow', function (event, data) {
              if (data.data._id === scope.device._id) {
                //console.log('markDetailsShow', data.data._id, scope.device._id);
                scope.showDetails = true;
              }
            });

            $rootScope.$on('markDetailsHide', function () {
              //console.log('markDetailsHide');
              scope.showDetails = false;
            });

          }
        };
      });

})();
