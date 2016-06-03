/* commonjs package manager support (eg componentjs) */
if (typeof module !== "undefined" && typeof exports !== "undefined" && module.exports === exports){
  module.exports = 'app.products';
}

(function (window, angular, undefined) {
  angular.module('app.products', [require('./pouchdb')])
    .config(['$stateProvider', function ($stateProvider) {
       $stateProvider
          /*name of main state*/
          .state('products', {
            /*main state url branch*/
            url: '/products',
            abstract: true
            /*shows app-nav above state*/,
            template: '<div ui-view></div>'
          })
          /*substates and their requirements*/
          .state('products.show', require('./components/show'))

     }])
    /*intiliazes products factory*/
    .factory('products', ['pouchDB', 'remoteUserDbName', require('./services').products])
})( window, window.angular)
