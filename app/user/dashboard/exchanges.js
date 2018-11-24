'use strict';

app.controller('ExchangeCtrl', function($scope, $route, dataService, timerService) {
	
		var UpdatePrice = function(previous, updated, span) {
		if(previous > updated) {
					document.getElementById(span).style.color = '#cc0000';
					document.getElementById(span).innerHTML =  "&#8675; " + updated;
				} else if (previous < updated) {
					document.getElementById(span).style.color = '#009966';
					document.getElementById(span).innerHTML = "&#8673; " + updated;
				} else {
					document.getElementById(span).style.color = '#333333';
					document.getElementById(span).innerHTML = "&#8674; " + updated;
				}
			}
			
				var changeTO = '';
				var changeTOAsk = '';
				var changeTOBid = '';
				var changeCrypt = '';
				var changeCryptAsk = '';
				var changeCryptBid = '';
		
		
    function calls() {
		
		
		var changeTOspan = "changeTOspan";
		var changeTOAskspan = "changeTOAskspan";
		var changeTOBidspan = "changeTOBidspan";
		var changeCryptspan = "changeCryptspan";
		var changeCryptAskspan = "changeCryptAskspan";
		var changeCryptBidspan = "changeCryptBidspan";

        $.ajax({
            url: 'https://www.southxchange.com/api/trades/msr/btc'
        }).done(function(data) {
			var rawData = data.reverse();
			 var i = 0;
        for (i = rawData.length-1;i >= rawData.length-1;i--){
            
			$scope.SEQuantity = (rawData[i].Amount).toFixed(4);
			var SELastType = rawData[i].Type
			$scope.SEType = SELastType.toUpperCase();
			
			var SEDate = new Date(rawData[i].At *1000);
			$scope.SELastUpdate = SEDate.toLocaleString();
        }
           
        });
		

     	$.ajax({
            url: 'https://testnet.masaricoin.com/proxy.php?url=' + encodeURIComponent('https://app.stocks.exchange/api2/trades?pair=MSR_BTC')
        }).done(function(data) {
            //tickerSTE(data["result"]);
			var rawData = data['result'].reverse();
			var i = 0;
        	for (i = rawData.length-1;i >= rawData.length-1;i--){
            
			$scope.STEQuantity = rawData[i].quantity;
			$scope.STEType = rawData[i].type;
			var STEDate = new Date(rawData[i].timestamp *1000);
			$scope.STELastUpdate = STEDate.toLocaleString();
        }
        });
        
		
		

        $.ajax({
        url:'https://tradeogre.com/api/v1/history/BTC-MSR'
        }).done(function(data){
        var rawData = JSON.parse(data);
       
        var i = 0;
        for (i = rawData.length-1;i >= rawData.length-1;i--){
            
			$scope.TOQuantity = rawData[i].quantity;
			$scope.TOType = rawData[i].type.toUpperCase();
			var TODate = new Date(rawData[i].date *1000);
			$scope.TOLastUpdate = TODate.toLocaleString();
        }
        });
		
		$.ajax({
        url:'https://www.cryptopia.co.nz/api/GetMarketHistory/MSR_BTC'
        }).done(function(data){
        //console.log(data);
        var i = 0;
        for ( i = data['Data'].length-1;i >= 0;i--){
            //console.log(data.Data[i].Amount);
            $scope.CryptQuantity = data.Data[i].Amount;
			$scope.CryptType = data.Data[i].Type.toUpperCase();
			var CryptDate = new Date(data.Data[i].Timestamp * 1000);
			$scope.CryptLastUpdate = CryptDate.toLocaleString();
        }
        });
		

        $.ajax({
            url: 'https://testnet.masaricoin.com/proxy.php?url=' + encodeURIComponent('https://api.crex24.com/v2/public/recentTrades?instrument=MSR-BTC&limit=1')
        }).done(function(data) {
            $scope.CrexQuantity = data[0].volume;
			var CrexTypeside = data[0].side;
			$scope.CrexType = CrexTypeside.toUpperCase();
			var CrexLastTime = data[0].timestamp;
			$scope.CrexLastUpdate = CrexLastTime.toLocaleString();
        });
		
		$.getJSON('https://testnet.masaricoin.com/proxy.php?url=' + encodeURIComponent('https://api.crex24.com/v2/public/tickers?instrument=MSR-BTC'), function(data) {
            $scope.CREXPrice = (data[0].last * 1).toFixed(8);
            $scope.CREXBid = (data[0].bid * 1).toFixed(8);
            $scope.CREXAsk = (data[0].ask * 1).toFixed(8);
            $scope.CREXVar = (data[0].percentChange * 1).toFixed(2);
            $scope.CREXVol = (data[0].volumeInBtc * 1).toFixed(8);
            $scope.CREXHigh = (data[0].high * 1).toFixed(8);
            $scope.CREXLow = (data[0].low * 1).toFixed(8);
        });

        $.getJSON("https://www.southxchange.com/api/price/msr/btc", function(data) {
            $scope.SEPrice = (data["Last"] * 1).toFixed(8);
            $scope.SEBid = (data["Bid"] * 1).toFixed(8);
            $scope.SEAsk = (data["Ask"] * 1).toFixed(8);
            $scope.SEVar = (data["Variation24Hr"] * 1).toFixed(2);
            $scope.SEVol = (data["Volume24Hr"] * 1).toFixed(8);
        });

        $.getJSON('https://testnet.masaricoin.com/proxy.php?url=' + encodeURIComponent('https://app.stocks.exchange/api2/ticker'), function(data) {

            for (var stedata in data) {
                var name = data[stedata].market_name;
                if (name == "MSR_BTC") {
                    $scope.STEPrice = parseFloat(data[stedata].last).toFixed(8);
                    $scope.STEBid = parseFloat(data[stedata].bid).toFixed(8);
                    $scope.STEAsk = parseFloat(data[stedata].ask).toFixed(8);
                    $scope.STEPrev = parseFloat(data[stedata].lastDayAgo).toFixed(8);
                    $scope.STEVol = parseFloat(data[stedata].vol).toFixed(8);
                }
            }
        }, 'json');

        $.getJSON("https://tradeogre.com/api/v1/ticker/BTC-MSR", function(data) {
            $scope.TOPrice = (data["price"] * 1).toFixed(8);
            $scope.TOPrev = (data["initialprice"] * 1).toFixed(8);
            $scope.TOHigh = (data["high"] * 1).toFixed(8);
            $scope.TOLow = (data["low"] * 1).toFixed(8);
            $scope.TOVol = (data["volume"] * 1).toFixed(8);
            $scope.TOBid = (data["bid"] * 1).toFixed(8);
            $scope.TOAsk = (data["ask"] * 1).toFixed(8);

        });
		$.getJSON("https://www.cryptopia.co.nz/api/GetMarket/MSR_BTC/", function(data) {
            $scope.CryptPrice = (data["Data"].LastPrice * 1).toFixed(8);
            
            $scope.CryptVol = (data["Data"].Volume * 1).toFixed(4);
            $scope.CryptBid = (data["Data"].BidPrice * 1).toFixed(8);
            $scope.CryptAsk = (data["Data"].AskPrice * 1).toFixed(8);

        });
		
					
				console.log(changeTO);
				
				UpdatePrice(changeTO,$scope.TOPrice,changeTOspan);
				UpdatePrice(changeTOAsk,$scope.TOAsk,changeTOAskspan);
				UpdatePrice(changeTOBid,$scope.TOBid,changeTOBidspan);
				UpdatePrice(changeCrypt,$scope.CryptPrice,changeCryptspan);
				UpdatePrice(changeCryptAsk,$scope.CryptAsk,changeCryptAskspan);
				UpdatePrice(changeCryptBid,$scope.CryptBid,changeCryptBidspan);
				
				changeTO = $scope.TOPrice;
				changeTOAsk = $scope.TOAsk;
				changeTOBid = $scope.TOBid;	
				changeCrypt = $scope.CryptPrice;
				changeCryptAsk = $scope.CryptAsk;
				changeCryptBid = $scope.CryptBid;
    }



		

    timerService.register(calls);
    calls();
 




    $scope.$on("$routeChangeStart", function() {
        //timerService.remove("SouthEx");
        //timerService.remove("StocksEx");
        //timerService.remove("TradeOgre");
        //timerService.remove("Crex");
        //timerService.remove("Maple");
        //timerService.remove("Altex");

    });

});