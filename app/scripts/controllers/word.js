'use strict';

/**
 * @ngdoc function
 * @name allKeyApp.controller:WordCtrl
 * @description
 * # WordCtrl
 * Controller of the allKeyApp
 */
angular.module('allKeyApp')
  .controller('WordCtrl', function ($scope) {

  	var selectGroup = ['Word', 'Int10', 'Int16', 'privateKey'];


	$scope.selectChange = function (selectItem){

		var wordKey = $scope.wordKey || "";

		var info;
		switch(selectItem) {
			case 'Word':
				info = util.wordToBitcoinAddress(wordKey);
				break;

			case 'Int10':
				info = util.intToBitcoinAddress(wordKey);
				break;

			case 'Int16':
				info = util.hexToBitcoinAddress(wordKey);
				break;

			case 'privateKey':
				info = util.privateKeyToBitcoinAddress(wordKey);
				break;

			default:
				//

		}

		$scope.selectItem = selectItem;
		$scope.wordItems = returnItems(info);
	};

	$scope.wordInput = function (){
		$scope.selectChange($scope.selectItem);
	};

	function returnItems(info) {

		var wordItems = [];
		wordItems[0] = {key: "privateKey", val: info.privateKey};
		wordItems[1] = {key: "addressUnCompressed", val: info.addressUnCompressed};
		wordItems[2] = {key: "addressCompressed", val: info.addressCompressed};
		wordItems[3] = {key: "hex", val: info.hex};
		wordItems[4] = {key: "bytes", val: info.bytes};
		return wordItems;

	}


  	$scope.selectChange(selectGroup[0]);
	$scope.selectGroup = selectGroup;


  });
