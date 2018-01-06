'use strict';

(function () {

    angular.module('myApp.settings', ['ngRoute'])
        .controller('settingsCtrl', settingsCtrl);
    settingsCtrl.$inject = ['$http','LoginService','$location'];

    function settingsCtrl($http,LoginService,$location) {

        var vm = this;
        vm.address = LoginService.address;
        vm.user = LoginService.username;
        vm.message = '';

        vm.changeServer = function () {
            LoginService.address = vm.address;
            vm.message = "Server changed"
        }

        vm.logout = function () {
            LoginService.reset();
            $location.path('/login');
        }

    }




})();