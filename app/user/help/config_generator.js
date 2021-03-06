'use strict';

app.controller('ConfigGeneratorCtrl', function($scope) {


//angular.module('MyApp',['ngMaterial', 'ngMessages', 'material.svgAssetsCache'])

//.controller('ConfigGeneratorCtrl', function($scope) {

  $scope.example_config = {
		'pool_address': '',
		'username': '',
		'password': '',
		'static': '',
	};


	$scope.example_attr = {
		'with_mail': false,
		'with_worker_id': false,
		'Static_Diff':false,
    'with_pool_address' : 'pool.masaricoin.com',
    'with_custom_wallet': '5p5F4crnMAJeiWyyCQd5YN8oW4schxacoCtzKUc77YSF9cygESXzybpJxrSYzH41pgGGHXEmWv2UwGin9LArx8uCGoaJkj5',
    'with_custom_worker': 'MyWorker',
    'with_custom_email': 'me@amawesome.com',
    'with_custom_port': '5555', 
	'StaticDiff': '10000',   
	}



	$scope.updateExample = function() {
		var attr = $scope.example_attr;
		var conf = $scope.example_config;
    
		conf['username'] = attr['with_custom_wallet'];
    
    	conf['pool_address'] = attr['with_pool_address'] + ':' + attr['with_custom_port']; 

        
		if (attr['with_worker_id'])
			conf['password'] = attr['with_custom_worker'],
			conf['worker'] = attr['with_custom_worker'];
			
		else
			conf['password'] = 'x:';
			
		if (attr['Static_Diff'])
			conf['static'] = '+'+attr['StaticDiff'];

		if (attr['with_mail'] && attr['with_worker_id'])
			conf['password'] += ':';

		if (attr['with_mail'])
			conf['password'] += attr['with_custom_email'];

		if (!attr['with_mail'] && !attr['with_worker_id']) {
			conf['password'] = 'x';
		}
		if (!attr['Static_Diff'])
			conf['static'] = '';
		if (!attr['with_worker_id'])
			conf['worker'] = '';
	
	}
	
		
  $scope.updateExample();
});
