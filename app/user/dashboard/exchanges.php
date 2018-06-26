
<script>
//window.location.href = 'https://testnet.masaricoin.com/#!/exchanges';
</script>


<style>
.rwd-break {
	display:none;
	
}
.logo2 {
	position:relative;
	left:60%;
}
.Charts {
	position:relative;
	height:450px;
	width:400px;
	margin:auto;
	
}

	

	
@media only screen and (max-width: 700px) {
    .rwd-break {
		display:block;
    }
	.logo2 { 
	display:none;
	}
	.RemPhone {
		display:none;
	}
	.Chart {
		display:none;
	}
		
}

</style>
	


<!-- South Exchange Details-->


	<div layout="column" layout-gt-sm="row">
    <md-card flex>
			<md-toolbar class="md-table-toolbar md-default">
				<div class="md-toolbar-tools" style="background-image:url(../../assets/exchangepurp.fw.png)" >
					<span class="md-title">TradeOgre <span class="RemPhone">-</span><br class="rwd-break" /> Last Trades and Current Stats</span>
				</div>
			</md-toolbar>
			<md-card-content>
            <canvas id="TradeOgre" width="400" height="150"></canvas>

<table style="width:90%; margin-left:auto; margin-right:auto;">
<tr style="text-align:center;">
<th>Current Price</th>
<th class="RemPhone">24 Hour Volume</th>
<th class="RemPhone">Open Price</th>
<th class="RemPhone">High / Low</th>
<th>Current Bid</th>
<th>Current Ask</th>
</tr>
<tr style="text-align:center;">
<td>{{TOPrice}}</td>
<td class="RemPhone">{{TOVol}} BTC</td>
<td class="RemPhone">{{TOPrev}}</td>
<td class="RemPhone">{{TOHigh}} / {{TOLow}}</td>
<td>{{TOBid}}</td>
<td>{{TOAsk}}</td>
</tr>
</table>

		</md-card-content>
	</md-card>
		<md-card flex>
			<md-toolbar class="md-table-toolbar md-default">
				<div class="md-toolbar-tools" style="background-image:url(../../assets/exchange.fw.png)">
					<span class="md-title">SouthXchange <span class="RemPhone">-</span><br class="rwd-break" /> Trades and Current Stats</span>
				</div>
			</md-toolbar>
			<md-card-content>
            <canvas id="SouthEx" width="400" height="150"></canvas>

<table style="width:90%; margin-left:auto; margin-right:auto;">
<tr style="text-align:center;">
<th>Last Price</th>
<th class="RemPhone">24 Hour Volume</th>
<th class="RemPhone">24 Hour Variation</th>
<th>Current Bid</th>
<th>Current Ask</th>
</tr>
<tr style="text-align:center;">
<td>{{SEPrice}}</td>
<td class="RemPhone">{{SEVol}} MSR</td>
<td class="RemPhone">{{SEVar}}%</td>
<td>{{SEBid}}</td>
<td>{{SEAsk}}</td>
</tr>
</table>

		</md-card-content>
	</md-card>



<!-- Stocks.Exchange Information -->


		
</div>

<div layout="column" layout-gt-sm="row" flex>
		



<!-- Stocks.Exchange Information -->


		<md-card flex>
			<md-toolbar class="md-table-toolbar md-default">
				<div class="md-toolbar-tools" style="background-image:url(../../assets/exchange.fw.png)">
					<span class="md-title">Altex <span class="RemPhone">-</span><br class="rwd-break" /> Last Trades and Current Stats</span>
				</div>
			</md-toolbar>
			<md-card-content>
            <canvas id="Altex" width="400" height="150"></canvas>

<table style="width:90%; margin-left:auto; margin-right:auto;">
<tr style="text-align:center;">
<th>Current Price</th>
<th class="RemPhone">24 Hour Volume</th>
<th class="RemPhone">High / Low</th>
<th class="RemPhone">Change</th>
<th>Current Bid</th>
<th>Current Ask</th>
</tr>
<tr style="text-align:center;">
<td>{{ALTPrice}}</td>
<td class="RemPhone">{{ALTVol}}</td>
<td class="RemPhone">{{ALTHigh}} / {{ALTLow}}</td>
<td class="RemPhone">{{ALTVar}}</td>
<td>{{ALTBid}}</td>
<td>{{ALTAsk}}</td>
</tr>
</table>
		</md-card-content>
	</md-card>
    
    <md-card flex>
			<md-toolbar class="md-table-toolbar md-default">
				<div class="md-toolbar-tools" style="background-image:url(../../assets/exchangepurp.fw.png)">
					<span class="md-title">Stocks.Exchange <span class="RemPhone">-</span><br class="rwd-break" /> Last Trades and Current Stats</span>
				</div>
			</md-toolbar>
			<md-card-content>
            <canvas id="StocksEx" width="400" height="150"></canvas>

<table style="width:90%; margin-left:auto; margin-right:auto;">
<tr style="text-align:center;">
<th>Current Price</th>
<th class="RemPhone">24 Hour Volume</th>
<th class="RemPhone">Open Price</th>
<th>Current Bid</th>
<th>Current Ask</th>
</tr>
<tr style="text-align:center;">
<td>{{STEPrice}}</td>
<td class="RemPhone">{{STEVol}} MSR</td>
<td class="RemPhone">{{STEPrev}}</td>
<td>{{STEBid}}</td>
<td>{{STEAsk}}</td>
</tr>
</table>
		</md-card-content>
	</md-card>
</div>