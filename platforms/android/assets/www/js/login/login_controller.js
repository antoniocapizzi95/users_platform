'use strict';

(function () {

    angular.module('myApp.login', ['ngRoute'])
        .controller('loginCtrl', loginCtrl);
    loginCtrl.$inject = ['$http','$location','LoginService'];

    function loginCtrl($http,$location,LoginService) {

        var vm = this;
        vm.username = '';
        vm.password = '';
        vm.address = '192.168.1.52';
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
                    .then(function (response) {
                        var input = JSON.parse(response.data);
                        var resp = input.records[0].result;
                        var id = input.records[0].id;
                        if(resp) {
                            LoginService.address = vm.address;
                            LoginService.username = vm.username;
                            LoginService.password = vm.password;
                            LoginService.id = id;
                            $location.path("/surveys");

                        } else {
                            vm.address = '';
                            vm.username = '';
                            vm.password = '';
                            vm.message = "Server address or username or password are incorrect";
                        }

                    });
            }

        }
    }




})();