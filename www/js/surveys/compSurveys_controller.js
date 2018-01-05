'use strict';

(function () {

    angular.module('myApp.compSurveys', ['ngRoute'])
        .controller('compSurveysCtrl', compSurveysCtrl);
    compSurveysCtrl.$inject = ['$http','LoginService'];

    function compSurveysCtrl($http,LoginService) {

        var vm = this;
        vm.answers = [];
        vm.list = true;
        vm.selectedSurv;
        $http({
            method: 'GET',
            url: 'http://'+LoginService.address+'/mydb/answers.php/',
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        })
            .then(function (response) {
                var input = JSON.parse(response.data);
                var allAnswers = input.records;
                for(var i = 0; i<allAnswers.length; i++) {
                    if(allAnswers[i].object.user == LoginService.username) {
                        vm.answers.push(allAnswers[i]);
                    }
                }

            });
        vm.showThisResult = function(ans) {
            vm.list = false;
            vm.selectedSurv = ans;
        }


    }
})();