angular.module('starter')
  .controller('AtoBMapCtrl', function ($scope, RestService, $ionicLoading, $stateParams, toaster, $filter, ENV, $ionicHistory,
    $state, $localStorage, $sessionStorage, $ionicPlatform, $ionicModal, $ionicPopup,$rootScope) {

      var options = { timeout: 10000, enableHighAccuracy: true };
      $scope.heading = $filter('translate')('EBUSATOB');
      $scope.sourceStop = $sessionStorage.sourceStop;
      $scope.destinationStop = $sessionStorage.destinationStop;
      $scope.wayPointList = $sessionStorage.wayPointParams || $sessionStorage.wayPointParamsData;
      console.log("wayPointList", $scope.wayPointList, $sessionStorage.wayPointParams);
      $scope.selectedBusNo = $sessionStorage.wayPointParamsData.fleetNo;
      $scope.selectedViaRoute = $sessionStorage.selectedViaRoute;
      $scope.selectedBusTime = $sessionStorage.selectedBusTime;
      $scope.currentLat = $sessionStorage.busStopLatLong.lat;
      $scope.currentLong = $sessionStorage.busStopLatLonglong;
    //   $scope.currentLat = $sessionStorage.lat;
    //   $scope.currentLong = $sessionStorage.long;

      console.log("wayPtDetails", $scope.wayPtDetails);
      
      $scope.busLat = $sessionStorage.busLat;
      $scope.busLong = $sessionStorage.busLong;
      console.log("trip Planner", $scope.wayPointList, $sessionStorage.sourceStop);
      $scope.wayPtRouteId=$scope.wayPointList.routeId;
      console.log(" $scope.wayPtRouteId....", $scope.wayPtRouteId)
// Map code commented
    console.log("In open map", $scope.lat,$scope.long );
  
// $scope.$on( "$ionicView.enter", function( scopes, states ) {
    // google.maps.event.trigger( map, 'resize' );
 
          $scope.isRefreshing = false;
// $scope.callMap = function() {
//        if (L.DomUtil.get('map') !== null) {
//         var mapContainer = L.DomUtil.get('map');
//         if (mapContainer._leaflet_id) {
//             mapContainer._leaflet_id = null;
//         }
//     }
//     console.log("$scope.currentWaypointResp",JSON.stringify($scope.currentWaypointResp))
//     console.log("$scope.$sessionStorage.wayPtDetails",JSON.stringify($sessionStorage.wayPtDetails))
//     $scope.wayPtDetails = $scope.currentWaypointResp?$scope.currentWaypointResp:$sessionStorage.wayPtDetails;
//     $scope.container = new L.DomUtil.get('map');
//     let mapOptions = {
//         center: [$scope.busLat, $scope.busLong],
//         zoom: 13
//     };
//     let map = new L.map('map', mapOptions);
//     let layer = new L.TileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png');
//     map.addLayer(layer);

//     // Icons for different markers
//     var busStopIcon = L.icon({
//         iconUrl: 'img/mapIcon/bus-stop.png',
//         iconSize: [30, 30]
//     });
//     var busIcon = L.icon({
//         iconUrl: 'img/mapIcon/bus.png',
//         iconSize: [35, 35]
//     });
//     var myLocationIcon = L.icon({
//         iconUrl: 'img/myLocation.png',
//         iconSize: [30, 30]
//     });

//     // For Bus Stops
//     for (var i = 0; i < $scope.wayPtDetails.length; i++) {
//         $scope.showOnMarker = 'Bus Stop: ' + $scope.wayPtDetails[i].PoiName + '<br>Estimated Time: ' + $scope.wayPtDetails[i].EstimatedTime;
//         $scope.otherMarkers = L.marker([$scope.wayPtDetails[i].Lat, $scope.wayPtDetails[i].Long], {icon: busStopIcon}).bindPopup($scope.showOnMarker).openPopup().addTo(map);
//     }

//     // For Bus
//     let busMarker = L.marker([$scope.busLat, $scope.busLong], {icon: busIcon}).bindPopup($scope.selectedBusNo).openPopup().addTo(map);

//     // Add user's current location from session (passed lat/long)
//     if ($scope.currentLat && $scope.currentLong) {
//         let userMarker = L.marker([$scope.currentLat, $scope.currentLong], {icon: myLocationIcon})
//             .bindPopup("Your Current Location")
//             .openPopup()
//             .addTo(map);

//         // Optionally, you can center the map on the user's location if needed
//         map.setView([$scope.currentLat, $scope.currentLong], 14);
//     } else {
//         console.error("User location not found in session!");
//     }

//     // Invalidate map size to handle any resizing issues
//     map.invalidateSize();
// };
$scope.callMap = function () {
    if (L.DomUtil.get('map') !== null) {
        var mapContainer = L.DomUtil.get('map');
        if (mapContainer._leaflet_id) {
            mapContainer._leaflet_id = null;
        }
    }

    console.log("Raw waypoint data", JSON.stringify($scope.currentWaypointResp));

    // Get data from fresh API response
    const waypointData = $scope.currentWaypointResp?.wayPointDetails || [];

    // Normalize waypoint stop data
    $scope.wayPtDetails = waypointData.map(stop => {
        return {
            Lat: stop.Lat || stop.Latitude,
            Long: stop.Long || stop.Longitude,
            EstimatedTime: stop.EstimatedTime || stop.EtaTime || "--",
            PoiName: stop.PoiName || "Unknown Stop"
        };
    });

    // Set current bus position from latest API (use 1st stop, or fallback)
    const busLat = waypointData[0]?.currLat || 0;
    const busLong = waypointData[0]?.currLon || 0;

    let mapOptions = {
        center: [busLat, busLong],
        zoom: 13
    };
    let map = new L.map('map', mapOptions);
    let layer = new L.TileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png');
    map.addLayer(layer);

    // Icons
    var busStopIcon = L.icon({
        iconUrl: 'img/mapIcon/bus-stop.png',
        iconSize: [30, 30]
    });
    var busIcon = L.icon({
        iconUrl: 'img/mapIcon/bus.png',
        iconSize: [35, 35]
    });
    var myLocationIcon = L.icon({
        iconUrl: 'img/myLocation.png',
        iconSize: [30, 30]
    });

    // Add Bus Stop Markers
    $scope.wayPtDetails.forEach(stop => {
        const popup = `Bus Stop: ${stop.PoiName}<br>Estimated Time: ${stop.EstimatedTime}`;
        L.marker([stop.Lat, stop.Long], { icon: busStopIcon })
            .bindPopup(popup)
            .addTo(map);
    });

    // Add LIVE Bus Marker using currLat / currLon
    L.marker([busLat, busLong], { icon: busIcon })
        .bindPopup($scope.selectedBusNo)
        .addTo(map);

    // Add User Location Marker
    if ($scope.currentLat && $scope.currentLong) {
        L.marker([$scope.currentLat, $scope.currentLong], { icon: myLocationIcon })
            .bindPopup("Your Current Location")
            .addTo(map);

        map.setView([$scope.currentLat, $scope.currentLong], 14);
    } else {
        console.warn("User location not found in session!");
    }

    map.invalidateSize();
};

$scope.getCurrentStatus = function() {
    $scope.isRefreshing = true;
    $ionicLoading.show()
    var params = {
        routeId: $sessionStorage.wayPointParamsData.routeId,
        fleetId: $sessionStorage.wayPointParamsData.fleetId,
    };
    console.log("params", params);

    let token = $rootScope.swmAccessTokenData || $sessionStorage.swmAccessToken ;

    RestService.wayPointsDetails(params, token).then(function(waypointResp) {
        console.log("waypointResp", waypointResp.data);
        $scope.currentWaypointResp= waypointResp.data;
        console.log("waypointResp scope", $scope.currentWaypointResp);
        $ionicLoading.hide()
        $scope.isRefreshing = false;
        $scope.callMap();
        $scope.isRefreshing = false;
    }).catch(function(err) {
            $ionicLoading.show()
        console.error("Error caught:", err);
        if (err.status === 401) {
             $scope.AccessToken('arrivingbus');
        }
    })
};
 $scope.AccessToken = function(type){
        console.log('$rootScope.swmAccessTokenData' + $rootScope.swmAccessTokenData, type)
          $ionicLoading.show()
          RestService.getAccessToken().then(function (data) {
            $rootScope.swmAccessTokenData = data.access_token;
            console.log($rootScope.swmAccessTokenData,"rrot scope toke")
            console.log(data.access_token,"data toke")

            if(type == 'arrivingbus'){
              console.log("Entered waypt");
                $ionicLoading.show()
              $scope.getCurrentStatus();
            }
          },
            function (err) {    
                $ionicLoading.hide()
              toaster.error($filter('translate')('ACCESSTOKENFAILED'));
            })
        }


   
//     $scope.callMap = function() {
            
//         $scope.container = new L.DomUtil.get('map');

//         let mapOptions = {
//             center:[$scope.busLat, $scope.busLong],
//             zoom:13
//         }
// //    let map = new L.map('map' , mapOptions).setView([$scope.lat, $scope.long], 13);
//         let map = new L.map('map' , mapOptions);
//         let layer = new L.TileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png');
//         map.addLayer(layer);
    
//         /* let customIcon = {
//             iconUrl:"https://image.flaticon.com/icons/png/512/1397/1397898.png",
//             iconSize:[40,40]
//         } */
//         //$scope.currentMarker = L.marker([$scope.lat, $scope.long]).addTo($scope.map).bindPopup('Complaint Location').openPopup();
//   //  let myIcon = L.icon(customIcon);
//   /*    var tiles = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
//                 layers: 'boundary_ward,boundary_zone',
//                 maxZoom: 18,
//                 attribution: 'Map data &copy; <a href="https://dsclgis.uk.gov.in:8443/cgi-bin/IGiS_Ent_service.exe?IEG_PROJECT=dehradun_ws">OpenStreetMap</a> contributors, ' +
//                     'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
//                 id: 'mapbox/streets-v11',
//                 tileSize: 512,
//                 zoomOffset: -1
//             }).addTo($scope.map); */   //
//            /*  L.esri.Vector.vectorTileLayer(
//                 "https://basemaps.arcgis.com/arcgis/rest/services/World_Basemap_v2/VectorTileServer"
//             ).addTo($scope.map); */
   
//         var busStopIcon = L.icon({
//           iconUrl: 'img/mapIcon/bus-stop.png',
//           iconSize: [30, 30]
//         });
//         var busIcon = L.icon({
//           iconUrl: 'img/mapIcon/bus.png',
//           iconSize: [35, 35]
//         });
//         var myLocationIcon = L.icon({
//           iconUrl: 'img/mapIcon/my-location.png',
//           iconSize: [30, 30]
//         });

//         // For Bus Stops
//         for (var i = 0; i < $scope.wayPtDetails.length; i++) {
//           $scope.showOnMarker = 'Bus Stop: ' + $scope.wayPtDetails[i].PoiName + '<br>Estimated Time: ' + $scope.wayPtDetails[i].EstimatedTime ;
//           $scope.otherMarkers = L.marker([$scope.wayPtDetails[i].Lat, $scope.wayPtDetails[i].Long],{icon: busStopIcon}).bindPopup($scope.showOnMarker).openPopup().addTo(map);/*  + "\n" + $scope.wayPtDetails[i].ScheduledTime */
//         }
   
//         // For Bus
//         // For Bus
//         let marker = L.marker([$scope.busLat, $scope.busLong],{icon: busIcon}).bindPopup($scope.selectedBusNo).openPopup().addTo(map);
//   /*       let marker = new L.Marker([$scope.busLat, $scope.busLong] , busIcon);
//         marker.addTo(map);
//         marker.bindPopup($scope.selectedBusNo).openPopup(); */
   
//         //let popup = L.popup().setLatLng([$scope.lat, $scope.long] ).setContent("<p>Complaint Location").openOn(map);
//         map.invalidateSize();
//     }

// $scope.callMap();

// $ionicPlatform.ready(function () {
//     $scope.callMap();
//   });

// setTimeout($scope.callMap(),8000);
// });
var deregisterSecond = $ionicPlatform.registerBackButtonAction(
      function () {
        $sessionStorage.eBusFeedback=null
      $state.go('app.arrivingbus')
      }, 100
    );


    var _init = function () {      
        console.log("init map"); 
        $scope.getCurrentStatus()
        /* $scope.lat = $sessionStorage.lat
        $scope.long = $sessionStorage.long

        // document.getElementById("myMap").click = function () {  $scope.callMap()}
        nativegeocoder.reverseGeocode(success, failure, $scope.lat, $scope.long, { useLocale: true, maxResults: 1 });
        function success(result) {
            console.log("result",result)
            var firstResult = result[0];
            if(firstResult.thoroughfare != ""){
                $scope.NewCompMapLocation = firstResult.thoroughfare + ', ' + firstResult.subLocality + ', ' + firstResult.locality;
            }
            else{
                $scope.NewCompMapLocation = firstResult.subLocality + ', ' + firstResult.administrativeArea + ', ' + firstResult.locality;
            }
            console.log("$scope.NewCompMapLocation",$scope.NewCompMapLocation)
            if($scope.NewCompMapLocation){
                $scope.popupMsg = $scope.NewCompMapLocation;
            } else {
                $scope.popupMsg = "Lat: " + $scope.lat + " Long: " +$scope.long;
            }
            console.log("showMsg",$scope.popupMsg); */
            var confirmPopup = $ionicPopup.show({
                title : $filter('translate')('LIVEBUSTRACKING'),
                template : 'For Bus No. ' + $scope.selectedBusNo, 
                buttons : [{
                    text : $filter('translate')('OK'),
                    type : 'button button-block  customBgColor',
                    onTap : function(){
                        $scope.callMap()
                    }
                }]
            });
            $scope.$apply()
        }
        /* function failure(err) {
            console.log("reverseGeocode",err);
        }

    }; */
    
    _init();

});


