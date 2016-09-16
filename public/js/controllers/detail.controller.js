'use strict';

myApp.controller('detailCtrl', ['HttpFactory', '$routeParams', function(HttpFactory, $routeParams) {
	var vm = this

	vm.getPoll = getPoll;
	vm.isChecked = isChecked;
	vm.submitVote = submitVote;

	activate()

	function activate() {
		vm.type = $routeParams.type
		vm.pollId = $routeParams.id
		getPoll()
	};

	function getPoll() {
		var specificPoll = {
			url: "/api/polls/" + vm.pollId
		}
		HttpFactory.get(specificPoll).then(function(res) {
			vm.polls = res.data;
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
		console.log(voteOption)
	};

	function submitVote() {
		var updatedVote = {
			url: "/api/votes/update/" + vm.currentChoiceId +":"+ vm.pollId
		};
		HttpFactory.get(updatedVote).then(function(res) {
			console.log(res);
			getPoll();
		});
	};
	
}]);