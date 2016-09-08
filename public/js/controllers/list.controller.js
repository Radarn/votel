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
		vm.currentChoiceId = voteOption.choiceId;
	};

	function submitVote() {
		var updatedVote = {
			url: "/api/votes/update/" + vm.currentChoiceId +":"+ vm.pollId
		}
		HttpFactory.get(updatedVote).then(function(res) {
			console.log("UPDATED" + res);
			getPolls();
		});
	};
}]);