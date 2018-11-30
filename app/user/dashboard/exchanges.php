<script>
    //window.location.href = 'https://testnet.masaricoin.com/#!/exchanges';
	function colourize() {
  var dnl = document.getElementsByTagName("tr");
  for(i = 0; i < dnl.length; i++) {
    if((Math.round(i / 2) * 2) == ((i / 2) * 2) )
    dnl.item(i).style.background="#F0F0F0";
  } 
}
window.onload = colourize;
	
</script>

<style>
    .rwd-break {
        display: none;
    }
    
    .logo2 {
        position: relative;
        left: 60%;
    }
    
    .Charts {
        position: relative;
        height: 450px;
        width: 400px;
        margin: auto;
    }
	.AddPhone {
            display: none;
        }
    
    @media only screen and (max-width: 700px) {
        .rwd-break {
            display: block;
        }
        .logo2 {
            display: none;
        }
        .RemPhone {
            display: none;
        }
        .Chart {
            display: none;
        }
		.AddPhone {
            display: inline;
        }
    }
	table {
    border-collapse:collapse;
    width:100%;
    
    min-width:400px;
    text-align:center;
}

caption {
    caption-side:bottom;
    font-weight:bold;
    font-style:italic;
    margin:4px;
}

table,th, td {
    border: 1px solid gray;
}

th, td {
    height: 24px;
    
    vertical-align:middle;
}

th {
	background-color:#eeeeee;
}

.rowtitle {
    font-weight:bold;
}
</style>

<!-- South Exchange Details-->

<div layout="column" layout-gt-sm="row">
    <md-card flex>
        <md-toolbar class="md-table-toolbar md-default">
            <a href="https://tradeogre.com/exchange/BTC-MSR" target="_blank" rel="nofollow" alt="TradeOgre">
                <div class="md-toolbar-tools" style="background-image:url(assets/TO_Back.fw.png)"></div>
            </a>

        </md-toolbar>
        <md-card-content>
           <!-- <canvas id="TradeOgre" width="400" height="100"></canvas> -->

            <table style="width:100%">
           <thead></thead>
            <tbody>
                <tr style="text-align:center;">
                	<th class="AddPhone" style="width:50%;">Last Price</th>
                    <th class="AddPhone" style="width:50%;">Bid/Ask</th>
                    <th class="RemPhone" style="width:14%;">Last Price</th>
                    <th class="RemPhone" style="width:14%;">Current Bid</th>
                    <th class="RemPhone" style="width:14%;">Current Ask</th>
                    <th class="RemPhone" style="width:14%;">Last Type</th>
                    <th class="RemPhone" style="width:14%;">Last Quantity</th>
                    <th class="RemPhone" style="width:14%;">24 Hour Volume</th>
                    <th class="RemPhone" style="width:16%;">Last Update</th>
                </tr>
                <tr style="text-align:center;">
                 	<td class="AddPhone"><span id="changeTOspan">&#8674; {{TOPrice}}</span></td>
                    <td class="AddPhone"><span id="changeTOBidspan">&#8674; {{TOBid}}</span> / <span id="changeTOAskspan">&#8674; {{TOAsk}}</span></td>
                    <td class="RemPhone"><span id="changeTOspan">&#8674; {{TOPrice}}</span></td>
                    <td class="RemPhone"><span id="changeTOBidspan">&#8674; {{TOBid}}</span></td>
                    <td class="RemPhone"><span id="changeTOAskspan">&#8674; {{TOAsk}}</span></td>
                    <td class="RemPhone">{{TOType}}</td>
                    <td class="RemPhone">{{TOQuantity}}</td>
                    <td class="RemPhone"><span id="changeTOVolspan">&#8674; {{TOVol}}</span> BTC</td>
                    <td class="RemPhone">{{TOLastUpdate}}</td>
                </tr>
                </tbody>
            </table>

        </md-card-content>
    </md-card>
     </div>
     
     <div layout="column" layout-gt-sm="row">
    <md-card flex>
        <md-toolbar class="md-table-toolbar md-default">
            <a href="https://www.cryptopia.co.nz/Exchange/?market=MSR_BTC" target="_blank" rel="nofollow" alt="Cryptopia">
                <div class="md-toolbar-tools" style="background-image:url(assets/Crypt_Back.fw.png)"></div>
            </a>

        </md-toolbar>
        <md-card-content>
           <!-- <canvas id="Cryptopia" width="400" height="100"></canvas> -->

                  <table style="width:100%">
           <thead></thead>
            <tbody>
                <tr style="text-align:center;">
                    <th style="width:14%;">Last Price</th>
                    <th style="width:14%;">Current Bid</th>
                    <th style="width:14%;">Current Ask</th>
                    <th class="RemPhone" style="width:14%;">Last Type</th>
                    <th class="RemPhone" style="width:14%;">Last Quantity</th>
                    <th class="RemPhone" style="width:14%;">24 Hour Volume</th>
                    <th class="RemPhone" style="width:16%;">Last Update</th>
                </tr>
                <tr style="text-align:center;">
                    <td><span id="changeCryptspan">&#8674; {{CryptPrice}}</span></td>
                    <td><span id="changeCryptBidspan">&#8674; {{CryptBid}}</span></td>
                    <td><span id="changeCryptAskspan">&#8674; {{CryptAsk}}</span></td>
                    <td class="RemPhone">{{CryptType}}</td>
                    <td class="RemPhone">{{CryptQuantity}}</td>
                    <td class="RemPhone"><span id="changeCryptVolspan">&#8674; {{CryptVol}}</span> MSR</td>
                    <td class="RemPhone">{{CryptLastUpdate}}</td>
                </tr>
                </tbody>
            </table>

        </md-card-content>
    </md-card>
     </div>
    <div layout="column" layout-gt-sm="row">
    <md-card flex>
        <md-toolbar class="md-table-toolbar md-default">
            <a href="https://www.southxchange.com/Market/Book/MSR/BTC" target="_blank" rel="nofollow" alt="SouthXchange">
                <div class="md-toolbar-tools" style="background-image:url(assets/SX_Back.fw.png)"></div>
            </a>

        </md-toolbar>
        <md-card-content>
            <!-- <canvas id="SouthEx" width="400" height="100"></canvas> -->

                  <table style="width:100%">
           <thead></thead>
            <tbody>
                <tr style="text-align:center;">
                     <th style="width:14%;">Last Price</th>
                    <th style="width:14%;">Current Bid</th>
                    <th style="width:14%;">Current Ask</th>
                    <th class="RemPhone" style="width:14%;">Last Type</th>
                    <th class="RemPhone" style="width:14%;">Last Quantity</th>
                    <th class="RemPhone" style="width:14%;">24 Hour Volume</th>
                    <th class="RemPhone" style="width:16%;">Last Update</th>
                </tr>
                <tr style="text-align:center;">
                    <td><span id="changeSEspan">&#8674; {{SEPrice}}</span></td>
                    <td><span id="changeSEBidspan">&#8674; {{SEBid}}</span></td>
                    <td><span id="changeSEAskspan">&#8674; {{SEAsk}}</span></td>
                    <td class="RemPhone">{{SEType}}</td>
                    <td class="RemPhone">{{SEQuantity}}</td>
                    <td class="RemPhone"><span id="changeSEVolspan">&#8674; {{SEVol}}</span> MSR</td>
                    <td class="RemPhone">{{SELastUpdate}}</td>
                </tr>
                </tbody>
            </table>

        </md-card-content>
    </md-card>
    <!-- Stocks.Exchange Information -->
