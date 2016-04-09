'use strict';

angular.module('myApp.floorOne', ['ui.router'])
    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider
            .state('floorone', {
                url: '/floorone',
                templateUrl: 'floorone/floorone.html',
                controller: 'FloorOneController',
                controllerAs: 'floorOne'
            })
    }])
    .controller('FloorOneController', [function () {
        var self = this;
        self.header = 'Floor One';
        //console.info(self.header);
    }]);
