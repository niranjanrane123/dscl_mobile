angular.module('starter')
.controller('waterDisconnectionCTRL', function ($scope, RestService, $ionicLoading, $stateParams, 
		toaster, $filter, ENV, $state, $localStorage,$sessionStorage,$ionicPopup,$ionicHistory){
	$scope.data = {};
	console.log("$localStorage.responselogindata---"+JSON.stringify($localStorage.responselogindata));
	$scope.orgid = $localStorage.selectedorgID;
	$scope.userID = $localStorage.responselogindata.userId;
	$scope.loginUSername = $localStorage.responselogindata.firstName;
	$scope.LoginMobileNo = $localStorage.responselogindata.mobileNo;
	$sessionStorage.lookUpCodeAPL = "APL";
	var connectiondetail;
	$sessionStorage.serviceCode = "WCC";
	$sessionStorage.deptCode = "WT";
	var lookUpCode = "TRF";

    $scope.changePoverty = function(){
      if($scope.plbPovertyLine == 5836){
        $scope.plbPovertyLinee = "Y";

      }else{
        $scope.plbPovertyLinee = "N";
      }
    }
		//get deparment id
    RestService.getDepartId($scope.orgid,$sessionStorage.serviceCode)
      .then(function (response) {
      console.log("service id response"+JSON.stringify(response));
      $ionicLoading.hide();
      $sessionStorage.deptId = response;

      console.log("DEPRTMENT ID "+response)
    }, function (err) {
      $ionicLoading.hide();
      toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR_OCCURED'));
    })

    //get deparment id
    RestService.getServiceId($scope.orgid,$sessionStorage.serviceCode)
      .then(function (response) {
      console.log("service id response"+JSON.stringify(response));
      $ionicLoading.hide();
      $sessionStorage.serviceId = response;

      console.log("DEPRTMENT ID "+response)
    }, function (err) {
      $ionicLoading.hide();
      toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR_OCCURED'));
    })
	/*var PermiseText;
	var TarifText;
	var ApplicantType;
	var applbplflag;*/
	 $scope.changeAttr = function(item){
			if($scope.data.disfromdate == "" || $scope.data.disfromdate == null || $scope.data.disfromdate == undefined )
				item.currentTarget.setAttribute("placeholder","From Date");
			else item.currentTarget.setAttribute("placeholder","");
		} 
	  $scope.tochangeAttr = function(item){
			if($scope.data.distodate == "" || $scope.data.distodate == null || $scope.data.distodate == undefined )
				item.currentTarget.setAttribute("placeholder","To Date");
			else item.currentTarget.setAttribute("placeholder","");
		}

	/*Function Declaration Start*/
$scope.disconnNoSearchDetails = false;
$scope.disConnNosearch = function()
 {
  var discconectionDto = {
    	fName: null,
    	mName: null,
    	lName: null,
    	mobileNo: null,
    	phone: null,
    	email: null,
    	orgId: $scope.orgid,
    	deptId: null,
    	empId: null,
    	applicationId: null,
    	challanNo: null,
    	txnId: null,
    	licenseNo: null,
    	serviceId: null,
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
    	connectionNo: $scope.connectionNosearch.toString(),
    	freeService: false,
    	uploadDocument: null,
    	disconnectionDto: null,
    	applicantDetailsDto: null,
    	connectionInfo: null,
    	consumerName: null
    }
  
	var lookUpCode = "TRF";
	$ionicLoading.show({	template: 'Loading..'	});
		RestService.disconnsearchConnectionDetails(discconectionDto)
		.then(function (response) {
			console.log("response--"+JSON.stringify(response));
			if(response.status == "success")
				{
					$sessionStorage.connectiondetail = response.connectionList;
				  for(var i=0;i<$sessionStorage.connectiondetail.length;i++){
					  var fname = $sessionStorage.connectiondetail[i].csName;
					  $sessionStorage.tarifNumber = $sessionStorage.connectiondetail[i].trmGroup1;
					  $sessionStorage.tarifMeter = $sessionStorage.connectiondetail[i].csMeteredccn;

					  console.log('meter'+$sessionStorage.tarifMeter)
					  $sessionStorage.csCcnsize = $sessionStorage.connectiondetail[i].csCcnsize;
					   console.log('size'+$sessionStorage.csCcnsize)

					  if(response.connectionList[i].csMname == null){
						  var middlename = "";
					  }else{
						  var middlename = $sessionStorage.connectiondetail[i].csMname;
					  }
					  if(response.connectionList[i].csLname == null){
              var lname = "";
            }else{
              var lname = $sessionStorage.connectiondetail[i].csLname;
            }

					  var fullname = fname+ " " +middlename+ " " +lname;
					  
					  $scope.data.disConsumerName = fullname;
					  $scope.data.disAreaName = $sessionStorage.connectiondetail[i].csAdd;
					  var tariftext = $sessionStorage.connectiondetail[i].trmGroup1;
			var lookUpCode = "TRF";
			var level = "1";
		RestService.getHPrefixData(lookUpCode,level,$scope.orgid).then(function (getprefixdataresponseTRF) {
			console.log("getprefixdataresponseTRF=="+getprefixdataresponseTRF);
			if(getprefixdataresponseTRF==undefined || getprefixdataresponseTRF == null || getprefixdataresponseTRF==""){
				 $ionicLoading.hide();  
				return false;
			}
			else{
			   	for(var i=0;i<getprefixdataresponseTRF.length;i++)
				{
					if(tariftext == getprefixdataresponseTRF[i].lookUpId)
					{
						$sessionStorage.TarifText = getprefixdataresponseTRF[i].descLangFirst;
					}
				} 
				$ionicLoading.hide();
			}
		},function (err) { 
			toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR'));
		  $ionicLoading.hide();
		})
	var permisetext = $sessionStorage.connectiondetail[i].trmGroup2;
	  var level = "2";
	  RestService.getHPrefixData(lookUpCode,level,$scope.orgid).then(function (permiseresponse) {
		console.log("getprefixdataresponseTRF=="+permiseresponse);
		if(permiseresponse==undefined || permiseresponse == null || permiseresponse=="")
		{
		  $ionicLoading.hide();  
			return false;
		}
	    else
		{
	    	for(var i=0;i<permiseresponse.length;i++){
				if(permisetext == permiseresponse[i].lookUpId)
				{
					$sessionStorage.PermiseText = permiseresponse[i].descLangFirst;
				}
			}
			 $ionicLoading.hide();
		}
	},function (err) {
		$ionicLoading.hide();
	})
	 var applicantType = $sessionStorage.connectiondetail[i].applicantType;
	  var lookUpCode = "APT";
		RestService.getNHPrefixData(lookUpCode,$scope.orgid).then(function (responseAPT){
		console.log("responseAPT=="+responseAPT);
		if(responseAPT==undefined || responseAPT == null || responseAPT=="")
			{
				$ionicLoading.hide();
				return false;
			}
			else
			{
				for(var i=0;i<responseAPT.length;i++){
					if(applicantType == responseAPT[i].lookUpId)
					{
						$sessionStorage.ApplicantType = responseAPT[i].descLangFirst;
					}
				}
				$ionicLoading.hide();
			}
		},function (err) { 
			$ionicLoading.hide();
		})
		var metertype = $sessionStorage.connectiondetail[i].csMeteredccn;
		var lookUpCode = "WMN";
		RestService.getNHPrefixData(lookUpCode,$scope.orgid).then(function (responseWMN){
			console.log("responseWMN=="+responseWMN);
				if(responseWMN==undefined || responseWMN == null || responseWMN=="")
					{
						$ionicLoading.hide();
						return false;
					}
					else
					{
						for(var i=0;i<responseWMN.length;i++){
							if(metertype == responseWMN[i].lookUpId)
							{
								$sessionStorage.MeterType = responseWMN[i].descLangFirst;
							}
						}
						$ionicLoading.hide();
					}
				},function (err) { 
//					toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR'));
						$ionicLoading.hide();
				})
				
		var connsize = $sessionStorage.connectiondetail[i].csCcnsize;
		var lookUpCode = "CSZ";
		RestService.getNHPrefixData(lookUpCode,$scope.orgid).then(function (responsecsz){
			console.log("responsecsz=--"+responsecsz);
				if(responsecsz==undefined || responsecsz == null || responsecsz=="")
					{
						$ionicLoading.hide();
						return false;
					}
					else
					{
						for(var i=0;i<responsecsz.length;i++){
							if(connsize == responsecsz[i].lookUpId)
							{
								$sessionStorage.ConnSize = responsecsz[i].descLangFirst;
							}
						}
						$ionicLoading.hide();
					}
				},function (err) { 
//					toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR'));
						$ionicLoading.hide();
				})
		
          $sessionStorage.applbplflag = $sessionStorage.connectiondetail[i].bplFlag;
          $scope.disconnNoSearchDetails = true;
				}
				  $ionicLoading.hide();
			}
			else
				{	
					$ionicLoading.hide();
					toaster.error($filter('translate')('ERROR'), $filter('translate')('WRONG_CONN_NUMBER'));
				}
				$ionicLoading.hide();
		},function (err) { 
			toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR_OCCURED'));
			$ionicLoading.hide();
		})
	 }

  $scope.validateplumber = function()
  {
    var plumberNo = $scope.data.plumberlicNo;

    RestService.validatePlumber(plumberNo).then(function (responsedata){
      console.log("plumberNo--"+JSON.stringify(responsedata));
    if(responsedata == null || responsedata == "" || responsedata == undefined)
      {
        alert("Please Enter A Valid Plumber License No.");
        return false;
        $ionicLoading.hide();
      }else{
        $sessionStorage.plumberNo = responsedata;
        $ionicLoading.hide();
      }
      $ionicLoading.hide();
    },function (err){
      $ionicLoading.hide();
    })
  }

/*----BRMS checklis call-----  */

  $scope.saveDisconnection = function(){

       $sessionStorage.disccType =  $scope.data.disConnType;
       $sessionStorage.pinCode = $scope.plbPinCode;
       $sessionStorage.Title = $scope.plbTitle;
       $sessionStorage.Address2 = $scope.plbAddress2;
       $sessionStorage.Ward = $scope.plbWard;
       $sessionStorage.Zone = $scope.plbZone;
       $sessionStorage.PovertyLine = $scope.plbPovertyLine;
       $sessionStorage.discconectionReson = $scope.data.disConnReason;
       $ionicLoading.show({	template: $filter('translate')('LOADING')	});

       RestService.checklistcall2(
          $sessionStorage.serviceCode,$sessionStorage.deptCode,$scope.usageSubtype1,$scope.oldCOUpermiseType,
          $scope.applicantType,$scope.isExistingConnectionOrConsumerNo,$scope.isExistingProperty,
          $scope.plbPovertyLine,$scope.usageSubtype3,$scope.usageSubtype4,$scope.usageSubtype5,$scope.noOfDays,
          $scope.isOutStandingPending,$scope.disConnectionType,$scope.factor1,$scope.factor2,$scope.factor3,
          $scope.factor4,$scope.orgid,$scope.applicantType,$scope.ruleId,$scope.documentGroup,$scope.financialYear).
          then(function (responsechecklistdata){
          $ionicLoading.show({	template: $filter('translate')('LOADING')	});
          console.log("responsechecklistdata--"+JSON.stringify(responsechecklistdata));
        if(responsechecklistdata.wsStatus == "success"){
            $sessionStorage.responsechecklistdata = responsechecklistdata;
            var lookUpCode = "CAA";
            RestService.getNHPrefixData(lookUpCode,$scope.orgid).then(function (responseCAA) {
               $sessionStorage.responsechecklistdata = responsechecklistdata;
                var lookUpCode = "CAA";
                 RestService.getNHPrefixData(lookUpCode,$scope.orgid).then(function (responseCAA) {
                  console.log("responseCAA=="+JSON.stringify(responseCAA));
                    if(responseCAA==undefined || responseCAA == null || responseCAA =="")
                    {
                       calculateChargers();
                       return false;
                    }
                    else
                    {
                      console.log("$sessionStorage.lookUpCodeAPL--"+$sessionStorage.lookUpCodeAPL);
                        for(var i=0;i<responseCAA.length;i++)
                          if(responseCAA[i].lookUpCode == $sessionStorage.lookUpCodeAPL)
                            {
                              $sessionStorage.perfixchargeApplicableAt = 	responseCAA[i].lookUpId;
                              $state.go("app.UploadDoc");
                              $ionicLoading.hide();
                            }
                      $ionicLoading.hide();
                    }
                 },function (err) {
        //					toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR_OCCURED'));
                    $ionicLoading.hide();
                   })
                  $ionicLoading.hide();
              },function (err) {
  //					toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR_OCCURED'));
                $ionicLoading.hide();
               })
                  $ionicLoading.hide();
          }
          else{
            saveDisconnectionDetails();
          }
            $ionicLoading.hide();
          },function (err) {
            toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR'));
            $ionicLoading.hide();
          })
        }

        var saveDisconnectionDetails = function(){
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
            $ionicLoading.show({template: $filter('translate')('LOADING')	});
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
                  uploadDocument: null,
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
        }

/*Function Declaration End*/
	
  var _init = function (){
    //get BPL
   var lookUpCode  = "YNC";
      RestService.getNHPrefixData(lookUpCode,$scope.orgid).then(function (bplResponse2){
        console.log("getbplresponse=="+JSON.stringify(bplResponse2));
        if(bplResponse2==undefined || bplResponse2 == null || bplResponse2=="")
        {

          $ionicLoading.hide();
           return false;
        }
      else
       {
        $scope.bplResponse2 = new Array();
         for(var i=0;i<bplResponse2.length;i++){
          if($localStorage.langNewId == "1"){
              $scope.bplResponse2.push({
                  id : bplResponse2[i].lookUpId,
                  value : bplResponse2[i].descLangFirst
              })
             }else{
              $scope.bplResponse2.push({
                  id : bplResponse2[i].lookUpId,
                  value : bplResponse2[i].descLangSecond
                })
             }
           }
          $ionicLoading.hide();
        }
      },function (err) { toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR')); })

    //get ward

     $scope.fetchWard = function(){
     console.log("property ward"+$scope.plbZone)
      RestService.getHPrefixData("WZB","2",$scope.orgid).then(function (response) {
          if(response == undefined || response == null || response == ""){
              $ionicLoading.hide();
               return false;
          }else{
           console.log("response classification--"+JSON.stringify(response));
            $scope.ZoneWard=new Array();
            for(var i=0;i<response.length;i++){
             if(response[i].lookUpParentId == $scope.plbZone){
               if($localStorage.langNewId == "1"){
                   $scope.ZoneWard.push({
                    value: response[i].lookUpId,
                    name:response[i].descLangFirst
                  })
                }else{
                    $scope.ZoneWard.push({
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

    // property zone
     RestService.getHPrefixData("WZB","1",$scope.orgid).then(function (response) {
       if(response == undefined || response == null || response == ""){
           $ionicLoading.hide();
            return false;
       }else{
        console.log("response classification--"+JSON.stringify(response));
           $scope.Zone=new Array();
           for(var i=0;i<response.length;i++){
           if($localStorage.langNewId == "1"){
              $scope.Zone.push({
               value: response[i].lookUpId,
               name:response[i].descLangFirst
             })
           }else{
               $scope.Zone.push({
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

    // get TITLE
     var lookUpCode  = "TTL";
        RestService.getNHPrefixData(lookUpCode,$scope.orgid).then(function (titleResponse2){
          console.log("gettitle=="+JSON.stringify(titleResponse2));
          if(titleResponse2==undefined || titleResponse2 == null || titleResponse2=="")
          {
             return false;
          }
        else
         {
           $scope.titleResponse2 = new Array();
           for(var i=0;i<titleResponse2.length;i++){
             if($localStorage.langNewId == "1"){
                $scope.titleResponse2.push({
                    id : titleResponse2[i].lookUpId,
                    value : titleResponse2[i].descLangFirst
                })
               }else{
                $scope.titleResponse2.push({
                    id : titleResponse2[i].lookUpId,
                    value : titleResponse2[i].descLangSecond
                  })
               }
             }
          }
        },function (err) { toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR')); })
	  $ionicLoading.show({	template: 'Loading..'	});
		var lookUpCode =  "DIC"
		RestService.getNHPrefixData(lookUpCode,$scope.orgid)
		.then(function (DICresponse) {
			console.log("responseDIC--"+ JSON.stringify(DICresponse));
      if(DICresponse==undefined || DICresponse == null || DICresponse=="")
          {
             return false;
          }
          else
          {		$scope.DICoptions = new Array();
              for(var i=0;i<DICresponse.length;i++){
              if($localStorage.langNewId == 1){
                 $scope.DICoptions.push({
                  id : DICresponse[i].lookUpId,
                  name : DICresponse[i].descLangFirst
                 })
                }else{
                   $scope.DICoptions.push({
                  id : DICresponse[i].lookUpId,
                  name : DICresponse[i].descLangSecond
                 })
                }
              }
          $ionicLoading.hide();
         }
				$ionicLoading.hide();
		},function (err){ 
			toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR_OCCURED'));
			$ionicLoading.hide();
		})
    var lookUpCode = "CAA";
  	RestService.getNHPrefixData(lookUpCode,$scope.orgid).then(function (responseCAA) {
      console.log("responseCAA=="+responseCAA);
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
                $ionicLoading.hide();
              }
        $ionicLoading.hide();
      }
        },function (err) {
//					toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR_OCCURED'));
          $ionicLoading.hide();
    })
		
	RestService.getinitializedmodel().then(function (responsedata){
		console.log("ChecklistModel|WaterRateMaster--"+JSON.stringify(responsedata)); 
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

          /*rti rate master*/

          $sessionStorage.couwrorgId = responsedata.responseObj[1].orgId;
          $sessionStorage.couwrusageSubtype1 = responsedata.responseObj[1].usageSubtype1;
          $sessionStorage.couwrusageSubtype2 = responsedata.responseObj[1].usageSubtype2;
          $sessionStorage.couwrusageSubtype3 = responsedata.responseObj[1].usageSubtype3;
          $sessionStorage.couwrusageSubtype4 = responsedata.responseObj[1].usageSubtype4;
          $sessionStorage.couwrusageSubtype5 = responsedata.responseObj[1].usageSubtype5;
          $sessionStorage.couwrfactor1 = responsedata.responseObj[1].factor1;
          $sessionStorage.couwrfactor2 = responsedata.responseObj[1].factor2;
          $sessionStorage.couwrfactor3 = responsedata.responseObj[1].factor3;
          $sessionStorage.couwrfactor4 = responsedata.responseObj[1].factor4;
          $sessionStorage.couwrisBPL = responsedata.responseObj[1].isBPL;
          $sessionStorage.couwrServiceCode = responsedata.responseObj[1].serviceCode;
          $sessionStorage.couwrDeptCode = responsedata.responseObj[1].deptCode;
          $sessionStorage.couwrTaxType = responsedata.responseObj[1].taxType;
          $sessionStorage.couwrTaxCode = responsedata.responseObj[1].taxCode;
          $sessionStorage.couwrTaxCate = responsedata.responseObj[1].taxCategory;
          $sessionStorage.couwrTaxSubCate = responsedata.responseObj[1].taxSubCategory;
          $sessionStorage.couwrMeterType = responsedata.responseObj[1].meterType;
          $sessionStorage.couwrChargeAppl = responsedata.responseObj[1].chargeApplicableAt;
          $sessionStorage.couwrConnSize = responsedata.responseObj[1].connectionSize;
          $sessionStorage.couwrConnType = responsedata.responseObj[1].connectionType;
          $sessionStorage.couwrRoadType = responsedata.responseObj[1].roadType;
          $sessionStorage.couwrtransferMode = responsedata.responseObj[1].transferMode;
          $sessionStorage.couwrDisConnType = responsedata.responseObj[1].disConnectionType;
          $sessionStorage.couwrRatestartDate = responsedata.responseObj[1].rateStartDate;
          $sessionStorage.chargeAmount = responsedata.responseObj[1].chargeAmount;
          $sessionStorage.closingBalanceOfSecurityDeposit = responsedata.responseObj[1].closingBalanceOfSecurityDeposit;
          $sessionStorage.consumption = responsedata.responseObj[1].consumption;
          $sessionStorage.dependsOnFactor = responsedata.responseObj[1].dependsOnFactor;

          $sessionStorage.financialYear = responsedata.responseObj[1].financialYear;
          $sessionStorage.flatRate = responsedata.responseObj[1].flatRate;
          $sessionStorage.gapCode = responsedata.responseObj[1].gapCode;
          $sessionStorage.isTempPlug = responsedata.responseObj[1].isTempPlug;
          $sessionStorage.licencePeriod = responsedata.responseObj[1].licencePeriod;
          $sessionStorage.meterType = responsedata.responseObj[1].meterType;
          $sessionStorage.noOfCopies = responsedata.responseObj[1].noOfCopies;
          $sessionStorage.noOfDays = responsedata.responseObj[1].noOfDays;
          $sessionStorage.noOfFamilies = responsedata.responseObj[1].noOfFamilies;
          $sessionStorage.noOfRoomsORTabel = responsedata.responseObj[1].noOfRoomsORTabel;
          $sessionStorage.percentageRate = responsedata.responseObj[1].percentageRate;
          $sessionStorage.roadLength = responsedata.responseObj[1].roadLength;
          $sessionStorage.roadType = responsedata.responseObj[1].roadType;
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
          $sessionStorage.slabRate5 = responsedata.responseObj[1].slabRate5;
          $ionicLoading.hide();
          setDependentParameter();
       }
		else{
//				toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR'));
				$ionicLoading.hide();
    }
    },function (err){
      toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR'));
      $ionicLoading.hide();
    })


    var setDependentParameter = function(){
        $ionicLoading.show({	template: $filter('translate')('LOADING')});
        RestService.setdepentparams($scope.orgid,$sessionStorage.serviceCode,$sessionStorage.perfixchargeApplicableAt).then(function (setdependresponse) {
           $sessionStorage.setDependentResponse = setdependresponse;
           console.log("dependent parameter"+JSON.stringify(setdependresponse))
          if(setdependresponse.wsStatus == "success"){
          if(!setdependresponse.free){
            $sessionStorage.TaxType = setdependresponse.responseObj[0].taxType;
            $sessionStorage.TaxCode = setdependresponse.responseObj[0].taxCode;
            $sessionStorage.taxId = setdependresponse.responseObj[0].taxId;
            $sessionStorage.TaxCategory = setdependresponse.responseObj[0].taxCategory;
            $sessionStorage.TaxSubcategory1 = setdependresponse.responseObj[0].taxSubCategory;
            $sessionStorage.chargeApplicableAt = setdependresponse.responseObj[0].chargeApplicableAt;
            $sessionStorage.dependsOnFactorList = setdependresponse.responseObj[0].dependsOnFactorList;
            $sessionStorage.taxPayer = setdependresponse.responseObj[0].taxPayer;
            $sessionStorage.chargeDescEng = setdependresponse.responseObj[0].chargeDescEng;
            $sessionStorage.chargeDescReg = setdependresponse.responseObj[0].chargeDescReg;
            $sessionStorage.taxSubCategory = setdependresponse.responseObj[0].taxSubCategory;
            $sessionStorage.chargeApplicableAt = setdependresponse.responseObj[0].chargeApplicableAt;
            $sessionStorage.transferMode = setdependresponse.responseObj[0].transferMode;
            $sessionStorage.typeOfTechnicalPerson = setdependresponse.responseObj[0].typeOfTechnicalPerson;
            $sessionStorage.usageSubtype0 = setdependresponse.responseObj[0].usageSubtype0;


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

  };
    _init();
});
