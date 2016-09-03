'use strict';

myApp.controller('detailCtrl', ['$scope', '$routeParams', function($scope, $routeParams) {
	var vm = this
	console.log("DETAIL CTRL")
	activate()

	function activate() {
		vm.type = $routeParams.type
		vm.id = $routeParams.id
		console.log(vm.id)
	};
}])