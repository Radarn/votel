'use strict';

myApp.controller('dashboardCtrl', ['$scope', function($scope) {
	var vm = this

	activate()

	function activate() {
	
	}

}]);

myApp.controller('listCtrl', ['$scope', '$routeParams', 'HttpFactory', function($scope, $routeParams, HttpFactory) {
	var vm = this

	vm.getPolls = getPolls;

	activate()

	function activate() {
		vm.type = $routeParams.type
		vm.getPolls();
		console.log(vm.type)
	}

	function getPolls() {
		var pollKind = {
			kind: vm.type,
			url: "/api/polls"
		}
		HttpFactory.get(pollKind).then(function(res) {
			console.log(res)
			vm.polls = res.data
		})


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
