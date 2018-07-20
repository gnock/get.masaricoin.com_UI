<!DOCTYPE html>
<!--[if lt IE 7]>      <html lang="en" ng-app="poolui" class="no-js lt-ie9 lt-ie8 lt-ie7" manifest="app.manifest"> <![endif]-->
<!--[if IE 7]>         <html lang="en" ng-app="poolui" class="no-js lt-ie9 lt-ie8" manifest="app.manifest"> <![endif]-->
<!--[if IE 8]>         <html lang="en" ng-app="poolui" class="no-js lt-ie9" manifest="app.manifest"> <![endif]-->
<!--[if gt IE 8]><!--> <html lang="en" ng-app="poolui" class="no-js" manifest="app.manifest"> <!--<![endif]-->
<head>
  <title>Masari Mining Pool - Masaricoin.com</title>
	
	<?php
	$url = "https://get.masaricoin.com/api/pool/stats";
	$json = file_get_contents($url);
	$json_data = json_decode($json, true);
	$stats = $json_data["pool_statistics"];
	$TotalMiners = $stats["miners"];
	$LastBlock = date('m/d/Y', $stats["lastBlockFoundTime"]);
	$TotalMinersPaid = $stats["totalMinersPaid"];
	$HashRate = $stats["hashRate"];
	if($HashRate >= 1000000) {
		$CurrentH = $HashRate / 1000000;
		$CurrentHashrate = number_format($CurrentH,2).' MH/s';
	} else {
		$CurrentH = $HashRate / 1000;
		$CurrentHashrate = number_format($CurrentH,2).' KH/s';
	}
	
	$description = 'Masari Mining Pool - Our pool has '.$TotalMiners.' miners connected with a hashrate of '.$CurrentHashrate.'.  Our last block was found on '.$LastBlock.' and we have paid over '.$TotalMinersPaid. ' miners!  We offer worker email alerts, web notifications, per worker charting, PPLNS payment system, GeoDNS with entry points based in North America, Europe, and Asia, Discord Support, Payment Calculations and many more.';
	
	echo '<meta name="description" content="'.$description.'">';
	?>
	
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
  <meta name="description" content="Masari Mining Pool. Masaricoin.com offers worker email alerts, web notifications, per worker charting, PPLNS payment system, GeoDNS with entry points based in North America, Europe, and Asia, Discord Support, Payment Calculations and many more.  Masari is the future for privacy coins, come join us in mining some!">
  
  
  <!-- CSS -->
  <link rel="stylesheet" href="vendor/angular-material/angular-material.css">
  <link rel="stylesheet" href="vendor/n3-charts/build/LineChart.css">
  <link rel="stylesheet" href="vendor/angular-material-data-table/dist/md-data-table.css">
  <link rel="stylesheet" href="app.css">
  <link rel="stylesheet" href="notify/animate.css">
  <!-- Fonts -->
  <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
  <link href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:400,600,700" rel="stylesheet">

  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
  <!--<link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/fonts/fontawesome-webfont.tff" rel="stylesheet"> -->
  <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/fonts/fontawesome-webfont.woff" rel="stylesheet">
  <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/fonts/fontawesome-webfont.woff2" rel="stylesheet">
  <!-- Favicon -->
 <link href="assets/favicon.ico" type="image/ico" rel="icon">
  <!-- CHAT --> <!--
  <script id="cid0020000175311878010" data-cfasync="false" async src="//st.chatango.com/js/gz/emb.js" style="width: 200px;height: 300px;">{"handle":"aeonsemipool","arch":"js","styles":{"a":"000099","b":100,"c":"FFFFFF","d":"FFFFFF","k":"000099","l":"000099","m":"000099","n":"FFFFFF","p":"10","q":"000099","r":100,"pos":"bl","cv":1,"cvbg":"000099","cvw":250,"cvh":30,"ticker":1,"fwtickm":1}}</script>
  <script id="chatBroEmbedCode">/* Chatbro Widget Embed Code Start */function ChatbroLoader(chats,async){async=!1!==async;var params={embedChatsParameters:chats instanceof Array?chats:[chats],lang:navigator.language||navigator.userLanguage,needLoadCode:'undefined'==typeof Chatbro,embedParamsVersion:localStorage.embedParamsVersion,chatbroScriptVersion:localStorage.chatbroScriptVersion},xhr=new XMLHttpRequest;xhr.withCredentials=!0,xhr.onload=function(){eval(xhr.responseText)},xhr.onerror=function(){console.error('Chatbro loading error')},xhr.open('GET','//www.chatbro.com/embed.js?'+btoa(unescape(encodeURIComponent(JSON.stringify(params)))),async),xhr.send()}/* Chatbro Widget Embed Code End */ChatbroLoader({encodedChatId: '9fPY'});</script>
 --><!-- CHAT -->
 <style>
