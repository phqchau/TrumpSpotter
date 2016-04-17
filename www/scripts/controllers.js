"use strict";

angular.module('trumpSpotterApp.controllers', [])

.controller('LocatorCtrl', function($scope, $rootScope, $state, $cordovaGeolocation, $ionicLoading) {

  $ionicLoading.show({
    content: 'Loading',
    animation: 'fade-in',
    showBackdrop: true,
    maxWidth: 200,
    showDelay: 0
  });

  $rootScope.radius= {
      min:'100',
      max:'1000',
      value:'500'
  }

  var currRadius = parseInt($rootScope.radius.value);

  $scope.memes = [
    'http://bit.ly/1VwIanb',
    'http://bit.ly/1ONJ0qp',
    'http://bit.ly/1Gq7dMH',
    'http://bit.ly/1VwIanb',
    'http://bit.ly/1ONJ0qp',
    'http://bit.ly/1Gq7dMH',
    'http://bit.ly/1VwIanb',
    'http://bit.ly/1ONJ0qp',
    'http://bit.ly/1Gq7dMH'
  ];

  $scope.Generate = function(mylatitude,mylongitude,myradius,votefraction) {

      function rand(min,max,interval) {
          if (typeof(interval)==='undefined') interval = 1;
          var r = Math.floor(Math.random()*(max-min+interval)/interval);
          return r*interval+min;
      }

      var locs = [];

      var myRadiusKM = (myradius)/1000; //radius was in meters -> converted to KM
      var myRadiusKMOne = myRadiusKM;
      var myArea = 3.141592*myRadiusKM*myRadiusKM;//square KM
      //var apima = myArea * 35;// Approximate population in my area
      var apima2 = (myArea * 35) * 0.575//57.5% of the population takes part in elections
      //var loopmax = votefraction*apima2;
      var loopmax = Math.floor(votefraction*apima2);
      
      //radius should be given in Kilometers

      myRadiusKMOne = myRadiusKM/111; // Kilometers converted to the approximate degree 

      for (var i=1;i<=loopmax;i++){
          var randlat = rand(mylatitude-myRadiusKMOne/Math.sqrt(2),mylatitude+myRadiusKMOne/Math.sqrt(2),0.000000000001);
          var randlong = rand(mylongitude-myRadiusKMOne/Math.sqrt(2),mylongitude+myRadiusKMOne/Math.sqrt(2),0.000000000001);
          var imgMeme = $scope.memes[i];
          
          locs.push({latitude: randlat, longitude: randlong, meme: imgMeme});
      }

      return(locs);
  }
  
  var options = {timeout: 10000, enableHighAccuracy: true};
 
  $cordovaGeolocation.getCurrentPosition(options).then(function(position){
 
    var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

    $rootScope.lat = position.coords.latitude;
    $rootScope.long = position.coords.longitude;

 
    var mapOptions = {
      center: latLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP,

      zoomControl: false,
      mapTypeControl: false,
      scaleControl: false,
      streetViewControl: false,
      fullscreenControl: false,
    };

    $scope.map = new google.maps.Map(document.getElementById("map"), mapOptions);

    //Wait until the map is loaded
    google.maps.event.addListenerOnce($scope.map, 'idle', function(){

      $ionicLoading.hide();
     
     var markers = [];
     var pos = [];

     //adding my location marker
      var marker = new google.maps.Marker({
          map: $scope.map,
          animation: google.maps.Animation.DROP,
          position: latLng
      });

      $rootScope.modalOpen = false;
      $rootScope.memeURL = '';


      //Adding the trump supporters
      var trumpSupporters = $scope.Generate($rootScope.lat, $rootScope.long, $rootScope.radius.value, 0.5);
      var p = 0;
      
      $scope.memePopup = function(q){
        //$rootScope.memeURL = $scope.memes[q];
        //$rootScope.modalOpen = true;
        alert($scope.memes[q]);
        p++;
      };
      
      var infoWindowContent;
      
      for (var supporter in trumpSupporters) {
        // Collect and sanitize supporter values
        var supporterObj = trumpSupporters[supporter];
        var imgObj = $scope.memes[supporter];
        var supporterLatParsed = parseFloat(supporterObj.latitude);
        var supporterLongParsed = parseFloat(supporterObj.longitude);

        var myLatlng = new google.maps.LatLng(supporterLatParsed,supporterLongParsed);

        var image = "http://s23.postimg.org/mxfx5035z/tumblr_inline_nvs0vw_Jyj_O1r33elg_540.png";

        var trumpMarker = new google.maps.Marker({
          position: myLatlng,
          map: $scope.map,
          animation: google.maps.Animation.DROP,
          icon: image
        });

        google.maps.event.addListener(trumpMarker, 'click', function () {
          $scope.memePopup(p);
        });

      };

     
      var infoWindow = new google.maps.InfoWindow({
          content: "Here I am!"
      });

      var circle = new google.maps.Circle({
        map: $scope.map,
        radius: currRadius,    //in metres
        fillColor: '#11c1f3',
        strokeColor: 'transparent'
      });

      circle.bindTo('center', marker, 'position');
     
      google.maps.event.addListener(marker, 'click', function () {
          infoWindow.open($scope.map, marker);
      });
    });
 
  }, function(error){
    console.log("Could not get location");
  });

})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('MeCtrl', function($scope, $http) {
  $scope.settings = {
    enableSaviour: true
  };
  
  //return $http.jsonp("http://data.fcc.gov/api/block/find?format=json&latitude=28.35975&longitude=-81.421988");

});