//Old Code
 /* $scope.WayPoint = function(token){
        console.log("Came Back again");
        if($localStorage.langID == "2"){
          $ionicLoading.show({ template: 'लोड हो रहा है...'    });                              
      } else {
          $ionicLoading.show({ template: 'Loading...'    });
      }
      RestService.wayPointsDetails($scope.wayPointList,token).then(function (resp) {
          console.log(resp, resp.data.status);
          if (resp == undefined || resp == null || resp == "") {
              toaster.error($filter('translate')('BUSROUTEERROR'));
              $ionicLoading.hide();
          } else {
              if(resp.data.status == false){
                  toaster.error(resp.data.message);
                  $ionicLoading.hide();
              } else if(resp.data.status == true){
                  $scope.showMapBox = true;
                  console.log("showMapBox",$scope.showMapBox);
  
                  var respWayPtDetails = resp.data.wayPointDetails;
                  var respLength = resp.data.wayPointDetails.length;
  
                  $scope.busLat = respWayPtDetails[0].currLat;
                  $scope.busLong = respWayPtDetails[0].currLon;
                  $scope.firstStop = respWayPtDetails[0].firstStop;
                  $scope.lastStop = respWayPtDetails[0].lastStop;
                  console.log("Bus Details", $scope.busLat, $scope.busLong);
  
                  $scope.wayPtDetails = [];
  
                  for(i=0;i<respLength;i++){
                      $scope.wayPtDetails.push({
                          OrderNo:respWayPtDetails[i].OrderNo,
                          Lat:respWayPtDetails[i].Latitude,
                          Long:respWayPtDetails[i].Longitude,
                          PoiName:respWayPtDetails[i].PoiName,
                          ScheduledTime:respWayPtDetails[i].ScheduledArrivalTime,
                          EstimatedTime:respWayPtDetails[i].EtaTime,
                          FleetNo:respWayPtDetails[i].FleetNo,
                      })
                  }
                  console.log("Way Point Map Details",$scope.wayPtDetails);
  
                  // $state.go("app.atobmap");
  
                  $scope.AtoBMapBox();
              }
          }          
          $ionicLoading.hide();
      },
          function (err) {
            console.log("Error in Bus Route",err)
            if (err.status == 401){
              $scope.AccessToken('wayPt');
              console.log("if got true in err");
            } 
              $ionicLoading.hide();
              //toaster.error($filter('translate')('BUSROUTEERROR'));
              toaster.error($filter('translate')('EBUSTHIRDPARTYERROR'));
          })
      } */

      /* $scope.showTimeTable = function(){
        //console.log("showBusDetail",value)
        $scope.showBusTimetable = true;
        $sessionStorage.fromAtoB = true;
        $sessionStorage.routeIdOfAtoB = $scope.wayPtRouteId;
        $sessionStorage.selectedTimeofAtoB = $scope.selectedBusTime;
        console.log("showBusDetail",$sessionStorage.showBusTimetable, $sessionStorage.selectedTimeofAtoB)
        $state.go("app.routetimetable");

    },
 */
