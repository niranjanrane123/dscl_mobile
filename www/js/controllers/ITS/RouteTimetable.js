angular.module('starter')
  .controller('routeTimetableCtrl', function ($scope, RestService, $ionicLoading, $stateParams, toaster, $filter, ENV, $ionicHistory,
    $state, $localStorage, $sessionStorage, $ionicModal, $ionicPopup, $timeout, $ionicScrollDelegate, $ionicPlatform,$rootScope) {

      console.log("Entered Route Timetable", $sessionStorage.routeId)
      console.log("From A to B", $sessionStorage.fromAtoB, $sessionStorage.fromByRoute)

      $scope.heading = $filter('translate')('EBUSTIMETABLE');
      
      $scope.sourceStop = $sessionStorage.sourceStop;
      $scope.destinationStop = $sessionStorage.destinationStop;
        
      // if($sessionStorage.fromAtoB == true){
        $scope.ByRoute = false;
        $scope.routeId = $sessionStorage.routeIdOfAtoB;
        $scope.currentTime = $sessionStorage.selectedTimeofAtoB;
        //$sessionStorage.fromAtoB = false;
      // } else if ($sessionStorage.fromByRoute == true){
      //   $scope.ByRoute = true;
      //   $scope.routeId = $sessionStorage.routeId;
      //   $scope.currentTime = $sessionStorage.selectedTiming;
      //   //$sessionStorage.fromByRoute = false;
      // }


      
      $scope.AccessToken = function(type){
        console.log('$rootScope.swmAccessToken' + $rootScope.swmAccessToken, type)
      
          RestService.getAccessToken().then(function (data) {
            $rootScope.swmAccessTokenData = data.access_token;
            console.log($rootScope.swmAccessToken,"rrot scope toke")
            console.log(data.access_token,"data toke")

            if(type == 'timetable'){
              console.log("Entered waypt");
 
              $scope.getTimeTableDetails($rootScope.swmAccessTokenData);
            }
          },
            function (err) {
              toaster.error($filter('translate')('ACCESSTOKENFAILED'));
            })
      }






      $scope.getTimeTableDetails=function(token){
        var params = {
          "routeId": $scope.routeId,
          "time": $sessionStorage.selectedBusTime
        }
        RestService.timeTableDetails(params,token).then(function (response) {
          //console.log("Response from Timetable", response, response.data.routeDetails.length, response.data.routeTimings.length)

          if (response == undefined || response == null || response == "") {
            toaster.error($filter('translate')('ERROR'), $filter('translate')('BUSROUTEERROR'));
            $ionicLoading.hide();
          } else {
            var stopNameList = new Array();
            stopNameList = response.data.routeDetails;
            if(response.data.status == false){
              toaster.error(resp.data.message);
              $ionicLoading.hide()
            } else {
                
     			 if($sessionStorage.fromAtoB == true){
               for(var i=0; i<stopNameList.length; i++){
                if($scope.sourceStop==stopNameList[i].StopName ){
                  $scope.sourceStopTime = stopNameList[i].arrivalTime
                  console.log("$scope.sor"  ,$scope.sor=stopNameList[i].StopName, $scope.sourceStopTime)
                }
                if($scope.destinationStop==stopNameList[i].StopName){
                  $scope.destinationStopTime = stopNameList[i].arrivalTime;
                  console.log("$scope.destinationStop"  ,$scope.Dest=stopNameList[i].StopName, $scope.destinationStopTime)
                }

               }
              }else{
              $scope.ByRoute = true;
              $scope.routeDetailsData = response.data.routeDetails;
              $scope.routetimingsData = response.data.routeTimings;
              console.log("Time table",$scope.routetimingsData,$scope.routeDetailsData)
              $ionicLoading.hide();
            }
            }

          }
          $ionicLoading.hide();
        },
          function (err) {
            if (err.status == 401){
              $scope.AccessToken('timetable');
              console.log("if got true in err timetble");
            } 
            //toaster.error($filter('translate')('BUSROUTEERROR')/* , $filter('translate')('ERROR') */);
            console.log("Error in Bus Route",err)
            // toaster.error($filter('translate')('EBUSTHIRDPARTYERROR'));
            $ionicLoading.hide();
          })

      }

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

        init: function () {
          if($localStorage.langID == "2"){
            $ionicLoading.show({ template: 'लोड हो रहा है...'    });
          }else{
            $ionicLoading.show({ template: 'Loading...'    });
          }
          var token = $rootScope.swmAccessTokenData;
          $scope.getTimeTableDetails(token);
         
        },
      };

      $scope.$on('$ionicView.beforeEnter', function () {
        var view = $scope.view;
        view.reset();
        view.init();
      });

        $scope.myGoBack=function(){
    console.log("Back Btn");
    $state.go('app.atobroutedetails')
  }
     var deregisterSecond = $ionicPlatform.registerBackButtonAction(
  		      function() {
    $state.go('app.atobroutedetails')
  		      }, 100
  		    );

      // $scope.myGoBack=function(){
      //   if($sessionStorage.fromAtoB == true){
      //     console.log("Back Btn")
      //     $sessionStorage.fromAtoB = false;
      //     $state.go('app.atobroutedetails')
      //     //$state.go('app.atobmap')
      //   } else {
      //     $sessionStorage.fromByRoute = false;
      //     $state.go('app.itshome')
      //   }
      // }

  
  })