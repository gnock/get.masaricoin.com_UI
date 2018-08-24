'use strict';
$.ajaxSetup({
  timeout: 3*1000
});
// Declare app level module which depends on views, and components
var app = angular.module('poolui', [
	'pool.globals',
	'ngRoute',
	'ngMaterial',
	'md.data.table',
	'angularMoment',
	'ngStorage',
	'ngAudio',
	'utils.strings',
	'utils.services',
	'utils.xhr',
	'n3-line-chart',
	'angular-page-visibility'
	]).config(['$locationProvider', '$routeProvider', '$mdThemingProvider', function($locationProvider, $routeProvider, $mdThemingProvider) {
		//$locationProvider.html5Mode(true)
		$locationProvider.hashPrefix('!');

		$mdThemingProvider.theme('default')
		.primaryPalette('grey')
		.accentPalette('light-blue');

		$routeProvider
		.when('/home', {
			templateUrl: 'user/home/home.html',
			controller: 'HomeCtrl',
			activetab: 'home'
		})
		.when('/dashboard', {
			templateUrl: 'user/dashboard/dashboard.html',
			controller: 'DashboardCtrl',
			activetab: 'dashboard'
		})
		.when('/blocks', {
			templateUrl: 'user/blocks/blocks.html',
			controller: 'BlocksCtrl',
			activetab: 'blocks'
		})
		.when('/payments', {
			templateUrl: 'user/payments/payments.html',
			controller: 'PaymentsCtrl',
			activetab: 'payments'
		})
		.when('/network', {
			templateUrl: 'user/network/network.html',
			controller: 'NetworkCtrl',
			activetab: 'network'
		})
		.when('/ports', {
			templateUrl: 'user/ports/ports.html',
			controller: 'PortsCtrl',
			activetab: 'ports'
		})
		.when('/help/chat', {
			templateUrl: 'user/help/chat.html',
			controller: 'ChatCtrl',
			activetab: 'support'
		})
		.when('/help/api', {
			templateUrl: 'user/help/api.html',
			controller: 'ApiCtrl',
			activetab: 'api'
		})
		
		.when('/exchanges', {
			templateUrl: 'user/dashboard/exchanges.php',
			controller: 'ExchangeCtrl',
			activetab: 'exchanges'
		})
		
		.when('/help/getting_started', {
			templateUrl: 'user/help/getting_started.html',
			controller: 'GettingStartedCtrl',
			activetab: 'help'
		})
		.when('/help/faq', {
			templateUrl: 'user/help/faq.html',
			controller: 'FAQCtrl',
			activetab: 'help'
		})
		.when('/superpools', {
			templateUrl: 'superpools.html',
			//controller: 'FAQCtrl',
			//activetab: 'help'
		})
		.when('/help/config_generator', {
                        templateUrl: 'user/help/config_generator.html',
                        controller: 'ConfigGeneratorCtrl',
                        activetab: 'help'
                });

		$routeProvider.otherwise({redirectTo: '/dashboard'});

	}]);

	app.controller('AppCtrl', function($scope, $rootScope, $location, $route, $routeParams, $anchorScroll, $window, $interval, $mdDialog, dataService, timerService, addressService, $mdSidenav, $mdMedia, $localStorage, ngAudio, GLOBALS){
		$scope.GLOBALS = GLOBALS;
		var appCache = window.applicationCache;
		$scope.$storage = $localStorage;

		$scope.poolList = ["pplns"];
		$scope.poolStats = {}; // All Pool stats
        $scope.poolHashrateChart = {}; // hashrate history
        $scope.poolMinersChart = {}; // miners history
		$scope.addrStats = {}; // All tracked addresses
		$scope.lastBlock = {};
		
		// for miner tracking
		$scope.yourTotalHashRate = 0;

		// Hashrate Alarm
		$scope.globalSiren = false;
		$scope.sirenAudio = ngAudio.load("assets/ding.wav");
		
		// Update global hashrate and set off alarm if any of the tracked addresses fall below the threshold
		var updateHashRate = function (addrStats){
			var totalHashRate = 0;
			var siren = false;
			
			_.each(addrStats, function(addr,index) {
				totalHashRate += addr.hash;
				if (addr.alarm && addr.hash < addr.alarmLimit) {
					siren=true;
				}
			});

			$scope.globalSiren=siren;
			if(totalHashRate > 0) {
				document.getElementById("RemUserPerc").style.display = "inline";
			} else {
				document.getElementById("RemUserPerc").style.display = "none";
			}
			
			if ($(window).width() < 700) {
   document.getElementById("RemUserPerc").style.display = "none";
}
			$scope.yourTotalHashRate = totalHashRate;
			
		}

		var playSiren = function (){
			($scope.globalSiren) ? $scope.sirenAudio.play() : $scope.sirenAudio.stop();
		}

		// ------- UI HELPERS

		$scope.menuOpen = $mdMedia('gt-md');
		$scope.$watch(function() { return $mdMedia('gt-md'); }, function(big) {
			$scope.menuOpen = $mdMedia('gt-md');
		});

		$scope.toggleSidenav = function (){
			if (!$mdMedia('gt-md')) {
				$mdSidenav('left').toggle();
			} else {
				// toggle boolean
				$scope.menuOpen = !$scope.menuOpen;
			}
		}

		// ------- Miner Login and auth
		$scope.minerLogin = function (ev) {
			$mdDialog.show({
				controller: "LoginCtrl",
				templateUrl: 'user/home/login.html',
				parent: angular.element(document.body),
				targetEvent: ev,
				clickOutsideToClose:true,
			  fullscreen: !$scope.menuOpen // Only for -xs, -sm breakpoints.
			})
			.then(function(answer) {
			  // success callback
			}, function(error) {
			  // error callback
			});
		}

		$scope.minerConsole = function (ev) {
			$mdDialog.show({
				locals: $scope.config,
				controller: "ConsoleCtrl",
				templateUrl: 'user/home/console.html',
				parent: angular.element(document.body),
				targetEvent: ev,
				clickOutsideToClose:true,
			  fullscreen: !$scope.menuOpen // Only for -xs, -sm breakpoints.
			})
			.then(function(answer){
				if(answer=='logout'){
					dataService.logout();
				}
			}, function(reason){
				// console.log(reason);
			});
		}

		$scope.isLoggedIn = function() {
			return dataService.isLoggedIn();
		}

		// ------- App Update
		var update = function() {
			if (appCache.status == window.applicationCache.UPDATEREADY) {
				appCache.swapCache(); 
				$window.location.reload();
			}
		}

		appCache.addEventListener("updateready", function(event) {
			update();
		}, false);

		var updateCache = function () {
			appCache.update();
		}

		// API Requests
		
		
		
		var UpdateValues = function(previous, updated, span) {
		if(previous > updated) {
					document.getElementById(span).style.color = '#cc0000';
					document.getElementById(span).innerHTML =  "&#8675; " + updated;
				} else if (previous < updated) {
					document.getElementById(span).style.color = '#009966';
					document.getElementById(span).innerHTML = "&#8673; " + updated;
				} else {
					document.getElementById(span).style.color = '';
					document.getElementById(span).innerHTML = "&#8674; " + updated;
				}
			}
		var UpdatePercents = function(percent,span) {
			
			if (percent > 0) {
				document.getElementById(span).style.color = '#009966';
				document.getElementById(span).innerHTML = "&#9652; " + percent + "%";	
			} else  if (percent < 0) {
				document.getElementById(span).style.color = '#cc0000';
				document.getElementById(span).innerHTML = "&#9662; " + percent + "%";	
			} else {
				document.getElementById(span).innerHTML = "&#9662; " + percent + "%";
			}
		}
		
		
		
		var loadData = function () {
			dataService.getData("/pool/stats", function(data){
				$scope.poolList = data.pool_list;
				$scope.poolStats.global = data.pool_statistics;
			});

			dataService.getData("/network/stats", function(data){
				$scope.network = data;
			});
			
			dataService.getData("/pool/blocks/pplns?limit=1", function(data){
				$scope.LastBlockData = data[0].value; 
				$scope.LastBlockShares = data[0].shares;
				$scope.LastBlockDiff = data[0].diff;
			});

		
			dataService.getData("/pool/blocks/pplns?limit=10000", function(data) {
				var last24 = [];
				var ts = Math.round(new Date().getTime()) /1000;
    			var tsYesterday = Math.round(ts - (24 * 3600)) ;
				
				var blockCount = 0;
                var totalLuck = 0;
           			$scope.pulledBlocks = data;
            			for (var i = 0; i < $scope.pulledBlocks.length; i++) {
            				totalLuck += $scope.pulledBlocks[i].shares / $scope.pulledBlocks[i].diff;
            				blockCount += 1;
							var blocktime = Math.round($scope.pulledBlocks[i].ts / 1000);
							if(blocktime >= tsYesterday)
							{
								last24.push(blocktime);
							}
				}
				$scope.lastdayblocks = last24.length;//last24.length;
				$scope.overallEffort = (totalLuck / blockCount)*100;
            		});
				
				
				$.getJSON("https://www.southxchange.com/api/price/msr/usd", function(data) {
				$scope.aeonusd = (data["Last"] * 1).toFixed(4);
				});
				
				$.getJSON("https://api.coinmarketcap.com/v1/ticker/masari/?convert=EUR", function(data) {
				$scope.btceur = (data[0].price_eur * 1).toFixed(3);
				$scope.msreur = (data[0].price_eur * 1).toFixed(4);
				$scope.eurhour = data[0].percent_change_1h;
				$scope.eurday = data[0].percent_change_24h;
				$scope.eurweek = data[0].percent_change_7d;
				});
				$.getJSON("https://api.coinmarketcap.com/v1/ticker/masari/?convert=USD", function(data) {
				$scope.msrusd = (data[0].price_usd * 1).toFixed(4);
				$scope.btcusd = (data[0].price_usd * 1).toFixed(3);
				$scope.usdhour = data[0].percent_change_1h;
				$scope.usdday = data[0].percent_change_24h;
				$scope.usdweek = data[0].percent_change_7d;
				});
				$.getJSON("https://api.coinmarketcap.com/v1/ticker/masari/?convert=GBP", function(data) {
				$scope.msrgbp = (data[0].price_gbp * 1).toFixed(4);
				$scope.gbphour = data[0].percent_change_1h;
				$scope.gbpday = data[0].percent_change_24h;
				$scope.gbpweek = data[0].percent_change_7d;
				});
				$.getJSON("https://api.coinmarketcap.com/v1/ticker/masari/?convert=CAD", function(data) {
				$scope.msrcad = (data[0].price_cad * 1).toFixed(4);
				$scope.cadhour = data[0].percent_change_1h;
				$scope.cadday = data[0].percent_change_24h;
				$scope.cadweek = data[0].percent_change_7d;
				});
				$.getJSON("https://api.coinmarketcap.com/v1/ticker/masari/", function(data) {
				$scope.msrbtc = (data[0].price_btc * 1).toFixed(8);
				$scope.btchour = data[0].percent_change_1h;
				$scope.btcday = data[0].percent_change_24h;
				$scope.btcweek = data[0].percent_change_7d;
				
				
				});
				
				$.getJSON("https://tradeogre.com/api/v1/ticker/BTC-MSR", function(data) {
				$scope.msrbtcto = (data["price"] * 1).toFixed(8);
				});
				$.getJSON("https://www.southxchange.com/api/price/msr/btc", function(data) {
				$scope.msrbtcse = (data["Last"] * 1).toFixed(8);
				});
				
				//
				
			
					
	        						// CRYPTONATOR XMR/USD RATE
				//$scope.aeonweekrev = (1000/$scope.network.difficulty)*86400*7*$scope.network.value*$scope.aeonusd;
			
			//$.getJSON("https://api.coinmarketcap.com/v1/ticker/aeon/?convert=USD", function(data) {
				//$scope.etnusd = (data[0].price_usd * 1).toFixed(3);						// CRYPTONATOR XMR/USD RATE
				//$scope.etnweekrev = (1000/$scope.network.difficulty)*86400*7*$scope.network.value*$scope.etnusd;
			//});				
		}
		

		var loadOnce = function () {
			dataService.getData("/config", function(data){
				$scope.config = data;
			});
			dataService.getData("/pool/ports", function(data){
				var total = 0;
				_.each(data.global, function (port, index) {
					total +=  port.miners;
				})
				$scope.WorkersTotal = total;
		
			});
		
		}

		// For FAQ
		$rootScope.$on('$routeChangeSuccess', function(newRoute, oldRoute) {
			$location.hash($routeParams.scrollTo);
			$anchorScroll();  
		});

		// Start doing things
		loadOnce();
		loadData();
		update();
		
		// Start the timer and register global requests
		timerService.startTimer(GLOBALS.api_refresh_interval);
		timerService.register(loadData, 'global');
		$interval(updateCache, GLOBALS.app_update_interval); // check for app updates every 5 mins
		
		
		var changeBTCspan = "changeBTCspan";
		var changeUSDspan = "changeUSDspan";
		var changeEURspan = "changeEURspan";
		var changeGBPspan = "changeGBPspan";
		var changeCADspan = "changeCADspan";
		
		
		
		var changeBTC = $scope.msrbtc;
		var changeUSD = $scope.msrusd;
		var changeEUR = $scope.msreur;
		var changeGBP = $scope.msrgbp;
		var changeCAD = $scope.msrcad;
		
		

		
		$interval(function(){ // Start price timer 
	            
				
				$.getJSON("https://www.southxchange.com/api/price/msr/usd", function(data) {
				$scope.aeonusd = (data["Last"] * 1).toFixed(4);
				});
				
				$.getJSON("https://api.coinmarketcap.com/v1/ticker/masari/?convert=EUR", function(data) {
				$scope.btceur = (data[0].price_eur * 1).toFixed(3);
				$scope.msreur = (data[0].price_eur * 1).toFixed(4);
				$scope.eurhour = data[0].percent_change_1h;
				$scope.eurday = data[0].percent_change_24h;
				$scope.eurweek = data[0].percent_change_7d;
				});
				$.getJSON("https://api.coinmarketcap.com/v1/ticker/masari/?convert=USD", function(data) {
				$scope.msrusd = (data[0].price_usd * 1).toFixed(4);
				$scope.btcusd = (data[0].price_usd * 1).toFixed(3);
				$scope.usdhour = data[0].percent_change_1h;
				$scope.usdday = data[0].percent_change_24h;
				$scope.usdweek = data[0].percent_change_7d;
				});
				$.getJSON("https://api.coinmarketcap.com/v1/ticker/masari/?convert=GBP", function(data) {
				$scope.msrgbp = (data[0].price_gbp * 1).toFixed(4);
				$scope.gbphour = data[0].percent_change_1h;
				$scope.gbpday = data[0].percent_change_24h;
				$scope.gbpweek = data[0].percent_change_7d;
				});
				$.getJSON("https://api.coinmarketcap.com/v1/ticker/masari/?convert=CAD", function(data) {
				$scope.msrcad = (data[0].price_cad * 1).toFixed(4);
				$scope.cadhour = data[0].percent_change_1h;
				$scope.cadday = data[0].percent_change_24h;
				$scope.cadweek = data[0].percent_change_7d;
				});
				$.getJSON("https://api.coinmarketcap.com/v1/ticker/masari/", function(data) {
				$scope.msrbtc = (data[0].price_btc * 1).toFixed(8);
				$scope.btchour = data[0].percent_change_1h;
				$scope.btcday = data[0].percent_change_24h;
				$scope.btcweek = data[0].percent_change_7d;
				
				});
				
				$.getJSON("https://tradeogre.com/api/v1/ticker/BTC-MSR", function(data) {
				$scope.msrbtcto = (data["price"] * 1).toFixed(8);
				});
				$.getJSON("https://www.southxchange.com/api/price/msr/btc", function(data) {
				$scope.msrbtcse = (data["Last"] * 1).toFixed(8);
				});
				
				
				
				UpdateValues(changeBTC,$scope.msrbtc,changeBTCspan);
				UpdateValues(changeUSD,$scope.msrusd,changeUSDspan);
				UpdateValues(changeEUR,$scope.msreur,changeEURspan);
				UpdateValues(changeGBP,$scope.msrgbp,changeGBPspan);
				UpdateValues(changeCAD,$scope.msrcad,changeCADspan);
				
				changeBTC = $scope.msrbtc;
				changeUSD = $scope.msrusd;
				changeEUR = $scope.msreur;
				changeGBP = $scope.msrgbp;
				changeCAD = $scope.msrcad;
					

			
				
						// CRYPTONATOR XMR/USD RATE
				//$scope.aeonweekrev = (1000/$scope.network.difficulty)*86400*7*$scope.network.value*$scope.aeonusd;
			
		}, 60000);
		
		// Start address tracking servuce after starting timer, only one callback supported at a time
		addressService.start(function(addrStats) {
			$scope.addrStats = addrStats;
			updateHashRate(addrStats);
			playSiren();
		}
		);


		// Sponsor
		$scope.sponsor_open = false
		

	});

