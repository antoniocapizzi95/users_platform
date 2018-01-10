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
        vm.selectedAnswer;
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
                    if(allAnswers[i].username == LoginService.username) {
                        vm.answers.push(allAnswers[i]);
                        $http({
                            method: 'GET',
                            url: 'http://'+LoginService.address+'/mydb/surveys.php/'+allAnswers[i].surv_id,
                            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                        })
                            .then(function (response) {
                                var input = JSON.parse(response.data);
                                var rec = input.records[0];
                                vm.answers[vm.answers.length - 1].surv_name = rec.surv_name;

                            });
                    }
                }

            });
        vm.showThisResult = function(ans) {
            vm.list = false;
            vm.selectedAnswer = ans;
            vm.selectedID = ans.ID;
            $http({
                method: 'GET',
                url: 'http://'+LoginService.address+'/mydb/surveys.php/'+ans.surv_id,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            })
                .then(function (response) {
                    var input = JSON.parse(response.data);
                    vm.selectedSurv = input.records[0];


                });
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