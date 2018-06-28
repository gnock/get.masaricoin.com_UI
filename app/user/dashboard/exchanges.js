'use strict';

app.controller('ExchangeCtrl', function($scope, $route, dataService, timerService) {

    
	function calls(){
		
		$.ajax({
    	url:'https://www.southxchange.com/api/trades/msr/btc'
		}).done(function(data){
    	tickerSE(data);
		});
			
		$.ajax({
    	url:'https://stocks.exchange/api2/trades?pair=MSR_BTC'
		}).done(function(data){
    	tickerSTE(data["result"]);
		});	
		
		$.ajax({
        url:'https://tradeogre.com/api/v1/history/BTC-MSR'
        }).done(function(data){
        tickerTO(JSON.parse(data));
        });
		
		$.ajax({
    	url:'https://testnet.masaricoin.com/proxy.php?url='+encodeURIComponent('https://api.crex24.com/v2/public/recentTrades?instrument=MSR-BTC&limit=25')
		}).done(function(data){
    	tickerCREX(data);
		});	
	
	
  $.getJSON('https://testnet.masaricoin.com/proxy.php?url='+encodeURIComponent('https://api.crex24.com/v2/public/tickers?instrument=MSR-BTC'), function(data) {
                $scope.CREXPrice = (data[0].last * 1).toFixed(8);
                $scope.CREXBid = (data["bid"] * 1).toFixed(8);
                $scope.CREXAsk = (data["ask"] * 1).toFixed(8);
                $scope.CREXVar = (data["percentChange"] * 1).toFixed(2);
                $scope.CREXVol = (data["volumeInBtc"] * 1).toFixed(4);
                $scope.CREXHigh = (data["high"] * 1).toFixed(8);
                $scope.CREXLow = (data["low"] * 1).toFixed(8);
                });
	
	$.getJSON("https://www.southxchange.com/api/price/msr/btc", function(data) {
				$scope.SEPrice = (data["Last"] * 1).toFixed(8);
				$scope.SEBid = (data["Bid"] * 1).toFixed(8);
				$scope.SEAsk = (data["Ask"] * 1).toFixed(8);
				$scope.SEVar = (data["Variation24Hr"] * 1).toFixed(2);
				$scope.SEVol = (data["Volume24Hr"] * 1).toFixed(4);
				});
				
	$.getJSON("https://stocks.exchange/api2/ticker", function(data) {
			
		for (var stedata in data){
			var name = data[stedata].market_name;
			if(name == "MSR_BTC") {
				$scope.STEPrice = parseFloat(data[stedata].last).toFixed(8);
				$scope.STEBid = parseFloat(data[stedata].bid).toFixed(8);
				$scope.STEAsk = parseFloat(data[stedata].ask).toFixed(8);
				$scope.STEPrev = parseFloat(data[stedata].lastDayAgo).toFixed(8);
				$scope.STEVol = parseFloat(data[stedata].vol).toFixed(4);
				}
			}
		}, 'json');
		
		$.getJSON("https://api.altex.exchange/v1/ticker", function(data) {
				$scope.ALTPrice = data["data"].BTC_MSR.last
				$scope.ALTBid = data["data"].BTC_MSR.bid;
				$scope.ALTAsk = data["data"].BTC_MSR.ask;
				$scope.ALTHigh = data["data"].BTC_MSR.high24;
				$scope.ALTLow = data["data"].BTC_MSR.low24;
				$scope.ALTVol = data["data"].BTC_MSR.volume
				$scope.ALTVar = data["data"].BTC_MSR.change;
			}, 'json');
		
		$.getJSON("https://tradeogre.com/api/v1/ticker/BTC-MSR", function(data) {
				$scope.TOPrice = (data["price"] * 1).toFixed(8);
				$scope.TOPrev = (data["initialprice"] * 1).toFixed(8);
				$scope.TOHigh = (data["high"] * 1).toFixed(8);
				$scope.TOLow = (data["low"] * 1).toFixed(8);
				$scope.TOVol = (data["volume"] * 1).toFixed(4);
				$scope.TOBid = (data["bid"] * 1).toFixed(8);
				$scope.TOAsk = (data["ask"] * 1).toFixed(8);
				
				});
	}
	
	function tickerSE(points) {
		
		var ctx = document.getElementById('SouthEx').getContext('2d');
		var data = [];
    	var SEType = [];
    	var SEqty = [];
		var iLabels = [];
		
		for( var iPoint in points){
        data.push((parseFloat(points[iPoint].Price).toFixed(8)));
        SEType.push(points[iPoint].Type.toUpperCase());
        SEqty.push(points[iPoint].Amount);
		var tempdate = new Date(points[iPoint].At);
		
		iLabels.push(tempdate.toTimeString());
    }
		if( /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) ) {
    		ctx.canvas.height = 250;
			ctx.canvas.width = 400;
		}
		var chart = new Chart(ctx, {
    // The type of chart we want to create
    	type: 'line',
		
		

    // The data for our dataset
    data: {
        labels: iLabels.reverse(),
            datasets: [{
               label: "Price",
                SEtype: SEType.reverse(),
                SEqty: SEqty.reverse(),

                fill: false,
                lineTension: 0,
                borderColor: 'rgb(63, 138, 205)',
                data: data.reverse(),

        }]
    },


    // Configuration options go here
    options: {
        legend: {
            display: false
        },
        scales: {
            xAxes: [{
                display: false
            }]
        },
        tooltips: {
			
			
            custom: function(tooltip) {
                if (!tooltip) return;
                // disable displaying the color box;
                tooltip.displayColors = false;
            },
            callbacks: {
                label: function(tooltipItem, data) {
                    var label = data.datasets[tooltipItem.datasetIndex].label;
                    var value = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
                    var SEtypedis = data.datasets[tooltipItem.datasetIndex].SEtype[tooltipItem.index];
                    var SEqtydis = data.datasets[tooltipItem.datasetIndex].SEqty[tooltipItem.index];
                    return [label + ': ' + value + '', 'Quantity: ' + SEqtydis + '', 'Type: ' + SEtypedis];
                }
			}
        }
    }
});
}

function tickerSTE(points) {
		
		var ctx = document.getElementById('StocksEx').getContext('2d');
		var data = [];
    	var SEType = [];
    	var SEqty = [];
		var iLabels = [];
		
		for( var iPoint in points){
        data.push((parseFloat(points[iPoint].price).toFixed(8)));
        SEType.push(points[iPoint].type);
        SEqty.push(points[iPoint].quantity);
		var tempdate = new Date(points[iPoint].timestamp);
		
		iLabels.push(tempdate.toTimeString());
    }
		if( /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) ) {
    		ctx.canvas.height = 250;
			ctx.canvas.width = 400;
		}
		var chart = new Chart(ctx, {
    // The type of chart we want to create
    	type: 'line',

    // The data for our dataset
    data: {
        labels: iLabels.reverse(),
            datasets: [{
               label: "Price",
                SEtype: SEType.reverse(),
                SEqty: SEqty.reverse(),

                fill: false,
                lineTension: 0,
                borderColor: 'rgb(45, 49, 122)',
                data: data.reverse(),

        }]
    },


    // Configuration options go here
    options: {
        legend: {
            display: false
        },
        scales: {
            xAxes: [{
                display: false
            }]
        },
        tooltips: {
			
			
            custom: function(tooltip) {
                if (!tooltip) return;
                // disable displaying the color box;
                tooltip.displayColors = false;
            },
            callbacks: {
                label: function(tooltipItem, data) {
                    var label = data.datasets[tooltipItem.datasetIndex].label;
                    var value = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
                    var SEtypedis = data.datasets[tooltipItem.datasetIndex].SEtype[tooltipItem.index];
                    var SEqtydis = data.datasets[tooltipItem.datasetIndex].SEqty[tooltipItem.index];
                    return [label + ': ' + value + '', 'Quantity: ' + SEqtydis + '', 'Type: ' + SEtypedis];
                }
			}
        }
    }
});
}
function tickerTO(points) {
		
		var ctx = document.getElementById('TradeOgre').getContext('2d');
		var data = [];
    	var SEType = [];
    	var SEqty = [];
		var iLabels = [];
		
		for (var iPoint in points){
		
		
        data.push((parseFloat(points[iPoint].price).toFixed(8)));
		SEType.push(points[iPoint].type.toUpperCase());
        SEqty.push(points[iPoint].quantity);
		var tempdate = new Date(points[iPoint].date);
		iLabels.push(tempdate.toTimeString());
		
		
    }
		if( /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) ) {
    		ctx.canvas.height = 250;
			ctx.canvas.width = 400;
		}
		var chart = new Chart(ctx, {
    // The type of chart we want to create
    	type: 'line',

    // The data for our dataset
    data: {
        labels: iLabels,
            datasets: [{
               label: "Price",
                SEtype: SEType,
                SEqty: SEqty,

                fill: false,
                lineTension: 0,
                borderColor: 'rgb(226, 227, 160)',
                data: data,

        }]
    },


    // Configuration options go here
    options: {
        legend: {
            display: false
        },
        scales: {
            xAxes: [{
                display: false
            }]
        },
        tooltips: {
			
			
            custom: function(tooltip) {
                if (!tooltip) return;
                // disable displaying the color box;
                tooltip.displayColors = false;
            },
            callbacks: {
                label: function(tooltipItem, data) {
                    var label = data.datasets[tooltipItem.datasetIndex].label;
                    var value = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
                    var SEtypedis = data.datasets[tooltipItem.datasetIndex].SEtype[tooltipItem.index];
                    var SEqtydis = data.datasets[tooltipItem.datasetIndex].SEqty[tooltipItem.index];
                    return [label + ': ' + value + '', 'Quantity: ' + SEqtydis + '', 'Type: ' + SEtypedis];
                }
			}
        }
    }
});
}

