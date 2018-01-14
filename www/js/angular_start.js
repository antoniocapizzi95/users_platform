//in questo file js c'è l'avvio di AngularJS
var usersplat = angular.module("myApp", ['ngRoute','ngMaterial','myApp.login','myApp.surveys','myApp.compSurveys','myApp.settings']) //qui viene definito il modulo principale dell'applicazione e vengono iniettati i vari moduli
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider
            .when('/login', {
                templateUrl: "html/login.html", //qui viene definito come devono essere avviate le varie pagine dell'applicazione, in questo caso quando ci troviamo in /login, viene settata la pagina login/html come template
                controller: 'loginCtrl',        //viene settato come controller della pagina "loginCtrl" contenuto in js/login/login_controller.js
                controllerAs: 'Login'           //e viene settato un alias per il controller in modo che sia reperibile sull'html
            })                                  //lo stesso avviene successivamente per le altre pagine
            .when('/surveys', {
                templateUrl: "html/surveys.html",
                controller: 'surveysCtrl',
                controllerAs: 'Surveys'
            })
            .when('/compSurveys', {
                templateUrl: "html/compSurveys.html",
                controller: 'compSurveysCtrl',
                controllerAs: 'CompSurveys'
            })

            .when('/settings', {
                templateUrl: "html/settings.html",
                controller: 'settingsCtrl',
                controllerAs: 'Settings'
            })

    }])


    .config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
        $locationProvider.hashPrefix('!');

        $routeProvider.otherwise({redirectTo: '/login'});
    }]);