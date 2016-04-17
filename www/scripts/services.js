'use strict';

angular.module('trumpSpotterApp.services', [])

.factory('Quotes', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var quotes = [{
    id: 0,
    name: 'Ben Sparrow',
    lastText: 'You on your way?',
    face: 'images/ben.png'
  }, {
    id: 1,
    name: 'Max Lynx',
    lastText: 'Hey, it\'s me',
    face: 'images/max.png'
  }, {
    id: 2,
    name: 'Adam Bradleyson',
    lastText: 'I should buy a boat',
    face: 'images/adam.jpg'
  }, {
    id: 3,
    name: 'Perry Governor',
    lastText: 'Look at my mukluks!',
    face: 'images/perry.png'
  }, {
    id: 4,
    name: 'Mike Harrington',
    lastText: 'This is wicked good ice cream.',
    face: 'images/mike.png'
  }];

  return {
    all: function() {
      return quotes;
    },
    remove: function(quote) {
      quotes.splice(quotes.indexOf(quote), 1);
    },
    get: function(quoteId) {
      for (var i = 0; i < quotes.length; i++) {
        if (quotes[i].id === parseInt(quoteId)) {
          return quotes[i];
        }
      }
      return null;
    }
  };
});
