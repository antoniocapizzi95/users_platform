'use strict';

(function () {

    angular.module('myApp.surveys', ['ngRoute'])
        .controller('surveysCtrl', surveysCtrl);
    surveysCtrl.$inject = ['$http','LoginService'];

    function surveysCtrl($http,LoginService) {

        var vm = this;
        var associations = [];
        vm.surveys = [];

        vm.getAssociations = function () {
            var param = JSON.stringify({id:LoginService.id});

            $http({
                method: 'POST',
                url: 'http://'+LoginService.address+'/mydb/getAssociations_up.php',
                data: "message=" + param,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            })
                .then(function (response) {
                    var input = JSON.parse(response.data);
                    var resp = input.records;

                });
        }
        vm.getAssociations();
    }
})();