.alert-minimalist {
	background-color: rgb(250, 250, 250);
	border-color: rgba(149, 149, 149, 0.3);
	border-radius: 3px;
	color: rgb(149, 149, 149);
	padding: 10px;
}
.alert-minimalist > [data-notify="icon"] {
	height: 50px;
	margin-right: 12px;
}
.alert-minimalist > [data-notify="title"] {
	color: rgb(51, 51, 51);
	display: block;
	font-weight: bold;
	margin-bottom: 5px;
}
.alert-minimalist > [data-notify="message"] {
	font-size: 90%;
	color:#000;
	
}
body,td,th {
	font-family: "Source Sans Pro", sans-serif;
}
body {
	background-image: url();
	background-repeat: no-repeat;
}
#RemUserPerc {
	display: none;
	}
@media only screen and (max-width: 700px) {
	#RemUserPerc {
	display: none;
	}
	#RemPhone {
	display: none;
	}
	}
 </style>
</head>
<body ng-cloak layout="column" ng-controller="AppCtrl">
  <!--[if lt IE 7]>
      <p class="browsehappy">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> to improve your experience.</p>
      <![endif]-->

      <div class="container" layout="row" flex>
        <md-sidenav md-is-locked-open="menuOpen" md-component-id="left" md-whiteframe="4" class="sidenav">
          <md-toolbar class="logo">
			<span class="md-toolbar-tools" style="text-align: center; position: ">
				<img src="assets/logo.jpg"><!--Masari Mining--></span>
			</span>
          </md-toolbar>
          <md-list>
            <md-list-item>
              <md-button href="#!/home" ng-class="isActivePage('home')">
                <md-icon md-font-set="material-icons" class="menu-item">home</md-icon>
                Home
              </md-button>
            </md-list-item>
            <md-list-item>
              <md-button href="#!/dashboard" ng-class="isActivePage('dashboard')">
                <md-icon md-font-set="material-icons" class="menu-item">dashboard</md-icon> 
                Dashboard
              </md-button>
            </md-list-item>
             
              <md-list-item>
              <md-button href="#!/exchanges" ng-class="isActivePage('exchanges')">
                <md-icon md-font-set="material-icons" class="menu-item">timeline</md-icon> 
                Exchanges
              </md-button>
            </md-list-item>
            
            <md-list-item>
              <md-button href="#!/blocks" ng-class="isActivePage('blocks')">
                <md-icon md-font-set="material-icons" class="menu-item">reorder</md-icon>
                Blocks
              </md-button>
            </md-list-item>
            <md-list-item>
              <md-button href="#!/payments" ng-class="isActivePage('payments')">
                <md-icon md-font-set="material-icons" class="menu-item">payments</md-icon>
                Payments
              </md-button>
            </md-list-item>
            <md-list-item>
              <md-button href="#!/ports" ng-class="isActivePage('ports')">
                <md-icon md-font-set="material-icons" class="menu-item">import_export</md-icon>
                Port List
              </md-button>
            </md-list-item>  
     <!--    <md-list-item>
              <md-button href="#/network" ng-class="isActivePage('network')">
                <md-icon md-font-set="material-icons" class="menu-item">language</md-icon>
                Network
              </md-button>
            </md-list-item> 
            <md-list-item>
              <md-button href="#!/help/chat" ng-class="isActivePage('support')">
                <md-icon md-font-set="material-icons" class="menu-item">group</md-icon>
                Global Support
              </md-button>
            </md-list-item>-->
            <md-list-item>
              <md-button href="#!/help/getting_started" ng-class="isActivePage('help/getting_started')">
                <md-icon md-font-set="material-icons" class="menu-item">launch</md-icon>
                Getting Started
              </md-button>
            </md-list-item>
            <md-list-item>
              <md-button href="#!/help/api" ng-class="isActivePage('help/api')">
                <md-icon md-font-set="material-icons" class="menu-item">memory</md-icon>
                API Info
              </md-button>
            </md-list-item>
	    <md-list-item>
		<md-button href="#!/help/config_generator" ng-class="isActivePage('help/config_generator')">
                <md-icon md-font-set="material-icons" class="menu-item">brush</md-icon>
                Config generator
              </md-button>
            </md-list-item>
            <md-button href="https://www.masariwallet.com" target="blank">
                <md-icon md-font-set="material-icons" class="menu-item">attach_money</md-icon>
                Web Wallet
              </md-button>
            </md-list-item>
            
            <md-list-item>
              <md-button href="https://discord.gg/U4kBJBx" target="blank">
		<md-icon md-font-set="material-icons" class="menu-item">
                <svg id="Layer_1"  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 245 240" width="60" height="60">
                      <path class="st0" d="M104.4 103.9c-5.7 0-10.2 5-10.2 11.1s4.6 11.1 10.2 11.1c5.7 0 10.2-5 10.2-11.1.1-6.1-4.5-11.1-10.2-11.1zM140.9
                              103.9c-5.7 0-10.2 5-10.2 11.1s4.6 11.1 10.2 11.1c5.7 0 10.2-5 10.2-11.1s-4.5-11.1-10.2-11.1z"/>
                      <path class="st0" d="M189.5 20h-134C44.2 20 35 29.2 35 40.6v135.2c0 11.4 9.2 20.6 20.5 20.6h113.4l-5.3-18.5 12.8 11.9 12.1 11.2 21.5 
                              19V40.6c0-11.4-9.2-20.6-20.5-20.6zm-38.6 130.6s-3.6-4.3-6.6-8.1c13.1-3.7 18.1-11.9 18.1-11.9-4.1 2.7-8 4.6-11.5 5.9-5 2.1-9.8 3.5-14.5 4.3-9.6 
                              1.8-18.4 1.3-25.9-.1-5.7-1.1-10.6-2.7-14.7-4.3-2.3-.9-4.8-2-7.3-3.4-.3-.2-.6-.3-.9-.5-.2-.1-.3-.2-.4-.3-1.8-1-2.8-1.7-2.8-1.7s4.8 8 17.5 11.8c-3 
                              3.8-6.7 8.3-6.7 8.3-22.1-.7-30.5-15.2-30.5-15.2 0-32.2 14.4-58.3 14.4-58.3 14.4-10.8 28.1-10.5 28.1-10.5l1 1.2c-18 5.2-26.3 13.1-26.3 13.1s2.2-1.2 
                              5.9-2.9c10.7-4.7 19.2-6 22.7-6.3.6-.1 1.1-.2 1.7-.2 6.1-.8 13-1 20.2-.2 9.5 1.1 19.7 3.9 30.1 9.6 0 0-7.9-7.5-24.9-12.7l1.4-1.6s13.7-.3 28.1 10.5c0 
                              0 14.4 26.1 14.4 58.3 0 0-8.5 14.5-30.6 15.2z"/>
                </svg>
                </md-icon>
              JOIN OUR DISCORD
              </md-button>
            </md-list-item>	
            <!--
             <md-list-item>
                    <md-button href="https://alloy.theotherguysmining.com/" target="blank">
                        <img class="menu-item material-icons" style="width: 60px!important; margin: 6px!important;" src="assets/alloy.fw.png">
                        Alloy Mining
                    </md-button>
                </md-list-item>	  
    <!--    <md-list-item>
              <md-button href="#!/help/faq" ng-class="isActivePage('help/faq')">
                <md-icon md-font-set="material-icons" class="menu-item">help_outline</md-icon>
                FAQ
              </md-button>
            </md-l
