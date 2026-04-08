angular.module('starter')
  .controller('smartToiletsCtrl', function ($scope, RestService, $ionicLoading, $stateParams, toaster, $filter, ENV, $ionicHistory,
    $state, $localStorage, $sessionStorage, $cordovaGeolocation, $ionicModal, $ionicPopup) {

  $scope.toiletDetails = [];
  $scope.otherMarkers = [];
  var options = { timeout: 10000, enableHighAccuracy: true };
  $scope.lat = $sessionStorage.lat; 
  $scope.long = $sessionStorage.long;
  $scope.btnPressed = false;

  $scope.toiletDetails = [
    {value:'1',name:'MDDA Complex',wardName:'Indresh Nagar',wardNumber:'25',long:'78.01945004',lat:'30.3217594'},
    {value:'2',name:'District Court',wardName:'Dhamawala',wardNumber:'26',long:'78.04037039',lat:'30.31754809'},
    {value:'3',name:'Railway Station Chowk',wardName:'Lakhi Bag',wardNumber:'70',long:'78.03275569',lat:'30.31631407'},
    {value:'4',name:'Doon Hospital',wardName:'M.K.P',wardNumber:'21',long:'78.04223017',lat:'30.31991005'},
    {value:'5',name:'Front Doon Club',wardName:'M.K.P',wardNumber:'21',long:'78.04975478',lat:'30.32497699'},
    {value:'6',name:'Parade Ground',wardName:'M.K.P',wardNumber:'21',long:'78.04696175',lat:'30.32476134'},
    {value:'7',name:'Nagar Nigam',wardName:'M.K.P',wardNumber:'21',long:'78.04254559',lat:'30.32031677'},
  ];
      
  $scope.container = L.DomUtil.get('map');
  $scope.getMapLocation = function (closestToilet) {
    $ionicLoading.hide();

    console.log($scope.lat, $scope.long, "Lat long map 2...")
    if ($scope.container != null) {
      $scope.container._leaflet_id = null;    
    }
    $scope.map = new L.Map('map');
    $scope.map.invalidateSize();
 
    $scope.map.setView(new L.LatLng($scope.lat, $scope.long), 13);

    let layer = new L.TileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png');
    $scope.map.addLayer(layer);

    var circle = L.circle([$scope.lat, $scope.long], {
      color: 'red',
      fillColor: '#f03',
      fillOpacity: 0.5,
      radius: 100,
    }).addTo($scope.map);

    $scope.currentMarker;
    $scope.currentMarker = L.marker([$scope.lat, $scope.long]).addTo($scope.map).bindPopup('My Location').openPopup();

    var mapIcon = L.icon({
      iconUrl:'img/mapIcon/smart_toilet.png',
      iconSize: [30, 30]
    });

    for (var i = 0; i < $scope.toiletDetails.length; i++) {
      //console.log('name of location',$scope.toiletDetails);
      $scope.otherMarkers[i] = L.marker([$scope.toiletDetails[i].lat, $scope.toiletDetails[i].long],{icon: mapIcon}).bindPopup("Smart Toilet: " + $scope.toiletDetails[i].name +"<br>Ward Name: "+ $scope.toiletDetails[i].wardName +"<br>Ward Number: "+ $scope.toiletDetails[i].wardNumber).openPopup().addTo($scope.map);
    }

    if(closestToilet){
      if($scope.otherMarkers.length>0){
        for (var i = 0; i < $scope.otherMarkers.length; i++) {
          $scope.map.removeLayer($scope.otherMarkers[i]);
        }
      }
      console.log("Entered here", closestToilet)
      $scope.otherMarkers = L.marker([closestToilet[0].lat, closestToilet[0].long],{icon: mapIcon}).bindPopup("Nearest Smart Toilet: " + closestToilet[0].name +"<br>Ward Name: "+ closestToilet[0].wardName +"<br>Ward Number: "+ closestToilet[0].wardNumber + "<br>Distance: " + closestToilet[1] + "km").openPopup().addTo($scope.map);
    }
  }
  

  $scope.getDistanceFromLatLonInKm = function(lat1, lon1, lat2, lon2) {
    var R = 6371; // Radius of the earth in km
    var dLat = $scope.deg2rad(lat2-lat1);  // deg2rad below
    var dLon = $scope.deg2rad(lon2-lon1); 
    var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos($scope.deg2rad(lat1)) * Math.cos($scope.deg2rad(lat2)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2); 
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    var d = R * c; // Distance in km
    $scope.distance = d.toFixed(2);

    return $scope.distance;
  }

  $scope.deg2rad = function(deg) {   //degree to radians
    return deg * (Math.PI/180)
  }

  $scope.findClosestLocation =function(userLat, userLon, locations) {
    var closestLocation = null;
    var closestDistance = Infinity;

    locations.forEach(function(location) {
      var distance = $scope.getDistanceFromLatLonInKm(userLat, userLon, location.lat, location.long);
      if (distance < closestDistance) {
        closestDistance = distance;
        closestLocation = location;
      }
    });

    return [closestLocation,closestDistance];
  }

  $scope.getDistance = function(){
    $scope.closestToilet= $scope.findClosestLocation($scope.lat, $scope.long, $scope.toiletDetails);
    console.log("Closest location is:", $scope.closestToilet[0]);
    console.log("Distance is:", $scope.closestToilet[1]);
    $scope.getMapLocation($scope.closestToilet);
  }

  var _init = function () {
    $scope.getMapLocation();
  }
  _init();
    
    
});                         