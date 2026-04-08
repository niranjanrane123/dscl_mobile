
var datePicker = angular.module('starter');
datePicker.controller('EstateBookAppInfoCtrl', function ($scope, RestService, $ionicLoading, $stateParams,
		toaster, $filter, ENV, $state, $rootScope,$stateParams,$localStorage,$sessionStorage){
	var disabledDates = [];
	disabledDates = JSON.parse($stateParams.disabledDates);
	console.log("$scope.disabledDates: "+JSON.stringify(disabledDates));
	$scope.data = {};
	$scope.povertyLine=[{
        value:"Y",
        name:"Yes"
    },{
        value:"N",
         name:"No"
   }];
   $scope.isOrganizationEmploy=[{
           value:"Y",
           name:"Yes"
       },{
           value:"N",
            name:"No"
      }];
	$scope.data = {
		RNLTitle:'',
		RNLFName:'',
		RNLMName:'',
		RNLLName:'',
		RNLGender:'',
		RNLMobile:'',
		RNLEmail:'',
		RNLAadhar:'',
		RNLPan:'',
		RNLFlatNo:'',
		RNLBuilding:'',
		RNLRoad:'',
		RNLBlock:'',
		RNLArea:'',
		RNLVillage:'',
		RNLPinCode:'',
		povertyLineValue: '',
		bplNo: '',
		isEmploy: ''
	/*	fromDate:'',
		toDate:'',
		RNLShift:'',
		RNLPurpose:''*/
	};
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

	/*Map User Details in Form*/
	$scope.$watch('genList', function (newValue, oldValue, $scope) {
		$scope.data.RNLTitle = $localStorage.responselogindata.title;
		$scope.data.RNLGender = $localStorage.responselogindata.genderId;
	});

	$scope.data.RNLFName = $localStorage.responselogindata.firstName;
	$scope.data.RNLMName = $localStorage.responselogindata.middleName;
	$scope.data.RNLLName = $localStorage.responselogindata.lastName;
	$scope.data.RNLMobile = $localStorage.responselogindata.mobileNo;
	$scope.data.RNLEmail = $localStorage.responselogindata.emailId;
	$scope.data.RNLAadhar = $localStorage.responselogindata.addhaarNo;

	$scope.propDetails = JSON.parse($stateParams.response);
	console.log("$scope.propDetails: "+JSON.stringify($scope.propDetails));
	console.log("$scope.propDetails.propId: "+JSON.stringify($scope.propDetails.propId));

	/*Map User Details in Form*/
//   $scope.changePoverty = function(){
//      if($scope.data_.povertyLineValue == "Y"){
//        $scope.belowPoverty = true;
//        $localStorage.belowPovertycheck = $scope.belowPoverty ;
//      }else{
//        $scope.belowPoverty = false;
//        $localStorage.belowPovertycheck = $scope.belowPoverty
//      }
//   }
	$scope.appInfonext = function()
	{
		console.log("$scope.data--->"+JSON.stringify($scope.data));
		$sessionStorage.detaildata = $scope.data;
		console.log("$sessionStorage.detaildata-->"+JSON.stringify($sessionStorage.detaildata));
		$state.go("app.estateBookedDetail",{response:JSON.stringify($scope.propDetails),"disabledDates":JSON.stringify(disabledDates)});
  }

	var _init = function (){
	};
	_init();
});
