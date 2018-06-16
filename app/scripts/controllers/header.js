/**
 * Header controller
 */
angular.module('allKeyApp')
  .controller('HeaderCtrl', function ($scope, $location) {

    $scope.isActive = function (viewLocation) { 
        return viewLocation === $location.path();
    };

    $scope.menuItems = [
      {
        name: 'Home',
        url:  '/',
        title: ''
      },
      // {
      //   name:   'Word',
      //   url:    '/word',
      //   title:  ''
      // },
      {
        name:   'About',
        url:    '/about',
        title:  ''
      }
    ];
  });
