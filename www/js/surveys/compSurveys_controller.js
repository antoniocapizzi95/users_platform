'use strict';

//questo è il controller che gestisce la pagina da cui si vedono le survey compilate
(function () {

    angular.module('myApp.compSurveys', ['ngRoute'])
        .controller('compSurveysCtrl', compSurveysCtrl);
    compSurveysCtrl.$inject = ['$http','LoginService','$mdDialog'];

    function compSurveysCtrl($http,LoginService,$mdDialog) {

        var vm = this;
        vm.service = LoginService;
        vm.answers = [];
        vm.list = true;
        vm.selectedSurv;
        vm.selectedAnswer;
        vm.selectedID;
        $http({       //vengono prese tutte risposte alle survey
            method: 'GET',
            url: 'http://'+LoginService.address+'/mydb/answers.php/',
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        })
            .then(function (response) {
                var input = JSON.parse(response.data);
                var allAnswers = input.records;
                for(var i = 0; i<allAnswers.length; i++) {
                    if(allAnswers[i].username == LoginService.username) { //vengono filtrate le risposte alle survey compilate soltato dall'utente che ha effettuato il login
                        vm.answers.push(allAnswers[i]);
                        $http({
                            method: 'GET',
                            url: 'http://'+LoginService.address+'/mydb/surveys.php/'+allAnswers[i].surv_id, //vegono associati i nomi dei modelli delle survey, con gli oggetti "answers"
                            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                        })
                            .then(function (response) {
                                var input2 = JSON.parse(response.data);
                                var rec = input2.records[0];

                                for(var j = 0; j<vm.answers.length; j++) {
                                    if(vm.answers[j].surv_id == rec.ID) {
                                        vm.answers[j].surv_name = rec.surv_name;
                                    }
                                }

                            });
                    }
                }

            });
        vm.showThisResult = function(ans) { //questa è la funzione che viene eseguita quando si vuole vedere il dettaglio di una risposta a una survey
            vm.list = false;
            vm.selectedAnswer = ans;
            vm.selectedID = ans.ID;
            $http({ //qui viene associato l'oggetto answers (contenente le risposte) con'oggetto survey (che contiene le domande)
                method: 'GET',
                url: 'http://'+LoginService.address+'/mydb/surveys.php/'+ans.surv_id,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            })
                .then(function (response) {
                    var input = JSON.parse(response.data);
                    vm.selectedSurv = input.records[0];


                });
        }
        
        vm.deleteThisResult = function (id,ev) { //questa è la funzione che viene eseguita quando si clicca un bottone per eliminare una risposta a una survey
            var confirm = $mdDialog.confirm()
                .textContent('Are you sure you want to delete this result?')
                .targetEvent(ev)
                .ok('Delete')
                .cancel('Cancel');

            $mdDialog.show(confirm).then(function() { //per avere conferma, viene avviato un dialog che chiede se si è sicuri che si vuole cancellare le risposte selezionate
                var obj = {id:id,type:"simple"};
                var param = JSON.stringify(obj);
                $http({
                    method: 'DELETE',
                    url: 'http://'+LoginService.address+'/mydb/answers.php/'+param,
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

            });

        }



    }
})();