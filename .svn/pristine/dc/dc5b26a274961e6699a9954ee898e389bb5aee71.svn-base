angular.module('starter')

  .controller('NewWaterconnUploadDocCTRL', function ($rootScope,$scope, $location, RestService, $ionicLoading, $stateParams, toaster,
		  $filter, ENV, dateFilter, $state, $localStorage,$sessionStorage,$ionicPopup,$ionicHistory) {


	  console.log("$sessionStorage.responselogindata---"+JSON.stringify($localStorage.responselogindata));
//		$scope.orgid = $localStorage.responselogindata.orgId;
		$scope.orgid = $localStorage.selectedorgID;
		$scope.userID = $localStorage.responselogindata.userId;
		$scope.loginUSername = $localStorage.responselogindata.firstName;
		$scope.LoginMobileNo = $localStorage.responselogindata.mobileNo;
		$sessionStorage.serviceCode = "WNC";
		$scope.newAppInDate = new Date().getTime();
    $scope.applnDate = new Date().getTime();
		$sessionStorage.deptCode = "WT";
//		var chargeApplicableAt = "150";
		var arrayListTest	=	new Array();

      $sessionStorage.Lock	= 0;
      $sessionStorage.TempArray	;
		  $scope.checklist ='';
		  $scope.WNCtarif;
		  $scope.WNCpermise;
		  $scope.WNCapplicantype;
		  $scope.WNCexistconsumerdetail;
		  $scope.WNCexistproperty;
		  $scope.WNCBpl;
		  $scope.settemp;
		  $scope.usageSubtype3;
		  $scope.usageSubtype4;
		  $scope.usageSubtype5;
		  $scope.noOfDays;
		  $scope.isOutStandingPending;
		  $scope.disConnectionType;
		  $scope.factor1;
		  $scope.factor2;
		  $scope.factor3;
		  $scope.factor4;

	  var apptypetext;
	  var tariftext;
	  var permisetext;

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
		$scope.selectfilename;


console.log("$sessionStorage.responsechecklistdata--"+JSON.stringify($sessionStorage.responsechecklistdata));
	$scope.subjects = $sessionStorage.responsechecklistdata.responseObj;
		  console.log("subjects ::: "+JSON.stringify($scope.subjects));
//		  alert("subjects ::: "+JSON.stringify($scope.subjects));

		  $scope.docsitems = [];

		  var newconndoctable = "";
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
		            docMandatory: fullmandatory($scope.subjects[i].checkkMANDATORY),
		            uploadedDocumentPath: null
				   }
				$scope.docsitems.push(docdata);
		 }

	  var verfy;

	  $scope.imageupload = function(fileObject){


		  var reader = new FileReader();
			var idValue	=	fileObject.getAttribute("id");
			verfy  = fileObject.files[0];
			var maxSize = 1000000;
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
//	  		$scope.encoded_file = "TESTING";

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
	  					checkkMANDATORY: $scope.subjects[k].checkkMANDATORY,
	  					uploadedDocumentPath: null
	  				};

	  			if($sessionStorage.Lock== 0)
				{
					if($scope.subjects[k].documentId == idValue)
					{
						documentObject.documentName		=	verfy.name;
						documentObject.documentByteCode	=	$scope.encoded_file;
					}
					arrayListTest.push(documentObject);
					if((k+1)==$scope.subjects.length)
					{
						$sessionStorage.Lock = 1;
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
					        	arrayListTest[l].uploadedDocumentPath = null;
					        }
					    }
				}

	  		}
	  		console.log("Final $sessionStorage.TempArray-----"+JSON.stringify(arrayListTest));
	  	 };
	  		reader.readAsBinaryString(verfy);
	  	};


