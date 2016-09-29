'use strict';

var myApp = angular.module('myApp', ['ngRoute']);

myApp.config(function ($routeProvider) {

	$routeProvider

	.when("/", {
		templateUrl: "landing.html",
		controller: "dashboardCtrl",
		controllerAs: "vm"
	})

	.when("/poll-list/:type", {
		templateUrl: "poll-list.html",
		controller: "listCtrl",
		controllerAs: "vm"
	})

	.when("/poll-detail/:id", {
		templateUrl: "poll-detail.html",
		controller: "detailCtrl",
		controllerAs: "vm"
	})

	.when("/create-poll", {
		templateUrl: "create-poll.html",
		controller: "createCtrl",
		controllerAs: "vm"
	})

	.otherwise( {redirectTo: '/'});
});





