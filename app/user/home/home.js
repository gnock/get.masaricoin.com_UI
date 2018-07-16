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
		
			var end_amount = 20;
		var start_amount = 1;
		var payout_fee = 0.1;
                var slewData = [];
                var amount_interval = (end_amount - start_amount) / 50;
		var y_ticks = [payout_fee / 2, payout_fee];
		var x_ticks = [
			start_amount,
			(end_amount - start_amount) * 0.50 + start_amount,
			end_amount,
		];


                for (var amount = start_amount; amount.toFixed(8) <= end_amount; amount += amount_interval) {
                        var applied_fee = Math.max(0, 1 - (amount - start_amount) / (end_amount - start_amount)) * payout_fee;
			slewData.push({amount: parseFloat(amount.toFixed(8)), fee: parseFloat(applied_fee.toFixed(8))});
                }

		$scope.feeSlewChart = {
		    datasets: { global: slewData },
		    options: {
		        series: [
		            {"axis":"y","id":"global","dataset":"global","label":"Transaction Fee","key":"fee","color":"green","type":["line","area"]}
		        ],
		        allSeries: [],
		        axes: {
		            x: {
		                key: "amount",
		                type: "linear",
		                ticks: x_ticks,
		                includeZero: true,
		                tickFormat: function(value, index) {
		                    return value + " MSR";
		                }
		            },
		            y: {
		                ticksShift: {y: 3.5, x: 0},
		                ticks: y_ticks,
		            }
		        }
		    }
		};
		
		
		
		        dataService.getData("/pool/chart/networkHashrate", function(data){
				data = _.forEach(data, function(element) {
				element.ts = element.ts * 1000;
                element.ts = new Date(element.ts);
				element.hs = element.difficulty / 120;
				element.hs = element.difficulty / 1000;
            		});

            $scope.NetworkHashrateChart = {
                datasets: { global: data },
                options: {

                    series: [
                        {"axis":"y",
						 "id":"global",
						 "dataset":"global",
						 "label":"Total Network Hashrate",
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
