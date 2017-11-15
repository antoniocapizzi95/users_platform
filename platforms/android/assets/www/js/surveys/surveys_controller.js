'use strict';

(function () {

    angular.module('myApp.surveys', ['ngRoute'])
        .controller('surveysCtrl', surveysCtrl);
    surveysCtrl.$inject = ['$http','$route'];

    function surveysCtrl($http,$route) {

        var vm = this;

    }
})();
