var myApp = angular.module('myApp', ['ngRoute']);

myApp.config(function ($routeProvider) {

	$routeProvider

	.when("/", {
		templateUrl: "../templates/landing.html",
		controller: "dashboardCtrl",
		controllerAs: "vm"
	})

	.when("/poll-list", {
		templateUrl: "../templates/poll-list.html",
		controller: "listCtrl",
		controllerAs: "vm"
	})

	.when("/poll-detail", {
		templateUrl: "../templates/poll-detail.html",
		controller: "detailCtrl",
		controllerAs: "vm"
	})

	.when("/create-poll", {
		templateUrl: "../templates/create-poll.html",
		controller: "createCtrl",
		controllerAs: "vm"
	})
});


myApp.controller('dashboardCtrl', ['$scope', function($scope) {
	var vm = this
}])

myApp.controller('listCtrl', ['$scope', function($scope) {
	var vm = this
}])

myApp.controller('detailCtrl', ['$scope', function($scope) {
	var vm = this
}])

myApp.controller('createCtrl', ['$scope', function($scope) {
	var vm = this
}])