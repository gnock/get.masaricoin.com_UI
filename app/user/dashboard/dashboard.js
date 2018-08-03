'use strict';

app.controller('DashboardCtrl', function ($scope, $route, $mdDialog, $pageVisibility, dataService, timerService, addressService, minerService) {

	$scope.profit = {
		'hashrate': '',
		'hashes': '',
		'effort': '',
		'current_effort': '',
	}

	$scope.Update = function () {

		var attr = $scope.profit;
		var OneHash = document.getElementById("OneHash").innerHTML
		var msrtousd = document.getElementById("msrusd").innerHTML
		var msrtoeur = document.getElementById("msreur").innerHTML
		var msrtogbp = document.getElementById("msrgbp").innerHTML

		var msrhour = OneHash * attr['hashrate'] * attr['hashes'];
		var msrday = OneHash * attr['hashrate'] * attr['hashes'] * 24;
		var usdhour = OneHash * attr['hashrate'] * attr['hashes'] * msrtousd;
		var usdday = OneHash * attr['hashrate'] * attr['hashes'] * 24 * msrtousd;
		var eurhour = OneHash * attr['hashrate'] * attr['hashes'] * msrtoeur;
		var eurday = OneHash * attr['hashrate'] * attr['hashes'] * 24 * msrtoeur;
		var gbphour = OneHash * attr['hashrate'] * attr['hashes'] * msrtogbp;
		var gbpday = OneHash * attr['hashrate'] * attr['hashes'] * 24 * msrtogbp;


		document.getElementById("msrhour").innerHTML = msrhour.toFixed(6);
		document.getElementById("msrday").innerHTML = " (" + msrday.toFixed(6) + ")";
		document.getElementById("usdhour").innerHTML = usdhour.toFixed(2);
		document.getElementById("usdday").innerHTML = " (" + usdday.toFixed(2) + ")";
		document.getElementById("eurhour").innerHTML = eurhour.toFixed(2);
		document.getElementById("eurday").innerHTML = " (" + eurday.toFixed(2) + ")";
		document.getElementById("gbphour").innerHTML = gbphour.toFixed(2);
		document.getElementById("gbpday").innerHTML = " (" + gbpday.toFixed(2) + ")";
	}

	$scope.minerStats = {};

	$scope.updateCharts = function () {

		minerService.updateStats($scope.addrStats, function (minerStats) {
			$scope.minerStats = minerStats;


		});
	}

	// Update miners everyime addrStats
	$scope.$parent.$watch('addrStats', function (newValue, oldValue) {
		$scope.updateCharts();
	});

	$scope.addAddress = function () {
		if ($scope.paymentAddress) {
			addressService.trackAddress($scope.paymentAddress);
			$scope.paymentAddress = "";
		}
	};

	$scope.deleteAddress = function (key, ev) {
		var confirm = $mdDialog.confirm()
			.title('Hide live stats?')
			.textContent('You can add it back by entering your wallet address again')
			.ariaLabel('Stop tracking payment address')
			.targetEvent(ev)
			.ok("Remove")
			.cancel("Cancel");

		$mdDialog.show(confirm).then(function () {
			addressService.deleteAddress(key);
		}, function () {
			// cancel do nothing
		});
	}

	$scope.setAlarm = function (addr, bool) {
		addressService.setAlarm(addr, bool);
	};


	$scope.viewPayments = function (ev, miner, addr) {

		$mdDialog.show({
				locals: {
					miner: miner,
					addr: addr
				},
				controller: "MinerPaymentsCtrl",
				templateUrl: 'user/dashboard/minerpayments.html',
				parent: angular.element(document.body),
				targetEvent: ev,
				clickOutsideToClose: true,
				fullscreen: !$scope.menuOpen
			})
			.then(function (answer) {
				$scope.status = 'You said the information was "' + answer + '".';
			}, function () {
				$scope.status = 'You cancelled the dialog.';
			});
	}
	
	$scope.viewBlockPayments = function (ev, miner, addr) {

		$mdDialog.show({
				locals: {
					miner: miner,
					addr: addr
				},
				controller: "BlockPaymentsCtrl",
				templateUrl: 'user/dashboard/blockpayments.html',
				parent: angular.element(document.body),
				targetEvent: ev,
				clickOutsideToClose: true,
				fullscreen: !$scope.menuOpen
			})
			.then(function (answer) {
				$scope.status = 'You said the information was "' + answer + '".';
			}, function () {
				$scope.status = 'You cancelled the dialog.';
			});
	}


	// Recurring API calls and timer
	var loadData = function () {
		_.each($scope.poolList, function (pool_type) {
			dataService.getData("/pool/stats/" + pool_type, function (data) {
				$scope.poolStats[pool_type] = data;
			});


			dataService.getData("/pool/blocks/" + pool_type, function (data) {
				if (data.length > 0) {
					$scope.lastBlock[pool_type] = data[0];
				}
				else {
					$scope.lastBlock[pool_type] = {
						ts: 0,
						hash: "",
						diff: 0,
						shares: 0,
						height: 0,
						valid: false,
						unlocked: false,
						pool_type: pool_type,
						value: 0
					}
				}
			});
		});


		// Call minerservice update
		$scope.updateCharts();
	};

	// No spawn xhr reqs in bg
	$pageVisibility.$on('pageFocused', function () {
		minerService.runService(true);
	});

	$pageVisibility.$on('pageBlurred', function () {
		minerService.runService(false);
	});

	// Register call with timer 
	timerService.register(loadData, $route.current.controller);
	loadData();


	$scope.$on("$routeChangeStart", function () {
		timerService.remove($route.current.controller);
	});
});