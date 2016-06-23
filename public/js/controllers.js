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
	vm.showVotes = showVotes;
	vm.isChecked = isChecked;
	vm.submitVote = submitVote;
	vm.submitVote = getSpecificPoll;

	activate()

	function activate() {
		vm.type = $routeParams.type;
		vm.votes = false;
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

	function getSpecificPoll(id) {
		console.log(id)
		var specificPoll = {
			params: id,
			url: "/api/polls/getDetailed"
		}
		HttpFactory.get(specificPoll).then(function(res) {
			console.log(res)
			
		})
	}

	function isChecked() {
		$('input[type=checkbox]').click(function() {
		        var groupName = $(this).attr('groupname');

		            if (!groupName)
		                return;

		            var checked = $(this).is(':checked');

		            $("input[groupname='" + groupName + "']:checked").each(function() {
		                $(this).prop('checked', '');
		            });

		            if (checked)
		                $(this).prop('checked', 'checked');

		        });
	}

	function showVotes(poll) {
		if (poll.show === false) {
			poll.show = true;
		} else {
			poll.show = false;
		}
		getSpecificPoll(poll._id)
	}

	function submitVote() {
	
		console.log("submit!")
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

myApp.controller('createCtrl', ['$scope', 'HttpFactory', '$location', function($scope, HttpFactory, $location) {
	var vm = this
	
	vm.anotherOption = anotherOption;
	vm.addPoll = addPoll;

	activate()

	function activate() {
		vm.numberOfOptions = [1, 2]
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
			$location.url(['/poll-list/' + newPoll.kind])
		})
	}

}])
