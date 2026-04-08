angular.module('starter')

  .controller('SSApplicationCTRL', function ($scope, $location, RestService, $ionicLoading, $stateParams, toaster,
		  $filter, ENV, dateFilter, $state,$localStorage,$sessionStorage,$rootScope) {
	  $scope.data_ = {};
    $scope.orgid = $localStorage.selectedorgID;
    $scope.userID = $localStorage.responselogindata.userId;
    $scope.loginUSername = $localStorage.responselogindata.firstName;
    $scope.LoginMobileNo = $localStorage.responselogindata.mobileNo;
    $scope.emailId = $localStorage.responselogindata.emailId;

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
    $sessionStorage.serviceCode = "SAA";
    $sessionStorage.deptCode = "SWD";

//     $scope.getNonHDatanew1 = function(lookUpCode,dropdown,orgId){
//        RestService.getNHPrefixData(lookUpCode,orgId)
//        .then(function(response){
//          if(response.length > 0){
//            if(lookUpCode == "PAY"){
//              var listResponse = response;
//              console.log("lookUpCode: "+lookUpCode+"|listResponse: "+JSON.stringify(listResponse));
//              $rootScope[dropdown] = new Array();
//              for(var i=0;i<listResponse.length;i++){
//                if(listResponse[i].otherField == 'Y'){
//                  $rootScope[dropdown].push({
//                    id: listResponse[i].lookUpId,
//                    value : listResponse[i].lookUpCode,
//                    name : listResponse[i].descLangFirst
//                  })
//                }
//              }
//            }
//            else{
//              var listResponse = response;
//              console.log("lookUpCode: "+lookUpCode+"|listResponse: "+JSON.stringify(listResponse));
//              $rootScope[dropdown] = new Array();
//              for(var i=0;i<listResponse.length;i++){
//              if($localStorage.langNewId == "2"){
//              $rootScope[dropdown].push({
//                   value : listResponse[i].lookUpId,
//                   name : listResponse[i].descLangSecond
//                 })
//              }else{
//                $rootScope[dropdown].push({
//                  value : listResponse[i].lookUpId,
//                  name : listResponse[i].descLangFirst
//                })
//                }
//              }
//            }
//            $ionicLoading.hide();
//          }
//          else {
//            $ionicLoading.hide();
//            toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR_OCCURED'));
//            return [];
//          }
//        },function(err){
//          toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR_OCCURED'));
//          $ionicLoading.hide();
//          return [];
//        })
//      }

       $scope.changeAttr = function(item){
         if(applicantDate == "" || applicantDate == null || applicantDate == undefined )
           item.currentTarget.setAttribute("placeholder","to date");
         else item.currentTarget.setAttribute("placeholder","");
       }
       RestService.getHPrefixData("FTR","1",$scope.orgid)
            .then(function(response){
              console.log("response 1st"+JSON.stringify(response))
              if(response.length > 0){
                for(var i=0;i<response.length;i++){
                  if(response[i].lookUpCode == "EDU" || response[i].lookUpCode == "MLS"|| response[i].lookUpCode == "CTY"
                  || response[i].lookUpCode == "DSY"|| response[i].lookUpCode == "BPL"){
                    if(response[i].lookUpCode == "EDU"){
                       $scope.educatonId = response[i].lookUpId;
                    }else if(response[i].lookUpCode == "MLS"){
                      $scope.maritalStatus = response[i].lookUpId;
                    }else if(response[i].lookUpCode == "CTY"){
                      $scope.categoryId = response[i].lookUpId;
                      console.log("categosry id check"+$scope.categoryId)
                    }else if(response[i].lookUpCode == "DSY"){
                      $scope.disabiltiyId = response[i].lookUpId;
                      console.log("disabiltiy id check"+$scope.disabiltiyId)
                    }else if(response[i].lookUpCode == "BPL"){
                       $scope.bplId = response[i].lookUpId;
                       console.log("disabiltiy id check"+$scope.bplId)
                     }

                     RestService.getHPrefixData("FTR","2",$scope.orgid).then(function (response) {
                       console.log("response 2nd"+JSON.stringify(response))
                       if(response == undefined || response == null || response == ""){
                           $ionicLoading.hide();
                            return false;
                       }else{
                        console.log("response education  --"+JSON.stringify(response));
                           $scope.education=new Array();
                           $scope.marital=new Array();
                           $scope.category=new Array();
                           $scope.disabiltiy=new Array();
                           $scope.bpl=new Array();
                           for(var i=0;i<response.length;i++){
                              if(response[i].lookUpParentId == $scope.educatonId){
                               console.log("parent id"+response[i].lookUpParentId+"child id"+$scope.educatonId)
                                 if($localStorage.langNewId == "2"){
                                    $scope.education.push({
                                     value: response[i].lookUpId,
                                     name:response[i].descLangSecond
                                   })
                                 }else{
                                     $scope.education.push({
                                     value: response[i].lookUpId,
                                     name:response[i].descLangFirst
                                   })
                                 }

                               }

                               if(response[i].lookUpParentId == $scope.maritalStatus){
                                console.log("parent id"+response[i].lookUpParentId+"child id"+$scope.maritalStatus)
                                  if($localStorage.langNewId == "2"){
                                     $scope.marital.push({
                                      value: response[i].lookUpId,
                                      name:response[i].descLangSecond
                                    })
                                  }else{
                                      $scope.marital.push({
                                      value: response[i].lookUpId,
                                      name:response[i].descLangFirst
                                    })
                                  }

                                }

                                if(response[i].lookUpParentId == $scope.disabiltiyId){
                                  console.log("parent id"+response[i].lookUpParentId+"child id"+$scope.disabiltiyId)
                                    if($localStorage.langNewId == "2"){
                                       $scope.disabiltiy.push({
                                        value: response[i].lookUpId,
                                        name:response[i].descLangSecond
                                      })
                                    }else{
                                        $scope.disabiltiy.push({
                                        value: response[i].lookUpId,
                                        name:response[i].descLangFirst
                                      })
                                    }

                                  }

                                  if(response[i].lookUpParentId == $scope.categoryId){
                                  console.log("parent id"+response[i].lookUpParentId+"child id"+$scope.categoryId)
                                    if($localStorage.langNewId == "2"){
                                       $scope.category.push({
                                        value: response[i].lookUpId,
                                        name:response[i].descLangSecond
                                      })
                                    }else{
                                        $scope.category.push({
                                        value: response[i].lookUpId,
                                        name:response[i].descLangFirst
                                      })
                                    }

                                  }
                                  if(response[i].lookUpParentId == $scope.bplId){
                                  console.log("parent id"+response[i].lookUpParentId+"child id"+$scope.bplId)
                                    if($localStorage.langNewId == "2"){
                                       $scope.bpl.push({
                                        value: response[i].lookUpId,
                                        name:response[i].descLangSecond
                                      })
                                    }else{
                                        $scope.bpl.push({
                                        value: response[i].lookUpId,
                                        name:response[i].descLangFirst
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
                }
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

    $scope.submitApplication = function(){
        var socialSecurityData =
        {
        	applicationId: null,
        	serviceId: null,
        	objOfschme: null,
        	orgId: $scope.orgid,
        	parentOrgId: null,
        	selectSchemeName: $scope.schemeValue,
        	nameofApplicant: $scope.nameOfApplicant,
        	applicationDob: Date.parse($scope.applicantDate),
        	ageason: parseInt($scope.ageAsOn),
        	genderId: $scope.pdegender,
        	applicantAdress: $scope.applicAddress,
        	pinCode: $scope.pinCode,
        	mobNum: $scope.mobile,
        	educationId: $scope.educationValue,
        	classs: null,
        	maritalStatusId: $scope.maritalValue,
        	categoryId: $scope.categoryValue,
        	annualIncome: $scope.aIncome,
        	typeofDisId: $scope.disabilityValue,
        	percenrofDis: $scope.pDisability,
        	bplid: $scope.bplValue,
        	bplinspectyr: $scope.bplInspectionYear,
        	bplfamily: $scope.bplFamilyId.toString(),
        	accountNumber: $scope.accountNo,
        	bankNameId: parseInt($scope.bankNameValue),
        	nameofFather: $scope.nameOfFatherSpouse,
        	contactNumber: $scope.contactNo,
        	nameofMother: $scope.nameOfMother,
        	detailsoffamIncomeSource: $scope.familyIncomeSource,
        	annualIncomeoffam: $scope.familyIncome,
        	createdDate: Date.parse(new Date()),
        	createdBy: $scope.userID,
        	updatedBy: null,
        	updatedDate: null,
        	lgIpMac: '2:00:200',
        	lgIpMacUpd: null,
        	masterAppId: null,
        	approvalFlag: null,
        	applicableServiceId: null,
        	deptId: null,
        	langId: 1,
        	documentList: [],
        	applicant: {
        		organizationName: null,
        		applicantFirstName: null,
        		applicantMiddleName: null,
        		applicantLastName: null,
        		gender: null,
        		mobileNo: null,
        		emailId: null,
        		pinCode: null,
        		buildingName: null,
        		roadName: null,
        		applicantTitle: null,
        		areaName: null,
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
        		orgId: 0,
        		langId: 0,
        		userId: 0,
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
        		isBPL: 'N',
        		panNo: null
        	},
        	isBplApplicable: 'Y',
        	statusFlag: null,
        	lastPaymentDate: null,
        	referenceNo: null,
        	dataLegacyFlag: null,
        	beneficiaryno: null,
        	ulbName: "AMBS",
        	serviceCode: "IGNDS",
        	lastDateofLifeCerti: null,
        	viewList: [],
        	validtoDate: null,
        	pensionCancelReason: null,
        	pensionCancelDate: null,
        	apmApplicationId: null,
        	aadharCard: $scope.AdharNumber.toString()
        }

        $sessionStorage.socialSecurityData = socialSecurityData;

        RestService.checklistcall2(
          "IGNDS","NA","NA","NA","NA","NA","NA","NA","NA",
          "NA","NA",0.0,"NA","NA","NA","NA","NA","NA",$scope.orgid,
          "NA","NA",null,"NA").
          then(function (responsechecklistdata){

           console.log("responsechecklistdatass--"+JSON.stringify(responsechecklistdata));
           if(responsechecklistdata.wsStatus == "success"){
              $sessionStorage.responsechecklistdata = responsechecklistdata;
            var lookUpCode = "CAA";
            RestService.getNHPrefixData(lookUpCode,$scope.orgid).then(function (responseCAA) {
               console.log("responseCAA=="+responseCAA);
                if(responseCAA==undefined || responseCAA == null || responseCAA =="")
                {
                   return false;
                }
                else
                {
                  console.log("$sessionStorage.lookUpCodeAPL--"+$sessionStorage.lookUpCodeAPL);
                    for(var i=0;i<responseCAA.length;i++)
                      if(responseCAA[i].lookUpCode == $sessionStorage.lookUpCodeAPL)
                        {
                          $sessionStorage.perfixchargeApplicableAt = 	responseCAA[i].lookUpId;
                          $state.go("app.SSUuploaddoc");
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
              toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR'));
            }
              $ionicLoading.hide();
            },function (err) {
              $ionicLoading.hide();
            })
    }
    var init_ = function()
    {
        $scope.bank=new Array();
        RestService.getBanks($scope.orgid).then(function (response) {
          console.log("bank list"+JSON.stringify(response))
          var responseBank = response.customerBankMap;
          if(responseBank == "" || responseBank == null || responseBank == undefined){
                    return false;
                    $ionicLoading.hide();
               }else{
                    console.log("response employee"+JSON.stringify(responseBank));
                    for(var i in responseBank){
                          $scope.bank.push({
                            value : i,
                            name : responseBank[i]
                          })
                           $ionicLoading.hide();
                       }
               }
//          if($localStorage.langNewId == "2"){
//             $scope.bank.push({
//              value: response[i].lookUpId,
//              name:response[i].descLangSecond
//            })
//          }else{
//              $scope.bank.push({
//              value: response[i].lookUpId,
//              name:response[i].descLangFirst
//            })
//          }
        },function (err) {
           toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR_OCCURED'));
           $ionicLoading.hide();
        })

        RestService.getSchemeName($scope.orgid).then(function (response) {
          console.log("scheme name"+JSON.stringify(response))
          var responseScheme = response;
          $scope.scheme = new Array();
          if(responseScheme == "" || responseScheme == null || responseScheme == undefined){
              return false;
              $ionicLoading.hide();
           }else{
            if($localStorage.langNewId == "1"){
                 for(var i=0;i<responseScheme.length;i++){
                    $scope.scheme.push({
                      value:responseScheme[i][0],
                      name:responseScheme[i][1]
                    })
                  }
              }else{
                for(var i=0;i<responseScheme.length;i++){
                    $scope.scheme.push({
                      value:responseScheme[i][0],
                      name:responseScheme[i][3]
                    })
                  }
              }
              console.log("response scheme"+JSON.stringify(responseScheme));
           }
        },function (err) {
           toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR_OCCURED'));
           $ionicLoading.hide();
        })

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


       $scope.getNonHData("GEN","genoptions",$scope.orgid);
//          RestService.getinitializedmodelSocial().then(function (responsedata){
//         //	console.log("resposeaayaainitial--"+responsedata);
//           console.log("resposeaayaainitial.wsStatus--"+responsedata.wsStatus)
//
//           if(responsedata.wsStatus == "success"){
//
//                 $scope.orgId = responsedata.responseObj[0].orgId;
//                 $scope.usageSubtype1 = responsedata.responseObj[0].usageSubtype1;
//                 $scope.usageSubtype2 = responsedata.responseObj[0].usageSubtype2;
//                 $scope.usageSubtype3 = responsedata.responseObj[0].usageSubtype3;
//                 $scope.usageSubtype4 = responsedata.responseObj[0].usageSubtype4;
//                 $scope.usageSubtype5 = responsedata.responseObj[0].usageSubtype5;
//                 $scope.factor1 = responsedata.responseObj[0].factor1;
//                 $scope.factor2 = responsedata.responseObj[0].factor2;
//                 $scope.factor3 = responsedata.responseObj[0].factor3;
//                 $scope.factor4 = responsedata.responseObj[0].factor4;
//                 //$scope.isBPL = responsedata.responseObj[0].isBPL;
//                 $scope.noOfDays = responsedata.responseObj[0].noOfDays;
//                 $scope.serviceCode = responsedata.responseObj[0].serviceCode;
//                 $scope.deptCode = responsedata.responseObj[0].deptCode;
//                 $scope.applicantType = responsedata.responseObj[0].applicantType;
//                 $scope.isOutStandingPending = responsedata.responseObj[0].isOutStandingPending;
//                 $scope.isExistingConnectionOrConsumerNo = responsedata.responseObj[0].isExistingConnectionOrConsumerNo;
//                 $scope.isExistingProperty = responsedata.responseObj[0].isExistingProperty;
//                 $scope.disConnectionType = responsedata.responseObj[0].disConnectionType;
//
//                 /*water rate master*/
//
//                 $sessionStorage.wrorgId = responsedata.responseObj[1].orgId;
//                 $sessionStorage.wrusageSubtype1 = responsedata.responseObj[1].usageSubtype1;
//                 $sessionStorage.wrusageSubtype2 = responsedata.responseObj[1].usageSubtype2;
//                 $sessionStorage.wrusageSubtype3 = responsedata.responseObj[1].usageSubtype3;
//                 $sessionStorage.wrusageSubtype4 = responsedata.responseObj[1].usageSubtype4;
//                 $sessionStorage.wrusageSubtype5 = responsedata.responseObj[1].usageSubtype5;
//                 $sessionStorage.wrfactor1 = responsedata.responseObj[1].factor1;
//                 $sessionStorage.wrfactor2 = responsedata.responseObj[1].factor2;
//                 $sessionStorage.wrfactor3 = responsedata.responseObj[1].factor3;
//                 $sessionStorage.wrfactor4 = responsedata.responseObj[1].factor4;
//                 $sessionStorage.wrisBPL = $scope.COBpl;
//                 $sessionStorage.wrisBPLno = $scope.CObplno;
//                 $sessionStorage.wrServiceCode = responsedata.responseObj[1].serviceCode;
//                 $sessionStorage.wrDeptCode = responsedata.responseObj[1].deptCode;
//                 $sessionStorage.wrTaxType = responsedata.responseObj[1].taxType;
//                 $sessionStorage.wrTaxCode = responsedata.responseObj[1].taxCode;
//                 $sessionStorage.wrTaxCate = responsedata.responseObj[1].taxCategory;
//                 $sessionStorage.wrTaxSubCate = responsedata.responseObj[1].taxSubCategory;
//                 $sessionStorage.wrMeterType = responsedata.responseObj[1].meterType;
//                 $sessionStorage.wrChargeAppl = responsedata.responseObj[1].chargeApplicableAt;
//                 $sessionStorage.wrConnSize = responsedata.responseObj[1].connectionSize;
//                 $sessionStorage.wrConnType = responsedata.responseObj[1].connectionType;
//                 $sessionStorage.wrRoadType = responsedata.responseObj[1].roadType;
//                 $sessionStorage.wrtransferMode = responsedata.responseObj[1].transferMode;
//                 $sessionStorage.wrDisConnType = responsedata.responseObj[1].disConnectionType;
//                 $sessionStorage.wrRatestartDate = responsedata.responseObj[1].rateStartDate;
//                 $ionicLoading.hide();
//                }
//                 else{
//                   toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR'));
//                 }
//             },function (err) {
//               toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR'));
//               $ionicLoading.hide();
//             })
    }
    init_();
    }) /*controler ends*/

