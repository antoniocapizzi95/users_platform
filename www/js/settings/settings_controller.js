'use strict';

(function () {

    angular.module('myApp.settings', ['ngRoute'])
        .controller('settingsCtrl', settingsCtrl);
    settingsCtrl.$inject = ['$http','LoginService'];

    function settingsCtrl($http,LoginService) {

        var vm = this;
        vm.address = LoginService.address;
        vm.message = '';

        vm.changeServer = function () {
            LoginService.address = vm.address;
            vm.message = "Server changed"
        }

    }




})();