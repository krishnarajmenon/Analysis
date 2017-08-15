/// <reference path="lib/angular.min.js" />

var locationApp = angular.module('locationApp', ['AdalAngular']);

locationApp.config(['$httpProvider', 'adalAuthenticationServiceProvider', function ($httpProvider, adalProvider) {
    var endpoints = {
        "https://localhost/AADWebAPI": "https://KrishnarajTest.onmicrosoft.com/c98d879d-a877-487d-a46e-679c84dddfd3"
    };

    adalProvider.init({
        instance: 'https://login.microsoftonline.com/',
        tenant: 'krishnarajtest.onmicrosoft.com',
        clientId: 'b51c7633-a692-4a0a-9094-46bc9485df19',
        endpoints: endpoints
    }, $httpProvider);
}]);

var locationController = locationApp.controller("locationController", ['$scope', '$http', 'adalAuthenticationService', function ($scope, $http, adalService) {
    $scope.getLocation = function () {
        $http.get("https://localhost/AADWebAPI/api/location?cityName=dc").success(function (location) {
            // this callback will be called asynchronously
            // when the response is available
            $scope.city = location;
        });
    };

    $scope.login = function () {
        adalService.login();
    };

    $scope.logout = function () {
        adalService.logOut();
    };
}]);