angular.module('starter')
  .controller('waterConnectionDetails', function ($scope, RestService, $ionicLoading, $stateParams, toaster, $filter,
		  ENV, $state, $localStorage, localStorageService,$sessionStorage,$rootScope) {
  $sessionStorage.lookUpCodeAPL = "APL";
	$scope.search = '';
	$scope.data = {};
	$scope.totalPayableAmount;
	$scope.CSidn;
	$scope.Rebate;
	$scope.waterBillSearch = false;
  $scope.povertyLine = new Array();
  $sessionStorage.serviceCode = "WND";
  $sessionStorage.deptCode = "WT";
//	var logindata = $localStorage.responselogindata;
	console.log("$localStorage.responselogindata---"+JSON.stringify($localStorage.responselogindata));
//	$scope.orgid = $localStorage.responselogindata.orgId;
	$scope.orgid = $localStorage.selectedorgID;
	$scope.userID = $localStorage.responselogindata.userId;
	$scope.loginUSername = $localStorage.responselogindata.firstName;
	$scope.LoginMobileNo = $localStorage.responselogindata.mobileNo;
	$scope.ServiceShortName = "WNC";
	$scope.payingAmount;
	$scope.paymentGateway;
  $scope.showDues = false;
  $scope.otpError = "";
  $scope.AppFname = $localStorage.responselogindata.firstName;
  $scope.AppMname = $localStorage.responselogindata.middleName;
  $scope.AppLname = $localStorage.responselogindata.lastName;
  $scope.Appmobile = $localStorage.responselogindata.mobileNo;
  $scope.Appemail = $localStorage.responselogindata.emailId;
  if($localStorage.responselogindata.address == null){
     $scope.Appddress1 = "";
  }else{
     $scope.Appddress1 = $localStorage.responselogindata.address;
  }

  $scope.AppFname = $localStorage.responselogindata.firstName;

    $scope.changePoverty = function(){
      if($scope.povertyLineValue == "Y"){
        $scope.belowPoverty = true;
        $localStorage.belowPovertycheck = $scope.belowPoverty

      }else{
        $scope.belowPoverty = false;
        $localStorage.belowPovertycheck = $scope.belowPoverty
      }
    }

    $scope.povertyLine.push({
        value:"Y",
        name:"Yes"
    })

    $scope.povertyLine.push({
        value:"N",
        name:"No"
    })

	$scope.eighteendigit = function()
	{
		var licenseIDno = document.getElementById("connectionNosearch").value;
	    var inputVal = licenseIDno;
	    var numericReg = /^[0-9]{1,18}$/;

	    if(!numericReg.test(inputVal) || inputVal.length>18)
	    {
	    	inputVal.slice(0,-1);
	    	var inputValSlice = inputVal.slice(0,-1);
	    	document.getElementById("connectionNosearch").value = inputValSlice;
	    }
	}

	$scope.onlyNumericSixLimitInput = function()
	 {
	 	var pinlimit = document.getElementById("pincodelim").value;
	 	var inputVal = pinlimit;
	 	    var numericReg = /^[0-9]{1,10}$/;
	 	    if(!numericReg.test(inputVal) || inputVal.length>6)
	 	    {
	 	    	inputVal.slice(0,-1);
	 	    	var inputValSlice = inputVal.slice(0,-1);
	 	    	document.getElementById("pincodelim").value = inputValSlice;
	 	    }
	 }

    $scope.toggleGroup = function(group) {
      if ($scope.isGroupShown(group)) {
        $scope.shownGroup = null;
      } else {
        $scope.shownGroup = group;
      }
    };
    $scope.isGroupShown = function(group) {
      return $scope.shownGroup === group;
    };
	/*function start*/

	$scope.viewDues = function() {

	  var connectionDto =  {
    	fName: null,
     	mName: null,
     	lName: null,
     	mobileNo: null,
     	phone: null,
     	email: null,
     	orgId: $scope.orgid,
     	deptId: null,
     	empId: $scope.userID,
     	applicationId: null,
     	challanNo: null,
     	txnId: null,
     	licenseNo: null,
     	serviceId: 3678,
     	userId: $scope.userID,
     	langId: null,
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
     	consumerNo: parseInt($scope.search),
     	consumerName: null,
     	consumerAddress: null,
     	noOfCopies: null,
     	payMode: null,
     	charges: null,
     	waterDues: null,
     	duesAmount: null,
     	finYear: null,
     	wardId: null,
     	zoneId: null,
     	lgIpMac: null,
     	error: false,
     	errorMsg: null,
     	applicantDTO: {
     		organizationName: null,
     		applicantFirstName: $scope.AppFname,
     		applicantMiddleName: $scope.AppMname,
     		applicantLastName: $scope.AppLname,
     		gender: null,
     		mobileNo: parseInt($scope.Appmobile),
     		emailId: $scope.Appemail,
     		pinCode: $scope.Apppincode,
     		buildingName: null,
     		roadName: "",
     		applicantTitle: $scope.title,
     		areaName: $scope.Appddress1,
     		blockName: null,
     		housingComplexName: null,
     		wing: null,
     		floorNo: null,
     		phone1: null,
     		phone2: null,
     		contactPersonName: null,
     		villageTownSub: $scope.Appddress2 + " "+$scope.Appddress3,
     		cfcCitizenId: null,
     		povertyLine: null,
     		orgId: 0,
     		langId: 0,
     		userId: 0,
     		bplNo: "",
     		flatBuildingNo: null,
     		codTryId1: null,
     		codTryId2: null,
     		codTryId3: null,
     		codTryId4: null,
     		codTryId5: null,
     		aadharNo: $scope.AppbplNo,
     		dwzid1: $scope.Apppropertyzone,
     		dwzid2: $scope.Appdepropertyward,
     		dwzid3: null,
     		dwzid4: null,
     		dwzid5: null,
     		serviceId: null,
     		departmentId: null,
     		isBPL: $scope.povertyLineValue,
     		panNo: null
     	},
     	dues: false,
     	billGenerated: false
     }



		if(!$scope.search == ""){
			$ionicLoading.show({
				template:$filter('translate')('LOADING')
			});

			RestService.getConnectionDetails(connectionDto).then(function (response) {
			    console.log("bill dues"+JSON.stringify(response))
				if(!response.billGenerated && !response.dues){
				  $scope.showDues = true;
					$sessionStorage.waterbillresponse = response;
					$scope.data.Consumername = response.consumerName;
					$scope.data.ConsumerAddress = response.consumerAddress;
					$scope.data.Dueamount = response.duesList.waterDues;
					$scope.otpMobile = parseInt(response.csContactno);
					console.log("waterConnection response"+JSON.stringify(response))
				}else if(response.billGenerated){
				  $scope.showDues = false;
				  if($localStorage.langID == "1"){
				     $scope.label = "No bill generated yet agaisnst "+$scope.search+" not eligible to apply this service"
				  }else{
				     $scope.label = "इस सेवा को लागू करने के योग्य "+$scope.search+" के बिल के बावजूद अभी तक कोई बिल नहीं आया है"
				  }
				}else{
				  $scope.showDues = false;
          if($localStorage.langID == "1"){
             $scope.label = "Due Exists against connection number "+$scope.search
          }else{
             $scope.label = "Due Exists against connection number "+$scope.search
          }
				}
				$ionicLoading.hide();
			}, function (err) {
				toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR_OCCURED'));
				$ionicLoading.hide();
			})
		}
		else { alert ("Please Enter Connection Number"); }
    };

    $scope.forgotmobilesubmit = function() {
    //  $scope.show = 2;
    //			 $ionicLoading.show({
    //					template: $filter('translate')('LOADING')
    //				});
      $ionicLoading.show({
                template: 'Please wait generating OTP...'
      });
    	RestService.forgotoptservice($scope.orgid,$scope.otpMobile).then(function (responseregisterdata){
    		console.log("responseregisterdata---"+JSON.stringify(responseregisterdata));

    		//alert("responseregisterdata---"+responseregisterdata.status);
    		 if(responseregisterdata.status == "success"){
    			// $ionicLoading.hide();

    		  }	else{
    				toaster.error($filter('translate')('ERROR'), $filter('translate')('WRONGMOBILE'));
    			}
    		  $ionicLoading.hide();
    		},
    		function (err) {
    			toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR'));
    			$ionicLoading.hide();
    		  })
    	  }

    	  $scope.otpVerify = function() {
        		  	 //$scope.show = 3;
        			 $ionicLoading.show({
        					template: 'Verifying OTP...'
        				});
          $scope.otpError = "";
        	RestService.forgototpverfiy($scope.orgid,$scope.userID,$scope.otpMobile,$scope.data.Enterotp).then(function (responseOPTdata){
        	console.log("responseOPTdata---"+JSON.stringify(responseOPTdata));
        		 if(responseOPTdata.status == "success"){
        			 $ionicLoading.hide();
               $scope.otpError = "";
        		  }	else{
        				toaster.error($filter('translate')('ERROR'), $filter('translate')(''));
        				 if($localStorage.langID == "1"){
                     $scope.otpError = "Please enter valid OTP"
                  }else{
                     $scope.otpError = "कृपया वैध ओटीपी दर्ज करें"
                  }
        			}
        		 $ionicLoading.hide();
        		},
        		function (err) {
        			toaster.error($filter('translate')('ERROR'), $filter('translate')('WRONG_PASSWORD'));
        			$ionicLoading.hide();
        		  })
        	  }

    $scope.getNonHDatanew1 = function(lookUpCode,dropdown,orgId){
          RestService.getNHPrefixData(lookUpCode,orgId)
          .then(function(response){
            if(response.length > 0){
              if(lookUpCode == "PAY"){
                var listResponse = response;
                console.log("lookUpCode: "+lookUpCode+"|listResponse: "+JSON.stringify(listResponse));
                $rootScope[dropdown] = new Array();
                for(var i=0;i<listResponse.length;i++){
                  if(listResponse[i].otherField == 'Y'){
                    $rootScope[dropdown].push({
                      id: listResponse[i].lookUpId,
                      value : listResponse[i].lookUpCode,
                      name : listResponse[i].descLangFirst
                    })
                  }
                }
              }
              else{
                var listResponse = response;
                console.log("lookUpCode: "+lookUpCode+"|listResponse: "+JSON.stringify(listResponse));
                $rootScope[dropdown] = new Array();
                for(var i=0;i<listResponse.length;i++){
                if($localStorage.langID == "2"){
                $rootScope[dropdown].push({
                     value : listResponse[i].lookUpId,
                     name : listResponse[i].descLangSecond
                   })
                }else{
                  $rootScope[dropdown].push({
                    value : listResponse[i].lookUpId,
                    name : listResponse[i].descLangFirst
                  })
                  }
                }
              }
              $ionicLoading.hide();
            }
            else {
              $ionicLoading.hide();
              toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR_OCCURED'));
              return [];
            }
          },function(err){
            toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR_OCCURED'));
            $ionicLoading.hide();
            return [];
          })
      }

    $scope.fetchWard = function(){
      console.log("property ward"+$scope.Apppropertyzone)
       RestService.getHPrefixData("WZB","2",$scope.orgid).then(function (response) {
           if(response == undefined || response == null || response == ""){
               $ionicLoading.hide();
                return false;
           }else{
            console.log("response classification--"+JSON.stringify(response));
               $scope.propertyZoneWard=new Array();
               for(var i=0;i<response.length;i++){
                if(response[i].lookUpParentId == $scope.Apppropertyzone){
                  if($localStorage.langID == "1"){
                      $scope.propertyZoneWard.push({
                       value: response[i].lookUpId,
                       name:response[i].descLangFirst
                     })
                   }else{
                       $scope.propertyZoneWard.push({
                       value: response[i].lookUpId,
                       name:response[i].descLangSecond
                     })
                     }
                   }
                  }
               }
                $ionicLoading.hide();
            },function (err) {
              toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR_OCCURED'));
              $ionicLoading.hide();
            })
        }

     var init_ = function(){
       $scope.getNonHDatanew1("TTL","ttloptions",$scope.orgid);

       RestService.getHPrefixData("WZB","1",$scope.orgid).then(function (response) {
        if(response == undefined || response == null || response == ""){
            $ionicLoading.hide();
             return false;
        }else{
         console.log("response classification--"+JSON.stringify(response));
            $scope.propertyZone=new Array();
            for(var i=0;i<response.length;i++){
            if($localStorage.langID == "1"){
               $scope.propertyZone.push({
                value: response[i].lookUpId,
                name:response[i].descLangFirst
              })
            }else{
                $scope.propertyZone.push({
                value: response[i].lookUpId,
                name:response[i].descLangSecond
              })
              }
             }
            }
              $ionicLoading.hide();
          },function (err) {
            toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR_OCCURED'));
          $ionicLoading.hide();
         })

         RestService.getinitializedmodel().then(function (responsedata){
             		console.log("initial--"+JSON.stringify(responsedata));

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
                      $scope.financialYear = responsedata.responseObj[0].financialYear;

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
             					$sessionStorage.gapCode = responsedata.responseObj[1].gapCode;
             					$sessionStorage.isTempPlug = responsedata.responseObj[1].isTempPlug;
             					$sessionStorage.dependsOnFactor = responsedata.responseObj[1].dependsOnFactor;
             					$sessionStorage.roadLength = responsedata.responseObj[1].roadLength;
             					$sessionStorage.licencePeriod = responsedata.responseObj[1].licencePeriod;
             					$sessionStorage.typeOfTechnicalPerson = responsedata.responseObj[1].typeOfTechnicalPerson;
             					$sessionStorage.slab1 = responsedata.responseObj[1].slab1;
             					$sessionStorage.slab2 = responsedata.responseObj[1].slab2;
             					$sessionStorage.slab3 = responsedata.responseObj[1].slab3
             					$sessionStorage.slab4 = responsedata.responseObj[1].slab4;
             					$sessionStorage.slab5 = responsedata.responseObj[1].slab5;
             					$sessionStorage.slabRate1 = responsedata.responseObj[1].slabRate1;
             					$sessionStorage.slabRate2 = responsedata.responseObj[1].slabRate2;
             					$sessionStorage.slabRate3 = responsedata.responseObj[1].slabRate3;
             					$sessionStorage.slabRate4 = responsedata.responseObj[1].slabRate4;
             					$sessionStorage.slabRate5 = responsedata.responseObj[1].slabRate5;
             					$sessionStorage.flatRate = responsedata.responseObj[1].flatRate;
             					$sessionStorage.percentageRate = responsedata.responseObj[1].percentageRate;
             					$sessionStorage.chargeAmount = responsedata.responseObj[1].chargeAmount;
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

        var lookUpCode = "CAA";
           RestService.getNHPrefixData(lookUpCode,$scope.orgid).then(function (responseCAA) {
            console.log("responseCAA=="+JSON.stringify(responseCAA));
            if(responseCAA==undefined || responseCAA == null || responseCAA =="")
            {
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
                      console.log("prefix applicable at"+$sessionStorage.perfixchargeApplicableAt)

                      $ionicLoading.hide();
                    }
              $ionicLoading.hide();
            }
              },function (err) {
  //					toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR_OCCURED'));
                  $ionicLoading.hide();
            })

           $ionicLoading.show({	template: $filter('translate')('LOADING')	});
           		  RestService.setdepentparams($scope.orgid,$sessionStorage.serviceCode,$sessionStorage.perfixchargeApplicableAt).then(function (setdependresponse) {
           			   console.log("setDependentResponse"+JSON.stringify(setdependresponse))
           			  if(setdependresponse.wsStatus == "success"){
           				  $sessionStorage.TaxType = setdependresponse.responseObj[0].taxType;
           				  $sessionStorage.TaxCode = setdependresponse.responseObj[0].taxCode;
           				  $sessionStorage.TaxCategory = setdependresponse.responseObj[0].taxCategory;
           				  $sessionStorage.TaxSubcategory1 = setdependresponse.responseObj[0].taxSubCategory;
           				  $sessionStorage.chargeApplicableAt = setdependresponse.responseObj[0].chargeApplicableAt;
           				  $sessionStorage.taxId = setdependresponse.responseObj[0].taxId;
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
        $scope.submit = function(){
         $scope.wrNewRatestartDate= new Date().getTime();
          var serviceDto = {
              modelName: null,
              dataModel: [{
                orgId: $scope.orgid,
                usageSubtype1: $sessionStorage.wrusageSubtype1,
                usageSubtype2: $sessionStorage.wrusageSubtype2,
                usageSubtype3: $sessionStorage.wrusageSubtype3,
                usageSubtype4: $sessionStorage.wrusageSubtype4,
                usageSubtype5: $sessionStorage.wrusageSubtype5,
                factor1: $sessionStorage.wrfactor1,
                factor2: $sessionStorage.wrfactor2,
                factor3: $sessionStorage.wrfactor3,
                factor4: $sessionStorage.wrfactor4,
                isBPL: $scope.povertyLineValue,
                noOfDays: 0.0,
                serviceCode: $sessionStorage.serviceCode,
                deptCode: $sessionStorage.deptCode,
                financialYear: $scope.financialYear,
                ruleId: null,
                taxType: $sessionStorage.TaxType,
                taxCode: $sessionStorage.TaxCode,
                taxCategory: $sessionStorage.TaxCategory,
                taxSubCategory: $sessionStorage.TaxSubcategory1,
                consumption: 0.0,
                meterType: $sessionStorage.wrMeterType,
                gapCode: $sessionStorage.gapCode,
                isTempPlug: $sessionStorage.isTempPlug,
                dependsOnFactor: $sessionStorage.dependsOnFactor,
                chargeApplicableAt: $sessionStorage.chargeApplicableAt,
                connectionSize: $sessionStorage.wrConnSize,
                connectionType: $sessionStorage.wrConnType,
                roadLength: $sessionStorage.roadLength,
                licencePeriod: $sessionStorage.licencePeriod,
                roadType: $sessionStorage.wrRoadType,
                typeOfTechnicalPerson: $sessionStorage.typeOfTechnicalPerson,
                disConnectionType: $sessionStorage.wrDisConnType,
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
                flatRate: $sessionStorage.flatRate,
                percentageRate: $sessionStorage.percentageRate,
                chargeAmount: $sessionStorage.chargeAmount,
                noOfFamilies: 0,
                noOfCopies: $scope.data.NoOfCopies,
                rateStartDate: $scope.wrNewRatestartDate,
                transferMode: "NA",
                chargeDescEng: "Application Charge",
                chargeDescReg: "Application Charge",
                dependsOnFactorList: [],
                taxId: $sessionStorage.taxId,
                taxPayer: "NA",
                noOfRoomsORTabel: 0.0,
                closingBalanceOfSecurityDeposit: 0.0
              }]
             }
         RestService.servicechargeND(serviceDto)
      				  .then(function (responseservicechargedata){
      				console.log("responseservicechargedata--"+JSON.stringify(responseservicechargedata));
      				if(responseservicechargedata.wsStatus == "success"){
      					$sessionStorage.responseservicechargedata = responseservicechargedata;

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
      							 toaster.error($filter('translate')('ERROR'), $filter('translate')(''));
                }
      				},function (err) {
      					toaster.error($filter('translate')('ERROR'), $filter('translate')(''));
      					$ionicLoading.hide();
      				})
            }
    init_();
  });
