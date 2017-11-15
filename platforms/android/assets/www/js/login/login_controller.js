'use strict';

(function () {

    angular.module('myApp.login', ['ngRoute'])
        .controller('loginCtrl', loginCtrl);
    loginCtrl.$inject = ['$http','$location','LoginService'];

    function loginCtrl($http,$location,LoginService) {

        var vm = this;
        vm.username = '';
        vm.password = '';
        vm.message = '';

        vm.login = function () {
            var param = JSON.stringify({username:vm.username,password:vm.password});
            vm.message = '';
            $http({
                method: 'POST',
                url: 'http://192.168.1.52/mydb/login.php',
                data: "message=" + param,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            })
                .then(function (response) {
                    var input = JSON.parse(response.data);
                    var resp = input.records;
                    if(resp) {
                        LoginService.username = vm.username;
                        LoginService.password = vm.password;
                        $location.path("/surveys");

                    } else {
                        vm.username = '';
                        vm.password = '';
                        vm.message = "Username or password are incorrect";
                    }

                });
        }
    }




})();