angular.module('starter')
 .controller('reopenCtrl', function ($scope, RestService, $ionicLoading, $stateParams,
		  toaster, $filter, ENV, $state, $localStorage,$sessionStorage,$ionicPopup,$ionicModal) {

	$scope.orgid = $localStorage.selectedorgID;
	$scope.userID = $localStorage.responselogindata.userId;
	$scope.loginUSername = $localStorage.responselogindata.firstName;
	$scope.LoginMobileNo = $localStorage.responselogindata.mobileNo;
	 $scope.langID=$localStorage.langID;
$scope.content = "New Complaint";

/* data for reopen  */
console.log("allgrievance--only--approved-->"+JSON.stringify($sessionStorage.allgrievanceresponse));
$scope.allgrievanceresponse = $sessionStorage.allgrievanceresponse;

$scope.SelectedTask = null;

$scope.setSelected = function (SelectedTask) {
	console.log("--SelectedTask--"+SelectedTask+ "$localStorage.langID--"+$localStorage.langID);
	$scope.SelectedTask = SelectedTask;
	if($localStorage.langID == "2"){
                 $ionicLoading.show({ template: 'लोड हो रहा है...'    });
               }else{
                 $ionicLoading.show({ template: 'Loading...'    });
               }
               
    RestService.actionHistorybyDocID($scope.SelectedTask,$localStorage.langID).then(function (actionhistoryresponse){
		console.log("actionResponse--"+JSON.stringify(actionhistoryresponse));
		if(actionhistoryresponse==undefined || actionhistoryresponse == null || actionhistoryresponse=="")
		  {
          $ionicLoading.hide();
		  	  return false;
		  }
		  
		  else
		  {
			  $sessionStorage.SelectedTask = SelectedTask;
			  $sessionStorage.actionhistoryresponse = actionhistoryresponse;
				  $state.go("app.reopentokenpage")
			  $ionicLoading.hide();
		  }
		$ionicLoading.hide();
	},
	function(err){
		$ionicLoading.hide();
		toaster.error($filter('translate')('REOPENCOMPLAINTERROR')/* , $filter('translate')('ERROR') */);
	})
}
    var _init = function(){ };
    _init();

  });
