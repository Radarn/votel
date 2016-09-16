myApp.controller('listCtrl', ['$scope', '$routeParams', 'HttpFactory', function($scope, $routeParams, HttpFactory) {
	var vm = this

	vm.getPolls = getPolls;

	activate()

	function activate() {
		vm.type = $routeParams.type.toUpperCase();
		vm.votes = false;
		vm.getPolls();

	};

	function getPolls() {
		var pollKind = {
			kind: vm.type,
			url: "/api/getAllPolls/" + vm.type 
		}
		HttpFactory.get(pollKind).then(function(res) {
			vm.polls = res.data
		});
	};
}]);