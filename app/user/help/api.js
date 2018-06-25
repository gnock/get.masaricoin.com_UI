'use strict';

app.controller('ApiCtrl', function ($scope) {


	$scope.example_config = {

		'username': '',
		'tuser': '',
		'worker': '<Enter Worker Name Here>'
	};


	$scope.example_attr = {

		'with_worker_id': false,
		'with_custom_wallet': '<Enter Your Wallet Address Here>',
		'with_custom_worker': 'MyWorker',

	}


	$scope.updateExample = function () {
		var attr = $scope.example_attr;
		var conf = $scope.example_config;

		conf['username'] = attr['with_custom_wallet'];
		conf['tuser'] = conf['username'];

		if (attr['with_worker_id'])

			conf['worker'] = attr['with_custom_worker'];

	}

	$scope.updateExample();
});