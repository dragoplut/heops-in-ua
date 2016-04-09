'use strict';

angular.module('myApp.dataCykle', ['ui.router', 'uiSwitch'])
    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider
            .state('datacykle', {
                url: '/datacykle',
                templateUrl: 'datacykle/datacykle.html',
                controller: 'DataCykleController',
                controllerAs: 'dataCykle'
            })
    }])
    .controller('DataCykleController', [function () {
        var self = this;
        self.header = 'Data Cykle';
        function generateData () {
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
                output.push({id: i+1, date: today, title: events[i], eventSwitch: 'enabled'})
            }
            return output;
        }
        self.evetsList = generateData();
        //console.info(self.evetsList);
    }]);