ist-item>-->
	         <!--
		 <md-list-item>
                    <md-button href="https://aeon.otherguys.mining/" target="blank" disabled="disabled">
                        <img class="menu-item material-icons" style="width: 60px!important; margin: 6px!important;" src="assets/aeon30x36.png">
                        AEON
                    </md-button>
                </md-list-item>
                <md-list-item>
                    <md-button href="https://etn.otherguys.mining/" target="blank" disabled="disabled">
                        <img class="menu-item material-icons" style="width: 60px!important; margin: 6px!important;" src="assets/electroneum30x36.png">
                        ELECTRONEUM
                    </md-button>
                </md-list-item> 
 	        <md-list-item>
                    <md-button href="http://itns.otherguys.mining/" target="blank" disabled="disabled"/" target="blank">
                        <img class="menu-item material-icons" style="width: 60px!important; margin: 6px!important;" src="assets/itns30x36.png">
                        INTENSECOIN
                    </md-button>
                </md-list-item>
		
	        <md-list-item>
                    <md-button href="https://monerise.com/builder/semipool/" target="blank">
                        <img class="menu-item material-icons" style="width: 60px!important; margin: 6px!important;" src="assets/webmining30x36.png">
                        Web Miner Builder
                    </md-button>
                </md-list-item>		  
 	        <md-list-item>
                    <md-button href="http://sumopool.otherguys.mining/" target="blank" disabled="disabled">
                        <img class="menu-item material-icons" style="width: 60px!important; margin: 6px!important;" src="assets/sumo30x36.png">
                        SUMOKOIN
                    </md-button>
                </md-list-item> -->		  
          </md-list>
	 <!-- <iframe src="https://discordapp.com/widget?id=411195170642460672&theme=dark" width="220" height="478" allowtransparency="true" frameborder="0"></iframe>
        -->
        </md-sidenav>

        <md-content flex id="main">
          <md-toolbar class="navbar md-whiteframe-2dp">
            <div class="md-toolbar-tools maintoolbar" layout="row" style="background-image:url(assets/header.fw.png)">
              <md-button class="md-icon-button" type="button" ng-click="toggleSidenav()">
                <md-icon md-font-set="material-icons" style="color:#fff;">menu</md-icon>
              </md-button>
              <span class="flex text-center wrap">Network: <b class="nowrap">{{network.difficulty | difficultyToHashRate | toHashRate}}</b></a></span>
              <span class="flex text-center wrap">Pool: <b class="nowrap">{{poolStats.global.hashRate | toHashRate}}</b></a></span>
              <span id="RemPhone" class="flex text-center wrap">Network Percent: <b class="nowrap">{{(((poolStats.global.hashRate) / (network.difficulty | difficultyToHashRate)) * 100).toFixed(2)}}%</b></a></span>
              <span class="flex text-center wrap" style="color:#FFE67E;"><a href="#!/dashboard">You: <b class="nowrap">{{yourTotalHashRate | toHashRate}}</b></a></span>
              <span id="RemUserPerc" class="flex text-center wrap" style="color:#FFE67E;"><a href="#!/dashboard">Pool Percent: <b class="nowrap">{{(((yourTotalHashRate) / (poolStats.global.hashRate)) * 100).toFixed(2)}}%</b></a></span>
              <div>
                <md-button class="md-raised md-accent" aria-label="Miner Login" ng-click="minerLogin($event)" ng-if="!isLoggedIn()">
                  <md-icon class="login">settings</md-icon>
                  <span class="setup-text" style="font-size:15px;">Options</span>
                </md-button>
                <md-button class="md-fab md-mini md-warn" aria-label="Miner Login" ng-click="minerConsole($event)" ng-if="isLoggedIn()">
                  <md-icon class="login">build</md-icon>
                </md-button>
              </div>
            </div>
          </md-toolbar>
          <div id="content" ng-view flex></div>
		<div class="footer">
            © 2018 get.masaricoin.com
        </div>
        </md-content>
      </div>
      <span id="blockreward" style="display:none;">Block Reward: <b>{{LastBlockData | toXMR | number:10}} MSR</b> <br />Block Height: <b>{{poolStats.global.lastBlockFound}}</b> -- Block Effort: <b>{{((LastBlockShares / LastBlockDiff)*100).toFixed(0) | number}}%</b></span>
      <span id="blockheight" style="display:none;">{{poolStats.global.lastBlockFound}}</span>
      <!-- Scripts -->
      <script src="vendor/jquery/dist/jquery.js"></script>
      <script src="vendor/moment/moment.js"></script>
      <script src="vendor/lodash/dist/lodash.js"></script>
      <script src="vendor/angular/angular.js"></script>
      <script src="notify.js"></script>
      <script src="vendor/angular-route/angular-route.js"></script>
      <script src="vendor/angular_page_visibility/dist/page_visibility.js"></script>
      <script src="vendor/angular-animate/angular-animate.js"></script>
      <script src="vendor/randomcolor/randomColor.js"></script>
      <script src="vendor/d3/d3.js"></script>
      <script src="vendor/n3-charts/build/LineChart.js"></script>
      <script src="vendor/angular-aria/angular-aria.js"></script>
      <script src="vendor/angular-material/angular-material.js"></script>
      <script src="vendor/angular-material-data-table/dist/md-data-table.js"></script>
      <script src="vendor/ngstorage/ngStorage.js"></script>
      <script src="vendor/angular-moment/angular-moment.js"></script>
      <script src="vendor/angular-audio/app/angular.audio.js"></script>
      <script src="globals.js"></script>
      <script src="utils/strings.js"></script>
      <script src="utils/services.js"></script>
      <script src="utils/dataservice.js"></script>
      <script src="app.js"></script>
      <script src="user/home/home.js"></script>
      <script src="user/home/login.js"></script>
      <script src="user/home/console.js"></script>
      <script src="user/dashboard/minerpayments.js"></script>
      <script src="user/dashboard/dashboard.js"></script>
       <script src="user/dashboard/exchanges.js"></script>
      <script src="user/help/api.js"></script>
      <script src="user/blocks/blocks.js"></script>
      <script src="user/payments/payments.js"></script>
      <script src="user/network/network.js"></script>
      <script src="user/ports/ports.js"></script>
      <script src="user/help/chat.js"></script>
      <script src="user/help/getting_started.js"></script>
      <script src="user/help/portsmodal.js"></script>
      <script src="user/help/config_generator.js"></script>
      <script src="user/help/faq.js"></script>
      <script src="notify/bootstrap-notify.js"></script>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.7.2/Chart.bundle.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@widgetbot/crate@3" async>
 var crate = new Crate({
    server: '411195170642460672',
    channel: '411195170642460674'
  });

  crate.notify('Hey there! Come Chat with us');
 </script>
      
     
      <!--
      <script src="https://crate.widgetbot.io/v2" defer async data-cfasync="false">new Crate({"server":"411195170642460672","channel":"411195170642460674"})</script>
      <script id="cid0020000179101226609" data-cfasync="false" async src="//st.chatango.com/js/gz/emb.js" style="width: 220px;height: 300px;">{"handle":"otherguysmining","arch":"js","styles":{"a":"6686ba","b":100,"c":"000000","d":"000000","k":"6686ba","l":"6686ba","m":"6686ba","p":"10","q":"6686ba","r":100,"pos":"bl","cv":1,"cvbg":"6686ba","cvfg":"ffffff","cvw":220,"cvh":30,"ticker":1,"fwtickm":1}}</script>
    </body>
    </html>
-->

<script type="text/javascript">

//document.getElementById("blockfound").innerHTML =  lastreward;

	
function alerting(reward) {
	
$.notify({
	
	icon: 'assets/notifylogo.fw.png',
	title: 'Block Found!!',
	message: reward,
	
	
},{
	type: 'minimalist',
	animate: {
		enter: 'animated zoomInDown',
		exit: 'animated zoomOutUp'
	},
	
	delay: 30000,
	icon_type: 'image',
	template: '<div data-notify="container" class="col-xs-11 col-sm-3 alert alert-{0}" role="alert" style="text-align:center;">' +
		'<button type="button" aria-hidden="true" class="close" data-notify="dismiss">×</button>' +
		'<img data-notify="icon" style="text-align:center;"><br /><br />' +
		'<span data-notify="title" style="text-align:center;">{1}</span>' +
		'<span data-notify="message">{2}</span>' +
		
	'</div>'
});
}
var a = document.getElementById("blockheight").innerHTML;
setInterval(function(){
	if (a < document.getElementById("blockheight").innerHTML) {
	 var reward = document.getElementById("blockreward").innerHTML
	alerting(reward)}
	a = document.getElementById("blockheight").innerHTML;
	}, 
	10000)

</script>