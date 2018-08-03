'use strict';

app.controller('BlockPaymentsCtrl', function($scope, $mdDialog, dataService, miner, addr) {
	$scope.miner = miner;
	$scope.addr = addr;
	$scope.selected = [];

	$scope.options = {
		page: 1,
		limit: 15
	}

	$scope.loadBlockPayments = function () {
		var params = angular.copy($scope.options);
		params.page -= 1;
		var urlParams = $.param(params)

		dataService.getData("/miner/"+addr+"/blockrewards?"+urlParams, function(data){
			$scope.Blockpayments = data;
		});
	}

	$scope.loadBlockPayments();

	$scope.answer = function (answer) {
		$mdDialog.hide('close')
	}
});