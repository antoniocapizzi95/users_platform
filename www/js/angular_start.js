var usersplat = angular.module("myApp", ['ngRoute','ngMaterial','myApp.login','myApp.surveys','myApp.compSurveys','myApp.settings'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider
            .when('/login', {
                templateUrl: "html/login.html",
                controller: 'loginCtrl',
                controllerAs: 'Login'
            })
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