angular.module('starter')

  .controller('UploadDocCTRL', function ($rootScope,$scope, $location, RestService, $ionicLoading, $stateParams, toaster,
		  $filter, ENV, dateFilter, $state, $localStorage,$sessionStorage,$ionicPopup,$ionicHistory) {

	  console.log("$localStorage.responselogindata---"+JSON.stringify($localStorage.responselogindata));
		$scope.orgid = $localStorage.selectedorgID;
		$scope.userID = $localStorage.responselogindata.userId;
		$scope.loginUSername = $localStorage.responselogindata.firstName;
		$scope.LoginMobileNo = $localStorage.responselogindata.mobileNo;
		var serviceCode = "WCC";
		var arrayListTest	=	new Array();

		$localStorage.Lock	= 0;
		$localStorage.TempArray	;
  console.log("responsechecklistdata--"+JSON.stringify($sessionStorage.responsechecklistdata));
	$scope.documentlist = $sessionStorage.responsechecklistdata.responseObj;
		  console.log("documentlist ::: "+JSON.stringify($scope.documentlist));
		  $scope.docsitems = [];
		  var newconndoctable = "";
			for (var i = 0; i < $scope.documentlist.length; i++) {
				var docdata = {
				    attactID: $scope.documentlist[i].attachmentId,
		            docID: $scope.documentlist[i].documentId,
		            docName: $scope.documentlist[i].documentName,
		            docSerialNo: $scope.documentlist[i].documentSerialNo,
		            docDescType: $scope.documentlist[i].descriptionType,
		            docType: $scope.documentlist[i].documentType,
		            docDescMar: $scope.documentlist[i].doc_DESC_Mar,
		            docDesceng: $scope.documentlist[i].doc_DESC_ENGL,
		            docByteCode: $scope.documentlist[i].documentByteCode,
		            docMandatory: fullmandatory($scope.documentlist[i].checkkMANDATORY)
				   }
				$scope.docsitems.push(docdata);
			}


    var lookUpCode = "TRF";
    var level = "1";
     RestService.getHPrefixData(lookUpCode,level,$scope.orgid).then(function (getprefixdataresponseTRF) {
        console.log("getprefixdataresponseTRF=="+JSON.stringify(getprefixdataresponseTRF));
        if(getprefixdataresponseTRF==undefined || getprefixdataresponseTRF == null || getprefixdataresponseTRF=="")
        {

         $ionicLoading.hide();
           return false;
        }
        else
        {
          for(var i=0;i<getprefixdataresponseTRF.length;i++){
            if(getprefixdataresponseTRF[i].lookUpId == $sessionStorage.tarifNumber){
               $scope.trfoptions = getprefixdataresponseTRF[i].descLangFirst
               console.log("result 1 "+$scope.trfoptions)
            }
           }
          $ionicLoading.hide();
        }

      },function (err) {
        toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR'));
        $ionicLoading.hide();
      })
      var lookUpCode = "WMN";
      var level = "1";
      RestService.getNHPrefixData(lookUpCode,level,$scope.orgid).then(function (getmeternon) {
        console.log("getmeterno meter=="+JSON.stringify(getmeternon));
        if(getmeternon==undefined || getmeternon == null || getmeternon=="")
        {
         $ionicLoading.hide();
           return false;
        }
        else
        {
          for(var i=0;i<getmeternon.length;i++){
            if(getmeternon[i].lookUpId == $sessionStorage.tarifMeter){
               $scope.meterType = getmeternon[i].descLangFirst
            }
           }
          $ionicLoading.hide();
        }

      },function (err) {
        toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR'));
        $ionicLoading.hide();
      })

       var lookUpCode = "CSZ";
       var level = "1";
        RestService.getNHPrefixData(lookUpCode,level,$scope.orgid).then(function (getcsize) {
          console.log("getcsize=="+JSON.stringify(getcsize));
          if(getcsize==undefined || getcsize == null || getcsize=="")
          {

           $ionicLoading.hide();
             return false;
          }
          else
          {
            for(var i=0;i<getcsize.length;i++){
              if(getcsize[i].lookUpId == $sessionStorage.csCcnsize){
                 $scope.cSize = getcsize[i].descLangFirst
              }
            }
            $ionicLoading.hide();
          }

        },function (err) {
          toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR'));
          $ionicLoading.hide();
        })


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
//	  		$scope.encoded_file = "DISCONNECTION";
//	  		console.log("encoded byte--"+$localStorage.encoded_file);

	  		for(var k=0;k<$scope.documentlist.length;k++)
	  		{
	  			var documentObject	=
	  				{
	  					attachmentId: $scope.documentlist[k].attachmentId,
	  					documentId: $scope.documentlist[k].documentId,
	  					documentName: null,
	  					documentSerialNo: $scope.documentlist[k].documentSerialNo,
	  					descriptionType: $scope.documentlist[k].descriptionType,
	  					documentType: $scope.documentlist[k].documentType,
	  					doc_DESC_Mar: $scope.documentlist[k].doc_DESC_Mar,
	  					doc_DESC_ENGL: $scope.documentlist[k].doc_DESC_ENGL,
	  					documentByteCode: null,
	  					checkkMANDATORY: $scope.documentlist[k].checkkMANDATORY
	  				};

	  			if($localStorage.Lock == 0)
				{
					if($scope.documentlist[k].documentId == idValue)
					{
						documentObject.documentName		=	verfy.name;
						documentObject.documentByteCode	=	$scope.encoded_file;
					}
					arrayListTest.push(documentObject);
					if((k+1)==$scope.documentlist.length)
					{
						$localStorage.Lock = 1;
					}
				}
	  			else
				{
					 for (var l=0; l <arrayListTest.length; l++) {
					        if (arrayListTest[l].documentId == idValue && $scope.documentlist[k].documentId == idValue)
					        {
					        	arrayListTest[l].documentName		=	verfy.name;
					        	arrayListTest[l].documentSerialNo 	= 	$scope.documentlist[k].documentSerialNo;
					        	arrayListTest[l].doc_DESC_Mar 		=	$scope.documentlist[k].doc_DESC_Mar;
					        	arrayListTest[l].doc_DESC_ENGL 		=	$scope.documentlist[k].doc_DESC_ENGL;
					        	arrayListTest[l].documentByteCode	=	$scope.encoded_file;
					        	arrayListTest[l].checkkMANDATORY 	= 	$scope.documentlist[k].checkkMANDATORY;
					        }
					    }
				}

	  		}
	  		console.log("Final $localStorage.TempArray-----"+JSON.stringify(arrayListTest));
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

			 $sessionStorage.startDate= new Date().getTime();

       $ionicLoading.show({	template:$filter('translate')('LOADING')	});

       var chargeDto = {

        dataModel: [
            {
              chargeAmount: $sessionStorage.chargeAmount,
              chargeApplicableAt: $sessionStorage.chargeApplicableAt,
              chargeDescEng: $sessionStorage.chargeDescEng,
              chargeDescReg: $sessionStorage.chargeDescReg,
              closingBalanceOfSecurityDeposit: $sessionStorage.closingBalanceOfSecurityDeposit,
              connectionSize: $scope.cSize,
              connectionType: $sessionStorage.couwrConnType,
              consumption: $sessionStorage.consumption,
              dependsOnFactor: $sessionStorage.dependsOnFactor,
              dependsOnFactorList:  $sessionStorage.dependsOnFactorList,
              deptCode: $sessionStorage.deptCode,
              disConnectionType: "Permanent Disconnection",
              factor1: $sessionStorage.couwrfactor1,
              factor2: $sessionStorage.couwrfactor2,
              factor3: $sessionStorage.couwrfactor3,
              factor4: $sessionStorage.couwrfactor4,
              financialYear: $sessionStorage.financialYear,
              flatRate: $sessionStorage.flatRate,
              gapCode: $sessionStorage.gapCode,
              isBPL: $sessionStorage.PovertyLine,
              isTempPlug: $sessionStorage.isTempPlug,
              licencePeriod: $sessionStorage.licencePeriod,
              meterType: $scope.meterType,
              noOfCopies: $sessionStorage.noOfCopies,
              noOfDays: $sessionStorage.noOfDays,
              noOfFamilies: $sessionStorage.noOfFamilies,
              noOfRoomsORTabel: $sessionStorage.noOfRoomsORTabel,
              orgId: $scope.orgid,
              percentageRate: $sessionStorage.percentageRate,
              rateStartDate: $sessionStorage.startDate,
              roadLength: $sessionStorage.roadLength,
              roadType: $sessionStorage.roadType,
              ruleId: null,
              serviceCode: serviceCode,
              slab1: $sessionStorage.slab1,
              slab2: $sessionStorage.slab2,
              slab3: $sessionStorage.slab3,
              slab4: $sessionStorage.slab4,
              slab5: $sessionStorage.slab5,
              slabRate1: $sessionStorage.slabRate1,
              slabRate2: $sessionStorage.slabRate2,
              slabRate3: $sessionStorage.slabRate3,
              slabRate4: $sessionStorage.slabRate4,
              slabRate5: $sessionStorage.slabRate5,
              taxCategory: $sessionStorage.TaxCategory,
              taxCode: $sessionStorage.TaxCode,
              taxId: $sessionStorage.taxId,
              taxPayer: $sessionStorage.taxPayer,
              taxSubCategory: $sessionStorage.taxSubCategory,
              taxType: $sessionStorage.TaxType,
              transferMode: $sessionStorage.transferMode,
              typeOfTechnicalPerson: $sessionStorage.typeOfTechnicalPerson,
              usageSubtype1: $scope.trfoptions,
              usageSubtype2: $sessionStorage.couwrusageSubtype2,
              usageSubtype3: $sessionStorage.couwrusageSubtype3,
              usageSubtype4: $sessionStorage.couwrusageSubtype4,
              usageSubtype5: $sessionStorage.couwrusageSubtype5
            }
        ],
        modelName: null
       }
       if($sessionStorage.setDependentResponse.free){
          for(var i=0;i<$sessionStorage.connectiondetail.length;i++){
              var applicantTitle = $sessionStorage.connectiondetail[i].csTitle;
              var applicantFirstName = $sessionStorage.connectiondetail[i].csName;
              var applicantMiddleName = $sessionStorage.connectiondetail[i].csMname;
              var applicantLastName = $sessionStorage.connectiondetail[i].csLname;
              var mobileNo = $sessionStorage.connectiondetail[i].csContactno;
              var bplNo = $sessionStorage.connectiondetail[i].bplNo;
              var housingComplexName = $sessionStorage.connectiondetail[i].csBldplt;
              var roadName = $sessionStorage.connectiondetail[i].csRdcross;
              var areaName = $sessionStorage.connectiondetail[i].csAdd;
              var csIdn = $sessionStorage.connectiondetail[i].csIdn;
              var csApldate = $sessionStorage.connectiondetail[i].csApldate;
            }
            $ionicLoading.show({template: $filter('translate')('LOADING')});
              var saveDisccDto = {
                  fName: applicantFirstName,
                  mName: applicantMiddleName,
                  lName: applicantLastName,
                  mobileNo: mobileNo,
                  phone: mobileNo,
                  email: null,
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
                  updatedBy: null,
                  serviceShortCode: null,
                  tenant: null,
                  documentList: null,
                  dirPath: null,
                  titleId: null,
                  blockNo: null,
                  floor: null,
                  wing: null,
                  bldgName: null,
                  houseComplexName: null,
                  roadName: null,
                  areaName: null,
                  pincodeNo: null,
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
                  connectionNo: null,
                  freeService: false,
                  uploadDocument: $sessionStorage.documentObjectArray,
                  disconnectionDto: {
                    discId: 0,
                    csIdn: csIdn,
                    apmApplicationId: null,
                    discAppdate: $sessionStorage.startDate,
                    discReason: $sessionStorage.discconectionReson,
                    discType: $sessionStorage.disccType,
                    discMethod: null,
                    discGrantFlag: null,
                    discAprvdate: null,
                    discApprovedby: null,
                    discExecdate: null,
                    orgId: $scope.orgid,
                    userId: $scope.userID,
                    langId: 0,
                    lmodDate: $sessionStorage.startDate,
                    updatedBy: null,
                    updatedDate: null,
                    lgIpMac: $localStorage.macAddress,
                    lgIpMacUpd: null,
                    wlbWrPrflg: null,
                    wtV2: null,
                    wtV3: null,
                    wtV4: null,
                    wtV5: null,
                    wlbWkno: null,
                    wtN2: null,
                    wtN3: null,
                    wtN4: null,
                    wtN5: null,
                    wlbWkdt: null,
                    wtD2: null,
                    wtD3: null,
                    wtLo1: null,
                    wtLo2: null,
                    wtLo3: null,
                    plumId: null,
                    disconnectFromDate: null,
                    disconnectToDate: null,
                    fileList: []
                  },
                  applicantDetailsDto: {
                    organizationName: null,
                    applicantFirstName: applicantFirstName,
                    applicantMiddleName: applicantMiddleName,
                    applicantLastName: applicantLastName,
                    gender: null,
                    mobileNo: mobileNo,
                    emailId: $scope.emailId,
                    pinCode: $sessionStorage.pinCode,
                    buildingName: null,
                    roadName: null,
                    applicantTitle: $sessionStorage.Title,
                    areaName: $sessionStorage.Address2,
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
                    dwzid1: $sessionStorage.Zone,
                    dwzid2: $sessionStorage.Ward,
                    dwzid3: null,
                    dwzid4: null,
                    dwzid5: null,
                    serviceId: null,
                    departmentId: null,
                    isBPL: $sessionStorage.PovertyLine,
                    panNo: null
                  },
                  connectionInfo: null,
                  consumerName: null
                 }
          	  RestService.disconnsave(saveDisccDto).then(function (disconnresponse){
                console.log("disconnresponse----"+JSON.stringify(disconnresponse));
                   if(disconnresponse.status == "success"){
                     $ionicLoading.hide();
                     $sessionStorage.applictNo = disconnresponse.applicationNo;

                     var alertPopup = $ionicPopup.alert({
                         title: $filter('translate')('DISCOONECTION'),
                         template: $filter('translate')('WATERDISCCSAVED') +$sessionStorage.applictNo,
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
                  },function (err){
                      toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR_OCCURED'));
                      $ionicLoading.hide();
                  })
           }else{
           RestService.servicechargeWTDiscconection(chargeDto)
               .then(function (responseservicechargedata){
           console.log("responseservicechargedata.wsStatus-"+ JSON.stringify(responseservicechargedata));
           if(responseservicechargedata.wsStatus == "success"){

            $sessionStorage.responseservicechargedata = responseservicechargedata;

            RestService.getPayOpt($scope.orgid,$scope.userID).then(function (response) {
                console.log("dash==="+response);
                if(response.status =="success"){
                  $sessionStorage.Bankresponse = response;
                  $ionicLoading.hide();
                  $state.go("app.DisconnPay");
                }else{
                  return false;
                }
                $ionicLoading.hide();
              }, function (err) {
                $ionicLoading.hide();
              })

               $ionicLoading.hide();
              }
              else{
                  $ionicLoading.hide();
                  toaster.error($filter('translate')('ERROR'), $filter('translate')(''));
                }
            },function (err) {
              toaster.error($filter('translate')('ERROR'), $filter('translate')(''));
              $ionicLoading.hide();
            })
          }
	  };


  }) /*controler ends*/