</div>

<div layout="column" layout-gt-sm="row" flex >

    <!-- Stocks.Exchange Information -->

    <md-card flex>
        <md-toolbar class="md-table-toolbar md-default">
            <a href="https://crex24.com/exchange/MSR-BTC" target="_blank" rel="nofollow" alt="crex24">
                <div class="md-toolbar-tools" style="background-image:url(assets/CREX_Back.fw.png)"></div>
            </a>

        </md-toolbar>
        <md-card-content>
            <!-- <canvas id="Crex" width="400" height="100"></canvas> -->

                  <table style="width:100%">
           <thead></thead>
            <tbody>
                <tr style="text-align:center;">
                    <th style="width:14%;">Last Price</th>
                    <th style="width:14%;">Current Bid</th>
                    <th style="width:14%;">Current Ask</th>
                    <th class="RemPhone" style="width:14%;">Last Type</th>
                    <th class="RemPhone" style="width:14%;">Last Quantity</th>
                    <th class="RemPhone" style="width:14%;">24 Hour Volume</th>
                    <th class="RemPhone" style="width:16%;">Last Update</th>
                </tr>
                <tr style="text-align:center;">
                    <td><span id="changeCREXspan">&#8674; {{CREXPrice}}</span></td>
                    <td><span id="changeCREXBidspan">&#8674; {{CREXBid}}</span></td>
                    <td><span id="changeCREXAskspan">&#8674; {{CREXAsk}}</span></td>
                    <td class="RemPhone">{{CrexType}}</td>
                    <td class="RemPhone">{{CrexQuantity}}</td>
                    <td class="RemPhone"><span id="changeCREXVolspan">&#8674; {{CREXVol}}</span> BTC</td>
                    <td class="RemPhone">{{CrexLastUpdate}}</td>
                </tr>
                </tbody>
            </table>
        </md-card-content>
    </md-card>
 </div>
    <div layout="column" layout-gt-sm="row" >
    <md-card flex>
        <md-toolbar class="md-table-toolbar md-default">
            <a href="https://app.stocks.exchange/en/basic-trade/pair/BTC/MSR/1D" target="_blank" rel="nofollow" alt="stocks.exchange">
                <div class="md-toolbar-tools" style="background-image:url(assets/STX_Back.fw.png)"></div>
            </a>

        </md-toolbar>
        <md-card-content>
            <!-- <canvas id="StocksEx" width="400" height="100"></canvas>-->

                  <table style="width:100%">
           <thead></thead>
            <tbody>
                <tr style="text-align:center;">
                    <th style="width:14%;">Last Price</th>
                    <th style="width:14%;">Current Bid</th>
                    <th style="width:14%;">Current Ask</th>
                    <th class="RemPhone" style="width:14%;">Last Type</th>
                    <th class="RemPhone" style="width:14%;">Last Quantity</th>
                    <th class="RemPhone" style="width:14%;">24 Hour Volume</th>
                    <th class="RemPhone" style="width:16%;">Last Update</th>
                </tr>
                <tr style="text-align:center;">
                    <td><span id="changeSTEspan">&#8674; {{STEPrice}}</span></td>
                    <td><span id="changeSTEBidspan">&#8674; {{STEBid}}</span></td>
                    <td><span id="changeSTEAskspan">&#8674; {{STEAsk}}</span></td>
                    <td class="RemPhone">{{STEType}}</td>
                    <td class="RemPhone">{{STEQuantity}}</td>
                    <td class="RemPhone"><span id="changeSTEVolspan">&#8674; {{STEVol}}</span> MSR</td>
                    <td class="RemPhone">{{STELastUpdate}}</td>
                </tr>
                </tbody>
            </table>
        </md-card-content>
    </md-card>
</div>

