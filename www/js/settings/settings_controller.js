'use strict';

//in questo file js è presente il controller che gestisce la pagina settings
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

        vm.changeServer = function () { //questa è la funzione che viene eseguita quando preme il tasto per cambiare indirizzo del server
            var param = JSON.stringify({username:LoginService.username,password:LoginService.password});

            $http({ //viene inviata una richiesta per verificare che l'indirizzo del server sia corretto
                method: 'POST',
                url: 'http://'+vm.address+'/mydb/login.php',
                data: "message=" + param,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            })
                .success(function (response) {
                    LoginService.address = vm.address; //e viene settato il nuovo indirizzo del server
                    vm.message = "Server changed";

                })
                .error(function (msg) {
                    vm.message = 'The server address is wrong';
                });

        }

        vm.logout = function () { //questa è la funzione che viene eseguita quando si preme il tasto "logout"
            LoginService.reset(); //viene resettato il LoginService
            $location.path('/login'); //Si viene indirizzati alla pagina di login
        }

    }




})();