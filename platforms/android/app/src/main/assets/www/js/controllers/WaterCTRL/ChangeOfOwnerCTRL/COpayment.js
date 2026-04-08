angular.module('starter')

  .controller('COpaymentCTRL', function ($rootScope,$scope, $location, RestService, $ionicLoading, $stateParams, toaster,
		  $filter, ENV, dateFilter, $state, $localStorage,$sessionStorage) {

 console.log("$localStorage.responselogindata---"+JSON.stringify($localStorage.responselogindata));
//		$scope.orgid = $localStorage.responselogindata.orgId;
		$scope.orgid = $localStorage.selectedorgID;
		$scope.userID = $localStorage.responselogindata.userId;
		$scope.loginUSername = $localStorage.responselogindata.firstName;
		$scope.LoginMobileNo = $localStorage.responselogindata.mobileNo;
		$scope.emailId = $localStorage.responselogindata.emailId;
    $localStorage.langID = "1";
	  $scope.ServiceShortName = "WCO";
	 // $scope.waterBillSearch = false;
    $scope.serviceID;
	  $scope.usageSubtype3;
	  $scope.usageSubtype4;
	  $scope.usageSubtype5;
	  $scope.isOutStandingPending;
	  $scope.isExistingConnectionOrConsumerNo
	  $scope.isExistingProperty;
	  $scope.disConnectionType;
	  $scope.factor1;
	  $scope.factor2;
	  $scope.factor3;
	  $scope.factor4;

	  /*water rate master*/
	  	$scope.wrorgId;
		$scope.wrusageSubtype1;
		$scope.wrusageSubtype2;
		$scope.wrusageSubtype3;
		$scope.wrusageSubtype4;
		$scope.wrusageSubtype5;
		$scope.wrfactor1;
		$scope.wrfactor2;
		$scope.wrfactor3;
		$scope.wrfactor4;
		$scope.wrisBPL;
		$scope.wrServiceCode;
		$scope.wrDeptCode;
		$scope.wrTaxType;
		$scope.wrTaxCode;
		$scope.wrTaxCate;
		$scope.wrTaxSubCate;
		$scope.wrMeterType;
		$scope.wrChargeAppl;
		$scope.wrConnSize;
		$scope.wrConnType;
		$scope.wrRoadType;
		$scope.wrtransferMode;
		$scope.wrDisConnType;
		$scope.wrRatestartDate;
		$scope.wrNewRatestartDate;
		$scope.WNCConnSize;
		$scope.TaxType;
		$scope.TaxCode;
		$scope.TaxCategory;
		$scope.TaxSubcategory;
		$scope.FlatRate;
		var cosconnsizetext;
		var costariftext;
		var cospermisetext;
		$scope.selectfilename;
		$scope.newtransfermode;
		/*old data*/
		$scope.oldCOWconnName;
		$scope.oldtitle;
		$scope.oldconnNo;
		$scope.oldcsidn;
		$scope.oldCOUconnSize;
		$scope.oldcodDwzid1;
		$scope.oldcodDwzid2;
		$scope.oldCOUtarifCate;
		$scope.oldCOUpermiseType;
		$scope.oldCOUmetertype;
		$scope.oldCOUapplicantType;


//$scope.COSFlatRate = $sessionStorage.responseservicechargedata.responseObj[0].flatRate;
$scope.COSFlatRate = $sessionStorage.responseservicechargedata.responseObj[0].chargeAmount;
	 $scope.options = new Array();
		for(var i=0;i<$sessionStorage.Bankresponse.list.length;i++){
			$scope.options.push({
			id : $sessionStorage.Bankresponse.list[i].bankId,
			name : $sessionStorage.Bankresponse.list[i].cbbankname
		})
	}



$scope.changeownersavedata = function() {

	 /*if ($scope.COSFlatRate <= $scope.COUpaidamt) {
			alert("Paid Amount Should Not Be Greater Then Total Amount");
			return false;
		}
		else {*/

	$ionicLoading.show({
		template: $filter('translate')('LOADING')
			});
//console.log("documentObjectArray---"+JSON.stringify($sessionStorage.documentObjectArray));


//alert("$sessionStorage.title--"+$sessionStorage.title);
  var applicantinfo = {
      organizationName:null,
      applicantFirstName:$localStorage.responselogindata.firstName,
      applicantMiddleName:$localStorage.responselogindata.middleName,
      applicantLastName:$localStorage.responselogindata.lastName,
      gender:$localStorage.responselogindata.gender,
      mobileNo:$localStorage.responselogindata.mobileNo,
      emailId:$localStorage.responselogindata.emailId,
      pinCode:"",
      buildingName:"",
      roadName:"",
      applicantTitle:$localStorage.responselogindata.titleId,
  //	  applicantTitle:$sessionStorage.title,
      areaName:"",
      blockName:"",
      housingComplexName:null,
      wing:null,
      floorNo:null,
      phone1:null,
      phone2:null,
      contactPersonName:null,
      villageTownSub:"",
      cfcCitizenId:null,
      povertyLine:null,
      orgId:$localStorage.responselogindata.orgId,
      langId:1,
      userId:$localStorage.responselogindata.userId,
      bplNo:$sessionStorage.wrisBPLno,
      flatBuildingNo:"",
      codTryId1:null,
      codTryId2:null,
      codTryId3:null,
      codTryId4:null,
      codTryId5:null,
      aadharNo:"",
      dwzid1:0,
      dwzid2:0,
      dwzid3:null,
      dwzid4:null,
      dwzid5:null,
      isBPL:"N"
  }

	RestService.changeofownersaveservice($sessionStorage.WNCselecttitle,$sessionStorage.WNCFirstname,$sessionStorage.WNCMiddlename,$sessionStorage.WNCLastname,
		$sessionStorage.COURemarks,$sessionStorage.changeowner,$sessionStorage.WNCgender,$sessionStorage.oldCOWconnName,$sessionStorage.oldtitle,$sessionStorage.oldconnNo,$sessionStorage.CSidn,
		$sessionStorage.oldCOUconnSize,$sessionStorage.oldcodDwzid1,$sessionStorage.oldcodDwzid2,$sessionStorage.oldCOUtarifCate,$sessionStorage.oldCOUpermiseType,
		$sessionStorage.oldCOUmetertype,$sessionStorage.oldCOUapplicantType,$sessionStorage.newtransfermode,$sessionStorage.documentObjectArray,
		$scope.orgid,$scope.userID,applicantinfo,$sessionStorage.canApplyOrNot,$localStorage.macAddress)
		.then(function(COWresponse){
			console.log("COWresponse.status--->"+COWresponse);
			if(COWresponse.status == "success"){
				$scope.applictNo = COWresponse.applicationNo;
					$ionicLoading.show({	template: $filter('translate')('LOADING')});
//						RestService.savePayReqWCU($scope.serviceID,$scope.COSFlatRate,$scope.COUpaymettype,$scope.applictNo,$sessionStorage.CSidn,$scope.orgid,
//							$scope.userID,$scope.loginUSername,$scope.LoginMobileNo,$scope.ServiceShortName,$localStorage.responselogindata.emailId,"Change of Owner",
//							$scope.serviceID.toString(),$scope.ServiceShortName,$scope.bankList)
          $scope.feesId = {
            1 : $scope.COSFlatRate
          }
          RestService.savePayReqWCU($scope.orgid,$scope.userID,$localStorage.langID,$localStorage.responselogindata.emailId,$scope.loginUSername,$scope.LoginMobileNo,$scope.ServiceShortName,
          $scope.applictNo,$scope.COSFlatRate,$scope.COUpaymettype,$scope.applictNo,"Y","N",false,null,$scope.feesId)
							.then(function (response) {

								if(response.status == "pending"){
									$ionicLoading.hide();
									var H= null;
									H = window.open(encodeURI(response.payRequestMsg), '_blank',
									'location=no,closebuttoncaption=Back,hardwareback=yes,fullscreen=yes,zoom=yes,toolbarposition=top,enableviewportscale=yes');
									H.addEventListener('exit', iabClose);
									H.addEventListener('loadstop', iabClose1);
								function iabClose(event)
								{
									H.removeEventListener('exit', iabClose);
									$state.go("app.WaterModule");
								}
							function iabClose1(event){
								if (event.url.match("mobile/close")) {
										H.close();
										H.removeEventListener('loadstop', iabClose1);
										$state.go("app.WaterModule");
									}
								}
							}
						else{
								toaster.error($filter('translate')('ERROR'), $filter('translate')('WRONG_CONN_NUMBER'));
							}
							$ionicLoading.hide();
					}, function (err) {
						toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR_OCCURED'));
						$ionicLoading.hide();
					})
						$ionicLoading.hide();
				}
			 else{
					$rootScope.simpleAlert("Your Application for Change of Ownership has been Not Saved.");
					$ionicLoading.hide();
				}
			},function (err) {
				toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR'));
				$ionicLoading.hide();
			})
//		}
  };


	    var _init = function (){
        RestService.getServiceId($scope.orgid,"WCO").then(function (response){
          console.log("response"+ response)
          $scope.serviceID = response;
        }, function (err) {	$ionicLoading.hide();	})

				RestService.getPayOpt($scope.orgid,$scope.userID).then(function (response) {
					console.log("bankresponse--->"+response);
					$sessionStorage.Bankresponse = response;
				$ionicLoading.hide();
					}, function (err) {	$ionicLoading.hide();	})
		  }

		  _init();
  })
