'use strict'
/*This section requires the node module fs to read the template html*/
var fs = require('fs')
/*This part exposes this module to rest of app*/
module.exports = {
  url: '/show',
  controller: ['$scope', 'products', '$state', controller],
  template: fs.readFileSync(__dirname + '/template.html', 'utf-8')
}

function controller ($scope, products, $state) {
  /*back or menu button*/
  $scope.$emit('pushChangesToAllNodes', backButtonPlacer());

    function backButtonPlacer() {
        return { name: 'isArticlePageBool', data: false };
    }
  /*Gets the user's information to display in profile*/
  productss.getSession()
    .then(function (ctx) {
      return ctx.username
    })
    .then(products.getUser)
    .then(function (user) {
      $scope.user = user
    })
}
