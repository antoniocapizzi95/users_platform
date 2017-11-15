angular.module('myApp')
    .factory('LoginService', function () {

       this.username = '';
       this.password = '';

        return {
            username : this.username,
            password: this.password
        };
    });