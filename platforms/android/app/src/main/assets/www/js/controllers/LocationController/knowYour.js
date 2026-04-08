angular.module('starter')
  .controller('knowYourCTRL', function ($scope, RestService, $ionicLoading, $stateParams, toaster, $filter, ENV,$ionicHistory,
      $state,$localStorage,$sessionStorage,$cordovaGeolocation,$ionicModal,$ionicPopup) {
$scope.data = {};
$scope.orgid = $localStorage.selectedorgID;
$scope.electoralWard = false;
$scope.revenueWard = false;
$scope.operationWard = false;
var options = { timeout: 10000, enableHighAccuracy: true };
$scope.knowYourChange = function(knowYour){
$ionicLoading.show({  template: 'Loading...'  });
console.log(knowYour,"now yor value....")
var location = ""
 $sessionStorage.knowYour = knowYour
  RestService.allLocationbyOrgID($scope.orgid).then(function (response) {
  for(var i = 0 ; i<response.length ; i++){
    if(response[i].locId == knowYour)
      location = response[i].locNameEng
      $sessionStorage.location = response[i].locNameEng
      console.log(location,"my location")
      console.log($sessionStorage.location,"if location ")
     
   
  }
},function (err) {
  toaster.error($filter('translate')('ERROR'), $filter('translate')('No Such Location Found..'));
  $ionicLoading.hide();
})

// RestService.getLocationWardZoneData($sessionStorage.location).then(function (knowYourResponse) {
//   console.log($sessionStorage.location,"if location***** ")  
//   if(knowYour == sessionStorage.location){
//     console.log("my condition",$sessionStorage.location)
//     console.log("electroal--"+JSON.stringify(knowYourResponse));

//     $scope.electroalDetailsList = [];
//     for(var i=0;i<knowYourResponse.length;i++){
//       console.log(knowYourResponse[i].name,"1")
//       $scope.electroalDetailsList.push({
//         ward_name : knowYourResponse[i].ward_name,
//         zone_name : knowYourResponse[i].zone_name,
//         zone_no: knowYourResponse[i].zone_no,
//         ward_no: knowYourResponse[i].ward_no,
//         latitude: knowYourResponse[i].latitude,
//         longitude: knowYourResponse[i].longitude,
//         name: knowYourResponse[i].name,
//         address: knowYourResponse[i].address,
//       })
//       console.log(knowYourResponse[i].name,"2")
//     }
//    // console.log(knowYourResponse[i].name,"3")
//       $scope.electoralWard = true;
//       $ionicLoading.hide();
// //   }

//  }
//     else{
//       $ionicLoading.hide();
//     alert("Record Not Found")
//     $scope.electroalDetailsList = null
//     }
       
 

// },function (err) {
// toaster.error($filter('translate')('ERROR'), $filter('translate')('This service is not Available'));
// $ionicLoading.hide();
// })


}
$scope.knowYourWard = function () {
  var container = L.DomUtil.get('map');

  if (container != null) {

    container._leaflet_id = null;

  }
     var map = new L.Map('map');
    map.invalidateSize();
  //var map = L.map('map').setView([$scope.lat, $scope.long], 13, {

 // });
    map.setView(new L.LatLng($scope.lat, $scope.long), 13);
  var tiles = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
    layers: 'boundary_ward,boundary_zone',
    maxZoom: 18,
    attribution: 'Map data &copy; <a href="https://dsclgis.uk.gov.in:8443/cgi-bin/IGiS_Ent_service.exe?IEG_PROJECT=dehradun_ws">OpenStreetMap</a> contributors, ' +
      'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1
  }).addTo(map);

  var circle = L.circle([$scope.lat, $scope.long], {
    color: 'red',
    fillColor: '#f03',
    fillOpacity: 0.5,
    radius: 100,
  }).addTo(map);

  //defect #156237
  var marker;
  var wardIcon = L.icon({
        iconUrl: 'img/wardIcon.png',
        iconSize: [30, 30]
    });

  marker = L.marker([$scope.lat, $scope.long]).addTo(map).bindPopup('My Location').openPopup();

  $ionicLoading.show({  template: 'Loading...'  });
  RestService.getYourWardZoneByLoc($scope.lat,$scope.long).then(function (geocodeResponse) {
    console.log("know your ward zone geocodeResponse -->" + JSON.stringify(geocodeResponse));
    if (geocodeResponse.length > 0) {

      var markers = {};
      for (var i = 0; i < geocodeResponse.length; i++) {
       //if (e.latlng) {
        //   console.log("condition call...")
        // var marker = L.marker([$scope.lat, $scope.long]).addTo(map)
       
        // circle.bindPopup(geocodeResponse[i].ward_name + "" + geocodeResponse[i].zone_name + "" +
        // geocodeResponse[i].zone_no + "" + geocodeResponse[i].ward_no + "" + geocodeResponse[i].latitude
        // + "" + geocodeResponse[i].longitude);
        //   console.log(geocodeResponse[i].name, "00000000")
          console.log('Wardname = '+geocodeResponse[i].ward_name);
          markers = L.marker([geocodeResponse[i].longitude, geocodeResponse[i].latitude],{icon: wardIcon}).bindPopup(geocodeResponse[i].ward_name).openPopup().addTo(map);
          //marker.bindPopup(geocodeResponse[i].ward_name).openPopup();

      //} else {
          //circle.bindPopup(e.latlng.lat,e.latlng.lng);

        //}
      }
      $ionicLoading.hide();
    } else {
      toaster.error($filter('translate')('NOWARDZONEFOUND'));
      $ionicLoading.hide();
     
    }
  }, function (err) {
    //      toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR_OCCURED'));
    toaster.error($filter('translate')('KNOWYOURWZERROR')/* , $filter('translate')('') */);
    $ionicLoading.hide();
  });


  map.on('click', function (e) {
    // Place marker
console.log(e,"on map click e...")
console.log(e.latlng,"lat long")
//alert("Lat, Lon : " + e.latlng.lat + ", " + e.latlng.lng)
console.log(e.latlng.lat,e.latlng.lng,"888888");


    // Ajax query to save the values:

    //$scope.markers = new Array();
    // RestService.getLocationWardZoneData($sessionStorage.location).then(function (geocodeResponse) {
    //   console.log("near by length" + geocodeResponse.length)
    //   console.log("near by " + JSON.stringify(geocodeResponse))
    //   if (geocodeResponse.length > 0) {

    //     for (var i = 0; i < geocodeResponse.length; i++) {
    //       console.log(geocodeResponse[i].name, "hghjghjgh")
    //      if (e.latlng) {
    //         console.log("condition call...")
    //       var marker = L.marker([$scope.lat, $scope.long]).addTo(map)
         
    //       circle.bindPopup(geocodeResponse[i].ward_name + "" + geocodeResponse[i].zone_name + "" +
    //       geocodeResponse[i].zone_no + "" + geocodeResponse[i].ward_no + "" + geocodeResponse[i].latitude
    //       + "" + geocodeResponse[i].longitude);
    //         console.log(geocodeResponse[i].name, "00000000")
           
    //     } else {
    //         //circle.bindPopup(e.latlng.lat,e.latlng.lng);

    //       }
    //     }
    //     $ionicLoading.hide();
    //   } else {
    //     toaster.error($filter('translate')('No Such Record Found'));
    //     $ionicLoading.hide();
       
    //   }
    // }, function (err) {
    //   //      toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR_OCCURED'));
    //   $ionicLoading.hide();
    // })



  });


  map.on('click', onMapClick);

}

