'use strict';

var myApp = angular.module('myApp', ['ngRoute']);

myApp.config(function ($routeProvider) {

	$routeProvider

	.when("/", {
		templateUrl: "../templates/landing.html",
		controller: "dashboardCtrl",
		controllerAs: "vm"
	})

	.when("/poll-list/:type", {
		templateUrl: "../templates/poll-list.html",
		controller: "listCtrl",
		controllerAs: "vm"
	})

	.when("/poll-detail/:id", {
		templateUrl: "../templates/poll-detail.html",
		controller: "detailCtrl",
		controllerAs: "vm"
	})

	.when("/create-poll", {
		templateUrl: "../templates/create-poll.html",
		controller: "createCtrl",
		controllerAs: "vm"
	})

	.otherwise( {redirectTo: '/'});
});





