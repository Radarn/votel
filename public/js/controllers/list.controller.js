myApp.controller('listCtrl', ['$routeParams', 'HttpFactory', function($routeParams, HttpFactory) {
	var vm = this

	vm.getPolls = getPolls;

	activate()

	function activate() {
		vm.category = $routeParams.type;
		vm.categoryTitle = $routeParams.type.toUpperCase()
		vm.votes = false;
		vm.getPolls();

	};

	function getPolls() {
		var pollKind = {
			kind: vm.type,
			url: "/api/getAllPolls/" + vm.category 
		}
		HttpFactory.get(pollKind).then(function(res) {
			vm.polls = res.data
		});
	};
}]);