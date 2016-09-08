'use strict';

myApp.controller('detailCtrl', ['HttpFactory', '$routeParams', function(HttpFactory, $routeParams) {
	var vm = this

	vm.getPoll = getPoll;

	activate()

	function activate() {
		vm.type = $routeParams.type
		vm.id = $routeParams.id
		getPoll()
	};

	function getPoll() {
		var specificPoll = {
			url: "/api/polls/" + vm.id
		}
		HttpFactory.get(specificPoll).then(function(res) {
			vm.polls = res.data;
		});
	};
	
}]);