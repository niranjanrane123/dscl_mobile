angular.module('starter')
  .controller('nidanApplicationDetailCTRL', function ($scope, RestService, $ionicLoading, $stateParams,
		  toaster, $filter, ENV, $state,$localStorage,$sessionStorage,$rootScope) {

$sessionStorage.userID = "01";                            //by sanket
$scope.saveApplicantDetail = function()
{
    	$ionicLoading.show({	template:$filter('translate')('LOADING')	});
    var applicantDTO ={
 		 	    fName: $scope.nidanFirstname,
 		      mName: $scope.nidanMiddlename,
 		      lName: $scope.nidanLastname,
 		      mobileNo: $scope.nidanmobile,
 		      phone: null,
 		      email: $scope.nidanemailid,
 		      orgId: null,
 		      deptId: null,
 		      empId: null,
 		      applicationId: null,
 		      challanNo: null,
 		      txnId: null,
 		      licenseNo: null,
 		      serviceId: null,
 		      userId: $sessionStorage.userID,
 		      langId: 1,
 		      payStatus: null,
 		      payAmount: null,
 		      macId: null,
 		      updatedBy: null,
 		      serviceShortCode: null,
 		      tenant: null,
 		      documentList: null,
 		      dirPath: null,
 		      titleId: $scope.nidantitle,
 		      blockNo: null,
 		      floor: null,
 		      wing: null,
 		      bldgName: "",
 		      houseComplexName: null,
 		      roadName: null,
 		      areaName: $scope.nidanAreName,
 		      pincodeNo: $scope.nidanPincode,
 		      applicationType: null,
 		      phone1: null,
 		      phone2: null,
 		      wardNo: null,
 		      bplNo: null,
 		      gender: $scope.nidangender,
 		      aadhaarNo: null,
 		      zoneNo: null,
 		      blockName: null,
 		      flatBuildingNo: "",
 		      cityName: $scope.nidanVillage,
 		      uid: null,
 		      free: false
  	}
    $sessionStorage.applicantDTO = applicantDTO;
    console.log("SApplicantDTO----"+JSON.stringify($sessionStorage.applicantDTO));
//$state.go("app.nidanComplaintRegister");
      	 /*DISTRICT LIST */
        	var lookUpCode = "DIS";
    		RestService.getNHPrefixData(lookUpCode,'0').then(function (response){
    			console.log("District list--"+response);
    			if(response==undefined || response == null || response=="")
    				{
    					$ionicLoading.hide();
    					return false;
    				}
    			else
    				{
    					$sessionStorage.districtResponse = response;
//    			alert("districtResponse----"+JSON.stringify($sessionStorage.districtResponse));
//    					$state.go("app.nidanApplicationDetail")
            $state.go("app.nidanComplaintRegister");
    					$ionicLoading.hide();
    				}
    			$ionicLoading.hide();
    		},function (err) {
    			toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR'));
    			$ionicLoading.hide();
    		})

}

var _init = function()
{
$ionicLoading.show({			template: $filter('translate')('LOADING')	});
    $rootScope.getNonHData("GEN","genoptions",0);
		$rootScope.getNonHData("TTL","ttloptions",0);
$ionicLoading.hide();
}

_init();

});
