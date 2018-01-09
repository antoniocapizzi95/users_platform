'use strict';

(function () {

    angular.module('myApp.compSurveys', ['ngRoute'])
        .controller('compSurveysCtrl', compSurveysCtrl);
    compSurveysCtrl.$inject = ['$http','LoginService','$mdDialog'];

    function compSurveysCtrl($http,LoginService,$mdDialog) {

        var vm = this;
        vm.answers = [];
        vm.list = true;
        vm.selectedSurv;
        vm.selectedID;
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
            vm.selectedSurv = ans.object;
            vm.selectedID = ans.ID;
        }
        
        vm.deleteThisResult = function (id,ev) {
            var confirm = $mdDialog.confirm()
                .textContent('Are you sure you want to delete this result?')
                .targetEvent(ev)
                .ok('Delete')
                .cancel('Cancel');

            $mdDialog.show(confirm).then(function() {
                $http({
                    method: 'DELETE',
                    url: 'http://'+LoginService.address+'/mydb/answers.php/'+id,
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                })
                    .then(function (response) {
                        for(var i=0; i<vm.answers.length;i++) {
                            if(vm.answers[i].ID == id) {
                                vm.answers.splice(i);
                                break;
                            }
                        }
                        vm.list = true;
                    });


            }, function() {
                //$scope.status = 'You decided to keep your debt.';
            });

        }


    }
})();