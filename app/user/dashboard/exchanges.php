
<script>
window.location.href = 'http://localhost/masari/#!/exchanges';
</script>
<?php
/*
//Trade Ogre Exchange
$TOtradeUrl = "https://tradeogre.com/api/v1/history/BTC-MSR";
$TOstatsUrl = "https://tradeogre.com/api/v1/ticker/BTC-MSR";
$TOjson_trade = file_get_contents($TOtradeUrl);
$TOjson_trades = json_decode($TOjson_trade, true);
$TOjson_stat = file_get_contents($TOstatsUrl);
$TOjson_stats = json_decode($TOjson_stat, true);
$TOcurrentPrice = $TOjson_stats["price"];
$TOinitialPrice = $TOjson_stats["initialprice"];
$TOpriceHigh = $TOjson_stats["high"];
$TOpriceLow = $TOjson_stats["low"];
$TOVolume = $TOjson_stats["volume"];
$TOBid = $TOjson_stats["bid"];
$TOAsk = $TOjson_stats["ask"];
$TOtimeArray = array();
$TOpriceArray = array();
$TOtypeArray = array();
$TOqtyArray = array();

//Loop Thru Trades
foreach($TOjson_trades as $TOtradeStats) {

	$TOtimeStamp = gmdate(DATE_RFC850, $TOtradeStats['date']);
	$TOqtyArray[] = $TOtradeStats['quantity'];
	$TOtimeArray[] = $TOtimeStamp;
	$TOtypeArray[] = ucfirst($TOtradeStats['type']);
	$TOpriceArray[] = $TOtradeStats['price'];
	}
$TOfirstTime = reset($TOtimeArray);
$TOlastTime = end($TOtimeArray);
*/
// SouthExchange
/*
$SEtradeUrl = "https://www.southxchange.com/api/trades/msr/btc";
$SEstatsUrl = "https://www.southxchange.com/api/price/msr/btc";
$SEjson_trade = file_get_contents($SEtradeUrl);
$SEjson_trades = json_decode($SEjson_trade, true);
$SEjson_stat = file_get_contents($SEstatsUrl);
$SEjson_stats = json_decode($SEjson_stat, true);
$SEcurrentPrice = number_format($SEjson_stats["Last"],8,'.','');
//$SEinitialPrice = $SEjson_stats["initialprice"];
$SEpriceVariation = $SEjson_stats["Variation24Hr"];
//$SEpriceLow = $SEjson_stats["low"];
$SEVolume = $SEjson_stats["Volume24Hr"];
$SEBid = number_format($SEjson_stats["Bid"],8,'.','');
$SEAsk = number_format($SEjson_stats["Ask"],8,'.','');
$SEtimeArray = array();
$SEpriceArray = array();
$SEtypeArray = array();
$SEqtyArray = array();

//Loop Thru Trades
foreach($SEjson_trades as $SEtradeStats) {

	$SEtimeStamp = gmdate(DATE_RFC850, $SEtradeStats['At']);
	$SEqtyArray[] = $SEtradeStats['Amount'];
	$SEtimeArray[] = $SEtimeStamp;
	$SEtypeArray[] = ucfirst($SEtradeStats['Type']);
	$SEpriceArray[] = number_format($SEtradeStats['Price'],8,'.','');
	}
$SEfirstTime = reset($SEtimeArray);
$SElastTime = end($SEtimeArray);

//Stocks.Exchange

$STEtradeUrl = "https://stocks.exchange/api2/trades?pair=MSR_BTC";
$STEstatsUrl = "https://stocks.exchange/api2/ticker";
$STEjson_trade = file_get_contents($STEtradeUrl);
$STEjson_trades = json_decode($STEjson_trade, true);
$STEjson_stat = file_get_contents($STEstatsUrl);
$STEjson_stats = json_decode($STEjson_stat, true);

foreach($STEjson_stats as $STE_Stats) {
if($STE_Stats["market_name"] == 'MSR_BTC') {
	$STEcurrentPrice = $STE_Stats["last"];
	$STEinitialPrice = $STE_Stats["lastDayAgo"];
	//$STEpriceVariation = $STEjson_stats["Variation24Hr"];
	//$STEpriceLow = $STEjson_stats["low"];
	$STEVolume = $STE_Stats["vol"];
	$STEBid = $STE_Stats["bid"];
	$STEAsk = $STE_Stats["ask"];
	}
}

$STEtimeArray = array();
$STEpriceArray = array();
$STEtypeArray = array();
$STEqtyArray = array();

//Loop Thru Trades
foreach($STEjson_trades["result"] as $STEtradeStats) {

	$STEtimeStamp = gmdate(DATE_RFC850, $STEtradeStats['timestamp']);
	$STEqtyArray[] = $STEtradeStats['quantity'];
	$STEtimeArray[] = $STEtimeStamp;
	$STEtypeArray[] = ucfirst($STEtradeStats['type']);
	$STEpriceArray[] = $STEtradeStats['price'];
	}
$STEfirstTime = reset($STEtimeArray);
$STElastTime = end($STEtimeArray);
*/
?>

	


