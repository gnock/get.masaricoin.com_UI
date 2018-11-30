'use strict';

app.controller('ExchangeCtrl', function($scope, $route, dataService, timerService) {

    var UpdatePrice = function(previous, updated, span) {
        if (previous > updated) {
            document.getElementById(span).style.color = '#cc0000';
            document.getElementById(span).innerHTML = "&#8675; " + updated;
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
	var changeTOPhone = '';
    var changeTOAskPhone = '';
    var changeTOBidPhone = '';
	var changeTOVol = '';

    var changeCrypt = '';
    var changeCryptAsk = '';
    var changeCryptBid = '';
	var changeCryptPhone = '';
    var changeCryptAskPhone = '';
    var changeCryptBidPhone = '';
	var changeCryptVol = '';

    var changeSTE = '';
    var changeSTEAsk = '';
    var changeSTEBid = '';
	var changeSTEPhone = '';
    var changeSTEAskPhone = '';
    var changeSTEBidPhone = '';
	var changeSTEVol = '';

    var changeSE = '';
    var changeSEAsk = '';
    var changeSEBid = '';
	var changeSEPhone = '';
    var changeSEAskPhone = '';
    var changeSEBidPhone = '';
	var changeSEVol = '';

    var changeCREX = '';
    var changeCREXAsk = '';
    var changeCREXBid = '';
	var changeCREXPhone = '';
    var changeCREXAskPhone = '';
    var changeCREXBidPhone = '';
	var changeCREXVol = '';

    function calls() {

        var changeTOspan = "changeTOspan";
        var changeTOAskspan = "changeTOAskspan";
        var changeTOBidspan = "changeTOBidspan";
		var changeTOspanPhone = "changeTOspanPhone";
        var changeTOAskspanPhone = "changeTOAskspanPhone";
        var changeTOBidspanPhone = "changeTOBidspanPhone";
        var changeTOVolspan = "changeTOVolspan";

        var changeCryptspan = "changeCryptspan";
        var changeCryptAskspan = "changeCryptAskspan";
        var changeCryptBidspan = "changeCryptBidspan";
		var changeCryptspanPhone = "changeCryptspanPhone";
        var changeCryptAskspanPhone = "changeCryptAskspanPhone";
        var changeCryptBidspanPhone = "changeCryptBidspanPhone";
        var changeCryptVolspan = "changeCryptVolspan";

        var changeCREXspan = "changeCREXspan";
        var changeCREXAskspan = "changeCREXAskspan";
        var changeCREXBidspan = "changeCREXBidspan";
		var changeCREXspanPhone = "changeCREXspanPhone";
        var changeCREXAskspanPhone = "changeCREXAskspanPhone";
        var changeCREXBidspanPhone = "changeCREXBidspanPhone";
        var changeCREXVolspan = "changeCREXVolspan";

        var changeSEspan = "changeSEspan";
        var changeSEAskspan = "changeSEAskspan";
        var changeSEBidspan = "changeSEBidspan";
		var changeSEspanPhone = "changeSEspanPhone";
        var changeSEAskspanPhone = "changeSEAskspanPhone";
        var changeSEBidspanPhone = "changeSEBidspanPhone";
        var changeSEVolspan = "changeSEVolspan";

        var changeSTEspan = "changeSTEspan";
        var changeSTEAskspan = "changeSTEAskspan";
        var changeSTEBidspan = "changeSTEBidspan";
		var changeSTEspanPhone = "changeSTEspanPhone";
        var changeSTEAskspanPhone = "changeSTEAskspanPhone";
        var changeSTEBidspanPhone = "changeSTEBidspanPhone";
        var changeSTEVolspan = "changeSTEVolspan";

        $.ajax({
            url: 'https://www.southxchange.com/api/trades/msr/btc'
        }).done(function(data) {
            var rawData = data.reverse();
            var i = 0;
            for (i = rawData.length - 1; i >= rawData.length - 1; i--) {

                $scope.SEQuantity = (rawData[i].Amount).toFixed(8);
                var SELastType = rawData[i].Type
                $scope.SEType = SELastType.toUpperCase();

                var SEDate = new Date(rawData[i].At * 1000);
                $scope.SELastUpdate = SEDate.toLocaleString();
            }

        });

        $.getJSON("https://www.southxchange.com/api/price/msr/btc", function(data) {
            $scope.SEPrice = (data["Last"] * 1).toFixed(8);
            $scope.SEBid = (data["Bid"] * 1).toFixed(8);
            $scope.SEAsk = (data["Ask"] * 1).toFixed(8);
            $scope.SEVar = (data["Variation24Hr"] * 1).toFixed(2);
            $scope.SEVol = (data["Volume24Hr"] * 1).toFixed(8);
        });

        $.ajax({
            url: 'https://get.masaricoin.com/proxy.php?url=' + encodeURIComponent('https://app.stocks.exchange/api2/trades?pair=MSR_BTC')
        }).done(function(data) {
            //tickerSTE(data["result"]);
            var rawData = data['result'].reverse();
            var i = 0;
            for (i = rawData.length - 1; i >= rawData.length - 1; i--) {

                $scope.STEQuantity = rawData[i].quantity;
                $scope.STEType = rawData[i].type;
                var STEDate = new Date(rawData[i].timestamp * 1000);
                $scope.STELastUpdate = STEDate.toLocaleString();
            }
        });

        $.getJSON('https://get.masaricoin.com/proxy.php?url=' + encodeURIComponent('https://app.stocks.exchange/api2/ticker'), function(data) {

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

        $.ajax({
            url: 'https://tradeogre.com/api/v1/history/BTC-MSR'
        }).done(function(data) {
            var rawData = JSON.parse(data);

            var i = 0;
            for (i = rawData.length - 1; i >= rawData.length - 1; i--) {

                $scope.TOQuantity = rawData[i].quantity;
                $scope.TOType = rawData[i].type.toUpperCase();
                var TODate = new Date(rawData[i].date * 1000);
                $scope.TOLastUpdate = TODate.toLocaleString();
            }
        });

        $.getJSON("https://tradeogre.com/api/v1/ticker/BTC-MSR", function(data) {
            $scope.TOPrice = (data["price"] * 1).toFixed(8);
            $scope.TOPrev = (data["initialprice"] * 1).toFixed(8);
            $scope.TOHigh = (data["high"] * 1).toFixed(8);
            $scope.TOLow = (data["low"] * 1).toFixed(8);
            $scope.TOVol = (data["volume"] * 1).toFixed(8);
            $scope.TOBid = (data["bid"] * 1).toFixed(8);
            $scope.TOAsk = (data["ask"] * 1).toFixed(8);

        });

        $.ajax({
            url: 'https://www.cryptopia.co.nz/api/GetMarketHistory/MSR_BTC'
        }).done(function(data) {
            //console.log(data);
            var i = 0;
            for (i = data['Data'].length - 1; i >= 0; i--) {
                //console.log(data.Data[i].Amount);
                $scope.CryptQuantity = data.Data[i].Amount;
                $scope.CryptType = data.Data[i].Type.toUpperCase();
                var CryptDate = new Date(data.Data[i].Timestamp * 1000);
                $scope.CryptLastUpdate = CryptDate.toLocaleString();
            }
        });
        $.getJSON("https://www.cryptopia.co.nz/api/GetMarket/MSR_BTC/", function(data) {
            $scope.CryptPrice = (data["Data"].LastPrice * 1).toFixed(8);

            $scope.CryptVol = (data["Data"].Volume * 1).toFixed(4);
            $scope.CryptBid = (data["Data"].BidPrice * 1).toFixed(8);
            $scope.CryptAsk = (data["Data"].AskPrice * 1).toFixed(8);

        });

        $.ajax({
            url: 'https://get.masaricoin.com/proxy.php?url=' + encodeURIComponent('https://api.crex24.com/v2/public/recentTrades?instrument=MSR-BTC&limit=1')
        }).done(function(data) {
            $scope.CrexQuantity = data[0].volume;
            var CrexTypeside = data[0].side;
            $scope.CrexType = CrexTypeside.toUpperCase();
            var CrexLastTime = new Date(data[0].timestamp);
            var CrexMilli = new Date(CrexLastTime.getTime());
            //console.log(CrexMilli);
            $scope.CrexLastUpdate = CrexMilli.toLocaleString();
        });

        $.getJSON('https://get.masaricoin.com/proxy.php?url=' + encodeURIComponent('https://api.crex24.com/v2/public/tickers?instrument=MSR-BTC'), function(data) {
            $scope.CREXPrice = (data[0].last * 1).toFixed(8);
            $scope.CREXBid = (data[0].bid * 1).toFixed(8);
            $scope.CREXAsk = (data[0].ask * 1).toFixed(8);
            $scope.CREXVar = (data[0].percentChange * 1).toFixed(2);
            $scope.CREXVol = (data[0].volumeInBtc * 1).toFixed(8);
            $scope.CREXHigh = (data[0].high * 1).toFixed(8);
            $scope.CREXLow = (data[0].low * 1).toFixed(8);
        });

        //console.log(changeTO);

        UpdatePrice(changeTO, $scope.TOPrice, changeTOspan);
        UpdatePrice(changeTOAsk, $scope.TOAsk, changeTOAskspan);
        UpdatePrice(changeTOBid, $scope.TOBid, changeTOBidspan);
		UpdatePrice(changeTOPhone, $scope.TOPrice, changeTOspanPhone);
        UpdatePrice(changeTOAskPhone, $scope.TOAsk, changeTOAskspanPhone);
        UpdatePrice(changeTOBidPhone, $scope.TOBid, changeTOBidspanPhone);
        UpdatePrice(changeTOVol, $scope.TOVol, changeTOVolspan);

        UpdatePrice(changeCrypt, $scope.CryptPrice, changeCryptspan);
        UpdatePrice(changeCryptAsk, $scope.CryptAsk, changeCryptAskspan);
        UpdatePrice(changeCryptBid, $scope.CryptBid, changeCryptBidspan);
		UpdatePrice(changeCryptPhone, $scope.CryptPrice, changeCryptspanPhone);
        UpdatePrice(changeCryptAskPhone, $scope.CryptAsk, changeCryptAskspanPhone);
        UpdatePrice(changeCryptBidPhone, $scope.CryptBid, changeCryptBidspanPhone);
        UpdatePrice(changeCryptVol, $scope.CryptVol, changeCryptVolspan);

        UpdatePrice(changeSE, $scope.SEPrice, changeSEspan);
        UpdatePrice(changeSEAsk, $scope.SEAsk, changeSEAskspan);
        UpdatePrice(changeSEBid, $scope.SEBid, changeSEBidspan);
		UpdatePrice(changeSEPhone, $scope.SEPrice, changeSEspanPhone);
        UpdatePrice(changeSEAskPhone, $scope.SEAsk, changeSEAskspanPhone);
        UpdatePrice(changeSEBidPhone, $scope.SEBid, changeSEBidspanPhone);
        UpdatePrice(changeSEVol, $scope.SEVol, changeSEVolspan);

        UpdatePrice(changeSTE, $scope.STEPrice, changeSTEspan);
        UpdatePrice(changeSTEAsk, $scope.STEAsk, changeSTEAskspan);
        UpdatePrice(changeSTEBid, $scope.STEBid, changeSTEBidspan);
		UpdatePrice(changeSTEPhone, $scope.STEPrice, changeSTEspanPhone);
        UpdatePrice(changeSTEAskPhone, $scope.STEAsk, changeSTEAskspanPhone);
        UpdatePrice(changeSTEBidPhone, $scope.STEBid, changeSTEBidspanPhone);
        UpdatePrice(changeSTEVol, $scope.STEVol, changeSTEVolspan);

        UpdatePrice(changeCREX, $scope.CREXPrice, changeCREXspan);
        UpdatePrice(changeCREXAsk, $scope.CREXAsk, changeCREXAskspan);
        UpdatePrice(changeCREXBid, $scope.CREXBid, changeCREXBidspan);
		UpdatePrice(changeCREXPhone, $scope.CREXPrice, changeCREXspanPhone);
        UpdatePrice(changeCREXAskPhone, $scope.CREXAsk, changeCREXAskspanPhone);
        UpdatePrice(changeCREXBidPhone, $scope.CREXBid, changeCREXBidspanPhone);
        UpdatePrice(changeCREXVol, $scope.CREXVol, changeCREXVolspan);

        changeTO = $scope.TOPrice;
        changeTOAsk = $scope.TOAsk;
        changeTOBid = $scope.TOBid;
		changeTOPhone = $scope.TOPrice;
        changeTOAskPhone = $scope.TOAsk;
        changeTOBidPhone = $scope.TOBid;
        changeTOVol = $scope.TOVol;

        changeCrypt = $scope.CryptPrice;
        changeCryptAsk = $scope.CryptAsk;
        changeCryptBid = $scope.CryptBid;
		changeCryptPhone = $scope.CryptPrice;
        changeCryptAskPhone = $scope.CryptAsk;
        changeCryptBidPhone = $scope.CryptBid;
        changeCryptVol = $scope.CryptVol;

        changeSE = $scope.SEPrice;
        changeSEAsk = $scope.SEAsk;
        changeSEBid = $scope.SEBid;
		changeSEPhone = $scope.SEPrice;
        changeSEAskPhone = $scope.SEAsk;
        changeSEBidPhone = $scope.SEBid;
        changeSEVol = $scope.SEVol;

        changeSTE = $scope.STEPrice;
        changeSTEAsk = $scope.STEAsk;
        changeSTEBid = $scope.STEBid;
		changeSTEPhone = $scope.STEPrice;
        changeSTEAskPhone = $scope.STEAsk;
        changeSTEBidPhone = $scope.STEBid;
        changeSTEVol = $scope.STEVol;

        changeCREX = $scope.CREXPrice;
        changeCREXAsk = $scope.CREXAsk;
        changeCREXBid = $scope.CREXBid;
		changeCREXPhone = $scope.CREXPrice;
        changeCREXAskPhone = $scope.CREXAsk;
        changeCREXBidPhone = $scope.CREXBid;
        changeCREXVol = $scope.CREXVol;
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