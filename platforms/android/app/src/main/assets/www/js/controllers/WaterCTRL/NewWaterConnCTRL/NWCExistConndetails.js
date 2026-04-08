angular.module('starter')

  .controller('NewWaterconnExistCTRL', function ($scope, $location, RestService, $ionicLoading, $stateParams, toaster,
		  $filter, ENV, dateFilter, $state, $localStorage,$sessionStorage,$ionicHistory,$ionicPopup) {

	  $scope.data_ = {};

	  console.log("$sessionStorage.responselogindata---"+JSON.stringify($localStorage.responselogindata));
//		$scope.orgid = $localStorage.responselogindata.orgId;
    $scope.orgid = $localStorage.selectedorgID;
		$scope.userID = $localStorage.responselogindata.userId;
		$scope.loginUSername = $localStorage.responselogindata.firstName;
		$scope.LoginMobileNo = $localStorage.responselogindata.mobileNo;
    $scope.connectionExisting = new Array();

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
    $scope.newAppInDate = new Date().getTime();
    $scope.applnDate = new Date().getTime();
		$sessionStorage.serviceCode = "WNC";
		$sessionStorage.deptCode = "WT";
//		var chargeApplicableAt = "150";

	    $scope.WNCexistconsumerdetail = false;
	    $scope.checkedOrNotexist = function (existdetail) {

	        if (existdetail) {
	            $scope.WNCexistconsumerdetail = true;
	        } else {

	        	 $scope.WNCexistconsumerdetail = false;
	        }
	    };

	    $scope.WNCexistpropertydetails = false;
	    $scope.checkedOrNotprop = function (WNCexistproperty) {

	        if (WNCexistproperty) {
	            $scope.WNCexistpropertydetails = true;
	        } else {

	        	 $scope.WNCexistpropertydetails = false;
	        }
	    };


        $scope.existdata = {};
        		   if($localStorage.english){
                  $scope.existdata = [
                      { value: "Y", label: "Yes" }
                      ,
                      { value: "N", label: "No" }
                  ];
        		   }else{
        		     $scope.existdata = [
                      { value: "Y", label: "हाँ" }
                      ,
                      { value: "N", label: "नहीं" }
                  ];
        		   }


        $scope.WNCexistconsumerdetail = $scope.existdata[1].value;
        $scope.WNCexistproperty = $scope.existdata[1].value;

     $scope.permttemp = {};
     		       if($localStorage.english){
     		           $scope.permttemp = [
                         { value: "P", label: "Permanent" }
                         ,
                         { value: "T", label: "Temporary" }
                     ];
     		       }else{
     		           $scope.permttemp = [
                         { value: "P", label: "स्थायी" }
                         ,
                         { value: "T", label: "अस्थायी" }
                     ];
     		       }
            $scope.WNCtemporary = $scope.permttemp[0].value;

	$scope.trfoptions = new Array();
		for(var i=0;i<$sessionStorage.getprefixdataresponseTRF.length;i++){
		 if($localStorage.english){
		   	$scope.trfoptions.push({
     			trfid : $sessionStorage.getprefixdataresponseTRF[i].lookUpId,
     			trfvalue : $sessionStorage.getprefixdataresponseTRF[i].descLangFirst,
     			trfname : $sessionStorage.getprefixdataresponseTRF[i].descLangFirst
     		})
		 }else{
		    $scope.trfoptions.push({
          trfid : $sessionStorage.getprefixdataresponseTRF[i].lookUpId,
          trfvalue : $sessionStorage.getprefixdataresponseTRF[i].descLangSecond,
          trfname : $sessionStorage.getprefixdataresponseTRF[i].descLangSecond
        })
		 }

	 }

               $scope.ulbRegis = {};
                 if($localStorage.english){
                    $scope.ulbRegis = [
                        { value: "Y", label: "ULB Registered" }
                        ,
                        { value: "N", label: "Not Ulb Registered" }
                    ];
                 }else{
                   $scope.ulbRegis = [
                        { value: "Y", label: "ulb पंजीकृत" }
                        ,
                        { value: "N", label: "ULB पंजीकृत नहीं" }
                    ];
        		   }

  $scope.add = function(){
     var existing ={}
     existing.connecNo = $scope.data_.connectionMultiple;
     for(var i = 0; i<$scope.cszoptions.length;i++){
     console.log("connection"+JSON.stringify($scope.cszoptions))
     console.log("connection option"+$scope.data_.WNCConnSizeMultiple+"onnection size"+$scope.cszoptions[i].cszid)
      if($scope.data_.WNCConnSizeMultiple == $scope.cszoptions[i].cszid){
        existing.connectInch = $scope.cszoptions[i].cszname
      }
     }
     //existing.connectInch = $scope.data_.WNCConnSizeMultiple;
     existing.connectOutStandingAmnt = $scope.data_.outAmntMultiple;


     $scope.connectionExisting.push(existing);

     $scope.data_.connectionMultiple = "";
     $scope.data_.WNCConnSizeMultiple = "";
     $scope.data_.outAmntMultiple = "";

//     if($scope.rebeatDetails.length > 0){
//       $scope.specialR = true;
//     }else{
//       $scope.specialR = false;
//     }
  }
  $scope.remove = function(index){
     $scope.connectionExisting.splice(index, 1);
  }
	$scope.selecttariff= function(){
		  console.log($scope.WNCtarif);
		  $scope.$watch('WNCtarif', function(newVal) {
			  var lookUpCode = "TRF";
			  var level = "1";
	            RestService.getHPrefixData(lookUpCode,level,$scope.orgid).then(function (prefixdataresponsepermise) {
				  console.log("prefixdataresponsepermise=="+prefixdataresponsepermise);

				$scope.permiseoptions1 = new Array();
				    for(var i=0;i<prefixdataresponsepermise.length;i++)
				    	if(prefixdataresponsepermise[i].lookUpParentId == $scope.WNCtarif)
				    	{
				    	 console.log("prefixdataresponsepermise=="+prefixdataresponsepermise[i]);
							$scope.permiseoptions1.push({
							permiseid1 : prefixdataresponsepermise[i].lookUpId,
							permisevalue1 : prefixdataresponsepermise[i].descLangFirst,
							permisename1 : prefixdataresponsepermise[i].descLangFirst
					   })
				    }
				},function (err){
			})
	    });
	};

	$scope.selectpermise1 = function(){
			console.log($scope.WNCpermise);
	}

			$scope.ccgoptions = new Array();
			    for(var i=0;i<$sessionStorage.getprefixdataresponseCCG.length;i++){
						$scope.ccgoptions.push({
						ccgid : $sessionStorage.getprefixdataresponseCCG[i].lookUpId,
						ccgname : $sessionStorage.getprefixdataresponseCCG[i].descLangFirst
				   })
			    }

			$scope.cszoptions = new Array();
			    for(var i=0;i<$sessionStorage.getprefixdataresponsecsz.length;i++){
						$scope.cszoptions.push({
						cszid : $sessionStorage.getprefixdataresponsecsz[i].lookUpId,
						cszvalue : $sessionStorage.getprefixdataresponsecsz[i].descLangFirst,
						cszname : $sessionStorage.getprefixdataresponsecsz[i].descLangFirst
				   })
			    }

	   /*prefix data end*/

	  /*---------------------------------------------------------------------------*/
	  var actiondetails;

	 $scope.initialzedmodel = function(){
	   $sessionStorage.WNCIsTaxPayer = $scope.WNCtax;
	   $sessionStorage.WNCPanNo = $scope.data_.panNo;
	   $scope.ruleId = null;
     $scope.documentGroup = null;
     $scope.financialYear = "NA";
     $scope.checklist ='';
     $scope.applicantType = "NA";
		 $scope.WNCexistconsumerdetail;
		 $sessionStorage.WNCexistconsumerdetail = $scope.WNCexistconsumerdetail;
		 $scope.WNCexistproperty;
		 $sessionStorage.WNCexistproperty = $scope.WNCexistproperty;
		 $scope.data_.WNCpropertyno;
		 $sessionStorage.WNCpropertyno = $scope.data_.WNCpropertyno;
		 /* existing consumer details*/
		 $sessionStorage.WNCpropertyno = $scope.data_.WNCexistconnno;
		 $sessionStorage.WNCpropertyno = $scope.data_.connSize;
		 $sessionStorage.WNCpropertyno = $scope.data_.WNCexisttaps;
     $sessionStorage.WNCPlumber = $scope.WNCplumber;
		 $scope.WNCconntype;
		 $sessionStorage.WNCconntype = $scope.WNCconntype;

		 console.log("connection type:"+ $scope.WNCconntype)
		 $scope.WNCnooffamily;
		 $sessionStorage.WNCnooffamily = $scope.WNCnooffamily;
		 $scope.WNCnoofusers;
		 $sessionStorage.WNCnoofusers = $scope.WNCnoofusers;
		 $scope.WNCtarif;
		 $sessionStorage.WNCtarif = $scope.WNCtarif;
		 $sessionStorage.ExitstingConnections = $scope.connectionExisting;
		 var seltarif = document.getElementById("seltarif");
		 tariftext= $scope.WNCtarif;
		 $sessionStorage.tariftext = tariftext;
		 console.log(seltarif.options[seltarif.selectedIndex].text);

//		 $scope.WNCpermise;
//		 $sessionStorage.WNCpermise = $scope.WNCpermise;
//		 var selpermise = document.getElementById("selpermise");
//		 permisetext= selpermise.options[selpermise.selectedIndex].text;
//		 $sessionStorage.permisetext = permisetext;
//		 console.log(selpermise.options[selpermise.selectedIndex].text);

		 $scope.data_.PlumberDetail;
		 $sessionStorage.PlumberDetail = $scope.data_.PlumberDetail;

		 $sessionStorage.WNCConnSize = $scope.WNCConnSize;

		 var selconSize = document.getElementById("selconSize");
		 selconSizetext= selconSize.options[selconSize.selectedIndex].text;
		 $sessionStorage.selconSizetext = parseFloat(selconSizetext);

		 $scope.WNCnooftaps;
		 $sessionStorage.WNCnooftaps = $scope.WNCnooftaps;

		  $scope.checklist ='';

	    	$ionicLoading.show({
					template: $filter('translate')('LOADING')
				});

		RestService.checklistcall2($sessionStorage.serviceCode,$sessionStorage.deptCode,tariftext,"NA",
		    $scope.applicantType,$sessionStorage.WNCexistconsumerdetail,$sessionStorage.WNCexistproperty,
		    $sessionStorage.WNCBpl,$scope.usageSubtype3,$scope.usageSubtype4,$scope.usageSubtype5,$scope.noOfDays,
		    $scope.isOutStandingPending,$scope.disConnectionType,$scope.factor1,$scope.factor2,$scope.factor3,
        $scope.factor4,$scope.orgid,$scope.applicantType,$scope.ruleId,$scope.documentGroup,$scope.financialYear)
        .then(function (responsechecklistdata){
          console.log("responsechecklistdata--"+JSON.stringify(responsechecklistdata));
          if(responsechecklistdata.wsStatus == "success"){

            $sessionStorage.responsechecklistdata = responsechecklistdata;
            console.log("$sessionStorage.responsechecklistdata--"+JSON.stringify($sessionStorage.responsechecklistdata));

            var lookUpCode = "CAA";
             RestService.getNHPrefixData(lookUpCode,$scope.orgid).then(function (responseCAA) {
              console.log("responseCAA=="+responseCAA);
              if(responseCAA==undefined || responseCAA == null || responseCAA =="")
              {
                 calculateChargers();
                 return false;
              }
              else
              {
    //					  $sessionStorage.responseCAA = responseCAA;
                console.log("$sessionStorage.lookUpCodeAPL--"+$sessionStorage.lookUpCodeAPL);
                  for(var i=0;i<responseCAA.length;i++)
                    if(responseCAA[i].lookUpCode == $sessionStorage.lookUpCodeAPL)
                      {
                        $sessionStorage.perfixchargeApplicableAt = 	responseCAA[i].lookUpId;
                         $state.go("app.NWCuploadoc");
                        $ionicLoading.hide();
                      }
                $ionicLoading.hide();
              }
                },function (err) {
    //					toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR_OCCURED'));
                    $ionicLoading.hide();
                  })

               $ionicLoading.hide();
            }
            else{
                saveWaterData()
            }
          },function (err) {
    //				toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR'));
            $ionicLoading.hide();
			})

			/* RestService.setdepentparams($scope.orgid,$sessionStorage.serviceCode,chargeApplicableAt).then(function (setdependresponse) {
				  if(setdependresponse.wsStatus == "success"){
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
						    		  $state.go("app.NWCuploadoc");
						    		$ionicLoading.hide();
						    }
						},function (err){
							 toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR'));
								$ionicLoading.hide();
					})

				 $ionicLoading.hide();
			  }
			else{
					toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR'));
					$ionicLoading.hide();
				}
			  },function (err) {
				  toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR'));
					$ionicLoading.hide();
				})*/
	  };

  var calculateChargers = function(){
     $ionicLoading.show({	template: $filter('translate')('LOADING')});
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
                           getCharge()
                          },function (err){
                          toaster.error($filter('translate')('ERROR'), $filter('translate')('Please try after some time..'));
                          $ionicLoading.hide();
                       })
              }else{
                 saveWaterData();
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

  var getCharge = function(){

            $ionicLoading.show({template: $filter('translate')('LOADING')});

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

              //$scope.free =  $sessionStorage.responsechecklistdata.free;
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


/*-------------------------------------------------------*/
var _init = function ()
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
	$ionicLoading.show({
		template: $filter('translate')('LOADING')
	});

	RestService.getinitializedmodel().then(function (responsedata){
		console.log("resposeaayaainitial--"+JSON.stringify(responsedata));

		if(responsedata.wsStatus == "success"){

					$scope.orgId = responsedata.responseObj[0].orgId;
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
					$scope.serviceCode = responsedata.responseObj[0].serviceCode;
					$scope.deptCode = responsedata.responseObj[0].deptCode;
					$scope.applicantType = responsedata.responseObj[0].applicantType;
					$scope.isOutStandingPending = responsedata.responseObj[0].isOutStandingPending;
					$scope.isExistingConnectionOrConsumerNo = responsedata.responseObj[0].isExistingConnectionOrConsumerNo;
					$scope.isExistingProperty = responsedata.responseObj[0].isExistingProperty;
					$scope.disConnectionType = responsedata.responseObj[0].disConnectionType;


					$sessionStorage.wrorgId = responsedata.responseObj[1].orgId;
					$sessionStorage.wrusageSubtype1 = responsedata.responseObj[1].usageSubtype1;
					$sessionStorage.wrusageSubtype2 = responsedata.responseObj[1].usageSubtype2;
					$sessionStorage.wrusageSubtype3 = responsedata.responseObj[1].usageSubtype3;
					$sessionStorage.wrusageSubtype4 = responsedata.responseObj[1].usageSubtype4;
					$sessionStorage.wrusageSubtype5 = responsedata.responseObj[1].usageSubtype5;
					$sessionStorage.wrfactor1 = responsedata.responseObj[1].factor1;
					$sessionStorage.wrfactor2 = responsedata.responseObj[1].factor2;
					$sessionStorage.wrfactor3 = responsedata.responseObj[1].factor3;
					$sessionStorage.wrfactor4 = responsedata.responseObj[1].factor4;
					$sessionStorage.wrisBPL = responsedata.responseObj[1].isBPL;
					$sessionStorage.wrServiceCode = responsedata.responseObj[1].serviceCode;
					$sessionStorage.wrDeptCode = responsedata.responseObj[1].deptCode;
					$sessionStorage.wrTaxType = responsedata.responseObj[1].taxType;
					$sessionStorage.wrTaxCode = responsedata.responseObj[1].taxCode;
					$sessionStorage.wrTaxCate = responsedata.responseObj[1].taxCategory;
					$sessionStorage.wrTaxSubCate = responsedata.responseObj[1].taxSubCategory;
					$sessionStorage.wrMeterType = responsedata.responseObj[1].meterType;
					$sessionStorage.wrChargeAppl = responsedata.responseObj[1].chargeApplicableAt;
					$sessionStorage.wrConnSize = responsedata.responseObj[1].connectionSize;
					$sessionStorage.wrConnType = responsedata.responseObj[1].connectionType;
					$sessionStorage.wrRoadType = responsedata.responseObj[1].roadType;
					$sessionStorage.wrtransferMode = responsedata.responseObj[1].transferMode;
					$sessionStorage.wrDisConnType = responsedata.responseObj[1].disConnectionType;
					$sessionStorage.wrRatestartDate = responsedata.responseObj[1].rateStartDate;
					$ionicLoading.hide();
		  	}
		else{
					toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR'));
					$ionicLoading.hide();
				}
	},function (err) {
		toaster.error($filter('translate')('ERROR'), $filter('translate')('Failed Load BRMS'));
		$ionicLoading.hide();
	})

      $scope.bpldata = {};
		   if($localStorage.english){
          $scope.bpldata = [
              { value: "Y", label: "Yes" }
              ,
              { value: "N", label: "No" }
          ];
		   }else{
		     $scope.bpldata = [
              { value: "Y", label: "हाँ" }
              ,
              { value: "N", label: "नहीं" }
          ];
		   }
  	        $scope.WNCBpl = $scope.bpldata[1].value;
       	RestService.getPlumber($scope.orgid).then(function (responseWWZ) {
  				  console.log("get plubmber=="+responseWWZ);
  				  if(responseWWZ==undefined || responseWWZ == null || responseWWZ=="")
  				  {
  				  	 return false;
  				  }
  				  else
  				  {
  					  $sessionStorage.plumber = responseWWZ;
  					  $scope.plumber = new Array();
  					    for(var i=0;i<$sessionStorage.plumber.length;i++){
  							$scope.plumber.push({
                  pid : $sessionStorage.plumber[i].plumberId,
                  pname : $sessionStorage.plumber[i].plumberFullName
  					     })
  				     }
  					  $ionicLoading.hide();
  				  }
  				},function (err){
  					toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR_OCCURED'));
  					$ionicLoading.hide();
  				})
}

	_init();

  }) /*controler ends*/

