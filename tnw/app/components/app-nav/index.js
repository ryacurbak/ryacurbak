'use strict'

var fs = require('fs')

module.exports = function (products) {
  return {
    restrict: 'E',
    controller: ['$scope', 'products', '$state', '$mdSidenav', '$mdUtil', '$log', '$mdDialog', '$rootScope', '$stateParams', '$window', controller],
    template: fs.readFileSync(__dirname + '/template.html', 'utf-8')
  }
}

function controller ($scope, products, $state, $mdSidenav, $mdUtil, $log, $mdDialog, $rootScope, $stateParams, $window) {

  /*function for going to view: home*/
  $scope.goHome = function(){
    $state.go('home') /*takes you to view: home*/
  }

  /*function for toggling the nav bar*/
  function buildToggler(navID) {
    var debounceFn =  $mdUtil.debounce(function(){
          $mdSidenav(navID)
            .toggle()
            .then(function () {
              $log.debug('toggle ' + navID + ' is done');
            });
        },300);
    return debounceFn;
  }

  /*begins above function with nav bar labled 'left' useful for more than one nav bar if needed*/
  $scope.toggleLeft = buildToggler('left');

};
