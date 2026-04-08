angular.module('starter')
    .controller('ArrivingBusCTRL', function ($scope, RestService, $ionicLoading, $stateParams, toaster, $filter, ENV, $ionicHistory,
        $state, $localStorage, $sessionStorage, $ionicModal, $ionicPopup, $rootScope, $ionicPlatform) {
        $scope.heading = $filter('translate')('EBUSETA');
        $scope.orderByDate = 'DueDate';
        $scope.reverseOrder = false;
        $scope.showNoBusStop=true
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
        // $scope.data = {
        //     "arrivingBusesList": [
        //         {
        //             "FK_FleetId": 245,
        //             "RouteName": "R111",
        //             "FleetNo": "TEST-FLEET",
        //             "EtaTime": "15:50:00",
        //             "FK_RouteId": 7591,
        //             "RouteType": 1
        //         }
        //     ],
        //     "status": true
        // }
        // $scope.respcompainList = $scope.data.arrivingBusesList;
        

        $scope.poiId = $sessionStorage.PK_PoiId; 
        $scope.poiName = $sessionStorage.PoiName;
        $scope.comeFrom = $sessionStorage.arrivingComingFrom;        
        $scope.latitude = $sessionStorage.routLat;
        $scope.longitude = $sessionStorage.routLon;
        // $scope.showNoBusStop = false;

        console.log("Session", $scope.poiId, $scope.poiName, $scope.comeFrom, $scope.latitude, $scope.longitude)


        // By Stop :
        // 1(Distinct Stop) - 5(Near By Stops) - 9(Arriving Buses List) - 10(Enrouted Details)/7(Trip Planner Details) - 18(Get Fare Details)

        // By Route :
        // 2(Get Route) - 3(Route Type)(Exceptional) - 20(Time Table Details) - 10(Enrouted Details)/4(Route Details) - 18(Get Fare Details) - 8(Scheduled Trip Details) - 6(WayPointDetails)

        // Grievance :
        // 14(Get Incident Types) - 13(Get Incident Sub Types) - 11(Create Grievance)/15(Create SOS Alarm) - 12(Get Complaints) - 16(Get Complaint By Id) - 17(Get Grievance Lifecycle) - 19(Insert Citizen Feedback)


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
        
      $scope.AccessToken = function(type){
        console.log('$rootScope.swmAccessToken' + $rootScope.swmAccessToken, type)
      
          RestService.getAccessToken().then(function (data) {
            $rootScope.swmAccessTokenData = data.access_token;
            console.log($rootScope.swmAccessToken,"rrot scope toke")
            console.log(data.access_token,"data toke")

            if(type == 'arrivingbus'){
              console.log("Entered waypt");
              $scope.getArrivingBus($rootScope.swmAccessTokenData);
            } else if(type == 'nearby'){
                $scope.getNearByStops($rootScope.swmAccessTokenData);
            }else if(type == 'wayPt'){
              console.log("Entered waypt"); 
              $scope.WayPoint($rootScope.swmAccessTokenData);
            }
          },
            function (err) {
              toaster.error($filter('translate')('ACCESSTOKENFAILED'));
            })
        }
 
    $scope.WayPoint = function(data){
        console.log("Way Point Details", data);
               var params = {
        "routeId" : data.routeId,
        "fleetId" : data.fleetId,

//testing
        // "routeId":8579,"fleetId":1190
    }
        $sessionStorage.wayPointParamsData = data;

        
        let token = $rootScope.swmAccessTokenData;
  RestService.wayPointsDetails(params,token).then(function (resp) {
    console.log(resp, resp.data.status);
    if (resp == undefined || resp == null || resp == "") {
        toaster.error($filter('translate')('BUSROUTEERROR'));
        $ionicLoading.hide();
    } else {
        if(resp.data.status == false){
            toaster.error(resp.data.message);
            $scope.showMapBtn = false;
            $ionicLoading.hide();
        } else if(resp.data.status == true){
            $scope.showMapBtn = true;
            console.log("showMapBtn",$scope.showMapBtn);

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
            $scope.goToMap();
        }
    }          
    $ionicLoading.hide();
},
    function (err) {
      console.log("Error in Bus Route",err)
      $scope.showMapBtn = false
      if (err.status == 401){
        $scope.AccessToken('wayPt');
        console.log("if got true in err");
      } 
        $ionicLoading.hide();
        //toaster.error($filter('translate')('BUSROUTEERROR'));
        // toaster.error($filter('translate')('EBUSTHIRDPARTYERROR'));
    })
}
$scope.goToMap = function(){
  $sessionStorage.wayPtDetails = $scope.wayPtDetails;
  $sessionStorage.busLat = $scope.busLat;
  $sessionStorage.busLong = $scope.busLong;
  $state.go("app.atobmap");
}
        $scope.getNearByStops=function(token){

            var params = { "tenantCode": "dscl", "lat": $scope.latitude, "lon": $scope.longitude, "radius": 2000 }
            console.log("params nearby", params)
            RestService.nearByBusStops(params,token).then(function (resp) {
                if (resp == undefined || resp == null || resp == "") {
                    toaster.error($filter('translate')('ERROR'), $filter('translate')('COMPLERROR'));
                    $ionicLoading.hide();
                }
                else {
                    $scope.nearByStopsList = resp.data.nearByStops;
                    //console.log("Near By", $scope.nearByStopsList.length)
                    
                    var busSelected = $scope.nearByStopsList.filter((el) => {
                        return $scope.poiName === el.stopName;
                    });

                    console.log("Bus which is selected", busSelected, busSelected[0].stopId);
                    $scope.poiId = busSelected[0].stopId;
                    $scope.getArrivingBus(token);

                    $ionicLoading.hide();
                }
                $ionicLoading.hide();
            },
                function (err) {
                    if (err.status == 401){
                        $scope.AccessToken('nearby');
                        console.log("if got true in err");
                    } 
                    $ionicLoading.hide();
                    //toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR'));
                    console.log("Error in Bus Route nearbystops",err)
                    toaster.error($filter('translate')('EBUSTHIRDPARTYERROR'));
                })
        }

        // $scope.getArrivingBus=function(){
        //         var token = $rootScope.swmAccessTokenData;
        //     var params = { "stopId": $scope.poiId }
        //     RestService.arrivingBusesList(params,token).then(function (resp) {
        //         if (resp == undefined || resp == null || resp == "") {
        //             toaster.error($filter('translate')('BUSROUTEERROR')/* , $filter('translate')('COMPLERROR') */);
        //             $ionicLoading.hide();
        //         } else {
        //             console.log("resp.status", resp.data.status)
        //             if(resp.data.status == false){
        //                 $scope.msg = resp.data.message;
        //                 $scope.showNoBusStop = true;
        //             } else {
        //                 $scope.showNoBusStop = false;
        //                 const respcompainList = resp.data.arrivingBusesList;

        //                 console.log("Arriving Buses List", $scope.respcompainList);
                        
        //             }
                    
        //         }
        //         $ionicLoading.hide();
        //     },
        //         function (err) {
        //             if (err.status == 401){
        //                 $scope.AccessToken('arrivingbus');
        //                 console.log("if got true in err");
        //               } 
        //             // $ionicLoading.hide();
        //             //toaster.error($filter('translate')('BUSROUTEERROR')/* , $filter('translate')('ERROR') */);
        //             console.log("Error in Bus Route",err)
        //             // toaster.error($filter('translate')('EBUSTHIRDPARTYERROR'));
        //         })
        // }
          $scope.isRefreshing = false;
$scope.getArrivingBus = function() {
      $scope.isRefreshing = true;
    var token = $rootScope.swmAccessTokenData;
    var params = { "stopId": $scope.poiId };
    
    RestService.arrivingBusesList(params, token).then(function(resp) {
        if (!resp || !resp.data || !resp.data.status) {
            // toaster.error($filter('translate')('BUSROUTEERROR'));
            $scope.showNoBusStop = true;
            $scope.msg = resp.data.message;
            $ionicLoading.hide();
            console.log("Invalid response: no busses for this stop", resp);
            return;
        }

        // Extract arriving buses array
        const arrivingBuses = resp.data.arrivingBusesList || [];

        // Function to get waypoint data for a single bus
        function getWaypoints(bus) {
            return new Promise((resolve, reject) => {
                var params = {
                    routeId: bus.routeId,
                    fleetId: bus.fleetId
                };
                RestService.wayPointsDetails(params, token).then(function(waypointResp) {
                    if (waypointResp && waypointResp.data && waypointResp.data.status) {
                        bus.wayPointDetails = waypointResp.data.wayPointDetails || [];
                    } else {
                        bus.wayPointDetails = [];
                    }
                      $scope.isRefreshing = false;
                    resolve(bus);
                }, function(err) {
                    bus.wayPointDetails = [];
                      $scope.isRefreshing = false;
                    resolve(bus);

                });
            });
        }

        // Array of promises for all buses
        let promises = arrivingBuses.map(bus => getWaypoints(bus));
        Promise.all(promises).then(results => {
            $scope.response = results; // combined data
//             $scope.respcompainList.sort(function(a, b) {
//                 console.log("Sorting by ETA ab", a, b)
//                 console.log("Sorting by ETA", a.currentStopETA, b.currentStopETA);
                
//     const now = new Date();

//     const parseTime = (timeStr) => {
//         if (!timeStr || timeStr === '--') return new Date(8640000000000000); // Max date for "--"
//         const parts = timeStr.split(':');
//         return new Date(
//             now.getFullYear(),
//             now.getMonth(),
//             now.getDate(),
//             parseInt(parts[0], 10),
//             parseInt(parts[1], 10),
//             parseInt(parts[2] || 0, 10)
//         );
//     };

//     const timeA = parseTime(a.currentStopETA);
//     const timeB = parseTime(b.currentStopETA);

//     return timeA - timeB;
// });
// $scope.respcompainListOne = $scope.response.filter(function(job) {
//     const now = new Date();

//     // Helper function to parse ETA time (HH:mm:ss format)
//     const parseTime = (timeStr) => {
//         if (!timeStr || timeStr === '--') return new Date(8640000000000000); // Max date for "--"
//         const parts = timeStr.split(':');
//         return new Date(
//             now.getFullYear(),  // Use current year
//             now.getMonth(),     // Use current month
//             now.getDate(),      // Use current date
//             parseInt(parts[0], 10), // Hours
//             parseInt(parts[1], 10), // Minutes
//             parseInt(parts[2] || 0, 10) // Seconds (if present)
//         );
//     };

//     const etaTime = parseTime(job.currentStopETA);

//     // Calculate the time difference between the current time and the ETA in milliseconds
//     const timeDifference = etaTime - now;

//     // If the ETA is more than 20 minutes in the future (1200000ms), exclude this bus
//     return timeDifference <= 300000  ;  // 5 minutes = 1200000ms
// });

// Now, sort the remaining buses by their ETA (earliest ETA first)
$scope.respcompainList=$scope.response.sort(function(a, b) {
    console.log("Sorting by ETA ab", a, b);
    
    const now = new Date();
    const parseTime = (timeStr) => {
        if (!timeStr || timeStr === '--') return new Date(8640000000000000); // Max date for "--"
        const parts = timeStr.split(':');
        return new Date(
            now.getFullYear(),  // Use current year
            now.getMonth(),     // Use current month
            now.getDate(),      // Use current date
            parseInt(parts[0], 10), // Hours
            parseInt(parts[1], 10), // Minutes
            parseInt(parts[2] || 0, 10) // Seconds (if present)
        );
    };

    const timeA = parseTime(a.currentStopETA);
    const timeB = parseTime(b.currentStopETA);
    return timeA - timeB;  // Sorting in ascending order (earliest ETA first)
});


            console.log("Combined Arriving Buses + WayPoints Data:", $scope.respcompainList);
            $ionicLoading.hide();
            $scope.showNoBusStop = false;
            $scope.$applyAsync(); // update scope since inside promise
        });

    }, function(err) {
        toaster.error($filter('translate')('BUSROUTEERROR'));
        $ionicLoading.hide();
    });
}

// Helper function to check if bus is arriving or left based on ETA
$scope.isBusArriving = function(etaTimeStr) {
    if (!etaTimeStr) return false;

    let now = new Date();
    let etaParts = etaTimeStr.split(':');
    if (etaParts.length < 3) return false; // invalid format

    // Construct ETA Date object assuming ETA is today
    let etaDate = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate(),
        parseInt(etaParts[0], 10),
        parseInt(etaParts[1], 10),
        parseInt(etaParts[2], 10)
    );

    return now <= etaDate;
}
$scope.getBusStopStatus = function(waypoints) {

    if (!waypoints || waypoints.length === 0) {
        return { lastStop: 'N/A', upcomingStop: 'N/A' };
    }

    let lastStop = null;
    let upcomingStop = null;

    for (let i = 0; i < waypoints.length; i++) {
        const stop = waypoints[i];

        if (stop.EtaTime === '--') {
            lastStop = stop.PoiName;  // bus has passed this
        } else if (!upcomingStop) {
            upcomingStop = stop.PoiName;  // bus will reach here next
        }
    }

    return {
        lastStop: lastStop || 'N/A',
        upcomingStop: upcomingStop || 'N/A'
    };
};


$scope.getETAInMinutes = function(etaStr) {
    if (!etaStr) return { text: "N/A", status: "na" };

    let now = new Date();
    let etaParts = etaStr.split(':');
    if (etaParts.length !== 3) return { text: "N/A", status: "na" };

    let etaDate = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate(),
        parseInt(etaParts[0], 10),
        parseInt(etaParts[1], 10),
        parseInt(etaParts[2], 10)
    );

    let diffMs = etaDate - now;

    if (diffMs <= 0) {
        return {
            text: $filter('translate')('BUSLEFT'),
            status: "busleft"
        };
    }

    let diffMins = Math.ceil(diffMs / 60000);
    if (diffMins <= 5) return { text: "⏳ Less than 5 mins", status: "soon" };
    if (diffMins <= 15) return { text: "🕒 ~10–15 mins", status: "moderate" };
    if (diffMins <= 30) return { text: "🕒 ~20–30 mins", status: "moderate" };

    return {
        text: `🕒 ${$filter('translate')('MORETHENHALF')}`,
        status: "later"
    };
};





        $scope.view = {
            tabs: {
                bystop: true,
                byroute: false
            },
            reset: function () {
                var self = this;
                this.jobs = [];
                this.moreDataCanBeLoaded = true;
                //When navigated from dashboard
                this.selectedTab = 'bystop'
            },

            onJobClick: function (job) {
                $sessionStorage.routeId = job.routeId;
                $state.go("app.enrouteddetails");
            },
            init: function () {
                if($localStorage.langID == "2"){
                    $ionicLoading.show({ template: 'लोड हो रहा है...'    });
                } else {
                    $ionicLoading.show({ template: 'Loading...'    });
                }
                var token = $rootScope.swmAccessTokenData;

                //$scope.getArrivingBus(token);
                if($sessionStorage.arrivingComingFrom == "Other"){
                    $scope.getNearByStops(token);
                } else {
                    $scope.getArrivingBus(token);
                }
               
            },

            onTabClick: function (selectedTab) {
                var self = this;
                this.selectedTab = selectedTab;
                _.each(this.tabs, function (tab, tabIndex) {
                    if (tabIndex === selectedTab)
                        self.tabs[selectedTab] = true;
                    else
                        self.tabs[tabIndex] = false;
                });
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

        $scope.$on('$ionicView.enter', function () {
            syncEvent = $rootScope.$on('service:order:marked:as:synced', function () {
                $scope.view.refreshSyncStatus();
            });

            $ionicPlatform.onHardwareBackButton($scope.view.onDeviceBack);
        });

        $scope.$on('$ionicView.leave', function () {
            syncEvent();
            $ionicPlatform.offHardwareBackButton($scope.view.onDeviceBack);
        });
        $scope.myGoBack=function(){
            $state.go('app.itshome')
        }
        var deregisterSecond = $ionicPlatform.registerBackButtonAction(
      function () {
        $sessionStorage.eBusFeedback=null
      $state.go('app.itshome')
      }, 100
    );
    })
