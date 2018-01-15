'use strict';

//questo è il controller che gestisce la pagina /login
(function () {

    angular.module('myApp.login', ['ngRoute']) //viene dichiarato un modulo myApp.login a cui si associa il controller
        .controller('loginCtrl', loginCtrl);
    loginCtrl.$inject = ['$http','$location','LoginService']; //vengono iniettati i vari servizi utili al controller

    function loginCtrl($http,$location,LoginService) {

        var vm = this; //qui viene associato il controller (this) alla variabile vm
        vm.username = '';          //qui vengono associate delle variabili al controller, queste variabili saranno disponibili sulla pagina html come Login.nomevariabile
        vm.password = '';
        vm.address = 'antoniocapizzi95.altervista.org'; //di default il server address è stato settato su antoniocapizzi95.altervista.org
        vm.message = '';

        vm.login = function () {

            var param = JSON.stringify({username:vm.username,password:vm.password}); //nome utente e password vengono inviati al server tramite una richiesta post a login.php
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
                    var admin = input.records[0].admin;
                    if(resp && !admin) { //se resp è true e admin è false, l'utente esiste, le credenziali sono corrette e il login avviene correttamente
                        LoginService.address = vm.address; //qui vengono settati gli attributi del servizio LoginService (contenuto in js/services/login_service.js), queste variabili saranno reperibili da qualsiasi controller dell'applicazione
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
                    vm.message = 'The server address is wrong'; //nel caso il server non risponde o l'indirizzo inserito è errato, compare questo messaggio
                });


        }
    }




})();