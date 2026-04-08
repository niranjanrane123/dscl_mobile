var datePicker = angular.module('starter');
datePicker.controller('EstateBookedDetailCtrl', function ($scope, RestService,$ionicPopup, $ionicLoading, $stateParams, toaster, $filter,
ENV, $state, $rootScope,$stateParams,$localStorage,$sessionStorage){
//	var disabledDates = [];
//	disabledDates = JSON.parse($stateParams.disabledDates);
	console.log("$scope.disabledDates: "+JSON.stringify(disabledDates));
	$scope.data = {};
	$scope.data = {
		/*RNLTitle:'',
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
		RNLPinCode:'',*/
		fromDate:'',
		toDate:'',
		RNLShift:'',
		RNLEvent: '',
		RNLPurpose:'',
		checkIn:'',
		checkOut:'',
		noOfInvities:'',
		checkBox: false
	};
	$scope.langId = "1";
	$scope.shiftList = [];
	$scope.eventList = [];
	$scope.minDate=  new Date().toISOString()
//	$scope.orgId = $localStorage.responselogindata.orgId;
   $scope.orgId = $localStorage.selectedorgID;
	$scope.userId = $localStorage.responselogindata.userId;
	$sessionStorage.rnlServiceCode = "ESR";
	$scope.data.fromDate = "";
	$scope.data.toDate = "";
	/*Retrieving Dropdown Data Start*/
	$rootScope.getNonHData("TTL","ttlList",$scope.orgId);
	$rootScope.getNonHData("GEN","genList",$scope.orgId);
	$rootScope.getNonHData("SHF","shfList",$scope.orgId);
	$rootScope.getNonHData("CAA","chargeApplList",$scope.orgId);
  $scope.disabledDates = JSON.parse($stateParams.disabledDates);
  $scope.disabledDatesFinal = [];
  for(var i=0; i<disabledDates.length; i++){
    $scope.disabledDatesFinal.push(new Date(disabledDates[i]));
    console.log('disable dates final: ',$scope.disabledDatesFinal);
  }
  $scope.disabledDates.push("2020-01-23");
//  console.log('After static dates final array: ',$scope.disabledDatesFinal);
//  $('fromDate').datepicker({
//      beforeShowDay: function(date){
//          var string = jQuery.datepicker.formatDate('yy-mm-dd', date);
//          return [ $scope.disabledDatesFinal.indexOf(string) == -1 ]
//      }
//  });
	$scope.rnlNewRatestartDate= new Date($sessionStorage.currentDate).getTime();
	/*Retrieving Dropdown Data End*/
	/*Retrieve Property Details*/
	$scope.propDetails = JSON.parse($stateParams.response);
	console.log("$scope.propDetails: "+JSON.stringify($scope.propDetails));
	console.log("$scope.propDetails.propId: "+JSON.stringify($scope.propDetails.propId));
  $scope.shiftList = $scope.propDetails.shiftDTOsList;
  $scope.eventList = $scope.propDetails.eventDTOList;
  console.log("eventList "+ JSON.stringify($scope.eventList))
	/*Retrieve Property Details*/
	/*Map User Details in Form*/
	$scope.$watch('genList', function (newValue, oldValue, $scope) {
		/*$scope.data.RNLTitle = $localStorage.responselogindata.title;
		$scope.data.RNLGender = $localStorage.responselogindata.gender;*/
	});


/*	$scope.data.RNLFName = $localStorage.responselogindata.firstName;
	$scope.data.RNLMName = $localStorage.responselogindata.middleName;
	$scope.data.RNLLName = $localStorage.responselogindata.lastName;
	$scope.data.RNLMobile = $localStorage.responselogindata.mobileNo;
	$scope.data.RNLEmail = $localStorage.responselogindata.emailId;
	$scope.data.RNLAadhar = $localStorage.responselogindata.addhaarNo;*/

/*	$("#ttloptions").val(appTTlID).change();
	$("#genoptions").val(wncgender).change();*/
	/*Map User Details in Form*/
	/*Disable Past and Booked Dates Start*/

	function convert(str) {
    var date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return [date.getFullYear(), mnth, day].join("-");
  }
  	function convert1(str) {
      var date = new Date(str),
        mnth = ("0" + (date.getMonth() + 1)).slice(-2),
        day = ("0" + date.getDate()).slice(-2);
      return [ day , mnth , date.getFullYear()].join("/");
    }

//  $scope.data.fromDate = convert(new Date($sessionStorage.currentDate));
//  $scope.data.toDate = convert(new Date($sessionStorage.currentDate));
  function checkDiff(){
     if(!!($scope.data.fromDate) && !!($scope.data.toDate)){
       var date1 = new Date($scope.data.fromDate);
       var date2 = new Date($scope.data.toDate);
       var Difference_In_Time = date2.getTime() - date1.getTime();
       var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
       return Difference_In_Days;
     }
  }

//	$('body').on('focus',".datepicker", function(){
//		var dateToday = convert(new Date($sessionStorage.currentDate));
//		$("#fromDate").datepicker({
//			beforeShowDay: DisableSpecificDates,
//			minDate: dateToday,
//			dateFormat: 'dd/mm/yy',
//			onClose: function() {
//				$(this).blur();
//			}
//		});
//
//		$("#toDate").datepicker({
//			beforeShowDay: DisableSpecificDates,
//			minDate: dateToday,
//			dateFormat: 'dd/mm/yy',
//			onClose: function() {
//				$(this).blur();
//			}
//		});
//	});
	function DisableSpecificDates(date) {
      var string = jQuery.datepicker.formatDate('yy-mm-dd', date);
	    return [disabledDates.indexOf(string) == -1];
	}
	/*Disable Past and Booked Dates End*/
  $scope.getCheckInOut = function(index){
   for ( var i=0; i< $scope.shiftList.length; i++){
    if($scope.shiftList[i].propShifId == $scope.data.RNLShift){
       $scope.data.checkIn = $scope.getTime($scope.shiftList[i].propFromTime);
       $scope.data.checkOut = $scope.getTime($scope.shiftList[i].propToTime);
    }
   }
  }
  $scope.getTime = function(unixTimestamp){
     dateObj = new Date(unixTimestamp * 1000);
      hours = dateObj.getUTCHours();
      minutes = dateObj.getUTCMinutes();
      seconds = dateObj.getUTCSeconds();

      formattedTime = hours.toString().padStart(2, '0') + ':' +
          minutes.toString().padStart(2, '0');
          return formattedTime;
  }
	$scope.getShifts = function(type){
	if($scope.disabledDates.indexOf($scope.data.fromDate) != -1 || $scope.disabledDates.indexOf($scope.data.toDate) != -1){
	   var alertPopup = $ionicPopup.alert({
           template: $filter('translate')('SELECTEDDATEBOOKEDMSG'),
              buttons : [{
                text : $filter('translate')('OK'),
                type : 'button button-block  customBgColor',
                onTap : function(){
                $scope.data.toDate = null;
                $scope.data.fromDate = null;
                }
             }]
         });
	}else{
	    if(type=='from'){
             if(!!$scope.data.toDate && !!$scope.data.fromDate){
                    if(new Date($scope.data.toDate)< new Date($scope.data.fromDate)){
                              $scope.data.toDate = $scope.data.fromDate;
                       }
                                $ionicLoading.show();
                                 RestService.getRNLShifts($scope.propDetails.propId,convert1($scope.data.fromDate),convert1($scope.data.toDate),$scope.orgId)
                                     .then(function(response){
                                        if(response.length!=0){
                                           $scope.shiftList.length = 0;
                                           $scope.shiftList = response;
                                        }else {
                                            var alertPopup = $ionicPopup.alert({
                                              template: $filter('translate')('RNLNOTALLOWEDMSG'),
                                                 buttons : [{
                                                   text : $filter('translate')('OK'),
                                                   type : 'button button-block  customBgColor',
                                                   onTap : function(){
                                                   $scope.data.toDate = '';
                                                   }
                                                }]
                                            });
                                        }


                                       console.log("getRNLShifts response: "+JSON.stringify(response));
                                       $ionicLoading.hide();
                                     },function(shifterr){
                                       toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR_OCCURED'));
                                       $ionicLoading.hide();
                                     })

             }
             }
             else if(checkDiff()>0){
              $ionicLoading.show();
                  RestService.getRNLShiftsBased_on_date($scope.propDetails.propId,convert1($scope.data.fromDate),convert1($scope.data.toDate),$scope.orgId)
                             .then(function(response){
                                 if(response=="pass"){
                                 RestService.getRNLShifts($scope.propDetails.propId,convert1($scope.data.fromDate),convert1($scope.data.toDate),$scope.orgId)
                                    .then(function(response){
                                        $scope.shiftList.length = 0;
                                        $scope.shiftList = response;
                                        console.log("getRNLShifts response: "+JSON.stringify(response));
                                        $ionicLoading.hide();
                                    },function(shifterr){
                                      toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR_OCCURED'));
                                      $ionicLoading.hide();
                                    })
                                 }else{
                                 $ionicLoading.hide();
                                  var alertPopup = $ionicPopup.alert({
                                      template: $filter('translate')('ALREADYBOOKED'),
                                         buttons : [{
                                           text : $filter('translate')('OK'),
                                           type : 'button button-block  customBgColor',
                                           onTap : function(){

                                           }
                                        }]
                                    });

                                 }

                             },function(shifterr){
                               toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR_OCCURED'));
                               $ionicLoading.hide();
                             })
             }
             else{
                      if(!!$scope.data.toDate && !!$scope.data.fromDate){
                               $ionicLoading.show();
                        RestService.getRNLShifts($scope.propDetails.propId,convert1($scope.data.fromDate),convert1($scope.data.toDate),$scope.orgId)
                        .then(function(response){
                            if(response.length!=0){
                               $scope.shiftList.length = 0;
                               $scope.shiftList = response;
                            }else {
                                var alertPopup = $ionicPopup.alert({
                                  template: $filter('translate')('RNLNOTALLOWEDMSG'),
                                     buttons : [{
                                       text : $filter('translate')('OK'),
                                       type : 'button button-block  customBgColor',
                                       onTap : function(){
                                       $scope.data.toDate = '';
                                       }
                                    }]
                                });
                            }
                          $ionicLoading.hide();
                        },function(shifterr){
                          toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR_OCCURED'));
                          $ionicLoading.hide();
                        })
                        }
             }
  	}
 	}
	$scope.submitPropertyInfo = function()
	{
	  $sessionStorage.daysDiffrenceRnlSelectDate = checkDiff();
		$scope.rnlToDate = $scope.data.toDate;
		$scope.rnlFromDate = $scope.data.fromDate;
		console.log("$scope.rnlToDate: "+$scope.rnlToDate+"|$scope.rnlFromDate: "+$scope.rnlFromDate);
		console.log("$sessionStorage.detaildata-->"+JSON.stringify($sessionStorage.detaildata));
		console.log("$sessionStorage.detaildata-->"+JSON.stringify($sessionStorage.detaildata.RNLTitle));
		$sessionStorage.saveRNLData = new Array();
		$sessionStorage.saveRNLData = {
		/*	applicantDetailDto:{
				organizationName:"",
				applicantFirstName:$scope.data.RNLFName,
				applicantMiddleName:$scope.data.RNLMName,
				applicantLastName:$scope.data.RNLLName,
				gender:$scope.data.RNLGender,
				mobileNo:$scope.data.RNLMobile,
				emailId:$scope.data.RNLEmail,
				pinCode:$scope.data.RNLPinCode,
				buildingName:$scope.data.RNLBuilding,
				roadName:$scope.data.RNLRoad,
				applicantTitle:$scope.data.RNLTitle,
				areaName:$scope.data.RNLArea,
				blockName:$scope.data.RNLBlock,
				villageTownSub:$scope.data.RNLVillage,
				orgId:$scope.orgId,
				langId:$scope.langId,
				userId:$scope.userId,
				flatBuildingNo:$scope.data.RNLFlatNo,
				aadharNo:$scope.data.RNLAadhar,
				panNo:$scope.data.RNLPan
			}*/

				applicantDetailDto:{
					organizationName:"",
					applicantFirstName:$sessionStorage.detaildata.RNLFName,
					applicantMiddleName:$sessionStorage.detaildata.RNLMName,
					applicantLastName:$sessionStorage.detaildata.RNLLName,
					gender:$sessionStorage.detaildata.RNLGender,
					mobileNo:$sessionStorage.detaildata.RNLMobile,
					emailId:$sessionStorage.detaildata.RNLEmail,
					pinCode:$sessionStorage.detaildata.RNLPinCode,
					buildingName:$sessionStorage.detaildata.RNLBuilding,
					roadName:$sessionStorage.detaildata.RNLRoad,
					applicantTitle:$sessionStorage.detaildata.RNLTitle,
					areaName:$sessionStorage.detaildata.RNLArea,
					blockName:$sessionStorage.detaildata.RNLBlock,
					villageTownSub:$sessionStorage.detaildata.RNLVillage,
					orgId:$scope.orgId,
					langId:$scope.langId,
					userId:$scope.userId,
					flatBuildingNo:$sessionStorage.detaildata.RNLFlatNo,
					aadharNo:$sessionStorage.detaildata.RNLAadhar,
					panNo:$sessionStorage.detaildata.RNLPan,
					bplNo:$sessionStorage.detaildata.bplNo,
					isOrganisationEmployeeFalg:$sessionStorage.detaildata.isEmploy,
          isBPL:$sessionStorage.detaildata.povertyLineValue,
				},
			estateBookingDTO:{
				toDate:$scope.rnlToDate,
				fromDate:$scope.rnlFromDate,
				amount:"",
				securityAmount:0.0,
				propId:$scope.propDetails.propId,
				shiftId:$scope.data.RNLShift,
				purpose:$scope.data.RNLPurpose,
				orgId:$scope.orgId,
				langId:$scope.langId,
				createdBy:$scope.userId,
				createdDate:$scope.rnlNewRatestartDate,
				updatedBy:"",
				updatedDate:"",
				lgIpMac:$localStorage.macAddress,
				lgIpMacUp:$localStorage.macAddress,
				shiftName:"",
        noOfInvitess :$scope.data.noOfInvities,
        checkBox: $scope.data.checkBox,
			},
			estatePropResponseDTO: $scope.propDetails,
			deptId:$scope.deptId,
			serviceId: $scope.serviceId
		};
		console.log("$sessionStorage.saveRNLData: "+JSON.stringify($sessionStorage.saveRNLData));
		$ionicLoading.show();
		/*Model Initialization Call*/
		RestService.initializeModel('ChecklistModel|RNLRateMaster')
		.then(function(responsedata){
			console.log("initializeModel response: "+JSON.stringify(responsedata));
			if(responsedata.wsStatus == "success"){
				$scope.usageSubtype1 = responsedata.responseObj[0].usageSubtype1;
				$scope.usageSubtype2 = responsedata.responseObj[0].usageSubtype2;
				$scope.usageSubtype3 = responsedata.responseObj[0].usageSubtype3;
				$scope.usageSubtype4 = responsedata.responseObj[0].usageSubtype4;
				$scope.usageSubtype5 = responsedata.responseObj[0].usageSubtype5;
				$scope.factor1 = responsedata.responseObj[0].factor1;
				$scope.factor2 = responsedata.responseObj[0].factor2;
				$scope.factor3 = responsedata.responseObj[0].factor3;
				$scope.factor4 = responsedata.responseObj[0].factor4;
				$scope.isBPL = responsedata.responseObj[0].isBPL;
				$scope.noOfDays = responsedata.responseObj[0].noOfDays;
				$scope.deptCode = responsedata.responseObj[0].deptCode;
				$scope.applicantType = responsedata.responseObj[0].applicantType;
				$scope.isOutStandingPending = responsedata.responseObj[0].isOutStandingPending;
				$scope.isExistingConnectionOrConsumerNo = responsedata.responseObj[0].isExistingConnectionOrConsumerNo;
				$scope.isExistingProperty = responsedata.responseObj[0].isExistingProperty;
				$scope.disConnectionType = responsedata.responseObj[0].disConnectionType;
        /*Checklist Call*/
				var checklistInput = {
					dataModel: {
						orgId:$scope.orgId,
						serviceCode:$sessionStorage.rnlServiceCode,
						usageSubtype1:$sessionStorage.rnlusageSubtype1,
						usageSubtype2:$scope.usageSubtype2,
						usageSubtype3:$sessionStorage.rnlusageSubtype3,
						usageSubtype4:$sessionStorage.rnlusageSubtype4,
						usageSubtype5:$scope.usageSubtype5,
						applicantType:$scope.applicantType,
						noOfDays:$scope.noOfDays,
						isOutStandingPending:$scope.isOutStandingPending,
						isExistingConnectionOrConsumerNo:$scope.isExistingConnectionOrConsumerNo,
						isExistingProperty:$scope.isExistingProperty,
						isBPL:$scope.isBPL,
						disConnectionType:$scope.disConnectionType,
						factor1:$sessionStorage.rnlfactor1,
						factor2:$sessionStorage.rnlfactor2,
						factor3:$scope.factor3,
						factor4:$scope.factor4,
					}
				};
				console.log("checklistInput: "+JSON.stringify(checklistInput));
				RestService.getChecklistCall(checklistInput)
				.then(function (checklistResponse){
					console.log("checklistResponse: "+JSON.stringify(checklistResponse));
					if(checklistResponse.wsStatus == "success"){
						$localStorage.checklistResponse = checklistResponse;
						/*Dependency Call*/
						var chargeApplAt = $.grep($rootScope.mainchargeApplList, function (prefix) {
				            return prefix.lookUpCode == "APL";
				        })[0].lookUpId;
						var chargeApplAtLabel = $.grep($rootScope.mainchargeApplList, function (prefix) {
				            return prefix.lookUpCode == "APL";
				        })[0].descLangFirst;

//				        alert("chargeApplAt---"+chargeApplAt);
						RestService.dependentParams($scope.orgId,$sessionStorage.rnlServiceCode,chargeApplAt)
						.then(function (setdependresponse){
							console.log("setdependresponse: "+JSON.stringify(setdependresponse));
							var dependentRespParams = setdependresponse.responseObj;
							$sessionStorage.rnlTaxMasterData = dependentRespParams;
							if(setdependresponse.wsStatus == "success"){
								var serviceChargeParams = new Array();
								for(var i=0; i < dependentRespParams.length; i++){
									serviceChargeParams.push({
										orgId: $scope.orgId,
										serviceCode: $sessionStorage.rnlServiceCode,
										deptCode: "RNL",
										taxType: dependentRespParams[i].taxType,
										taxCode: dependentRespParams[i].taxCode,
										taxCategory: dependentRespParams[i].taxCategory,
										taxSubCategory: dependentRespParams[i].chargeDescEng,
										usageSubtype1: $sessionStorage.rnlusageSubtype1,
										usageSubtype2: $sessionStorage.rnlusageSubtype3,
										usageSubtype3: $sessionStorage.rnlusageSubtype4,
										usageSubtype4: responsedata.responseObj[1].usageSubtype4,
										usageSubtype5: responsedata.responseObj[1].usageSubtype5,
										rateStartDate: $scope.rnlNewRatestartDate,
										chargeApplicableAt: chargeApplAtLabel,
										floorLevel: $sessionStorage.rnlfactor2,
										roadType: $sessionStorage.rnlroadType,
										occupancyType: $sessionStorage.rnlfactor1,
										factor4: responsedata.responseObj[1].factor4
									})
								}
								console.log("serviceChargeParams: "+JSON.stringify(serviceChargeParams));
								var serviceChargeInput = {
									dataModel: serviceChargeParams
								}
								console.log("serviceChargeInput: "+JSON.stringify(serviceChargeInput));
								$ionicLoading.hide();
								$state.go("app.checklistUpload",{serviceChargeInput: JSON.stringify(serviceChargeInput)});
							}
							else{
								toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR'));
							}
							$ionicLoading.hide();
						},function (err){
							toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR'));
							$ionicLoading.hide();
						})
					}
					else if(checklistResponse.wsStatus == "NA"){
					 $scope.submitRnlData();
					}
					$ionicLoading.hide();
				},function (err) {
					toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR'));
					$ionicLoading.hide();
				})
			}
			else{
				toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR'));
				$ionicLoading.hide();
			}
		},function(err){
			toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR'));
			$ionicLoading.hide();
		})
	}
    $scope.openLink = function(){
      if($localStorage.termsAndConditionURL){
         window.open(encodeURI($localStorage.termsAndConditionURL), '_system', 'location=yes');
       }else{
         alert("Data not available");
       }
    }
	 	  $scope.submitRnlData = function(){
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
                 payAmount :0,
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
                     noOfInvitess : $scope.data.noOfInvities,
                     reasonOfFreezing :null,
                     cancelReason :null,
                     cancelDate :null,
                     vendorId :null,
                     individualBookingNo :null,
                     statusFlag :null,
                     checkBox: $scope.data.checkBox
                },
                 estatePropResponseDTO :  $sessionStorage.saveRNLData.estatePropResponseDTO
             	}
      		$ionicLoading.show();
        		RestService.saveRNLService(rnlSaveDto).then(function(rnlsaveresponse){
        			  if(rnlsaveresponse.applicationNo != null){
        				 $scope.applicationNo = rnlsaveresponse.applicationNo;
        				 $scope.bookingNo = rnlsaveresponse.bookingNo;
        				  $ionicLoading.hide();
        			    var alertPopup = $ionicPopup.alert({
                      title: $filter('translate')('RENTANDLEASE'),
                      template: 'Your Application No. '+$scope.applicationNo + 'and Booking No. '+$scope.bookingNo,
                         buttons : [{
                           text : $filter('translate')('OK'),
                           type : 'button button-block  customBgColor',
                           onTap : function(){
                              $sessionStorage.applictNo = $scope.applictNo;
                              $state.go("app.home");
                           }
                        }]
                    });
        		    }
        			else{
        			  	$ionicLoading.hide();
        		  	}
        		},function (savernlerr) {
        			console.log("savernlerr: "+JSON.stringify(savernlerr));
        			toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR_OCCURED'));
        			$ionicLoading.hide();
        		})
        }

	var _init = function (){
	  RestService.getDepartmentId($scope.orgId)
      .then(function (departmentId){
         $scope.deptId = departmentId;
         $sessionStorage.deptId = $scope.deptId;
         console.log('department id response: '+ departmentId);
      },function (err){
        toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR'));
        $ionicLoading.hide();
      });
     RestService.getServiceId($scope.orgId,'ESR')
        .then(function (serviceId){
           $scope.serviceId = serviceId
           $sessionStorage.serviceId = $scope.serviceId;
           console.log('department id response: '+ serviceId)
        },function (err){
          toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR'));
          $ionicLoading.hide();
        })
	};
	_init();
});
