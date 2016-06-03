'use strict'

var fs = require('fs')

module.exports = {
  url: '/',
  controller: ['$scope', 'products', '$state', '$rootScope', controller],
  template: fs.readFileSync(__dirname + '/template.html', 'utf-8')
}

function controller ($scope, products, $state, $rootScope) {

}
