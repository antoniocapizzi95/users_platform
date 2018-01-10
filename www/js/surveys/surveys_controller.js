'use strict';

(function () {

    angular.module('myApp.surveys', ['ngRoute'])
        .controller('surveysCtrl', surveysCtrl);
    surveysCtrl.$inject = ['$http','LoginService','$mdDateLocale'];

    function surveysCtrl($http,LoginService) {

        var vm = this;
        var assignments = [];
        vm.surveys = [];
        vm.list = true;
        vm.selectedSurvey;
        vm.answers = [];
        vm.date = '';
        vm.place = '';
        vm.note = '';

        vm.message = '';




        function getAssociations() {
            var param = JSON.stringify({id:LoginService.id,source:"up"});

            $http({
                method: 'GET',
                url: 'http://'+LoginService.address+'/mydb/assignments.php/'+param,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            })
                .then(function (response) {
                    var input = JSON.parse(response.data);
                    assignments = input.records;

                });
        }
        getAssociations();

        function getSurveys() {
            $http.get("http://"+LoginService.address+"/mydb/surveys.php/all")
                .then(function (response) {
                    var input = JSON.parse(response.data);
                    var allSurv = input.records;
                    for(var i=0;i<allSurv.length;i++) {
                        for(var j = 0; j<assignments.length; j++) {
                            if(allSurv[i].ID == assignments[j].surv_id) {
                                vm.surveys.push(allSurv[i]);
                                break;
                            }
                        }
                    }
                });
        }
        getSurveys();

        vm.selectSurvey = function (surv) {
            vm.selectedSurvey = surv;
            vm.list = false;
            for(var i = 0; i<vm.selectedSurvey.questions.length; i++) {
                vm.answers.push("");
            }
        }
        vm.confirm = function () {
            if(vm.place == '' || vm.date == '') {
                vm.message = 'Required fields is empty'

            } else {
                var date = vm.date.toString().substring(4,15);
                var obj = {surv_id:vm.selectedSurvey.ID,username:LoginService.username,date:date,note:vm.note,place: vm.place,answers: vm.answers};
                var param = JSON.stringify(obj);

                $http({
                    method: 'POST',
                    url: 'http://'+LoginService.address+'/mydb/answers.php',
                    data: "message=" + param,
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                })
                    .then(function (response) {
                        vm.list = true;
                        vm.answers = [];
                        vm.selectedSurvey = undefined;
                        vm.date = '';
                        vm.note = '';
                        vm.place = '';

                    });
            }


        }
        vm.cancel = function () {
            vm.list = true;
            vm.answers = [];
            vm.selectedSurvey = undefined;
            vm.date = '';
            vm.note = '';
            vm.place = '';
        }
    }
})();
