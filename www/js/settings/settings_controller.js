'use strict';

(function () {

    angular.module('myApp.settings', ['ngRoute'])
        .controller('settingsCtrl', settingsCtrl);
    settingsCtrl.$inject = ['$http','LoginService','$location'];

    function settingsCtrl($http,LoginService,$location) {

        var vm = this;
        vm.service = LoginService;
        vm.address = LoginService.address;
        vm.user = LoginService.username;
        vm.message = '';

        vm.changeServer = function () {
            var param = JSON.stringify({username:LoginService.username,password:LoginService.password});

            $http({
                method: 'POST',
                url: 'http://'+vm.address+'/mydb/login.php',
                data: "message=" + param,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            })
                .success(function (response) {
                    LoginService.address = vm.address;
                    vm.message = "Server changed";

                })
                .error(function (msg) {
                    vm.message = 'The server address is wrong';
                });

        }

        vm.logout = function () {
            LoginService.reset();
            $location.path('/login');
        }

    }




})();