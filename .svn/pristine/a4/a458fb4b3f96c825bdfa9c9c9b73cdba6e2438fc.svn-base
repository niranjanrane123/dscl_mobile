angular.module('starter')
 .controller('LandingPageCtrl', function ($scope, $ionicSlideBoxDelegate, $location,$ionicHistory, RestService, $ionicLoading, $stateParams, toaster, $filter, ENV, dateFilter,
	  $state, $ionicSideMenuDelegate,$translate, $localStorage,$ionicPlatform,localStorageService,$ionicPopup,$window,$sessionStorage,$rootScope,$cordovaGeolocation) {
	  
        $scope.myText = '';
        $scope.lid;
        $scope.totalAppCount;
        $scope.totalBMPSCount;
        var options = { timeout: 10000, enableHighAccuracy: true };
        

        $scope.dashBoardURL = RestService.dashBoardUrl;
       $scope.portalURL = ENV.portalURL + '/CitizenHome.html';
        // Manage back press
        $localStorage.selectedorgID = "1"
       
          $localStorage.defaultVal = 'Y';

// Enhancement #193178
          /* RestService.getMDDALid().then(function (response) {
            $ionicLoading.show();
            console.log("lid response="+ JSON.stringify(response));        
            if (response == undefined || response == null || response == "") {
              $ionicLoading.hide();
              return false;
            }
            var lidData = response.data;
            // var lidData= response;
            console.log("***get Lid" + lidData);       
           $scope.lid = lidData.lid;

           RestService.getMDDAProjectSummary($scope.lid).then(function (response1) {
         
            console.log("summary response="+ JSON.stringify(response1));        
            if (response1 == undefined || response1 == null || response1 == "") {
              $ionicLoading.hide();
              return false;
            }

            
                var respData = response1.data;
                var ct = respData.length;
                $scope.totalAppCount = ct;
                $scope.totalBMPSCount = ct;
              // console.log("total count="+$scope.totalCount);
            $sessionStorage.mddaSummaryData = respData;
            // $state.go('app.mdda-project'); 
            $ionicLoading.hide();
          }, function (err) {
            //toaster.error($filter('translate')('MDDAERROR'));
            console.log("Error in MDDA", err)
            toaster.error($filter('translate')('MDDATHIRDPARTYERROR'));
            $ionicLoading.hide();
          })
            $ionicLoading.hide();
          }, function (err) {
            //toaster.error($filter('translate')('MDDAERROR'));
            console.log("Error in MDDA", err)
            toaster.error($filter('translate')('MDDAACCESSFAILED'));  //Defect: #187848
            $ionicLoading.hide();
          })  */


        var deregisterSecond = $ionicPlatform.registerBackButtonAction(
            function () {
      
              var confirmPopup = $ionicPopup.show({
      
                title: $filter('translate')('message'),
                template: $filter('translate')('AREYOUSUREEXIT'),
      
                buttons: [{
                  text: $filter('translate')('CANCEL'),
                  type: 'button button-block  customBgColor',
                },
                {
                  text: $filter('translate')('OK'),
                  type: 'button button-block  customBgColor',
      
                  onTap: function () {
                    $localStorage.$reset();
                    $window.localStorage.clear();
                    $ionicHistory.clearCache();
                    $ionicHistory.clearHistory();
                    $localStorage.langID = "2";
                    $localStorage.english = false;
                    ionic.Platform.exitApp();
                  }
                }]
              });
            }, 100
          );
          $scope.$on('$destroy', deregisterSecond);
        
        // Called each time the slide changes
        $scope.slideChanged = function(index) {
            $scope.slideIndex = index;
        };

        // Open Login Screen
        $scope.openLogin = function(typeLogin) {
          $sessionStorage.comeFrom =  typeLogin;
           $state.go('app.LoginPage');
       };

        //for new complaint form
        $scope.openComplaint = function(){
          console.log('new complaint called');
          $state.go('app.complaintRegistration');
        }

        //for new complaint status  
        $sessionStorage.withoutLogin = false;      
        $scope.openComplaintStatus = function(){
          console.log('new complaint status called');
          $sessionStorage.withoutLogin = true;
          $state.go('app.complaintstatus');
        }

        //for donation service
        $sessionStorage.donationFlag = false;
        $sessionStorage.fromLandingPage = true;
        $scope.openDonation = function(){
          $sessionStorage.donationFlag = true;
          console.log('donation service called');
          $state.go('app.complaintRegistration');
        }
        
        // Ongoing project view all
        $scope.viewAll = function() {
            $sessionStorage.comeFrom =  "OnGoingProjects";
            $state.go('app.OnGoingProjects');
        };

        // Ongoing project view all
        $scope.viewAllPopular = function() {
            $sessionStorage.comeFrom =  "PopularPlaces";
            $state.go('app.OnGoingProjects');
        };
        
        // Open Links 
        $scope.openLink = function(comeFrom)
        {
             $sessionStorage.comeFrom = comeFrom;
             $sessionStorage.comeFromPage = 'Landing'; 
             $state.go('app.OpenLink');
                
        }

        $scope.openService=function(comeFrom){
        console.log("comfo.",comeFrom)
        $sessionStorage.comeFrom=comeFrom
        $state.go('app.subHome')
    }

// Enhancement #193178
        // Mdda
        /* $scope.mddaProject = function(comeFrom)
        {
             $sessionStorage.comeFrom = comeFrom;
             $state.go('app.mdda-project');
                
        } */

        // Language change
        if($localStorage.langID=="2"){
            $scope.myText = 'English';
           }else{
           $scope.myText = 'Hindi';
           }
       if($localStorage.langID=="2"){
             $localStorage.langNewId = "2";
           }else{
            $localStorage.langNewId = "1";
           }
       

        $scope.changeText = function(value) {
            if(value === "Hindi"){
                $translate.use("2");
                $localStorage.langID = "2";
                $localStorage.english = true;
                $localStorage.langNewId = "2";
                console.log("langId:"+ $localStorage.langNewId)
                $scope.myText = 'English';
                $scope.lang = '1';
                _init();
             }else{
                 $translate.use("1");
                 $localStorage.langID = "1";
                 $localStorage.english = false;
                 $localStorage.langNewId = "1";
                 console.log("langId:"+ $localStorage.langNewId)
                 $scope.myText = 'Hindi';
                  $scope.lang = '2'
                 _init();
             }
           };

          $scope.goToWhatsApp = function () {
            if($scope.isAndroid){
              window.open(encodeURI(RestService.whatsappUrl), '_system', 'location=no,toolbar=yes,useWideViewPort=yes');
            } else {
              window.location.href=RestService.whatsappUrl;    // For iOS
            }
          }

          $scope.callSOS = function(){
            toaster.success($filter('translate')('KINDLYLOGIN'));
          }
       

           /*in app browser loader start n stop*/
    $rootScope.inappbrowserlinnk = function (link) {

      console.log("link2 " + link);
      var inAppBrowserbRef = null;

      inAppBrowserbRef = window.open(encodeURI(link), '_blank', 'location=no,toolbar=no');

      inAppBrowserbRef.addEventListener('loadstart', inAppBrowserbLoadStart);
      inAppBrowserbRef.addEventListener('loadstop', inAppBrowserbLoadStop);
      inAppBrowserbRef.addEventListener('loaderror', inAppBrowserbLoadError);
      inAppBrowserbRef.addEventListener('exit', inAppBrowserbClose);

      function inAppBrowserbLoadStart(event) {
        navigator.notification.activityStart("Please Wait", "Its loading....");
      }

      function inAppBrowserbLoadStop(event) {
        navigator.notification.activityStop();
      }

      function inAppBrowserbLoadError(event) {
        navigator.notification.activityStop();
      }

      function inAppBrowserbClose(event) {
        inAppBrowserbRef.removeEventListener('loadstart', iabLoadStart);
        inAppBrowserbRef.removeEventListener('loadstop', iabLoadStop);
        inAppBrowserbRef.removeEventListener('loaderror', iabLoadError);
        inAppBrowserbRef.removeEventListener('exit', iabClose);
      }
    }

    $scope.callService =function(service){
      $rootScope.callService(service)
    }

    var _init = function (){

      // let code=['M','DM','CO','DC']
      // RestService.getMemberProfileDetails(code,1).then(function(response){
      //     console.log(response)
      // },function(err){
      //   console.log("error",err)
      // }) 
$scope.lang = $localStorage.langNewId
console.log("langid",$scope.lang )
const codes = ['M', 'DM', 'CO', 'DC'];
$scope.memberDetails = [];

Promise.all(
  codes.map(code => RestService.getMemberProfileDetails(code, 1))
).then(responses => {
  responses.forEach((response, index) => {
    console.log(`Response for code ${codes[index]}:`, response);
    $scope.memberDetails = $scope.memberDetails.concat(response);
  });
  console.log("Final $scope.memberDetails:", $scope.memberDetails);
   $scope.memberDetailsGrouped = [];
  for (let i = 0; i < $scope.memberDetails.length; i += 2) {
    $scope.memberDetailsGrouped.push($scope.memberDetails.slice(i, i + 2));
  }
  if (!$scope.$$phase) {
    $scope.$apply();
  }
}).catch(err => {
  console.error('Error fetching details:', err);
});



      if ($rootScope.swmAccessToken == null) {
        RestService.getAccessToken().then(function (data) {
          $rootScope.swmAccessTokenData = data.access_token;
        },
          function (err) {
            console.log("Error in Access Token",err)
            toaster.error($filter('translate')('ACCESSTOKENFAILED'));
          })

      }

      // Get Location access

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
      var fail = function (error) {
        console.log('code: In landing page' + error.code + '\n' +
          'message: ' + error.message + '\n' , 'In landing page ');
      }

      navigator.geolocation.getCurrentPosition(geoSuccess, fail);


      $cordovaGeolocation.getCurrentPosition(options).then(function (position) {
        console.log(position.coords.latitude);
        console.log(position.coords.longitude);
        $scope.latitude = position.coords.latitude;
        $scope.longitude = position.coords.longitude;
        // $scope.latitude = 30.324802749865817;
        // $scope.longitude = 78.05172949609957;
        $sessionStorage.lat = $scope.latitude;
        $sessionStorage.long = $scope.longitude;
        console.log("lat=", $sessionStorage.lat);
        console.log("log=",$sessionStorage.long);
        //for testing
        //  $scope.lat = 30.3255646;
        // $scope.long = 78.0436813;
        // $sessionStorage.lat = $scope.lat;
        // $sessionStorage.long = $scope.long;
        // console.log("lat= near by js", $scope.lat);
        // console.log("log= near by js", $scope.long);

      }, function (error) {
        console.log("Could not get location",error);
      });
    }

    _init();

  })