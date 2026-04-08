angular.module('starter')
    .controller('ItsHomeCTRL', function ($scope, RestService, $ionicLoading, $stateParams, toaster, $filter, ENV, $ionicHistory,
        $state, $localStorage, $sessionStorage, $ionicModal, $ionicPopup, $timeout, $ionicScrollDelegate, $ionicPlatform, $cordovaGeolocation,$rootScope) {
            
        var options = { timeout: 10000, enableHighAccuracy: true };
        $scope.orderByDate = 'DueDate';
        $scope.reverseOrder = false;
        var dtFormat1 = 'YYYY-MM-DD HH:mm:ss',
            dtFormat2 = 'MMM DD, YYYY',
            dtFormat3 = 'YYYY-MM-DD',
            dtFormat4 = 'MMM DD, YYYY HH:mm',
            syncing = true,
            syncEvent;
        $scope.search = {};
        $scope.isCompleted = false;
        $scope.navTitle = "Service Orders";
        $scope.JobTypeNameForFilter = [];                           
        $scope.CustomerNames = [];
        $scope.unsynced = [];
        $scope.raduis = "2000";
        $scope.showTimings = false;
        $scope.showSource = true;
        $scope.showDestination = false;
        $scope.tripDetails = false;
        $scope.showRed = false;
        $scope.showMapBox = false;
        $scope.showBusDetail = false;
        $scope.showBusTimetable = false;
        $scope.showLiveBtn = false;
        $sessionStorage.fromByRoute = false;

        // $scope.lat =    30.288949032819474 
        // $scope.long = 77.99713219099934
          $scope.lat = $sessionStorage.lat 
        $scope.long = $sessionStorage.long

         $scope.myGoBack=function(){
            $state.go('app.subHome')
        }
            var deregisterSecond = $ionicPlatform.registerBackButtonAction(
  		      function() {
                $state.go('app.subHome')
  		      }, 100
  		    );
        console.log("Lat Long in EBus", $scope.lat, $scope.long);
        
        $scope.hour = new Date().getHours();
        $scope.min = new Date().getMinutes();
        $scope.currentTime = $scope.hour + ":" +  $scope.min
        console.log($scope.currentTime)

// By Stop Map
        var im = 'http://www.robotwoods.com/dev/misc/bluecircle.png';
        var map = null;
        var radius_circle = null;
        var markers_on_map = [];
        // $scope.respcompainList = $scope.data.distinctStopList;
        function initialize(all_locations) {
            var myLatLng = new google.maps.LatLng(30.316496, 78.032188);
            var mapOptions = {
                zoom: 15,
                center: myLatLng,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            }
            var map = new google.maps.Map(document.getElementById('map'), mapOptions);
            var userMarker = new google.maps.Marker({
                position: myLatLng,
                map: map,
                icon: im
            });


            /*     if (radius_circle) {
                    radius_circle.setMap(null);
                    radius_circle = null;
                  }*/
            for (i = 0; i < markers_on_map.length; i++) {
                if (markers_on_map[i]) {
                    markers_on_map[i].setMap(null);
                    markers_on_map[i] = null;
                }
            }
            var circle = {
                strokeColor: "#48c3fc",
                strokeOpacity: 0.8,
                strokeWeight: 1,
                fillColor: "#48c3fc",
                fillOpacity: 0.35,
                map: map,
                center: myLatLng,
                radius: $scope.raduis * 1000 // in meters
            };
            cityCircle = new google.maps.Circle(circle);
            cityCircle.bindTo('center', userMarker, 'position');
            var infoWindow = new google.maps.InfoWindow();
            //if(radius_circle) map.fitBounds(radius_circle.getBounds());

            for (var j = 0; j < all_locations.length; j++) {
                (function (location) {
                    var marker_lat_lng = new google.maps.LatLng(location.Latitude, location.Longitude);
                    var distance_from_location = google.maps.geometry.spherical.computeDistanceBetween(myLatLng, marker_lat_lng); //distance in meters between your location and the marker
                    if (distance_from_location <= $scope.raduis * 1000) {
                        var new_marker = new google.maps.Marker({
                            position: marker_lat_lng,
                            map: map,
                            title: location.PoiName
                        });
                        google.maps.event.addListener(new_marker, 'click', function () {
                            infoWindow.setContent('<div style=" width:200px;height:100px;"><strong>' + location.PoiName + '</strong></div>');
                            infoWindow.open(map, new_marker);
                        });
                        markers_on_map.push(new_marker);
                    }
                })(all_locations[j]);
                $ionicLoading.hide();
            }
            //$ionicLoading.hide();
        }

        // By Stop :
        // 1(Distinct Stop) - 5(Near By Stops) - 9(Arriving Buses List) - 10(Enrouted Details)/7(Trip Planner Details) - 18(Get Fare Details)

        // By Route :
        // 2(Get Route) - 3(Route Type)(Exceptional) - 20(Time Table Details) - 10(Enrouted Details)/4(Route Details) - 18(Get Fare Details) - 8(Scheduled Trip Details) - 6(WayPointDetails)

        // Grievance :
        // 14(Get Incident Types) - 13(Get Incident Sub Types) - 11(Create Grievance)/15(Create SOS Alarm) - 12(Get Complaints) - 16(Get Complaint By Id) - 17(Get Grievance Lifecycle) - 19(Insert Citizen Feedback)

        // By AtoB Map Defect. #177499
        /* $scope.container = L.DomUtil.get('mapBox');
        $scope.AtoBMapBox = function () {

            $ionicLoading.hide();
            console.log($scope.lat, $scope.long, "Lat long map 3...")

            if ($scope.container != null) {
              $scope.container._leaflet_id = null;    
            }

            $scope.map = new L.Map('mapBox');
            $scope.map.invalidateSize();
    
            $scope.map.setView(new L.LatLng($scope.busLat, $scope.busLong), 13);
            /*    var tiles = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
                layers: 'boundary_ward,boundary_zone',
                maxZoom: 18,
                attribution: 'Map data &copy; <a href="https://dsclgis.uk.gov.in:8443/cgi-bin/IGiS_Ent_service.exe?IEG_PROJECT=dehradun_ws">OpenStreetMap</a> contributors, ' +
                    'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
                id: 'mapbox/streets-v11',
                tileSize: 512,
                zoomOffset: -1
            }).addTo($scope.map); *   //
            L.esri.Vector.vectorTileLayer(
                "https://basemaps.arcgis.com/arcgis/rest/services/World_Basemap_v2/VectorTileServer"
            ).addTo($scope.map);

            var busStopIcon = L.icon({
                iconUrl: 'img/mapIcon/bus-stop.png',
                iconSize: [30, 30]
            });
            var busIcon = L.icon({
                iconUrl: 'img/mapIcon/bus.png',
                iconSize: [35, 35]
            });

            // For Bus Stop
           
            for (var i = 0; i < $scope.wayPtDetails.length; i++) {
                $scope.showOnMarker = 'Bus Stop: ' + $scope.wayPtDetails[i].PoiName + '<br>Estimated Time: ' + $scope.wayPtDetails[i].EstimatedTime ;
                $scope.otherMarkers = L.marker([$scope.wayPtDetails[i].Lat, $scope.wayPtDetails[i].Long],{icon: busStopIcon}).bindPopup($scope.showOnMarker).openPopup().addTo($scope.map);/*  + "\n" + $scope.wayPtDetails[i].ScheduledTime *
            }
            // For Bus
            $scope.otherMarkers = L.marker([$scope.busLat, $scope.busLong],{icon: busIcon}).bindPopup($scope.selectedBusNo).openPopup().addTo($scope.map);
        } */


        
      $scope.AccessToken = function(type){
        console.log('$rootScope.swmAccessToken' + $rootScope.swmAccessToken, type)
      
          RestService.getAccessToken().then(function (data) {
            $rootScope.swmAccessTokenData = data.access_token;
            console.log($rootScope.swmAccessTokenData,"rrot scope toke")
            console.log(data.access_token,"data toke")

            if(type == 'getroutes'){
              $scope.callRoute($rootScope.swmAccessTokenData);

            } else if(type == 'callbybusstop'){
                $scope.callBusStop($rootScope.swmAccessTokenData);

            } else if(type == 'Tripplan'){
                $scope.tripplan($rootScope.swmAccessTokenData);

            } else if(type == 'enroute'){
                $scope.enroutedDetails($rootScope.swmAccessTokenData);
            
            } else if(type == 'nearby'){
                $scope.getNearByStops($rootScope.swmAccessTokenData);

            }
          },
            function (err) {
              toaster.error($filter('translate')('ACCESSTOKENFAILED'));
            })
      }
      $scope.getNearByStopsFun = function(){
      $scope.getNearByStops($rootScope.swmAccessTokenData)
      }

        $scope.enroutedDetails=function(token){
            var params = {
                "sourceId": 0,
                "destinationId": 0,
                "routeId": $sessionStorage.routeId
            }
            RestService.enroutedDetails(params,token).then(function (resp) {
                if (resp == undefined || resp == null || resp == "") {
                    toaster.error($filter('translate')('BUSROUTEERROR'));
                    $ionicLoading.hide();
                } else {
                    $scope.respcompainList = resp.data.enroutedDet;
                    if(resp.data.status == true){
                        $scope.showTimings = true;
                        //var arrivalTimeArray = resp.data.enroutedDet[0].arrivalTime;
                        var arrivalTimeArray = resp.data.enroutedDet[0].departureTime;
                        $scope.arrivalTimeArr = arrivalTimeArray.split(',');
                        console.log("Arrival Time", $scope.arrivalTimeArr, $scope.showTimings);

                    } else {
                        $scope.showTimings = false;
                        $sessionStorage.fromByRoute = true;
                        $sessionStorage.selectedTiming = '7:00';
                        $state.go("app.routetimetable");
                    }
                    $ionicLoading.hide();
                }
                $ionicLoading.hide();
            }, function (err) {
                    if (err.status == 401){
                        $scope.AccessToken('enroute');
                        console.log("if got true in err");
                      }else{
                         toaster.error($filter('translate')('EBUSTHIRDPARTYERROR'));
                        $ionicLoading.hide();
                      }
                     $ionicLoading.hide();
                    //toaster.error($filter('translate')('BUSROUTEERROR')/* , $filter('translate')('ERROR') */);
                   
                })
        }

        $scope.callRoute=function(token){

            RestService.getRoutes(token).then(function (resp) {
                if (resp == undefined || resp == null || resp == "") {
                    toaster.error($filter('translate')('BUSROUTEERROR')/* , $filter('translate')('COMPLERROR') */);
                    $ionicLoading.hide();
                } else {
                    $scope.resproutecompainList = resp.data.routeList;
                    /* for(i=0; i<=$scope.resproutecompainList.length; i++){
                        var routeListArr = $scope.resproutecompainList[i]; 
                        console.log("routeListArr", routeListArr);
                    } */
                    $ionicLoading.hide();
                }
                $ionicLoading.hide();
            },
                function (err) {
                    if (err.status == 401){
                        $scope.AccessToken('getroutes');
                        console.log("if got true in err");
                      }
                       else{
                         toaster.error($filter('translate')('EBUSTHIRDPARTYERROR'));
                        $ionicLoading.hide();
                      }
                    $ionicLoading.hide();
                })
        }
        $scope.allBusStopList=[]
        $scope.callBusStop= function(token){
            RestService.getDistinctStops(token).then(function (resp) {
                if (resp == undefined || resp == null || resp == "") {
                    toaster.error($filter('translate')('BUSROUTEERROR')/* , $filter('translate')('COMPLERROR') */);
                    $ionicLoading.hide();
                }
                else {
                    // $scope.respcompainList = resp.data.distinctStopList;
                    $scope.allBusStopList = resp.data.distinctStopList;
                    $ionicLoading.hide();
                }
                $ionicLoading.hide();
            },
                function (err) {
                    if (err.status == 401){
                        $scope.AccessToken('callbybusstop');
                        console.log("if got true in err");
                    }else{
                         toaster.error($filter('translate')('EBUSTHIRDPARTYERROR'));
                        $ionicLoading.hide();
                      }
                    // $ionicLoading.hide();
                    //toaster.error($filter('translate')('BUSROUTEERROR')/* , $filter('translate')('ERROR') */);
                    console.log("Error in Bus Route",err)
                    // toaster.error($filter('translate')('EBUSTHIRDPARTYERROR'));
                    $ionicLoading.hide();
                })
        }

        $scope.tripplan=function(token){
            
            var params = {
                "source" : $scope.sourceStop,
                "destination" : $scope.destinationStop, 
                "time" : $scope.currentTime
                //   "time":"11:00:00"           //For Testing
            }
            console.log("Params", params)

            RestService.tripPlannerDetails(params,token).then(function (resp) {
                console.log("Tripplanner Details ATOB ",resp, resp.data);
                //console.log("Tripplanner Details ATOB2 ",resp.data);
                 //console.log("Tripplanner Details ATOB3 ", JSON.stringify(resp.data));
                //  console.log("Tripplanner Details ATOB6 ", JSON.stringify(resp.data.plannerDetails[0].routeId));

                

                if (resp == undefined || resp == null || resp == "") {
                    toaster.error($filter('translate')('BUSROUTEERROR'));
                    $ionicLoading.hide();
                } else {
                    if(resp.data.status == false){
                        toaster.error(resp.data.message);
                        $ionicLoading.hide();
                    } else if(resp.data.status == true){
                        //console.log("Response Trip Planner", resp.plannerDetails.status)
                        $scope.tripDetails = true;
                        $scope.restripPlannerList = resp.data.plannerDetails;
                        console.log("$scope.restripPlannerList",$scope.restripPlannerList)
                        $sessionStorage.restripPlannerList = $scope.restripPlannerList
                        $sessionStorage.fromAtoB = true;
                        $sessionStorage.routeIdOfAtoBc=$scope.restripPlannerList.routeId;
                        console.log("$sessionStorage.routeIdOfAtoB",$sessionStorage.routeIdOfAtoBc)
                        for(i=0;i<$scope.restripPlannerList.length;i++){ 
                            if($scope.restripPlannerList[i].tripTime){
                                $scope.showLiveBtn = true;
                                $scope.restripPlannerList[i].tripTime = $scope.restripPlannerList[i].tripTime.split(' ');
                                $scope.restripPlannerList[i].tripTime = $scope.restripPlannerList[i].tripTime[1];
                                //$scope.timeChosen = $scope.restripPlannerList[i].tripTime;
                                console.log("Time",$scope.restripPlannerList[i].tripTime)
                                $state.go("app.atobroutedetails");
                            } else {
                                $scope.restripPlannerList[i].tripTime = "No Trip Scheduled Yet";
                                $scope.showLiveBtn = false;
                            } 
                        }                   
                        //$scope.resproutecompainList = resp.data.routeList;
                    }
                    $ionicLoading.hide();
                }
                $ionicLoading.hide();
            },
                function (err) {

                    if (err.status == 401){
                        $scope.AccessToken('Tripplan');
                        console.log("if got true in err");
                       }else{
                         toaster.error($filter('translate')('EBUSTHIRDPARTYERROR'));
                        $ionicLoading.hide();
                      } 
                    $ionicLoading.hide();
                })
        }
        $scope.noBusStopNearBy=false
        $scope.getNearByStops=function(token){
            $ionicLoading.show()
            var params = { "tenantCode": "dscl", "lat": $scope.lat, "lon": $scope.long, "radius": 2000 }
            console.log("params nearby", params)
            RestService.nearByBusStops(params,token).then(function (resp) {
                if (resp == undefined || resp == null || resp == "") {
                    toaster.error($filter('translate')('ERROR'), $filter('translate')('COMPLERROR'));
                    $ionicLoading.hide();
                }
                else {
                    console.log("Near By Stops Response", resp);
                    $scope.nearByStopsList = resp.data.nearByStops;
                     console.log("Near By", $scope.nearByStopsList)
                    if( resp.data.status == true ){
                        $scope.nearByStopsCheck =true;
                $scope.nearByStopsList.forEach(function(stop) {
    const result = getDistanceFromLatLonInKm($scope.lat, $scope.long, stop.latitude, stop.longitude);
    if (parseFloat(result.distance) < 1) {
        stop.distance = Math.round(parseFloat(result.distance) * 1000) + 'm'; // e.g., 850 m
    } else {
        stop.distance = parseFloat(result.distance).toFixed(2) + 'km'; // e.g., 2.34 km
    }
    stop.direction = result.direction; // e.g., " N", " SW"
    $ionicLoading.show()
});

                    $ionicLoading.hide();
                                    console.log("Near By Stops List", $scope.nearByStopsList);
                }else{                                  
                      console.log("Near By Stops List in else ", $scope.nearByStopsList);
                      $scope.noBusStopNearBy=true
                }
            }
                $ionicLoading.hide();
                
            },
                function (err) {
                    if (err.status == 401){
                        $scope.AccessToken('nearby');
                        console.log("if got true in err");
                     }else{
                         toaster.error($filter('translate')('EBUSTHIRDPARTYERROR'));
                        $ionicLoading.hide();
                      }
                    $ionicLoading.hide();
                })
        }

        $scope.searchOtherBusStops = function(value){
            if(value!=null && value!='' && value!=undefined)
                $scope.nearByStopsCheck = false;
            else
                $scope.nearByStopsCheck = true;
        }
      

        function scrollTop() {
            $ionicScrollDelegate
                .$getByHandle('so-handle')
                .scrollTop(true);
        };


        $scope.resetFilter = function () {
            $scope.search.CompletionDate = undefined;
            $scope.search.JobTypeName = '';
            $scope.search.CustomerName = '';
            $scope.unsynced = [];
        }

        $scope.crossBtn = function (job){
            console.log(job,"job")
            if (job == "source"){
                document.getElementById('inputSourceId').value=''
                document.getElementById('inputDestId').value=''
                $scope.view.callByATOB();
            } else {
                $scope.destinationStop = "";
                document.getElementById('inputDestId').value=$scope.destinationStop
                $scope.view.onJob3Click($scope.sourceObj);
            }
        }

        $scope.view = {
            tabs: {
                bystop: true,
                byroute: false,
                byAtoB:false
            },

            mapVisible: false,
            reset: function () {
                var self = this;
                this.jobs = [];
                this.moreDataCanBeLoaded = true;
                //When navigated from dashboard
                this.selectedTab = 'bystop'
            },
    
            onTimingClick: function (selectedTime) {
                $sessionStorage.selectedTiming = selectedTime;
                $sessionStorage.fromByRoute = true;
                $state.go("app.routetimetable");
            },
    
            onMapClicl: function (value) {  
                if (value) {
                    $scope.view.mapVisible = true;
                    $timeout(function () {
                        initialize($scope.respcompainList)
                    }, 500);
                } else {
                    $scope.view.mapVisible = false;
                }

            },                            

            callByRoute: function () {
                $scope.heading = $filter('translate')('EBUSBYROUTE');
                if($localStorage.langID == "2"){
                    $ionicLoading.show({ template: 'लोड हो रहा है...'    });
                  }else{
                    $ionicLoading.show({ template: 'Loading...'    });
                  }
                  var token= $scope.token;
                  $scope.callRoute(token);
               
            },

            callByBusStop: function (comeFrom) {
                if(comeFrom == 'AtoB'){
                    $scope.heading = $filter('translate')('EBUSATOB');
                } else {
                    $scope.heading = $filter('translate')('EBUSBYSTOPS');
                }
                if($localStorage.langID == "2"){
                    $ionicLoading.show({ template: 'लोड हो रहा है...'    });
                  }else{
                    $ionicLoading.show({ template: 'Loading...'    });
                  }
                  var token= $scope.token;
                  $scope.callBusStop(token);
                  $scope.getNearByStops(token);
            },

            callByATOB: function () {
                $scope.heading = $filter('translate')('EBUSATOB');
                $scope.sourceStop = "";
                $scope.destinationStop = "";
                $scope.showSource = true;
                $scope.showDestination = false;
                $scope.tripDetails = false;
                $scope.showMapBox = false;
                $scope.showBusDetail = false;
                // $scope.showBusTimetable = false;
                console.log("A to B Called");
                $scope.view.callByBusStop('AtoB');
            },

            onJobClick: function (job) {
                console.log("Entered Other", job)
                $sessionStorage.PoiName = job.PoiName;
                $sessionStorage.arrivingComingFrom = "Other"
                $sessionStorage.routLat = job.Latitude;
                $sessionStorage.routLon = job.Longitude;  
                $state.go("app.arrivingbus");
            },

            onJobClickDirect: function (job) {
                console.log("Entered Nearby", job)
                $sessionStorage.busStopLatLong={"lat":job.latitude,
                    "long":job.longitude
                }
                console.log("$sessionStorage.busStopLatLong",$sessionStorage.busStopLatLong);
                
                $sessionStorage.PK_PoiId = job.stopId;
                $sessionStorage.arrivingComingFrom = "NearBy"
                $state.go("app.arrivingbus");
            },

            onJob2Click: function (job) {             //Changes made on 05-01-23
                $sessionStorage.routeId = job.RouteId;
                $scope.rId = $sessionStorage.routeId
                if($localStorage.langID == "2"){
                    $ionicLoading.show({ template: 'लोड हो रहा है...'    });
                } else {
                    $ionicLoading.show({ template: 'Loading...'    });
                }
                var token= $scope.token
                $scope.enroutedDetails(token);
                
            },

            onJob3Click: function (job) {
                console.log("$scope.sourceStop", job);
                $scope.sourceObj = job;
                $scope.sourceStop = job.PoiName;
                $sessionStorage.sourceStop = $scope.sourceStop;
                document.getElementById('inputSourceId').value=$scope.sourceStop;
                console.log("$scope.sourceStop", $scope.sourceStop);
                $scope.showSource = false;
                $scope.showDestination = true;
                $scope.tripDetails = false;
                $scope.showMapBox = false;
                $scope.showBusDetail = false;
                // $scope.showBusTimetable = false;
            },

            onJob4Click: function (job) {
                if($scope.sourceStop){
                    console.log("$scope.sourceStop", job);
                    $scope.destinationStop = job.PoiName;
                    document.getElementById('inputDestId').value=$scope.destinationStop;
                    $sessionStorage.destinationStop = $scope.destinationStop;
                    console.log("$scope.destinationStop", $scope.destinationStop);
                    $scope.showSource = false;
                    $scope.showDestination =false;
                    $scope.showMapBox = false;
                    $scope.showBusDetail = false;
                    // $scope.showBusTimetable = false;
                    //$scope.currentTime = "21:00:00";

                    if($scope.sourceStop == $scope.destinationStop){
                        toaster.error($filter('translate')('SAMESTOP'));
                        $scope.view.callByATOB();
                        
                    } else {

                       
                        //$sessionStorage.TripPlannerParams = params;
                        //$state.go("app.atobroutedetails");

                        if($localStorage.langID == "2"){
                            $ionicLoading.show({ template: 'लोड हो रहा है...'    });
                        } else {
                            $ionicLoading.show({ template: 'Loading...'    });
                        }
                        var token= $scope.token;
                        $scope.tripplan(token)
                        
                    }
                } else {
                    toaster.error($filter('translate')('PLSSELSOURCE'));
                }
            },

            /* onLiveMapClick: function(job){
                $scope.showSource = false;
                $scope.showDestination = false;
                $scope.tripDetails = false;
                $scope.showBusDetail = true;
                $scope.showLiveBtn = false;

                console.log("job",job);
                $scope.selectedBusNo = job.routeName;
                $scope.selectedViaRoute = job.routeViaName;
                /* var selectedTime = job.tripTime;
                $scope.selectedTime = selectedTime.split(' ');
                $scope.selectedBusTime = $scope.selectedTime[1]; *
                $scope.selectedBusTime = job.tripTime;
                console.log($scope.selectedBusTime);
                $scope.wayPtRouteId = job.routeId;
                $scope.wayPtFleetId = job.fleetId;
                console.log("Way Point Params",$scope.wayPtRouteId, $scope.wayPtFleetId, $scope.selectedBusNo)
         
                var params = {
                    "routeId" : $scope.wayPtRouteId,
                    "fleetId" : $scope.wayPtFleetId,
                    
                    // "routeId" : 8571,
                    // "fleetId" : 113,
                }
                console.log("Params", params)          

                if($localStorage.langID == "2"){
                    $ionicLoading.show({ template: 'लोड हो रहा है...'    });                              
                } else {
                    $ionicLoading.show({ template: 'Loading...'    });
                }
                RestService.wayPointsDetails(params).then(function (resp) {
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

                            $state.go("app.atobmap");

                            $scope.AtoBMapBox();
                        }
                    }          
                    $ionicLoading.hide();
                },
                    function (err) {
                        $ionicLoading.hide();
                        //toaster.error($filter('translate')('BUSROUTEERROR'));
                        console.log("Error in Bus Route",err)
                        toaster.error($filter('translate')('EBUSTHIRDPARTYERROR'));
                    })

            }, */

            /* showTimeTable: function(){
                //console.log("showBusDetail",value)
                $scope.showBusTimetable = true;
                
                $sessionStorage.fromAtoB = $scope.showBusTimetable;
                $sessionStorage.routeIdOfAtoB = $scope.wayPtRouteId;
                $sessionStorage.selectedTimeofAtoB = $scope.selectedBusTime;
                console.log("showBusDetail",$sessionStorage.showBusTimetable, $sessionStorage.selectedTimeofAtoB)
                $state.go("app.routetimetable");

            }, */


            init: function () {
                $scope.token = $rootScope.swmAccessTokenData;
                if($localStorage.langID == "2"){
                    $ionicLoading.show({ template: 'लोड हो रहा है...'    });
                } else {
                    $ionicLoading.show({ template: 'Loading...'    });
                }
                
                  //$scope.view.callByBusStop();
                $scope.view.callByATOB();
            },

            onTabClick: function (selectedTab) {
                var self = this;
                this.selectedTab = selectedTab;
                if (selectedTab == 'byroute') {
                    $scope.view.tabs.byroute = true;
                    $scope.view.tabs.bystop = false;
                    $scope.view.tabs.byAtoB = false;
                    $scope.view.callByRoute();
                } else if (selectedTab == 'bystop'){
                    $scope.view.tabs.byroute = false;
                    $scope.view.tabs.bystop = true;
                    $scope.view.tabs.byAtoB = false;
                    $scope.view.callByBusStop();
                } else if (selectedTab == 'byAtoB') {
                    $scope.view.tabs.byroute = false;
                    $scope.view.tabs.bystop = false;
                    $scope.view.tabs.byAtoB = true;
                    $scope.view.callByATOB();
                }else{
                    $scope.view.tabs.byroute = true;
                    $scope.view.tabs.bystop = false;
                    $scope.view.tabs.byAtoB = false;
                    $scope.view.callByRoute();
                }
                // _.each(this.tabs, function (tab, tabIndex) {

                // });
                scrollTop();
            },

            onRefresh: function (handle) {
                var self = this;
            },

            onDeviceBack: function () {
                if (App.isLoadingShown())
                    $ionicLoading.hide();
                else
                    App.goBack(-1);
            }
        };


        $scope.$on('$ionicView.beforeEnter', function () {
            var view = $scope.view;
            view.reset();
            view.init();
        });
        $scope.$on('$ionicView.leave', function () {
            syncEvent();
            $ionicPlatform.offHardwareBackButton($scope.view.onDeviceBack);
        });

        var _init = function () {
    if (!$rootScope.checkLocationOFF()) {
      return;
    }

    $scope.view.callByRoute();

    var geoOptions = {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 0 // <-- Ensures it fetches fresh location every time
    };

    // Native geolocation API
    navigator.geolocation.getCurrentPosition(function(position) {
      console.log("Navigator Location:");
      console.log("Latitude:", position.coords.latitude);
      console.log("Longitude:", position.coords.longitude);

      $scope.Latitude = position.coords.latitude;
      $scope.Longitude = position.coords.longitude;

    }, function(err) {
      alert('Navigator error:\nCode: ' + err.code + '\nMessage: ' + err.message);
    }, geoOptions);

    // Cordova geolocation plugin
    $cordovaGeolocation.getCurrentPosition(geoOptions).then(function(position) {
      console.log("Cordova Location:");
      console.log("Latitude:", position.coords.latitude);
      console.log("Longitude:", position.coords.longitude);

      $scope.latitude = position.coords.latitude;
      $scope.longitude = position.coords.longitude;

      $sessionStorage.currentLatitude = $scope.latitude;
      $sessionStorage.currentLongitude = $scope.longitude;

    }, function(err) {
      alert("Cordova error:\nCode: " + err.code + "\nMessage: " + err.message);
    });
  };

  // Ensure it runs every time the view is entered
  $scope.$on('$ionicView.enter', function () {
    _init();
  });

//          var _init = function () {
//                         if (!$rootScope.checkLocationOFF()) {
//                         return;
//                     }
//                     $scope.view.callByRoute();
//         var geoSuccess = function (position) {
//         //var thisResult = JSON.parse(position);
//         console.log("position---" + JSON.stringify(position));
//         console.log('Latitude: ' + position.coords.latitude + '\n' +
//           'Longitude: ' + position.coords.longitude + '\n' +
//           'Altitude: ' + position.coords.altitude + '\n' +
//           'Accuracy: ' + position.coords.accuracy + '\n' +
//           'Altitude Accuracy: ' + position.coords.altitudeAccuracy + '\n' +
//           'Heading: ' + position.coords.heading + '\n' +
//           'Speed: ' + position.coords.speed + '\n' +
//           'Timestamp: ' + position.timestamp + '\n');
//         //$scope.myImgUrl = thisResult.filename;
//         console.log("result.filename------" + thisResult.filename);
//         $scope.Latitude = position.coords.latitude;
//         $scope.Longitude = position.coords.longitude;

//       };
//       var fail = function (err) {
//         alert('code: ' + error.code + '\n' +
//           'message: ' + error.message + '\n');
//       }

//       navigator.geolocation.getCurrentPosition(geoSuccess, fail);


//       $cordovaGeolocation.getCurrentPosition(options).then(function (position) {
//         console.log(position.coords.latitude);
//         console.log(position.coords.longitude);
//         $scope.latitude = position.coords.latitude;
//         $scope.longitude = position.coords.longitude;

//         $sessionStorage.currentLatitude = $scope.latitude;
//         $sessionStorage.currentLongitude = $scope.longitude;

//         console.log("my current lat long",$scope.latitude);
//         console.log("my current lat long",$scope.longitude);

//       }, function (error) {
//         console.log("Could not get location");
//       });
// }
// function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
//   var R = 6371; // Radius of earth in km
//   var dLat = deg2rad(lat2 - lat1);
//   var dLon = deg2rad(lon2 - lon1);
//   var a =
//     Math.sin(dLat / 2) * Math.sin(dLat / 2) +
//     Math.cos(deg2rad(lat1)) *
//       Math.cos(deg2rad(lat2)) *
//       Math.sin(dLon / 2) *
//       Math.sin(dLon / 2);
//   var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
//   var d = R * c; // Distance in km
//   return d;
// }

function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
  // Converts degrees to radians
  function deg2rad(deg) {
    return deg * (Math.PI / 180);
  }

  // Converts radians to degrees
  function rad2deg(rad) {
    return rad * (180 / Math.PI);
  }

  // Converts bearing to short compass direction
function getCardinalDirection(bearing) {
  const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
  const index = Math.round(bearing / 45) % 8;
  return directions[index];
}


  const R = 6371; // Radius of Earth in km
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;

  // Calculate bearing
  const y = Math.sin(dLon) * Math.cos(deg2rad(lat2));
  const x =
    Math.cos(deg2rad(lat1)) * Math.sin(deg2rad(lat2)) -
    Math.sin(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.cos(dLon);
  let bearing = rad2deg(Math.atan2(y, x));
  bearing = (bearing + 360) % 360; // Normalize to 0–360°

  const direction = getCardinalDirection(bearing);

  // Return both distance and direction
  return {
    distance: distance.toFixed(2) + ' km',
    direction: direction
  };
}


function deg2rad(deg) {
  return deg * (Math.PI / 180);
}

// Then, in your controller when setting nearByStopsList:

_init()
    })
