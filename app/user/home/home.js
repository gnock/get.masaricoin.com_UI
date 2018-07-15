'use strict';

app.controller('HomeCtrl', function($scope, $route, dataService, timerService) {

    function ticker() {
        dataService.getData("/pool/chart/hashrate/pplns", function(data){
		data = _.forEach(data, function(element) {
                element.ts = new Date(element.ts);
				element.hs = element.hs/1000;
				
            		});

            $scope.poolHashrateChart = {
                datasets: { global: data },
                options: {
/*				    scales: {
						yAxes: [{
							ticks: {
								suggestedMin: 50,
								suggestedMax: 10000000
							}
						}]
					},
					tooltips: {
						enabled: true,
						mode: 'single',
						callbacks: {
							label: function(tooltipItems, data) { 
							return tooltipItems.yLabel + ' €';
							}
						}
					},*/
                    series: [
                        {"axis":"y",
						 "id":"global",
						 "dataset":"global",
						 "label":"Total Pool Hashrate",
						 "key":"hs",
						 "color":"green",
						 "type":["line","area"]}
                    ],
                    allSeries: [],
                    axes: {
                        x: {
                            key: "ts",
                            type: "date"
                        }
                    }
                }
            }
        });
		
		
		        dataService.getData("/pool/chart/networkHashrate", function(data){
				data = _.forEach(data, function(element) {
                element.ts = new Date(element.ts) * 1000;
				element.hs = element.difficulty / 120;
				element.hs = element.difficulty / 1000;
            		});

            $scope.NetworkHashrateChart = {
                datasets: { global: data },
                options: {
/*				    scales: {
						yAxes: [{
							ticks: {
								suggestedMin: 50,
								suggestedMax: 10000000
							}
						}]
					},
					tooltips: {
						enabled: true,
						mode: 'single',
						callbacks: {
							label: function(tooltipItems, data) { 
							return tooltipItems.yLabel + ' €';
							}
						}
					},*/
                    series: [
                        {"axis":"y",
						 "id":"global",
						 "dataset":"global",
						 "label":"Total Pool Hashrate",
						 "key":"hs",
						 "color":"green",
						 "type":["line","area"]}
                    ],
                    allSeries: [],
                    axes: {
                        x: {
                            key: "ts",
                            type: "date"
                        }
                    }
                }
            }
        });
    }

    function ticker2() {
        dataService.getData("/pool/blocks", function(data){
	    var i = 25;
            data = _.forEach(data, function(element) {
//                element.ts = new Date(element.ts);
		element.value = element.shares/(element.diff/100)
		element.ts = i;
		i-=1;
            });
 
            $scope.poolEffortChart = {
                datasets: { global: data },
                options: {
                    series: [
                        {"axis":"y","id":"global","dataset":"global","label":"Effort","interpolation":{mode: "bundle", tension: 1},"key":"value","color":"green","type":["line"]},
			{"axis":"y","id":"global1","dataset":"global","label":"Effort","key":"value","color":"green","type":["dot"]}
                    ],
                    allSeries: [],
                    axes: {
                        x: {
                            key: "ts"
//                            type: "date"
                        }
                    }
                }
            }
        });
    }

    function ticker3() {
        dataService.getData("/pool/chart/miners", function(data){

            data = _.forEach(data, function(element) {
                element.ts = new Date(element.ts);
            });
 
            $scope.poolMinersChart = {
                datasets: { global: data },
                options: {
                    series: [
                        {"axis":"y","id":"global","dataset":"global","label":"Total Pool Miners","key":"cn","color":"green","type":["line","area"]}
                    ],
                    allSeries: [],
                    axes: {
                        x: {
                            key: "ts",
                            type: "date"
                        }
                    }
                }
            }
        });
    }
	        			//var MSR = 0;
						/*
						var MSR = {};
						$.ajax({
        				url: "https://www.southxchange.com/api/price/msr/usd",
        				async: false,
        				dataType: 'json',
        				success: function(data) {
            				MSR = data.Last;
        				}
    				});
					
						//var BTC = 0;
						
						var BTC = {};
    					$.ajax({
        				url: "https://www.southxchange.com/api/price/msr/btc",
        				async: false,
        				dataType: 'json',
        				success: function(data) {
            				BTC = data.Last;
        				}
    				});
					
				$scope.aeonusd = (MSR * 1).toFixed(4);
				$scope.msrbtc = (BTC * 1).toFixed(8);
				*/
    timerService.register(ticker, 'poolHashrateChart');
    ticker();

    timerService.register(ticker2, 'poolMinersChart');
    ticker2();

    timerService.register(ticker3, 'poolEffortChart');
    ticker3();

    $scope.$on("$routeChangeStart", function () {
        timerService.remove("poolHashrateChart");
    });

    $scope.$on("$routeChangeStart", function () {
        timerService.remove("poolMinersChart");
    });

    $scope.$on("$routeChangeStart", function () {
        timerService.remove("poolEffortChart");
    });
});
