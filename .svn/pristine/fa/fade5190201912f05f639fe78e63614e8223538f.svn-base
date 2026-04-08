angular.module('starter')

  .controller('NewWaterconnPayCTRL', function ($scope, $location, RestService, $ionicLoading, $stateParams, toaster,
		  $filter, ENV, dateFilter, $state, $localStorage,$ionicPopup,$sessionStorage) {


	  console.log("$localStorage.responselogindata---"+JSON.stringify($localStorage.responselogindata));
//		$scope.orgid = $localStorage.responselogindata.orgId;
		$scope.orgid = $localStorage.selectedorgID;
		$scope.userID = $localStorage.responselogindata.userId;
		$scope.loginUSername = $localStorage.responselogindata.firstName;
		$scope.LoginMobileNo = $localStorage.responselogindata.mobileNo;
		$scope.emailId = $localStorage.responselogindata.emailId;
	  $scope.ServiceShortName = "WNC";
    $localStorage.langID = "1";
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
		console.log("$sessionStorage.Bankresponse--"+JSON.stringify($sessionStorage.Bankresponse));
   // $scope.FlatRate = $sessionStorage.responseservicechargedata.responseObj[0].flatRate;
    //$scope.FlatRate = 100;
		$scope.FlatRate = $sessionStorage.responseservicechargedata.responseObj[0].chargeAmount;
/*		$scope.options = new Array();
		for(var i=0;i<$sessionStorage.Bankresponse.list.length;i++){
			$scope.options.push({
			id : $sessionStorage.Bankresponse.list[i].bankId,
			name : $sessionStorage.Bankresponse.list[i].cbbankname
		})
	}*/

  $scope.savedata = function(){
  //console.log("ccn number second check"+$sessionStorage.WNCconntype);
//	 if ($scope.FlatRate <= $scope.data_.payingAmount) {
//			alert("Paid Amount Should Not Be Greater Then Total Amount");
//			return false;
//		}
//		else {
//			  console.log("documentObjectArray---"+JSON.stringify($sessionStorage.documentObjectArray));
			  $scope.applnDate = new Date().getTime();

			  $ionicLoading.show({
					template: $filter('translate')('LOADING')
				});
//			  console.log("$sessionStorage.WNCConnSize--"+$sessionStorage.WNCConnSize);
//			  $sessionStorage.WNCwaterconn
      $scope.free =  $sessionStorage.responsechecklistdata.free;

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
              RestService.savePayReq($scope.orgid,$scope.userID,$localStorage.langID,$scope.emailId,$scope.loginUSername,$scope.LoginMobileNo,
                $scope.ServiceShortName,$sessionStorage.applictNo,$scope.FlatRate,$scope.data_.paymentGateway,$sessionStorage.applictNo,"Y","N",false,null,$scope.feesId)
                .then(function (response) {
                    if(response.status == "pending"){
       //								alert(response.payRequestMsg);
                      $ionicLoading.hide();
                      var H= null;

                       H = window.open(encodeURI(response.payRequestMsg), '_blank',
                      'location=no,closebuttoncaption=Back,hardwareback=yes,fullscreen=yes,zoom=yes,toolbarposition=top,enableviewportscale=yes');

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
              else{
                toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR'));
                $ionicLoading.hide();
              }
            },function (err) {
                  toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR_OCCURED'));
                  $ionicLoading.hide();
            })
    //				}


//		  RestService.savewaterconndata(
//		          $sessionStorage.WNCName,
//		          $sessionStorage.WNCmobile.toString(),
//		          $sessionStorage.WNCemailid,
//		          $scope.orgid,
//		          $scope.orgid,
//		          $scope.userID,
//              $scope.ServiceIdGet,
//              parseInt($localStorage.langID),
//              $sessionStorage.documentObjectArray,
//              $sessionStorage.CNCbilladdress,
//              $sessionStorage.WNCpincode.toString(),
//              $sessionStorage.isConsumer,
//              $sessionStorage.isBilling,
//              $sessionStorage.WNCPropertyNo,
//              $sessionStorage.WNCBpl,
//              $scope.newAppInDate,
//              $sessionStorage.WNCConnSize,
//              $sessionStorage.WNCPlumber,
//              $sessionStorage.WNCZone,
//              $sessionStorage.WNCWard,
//              $sessionStorage.WNCtarif,
//              $sessionStorage.WNCIsTaxPayer,
//              $sessionStorage.WNCtemporary,
//              $sessionStorage.CNCpincode,
//              $sessionStorage.WCPropertyOutstanding,
//              $sessionStorage.WMNCUsageType,
//              $sessionStorage.WNCbplno,
//              $localStorage.macAddress,
//              $sessionStorage.ExitstingConnections
////
////
////              $sessionStorage.WNCapplicantype,
////              $sessionStorage.WNCorgname,
////              $sessionStorage.WNCtemporary,
////				      $sessionStorage.WNCfromdate,
////              $sessionStorage.WNCtodate,
////              $sessionStorage.WNCselecttitle,
////              $sessionStorage.WNCFirstname,
////              $sessionStorage.WNCMiddlename,
////						  $sessionStorage.WNCLastname,
////						  $sessionStorage.WNCgender,
////						  $sessionStorage.WNCmobile,
////						  $sessionStorage.WNCaadharnumber,
////						  $sessionStorage.WNCBpl,
////						  $sessionStorage.WNCbplno,
////						  $sessionStorage.addinfochecked,
////						  $sessionStorage.WNCroadname,
////						  $sessionStorage.WNCareaname,
////						  $sessionStorage.WNCtowncity,
////						  $sessionStorage.WNCpincode,
////						  $sessionStorage.WNCbillroadname,
////						  $sessionStorage.WNCbillareaname,
////						  $sessionStorage.WNCbilltowncity,
////						  $sessionStorage.WNCbillpincode,
////						  $sessionStorage.WNCexistconsumerdetail,
////						  $sessionStorage.WNCexistconnno,
////						  $sessionStorage.WNCexistproperty,
////						  $sessionStorage.WNCpropertyno,
////						  $sessionStorage.WNCconstype,
////						  $sessionStorage.WNCnoofusers,
////						  $sessionStorage.WNCtarif,
////						  $sessionStorage.WNCpermise,
////						  parseInt($sessionStorage.WNCConnSize),
////						  $sessionStorage.WNCnooftaps,
////						  $scope.selectfilename,
////						  $sessionStorage.WNCnooffamily,
////						  $scope.orgid,
////						  $scope.userID,
////						  $scope.ServiceShortName,
////						  $sessionStorage.WNCZone,
////						  $sessionStorage.WNCWard,
////						  $sessionStorage.WNCconntype,
////						  $localStorage.macAddress,
////						  $scope.newAppInDate,
////						  $sessionStorage.WNCemailid,
////						  $sessionStorage.documentObjectArray,
////						  $scope.FlatRate,
////						  $scope.free,
////						  $sessionStorage.PlumberDetail
//						  ).then(function (newwaterconnresponse){
////			 alert("newwaterconnresponse--->>"+newwaterconnresponse.status);
//        console.log("new water response"+JSON.stringify(newwaterconnresponse))
//			  if(newwaterconnresponse.status == "success"){
//				  $sessionStorage.applictNo = newwaterconnresponse.applicationNo;
//				  console.log("$sessionStorage.applictNo-"+$sessionStorage.applictNo);
//				  $sessionStorage.CSidn = newwaterconnresponse.applicationNo;
//
//				  $ionicLoading.show({
//						template: $filter('translate')('LOADING')
//				 });
//				 $scope.feesId = {
//           1 : $scope.FlatRate
//         }
//			/*	var confirmPopup = $ionicPopup.show({
//					 title : $filter('translate')('message'),
//			         template : 'Your application <b>#'+$sessionStorage.applictNo+'</b> is successfully submitted.',
//			         buttons : [{
//			             text : 'Proceed',
//			             type : 'button-balanced',
//			             onTap : function(){*/
//
//
//				 RestService.savePayReq($scope.orgid,$scope.userID,$localStorage.langID,$scope.emailId,$scope.loginUSername,$scope.LoginMobileNo,
//         $scope.ServiceShortName,$sessionStorage.applictNo,$scope.FlatRate,$scope.data_.paymentGateway,$sessionStorage.applictNo,"Y","N",false,null,$scope.feesId)
//					.then(function (response) {
//							if(response.status == "pending"){
////								alert(response.payRequestMsg);
//								$ionicLoading.hide();
//								var H= null;
//
//								 H = window.open(encodeURI(response.payRequestMsg), '_blank',
//								'location=no,closebuttoncaption=Back,hardwareback=yes,fullscreen=yes,zoom=yes,toolbarposition=top,enableviewportscale=yes');
//
//								H.addEventListener('exit', iabClose);
//								H.addEventListener('loadstop', iabClose1);
//								function iabClose(event)
//                  {
//                    H.removeEventListener('exit', iabClose);
//                   $state.go("app.home");
//                  }
//								function iabClose1(event){
//									if (event.url.match("mobile/close")) {
//										H.close();
//										H.removeEventListener('loadstop', iabClose1);
//										$state.go("app.home");
//									}
//								}
//							}
//							else{
//									  toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR_OCCURED'));
//								  }
//							$ionicLoading.hide();
//						}, function (err) {
//							toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR_OCCURED'));
//							$ionicLoading.hide();
//						})
//			             /*}
//		          		}]
//					});*/
//		  		  $ionicLoading.hide();
//			  	}
//				  else{
//					  toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR'));
//					  $ionicLoading.hide();
//				  }
//        },function (err) {
//              toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR_OCCURED'));
//              $ionicLoading.hide();
//            })
////				}
	  		};


        var init = function()
         {
         $localStorage.langID = "1";
         $ionicLoading.show({	template: $filter('translate')('LOADING')});
          RestService.getPayOpt($scope.orgid,$scope.userID,$localStorage.langID).then(function (response) {
                  console.log("payment option--"+JSON.stringify(response));
                  $scope.options = new Array();
                    for(var i=0;i<response.list.length;i++){
                      $scope.options.push({
                      id : response.list[i].bankId,
                      name : response.list[i].cbbankname
                      })
                    }
                  $ionicLoading.hide();
                }, function (err) {
                  $ionicLoading.hide();
                })


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
         }

   init();

  }) /*controler ends*/