$scope.uploadattch = function() {

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
						$sessionStorage.documentObjectArray	=	arrayListTest;
					}
				}
			}
			else
			{
				$rootScope.simpleAlert('UploadMandatoryDocuments');
				return false;
			}

		  $scope.wrNewRatestartDate= new Date().getTime();

		  	console.log("UPLOAD documentObjectArray---"+JSON.stringify($sessionStorage.documentObjectArray));
        if($sessionStorage.setDependentResponse.free){
          saveWaterData()
         }else{

        $ionicLoading.show({template:$filter('translate')('LOADING')});

		    RestService.servicechargeNW($sessionStorage.serviceCode,
		    	$sessionStorage.deptCode,
				  $sessionStorage.tariftext,
				  $sessionStorage.permisetext,
				  $sessionStorage.wrusageSubtype3,
				  $sessionStorage.wrusageSubtype4,
				  $sessionStorage.wrusageSubtype5,
				  $sessionStorage.wrMeterType,
				  $sessionStorage.wrConnType,
				  $sessionStorage.WNCBpl,
				  $sessionStorage.wrRoadType,
				  $sessionStorage.wrtransferMode,
				  $sessionStorage.wrDisConnType,
				  $sessionStorage.wrfactor1,
				  $sessionStorage.wrfactor2,
				  $sessionStorage.wrfactor3,
				  $sessionStorage.wrfactor4,
				  $sessionStorage.TaxType,
				  $sessionStorage.TaxCode,
				  $sessionStorage.TaxCategory,
				  $sessionStorage.TaxSubcategory,
				  $sessionStorage.chargeApplicableAt,
				  $sessionStorage.selconSizetext,
				  $scope.wrNewRatestartDate,$scope.orgid,"Application Charge")
				  .then(function (responseservicechargedata){
				console.log("responseservicechargedata--"+JSON.stringify(responseservicechargedata));
				if(responseservicechargedata.wsStatus == "success"){
             $sessionStorage.responseservicechargedata = responseservicechargedata;

             $state.go("app.NWCpay");


			/*		RestService.getPayOpt($scope.orgid,$scope.userID).then(function (response) {
						console.log("dash==="+JSON.stringify(response));
						if(response.status == "success"){
                $sessionStorage.Bankresponse = response;
							    $state.go("app.NWCpay");
							$ionicLoading.hide();
						}else{
							alert(response.errorMsg);
							return false;
							$ionicLoading.hide();
						}
						$ionicLoading.hide();
					}, function (err) {
						  $ionicLoading.hide();
					})*/
					 $ionicLoading.hide();
					}
					else{
					    saveWaterData()
							 //toaster.error($filter('translate')('ERROR'), $filter('translate')(''));
          }
				},function (err) {
					toaster.error($filter('translate')('ERROR'), $filter('translate')(''));
					$ionicLoading.hide();
				})
			}
	  };

	  var saveWaterData = function(){
      			  $scope.applnDate = new Date().getTime();
      			  $ionicLoading.show({
      					template: $filter('translate')('LOADING')
      				});
      			var waterDto = {
              fName: $sessionStorage.WNCName,
              mName: null,
              lName: null,
              mobileNo: $sessionStorage.WNCmobile.toString(),
              phone: null,
              email: $sessionStorage.WNCemailid,
              orgId: $scope.orgid,
              deptId: $sessionStorage.deptId,
              empId: null,
              applicationId: null,
              challanNo: null,
              txnId: null,
              licenseNo: null,
              serviceId: $sessionStorage.serviceId,
              userId: $scope.userID,
              langId: 1,
              payStatus: null,
              payAmount: null,
              macId: null,
              updatedBy: $scope.userID,
              serviceShortCode: null,
              tenant: null,
              documentList: $sessionStorage.documentObjectArray,
              dirPath: null,
              titleId: null,
              blockNo: $sessionStorage.CNCbilladdress,
              floor: null,
              wing: null,
              bldgName: null,
              houseComplexName: null,
              roadName: $sessionStorage.CNCbilladdress,
              areaName: $sessionStorage.CNCbilladdress,
              pincodeNo: $sessionStorage.WNCpincode.toString(),
              applicationType: null,
              phone1: null,
              phone2: null,
              wardNo: null,
              bplNo: null,
              gender: null,
              aadhaarNo: null,
              zoneNo: null,
              blockName: null,
              flatBuildingNo: null,
              cityName: null,
              uid: null,
              free: false,
              idfId: null,
              status: null,
              departmentName: null,
              referenceId: null,
              isBPL: null,
              yearOfIssue: null,
              bplIssuingAuthority: null,
              apmOrgnName: null,
              apmMode: null,
              ccnNumber: null,
              binder: null,
              folio: null,
              meterSize: null,
              ccnSize: null,
              ownership: null,
              applicationDate: null,
              locId: null,
              isConsumer: "Y",
              isBillingAddressSame: $sessionStorage.isBilling,
              pinCode: $sessionStorage.CNCpincode,
              billingPinCode: null,
              billingAdharNo: null,
              existingConsumerNumber: null,
              consumerNo: null,
              existingPropertyNo: null,
              propertyNo: $sessionStorage.WNCPropertyNo,
              consumerType: null,
              plumberName: null,
              lgIpMac: $localStorage.macAddress,
              isULBRegisterd: null,
              applicantType: null,
              charges: null,
              payMode: null,
              propertyOutStanding: null,
              applicantDTO: {
                organizationName: null,
                applicantFirstName: $sessionStorage.WNCName,
                applicantMiddleName: null,
                applicantLastName: null,
                gender: null,
                mobileNo: $sessionStorage.WNCmobile,
                emailId: null,
                pinCode: $sessionStorage.WNCpincode,
                buildingName: null,
                roadName: $sessionStorage.WNCroadname,
                applicantTitle: null,
                areaName: $sessionStorage.CNCbilladdress,
                blockName: null,
                housingComplexName: null,
                wing: null,
                floorNo: null,
                phone1: null,
                phone2: null,
                contactPersonName: null,
                villageTownSub: null,
                cfcCitizenId: null,
                povertyLine: null,
                orgId: $scope.orgid,
                langId: 1,
                userId: $scope.userID,
                bplNo: null,
                flatBuildingNo: null,
                codTryId1: null,
                codTryId2: null,
                codTryId3: null,
                codTryId4: null,
                codTryId5: null,
                aadharNo: null,
                dwzid1: null,
                dwzid2: null,
                dwzid3: null,
                dwzid4: null,
                dwzid5: null,
                serviceId: null,
                departmentId: null,
                isOrganisationEmployeeFalg: null,
                isBPL: $sessionStorage.WNCBpl,
                panNo: null
              },
              ownerList: [],
              linkDetails: [],
              csmrInfo: {
                csIdn: 0,
                csCcn: null,
                csApldate: $scope.applnDate,
                csOldccn: null,
                propertyNo: null,
                csTitle: null,
                csName: $sessionStorage.WNCName,
                csMname: null,
                csLname: null,
                csCcityName: null,
                csAdd: $sessionStorage.CNCbilladdress,
                csGender: 0,
                csFlatno: null,
                csBldplt: null,
                csLanear: $sessionStorage.CNCbilladdress,
                csRdcross: $sessionStorage.WNCroadname,
                csContactno: $sessionStorage.WNCmobile,
                csPinCode: null,
                csLocationId: null,
                csOtitle: null,
                csOname: $sessionStorage.WNCName,
                csOmname: null,
                csOlname: null,
                csOcityName: null,
                csOadd: $sessionStorage.CNCbilladdress,
                csOGender: null,
                csOflatno: null,
                csObldplt: null,
                csOlanear: null,
                csOrdcross: null,
                csOcontactno: $sessionStorage.WNCmobile,
                csCpinCode: $sessionStorage.WNCpincode,
                csCcntype: null,
                csNoofusers: null,
                csCcnsize: $sessionStorage.WNCConnSize,
                csRemark: null,
                trdPremise: null,
                csNooftaps: null,
                csMeteredccn: null,
                pcFlg: null,
                pcDate: null,
                plumId: $sessionStorage.WNCPlumber,
                csCcnstatus: null,
                csFromdt: null,
                csTodt: null,
                orgId: $scope.orgid,
                userId: $scope.userID,
                langId: 1,
                lmodDate: null,
                updatedBy: null,
                updatedDate: $scope.applnDate,
                csPremisedesc: null,
                csBbldplt: null,
                csBlanear: null,
                csBrdcross: $sessionStorage.CNCbilladdress,
                csBadd: $sessionStorage.CNCbilladdress,
                csBpinCode: null,
                regno: null,
                meterreader: null,
                ported: null,
                electoralWard: null,
                csListatus: null,
                codDwzid1: $sessionStorage.WNCZone,
                codDwzid2: $sessionStorage.WNCWard,
                codDwzid3: null,
                codDwzid4: null,
                codDwzid5: null,
                csPowner: null,
                cpaCscid1: null,
                cpaCscid2: null,
                cpaCscid3: null,
                cpaCscid4: null,
                cpaCscid5: null,
                cpaOcscid1: null,
                cpaOcscid2: null,
                cpaOcscid3: null,
                cpaOcscid4: null,
                cpaOcscid5: null,
                cpaBcscid1: null,
                cpaBcscid2: null,
                cpaBcscid3: null,
                cpaBcscid4: null,
                cpaBcscid5: null,
                trmGroup1: 559,
                trmGroup2: null,
                trmGroup3: null,
                trmGroup4: null,
                trmGroup5: null,
                trmGroup6: null,
                csCcncategory1: null,
                csCcncategory2: null,
                csCcncategory3: null,
                csCcncategory4: null,
                csCcncategory5: null,
                lgIpMac: $localStorage.macAddress,
                lgIpMacUpd: null,
                wtV1: null,
                wtV2: null,
                wtV3: null,
                wtV4: null,
                wtV5: null,
                csCfcWard: null,
                annualRent: null,
                wtN3: null,
                wtN4: null,
                wtN5: null,
                wtD1: null,
                wtD2: null,
                wtD3: null,
                wtLo2: null,
                wtLo3: null,
                csTaxPayerFlag: $sessionStorage.WNCIsTaxPayer,
                csOldpropno: null,
                csSeqno: null,
                csEntryFlag: null,
                csOpenSecdepositAmt: null,
                csBulkEntryFlag: null,
                gisRef: null,
                csUid: null,
                csPanNo: $sessionStorage.WNCPanNo,
                applicationNo: null,
                typeOfApplication: $sessionStorage.WNCtemporary,
                fromDate: null,
                toDate: null,
                bplFlag: $sessionStorage.WNCBpl,
                bplNo: null,
                noOfFamilies: null,
                applicantType: null,
                csBcityName: null,
                csSewerageId: null,
                csReason: null,
                csServiceCharge: null,
                waterRequirement: null,
                dischargeCapacity: null,
                loccationId: null,
                csEmail: null,
                csOEmail: null,
                depositDate: null,
                ownerList: [{
                  ownerTitle: null,
                  ownerFirstName: null,
                  ownerMiddleName: null,
                  ownerLastName: null,
                  cao_id: null,
                  csIdn: null,
                  cao_address: null,
                  cao_contactno: null,
                  orgid: $scope.orgid,
                  userId: $scope.userID,
                  langId: 1,
                  lmoddate: $scope.applnDate,
                  updatedBy: null,
                  updatedDate: null,
                  lgIpMac: $localStorage.macAddress,
                  lgIpMacUpd: null,
                  gender: null,
                  caoUID: null,
                  caoNewTitle: null,
                  caoNewFName: null,
                  caoNewMName: null,
                  caoNewLName: null,
                  caoNewGender: null,
                  caoNewUID: null,
                  isDeleted: "N"
                }],
                roadList: null,
                linkDetails: null,
                distribution: null,
                bpincode: $sessionStorage.WNCpincode,
                opincode: $sessionStorage.WNCpincode,
                csIsBillingActive: null,
                depositAmount: null,
                receiptNumber: null,
                numberOfDays: null,
                maxNumberOfDay: null,
                distributionMainLineNumber: null,
                distributionMainLineName: null,
                distributionChildLineNumber: null,
                distributionChildLineName: null,
                ccnOutStandingAmt: null,
                totalOutsatandingAmt: $sessionStorage.WCPropertyOutstanding,
                csPtype: "U",
                propertyUsageType: $sessionStorage.WNCtarif,
                csIllegalDate: null,
                csIllegalNoticeNo: null,
                csIllegalNoticeDate: null,
                illegalNoticeDate: null,
                illegalDate: null,
                connectionSize: $sessionStorage.WNCConnSize
              },
              csmrrCmd: {
                csId: null,
                csIdn: null,
                rcDistpres: null,
                rcDisttimefr: null,
                rcDisttimeto: null,
                rcDistccndif: null,
                rcDailydischg: null,
                rcGranted: null,
                rcStatus: null,
                rcLength: null,
                rcRecommended: null,
                rcDailydischgc: null,
                orgId: null,
                userId: null,
                langId: 1,
                lmodDate: null,
                updatedBy: null,
                updatedDate: null,
                rcRhgl: null,
                rcAhgl: null,
                rcDispWt: null,
                lgIpMac: null,
                lgIpMacUpd: null,
                wtV1: null,
                wtV2: null,
                wtV3: null,
                wtV4: null,
                wtV5: null,
                wtN1: null,
                wtN2: null,
                wtN3: null,
                wtN4: null,
                wtN5: null,
                wtD1: null,
                wtD2: null,
                wtD3: null,
                wtLo1: null,
                wtLo2: null,
                wtLo3: null,
                instId: null,
                codId1: null,
                codId2: null,
                codId3: null,
                codId4: null,
                codId5: null,
                rcTotdisttime: null
              },
              scrutinyApplicable: false,
              paymentModeOnline: false
             }

            $scope.free =  $sessionStorage.responsechecklistdata.free;
      		  RestService.savewaterconndata(waterDto).then(function (newwaterconnresponse){
      //			 alert("newwaterconnresponse--->>"+newwaterconnresponse.status);
              console.log("new water response"+JSON.stringify(newwaterconnresponse))
      			  if(newwaterconnresponse.status == "success"){
      				  $sessionStorage.applictNo = newwaterconnresponse.applicationNo;
      				  console.log("$sessionStorage.applictNo-"+$sessionStorage.applictNo);
      				  $sessionStorage.CSidn = newwaterconnresponse.applicationNo;
                $ionicLoading.hide();
                 var alertPopup = $ionicPopup.alert({
                   title: $filter('translate')('NEWWATERCONNECTION'),
                   template: $filter('translate')('NEWWATERCONNECTIONSAVED') +$sessionStorage.applictNo,
                   buttons : [{
                      text : $filter('translate')('OK'),
                      type : 'button button-block  customBgColor',
                      onTap : function(){
                         $ionicHistory.nextViewOptions({
                         disableBack: true,
                         disableAnimate: true,
                         historyRoot: true
                       });
                         $ionicHistory.clearCache();
                         $ionicHistory.clearHistory();
                         $state.go("app.home");
                      }
                   }]
                 });
      			  	}
      				  else{
      					  toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR'));
      					  $ionicLoading.hide();
      				  }
              },function (err) {
                    toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR_OCCURED'));
                    $ionicLoading.hide();
              })
      //				}
    }


	  var init = function ()
	  {
         RestService.getServiceId($scope.orgid,"WNC")
               .then(function (response) {
               console.log("service id response"+JSON.stringify(response));
               $ionicLoading.hide();
               $scope.ServiceIdGet = response;
               console.log("SERVICE OD "+$scope.ServiceIdGet)
             }, function (err) {
               $ionicLoading.hide();
               toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR_OCCURED'));

          })

		  $ionicLoading.show({	template: $filter('translate')('LOADING')	});
		  RestService.setdepentparams($scope.orgid,$sessionStorage.serviceCode,$sessionStorage.perfixchargeApplicableAt).then(function (setdependresponse) {
			   $sessionStorage.setDependentResponse = setdependresponse;
			  if(setdependresponse.wsStatus == "success"){
			  if(!setdependresponse.free){
				  $sessionStorage.TaxType = setdependresponse.responseObj[0].taxType;
				  $sessionStorage.TaxCode = setdependresponse.responseObj[0].taxCode;
				  $sessionStorage.TaxCategory = setdependresponse.responseObj[0].taxCategory;
				  $sessionStorage.TaxSubcategory1 = setdependresponse.responseObj[0].taxSubCategory;
				  $sessionStorage.chargeApplicableAt = setdependresponse.responseObj[0].chargeApplicableAt;


				   var lookUpCode = "TAC";
           var level = "2";

            RestService.getHPrefixData(lookUpCode,level,$scope.orgid).then(function (TACresponse) {
              console.log("TACresponse=="+TACresponse);
                for(var i=0;i<TACresponse.length;i++)
                  if(TACresponse[i].lookUpCode == $sessionStorage.TaxSubcategory1)
                    {
                      $sessionStorage.TaxSubcategory = 	TACresponse[i].descLangFirst;
                      $ionicLoading.hide();
                     }
                    },function (err){
                       toaster.error($filter('translate')('ERROR'), $filter('translate')('Please try after some time..'));
                      $ionicLoading.hide();
                  })
         }

			     $ionicLoading.hide();
		      }
        else{
            toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR'));
            $ionicLoading.hide();
          }
      },function (err) {
        toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR_OCCURED'));
        $ionicLoading.hide();
      });
  }

   var savedata = function(){

        $scope.applnDate = new Date().getTime();

        $ionicLoading.show({
          template:$filter('translate')('LOADING')
        });

       $scope.free =  $sessionStorage.responsechecklistdata.free;

       		  RestService.savewaterconndata(
                    $sessionStorage.WNCName,
                    $sessionStorage.WNCmobile.toString(),
                    $sessionStorage.WNCemailid,
                    $scope.orgid,
                    $scope.orgid,
                    $scope.userID,
                     $scope.ServiceIdGet,
                     parseInt($localStorage.langID),
                     $sessionStorage.documentObjectArray,
                     $sessionStorage.CNCbilladdress,
                     $sessionStorage.WNCpincode.toString(),
                     $sessionStorage.isConsumer,
                     $sessionStorage.isBilling,
                     $sessionStorage.WNCPropertyNo,
                     $sessionStorage.WNCBpl,
                     $scope.newAppInDate,
                     $sessionStorage.WNCConnSize,
                     $sessionStorage.WNCPlumber,
                     $sessionStorage.WNCZone,
                     $sessionStorage.WNCWard,
                     $sessionStorage.WNCtarif,
                     $sessionStorage.WNCIsTaxPayer,
                     $sessionStorage.WNCtemporary,
                     $sessionStorage.CNCpincode,
                     $sessionStorage.WCPropertyOutstanding,
                     $sessionStorage.WMNCUsageType,
                     $sessionStorage.WNCbplno,
                     $localStorage.macAddress,
                     $sessionStorage.ExitstingConnections
       						  ).then(function (newwaterconnresponse){
               console.log("new water response"+JSON.stringify(newwaterconnresponse))
       			  if(newwaterconnresponse.status == "success"){
       				  $sessionStorage.applictNo = newwaterconnresponse.applicationNo;
       				  console.log("$sessionStorage.applictNo-"+$sessionStorage.applictNo);
       				  $sessionStorage.CSidn = newwaterconnresponse.applicationNo;

                  $ionicLoading.show({
       					  	template: $filter('translate')('LOADING')
                  });
       				    $scope.feesId = {
                    1 : $scope.FlatRate
                  }
       		  		  $ionicLoading.hide();

       		  		   var alertPopup = $ionicPopup.alert({
                     title: $filter('translate')('CHANGEOFUSAGE'),
                     template: $filter('translate')('CHANGEOFSAVED') +$sessionStorage.applictNo,
                     buttons : [{
                        text : $filter('translate')('OK'),
                        type : 'button button-block  customBgColor',
                        onTap : function(){
                           $ionicHistory.nextViewOptions({
                           disableBack: true,
                           disableAnimate: true,
                           historyRoot: true
                         });
                           $ionicHistory.clearCache();
                           $ionicHistory.clearHistory();
                           $state.go("app.home");
                        }
                     }]
                   });
       			  	}
       				  else{
       					  toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR'));
       					  $ionicLoading.hide();
       				  }
               },function (err) {
                     toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR_OCCURED'));
                     $ionicLoading.hide();
                   })
       //				}
            };

		  init();
  }) /*controler ends*/

