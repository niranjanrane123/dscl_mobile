angular.module('starter')
  .controller('applicationStatusDetailCTRL', function ($scope, RestService, $ionicLoading, $stateParams, toaster, $filter, ENV,$ionicHistory,
		  $state,$localStorage,$sessionStorage,$ionicModal,$ionicPopup) {
$scope.langID = $localStorage.langID;
$scope.actionTable = false;
console.log('$scope.langID', $scope.langID);
if($scope.langID == 1){
	$scope.organizationName = $sessionStorage.statusResponse.organizationName;
	$scope.serviceName = $sessionStorage.statusResponse.serviceName;
  } else{
	$scope.organizationName = $sessionStorage.statusResponse.organizationNameReg;
	$scope.serviceName = $sessionStorage.statusResponse.serviceNameReg;
  }
$scope.applicationNumber = $sessionStorage.statusResponse.applicationId;
$scope.applicationDate = $sessionStorage.statusResponse.formattedDate;
$scope.status = $sessionStorage.statusResponse.status;


var actionList = $sessionStorage.statusResponse.actions;

if(actionList.length >= 0){

	$scope.actionListDetailsList = [];
	for(var i=0;i<actionList.length;i++){
		$scope.actionListDetailsList.push({
			datetime : actionList[i].dateOfAction,
			action : actionList[i].decision,
			empName: actionList[i].empName,
			comments : actionList[i].comments,
		})
	}
		$scope.actionTable = true;
		$ionicLoading.hide();
}

$scope.homepage = function()
{
	 $ionicHistory.nextViewOptions({
         disableBack: true,
         disableAnimate: true,
         historyRoot: true
     });

	$state.go("app.home");
}

    var _init = function (){

    };
    _init();
  });
