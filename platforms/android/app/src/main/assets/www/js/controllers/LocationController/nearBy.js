angular.module('starter')
  .controller('nearByCTRL', function ($scope, RestService, $ionicLoading, $stateParams, toaster, $filter, ENV, $ionicHistory,
    $state, $localStorage, $sessionStorage, $cordovaGeolocation, $ionicModal, $ionicPopup) {
    $scope.data = {};
    $scope.orgid = $localStorage.selectedorgID;
    $scope.latlonArray = new Array();
    $scope.raduis = "0";
    var locationId = $sessionStorage.locationId;
    $scope.lat = $sessionStorage.lat
    $scope.long = $sessionStorage.long
    var geocodeResponse = []
    var options = { timeout: 10000, enableHighAccuracy: true };
    //var marker = L.marker([51.5, -0.09]).addTo(map);


    //$scope.radiusChange = function()
    //{
    //
    //    $scope.nearByChange($sessionStorage.locationId);
    //}
    // var call = function () {
    //  $scope.nearByChange(locationId)
    // }
    // $scope.nearByChange = function () {

    //   console.log("nearby" + locationId);
    //   $ionicLoading.show({ template: $filter('translate')('LOADING') });
    //   $scope.markers = new Array();
    //   RestService.GetPlaceFromLayer().then(function (nearByResponse) {
    //     console.log("near by length" + nearByResponse.length)
    //     console.log("near by " + JSON.stringify(nearByResponse))
    //     if (nearByResponse.length > 0) {
    //       for (var i = 0; i < nearByResponse.length; i++) {
    //         $scope.markers.push({
    //           lat: nearByResponse[i].latitude,
    //           lng: nearByResponse[i].longitude,
    //           address: nearByResponse[i].locAddress
    //         })
    //       }
    //       // markerfun($scope.markers);
    //       //initialize($scope.markers);
    //       $ionicLoading.hide();
    //     } else {
    //       toaster.error($filter('translate')('No Such Record Found'));
    //       $ionicLoading.hide();
    //     }
    //   }, function (err) {
    //     //      toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR_OCCURED'));
    //     $ionicLoading.hide();
    //   })

    // }

    //call();

    $scope.container = L.DomUtil.get('map');
    $scope.nearbyLocation = function () {
      console.log($scope.lat, $scope.long, "Lat long map 2...")
      //     document.getElementById('doonmap').innerHTML = "<div id='map' style='width: 100%; height: 100%;'></div>";
      //   var osmUrl = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      //   osmAttribution = 'Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors,' +
      //   ' <a href="https://dsclgis.uk.gov.in:8443/cgi-bin/IGiS_Ent_service.exe?IEG_PROJECT=dehradun_ws">CC-BY-SA</a>',
      //   osmLayer = new L.TileLayer(osmUrl, {maxZoom: 18, attribution: osmAttribution});

      //   var container = L.DomUtil.get('doonmap');

      //   if(container != null){

      //   container._leaflet_id = null;

      //   }
      //   var map = new L.Map('doonmap');
      //   map.invalidateSize();
      //   console.log($scope.lat,$scope.long,"Lat long map 1...")
      //   map.setView(new L.LatLng($scope.lat,$scope.long), 9 );
      //   map.addLayer(osmLayer);
      //  var validatorsLayer = new OsmJs.Weather.LeafletLayer({lang: 'en'});
      //   map.addLayer(validatorsLayer);
      //document.getElementById('weathermap').innerHTML = "<div id='map' style='width: 100%; height: 100%;'></div>"
      if ($scope.container != null) {
        $scope.container._leaflet_id = null;    
      }
        $scope.map = new L.Map('map');
        $scope.map.invalidateSize();
      //var map = L.map('map').setView([$scope.lat, $scope.long], 13, {

     // });
     $scope.map.setView(new L.LatLng($scope.lat, $scope.long), 13);
        var tiles = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
        layers: 'boundary_ward,boundary_zone',
        maxZoom: 18,
        attribution: 'Map data &copy; <a href="https://dsclgis.uk.gov.in:8443/cgi-bin/IGiS_Ent_service.exe?IEG_PROJECT=dehradun_ws">OpenStreetMap</a> contributors, ' +
          'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1
      }).addTo($scope.map);

      var circle = L.circle([$scope.lat, $scope.long], {
        color: 'red',
        fillColor: '#f03',
        fillOpacity: 0.5,
        radius: 100,
      }).addTo($scope.map);

      $scope.currentMarker;
      $scope.currentMarker = L.marker([$scope.lat, $scope.long]).addTo($scope.map).bindPopup('My Location').openPopup();


  //     map.on('click', function (e) {
  //       // Place marker
  //  console.log(e,"on map click e...")
  //  console.log(e.latlng,"lat long")
  //  //alert("Lat, Lon : " + e.latlng.lat + ", " + e.latlng.lng)
  //  console.log(e.latlng.lat,e.latlng.lng,"888888");
 

  //       // Ajax query to save the values:

  //       $scope.markers = new Array();
  //       RestService.GetPlaceFromLayer($scope.lat,$scope.long).then(function (nearByResponse) {
  //         console.log("near by length" + nearByResponse.length)
  //         console.log("near by " + JSON.stringify(nearByResponse))
  //         if (nearByResponse.length > 0) {

  //           for (var i = 0; i < nearByResponse.length; i++) {
  //             console.log(nearByResponse[i].name, "hghjghjgh")
  //           //  if (e.latlng) {
  //               console.log("condition call...")
  //             var marker = L.marker([$scope.lat, $scope.long]).addTo(map)
  //             .bindPopup(nearByResponse[i].name).openPopup();
  //               circle.bindPopup(nearByResponse[i].name);
  //               console.log(nearByResponse[i].name, "00000000")
               
  //           //  } else {
  //               //circle.bindPopup(e.latlng.lat,e.latlng.lng);

  //            // }
  //           }
  //           $ionicLoading.hide();
  //         } else {
  //           toaster.error($filter('translate')('No Such Record Found'));
  //           $ionicLoading.hide();
           
  //         }
  //       }, function (err) {
  //         //      toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR_OCCURED'));
  //         $ionicLoading.hide();
  //       })



  //     });


  //     map.on('click', onMapClick);

    }

   
    // function onMapClick(e) {
    //  // alert(e.latlng.lat,e.latlng.lng)  
     
 
 
    // }
   
    $scope.getABDMapOptions = function(){

        $scope.abdMapOptions = [{name:'Private Hospital',value:'Private_Hospital'},
        {name:'Ward',value:'boundary_ward'},
        {name:'Smart Toilet',value:'abd_smart_toilet'},
        {name:'Landmark',value:'landmark'},
        {name:'Water Atm',value:'abd_water_atm'},
        {name:'Smart School',value:'abd_smart_school'},
        {name:'Zone',value:'boundary_zone'},
        {name:'Emergency Call Box',value:'emergency_call_box'},
        {name:'Temple',value:'temple'}];

        console.log('$scope.abdMapOptions-->',$scope.abdMapOptions);
    }

    $scope.onChangeAbdMap = function(mapValue){
      console.log('selected map value-->',mapValue);
      if(mapValue == 'boundary_ward'){
        var paramList = {'param1':mapValue,'param2':'ward_name','distance':1000,'recordNo':5,'iconUrl':'img/mapIcon/wardIcon.png'};
        $scope.getYourNearByPlaces(mapValue,paramList.param1,paramList.param2,paramList.distance,paramList.recordNo,paramList.iconUrl);
      }
      else if(mapValue == 'abd_smart_toilet'){
        var paramList = {'param1':mapValue,'param2':'smart_toilet_name','distance':500,'recordNo':4,'iconUrl':'img/mapIcon/smart_toilet.png'};
        $scope.getYourNearByPlaces(mapValue,paramList.param1,paramList.param2,paramList.distance,paramList.recordNo,paramList.iconUrl);
      }
      else if(mapValue == 'landmark'){
        var paramList = {'param1':mapValue,'param2':'name','distance':300,'recordNo':4,'iconUrl':'img/mapIcon/landmark_Icon.png'};
        $scope.getYourNearByPlaces(mapValue,paramList.param1,paramList.param2,paramList.distance,paramList.recordNo,paramList.iconUrl);
      }
      else if(mapValue == 'abd_water_atm'){
        var paramList = {'param1':mapValue,'param2':'water_atm_name','distance':1000,'recordNo':10,'iconUrl':'img/mapIcon/waterIcon.png'};
        $scope.getYourNearByPlaces(mapValue,paramList.param1,paramList.param2,paramList.distance,paramList.recordNo,paramList.iconUrl);
      }
      else if(mapValue == 'Private_Hospital'){
        var paramList = {'param1':mapValue,'param2':'name','distance':2000,'recordNo':5,'iconUrl':'img/mapIcon/hospital_icon.png'};
        $scope.getYourNearByPlaces(mapValue,paramList.param1,paramList.param2,paramList.distance,paramList.recordNo,paramList.iconUrl);
      }
      else if(mapValue == 'abd_smart_school'){
        var paramList = {'param1':mapValue,'param2':'smart_school_name','distance':2000,'recordNo':5,'iconUrl':'img/mapIcon/school_icon.png'};
        $scope.getYourNearByPlaces(mapValue,paramList.param1,paramList.param2,paramList.distance,paramList.recordNo,paramList.iconUrl);
      }
      else if(mapValue == 'boundary_zone'){
        var paramList = {'param1':mapValue,'param2':'zone_name','distance':2000,'recordNo':5,'iconUrl':'img/mapIcon/zone_icon.png'};
        $scope.getYourNearByPlaces(mapValue,paramList.param1,paramList.param2,paramList.distance,paramList.recordNo,paramList.iconUrl);
      }
      else if(mapValue == 'emergency_call_box'){
        var paramList = {'param1':mapValue,'param2':'name_of_location','distance':1000,'recordNo':3,'iconUrl':'img/mapIcon/call_box_icon.png'};
        $scope.getYourNearByPlaces(mapValue,paramList.param1,paramList.param2,paramList.distance,paramList.recordNo,paramList.iconUrl);
      }
      else if(mapValue == 'temple'){
        var paramList = {'param1':mapValue,'param2':'temple_name','distance':700,'recordNo':3,'iconUrl':'img/mapIcon/temple_icon.png'};
        $scope.getYourNearByPlaces(mapValue,paramList.param1,paramList.param2,paramList.distance,paramList.recordNo,paramList.iconUrl);
      }
      else{
        //$scope.map.removeLayer($scope.otherMarkers);
        toaster.error($filter('translate')('NO_DATA_FOUND'));
        $ionicLoading.hide();
      } 
      
    }

    $scope.otherMarkers = [];
    $scope.getYourNearByPlaces = function(mapValue,param1,param2,distance,recordNo,iconUrl){
      $ionicLoading.show({  template: 'Loading...'  });
        RestService.getYourNearByPlaces(param1,param2,distance,recordNo,$scope.lat,$scope.long).then(function (geocodeResponse) {
          console.log("near by places response -->" + JSON.stringify(geocodeResponse));

            var mapIcon = L.icon({
              iconUrl: iconUrl,
              iconSize: [30, 30]
            });

          if (geocodeResponse.length > 0) {
            
            if(mapValue == 'boundary_ward'){
              if($scope.otherMarkers.length>0){
                for (var i = 0; i < $scope.otherMarkers.length; i++) {
                  $scope.map.removeLayer($scope.otherMarkers[i]);
                }
              }
              //$scope.map.removeLayer($scope.otherMarkers);
              for (var i = 0; i < geocodeResponse.length; i++) {
                console.log('Ward Name = '+geocodeResponse[i].ward_name);
                $scope.otherMarkers[i] = L.marker([geocodeResponse[i].longitude, geocodeResponse[i].latitude],{icon: mapIcon}).bindPopup(geocodeResponse[i].ward_name).openPopup().addTo($scope.map);
              }
            }
            else if(mapValue == 'abd_smart_toilet'){
              if($scope.otherMarkers.length>0){
                for (var i = 0; i < $scope.otherMarkers.length; i++) {
                  $scope.map.removeLayer($scope.otherMarkers[i]);
                }
              }
              //$scope.map.removeLayer($scope.otherMarkers);
              for (var i = 0; i < geocodeResponse.length; i++) {
                console.log('Smart Toilet Name = '+geocodeResponse[i].smart_toilet_name);
                $scope.otherMarkers[i] = L.marker([geocodeResponse[i].longitude, geocodeResponse[i].latitude],{icon: mapIcon}).bindPopup(geocodeResponse[i].smart_toilet_name).openPopup().addTo($scope.map);
              }
            }
            else if(mapValue == 'landmark'){
              if($scope.otherMarkers.length>0){
                for (var i = 0; i < $scope.otherMarkers.length; i++) {
                  $scope.map.removeLayer($scope.otherMarkers[i]);
                }
              }
              //$scope.map.removeLayer($scope.otherMarkers);
              for (var i = 0; i < geocodeResponse.length; i++) {
                console.log('Landmark Name = '+geocodeResponse[i].name);
                $scope.otherMarkers[i] = L.marker([geocodeResponse[i].longitude, geocodeResponse[i].latitude],{icon: mapIcon}).bindPopup(geocodeResponse[i].name).openPopup().addTo($scope.map);
              }
            }
            else if(mapValue == 'abd_water_atm'){
              if($scope.otherMarkers.length>0){
                for (var i = 0; i < $scope.otherMarkers.length; i++) {
                  $scope.map.removeLayer($scope.otherMarkers[i]);
                }
              }
              //$scope.map.removeLayer($scope.otherMarkers);
              for (var i = 0; i < geocodeResponse.length; i++) {
                console.log('Water Atm Name = '+geocodeResponse[i].water_atm_name);
                $scope.otherMarkers[i] = L.marker([geocodeResponse[i].longitude, geocodeResponse[i].latitude],{icon: mapIcon}).bindPopup(geocodeResponse[i].water_atm_name).openPopup().addTo($scope.map);
              }
            }     
            else if(mapValue == 'Private_Hospital'){
              if($scope.otherMarkers.length>0){
                for (var i = 0; i < $scope.otherMarkers.length; i++) {
                  $scope.map.removeLayer($scope.otherMarkers[i]);
                }
              }
              //$scope.map.removeLayer($scope.otherMarkers);
              for (var i = 0; i < geocodeResponse.length; i++) {
                console.log('Hospital Name = '+geocodeResponse[i].name);
                $scope.otherMarkers[i] = L.marker([geocodeResponse[i].longitude, geocodeResponse[i].latitude],{icon: mapIcon}).bindPopup(geocodeResponse[i].name).openPopup().addTo($scope.map);
              }
            }    
            else if(mapValue == 'abd_smart_school'){
              if($scope.otherMarkers.length>0){
                for (var i = 0; i < $scope.otherMarkers.length; i++) {
                  $scope.map.removeLayer($scope.otherMarkers[i]);
                }
              }
              //$scope.map.removeLayer($scope.otherMarkers);
              for (var i = 0; i < geocodeResponse.length; i++) {
                console.log('Smart School Name = '+geocodeResponse[i].smart_school_name);
                $scope.otherMarkers[i] = L.marker([geocodeResponse[i].longitude, geocodeResponse[i].latitude],{icon: mapIcon}).bindPopup(geocodeResponse[i].smart_school_name).openPopup().addTo($scope.map);
              }
            }   
            else if(mapValue == 'boundary_zone'){
              if($scope.otherMarkers.length>0){
                for (var i = 0; i < $scope.otherMarkers.length; i++) {
                  $scope.map.removeLayer($scope.otherMarkers[i]);
                }
              }
              //$scope.map.removeLayer($scope.otherMarkers);
              for (var i = 0; i < geocodeResponse.length; i++) {
                console.log('Zone Name = '+geocodeResponse[i].zone_name);
                $scope.otherMarkers[i] = L.marker([geocodeResponse[i].longitude, geocodeResponse[i].latitude],{icon: mapIcon}).bindPopup(geocodeResponse[i].zone_name).openPopup().addTo($scope.map);
              }
            }   
            else if(mapValue == 'emergency_call_box'){
              if($scope.otherMarkers.length>0){
                for (var i = 0; i < $scope.otherMarkers.length; i++) {
                  $scope.map.removeLayer($scope.otherMarkers[i]);
                }
              }
              //$scope.map.removeLayer($scope.otherMarkers);
              for (var i = 0; i < geocodeResponse.length; i++) {
                console.log('Emergency Call Box Location = '+geocodeResponse[i].name_of_location);
                $scope.otherMarkers[i] = L.marker([geocodeResponse[i].longitude, geocodeResponse[i].latitude],{icon: mapIcon}).bindPopup(geocodeResponse[i].name_of_location).openPopup().addTo($scope.map);
              }
            }   
            else if(mapValue == 'temple'){
              if($scope.otherMarkers.length>0){
                for (var i = 0; i < $scope.otherMarkers.length; i++) {
                  $scope.map.removeLayer($scope.otherMarkers[i]);
                }
              }
              //$scope.map.removeLayer($scope.otherMarkers);
              for (var i = 0; i < geocodeResponse.length; i++) {
                console.log('Temple Name = '+geocodeResponse[i].temple_name);
                $scope.otherMarkers[i] = L.marker([geocodeResponse[i].longitude, geocodeResponse[i].latitude],{icon: mapIcon}).bindPopup(geocodeResponse[i].temple_name).openPopup().addTo($scope.map);
              }
            }   
            $ionicLoading.hide();
          } 
          else {
            if($scope.otherMarkers.length>0){
              for (var i = 0; i < $scope.otherMarkers.length; i++) {
                $scope.map.removeLayer($scope.otherMarkers[i]);
              }
            }
            toaster.error($filter('translate')('NO_DATA_FOUND'));
            $ionicLoading.hide();         
          }
        }, function (err) {
          toaster.error($filter('translate')('NEARBYERROR')/* , $filter('translate')('') */);
          $ionicLoading.hide();
        });
    }

    var _init = function () {

      var geoSuccess = function (position) {
        console.log("position---" + JSON.stringify(position));
        console.log('Latitude: ' + position.coords.latitude + '\n' +
          'Longitude: ' + position.coords.longitude + '\n' +
          'Altitude: ' + position.coords.altitude + '\n' +
          'Accuracy: ' + position.coords.accuracy + '\n' +
          'Altitude Accuracy: ' + position.coords.altitudeAccuracy + '\n' +
          'Heading: ' + position.coords.heading + '\n' +
          'Speed: ' + position.coords.speed + '\n' +
          'Timestamp: ' + position.timestamp + '\n');
        // $scope.myImgUrl = thisResult.filename;
        // console.log("result.filename------" + thisResult.filename);
        $scope.Latitude = position.coords.latitude;
        $scope.Longitude = position.coords.longitude;


      };
      var fail = function (err) {
        alert('code: ' + error.code + '\n' +
          'message: ' + error.message + '\n');
      }

      navigator.geolocation.getCurrentPosition(geoSuccess, fail);


      $cordovaGeolocation.getCurrentPosition(options).then(function (position) {
        console.log(position.coords.latitude);
        console.log(position.coords.longitude);
        $scope.lat = position.coords.latitude;
        $scope.long = position.coords.longitude;
        console.log("lat= near by js", $scope.lat);
        console.log("log= near by js", $scope.long);
        

        //for testing
        // $scope.lat = 30.3255646;
        // $scope.long = 78.0436813;
        // console.log("lat= near by js", $scope.lat);
        // console.log("log= near by js", $scope.long);
        
        $scope.nearbyLocation()

      })

      $scope.getABDMapOptions();
      // var map = L.map('map').setView([30.32, 78.05], 13,{

      //  });

      //debugger;
      //   console.log("this method is callings")
      //  $scope.markers = new Array();
      //   RestService.GetPlaceFromLayer().then(function (nearByResponse) {
      //     console.log("near by length" + nearByResponse.length)
      //     console.log("near by " + JSON.stringify(nearByResponse))
      //     if (nearByResponse.length > 0) {

      //       for (var i = 0; i < nearByResponse.length; i++) {
      //         $sessionStorage.nearByResponse = nearByResponse
      //         $scope.markers.push({
      //           lat: nearByResponse[i].latitude + "" + nearByResponse[i].longitude,
      //          // lng: nearByResponse[i].longitude,
      //           address: nearByResponse[i].address
      //         })

      //       }
      //      $sessionStorage.markerarr =  $scope.markers
      //      // markerfun($scope.markers);
      //       //initialize($scope.markers);
      //       $ionicLoading.hide();
      //     } else {
      //       toaster.error($filter('translate')('No Such Record Found'));
      //       $ionicLoading.hide();
      //     }
      //   }, function (err) {
      //     //      toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR_OCCURED'));
      //     $ionicLoading.hide();
      //   })


      // var map = L.map('map').fitWorld();

      // L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
      //     attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      //     maxZoom: 18,
      //     tileSize: 512,
      //     zoomOffset: -1
      // }).addTo(map);

      //$ionicLoading.show({ template: $filter('translate')('LOADING') });
      /*------getting current location------*/
      // navigator.geolocation.getCurrentPosition(success, fail);
      // function success(position) {
      //   $ionicLoading.show({ template: $filter('translate')('LOADING') });
      //   $scope.latitude = 19.060692;
      //   $scope.longitude = 72.836250;
      //   console.log("latitude---" + $scope.latitude + "longitude--" + $scope.longitude);
      //   $ionicLoading.hide();
      // }
      // function fail() {
      //   console.log('navigator.geolocation failed, may not be supported');
      // }
      // $scope.latitude = 19.060692;
      // $scope.longitude = 72.836250;
      // RestService.getNHPrefixData("LCT", $scope.orgid).then(function (response) {
      //   if (response.length > 0) {
      //     $scope.locationGroup = new Array();
      //     for (var i = 0; i < response.length; i++) {
      //       $scope.locationGroup.push({
      //         id: response[i].lookUpId,
      //         name: response[i].descLangFirst
      //       })
      //     }
      //     $ionicLoading.hide();
      //   } else {
      //     return false;
      //     $ionicLoading.hide();
      //   }
      // }, function (err) {
      //   toaster.error($filter('translate')('BUSROUTEERROR')/* , $filter('translate')('ERROR_OCCURED') */);
      //   $ionicLoading.hide();
      // })




    };
    _init();

    /*-------------------------------NEARBY WITH RADIUS FUNCTION--------------------------------------*/

    //   var im = 'http://www.robotwoods.com/dev/misc/bluecircle.png';
    //   $scope.locate = function () {
    //     navigator.geolocation.getCurrentPosition(initialize, fail);
    //   }

    //   var map = null;
    //   var radius_circle = null;
    //   var markers_on_map = [];

    //   function initialize(all_locations) {
    //     $ionicLoading.show({ template: $filter('translate')('LOADING') });
    //     console.log("initailize--latitude---" + $scope.latitude + "longitude--" + $scope.longitude);
    //     console.log("all_locations--" + JSON.stringify(all_locations));

    //     var myLatLng = new google.maps.LatLng(all_locations[0].lat, all_locations[0].lng);
    //     var mapOptions = {
    //       zoom: 12,
    //       center: myLatLng,
    //       mapTypeId: google.maps.MapTypeId.ROADMAP
    //     }
    //     var map = new google.maps.Map(document.getElementById('map'), mapOptions);
    //     var userMarker = new google.maps.Marker({
    //       position: myLatLng,
    //       map: map,
    //       icon: im
    //     });


    //     /*     if (radius_circle) {
    //             radius_circle.setMap(null);
    //             radius_circle = null;
    //           }*/
    //     for (i = 0; i < markers_on_map.length; i++) {
    //       if (markers_on_map[i]) {
    //         markers_on_map[i].setMap(null);
    //         markers_on_map[i] = null;
    //       }
    //     }
    //     console.log("$scope.raduis----" + $scope.raduis)
    //     var circle = {
    //       strokeColor: "#48c3fc",
    //       strokeOpacity: 0.8,
    //       strokeWeight: 1,
    //       fillColor: "#48c3fc",
    //       fillOpacity: 0.35,
    //       map: map,
    //       center: myLatLng,
    //       radius: $scope.raduis * 1000 // in meters
    //     };
    //     cityCircle = new google.maps.Circle(circle);
    //     cityCircle.bindTo('center', userMarker, 'position');
    //     var infoWindow = new google.maps.InfoWindow();
    //     //if(radius_circle) map.fitBounds(radius_circle.getBounds());

    //     for (var j = 0; j < all_locations.length; j++) {
    //       (function (location) {
    //         var marker_lat_lng = new google.maps.LatLng(location.lat, location.lng);
    //         var distance_from_location = google.maps.geometry.spherical.computeDistanceBetween(myLatLng, marker_lat_lng); //distance in meters between your location and the marker
    //         console.log("distance_from_location--" + distance_from_location);
    //         if (distance_from_location <= $scope.raduis * 1000) {
    //           var new_marker = new google.maps.Marker({
    //             position: marker_lat_lng,
    //             map: map,
    //             title: location.name
    //           });
    //           google.maps.event.addListener(new_marker, 'click', function () {
    //             infoWindow.setContent('<div style=" width:200px;height:100px;"><strong>' + location.address + '</strong></div>');
    //             infoWindow.open(map, new_marker);
    //             //          console.log(location.name + " is " + distance_from_location + " meters from my location");
    //           });
    //           markers_on_map.push(new_marker);
    //         }
    //       })(all_locations[j]);
    //       $ionicLoading.hide();
    //     }
    //     //$ionicLoading.hide();
    //   }

    //   function fail() {
    //     console.log('navigator.geolocation failed, may not be supported');
    //   }
  });
