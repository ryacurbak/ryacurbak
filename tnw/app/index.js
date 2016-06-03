'use strict';
/*uses cssify module (like browserify but for css) to bundle CSS*/
var cssify = require('cssify');
cssify.byUrl('//cdn.rawgit.com/angular/bower-material/master/angular-material.css');
cssify.byUrl('/main.css');
/*pouchDB needs it's own requires outside of browserify*/
window.PouchDB = require('pouchdb');
window.PouchDB.plugin(require('pouchdb-authentication'));
/*browserify stuff begins here, this is how you add node_modules with browserify*/
require('angular').module('app', [
        require('angular-animate'),
        require('angular-aria'),
        require('angular-material'),
        require('./ng-icons'), /*svg-icons*/
        require('angular-ui-router'), /*controls user going between views*/
        require('angular-messages'), /*used to show fields are required*/
        require('./products')
    ])
    .config(['$stateProvider', '$urlRouterProvider', '$mdThemingProvider', function($stateProvider, $urlRouterProvider, $mdThemingProvider) {
        $urlRouterProvider.otherwise('/')
        $stateProvider
        /*Also need to add the new url/states here*/
            .state('home', require('./components/home'))
            /*All theming is done here. md-primary, md-hue-1 etc are very useful class tags*/
        $mdThemingProvider.theme('default')
            .primaryPalette('teal', {
                'default': '500', // by default use shade 500 from the palette for primary intentions
                'hue-1': '100', // use shade 100 for the <code>md-hue-1</code> class
                'hue-2': '500', // use shade 500 for the <code>md-hue-2</code> class
                'hue-3': '700' // use shade 700 for the <code>md-hue-3</code> class
            })
            // If you specify less than all of the keys, it will inherit from the
            // default shades
            .accentPalette('indigo', {
                'default': 'A200' // use shade A200 for default, and keep all other shades the same
            });

    }])
    //ahh directives, these are very useful. read up on them
    //directive for the nav bar. it is used in the app/indx.html file
    .directive('appNav', ['products', require('./components/app-nav')])
    //directive that compares two text fields... used for password and confirm password. could also use for email confirmation
    .directive("compareTo", function() {
        return {
            require: "ngModel",
            scope: {
                otherModelValue: "=compareTo"
            },
            link: function(scope, element, attributes, ngModel) {

                ngModel.$validators.compareTo = function(modelValue) {
                    return modelValue == scope.otherModelValue;
                };

                scope.$watch("otherModelValue", function() {
                    ngModel.$validate();
                });
            }
        };
    })
    //our apps controller. we use one controller but it only 'loads' for whatever page we are on (also navbar if it is in the view)
    .controller('AppController', ['$scope', 'products', AppController])
    /*Constants for database name*/
    .constant('dbName', 'https://phrasedev.smileupps.com/phrase')
    .constant('remoteUserDbName', 'https://phrasedev.smileupps.com/_products')
    .constant('annotationDbName', 'https://phrasedev.smileupps.com/annotator')

//some functions we want everywhere in our app
function AppController($scope, products) {
    //variable for toggling navBar
    $scope.showMenu = true;
    $scope.toggle = function() {
        $scope.showMenu = !$scope.showMenu;
    };

    //this listens for $emit then $broadcasts. used to make navBar controller know weather to use menu button or back button
    $scope.$on('pushChangesToAllNodes', function(event, message) {
        $scope.$broadcast(message.name, message.data);
    });

}
