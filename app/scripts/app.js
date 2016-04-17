// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('trumpSpotterApp', [
  'ionic',
  'ngCordova',
  'trumpSpotterApp.controllers',
  'trumpSpotterApp.services'
  ])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  // Each tab has its own nav history stack:

  .state('tab.locator', {
    url: '/locator',
    views: {
      'tab-locator': {
        templateUrl: 'templates/tab-locator.html',
        controller: 'LocatorCtrl'
      }
    }
  })

  .state('tab.quotes', {
      url: '/quotes',
      views: {
        'tab-quotes': {
          templateUrl: 'templates/tab-quotes.html',
          controller: 'QuotesCtrl'
        }
      }
    })
    .state('tab.quote-detail', {
      url: '/quotes/:quoteId',
      views: {
        'tab-quotes': {
          templateUrl: 'templates/quote-detail.html',
          controller: 'QuoteDetailCtrl'
        }
      }
    })

  .state('tab.me', {
    url: '/me',
    views: {
      'tab-me': {
        templateUrl: 'templates/tab-me.html',
        controller: 'MeCtrl'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/locator');

});
