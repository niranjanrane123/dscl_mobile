
angular.module('starter')

  .controller('subHomeCtrl', function ($rootScope, ENV, $scope, $filter, RestService, $ionicLoading, $state, toaster, $stateParams, $ionicHistory,
    $ionicNavBarDelegate, $ionicPlatform, $ionicSideMenuDelegate ,$localStorage, $window, $document,$sessionStorage, $ionicPopup, $cordovaBarcodeScanner,$cordovaGeolocation) {
		console.log("sube home",)

		     
      $scope.AccessToken = function(){      
          RestService.getAccessToken().then(function (data) {
            $rootScope.swmAccessTokenData = data.access_token;
            console.log($rootScope.swmAccessTokenData,"rrot scope toke")
            console.log(data.access_token,"data toke")
		  })
      }
 $scope.AccessToken()
		$scope.openCompliant=function(){
			console.log("in home",$scope.isLoggedIn)
			if($scope.isLoggedIn){
				$state.go("app.complaintrefrence")
			}else{
				$state.go('app.complaintRegistration');
			}
		}
		$scope.callEbus=function(){
			   RestService.getAccessToken().then(function (data) {
            $rootScope.swmAccessTokenData = data.access_token;

			$state.go('app.itshome')
		}, function (error) {
			console.error("Error fetching access token:", error);
			// toaster.pop('error', 'Error', 'Failed to fetch access token for E-Bus service.');
		})
	}
	function onSuccess(result){
  console.log("Success:"+result);
}
function onError(result) {
  console.log("Error:"+result);
}
	$scope.callNumber=function(number){
    $scope.number = number;
    window.plugins.CallNumber.callNumber(onSuccess, onError, $scope.number, false);
}
$scope.ebusComplaint=function(){
			if($scope.isLoggedIn){
				$sessionStorage.eBusFeedback="E-bus";
				$state.go("app.feedback")
			}else{
				let msg=$filter('translate')('LOGEDINMSG')
				$rootScope.loginPopUp(msg);
			}
		}
$sessionStorage.ebusService=null;
$sessionStorage.ebusService =null
$scope.callService=function(service){
	 $scope.AccessToken()
	$sessionStorage.ebusService=service;
	$state.go("app.eBusTTandPrice")
}

		
		$scope.openComplaintStatu=function(){

			if($scope.isLoggedIn){
				$state.go("app.complaintstatus")
			}else{
				$sessionStorage.withoutLogin = true;
				$state.go('app.complaintstatus')
			}
		}
		$scope.openReopen=function(){

			if($scope.isLoggedIn){
				$state.go("app.complaintstatus")
			}else{
				let msg=$filter('translate')('LOGEDINMSG')
				$rootScope.loginPopUp(msg);
			}
		}
		$scope.openRti=function(){
			if($scope.isLoggedIn){
				$state.go("app.rtiApplicantDetial")
			}else{
				let msg=$filter('translate')('LOGEDINMSG')
				$rootScope.loginPopUp(msg);
			}
		}
		$scope.rtiFirstappeal=function(){
			if($scope.isLoggedIn){
				$state.go("app.rtifirstappeal")
			}else{
				let msg=$filter('translate')('LOGEDINMSG')
				$rootScope.loginPopUp(msg);
			}
		}

		

$scope.popup = function(come) {
    let res, template, buttons;

    if (come === 'helpline') {
        res = $filter('translate')('EBUS');
        template = `${$filter('translate')('EBUSCALL')} : 18001802525`;
        buttons = [
            {
                text: $filter('translate')('CANCEL'),
                type: 'button-cancel'
            },
            {
                text: $filter('translate')('YES'),
                type: 'button-positive',
                onTap: function() {
                    $scope.callNumber('18001802525');
                }
            }
        ];
    } else {
        res = 'EBUS';
        template = $filter('translate')('COMMINGSOON');
        buttons = [
            {
                text: $filter('translate')('OK'),
                type: 'button-positive'
            }
        ];
    }

    $ionicPopup.confirm({
        title: $filter('translate')(res),
        template: template,
        buttons: buttons
    });
};

var deregisterSecond = $ionicPlatform.registerBackButtonAction(
      function () {
        $sessionStorage.eBusFeedback=null
		 if ($localStorage.responselogindata) {
          $state.go('app.home');
        } else {
          $state.go('app.LandingPage');
        }
    //   $state.go('app.LandingPage')
      }, 100
    );
	
 $scope.myGoBack = function() {
        // console.log("BACK",$ionicHistory.viewHistory())
        // $ionicHistory.goBack();
        if ($localStorage.responselogindata) {
          $state.go('app.home');
        } else {
          $state.go('app.LandingPage');
        }
      };

		var _init =function(){
			$scope.isLoggedIn = $localStorage.responselogindata ? true : false;
			$scope.complaintTask=false;
			$scope.RTItask=false;
			$scope.ebusPage=false
			console.log("in subHOm",$sessionStorage.comeFrom)
			let task =$sessionStorage.comeFrom
			if(task=='complaint'){
				$scope.complaintTask=true
			}else if(task=='RTI'){
				$scope.RTItask=true
			}else if(task=='ebus'){
				$scope.ebusPage=true
			}
		}


		_init()
	})