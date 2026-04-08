angular.module('starter')

  .controller('PaymentPageCTRL', function ($scope, $location, RestService, $ionicLoading, $stateParams, toaster,
		  $filter, ENV, dateFilter, $state, $localStorage,$sessionStorage,$ionicPopup) {
/*declare start*/
	//console.log("$localStorage.responselogindata---"+JSON.stringify($localStorage.responselogindata));
/*	$scope.orgid = "81";
	$scope.userID = "10";
	$scope.loginUSername = "Dharti";
	$scope.LoginMobileNo = "4687987974";*/
	$scope.data={
		finalAppName:'',
		finalAppMobile:'',
		finalAppEmail:'',
		paymentType:'',
	};
//	$scope.orgId = $localStorage.responselogindata.orgId;
	$scope.orgId = $localStorage.selectedorgID;
	$scope.userID = $localStorage.responselogindata.userId;
	$scope.data.finalAppName = $localStorage.responselogindata.firstName;
	$scope.data.finalAppMobile = $localStorage.responselogindata.mobileNo;
	$scope.data.finalAppEmail = $localStorage.responselogindata.emailId;
	$scope.ServiceShortName = "ESR";
	$scope.finalAmount = $sessionStorage.rnlFinalAmount;
	$scope.pgOptions = new Array();
		for(var i=0;i<$sessionStorage.pgList.length;i++){
			$scope.pgOptions.push({
			id : $sessionStorage.pgList[i].bankId,
			name : $sessionStorage.pgList[i].cbbankname
		})
	}

		var rnlSaveDto = {
       fName :null,
       mName :null,
       lName :null,
       mobileNo :null,
       phone :null,
       email :null,
       orgId :$scope.orgId,
       deptId :$sessionStorage.deptId,
       empId :null,
       applicationId :null,
       challanNo :null,
       txnId :null,
       licenseNo :null,
       serviceId :$sessionStorage.serviceId,
       userId :null,
       langId :null,
       payStatus :null,
       payAmount :$sessionStorage.rnlFinalAmount,
       macId :null,
       updatedBy :null,
       serviceShortCode :null,
       tenant :null,
       dirPath :null,
       titleId :null,
       blockNo :null,
       floor :null,
       wing :null,
       bldgName :null,
       houseComplexName :null,
       roadName :null,
       areaName :null,
       pincodeNo :null,
       applicationType :null,
       phone1 :null,
       phone2 :null,
       wardNo :null,
       bplNo :null,
       gender :null,
       aadhaarNo :null,
       zoneNo :null,
       blockName :null,
       flatBuildingNo :null,
       cityName :null,
       uid :null,
       free :false,
       idfId :null,
       status :null,
       departmentName :null,
       referenceId :null,
       isBPL :null,
       yearOfIssue :null,
       bplIssuingAuthority :null,
       apmOrgnName :null,
       apmMode :null,
       ccnNumber :null,
       binder :null,
       folio :null,
       meterSize :null,
       ccnSize :null,
       ownership :null,
       applicationDate :null,
       locId :null,
       serviceName :null,
       documentList : $localStorage.documentObjectArray,
       applicantDetailDto :{
               organizationName :null,
               applicantFirstName : $sessionStorage.saveRNLData.applicantDetailDto.applicantFirstName,
               applicantMiddleName : $sessionStorage.saveRNLData.applicantDetailDto.applicantMiddleName,
               applicantLastName : $sessionStorage.saveRNLData.applicantDetailDto.applicantLastName,
               gender : $sessionStorage.saveRNLData.applicantDetailDto.gender,
               mobileNo : $sessionStorage.saveRNLData.applicantDetailDto.mobileNo,
               emailId : $sessionStorage.saveRNLData.applicantDetailDto.emailId,
               pinCode : $sessionStorage.saveRNLData.applicantDetailDto.pinCode,
               buildingName:"",
               roadName:"",
               applicantTitle : $sessionStorage.saveRNLData.applicantDetailDto.applicantTitle,
               areaName : $sessionStorage.saveRNLData.applicantDetailDto.areaName,
               blockName:"",
               housingComplexName :null,
               wing :null,
               floorNo :null,
               phone1 :null,
               phone2 :null,
               contactPersonName :null,
               villageTownSub : $sessionStorage.saveRNLData.applicantDetailDto.villageTownSub,
               cfcCitizenId :null,
               povertyLine :null,
               orgId :0,
               langId :0,
               userId :0,
               flatBuildingNo:"",
               codTryId1 :null,
               codTryId2 :null,
               codTryId3 :null,
               codTryId4 :null,
               codTryId5 :null,
               aadharNo:"",
               dwzid1 :null,
               dwzid2 :null,
               dwzid3 :null,
               dwzid4 :null,
               dwzid5 :null,
               serviceId :null,
               departmentId :null,
               bplNo : $sessionStorage.saveRNLData.applicantDetailDto.bplNo,
               isOrganisationEmployeeFalg : $sessionStorage.saveRNLData.applicantDetailDto.isOrganisationEmployeeFalg,
               isBPL : $sessionStorage.saveRNLData.applicantDetailDto.isBPL,
               panNo:""
      },
       estateBookingDTO :{
           id :null,
           applicationId :null,
           bookingNo :null,
           bookingDate :null,
           toDate : new Date($sessionStorage.saveRNLData.estateBookingDTO.toDate).getTime(),
           fromDate :new Date($sessionStorage.saveRNLData.estateBookingDTO.fromDate).getTime(),
           amount :null,
           securityAmount :null,
           propId :null,
           shiftId : $sessionStorage.saveRNLData.estateBookingDTO.shiftId,
           purpose : 0,
           termAccepted :null,
           payFlag :null,
           bookingStatus :null,
           year :null,
           month :null,
           discountAmount :null,
           orgId : $sessionStorage.saveRNLData.estateBookingDTO.orgId,
           langId : $sessionStorage.saveRNLData.estateBookingDTO.langId,
           createdBy : $sessionStorage.saveRNLData.estateBookingDTO.createdBy,
           createdDate : $sessionStorage.saveRNLData.estateBookingDTO.createdDate,
           updatedBy :null,
           updatedDate :null,
           lgIpMac : $sessionStorage.saveRNLData.estateBookingDTO.lgIpMac,
           lgIpMacUp :null,
           shiftName :null,
           noOfInvitess :$sessionStorage.saveRNLData.estateBookingDTO.noOfInvitess,
           reasonOfFreezing :null,
           cancelReason :null,
           cancelDate :null,
           vendorId :null,
           individualBookingNo :null,
           statusFlag :null,
           checkBox :$sessionStorage.saveRNLData.estateBookingDTO.checkBox
      },
       estatePropResponseDTO :  $sessionStorage.saveRNLData.estatePropResponseDTO
   	}


	$scope.saveRNLServiceData = function(){
//		$sessionStorage.saveRNLData.estateBookingDTO.amount = $sessionStorage.rnlFinalAmount;
//		$sessionStorage.saveRNLData.payAmount = $sessionStorage.rnlFinalAmount;
//		$sessionStorage.saveRNLData.documentList = $localStorage.documentObjectArray;
//		console.log("$sessionStorage.saveRNLData: "+JSON.stringify($sessionStorage.saveRNLData));

		$ionicLoading.show();
		RestService.saveRNLService(rnlSaveDto).then(function(rnlsaveresponse){
			  if(rnlsaveresponse.applicationNo != null){
				 $scope.applicationNo = rnlsaveresponse.applicationNo;
				 $ionicLoading.show({
						template: $filter('translate')('LOADING')
				 });
				 $scope.feesId = {
              1 : $sessionStorage.rnlFinalAmount
            }
				 var confirmPopup = $ionicPopup.show({
					 title : 'Estate Booking',
			         template : 'Your application <b>#'+$scope.applicationNo+'</b> is successfully submitted.',
			         buttons : [{
			             text : 'Proceed',
			             type : 'button-balanced',
			             onTap : function(){


           if(!$scope.data.finalAppEmail){$scope.data.finalAppEmail = "";}
                   RestService.savePayReq($scope.orgId,$scope.userID,$localStorage.langID,$scope.data.finalAppEmail,$scope.loginUSername,$scope.data.finalAppMobile,
                   $scope.ServiceShortName,$scope.applicationNo.toString(),$sessionStorage.rnlFinalAmount,$scope.data.paymentType,
                   $scope.applicationNo.toString(),"Y","N",false,null,$scope.feesId )
                   .then(function (response){
                  if(response.status == "pending"){
			 						$ionicLoading.hide();
                  var H= null;
			 						H = window.open(encodeURI(response.payRequestMsg), '_blank', 'location=no,closebuttoncaption=Back,hardwareback=yes,fullscreen=yes,zoom=yes,toolbarposition=top,enableviewportscale=yes');
			 						H.addEventListener('exit', iabClose);
			 						H.addEventListener('loadstop', iabClose1);
			 						function iabClose(event)
			 						{
			 							H.removeEventListener('exit', iabClose);
			 							$state.go("app.home");
			 						}
			 						function iabClose1(event){
			 							if (event.url.match("mobile/close")) {
			 								H.close();
			 								H.removeEventListener('loadstop', iabClose1);
			 								$state.go("app.home");
			 							}
			 						}
			 					}
			 					else{
			 						toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR_OCCURED'));
			 					}
			 					$ionicLoading.hide();
			 				}, function (err) {
			 					toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR_OCCURED'));
			 					$ionicLoading.hide();
			 				})
			             }
	          		}]
				});

				$ionicLoading.hide();
		    }
			else{
			  	$ionicLoading.hide();
		  	}
		},function (savernlerr) {
			console.log("savernlerr: "+JSON.stringify(savernlerr));
			toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR_OCCURED'));
			$ionicLoading.hide();
		})
	};
})