<!-- South Exchange Details-->


	<div layout="column" layout-gt-sm="row">
		<md-card flex>
			<md-toolbar class="md-table-toolbar md-default">
				<div class="md-toolbar-tools" style="background-image:url(../../assets/exchange.fw.png)">
					<span class="md-title">SouthXchange - Trades and Current Stats</span>
				</div>
			</md-toolbar>
			<md-card-content>
            <canvas id="SouthEx" width="400" height="90"></canvas>

<table style="width:90%; margin-left:auto; margin-right:auto;">
<tr style="text-align:center;">
<th>Last Price</th>
<th>24 Hour Volume</th>
<th>24 Hour Variation</th>
<th>Current Bid</th>
<th>Current Ask</th>
</tr>
<tr style="text-align:center;">
<td>{{SEPrice}}</td>
<td>{{SEVol}} MSR</td>
<td>{{SEVar}}%</td>
<td>{{SEBid}}</td>
<td>{{SEAsk}}</td>
</tr>
</table>

		</md-card-content>
	</md-card>



<!-- Stocks.Exchange Information -->


		<md-card flex>
			<md-toolbar class="md-table-toolbar md-default">
				<div class="md-toolbar-tools" style="background-image:url(../../assets/exchangepurp.fw.png)">
					<span class="md-title">Stocks.Exchange - Last Trades and Current Stats</span>
				</div>
			</md-toolbar>
			<md-card-content>
            <canvas id="StocksEx" width="400" height="90"></canvas>

<table style="width:90%; margin-left:auto; margin-right:auto;">
<tr style="text-align:center;">
<th>Current Price</th>
<th>24 Hour Volume</th>
<th>Open Price</th>
<th>Current Bid</th>
<th>Current Ask</th>
</tr>
<tr style="text-align:center;">
<td>{{STEPrice}}</td>
<td>{{STEVol}} MSR</td>
<td>{{STEPrev}}</td>
<td>{{STEBid}}</td>
<td>{{STEAsk}}</td>
</tr>
</table>
		</md-card-content>
	</md-card>
</div>

<div layout="column" layout-gt-sm="row" flex>
		<md-card flex>
			<md-toolbar class="md-table-toolbar md-default">
				<div class="md-toolbar-tools" style="background-image:url(../../assets/exchangepurp.fw.png)" >
					<span class="md-title">TradeOgre - Last Trades and Current Stats</span>
				</div>
			</md-toolbar>
			<md-card-content>
            <canvas id="TradeOgre" width="400" height="90"></canvas>

<table style="width:90%; margin-left:auto; margin-right:auto;">
<tr style="text-align:center;">
<th>Current Price</th>
<th>24 Hour Volume</th>
<th>Open Price</th>
<th>High / Low</th>
<th>Current Bid</th>
<th>Current Ask</th>
</tr>
<tr style="text-align:center;">
<td>{{TOPrice}}</td>
<td>{{TOVol}} BTC</td>
<td>{{TOPrev}}</td>
<td>{{TOHigh}} / {{TOLow}}</td>
<td>{{TOBid}}</td>
<td>{{TOAsk}}</td>
</tr>
</table>

		</md-card-content>
	</md-card>



<!-- Stocks.Exchange Information -->


		<md-card flex>
			<md-toolbar class="md-table-toolbar md-default">
				<div class="md-toolbar-tools" style="background-image:url(../../assets/exchange.fw.png)">
					<span class="md-title">Altex - Last Trades and Current Stats</span>
				</div>
			</md-toolbar>
			<md-card-content>
            <canvas id="Altex" width="400" height="90"></canvas>

<table style="width:90%; margin-left:auto; margin-right:auto;">
<tr style="text-align:center;">
<th>Current Price</th>
<th>24 Hour Volume</th>
<th>High / Low</th>
<th>Change</th>
<th>Current Bid</th>
<th>Current Ask</th>
</tr>
<tr style="text-align:center;">
<td>{{ALTPrice}}</td>
<td>{{ALTVol}}</td>
<td>{{ALTHigh}} / {{ALTLow}}</td>
<td>{{ALTVar}}</td>
<td>{{ALTBid}}</td>
<td>{{ALTAsk}}</td>
</tr>
</table>
		</md-card-content>
	</md-card>
</div>