function tickerCREX(points) {
		
		var ctx = document.getElementById('Crex').getContext('2d');
		var data = [];
    	var SEType = [];
    	var SEqty = [];
		var iLabels = [];
		
		for (var iPoint in points){
        data.push((parseFloat(points[iPoint].price).toFixed(8)));
		console.log(points[iPoint].price);
		SEType.push(points[iPoint].side.toUpperCase());
        SEqty.push(points[iPoint].volume);
		var tempdate = new Date(points[iPoint].time);
		iLabels.push(points[iPoint].timestamp);
    }
		if( /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) ) {
    		ctx.canvas.height = 250;
			ctx.canvas.width = 400;
		}
		var chart = new Chart(ctx, {
    // The type of chart we want to create
    	type: 'line',

    // The data for our dataset
    data: {
        labels: iLabels.reverse(),
            datasets: [{
               label: "Price",
                SEtype: SEType.reverse(),
                SEqty: SEqty.reverse(),

                fill: false,
                lineTension: 0,
                borderColor: 'rgb(76, 160, 160)',
                data: data.reverse(),

        }]
    },


    // Configuration options go here
    options: {
        legend: {
            display: false
        },
        scales: {
            xAxes: [{
                display: false
            }]
        },
        tooltips: {
			
			
            custom: function(tooltip) {
                if (!tooltip) return;
                // disable displaying the color box;
                tooltip.displayColors = false;
            },
            callbacks: {
                label: function(tooltipItem, data) {
                    var label = data.datasets[tooltipItem.datasetIndex].label;
                    var value = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
                    var SEtypedis = data.datasets[tooltipItem.datasetIndex].SEtype[tooltipItem.index];
                    var SEqtydis = data.datasets[tooltipItem.datasetIndex].SEqty[tooltipItem.index];
                    return [label + ': ' + value + '', 'Quantity: ' + SEqtydis + '', 'Type: ' + SEtypedis];
                }
			}
        }
    }
});
}

	
	
	
	
	
	
	timerService.register(calls);
    calls();
    timerService.register(tickerSE, 'SouthEx');
    tickerSE();
	timerService.register(tickerSTE, 'StocksEx');
    tickerSTE();
	timerService.register(tickerTO, 'TradeOgre');
    tickerTO();
	timerService.register(tickerCREX, 'Crex');
    tickerCREX();
	
	
	

    $scope.$on("$routeChangeStart", function () {
        timerService.remove("SouthEx");
		timerService.remove("StocksEx");
		timerService.remove("TradeOgre");
		timerService.remove("Crex");
		
    });

});
