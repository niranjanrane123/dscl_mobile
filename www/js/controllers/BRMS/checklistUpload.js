angular.module('starter')

.controller('ChecklistUploadCTRL', function ($rootScope,$scope, $location,$ionicPopup, RestService, $ionicLoading, $stateParams, toaster, $filter, ENV, dateFilter, $state, $localStorage, $sessionStorage) {
	var arrayListTest	=	new Array();

	console.log("$localStorage.responselogindata---"+JSON.stringify($localStorage.responselogindata));
//	$scope.orgId = $localStorage.responselogindata.orgId;
  $scope.orgId = $localStorage.selectedorgID;
  $sessionStorage.rnlDeptCode = "RNL";
	$scope.userID = $localStorage.responselogindata.userId;
  $sessionStorage.rnlServiceCode = "ESR";

	$localStorage.Lock	= 0;
	$localStorage.TempArray;

	var coupermisetext;
	var coutariftext;
	var actiondetails;
	$scope.COUpaidamt;
	$scope.subjects = $localStorage.checklistResponse.responseObj;
	console.log("subjects ::: "+JSON.stringify($scope.subjects));

	$scope.docsitems = [];
	var usagedoctable = "";
	for (var i = 0; i < $scope.subjects.length; i++) {
		var docdata = {
			attactID: $scope.subjects[i].attachmentId,
			docID: $scope.subjects[i].documentId,
			docName: $scope.subjects[i].documentName,
			docSerialNo: $scope.subjects[i].documentSerialNo,
			docDescType: $scope.subjects[i].descriptionType,
			docType: $scope.subjects[i].documentType,
			docDescMar: $scope.subjects[i].doc_DESC_Mar,
			docDesceng: $scope.subjects[i].doc_DESC_ENGL,
			docByteCode: $scope.subjects[i].documentByteCode,
			docMandatory: fullmandatory($scope.subjects[i].checkkMANDATORY)
		}

		$scope.docsitems.push(docdata);
	}

	/*File Upload*/
	var verfy;
	$scope.imageupload = function(fileObject){
		var reader = new FileReader();
		var idValue	=	fileObject.getAttribute("id");
		verfy  = fileObject.files[0];
		var maxSize = fileObject.getAttribute('data-max-size');
	    var fileSize = verfy.size;

		var ext = fileObject.value.split('.').pop();
		if(ext){
	    	if(ext == "pdf" || ext == "docx" || ext == "doc"){
	        }
	    	else{
	    		fileObject.value = "";
                
	        	$rootScope.simpleAlert('Onlypdfdoc');
	            $('#iDivBusyLoad').hide();
	            return;
	    	}
	    }else{
	    	$rootScope.simpleAlert('validdocument');
	    	$('#iDivBusyLoad').hide();
	    	return;
	    }
	    if(fileSize > maxSize){
	    	fileObject.value = "";
	        $rootScope.simpleAlert('validdocumentSize');
	        $('#iDivBusyLoad').hide();
	        return;
	    }
		reader.onload = function(e){
			console.log("about to encode");
       $scope.encoded_file = window.btoa(e.target.result.toString());
			//$scope.encoded_file = "TESTIng";

			for(var k=0;k<$scope.subjects.length;k++)
			{
				var documentObject	=
				{
					attachmentId: $scope.subjects[k].attachmentId,
					documentId: $scope.subjects[k].documentId,
					documentName: null,
					documentSerialNo: $scope.subjects[k].documentSerialNo,
					descriptionType: $scope.subjects[k].descriptionType,
					documentType: $scope.subjects[k].documentType,
					doc_DESC_Mar: $scope.subjects[k].doc_DESC_Mar,
					doc_DESC_ENGL: $scope.subjects[k].doc_DESC_ENGL,
					documentByteCode: null,
					checkkMANDATORY: $scope.subjects[k].checkkMANDATORY
				};

				if($localStorage.Lock== 0)
				{
					if($scope.subjects[k].documentId == idValue)
					{
						documentObject.documentName		=	verfy.name;
						documentObject.documentByteCode	=	$scope.encoded_file;
					}
					arrayListTest.push(documentObject);
					if((k+1)==$scope.subjects.length)
					{
						$localStorage.Lock = 1;
					}
				}
				else
				{
					for (var l=0; l <arrayListTest.length; l++) {
				        if (arrayListTest[l].documentId == idValue && $scope.subjects[k].documentId == idValue)
				        {
				        	arrayListTest[l].documentName		=	verfy.name;
				        	arrayListTest[l].documentSerialNo 	= 	$scope.subjects[k].documentSerialNo;
				        	arrayListTest[l].doc_DESC_Mar 		=	$scope.subjects[k].doc_DESC_Mar;
				        	arrayListTest[l].doc_DESC_ENGL 		=	$scope.subjects[k].doc_DESC_ENGL;
				        	arrayListTest[l].documentByteCode	=	$scope.encoded_file;
				        	arrayListTest[l].checkkMANDATORY 	= 	$scope.subjects[k].checkkMANDATORY;

				        }
				    }
				}
			}
			console.log("Final $localStorage.TempArray-----"+JSON.stringify(arrayListTest));
		};
		reader.readAsBinaryString(verfy);
	};
 $scope.newAppInDate = new Date().getTime();
	for(var i = 0; i< $sessionStorage.rnlTaxMasterData.length;i++){
	  $sessionStorage.rnlTaxMasterData[i].usageSubtype1 = $sessionStorage.rnlPropertyInfoDtoData.usage;
	   $sessionStorage.rnlTaxMasterData[i].usageSubtype2 = $sessionStorage.rnlPropertyInfoDtoData.type;
	   $sessionStorage.rnlTaxMasterData[i].usageSubtype3 = $sessionStorage.rnlPropertyInfoDtoData.subType
	   $sessionStorage.rnlTaxMasterData[i].factor4 = $sessionStorage.rnlPropertyInfoDtoData.propName;
	   $sessionStorage.rnlTaxMasterData[i].deptCode = $sessionStorage.rnlDeptCode;
	   $sessionStorage.rnlTaxMasterData[i].floorLevel = $sessionStorage.rnlPropertyInfoDtoData.floor;
	   $sessionStorage.rnlTaxMasterData[i].occupancyType = $sessionStorage.rnlPropertyInfoDtoData.occupancy;
	   $sessionStorage.rnlTaxMasterData[i].rateStartDate = $scope.newAppInDate;
	   $sessionStorage.rnlTaxMasterData[i].noOfBookingDays = $sessionStorage.daysDiffrenceRnlSelectDate;
     $sessionStorage.rnlTaxMasterData[i].taxSubCategory = $sessionStorage.rnlTaxMasterData[i].chargeDescEng;
	}

	var serviceChargeData = {
    modelName: null,
    dataModel: $sessionStorage.rnlTaxMasterData
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
 	  $scope.submitRnlData = function(){
//      		$sessionStorage.saveRNLData.estateBookingDTO.amount = $sessionStorage.rnlFinalAmount;
//      		$sessionStorage.saveRNLData.payAmount = $sessionStorage.rnlFinalAmount;
//      		$sessionStorage.saveRNLData.documentList = $localStorage.documentObjectArray;
//      		console.log("$sessionStorage.saveRNLData: "+JSON.stringify($sessionStorage.saveRNLData));

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
	$scope.uploaddocuments = function(){
		console.log("arrayListTest---"+JSON.stringify(arrayListTest));
		if(arrayListTest.length>0)
		for(var i = 0; i < arrayListTest.length; i++)
		{
			if(arrayListTest[i].checkkMANDATORY == "Y")
			{
				if(arrayListTest[i].documentByteCode ==	null)
				{
					$rootScope.simpleAlert('UploadMandatoryDocuments');
					return false;
				}
				else
				{
					$localStorage.documentObjectArray	=	arrayListTest;
				}
			}
		}
		else
		{
			$rootScope.simpleAlert('UploadMandatoryDocuments');
			return false;
		}


		$ionicLoading.show();
		console.log("brmsServiceCharge: "+JSON.stringify(serviceChargeData));
		RestService.brmsServiceCharge(serviceChargeData)
		.then(function(serviceChargeResponse) {
			console.log("serviceChargeResponse: "+JSON.stringify(serviceChargeResponse));
			if(serviceChargeResponse.wsStatus == "success"){
        var scResponse = serviceChargeResponse.responseObj;
				$sessionStorage.rnlFinalAmount = 0;
				for(var i=0; i<scResponse.length;i++){
					$sessionStorage.rnlFinalAmount += scResponse[i].chargeAmount;
				}
       // $sessionStorage.rnlFinalAmount=100;
				RestService.getPayOpt($scope.orgId,$scope.userID)
				.then(function(response){
					console.log("getPayOpt response: "+JSON.stringify(response));
					if(response.status =="success"){
						$sessionStorage.pgList = response.list;
						$ionicLoading.hide();
						$state.go("app.paymentPage");
					}else{
						return false;
					}
					$ionicLoading.hide();
				}, function(err){
					toaster.error($filter('translate')('ERROR'), $filter('translate')(''));
					$ionicLoading.hide();
				})
			$ionicLoading.hide();
			}
			else{
				//toaster.error($filter('translate')('ERROR'), $filter('translate')(''));
				$scope.submitRnlData();
			}
		},function(err){
			toaster.error($filter('translate')('ERROR'), $filter('translate')(''));
			$ionicLoading.hide();
		})
	};
})
