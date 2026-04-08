angular.module('starter')
    .controller('sourcetodestination', function ($scope, RestService, $ionicLoading, $stateParams, toaster, $filter, ENV, $ionicHistory,
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
        $scope.lat = $sessionStorage.lat 
        $scope.long = $sessionStorage.long
        console.log("Lat Long in EBus", $scope.lat, $scope.long);        
        $scope.hour = new Date().getHours();
        $scope.min = new Date().getMinutes();
        $scope.currentTime = $scope.hour + ":" +  $scope.min
        console.log($scope.currentTime)

        
        // $scope.data = {
        //     "distinctStopList": [
        //         {
        //             "Latitude": 12.96985149383545,    
        //             "StopId": 117,
        //             "PoiName": "Stop 1",
        //             "Longitude": 77.59132385253906
        //         },
        //         {
        //             "Latitude": 19.863085,
        //             "StopId": 118,
        //             "PoiName": "RTO OFFICE",
        //             "Longitude": 75.310601
        //         },
        //         {
        //             "Latitude": 19.868734,
        //             "StopId": 120,
        //             "PoiName": "PADAMPURA",
        //             "Longitude": 75.311826
        //         },
        //         {
        //             "Latitude": 19.872774,
        //             "StopId": 121,
        //             "PoiName": "HOTEL PANCHVATI",
        //             "Longitude": 75.314003
        //         }
        //     ],
        //     "status": true
        // }
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

           $scope.myGoBack=function(){
            $state.go('app.subHome')
        }
            var deregisterSecond = $ionicPlatform.registerBackButtonAction(
  		      function() {
                $state.go('app.subHome')
  		      }, 100
  		    );

        
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
                     $ionicLoading.hide();
                    //toaster.error($filter('translate')('BUSROUTEERROR')/* , $filter('translate')('ERROR') */);
                    console.log("Error in Bus Route",err)
                    toaster.error($filter('translate')('EBUSTHIRDPARTYERROR'));
                      }
            $ionicLoading.hide();

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
                      }else{ 
                     $ionicLoading.hide();
                    //toaster.error($filter('translate')('BUSROUTEERROR')/* , $filter('translate')('ERROR') */);
                    console.log("Error in Bus Route",err)
                    toaster.error($filter('translate')('EBUSTHIRDPARTYERROR'));
                      }
            $ionicLoading.hide();
       
                })
        }

        $scope.callBusStop= function(token){
            console.log("in call bus stop");
            
            RestService.getDistinctStops(token).then(function (resp) {
                if (resp == undefined || resp == null || resp == "") {
                    toaster.error($filter('translate')('BUSROUTEERROR')/* , $filter('translate')('COMPLERROR') */);
                    $ionicLoading.hide();
                }
                else {
                    $scope.respcompainList = resp.data.distinctStopList;
                    $ionicLoading.hide();
                }
                $ionicLoading.hide();
            },
                function (err) {


    if (err.status == 401){
                        $scope.AccessToken('callbybusstop');
                        console.log("if got true in err");
                      }else{ 
                     $ionicLoading.hide();
                    //toaster.error($filter('translate')('BUSROUTEERROR')/* , $filter('translate')('ERROR') */);
                    console.log("Error in Bus Route",err)
                    toaster.error($filter('translate')('EBUSTHIRDPARTYERROR'));
                      }
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
                     $ionicLoading.hide();
                    //toaster.error($filter('translate')('BUSROUTEERROR')/* , $filter('translate')('ERROR') */);
                    console.log("Error in Bus Route",err)
                    toaster.error($filter('translate')('EBUSTHIRDPARTYERROR'));
                      }
            $ionicLoading.hide();
                })
        }

        $scope.getNearByStops=function(token){

            var params = { "tenantCode": "dscl", "lat": $scope.lat, "lon": $scope.long, "radius": 2000 }
            console.log("params nearby", params)
            RestService.nearByBusStops(params,token).then(function (resp) {
                if (resp == undefined || resp == null || resp == "") {
                    toaster.error($filter('translate')('ERROR'), $filter('translate')('COMPLERROR'));
                    $ionicLoading.hide();
                }
                else {
                    $scope.nearByStopsList = resp.data.nearByStops;
                    //console.log("Near By", $scope.nearByStopsList.length)
                    if( resp.data.status == true ){
                        $scope.nearByStopsCheck =true;
                    }
                    $ionicLoading.hide();
                }
                $ionicLoading.hide();
            },
                function (err) {
                    if (err.status == 401){
                        $scope.AccessToken('nearby');
                        console.log("if got true in err");
                    } else{
      //toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR'));
                    console.log("Error in Bus Route nearbystops",err)
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
                bystop: false,
                byroute: false,
                byAtoB:true
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
                } else {
                    $scope.view.tabs.byroute = false;
                    $scope.view.tabs.bystop = false;
                    $scope.view.tabs.byAtoB = true;
                    $scope.view.callByATOB();
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

// -------------------- AUTO LOAD BY A TO B --------------------
$timeout(function () {
    if ($scope.view && angular.isFunction($scope.view.onTabClick)) {
        $scope.view.onTabClick('byAtoB');
    }
}, 0);

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
                console.log("in source to destination");
                
    if (!$rootScope.checkLocationOFF()) {
      return;
    }
            $scope.getNearByStops($rootScope.swmAccessTokenData)
           $scope.view.callByATOB()
            $scope.callBusStop($rootScope.swmAccessToken)
}
 $scope.$on('$ionicView.enter', function () {
    _init();
  });
    })
