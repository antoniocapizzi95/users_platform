//in questo file js è presente la dichiarazione del servizio LoginService che contiene tutte le variabili che devono essere a disposizione di tutti i controller
angular.module('myApp')
    .factory('LoginService', function () {

       this.username = '';
       this.password = '';
       this.address = '';
       this.id;
       this.isLogged = false;

       this.reset = function () {
           this.username = '';
           this.password = '';
           this.id;
           this.isLogged = false;
       };

        return {
            username : this.username,
            password: this.password,
            address: this.address,
            id: this.id,
            isLogged: this.isLogged,
            reset: this.reset
        };
    });