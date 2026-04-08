
var datePicker = angular.module('starter');
datePicker.controller('EstateBookPropDetailCtrl', function ($scope, RestService, $ionicLoading, $stateParams, toaster, $filter,
 ENV, $state, $rootScope,$stateParams,$localStorage,$sessionStorage){
	var disabledDates = [];
	disabledDates = JSON.parse($stateParams.disabledDates);
	console.log("$scope.disabledDates: "+JSON.stringify(disabledDates));

	$scope.langId = "1";
//	$scope.orgId = $localStorage.responselogindata.orgId;
	$scope.orgId = $localStorage.selectedorgID;
	$scope.userId = $localStorage.responselogindata.userId;
	$sessionStorage.rnlServiceCode = "ESR";
	/*$scope.data.fromDate = "";
	$scope.data.toDate = "";*/
	/*Retrieving Dropdown Data Start*/
	$rootScope.getNonHData("TTL","ttlList",$scope.orgId);
	$rootScope.getNonHData("GEN","genList",$scope.orgId);
	$rootScope.getNonHData("SHF","shfList",$scope.orgId);
	$rootScope.getNonHData("CAA","chargeApplList",$scope.orgId);


	$scope.rnlNewRatestartDate= new Date($sessionStorage.currentDate).getTime();
	/*Retrieving Dropdown Data End*/
	/*Retrieve Property Details*/
	$scope.propDetails = JSON.parse($stateParams.response);
	$sessionStorage.rnlPropertyInfoDtoData = $scope.propDetails;
	console.log("$scope.propDetails: "+JSON.stringify($scope.propDetails));
	if($scope.propDetails.propId > 0){
		$scope.RNLEstateCode = $scope.propDetails.estateCode;
		$scope.RNLEstateName = $scope.propDetails.estateName;
		$scope.RNLPropertyNo = $scope.propDetails.propertyNo;
		$scope.RNLPropName = $scope.propDetails.propName;
		$scope.RNLUnitNo = $scope.propDetails.unit;
		$scope.RNLOccType = $scope.propDetails.occupancy;
		$scope.RNLUsage = $scope.propDetails.usage;
		$scope.RNLFloor = $scope.propDetails.floor;
		$scope.RNLTotalArea = $scope.propDetails.totalArea;
	}
	/*Retrieve Property Details*/

	$scope.propnext = function()
	{
		$state.go("app.estateBookapplicantInfo",{response:JSON.stringify($scope.propDetails),"disabledDates":JSON.stringify(disabledDates)});
	}

	{}
	var _init = function (){
	};
	_init();
});
