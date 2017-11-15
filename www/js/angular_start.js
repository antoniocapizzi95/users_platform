var usersplat = angular.module("myApp", ['ngRoute','ngMaterial','myApp.login','myApp.surveys'])
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
            /*.when('/settings', {
                templateUrl: "settings/settings.html",
                controller: 'settingsCtrl',
                controllerAs: 'Settings'
            })

            .when('/newSurvey', {
                templateUrl: "surveys/newSurvey.html",
                controller: 'newSurveyCtrl',
                controllerAs: 'NewSurvey'
            })*/

    }])

    .config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
        $locationProvider.hashPrefix('!');

        $routeProvider.otherwise({redirectTo: '/login'});
    }]);