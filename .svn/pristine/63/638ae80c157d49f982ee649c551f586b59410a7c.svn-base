angular.module('starter')

  .controller('COUOldNewCTRL', function ($scope, $location, RestService, $ionicLoading, $stateParams, toaster,
		  $filter, ENV, dateFilter, $state, $localStorage,$sessionStorage,$sessionStorage,$ionicHistory,$ionicPopup) {
/*declare start*/

	  console.log("$localStorage.responselogindata---"+JSON.stringify($localStorage.responselogindata));
//		$scope.orgid = $localStorage.responselogindata.orgId;
		$scope.orgid = $localStorage.selectedorgID;
		$scope.userID = $localStorage.responselogindata.userId;
		$scope.loginUSername = $localStorage.responselogindata.firstName;
		$scope.LoginMobileNo = $localStorage.responselogindata.mobileNo;
    $sessionStorage.lookUpCodeAPL = "APL";
	  var coupermisetext;
	  var coutariftext;
	  var actiondetails;
	  $scope.COUpaidamt;
    $scope.newAppInDate = new Date().getTime();
    $scope.applnDate = new Date().getTime();
	  $sessionStorage.serviceCode = "WCU";
	  $sessionStorage.deptCode = "WT";
//	 var chargeApplicableAt = "16";
/*declare end*/

	/* search data from getconn service start  */

						$scope.csidn = $sessionStorage.custinfo.csIdn;
						$sessionStorage.CSidn = $scope.csidn;
						$scope.connNo = $sessionStorage.custinfo.csCcn;
						$sessionStorage.connNo = $scope.connNo;
						var fname = $sessionStorage.custinfo.csName;
						var Mname =$sessionStorage.custinfo.csMname;
						var Lname = $sessionStorage.custinfo.csLname;
						if(fname == null){
						  fname = "";
						}
						if(Mname == null){
              Mname = "";
            }
            if(Lname == null){
              Lname = "";
            }
            var res = fname.concat(Mname).concat(Lname);
						//var res = fname.concat(" "+Lname);
						$scope.COUconnName = res;
						$sessionStorage.COUconnName = $scope.COUconnName;
						$scope.COUconnSize = $sessionStorage.custinfo.csCcnsize;
						$sessionStorage.COUconnSize = $scope.COUconnSize;
						$scope.COUtarifCate = $sessionStorage.custinfo.trmGroup1;
						$sessionStorage.COUtarifCate = $scope.COUtarifCate;
						$scope.COUpermiseType = $sessionStorage.custinfo.trmGroup2;
						$sessionStorage.COUpermiseType = $scope.COUpermiseType;
						$scope.appltitle = $sessionStorage.custinfo.csTitle;
						$sessionStorage.appltitle = $scope.appltitle;
						$scope.applFName = $sessionStorage.custinfo.csName;
						$sessionStorage.applFName = $scope.applFName;
						$scope.applMname = $sessionStorage.custinfo.csMname;
						$sessionStorage.applMname = $scope.applMname;
						$scope.applLname = $sessionStorage.custinfo.csLname;
						$sessionStorage.applLname = $scope.applLname;
						$scope.appladdress = $sessionStorage.custinfo.csAdd;
						$sessionStorage.appladdress = $scope.appladdress;
						$scope.applRoadname = $sessionStorage.custinfo.csRdcross;
						$sessionStorage.applRoadname = $scope.applRoadname;
						$scope.applmobileno = $sessionStorage.custinfo.csContactno;
						$sessionStorage.applmobileno = $scope.applmobileno;

						$scope.applConntype = $sessionStorage.custinfo.csCcntype;
						$sessionStorage.applConntype = $scope.applConntype;
						$scope.applnoofUsers = $sessionStorage.custinfo.csNoofusers;
						$sessionStorage.applnoofUsers = $scope.applnoofUsers;
						$scope.applConnsize = $sessionStorage.custinfo.csCcnsize;
						$sessionStorage.applConnsize = $scope.applConnsize;
						$scope.applnoofTaps = $sessionStorage.custinfo.csNooftaps;
						$sessionStorage.applnoofTaps = $scope.applnoofTaps;
						$scope.applmeterread = $sessionStorage.custinfo.csMeteredccn;
//alert("$scope.applmeterread--"+$scope.applmeterread);
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
//								alert("meter--"+$sessionStorage.applmeterread)
							}
						}
						$ionicLoading.hide();
					}
				},function (err) {
//					toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR'));
						$ionicLoading.hide();
				})

						$scope.applListatus = $sessionStorage.custinfo.csListatus;
						$sessionStorage.applListatus = $scope.applListatus;
						$scope.applDwzid1 = $sessionStorage.custinfo.codDwzid1;
						$sessionStorage.applDwzid1 = $scope.applDwzid1;
						$scope.applDwzid2 = $sessionStorage.custinfo.codDwzid2;
						$sessionStorage.applDwzid2 = $scope.applDwzid2;
						$scope.applcategory1 = $sessionStorage.custinfo.csCcncategory1;
						$sessionStorage.applcategory1 = $scope.applcategory1;
						$scope.applbplflag = $sessionStorage.custinfo.bplFlag;
						$sessionStorage.applbplflag = $scope.applbplflag;
						$scope.applbplno = $sessionStorage.custinfo.bplNo;
						$sessionStorage.applbplno = $scope.applbplno;
						$scope.applicantType = $sessionStorage.custinfo.applicantType;
						var lookUpCode = "APT";
						RestService.getNHPrefixData(lookUpCode,$scope.orgid).then(function (responseAPT){
						console.log("$sessionStorage.applicantType=="+responseAPT);
						if(responseAPT==undefined || responseAPT == null || responseAPT=="")
							{
								$ionicLoading.hide();
								return false;
							}
							else
							{
								for(var i=0;i<responseAPT.length;i++){
									if($scope.applicantType == responseAPT[i].lookUpId)
									{
										$sessionStorage.applicantType = responseAPT[i].descLangFirst;
									}
								}
								$ionicLoading.hide();
							}
						},function (err) {
//							toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR'));
								$ionicLoading.hide();
						})
						/* search data from getconn service ended */

						$scope.cszoptions = new Array();
						if($localStorage.langNewId == 2){
               for(var i=0;i<$sessionStorage.getprefixdataresponsecsz.length;i++){
                  $scope.cszoptions.push({
                  cszid : $sessionStorage.getprefixdataresponsecsz[i].lookUpId,
                  cszvalue : $sessionStorage.getprefixdataresponsecsz[i].descLangFirst,
                  cszname : $sessionStorage.getprefixdataresponsecsz[i].descLangFirst
                 })
                }
						}else{
               for(var i=0;i<$sessionStorage.getprefixdataresponsecsz.length;i++){
                  $scope.cszoptions.push({
                  cszid : $sessionStorage.getprefixdataresponsecsz[i].lookUpId,
                  cszvalue : $sessionStorage.getprefixdataresponsecsz[i].descLangSecond,
                  cszname : $sessionStorage.getprefixdataresponsecsz[i].descLangSecond
                 })
                }
						}

