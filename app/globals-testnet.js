'use strict';

angular.module('pool.globals', [])

.factory('GLOBALS', function() {
	return {
		pool_name: "Masaricoin TESTNET.com",
		api_url : 'https://testnet.masaricoin.com/api',
		api_refresh_interval: 30000,
		app_update_interval: 10*60000
	};
});
