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
	vm.getSpecificPoll = getSpecificPoll;

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
			url: "/api/getAllPolls/" + vm.type 
		}
		HttpFactory.get(pollKind).then(function(res) {
			
			console.log(res.data)
			vm.polls = res.data
		})
	}

	function getSpecificPoll(id) {
		console.log("POLL ID " + id)
		var specificPoll = {
			params: id,
			url: "/api/polls/" + id
		}
		HttpFactory.get(specificPoll).then(function(res) {
			console.log(res)
		})
	}

	function isChecked(voteOption) {
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

		vm.currentOptionId = voteOption._id
		console.log("VoteOption ID " + vm.currentOptionId)
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
	
		console.log("submit!" + vm.currentOptionId)
		
		var specificVote = {
			params: vm.currentOptionId,
			url: "/api/votes/" + vm.currentOptionId
		}
		HttpFactory.get(specificVote).then(function(res) {
			
			vm.numberOfVotes = res.data[0].options[0].votes
			updateNumberOfVotes()
		})
	}

	function updateNumberOfVotes() {
		console.log("updating from " + vm.numberOfVotes + " to " + (vm.numberOfVotes + 1))
		var incrementedVote = vm.numberOfVotes + 1
		var updatedVote = {
			params: incrementedVote,
			url: "/api/votes/update/" + vm.currentOptionId
		}
		HttpFactory.get(updatedVote).then(function(res) {
			console.log(res);
			getPolls();
			
		})
	}
}])

myApp.controller('detailCtrl', ['$scope', '$routeParams', function($scope, $routeParams) {
	var vm = this
	console.log("DETAIL CTRL")
	activate()

	function activate() {
		vm.type = $routeParams.type
		vm.id = $routeParams.id
		console.log(vm.id)
	}
}])

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