//
						$scope.trfoptions = new Array();
                console.log("localStorage: "+$localStorage.langNewId)
						 	  for(var i=0;i<$sessionStorage.getprefixdataresponseTRF.length;i++){
						 	  if($localStorage.langNewId == 1){
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

					    $scope.permiseoptions = new Array();
					    	if($localStorage.langNewId == 1){
					    	  for(var i=0;i<$sessionStorage.prefixdataresponsepermise.length;i++){
                    $scope.permiseoptions.push({
                    permiseid : $sessionStorage.prefixdataresponsepermise[i].lookUpId,
                    permisevalue : $sessionStorage.prefixdataresponsepermise[i].descLangFirst,
                    permisename : $sessionStorage.prefixdataresponsepermise[i].descLangFirst
                   })
                   $scope.prefix = $sessionStorage.prefixdataresponsepermise[i].lookUpId;
                  }
					    	}else{
					    	  for(var i=0;i<$sessionStorage.prefixdataresponsepermise.length;i++){
                    $scope.permiseoptions.push({
                    permiseid : $sessionStorage.prefixdataresponsepermise[i].lookUpId,
                    permisevalue : $sessionStorage.prefixdataresponsepermise[i].descLangSecond,
                    permisename : $sessionStorage.prefixdataresponsepermise[i].descLangSecond
                   })
                   $scope.prefix = $sessionStorage.prefixdataresponsepermise[i].lookUpId;
                  }
					    	}


					    $("#cszoptions").val(COUconnSize).change();
					    $("#trfoptions").val(COUtarifCate).change();
					    $("#permiseoptions").val(COUpermiseType).change();

/*new details*/

	$scope.selectAction = function() {
		    console.log($scope.newCOUtarifnew);
		    $scope.$watch('newCOUtarifnew', function(newVal) {
		    	var lookUpCode = "TRF";
				  var level = "1";
		            RestService.getHPrefixData(lookUpCode,level,$scope.orgid).then(function (prefixdataresponsepermise) {
					console.log("prefixdataresponsepermise---"+JSON.stringify(prefixdataresponsepermise));

					$scope.permiseoptions1 = new Array();
					    for(var i=0;i<prefixdataresponsepermise.length;i++)
					    	if(prefixdataresponsepermise[i].lookUpId == $scope.newCOUtarifnew)
					    	{
					    	 console.log("prefixdataresponsepermise=="+JSON.stringify(prefixdataresponsepermise[i]));
					    	if($localStorage.langNewId == 1){
					    	  	$scope.permiseoptions1.push({
                        permiseid1 : prefixdataresponsepermise[i].lookUpId,
                        permisevalue1 : prefixdataresponsepermise[i].descLangFirst,
                        permisename1 : prefixdataresponsepermise[i].descLangFirst
                     })
					    	}else{
					    	     $scope.permiseoptions1.push({
                        permiseid1 : prefixdataresponsepermise[i].lookUpId,
                        permisevalue1 : prefixdataresponsepermise[i].descLangSecond,
                        permisename1 : prefixdataresponsepermise[i].descLangSecond
                     })
					    	}

					    }
					},function (err) {
						toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR'));
				})
		    });
	 };

  		$scope.selectpermise = function() {
		    console.log($scope.newCOUpermise);
//		    alert("permise---"+$scope.newCOUpermise);
		};

$scope.confrmproceed = function() {
		$sessionStorage.newCOUtarifnew = $scope.newCOUtarifnew;
		  console.log("newCOUtarifnew--"+$sessionStorage.newCOUtarifnew);
		  var sel = document.getElementById("NCOutarif");
		  coutariftext= sel.options[sel.selectedIndex].text;
		  $sessionStorage.coutariftext = coutariftext;
		  console.log(sel.options[sel.selectedIndex].text);
		  $scope.applicantType = "NA";
		  $scope.ruleId = null;
      $scope.documentGroup = null;
      $scope.financialYear = "NA";

		  $sessionStorage.newCOUpermise = $scope.newCOUpermise;
		  console.log("newCOUpermise--"+$sessionStorage.newCOUpermise);
		  var sel = document.getElementById("NCOUpermise");
		  coupermisetext= sel.options[sel.selectedIndex].text;
		  $sessionStorage.coupermisetext =coupermisetext;
		  console.log(sel.options[sel.selectedIndex].text);

		  $sessionStorage.COURemarks = $scope.COURemarks;
		  console.log("COURemarks--"+$sessionStorage.COURemarks);

		  $scope.checklist ='';

	    	$ionicLoading.show({
					template:$filter('translate')('LOADING')
				});
		RestService.checklistcall2($sessionStorage.serviceCode,$sessionStorage.deptCode,coutariftext,coupermisetext,
		$sessionStorage.applicantType,$scope.isExistingConnectionOrConsumerNo,$scope.isExistingProperty,
			$sessionStorage.applbplflag,$scope.usageSubtype3,$scope.usageSubtype4,$scope.usageSubtype5,
			$scope.noOfDays,$scope.isOutStandingPending,
		    $scope.disConnectionType,$scope.factor1,$scope.factor2,$scope.factor3,
		    $scope.factor4,$scope.orgid,$scope.applicantType,$scope.ruleId,$scope.documentGroup,
		    $scope.financialYear).then(function (responsechecklistdata){
			console.log("responsechecklistdata--"+JSON.stringify(responsechecklistdata));
			if(responsechecklistdata.wsStatus == "success"){
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
                      $state.go("app.COUuploaddoc");
                      $ionicLoading.hide();
                    }
              $ionicLoading.hide();
            }
			   },function (err) {
//					toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR_OCCURED'));
					  $ionicLoading.hide();
				   })
          $ionicLoading.hide();
				} else if(responsechecklistdata.wsStatus == "NA"){
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
                      $ionicLoading.hide();
                      calculateChargers();
                    }
              $ionicLoading.hide();
            }
         },function (err) {
//					toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR_OCCURED'));
            $ionicLoading.hide();
           })
          $ionicLoading.hide();
        }else{
          toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR'));
          $ionicLoading.hide();
        }
			},function (err) {
//				toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR'));
				$ionicLoading.hide();
			})
  };

   var calculateChargers = function(){
       $ionicLoading.show({	template:$filter('translate')('LOADING')});
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
                      console.log("TACresponse=="+JSON.stringify(TACresponse));
                      for(var i=0;i<TACresponse.length;i++)
                        if(TACresponse[i].lookUpCode == $sessionStorage.TaxSubcategory1)
                           {
                            $sessionStorage.TaxSubcategory = 	TACresponse[i].descLangFirst;
                            $ionicLoading.hide();
                           }
                           getServiceCharge()
                        },function (err){
                        toaster.error($filter('translate')('ERROR'), $filter('translate')('Please try after some time..'));
                        $ionicLoading.hide();
                     })
                }else{
                   savedata();
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

  var _init = function ()
  {
	$ionicLoading.show({
		template:$filter('translate')('LOADING')
	});
		RestService.getinitializedmodel().then(function (responsedata){
		console.log("COUresposeaayaainitial--"+JSON.stringify(responsedata));

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
          $scope.consumption = responsedata.responseObj[0].consumption;
          $scope.gapCode = responsedata.responseObj[0].gapCode;
          $scope.isTempPlug = responsedata.responseObj[0].isTempPlug;
          $scope.dependsOnFactor = responsedata.responseObj[0].dependsOnFactor;
					/*water rate master*/

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
					$sessionStorage.roadLength = responsedata.responseObj[1].roadLength;
					$sessionStorage.licencePeriod = responsedata.responseObj[1].licencePeriod;
					$sessionStorage.typeOfTechnicalPerson = responsedata.responseObj[1].typeOfTechnicalPerson;
					$ionicLoading.hide();
		  	}
		else{
					toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR'));
					$ionicLoading.hide();
			}
    },function (err) {
      toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR'));
      $ionicLoading.hide();
    })

  };
 _init();
           var savedata = function(){
          /*	if ($scope.COUFlatRate <= $scope.COUpaidamt) {
        			alert("Paid Amount Should Not Be Greater Then Total Amount");
        			return false;
        		}
        		else {	*/
        			$ionicLoading.show({
        				template: $filter('translate')('LOADING')
        			});
        			RestService.COUsaveservice($sessionStorage.applFName,$sessionStorage.applMname,$sessionStorage.applLname,$sessionStorage.applmobileno,$sessionStorage.appltitle,
        				$sessionStorage.appladdress,$scope.COUpaidamt,$sessionStorage.csidn,$sessionStorage.applRoadname,$sessionStorage.connNo,$sessionStorage.applConnsize,
        				$sessionStorage.COURemarks,$sessionStorage.COUtarifCate,$sessionStorage.COUpermiseType,$sessionStorage.newCOUtarifnew,
        				$sessionStorage.newCOUpermise,$scope.orgid,$scope.userID,$sessionStorage.documentObjectArray,$sessionStorage.applbplflag,
        				$sessionStorage.couwrNewRatestartDate,$sessionStorage.macAddress).then(function(COUresponse){
        					  console.log("COUresponse=="+JSON.stringify(COUresponse));
        					  if(COUresponse.status == "success"){
        						 $scope.applictNo = COUresponse.applicationNo;

                     var alertPopup = $ionicPopup.alert({
                        title: $filter('translate')('CHANGEOFUSAGE'),
                        template: $filter('translate')('CHANGEOFSAVED') +$scope.applictNo,
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
        						 $ionicLoading.show({
        								template:$filter('translate')('LOADING')
        							});
        							$scope.feesId = {
                                  1 : $scope.COUFlatRate
                                }

        						 $ionicLoading.hide();
        					  }
        					  else{
        							$ionicLoading.hide();
        					  }
        					},function (err) {
        						toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR_OCCURED'));
        						$ionicLoading.hide();
        				})
        //			  }
        		};
/**/

    var getServiceCharge = function(){
       $scope.ruleId = null;
       RestService.servicecharge(
           $scope.orgid,
           $scope.usageSubtype1,
            $scope.usageSubtype2,
            $scope.usageSubtype3,
            $scope.usageSubtype4,
            $scope.usageSubtype5,
            $scope.factor1,
            $scope.factor2,
            $scope.factor3,
            $scope.factor4,
            $scope.isBPL,
            $scope.noOfDays,
            $scope.serviceCode,
            $scope.deptCode,
            $scope.financialYear,
            $scope.ruleId,
            $sessionStorage.TaxType,
            $sessionStorage.TaxCategory,
            $sessionStorage.TaxSubcategory1,
            $scope.consumption,
            $sessionStorage.applmeterread,
            $sessionStorage.chargeApplicableAt,
            $sessionStorage.couwrConnSize,
            $sessionStorage.couwrConnType,
            $sessionStorage.roadLength,$sessionStorage.licencePeriod,
            $sessionStorage.couwrRoadType).then(function (responseservicechargedata) {
  //		alert("responseservicechargedata.wsStatus--"+responseservicechargedata.wsStatus)
      if(responseservicechargedata.wsStatus == "success"){

        $sessionStorage.responseservicechargedata = responseservicechargedata;

        $scope.COUFlatRate = responseservicechargedata.responseObj[0].flatRate;

        RestService.getPayOpt($scope.orgid,$scope.userID).then(function (response) {
          console.log("dash==="+response);
          if(response.status =="success"){
            $sessionStorage.Bankresponse = response;
            $ionicLoading.hide();
            $state.go("app.COUpay");
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
            toaster.error($filter('translate')('ERROR'), $filter('translate')(''));
          }
        },function (err) {
      //			alert("Problem occurred while processing to find Checklist");
            toaster.error($filter('translate')('ERROR'), $filter('translate')(''));
            $ionicLoading.hide();
        })
    }
   })
