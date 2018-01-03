(function () {
    'use strict';




    usersplat.directive('goto', ['$location', function ($location) {
        return {
            link: function (scope, element, attrs) {
                element.on('click', function () {
                    scope.$apply(function () {
                        $location.path(attrs.goto);
                    });
                });
            }
        };
    }]);


}());