angular.module('starter')
  .controller('AtoBRouteDetailsCtrl', function ($scope, RestService, $ionicLoading, $stateParams, toaster, $filter, ENV, $ionicHistory,
    $state, $localStorage, $sessionStorage, $ionicModal, $ionicPopup, $timeout, $ionicScrollDelegate, $ionicPlatform, $cordovaGeolocation,$rootScope) {

      $scope.hour = new Date().getHours();
      $scope.min = new Date().getMinutes();
      $scope.currentTime = $scope.hour + ":" +  $scope.min
      //console.log($scope.currentTime)
      $scope.heading = $filter('translate')('EBUSATOB');
          $scope.myGoBack=function(){
            $state.go('app.sourcetodestination')
        }
            var deregisterSecond = $ionicPlatform.registerBackButtonAction(
  		      function() {
                $state.go('app.sourcetodestination')
  		      }, 100
  		    );

  $scope.restripPlannerList = $sessionStorage.restripPlannerList;
  $scope.sourceStop = $sessionStorage.sourceStop
  $scope.destinationStop = $sessionStorage.destinationStop
  $scope.showMapBtn = false;
  $scope.showButtons = false;
  // for(i=0;i<$scope.tripPlannerList.length;i++){ 
  //   $scope.tripPlannerList[i].tripTime = $sessionStorage.restripPlannerList[i].tripTime;
  // }
  console.log("trip Planner", $scope.restripPlannerList, $sessionStorage.sourceStop);
  // console.log("trip Time", $scope.tripPlannerList[i].tripTime);

  $scope.AccessToken = function(type){
    console.log('$rootScope.swmAccessToken' + $rootScope.swmAccessToken, type)
  
      RestService.getAccessToken().then(function (data) {
        $rootScope.swmAccessTokenData = data.access_token;
        console.log($rootScope.swmAccessToken,"rrot scope toke")
        console.log(data.access_token,"data toke")

        if(type == 'wayPt'){
          console.log("Entered waypt");

          $scope.WayPoint();
        }
      },
        function (err) {
          toaster.error($filter('translate')('ACCESSTOKENFAILED'));
        })

  }

  $scope.onLiveMapClick = function(job){
    $scope.showSource = false;
    $scope.showDestination = false;
    $scope.tripDetails = false;
    $scope.showBusDetail = true;
    $scope.showLiveBtn = false;
    $scope.selFleetId = job.fleetId;

    console.log("job",job);
    $scope.selectedBusNo = job.routeName;
    $scope.selectedViaRoute = job.routeViaName;
    $scope.selectedBusTime = job.tripTime;
    $sessionStorage.selectedBusNo = $scope.selectedBusNo;
    $sessionStorage.selectedViaRoute = $scope.selectedViaRoute;
    $sessionStorage.selectedBusTime = $scope.selectedBusTime
    /* var selectedTime = job.tripTime;
    $scope.selectedTime = selectedTime.split(' ');
    $scope.selectedBusTime = $scope.selectedTime[1]; */
    console.log($scope.selectedBusTime);
    $scope.wayPtRouteId = job.routeId;
    $scope.wayPtFleetId = job.fleetId;
    console.log("Way Point Params",$scope.wayPtRouteId, $scope.wayPtFleetId, $scope.selectedBusNo)

    var params = {
        "routeId" : $scope.wayPtRouteId,
        "fleetId" : $scope.wayPtFleetId,

//testing
        // "routeId" : 8571,
        // "fleetId" : 113,
    }
    console.log("Params", params)      
    $sessionStorage.wayPointParams = params;

    //$state.go("app.atobmap");

    var token = $rootScope.swmAccessTokenData;
    $scope.WayPoint(token);

},

$scope.WayPoint = function(token){
  
  /* if($localStorage.langID == "2"){
    $ionicLoading.show({ template: 'लोड हो रहा है...'    });                              
  } else {
      $ionicLoading.show({ template: 'Loading...'    });
  } */
  RestService.wayPointsDetails($sessionStorage.wayPointParams,token).then(function (resp) {
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

            // $state.go("app.atobmap");

            // $scope.AtoBMapBox();
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
        toaster.error($filter('translate')('EBUSTHIRDPARTYERROR'));
    })
},

$scope.goToMap = function(){
  $sessionStorage.wayPtDetails = $scope.wayPtDetails;
  $sessionStorage.busLat = $scope.busLat;
  $sessionStorage.busLong = $scope.busLong;
  $state.go("app.atobmap");
}

$scope.showTimeTable = function(job){
  //console.log("showBusDetail",value)(
  $scope.onLiveMapClick(job)
  $scope.showBusTimetable = true;
  $sessionStorage.fromAtoB = true;
  $sessionStorage.routeIdOfAtoB = $scope.wayPtRouteId;
  $sessionStorage.selectedTimeofAtoB = $scope.selectedBusTime;
  console.log("showBusDetail",$sessionStorage.showBusTimetable, $sessionStorage.selectedTimeofAtoB)
  $state.go("app.routetimetable");

},

  $scope.myGoBack=function(){
    console.log("Back Btn");
    $state.go('app.sourcetodestination')
  }
     var deregisterSecond = $ionicPlatform.registerBackButtonAction(
  		      function() {
    $state.go('app.sourcetodestination')
  		      }, 100
  		    );

  var _init = function () {
  
  }
  _init();


})