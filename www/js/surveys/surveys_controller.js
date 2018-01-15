'use strict';

//in questo file js è presente il controller della pagina "available surveys" cioè quella in cui si vedono le survey disponibili all'utente
(function () {

    angular.module('myApp.surveys', ['ngRoute'])
        .controller('surveysCtrl', surveysCtrl);
    surveysCtrl.$inject = ['$http','LoginService','$mdDateLocale'];

    function surveysCtrl($http,LoginService) {

        var vm = this; //qui viene associato il controller (this) alla variabile vm
        vm.service = LoginService; //qui vengono associate delle variabili al controller, queste variabili saranno disponibili sulla pagina html come Surveys.nomevariabile
        var assignments = [];
        vm.surveys = [];
        vm.list = true; //questa variabile serve a far comparire la lista delle survey se è true, se è false, comparirà la pagina da cui si può compilare la survey selezionata
        vm.selectedSurvey;
        vm.answers = [];
        vm.date = '';
        vm.place = '';
        vm.note = '';

        vm.message = '';




        function getAssignments() { //questa funzione prende le assegnazioni alle survey in cui è presente l'id dell'utente
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
        getAssignments();

        function getSurveys() { //questa funzione prende le survey assegnate all'utente
            $http.get("http://"+LoginService.address+"/mydb/surveys.php/all")
                .then(function (response) {
                    var input = JSON.parse(response.data);
                    var allSurv = input.records;
                    for(var i=0;i<allSurv.length;i++) {
                        for(var j = 0; j<assignments.length; j++) {
                            if(allSurv[i].ID == assignments[j].surv_id) { //qui vengono filtrate le survey e vengono prese solo quelle assegnate all'utente
                                vm.surveys.push(allSurv[i]);
                                break;
                            }
                        }
                    }
                });
        }
        getSurveys();

        vm.selectSurvey = function (surv) { //questa funzione viene eseguita quando si clicca su una survey per compilarla
            vm.selectedSurvey = surv;
            vm.list = false;
            for(var i = 0; i<vm.selectedSurvey.questions.length; i++) {
                vm.answers.push("");
            }
        }
        vm.confirm = function () { //questa funzione viene eseguita quando si conferma la compilazione di una survey
            if(vm.place == '' || vm.date == '') {
                vm.message = 'Required fields is empty'

            } else {
                var date = vm.date.toString().substring(4,15);
                var obj = {surv_id:vm.selectedSurvey.ID,username:LoginService.username,date:date,note:vm.note,place: vm.place,answers: vm.answers};
                var param = JSON.stringify(obj);

                $http({ //nel caso in cui tutti i dati sono corretti, con una richiesta post al file answers.php vengono scritte sul database le risposte al sondaggio
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
        vm.cancel = function () { //questa funzione viene eseguita quando si preme il tasto cancel nella compilazione di una survey
            vm.list = true;
            vm.answers = [];
            vm.selectedSurvey = undefined;
            vm.date = '';
            vm.note = '';
            vm.place = '';
        }
    }
})();
