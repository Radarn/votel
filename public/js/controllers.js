'use strict';

myApp.controller('dashboardCtrl', ['$scope', function($scope) {
	var vm = this

	activate()

	function activate() {
	
	}

}]);

myApp.controller('listCtrl', ['$scope', '$routeParams', function($scope, $routeParams) {
	var vm = this

	activate()

	function activate() {
		vm.type = $routeParams.type
		console.log(vm.type)
	}
	
}])

myApp.controller('detailCtrl', ['$scope', '$routeParams', function($scope, $routeParams) {
	var vm = this

	activate()

	function activate() {
		vm.type = $routeParams.type
		console.log(vm.type)
	}
}])

myApp.controller('createCtrl', ['$scope', 'HttpFactory', function($scope, HttpFactory) {
	var vm = this
	
	vm.anotherOption = anotherOption;
	vm.addPoll = addPoll;

	activate()

	function activate() {
		vm.numberOfOptions = []
		vm.kinds = [
			"food",
			"music",
			"movie",
			"games"
		]
		vm.optionsId = 3
	}

	function anotherOption() {
		vm.numberOfOptions.push(vm.optionsId);
		vm.optionsId += 1;
		

		
	}

	function addPoll(newPoll) {
		
		var poll = {
			data: newPoll,
			url: "/api/polls"
		}
		console.log(poll)
		HttpFactory.post(poll).then(function(res) {
			console.log(res)
		})
	}

}])
