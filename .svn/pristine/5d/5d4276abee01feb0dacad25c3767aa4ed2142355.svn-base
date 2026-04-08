angular.module('starter')
 .controller('LandingPageCtrl', function ($scope, $ionicSlideBoxDelegate, $location,$ionicHistory, RestService, $ionicLoading, $stateParams, toaster, $filter, ENV, dateFilter,
	  $state, $ionicSideMenuDelegate,$translate, $localStorage,$ionicPlatform,localStorageService,$ionicPopup,$window,$sessionStorage,$rootScope) {
	  
        $scope.myText = '';
        $scope.lid;
        $scope.totalAppCount;
        $scope.totalBMPSCount;

        $scope.dashBoardURL = RestService.dashBoardUrl;
       $scope.portalURL = ENV.portalURL + '/CitizenHome.html';
        // Manage back press
        $localStorage.selectedorgID = "1"
       
          $localStorage.defaultVal = 'Y';


          RestService.getMDDALid().then(function (response) {
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
            toaster.error($filter('translate')('MDDAERROR'));
            $ionicLoading.hide();
          })
            $ionicLoading.hide();
          }, function (err) {
            toaster.error($filter('translate')('MDDAERROR'));
            $ionicLoading.hide();
          }) 


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
             $state.go('app.OpenLink');
                
        }

        // Mdda
        $scope.mddaProject = function(comeFrom)
        {
             $sessionStorage.comeFrom = comeFrom;
             $state.go('app.mdda-project');
                
        }

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
                _init();
             }else{
                 $translate.use("1");
                 $localStorage.langID = "1";
                 $localStorage.english = false;
                 $localStorage.langNewId = "1";
                 console.log("langId:"+ $localStorage.langNewId)
                 $scope.myText = 'Hindi';
                 _init();
             }
           };
       

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

    var _init = function (){
     
    }
    // _init();

      })