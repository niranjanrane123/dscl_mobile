angular.module('starter')

  .controller('COoldNewDetailCTRL', function ($scope, $location, RestService, $ionicLoading, $stateParams, toaster,
		  $filter, ENV, dateFilter, $state, $localStorage,$sessionStorage,$ionicModal,$window) {

	 console.log("$localStorage.responselogindata---"+JSON.stringify($localStorage.responselogindata));
//		$scope.orgid = $localStorage.responselogindata.orgId;
		$scope.orgid = $localStorage.selectedorgID;
		$scope.userID = $localStorage.responselogindata.userId;
		$scope.loginUSername = $localStorage.responselogindata.firstName;
		$scope.LoginMobileNo = $localStorage.responselogindata.mobileNo;
    $scope.emailId = $localStorage.responselogindata.emailId;
    $localStorage.langID = "1";
    $scope.ServiceShortName = "WCO";
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
	  $sessionStorage.lookUpCodeAPL = "APL";
	  $sessionStorage.serviceCode = "WCO";
	  $sessionStorage.deptCode = "WT";
//	  var chargeApplicableAt = "16";

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

	/*
	    $scope.checkedOrNot = function (addinfochecked) {
	        if (addinfochecked) {
	        	openModal('new','','','','','','');
	        } else {
	        	return;
	        }
	    };*/

		/* modal */

			 $ionicModal.fromTemplateUrl('templates/modal.html', {
				    scope: $scope,
				    animation: 'slide-in-up'
				  }).then(function(modal) {
				    $scope.modal = modal;
				  });

				  $scope.openModal = function(action,ownerTitle,ownerFirstName,ownerMiddleName,ownerLastName,gender,macAddress) {
						$scope.RCModalParams = {
								action: action,
								/*id: id,
								amount: amount*/
								ownerTitle:ownerTitle,
								ownerFirstName:ownerFirstName,
								ownerMiddleName:ownerMiddleName,
								ownerLastName:ownerLastName,
								cao_id:null,
								csIdn:null,
								cao_address:null,
								cao_contactno:null,
								orgid:null,
								userId:null,
								langId:null,
								lmoddate:null,
								updatedBy:null,
								updatedDate:null,
								lgIpMac:null,
								lgIpMacUpd:null,
								gender:gender,
								caoUID:null,
								caoNewTitle:ownerTitle,
								caoNewFName:ownerFirstName,
								caoNewMName:ownerMiddleName,
								caoNewLName:ownerLastName,
								caoNewGender:gender,
								caoNewUID:null,
								isDeleted:null
							}
						$scope.$broadcast('RCOpenModalEvt',JSON.stringify($scope.RCModalParams));
				    $scope.modal.show();
				  };

				  $scope.closeModal = function() {
				    $scope.modal.hide();
				  };

					$scope.$on('RCChangeEvt', function (event, data){
				    	$scope.receiptCollections = {};
				    	$scope.receiptCollections = data;
				    	console.log("receiptCollections:"+JSON.stringify($scope.receiptCollections));
				    });

				  $scope.$on('$destroy', function() {
				    $scope.modal.remove();
				  });

				  $scope.removeReceiptHead = function (index) {
				    	var confirmDelete = $scope.showconfirmbox();
				    	if(confirmDelete == "Y"){
					    	var deleteAmount = $sessionStorage.receiptArray[index].amount;
					    	$scope.AccTotalAmount -= parseInt(deleteAmount);
					    	$sessionStorage.receiptArray.splice(index, 1);
					    	$scope.receiptCollections = $sessionStorage.receiptArray;
					    	if(!$scope.receiptCollections || $scope.receiptCollections.length < 1) $("#receiptErrorMsg").show();
				    	}else {
				    		return;
				    	}
				    };

				    $scope.showconfirmbox = function () {
					    if ($window.confirm("Are you sure you want to delete?")) return "Y";
					    else return "N";
				    }
		/* modal */

	  console.log("ownerresponse---"+$sessionStorage.ownerresponse);
					$scope.oldCOWconnName = $sessionStorage.ownerresponse.oldOwnerFullName;
					$sessionStorage.oldCOWconnName = $scope.oldCOWconnName;
					$scope.oldtitle = $sessionStorage.ownerresponse.cooOtitle;
					$sessionStorage.oldtitle = $scope.oldtitle;
					$scope.oldconnNo = $sessionStorage.ownerresponse.connectionNumber;
					$sessionStorage.oldconnNo = $scope.oldconnNo;
					$scope.oldcsidn = $sessionStorage.ownerresponse.conId;
					$sessionStorage.CSidn = $scope.oldcsidn;
					$scope.oldCOUconnSize = $sessionStorage.ownerresponse.conSize;

					 var lookUpCode = "CSZ";
              RestService.getNHPrefixData(lookUpCode,$scope.orgid).then(function (CSZresponse) {
						  console.log("CSZresponse=="+CSZresponse);

						    for(var i=0;i<CSZresponse.length;i++)
						    	if(CSZresponse[i].lookUpId == $scope.oldCOUconnSize)
						    	{
						    		$sessionStorage.oldCOUconnSize = 	CSZresponse[i].descLangFirst;
						    		$ionicLoading.hide();
						    }
              },function (err){
                 toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR'));
                  $ionicLoading.hide();
              })

					$sessionStorage.oldCOUconnSize = $scope.oldCOUconnSize;
					$scope.oldcodDwzid1 = $sessionStorage.ownerresponse.codDwzid1;
					$sessionStorage.oldcodDwzid1 = $scope.oldcodDwzid1;
					$scope.oldcodDwzid2 = $sessionStorage.ownerresponse.codDwzid2;
					$sessionStorage.oldcodDwzid2 = $scope.oldcodDwzid2;
					$scope.oldCOUtarifCate = $sessionStorage.ownerresponse.trmGroup1;
					$sessionStorage.oldCOUtarifCate = $scope.oldCOUtarifCate;
					$scope.oldCOUpermiseType = $sessionStorage.ownerresponse.trmGroup2;
					$sessionStorage.oldCOUpermiseType = $scope.oldCOUpermiseType;
					$sessionStorage.oldCOUmetertype = $sessionStorage.ownerresponse.meterType;
					$scope.applmeterread = $sessionStorage.ownerresponse.meterType;

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
								if($scope.applmeterread == responseWMN[i].lookUpId)
								{
									$sessionStorage.applmeterread = responseWMN[i].descLangFirst;
								}
							}
							$ionicLoading.hide();
						}
					},function (err) {
//						toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR'));
							$ionicLoading.hide();
					})


					$scope.oldCOUapplicantType = $sessionStorage.ownerresponse.applicantType;
					$sessionStorage.oldCOUapplicantType = $scope.oldCOUapplicantType;
					var lookUpCode = "APT";
					RestService.getNHPrefixData(lookUpCode,$scope.orgid).then(function (responseAPT){
					console.log("responseWMN=="+responseAPT);
					if(responseAPT==undefined || responseAPT == null || responseAPT=="")
						{
							$ionicLoading.hide();
							return false;
						}
						else
						{
							for(var i=0;i<responseAPT.length;i++){
								if($scope.oldCOUapplicantType == responseAPT[i].lookUpId)
								{
									$sessionStorage.applicantType = responseAPT[i].descLangFirst;
								}
							}
							$ionicLoading.hide();
						}
					},function (err) {
//						toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR'));
							$ionicLoading.hide();
					})


						$scope.cszoptions = new Array();
						    for(var i=0;i<$sessionStorage.getprefixdataresponsecsz.length;i++){
									$scope.cszoptions.push({
									cszid : $sessionStorage.getprefixdataresponsecsz[i].lookUpId,
									cszvalue : $sessionStorage.getprefixdataresponsecsz[i].descLangFirst,
									cszname : $sessionStorage.getprefixdataresponsecsz[i].descLangFirst
							   })
						    }
							$scope.trfoptions = new Array();
							    for(var i=0;i<$sessionStorage.getprefixdataresponseTRF.length;i++){
										$scope.trfoptions.push({
										trfid : $sessionStorage.getprefixdataresponseTRF[i].lookUpId,
										trfvalue : $sessionStorage.getprefixdataresponseTRF[i].descLangFirst,
										trfname : $sessionStorage.getprefixdataresponseTRF[i].descLangFirst
								   })
								   $scope.prefix = $sessionStorage.getprefixdataresponseTRF[i].lookUpId;
							    }

							$scope.permiseoptions = new Array();
							    for(var i=0;i<$sessionStorage.prefixdataresponsepermise.length;i++){
										$scope.permiseoptions.push({
										permiseid : $sessionStorage.prefixdataresponsepermise[i].lookUpId,
										permisevalue : $sessionStorage.prefixdataresponsepermise[i].descLangFirst,
										permisename : $sessionStorage.prefixdataresponsepermise[i].descLangFirst
								   })
								   $scope.prefix = $sessionStorage.prefixdataresponsepermise[i].lookUpId;
							    }

							    $("#cszoptions").val(oldconnsize).change();
							    $("#trfoptions").val(oldtarifcos).change();
							    $("#permiseoptions").val(oldpermisecos).change();


          /*new prefix*/
        $scope.genoptions = new Array();
          for(var i=0;i<$sessionStorage.getprefixdataresponsegen.length;i++){
          if(!$localStorage.english){
             $scope.genoptions.push({
                genid : $sessionStorage.getprefixdataresponsegen[i].lookUpId,
                genname : $sessionStorage.getprefixdataresponsegen[i].descLangFirst
              })
          }else{
              $scope.genoptions.push({
                genid : $sessionStorage.getprefixdataresponsegen[i].lookUpId,
                genname : $sessionStorage.getprefixdataresponsegen[i].descLangSecond
             })
          }
        }

        $scope.ttloptions = new Array();
            for(var i=0;i<$sessionStorage.getprefixdataresponsettl.length;i++){
            if(!$localStorage.english){
                $scope.ttloptions.push({
                    ttlid : $sessionStorage.getprefixdataresponsettl[i].lookUpId,
                    ttlname : $sessionStorage.getprefixdataresponsettl[i].descLangFirst
                 })
            }else{
               $scope.ttloptions.push({
                  ttlid : $sessionStorage.getprefixdataresponsettl[i].lookUpId,
                  ttlname : $sessionStorage.getprefixdataresponsettl[i].descLangSecond
               })
            }

        }
           $scope.tfmoptions = new Array();
            for(var i=0;i<$sessionStorage.TFMresponse.length;i++){
            if(!$localStorage.english){
              $scope.tfmoptions.push({
                tfmid : $sessionStorage.TFMresponse[i].lookUpId,
                tfmname : $sessionStorage.TFMresponse[i].descLangFirst
             })
            }else{
              $scope.tfmoptions.push({
                tfmid : $sessionStorage.TFMresponse[i].lookUpId,
                tfmname : $sessionStorage.TFMresponse[i].descLangSecond
             })
            }
           }

      $scope.confrmproceed = function(){

      $ionicLoading.show({	template: $filter('translate')('LOADING')});
			$sessionStorage.newtransfermode = $scope.newtransfermode;
			$sessionStorage.WNCselecttitle = $scope.WNCselecttitle;
			$sessionStorage.WNCFirstname = $scope.WNCFirstname;
			$sessionStorage.WNCMiddlename = $scope.WNCMiddlename;
			$sessionStorage.WNCLastname = $scope.WNCLastname;
			$sessionStorage.WNCgender = $scope.WNCgender;
			$sessionStorage.WNCaadharnumber = $scope.WNCaadharnumber;
			$sessionStorage.COURemarks = $scope.COURemarks;
			$sessionStorage.wrisBPL = $scope.COBpl
		  $scope.newtransfermode;
		  $sessionStorage.newtransfermode = $scope.newtransfermode;
		  var sel = document.getElementById("TFMname");
		  TFMtext = sel.options[sel.selectedIndex].text;
		  $sessionStorage.TFMtext = TFMtext;
		  console.log(sel.options[sel.selectedIndex].text);

		  $scope.oldCOUtarifCate;
		  console.log("oldCOUtarifCate--"+$scope.oldCOUtarifCate);

		  var sel = document.getElementById("oldtarifcos");
		  costariftext= sel.options[sel.selectedIndex].text;
		  $sessionStorage.costariftext =costariftext;
		  console.log(sel.options[sel.selectedIndex].text);

		  $scope.oldCOUpermiseType;
		  console.log("oldCOUpermiseType--"+$scope.oldCOUpermiseType);
		  var sel = document.getElementById("oldpermisecos");
		  cospermisetext= sel.options[sel.selectedIndex].text;
		  $sessionStorage.cospermisetext = cospermisetext;

		  var sel = document.getElementById("oldconnsize");
		  cosconnsizetext= sel.options[sel.selectedIndex].text;
		  $sessionStorage.cosconnsizetext = cosconnsizetext;
        $scope.applicantType = "NA";
        $scope.ruleId = null;
        $scope.documentGroup = null;
        $scope.financialYear = "NA";
			  $scope.checklist ='';
//				var apptypetext = "Individual";
//				var WNCBpl = "N";
//			RestService.COSchecklistcall(costariftext,cospermisetext,$scope.usageSubtype3,$scope.usageSubtype4,$scope.usageSubtype5,
//				$scope.isOutStandingPending,$scope.isExistingConnectionOrConsumerNo,$scope.isExistingProperty,$scope.disConnectionType,
//				$scope.factor1,$scope.factor2,$scope.factor3,$scope.factor4,$scope.orgid).then(function (responsechecklistdata){
			//alert($scope.COBpl);
      RestService.checklistcall2(
          $sessionStorage.serviceCode,$sessionStorage.deptCode,$sessionStorage.costariftext,$scope.oldCOUpermiseType,
          $sessionStorage.applicantType,$scope.isExistingConnectionOrConsumerNo,$scope.isExistingProperty,
          $scope.COBpl,$scope.usageSubtype3,$scope.usageSubtype4,$scope.usageSubtype5,$scope.noOfDays,
          $scope.isOutStandingPending,$scope.disConnectionType,$scope.factor1,$scope.factor2,$scope.factor3,
          $scope.factor4,$scope.orgid,$scope.applicantType,$scope.ruleId,$scope.documentGroup,$scope.financialYear).
          then(function (responsechecklistdata){

          console.log("responsechecklistdata--"+JSON.stringify(responsechecklistdata));
        if(responsechecklistdata.wsStatus == "success"){
            $sessionStorage.responsechecklistdata = responsechecklistdata;
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
                  console.log("$sessionStorage.lookUpCodeAPL--"+$sessionStorage.lookUpCodeAPL);
                    for(var i=0;i<responseCAA.length;i++)
                      if(responseCAA[i].lookUpCode == $sessionStorage.lookUpCodeAPL)
                        {
                          $sessionStorage.perfixchargeApplicableAt = 	responseCAA[i].lookUpId;
                            $state.go("app.COuploaddoc");
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
            calculateChargers();
            toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR'));
          }
            $ionicLoading.hide();
          },function (err) {
            $ionicLoading.hide();
          })
       };


    var _init = function (){
      RestService.getServiceId($scope.orgid,"WCO").then(function (response){
                console.log("response"+ response)
                $scope.serviceID = response;
      }, function (err) {	$ionicLoading.hide();	})


      $ionicLoading.show({
        template:$filter('translate')('LOADING')
      });
    RestService.getinitializedmodel().then(function (responsedata){
  //	console.log("resposeaayaainitial--"+responsedata);
    console.log("resposeaayaainitial.wsStatus--"+responsedata.wsStatus)

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
          //$scope.isBPL = responsedata.responseObj[0].isBPL;
          $scope.noOfDays = responsedata.responseObj[0].noOfDays;
          $scope.serviceCode = responsedata.responseObj[0].serviceCode;
          $scope.deptCode = responsedata.responseObj[0].deptCode;
          $scope.applicantType = responsedata.responseObj[0].applicantType;
          $scope.isOutStandingPending = responsedata.responseObj[0].isOutStandingPending;
          $scope.isExistingConnectionOrConsumerNo = responsedata.responseObj[0].isExistingConnectionOrConsumerNo;
          $scope.isExistingProperty = responsedata.responseObj[0].isExistingProperty;
          $scope.disConnectionType = responsedata.responseObj[0].disConnectionType;

          /*water rate master*/

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
          $sessionStorage.wrisBPL = $scope.COBpl;
          $sessionStorage.wrisBPLno = $scope.CObplno;
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
          }
      },function (err) {
        toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR'));
        $ionicLoading.hide();
      })

    }

  _init();

  var calculateChargers = function(){
    $ionicLoading.show({template: $filter('translate')('LOADING')				});
      RestService.setdepentparams($scope.orgid,$sessionStorage.serviceCode,$sessionStorage.perfixchargeApplicableAt).then(function (setdependresponse){
            console.log("setdependresponse=="+JSON.stringify(setdependresponse));
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

                        RestService.getPayOpt($scope.orgid,$scope.userID).then(function (response) {
                                console.log("bankresponse--->"+response);
                                $sessionStorage.Bankresponse = response;
                                $ionicLoading.hide();
                                }, function (err) {	$ionicLoading.hide();	})
                                getServiceCharge();
//      					    		$state.go("app.COuploaddoc");
                      $ionicLoading.hide();
                  }
                },function (err){
                   toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR'));
                    $ionicLoading.hide();
              })
              $ionicLoading.hide();
            }else{
              savedata();
            }
          }
        else{
            toaster.error($filter('translate')('ERROR'), $filter('translate')(''));
          }$ionicLoading.hide();
        },function (err) {
          toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR'));
          $ionicLoading.hide();
      })
  }
  var savedata = function() {
  	$ionicLoading.show({
  		template: $filter('translate')('LOADING')
  			});

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

            $scope.feesId = {
              1 : $scope.COSFlatRate
            }

  						$ionicLoading.hide();
  				}
  			 else{
  					alert("Your Application for Change of Ownership has been Not Saved.");
  					$ionicLoading.hide();
  				}
  			},function (err) {
  				toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR'));
  				$ionicLoading.hide();
  			})
  //		}
   };

     $scope.bpldata = {};
    		   if(!$localStorage.english){
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

    		var getServiceCharge = function(){
    		    RestService.servicecharge($sessionStorage.serviceCode,
          				    	$sessionStorage.deptCode,
          						  $sessionStorage.costariftext,
          						  $sessionStorage.cospermisetext,
          						  $sessionStorage.wrusageSubtype3,
          						  $sessionStorage.wrusageSubtype4,
          						  $sessionStorage.wrusageSubtype5,
          						  $sessionStorage.applmeterread,
          						  $sessionStorage.wrConnType,
          						  $sessionStorage.wrisBPL,
          						  $sessionStorage.wrRoadType,
          						  $sessionStorage.TFMtext,
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
          						  $sessionStorage.oldCOUconnSize,
          						  $scope.couwrNewRatestartDate,$scope.orgid,"Application Charge")
          						 .then(function (responseservicechargedata){
          				 console.log("responseservicechargedata.wsStatus-"+ JSON.stringify(responseservicechargedata));
          				 if(responseservicechargedata.wsStatus == "success"){

          					$sessionStorage.responseservicechargedata = responseservicechargedata;
          					 $state.go("app.COpay");

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
 })
