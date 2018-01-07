'use strict';

(function () {

    angular.module('myApp.login', ['ngRoute'])
        .controller('loginCtrl', loginCtrl);
    loginCtrl.$inject = ['$http','$location','LoginService'];

    function loginCtrl($http,$location,LoginService) {

        var vm = this;
        vm.username = '';
        vm.password = '';
        vm.address = 'antoniocapizzi95.altervista.org';
        vm.message = '';

        vm.login = function () {
            if(true) {
                var param = JSON.stringify({username:vm.username,password:vm.password});
                vm.message = '';
                $http({
                    method: 'POST',
                    url: 'http://'+vm.address+'/mydb/login.php',
                    data: "message=" + param,
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                })
                    .success(function (response) {
                        var input = JSON.parse(response);
                        var resp = input.records[0].result;
                        var id = input.records[0].id;
                        if(resp) {
                            LoginService.address = vm.address;
                            LoginService.username = vm.username;
                            LoginService.password = vm.password;
                            LoginService.id = id;
                            LoginService.isLogged = true;
                            $location.path("/surveys");

                        } else {
                            vm.username = '';
                            vm.password = '';
                            vm.message = "Username or password are incorrect";
                        }

                    })
                    .error(function (msg) {
                        vm.message = 'The server address is wrong';
                    });
            }

        }
    }




})();