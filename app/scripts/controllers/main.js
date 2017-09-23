'use strict';

/**
 * @ngdoc function
 * @name allKeyApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the allKeyApp
 */
angular.module('allKeyApp')
  .controller('MainCtrl', function ($scope, $routeParams) {

  	var page = $routeParams.id || 1;
  	var pageFix = new BigNumber(page).minus(1);
  	var numberPerPage = 16;
  	var statInt = pageFix.times(numberPerPage);

  	var maxInt = new BigNumber('FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF', 16).toString(10);
  	var maxPage = new BigNumber('FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF', 16).dividedBy(numberPerPage).toFixed(0).toString(10);

  	var items = [];
  	// for (var i = 1; i <= numberPerPage; i++) {
  	// 	var int = statInt.plus(i).toString(10);
  	// 	var int16 = statInt.plus(i).toString(16);

  	// 	if (int >= 1 && new BigNumber(int).lte(maxInt)) {
	  // 		items[i] = util.intToBitcoinAddress(int);
  	// 	}

  	// }

  	// $scope.items = items;

    var i = 1;
    var timer = setInterval(function (){

       var int = statInt.plus(i).toString(10);
       var int16 = statInt.plus(i).toString(16);

       if (int >= 1 && new BigNumber(int).lte(maxInt)) {
         items[i-1] = util.intToBitcoinAddress(int);
       } else {
         clearInterval(timer);
       }

      $scope.items = items;
      $scope.$apply();

      if (i >= numberPerPage) {
        clearInterval(timer);
      }
      
      i ++ ;
    }, 1)


  	$scope.page = page;
  	$scope.maxPage = maxPage;
  	$scope.prev = pageFix.toString(10);
  	$scope.next = pageFix.plus(2).toString(10);

  	$scope.toTop = function () {
  		$(window).scrollTop(0)
  	};


  });