function onMapClick(e) {
  // alert(e.latlng.lat,e.latlng.lng)  
 


 }
var _init = function (){


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
    alert('code: ' + err.code + '\n' +
      'message: ' + err.message + '\n');
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
    $scope.knowYourWard()

  })
//  $scope.knowYourChange = function(knowYour){
    //$ionicLoading.show({  template: 'Loading...'  });
   
    // $scope.$watch('knowYour', function() {
   
        //   RestService.getLocationWardZoneData().then(function (knowYourResponse) {
   
               
        //           console.log("electroal--"+JSON.stringify(knowYourResponse));
               
        //             $scope.electroalDetailsList = [];
        //             for(var i=0;i<knowYourResponse.length;i++){
        //               console.log(knowYourResponse[i].name,"1")
        //               $scope.electroalDetailsList.push({
        //                 ward_name : knowYourResponse[i].ward_name,
        //                 zone_name : knowYourResponse[i].zone_name,
        //                 zone_no: knowYourResponse[i].zone_no,
        //                 ward_no: knowYourResponse[i].ward_no,
        //                 latitude: knowYourResponse[i].latitude,
        //                 longitude: knowYourResponse[i].longitude,
        //                 name: knowYourResponse[i].name,
        //                 address: knowYourResponse[i].address,
        //               })
        //               console.log(knowYourResponse[i].name,"2")
        //             }
        //            // console.log(knowYourResponse[i].name,"3")
        //               $scope.electoralWard = true;
        //               $ionicLoading.hide();
        //        //   }
   
               
   
                 
   
        //           $ionicLoading.hide();
   
        //   },function (err) {
        //     toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR_OCCURED'));
        //     $ionicLoading.hide();
        // })
     // });
   // }
  // $ionicLoading.show({  template: 'Loading...'  });
  //     RestService.allLocationbyOrgID($scope.orgid).then(function (response) {
  //         if(response.length > 0){
  //             $scope.allLocationOptions = new Array();
  //               for(var i=0;i<response.length;i++){
  //                 $scope.allLocationOptions.push({
  //                 id : response[i].locId,
  //                 name : response[i].locNameEng
  //               })
  //             }
  //               $ionicLoading.hide();
  //         }else{
  //                return false;
  //                $ionicLoading.hide();
  //         }
  //     },function (err) {
  //       toaster.error($filter('translate')('ERROR'), $filter('translate')('No Such Location Found..'));
  //       $ionicLoading.hide();
  //   })
 };
   _init();

 });
