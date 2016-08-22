'use strict';

myApp.controller('createCtrl', ['$scope', 'HttpFactory', '$location', function($scope, HttpFactory, $location) {
	var vm = this;
	
	vm.anotherOption = anotherOption;
	vm.addPoll = addPoll;

	activate()

	function activate() {
		vm.numberOfOptions = []
		vm.kinds = [
			"food",
			"music",
			"movies",
			"games"
		]
		vm.optionsId = 0
	}

	function anotherOption() {
		vm.numberOfOptions.push(vm.optionsId);
		vm.optionsId += 1;
	}

	function addPoll(newPoll) {	
		var poll = {
			data: newPoll,
			url: "/api/polls/"
		}
		console.log(poll)
		HttpFactory.post(poll).then(function(res) {
			console.log(res)
			$location.url(['/poll-list/' + newPoll.kind])
		})
	}
}])