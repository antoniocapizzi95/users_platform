'use strict';

(function () {

    angular.module('myApp.surveys', ['ngRoute'])
        .controller('surveysCtrl', surveysCtrl);
    surveysCtrl.$inject = ['$http','LoginService'];

    function surveysCtrl($http,LoginService) {

        var vm = this;
        var associations = [];
        vm.surveys = [];
        vm.list = true;
        vm.selectedSurvey;
        vm.answers = [];
        vm.date = '';
        vm.place = '';
        vm.note = '';

        function getAssociations() {
            var param = JSON.stringify({id:LoginService.id});

            $http({
                method: 'POST',
                url: 'http://'+LoginService.address+'/mydb/getAssociations_up.php',
                data: "message=" + param,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            })
                .then(function (response) {
                    var input = JSON.parse(response.data);
                    associations = input.records;

                });
        }
        getAssociations();

        function getSurveys() {
            $http.get("http://"+LoginService.address+"/mydb/getSurveys.php")
                .then(function (response) {
                    var input = JSON.parse(response.data);
                    var allSurv = input.records;
                    for(var i=0;i<allSurv.length;i++) {
                        for(var j = 0; j<associations.length; j++) {
                            if(allSurv[i].object.name == associations[j].surv_name) {
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
            var obj = {surv_name:vm.selectedSurvey.name, description:vm.selectedSurvey.description,user:LoginService.username,date:vm.date,note:vm.note,place: vm.place,questions:vm.selectedSurvey.questions,answers: vm.answers};
            var param = JSON.stringify(obj);

            $http({
                method: 'POST',
                url: 'http://'+LoginService.address+'/mydb/addAnswers.php',
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
