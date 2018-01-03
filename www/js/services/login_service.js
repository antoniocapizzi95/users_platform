angular.module('myApp')
    .factory('LoginService', function () {

       this.username = '';
       this.password = '';
       this.address = '';
       this.id;
       this.isLogged = false;

        return {
            username : this.username,
            password: this.password,
            address: this.address,
            id: this.id,
            isLogged: this.isLogged
        };
    });