angular.module('starter')
  .controller('smartWaterATMCtrl', function ($scope, RestService, $ionicLoading, $stateParams, toaster, $filter, ENV, $ionicHistory,
    $state, $localStorage, $sessionStorage, $cordovaGeolocation, $ionicModal, $ionicPopup) {

  var options = { timeout: 10000, enableHighAccuracy: true };
  $scope.lat = $sessionStorage.lat; 
  $scope.long = $sessionStorage.long;
  $scope.waterATMDetails = [];
  $scope.otherMarkers = [];

  $scope.waterATMDetails = [
    {value:'1',zoneName:'Rajpur',wardName:'Bakralwala',zoneNumber:'5',wardNumber:'16',waterATMName:'U.K. Liptic Road',long:'78.0527039364014',lat:'30.3324547176465'},
    {value:'2',zoneName:'Nagar Nigam',wardName:'Dhamawala',zoneNumber:'3',wardNumber:'26',waterATMName:'Dispensory Road',long:'78.0382968868873',lat:'30.319972364435'},
    {value:'3',zoneName:'Nagar Nigam',wardName:'M.K.P',zoneNumber:'3',wardNumber:'21',waterATMName:'Ugrasain Road',long:'78.0496758496203',lat:'30.3248540806983'},
    {value:'4',zoneName:'Nagar Nigam',wardName:'M.K.P',zoneNumber:'3',wardNumber:'21',waterATMName:'Gandhi Road',long:'78.0422180000173',lat:'30.3219679999995'},
    {value:'5',zoneName:'Nagar Nigam',wardName:'M.K.P',zoneNumber:'3',wardNumber:'21',waterATMName:'Doon Hospital',long:'78.0417640000173',lat:'30.3192549999995'},
    {value:'6',zoneName:'Nagar Nigam',wardName:'M.K.P',zoneNumber:'3',wardNumber:'21',waterATMName:'Court',long:'78.0416790000173',lat:'30.3159689999995'},
    {value:'7',zoneName:'Rajpur',wardName:'Karanpur',zoneNumber:'5',wardNumber:'15',waterATMName:'Karanpur Road',long:'78.0525426918056',lat:'30.3252194101862'},
    {value:'8',zoneName:'Rajpur',wardName:'Karanpur',zoneNumber:'5',wardNumber:'15',waterATMName:'Dav Chowk',long:'78.0575354752538',lat:'30.3289433601787'},
    {value:'9',zoneName:'Nagar Nigam',wardName:'Ghanta Ghar',zoneNumber:'3',wardNumber:'19',waterATMName:'Chakrata Road',long:'78.0355672762446',lat:'30.3261883720252'},
    {value:'10',zoneName:'Nagar Nigam',wardName:'Ghanta Ghar',zoneNumber:'3',wardNumber:'19',waterATMName:'Chakrata Road',long:'78.039408657868',lat:'30.3259206299938'},
    {value:'11',zoneName:'Nagar Nigam',wardName:'Ghanta Ghar',zoneNumber:'3',wardNumber:'19',waterATMName:'Chakrata Road',long:'78.041086949082',lat:'30.3242843750501'},
    {value:'12',zoneName:'Nagar Nigam',wardName:'Jhanda Mohala',zoneNumber:'3',wardNumber:'27',waterATMName:'Railway Road',long:'78.033270000017',lat:'30.3164799999996'},
    {value:'13',zoneName:'Nagar Nigam',wardName:'Jhanda Mohala',zoneNumber:'3',wardNumber:'27',waterATMName:'Tilak Road',long:'78.0307924850752',lat:'30.3188717197141'},
    {value:'14',zoneName:'Nagar Nigam',wardName:'Indresh Nagar',zoneNumber:'3',wardNumber:'25',waterATMName:'Kanwali Road',long:'78.0181460000164',lat:'30.3220359999995'},
    {value:'15',zoneName:'Nagar Nigam',wardName:'Tilak Road',zoneNumber:'3',wardNumber:'22',waterATMName:'Tilak Road',long:'78.0333666815812',lat:'30.325973011692'},
    {value:'16',zoneName:'Nagar Nigam',wardName:'Tilak Road',zoneNumber:'3',wardNumber:'22',waterATMName:'Tilak Road',long:'78.0327878963093',lat:'30.3249327050437'},
    {value:'17',zoneName:'Nagar Nigam',wardName:'Tilak Road',zoneNumber:'3',wardNumber:'22',waterATMName:'Tilak Road',long:'78.0330250518207',lat:'30.3219969173902'},
    {value:'18',zoneName:'Nagar Nigam',wardName:'Tilak Road',zoneNumber:'3',wardNumber:'22',waterATMName:'Chakrata Road',long:'78.033906141128',lat:'30.3264326143541'},
    {value:'19',zoneName:'Nagar Nigam',wardName:'Shivaji Marg',zoneNumber:'3',wardNumber:'24',waterATMName:'Shivaji Marg',long:'78.0217977027709',lat:'30.3218848716492'},
    {value:'20',zoneName:'Nagar Nigam',wardName:'Dhamawala',zoneNumber:'3',wardNumber:'26',waterATMName:'Paltan Bazar',long:'78.0384861792321',lat:'30.3211142505388'},
    {value:'21',zoneName:'Nagar Nigam',wardName:'M.K.P',zoneNumber:'3',wardNumber:'21',waterATMName:'New Road',long:'78.0406897959317',lat:'30.3212465308191'},
    {value:'22',zoneName:'Nagar Nigam',wardName:'M.K.P',zoneNumber:'3',wardNumber:'21',waterATMName:'Near MKP chowk',long:'78.0453347251626',lat:'30.3181033156377'},
    {value:'23',zoneName:'Nagar Nigam',wardName:'M.K.P',zoneNumber:'3',wardNumber:'21',waterATMName:'Subhash Road',long:'78.0459898354864',lat:'30.3240508546664'},
  ];

  $scope.container = L.DomUtil.get('map');
  $scope.getMap = function (closestATM) {
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
      iconUrl:"img/mapIcon/waterIcon.png",
      iconSize: [30, 30]
    });

    for (var i = 0; i < $scope.waterATMDetails.length; i++) {
      //console.log('name of location',$scope.toiletDetails);
      $scope.otherMarkers[i] = L.marker([$scope.waterATMDetails[i].lat, $scope.waterATMDetails[i].long],{icon: mapIcon}).bindPopup("Water ATM: " + $scope.waterATMDetails[i].waterATMName +"<br>Ward Name: "+ $scope.waterATMDetails[i].wardName +"<br>Ward Number: "+ $scope.waterATMDetails[i].wardNumber).openPopup().addTo($scope.map);
    }

    if(closestATM){
      if($scope.otherMarkers.length>0){
        for (var i = 0; i < $scope.otherMarkers.length; i++) {
          $scope.map.removeLayer($scope.otherMarkers[i]);
        }
      }
      console.log("Entered here", closestATM)
      $scope.otherMarkers = L.marker([closestATM[0].lat, closestATM[0].long],{icon: mapIcon}).bindPopup("Nearest Water ATM: " + closestATM[0].waterATMName +"<br>Ward Name: "+ closestATM[0].wardName +"<br>Ward Number: "+ closestATM[0].wardNumber + "<br>Distance: " + closestATM[1] + "km").openPopup().addTo($scope.map);
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
    $scope.closestATM= $scope.findClosestLocation($scope.lat, $scope.long, $scope.waterATMDetails);
    console.log("Closest location is:", $scope.closestATM[0]);
    console.log("Distance is:", $scope.closestATM[1]);
    $scope.getMap($scope.closestATM);
  }

  var _init = function () {
    $scope.getMap();

    console.log("$scope.waterATMDetails", $scope.waterATMDetails);
  }
  _init();
  
  
});