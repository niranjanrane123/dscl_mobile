angular.module('starter')
  .controller('rtiApplicantdetailsCtrl', function ($rootScope, $scope, RestService, $ionicLoading, $stateParams, toaster, $filter, ENV, $ionicHistory,
    $rootScope, $state, $localStorage, $sessionStorage, $ionicModal, $ionicPopup, $ionicPlatform) {
    $sessionStorage.check = 'no'
    console.log("$localStorage.LoginData---" + JSON.stringify($localStorage.LoginData));
    $scope.orgid = $localStorage.selectedorgID;
    $scope.userAddress = $localStorage.responselogindata.address;
    $scope.userPincode = $localStorage.responselogindata.pincode;
    $scope.firstname = $localStorage.responselogindata.firstName;
    $scope.lastname = $localStorage.responselogindata.lastName;
    $scope.middlename = $localStorage.responselogindata.middleName;
    $scope.emailId = $localStorage.responselogindata.emailId;
    // $scope.address = $localStorage.responselogindata.address;
    $scope.mobileNo = $localStorage.responselogindata.mobileNo;
    $scope.gender = $localStorage.responselogindata.genderId;
    $scope.title = $localStorage.responselogindata.titleId;
    //$scope.pinCode = $localStorage.responselogindata.pincode;
    $scope.Orgid;
    $scope.District;
    $scope.data_ = {};
    $scope.friend = {};
    $scope.povertyLine = new Array();
    $scope.belowPoverty = false;
    $scope.myCheckbox = true;
    $sessionStorage.lookUpCodeAPL = "APL";
    $sessionStorage.serviceCode = "RAF";
    $sessionStorage.deptCode = "RTI";
    $scope.corrosPondence = true;
    $scope.applicantType = null;
    $scope.orgName = null;
    //$scope.title = null;
    //$scope.firstname = null;
    //$scope.middlename = null;
    //$scope.lastname = null;
    //$scope.gender = null;
    $scope.address = null;
    //$scope.mobileNo = null;
    //$scope.emailId = null;
    $scope.pinCode = null;
    $scope.adhaarNumber = null;
    $scope.data_.povertyLineValue = null;
    $scope.data_.bplNo = null;
    $scope.yearOfIssue = null;
    $scope.data_.issuingAuthority = null;
    $scope.data_.Addresscorres = null;
    $scope.data_.Pincodecorres = null;
    $scope.dstoptions = new Array();
    $scope.orgoptions = new Array();
    //get year list
    var date = new Date();
    $scope.yearArrayy = date.getFullYear();
    //$scope.data_.current = date.getFullYear();
    var start = $scope.yearArrayy - 6;  // Minus 6 years from current year
    var end = $scope.yearArrayy;  //  current year
    $scope.yearArray = [];

    for (var i = start; i <= end; i++) {
      $scope.yearArray.push(i);
    }

    $scope.changeInYear = function () {
      date.setFullYear($scope.yearArrayy);
      $scope.budgetYear = date;
    }

    $scope.onlyNumericTenLimitInput = function () {
      var mobileno = document.getElementById("adhaarNum").value;
      var inputVal = mobileno;
      var numericReg = /^[0-9]{1,12}$/;
      if (!numericReg.test(inputVal) || inputVal.length > 12) {
        inputVal.slice(0, -1);
        var inputValSlice = inputVal.slice(0, -1);
        document.getElementById("adhaarNum").value = inputValSlice;
      }
    }

    var deregisterSecond = $ionicPlatform.registerBackButtonAction(
      function () {
                      
              $state.go('app.home');
          
      }, 100
    );
    $scope.$on('$destroy', deregisterSecond);


    /*function start*/
    $scope.organisation = false;
    $scope.applicantDetails = {};
    $scope.changeApplicantType = function () {
      $ionicLoading.show({ template: $filter('translate')('LOADING') });
      console.log("--$scope.applicantType--" + $scope.applicantType);
      var select = document.getElementById("applicantTypeID");
      var applicantTypetext = select.options[select.selectedIndex].text;
      $scope.applicantTypeShow = applicantTypetext;
      $scope.$watch('applicantType', function (newVal) {
        /* if( applicantTypetext == "Organisation" || applicantTypetext == "संगठन")
             {
               $scope.organisation = true;
               $scope.belowPoverty = false;
               $localStorage.organisationCheck = $scope.organisation;
             }else{ $scope.organisation = false; $localStorage.organisationCheck = $scope.organisation;
             }*/

        if ($scope.applicantType == 5827) {
          $scope.organisation = true;
          $scope.belowPoverty = false;
          $localStorage.organisationCheck = $scope.organisation;
        } else {
          $scope.organisation = false; $localStorage.organisationCheck = $scope.organisation;
        }

        $ionicLoading.hide();
      });

    }

    $scope.changePoverty = function () {
      if ($scope.data_.povertyLineValue == "Y") {
        $scope.belowPoverty = true;
        $localStorage.belowPovertycheck = $scope.belowPoverty;
        $sessionStorage.check = 'yes';
        getCheckList();
      } else {
        $scope.belowPoverty = false;
        $sessionStorage.rtiCheckList = "NA";
        $sessionStorage.check = 'no';
        $localStorage.belowPovertycheck = $scope.belowPoverty
      }
    }

    //get BPL
    var lookUpCode = "YNC";
    RestService.getNHPrefixData(lookUpCode, $scope.orgid).then(function (bplResponse2) {
      console.log("gettitle==" + JSON.stringify(bplResponse2));
      if (bplResponse2 == undefined || bplResponse2 == null || bplResponse2 == "") {
        $ionicLoading.hide();
        return false;
      }
      else {
        $scope.povertyLine = new Array();
        for (var i = 0; i < bplResponse2.length; i++) {
          if ($localStorage.langNewId == "1") {
            $scope.povertyLine.push({
              value: bplResponse2[i].lookUpCode,
              name: bplResponse2[i].descLangFirst
            });
          } else {
            $scope.povertyLine.push({
              value: bplResponse2[i].lookUpCode,
              name: bplResponse2[i].descLangSecond
            });
          }
        }
        $ionicLoading.hide();
      }
    }, function (err) { toaster.error($filter('translate')('RTIAPIERROR')/* , $filter('translate')('ERROR') */); })

    $scope.getNonHDatanew1 = function (lookUpCode, dropdown, orgId) {
      RestService.getNHPrefixData(lookUpCode, orgId)
        .then(function (response) {
          if (response.length > 0) {
            if (lookUpCode == "PAY") {
              var listResponse = response;
              console.log("lookUpCode: " + lookUpCode + "|listResponse: " + JSON.stringify(listResponse));
              $rootScope[dropdown] = new Array();
              for (var i = 0; i < listResponse.length; i++) {
                if (listResponse[i].otherField == 'Y') {
                  $rootScope[dropdown].push({
                    id: listResponse[i].lookUpId,
                    value: listResponse[i].lookUpCode,
                    name: listResponse[i].descLangFirst
                  })
                }
              }
            }
            else {
              var listResponse = response;
              console.log("lookUpCode: " + lookUpCode + "|listResponse: " + JSON.stringify(listResponse));
              $rootScope[dropdown] = new Array();
              for (var i = 0; i < listResponse.length; i++) {
                if ($localStorage.langNewId == "2") {
                  $rootScope[dropdown].push({
                    value: listResponse[i].lookUpId,
                    name: listResponse[i].descLangSecond
                  })
                } else {
                  $rootScope[dropdown].push({
                    value: listResponse[i].lookUpId,
                    name: listResponse[i].descLangFirst
                  })
                }
              }
            }
            $ionicLoading.hide();
          }
          else {
            $ionicLoading.hide();
            toaster.error($filter('translate')('RTIAPIERROR')/* , $filter('translate')('ERROR_OCCURED') */);
            return [];
          }
        }, function (err) {
          toaster.error($filter('translate')('RTIAPIERROR')/* , $filter('translate')('ERROR_OCCURED') */);
          $ionicLoading.hide();
          return [];
        })
    }

    $scope.next = function () {
      console.log("year" + $scope.data_.current)
      $scope.applicantDetails.applicantType = $scope.applicantType;

      $scope.applicantDetails.district = $scope.District;
      $scope.applicantDetails.org = $scope.Orgid;

      $scope.applicantDetails.orgName = $scope.orgName;
      $scope.applicantDetails.title = $scope.title;
      $scope.applicantDetails.firstname = $scope.firstname;
      $scope.applicantDetails.middlename = $scope.middlename;
      $scope.applicantDetails.lastname = $scope.lastname;
      $scope.applicantDetails.gender = $scope.gender;
      $scope.applicantDetails.address = $scope.address;
      $scope.applicantDetails.mobileNo = $scope.mobileNo;
      $scope.applicantDetails.emailId = $scope.emailId;
      $scope.applicantDetails.pinCode = $scope.pinCode;
      $scope.applicantDetails.adhaarNumber = $scope.adhaarNumber;
      $scope.applicantDetails.povertyLineValue = $scope.data_.povertyLineValue;
      $scope.applicantDetails.bplNo = $scope.data_.bplNo;
      $scope.applicantDetails.Addresscorres = $scope.data_.Addresscorres;
      $scope.applicantDetails.Pincodecorres = $scope.data_.Pincodecorres;
      if ($scope.data_.povertyLineValue == 'N') {
        $scope.applicantDetails.yearOfIssue = null;
      } else {
        $scope.applicantDetails.yearOfIssue = $scope.data_.current;
      }
      $scope.applicantDetails.issuingAuthority = $scope.data_.issuingAuthority;
      $scope.applicantDetails.Addresscorres = $scope.data_.Addresscorres;
      $scope.applicantDetails.Pincodecorres = $scope.data_.Pincodecorres;

      console.log("applicant information" + JSON.stringify($scope.applicantDetails));
      $localStorage.applicantDetails = $scope.applicantDetails;
      $state.go("app.rtiReferencedetial");
    }
    $scope.changeDistrict = function () {
      //       var select = document.getElementById("district");
      //       var disttext= select.options[select.selectedIndex].value;
      //       var res = disttext.split(":")[1];

    }

    $scope.changeOrg = function () {
      var select = document.getElementById("organization");
      var disttext = select.options[select.selectedIndex].value;
      var org = disttext.split(":")[1];
      $scope.Orgid = org;
      setDependentParameter(org);
    }

    var getCheckList = function () {
      RestService.getRtiCheckList($sessionStorage.serviceCode, $sessionStorage.deptCode, "NA", "NA",
        $scope.applicantType, "NA", "NA",
        "NA", $scope.usageSubtype3, $scope.usageSubtype4, $scope.usageSubtype5, $scope.noOfDays,
        $scope.isOutStandingPending, $scope.disConnectionType, $scope.factor1, $scope.factor2, $scope.factor3,
        $scope.factor4, $scope.orgid, $scope.applicantType, $scope.ruleId, $scope.documentGroup, $scope.financialYear).then(function (responseCheckList) {
          console.log("checkListResponse" + JSON.stringify(responseCheckList))
          $sessionStorage.rtiCheckList = responseCheckList;
        }, function (err) {
          //toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR_OCCURED'));
          $ionicLoading.hide();
        })
    }


    //  $scope.detect = function(){
    //    alert("here")
    //    var str = $scope.adhaarNumber
    //    str = str.replace(/-/g, "");
    //    $scope.adhaarNumber = str;
    //  }
    $scope.imageupload = function (fileObject) {
      var reader = new FileReader();
      var idValue = fileObject.getAttribute("id");
      verfy = fileObject.files[0];
      var maxSize = 1000000;
      var fileSize = verfy.size;

      var ext = fileObject.value.split('.').pop();
      if (ext) {
        if (ext == "jpg") {
        }
        else {
          fileObject.value = "";
          $rootScope.simpleAlert('Onlyjpgallow');

          $('#iDivBusyLoad').hide();
          return;
        }
      } else {
        $rootScope.simpleAlert('validdocument');
        $('#iDivBusyLoad').hide();
        return;
      }
      if (fileSize > maxSize) {
        fileObject.value = "";
        $rootScope.simpleAlert('validdocumentSize');
        $('#iDivBusyLoad').hide();
        return;
      }
      reader.onload = function (e) {
        console.log("about to encode");
        $scope.encoded_file = window.btoa(e.target.result.toString());
        //		$scope.encoded_file = "REUKGFGFBFJLF";


        var documentObject =
        {
          attachmentId: null,
          documentId: null,
          documentName: "stamp.png",
          documentSerialNo: null,
          descriptionType: null,
          documentType: null,
          doc_DESC_Mar: null,
          doc_DESC_ENGL: null,
          documentByteCode: $scope.encoded_file,
          checkkMANDATORY: "Y"
        };

        arrayListTest.push(documentObject);
        console.log("Final $sessionStorage.TempArray-----" + JSON.stringify(arrayListTest));
      };
      reader.readAsBinaryString(verfy);
    };
    var _init = function () {

      if (!window.localStorage.getItem("showRTIHelp")) {
        window.localStorage.setItem("showRTIHelp", true);
        showPopUp();
      }

      $scope.organisation = false;
      $scope.getNonHDatanew1("ATP", "aptoptions", $scope.orgid);
      $scope.getNonHDatanew1("TTL", "ttloptions", $scope.orgid);
   //   $scope.getNonHDatanew1("GEN", "genoptions", $scope.orgid);
       $rootScope.getNonHData("GEN","genoptions","1");
      if ($localStorage.defaultVal == 'Y') {
        $scope.uad = true;
        var lookUpCode = "DIS";
        RestService.getNHPrefixData(lookUpCode, $scope.orgid).then(function (responseCAA) {
          console.log("responseCAA==" + JSON.stringify(responseCAA));
          if (responseCAA == undefined || responseCAA == null || responseCAA == "") {
            return false;
          }
          else {
            for (var i = 0; i < responseCAA.length; i++) {
              // if(responseCAA[i].lookUpCode == 'DNN'){
              if ($localStorage.langNewId == "2") {
                $scope.dstoptions.push({
                  id: responseCAA[i].lookUpId,
                  name: responseCAA[i].descLangSecond
                });
                $scope.friend = {
                  isPresent: true,
                  selectedTicket: { "name": responseCAA[i].descLangSecond, "id": responseCAA[i].lookUpId } // <-- this is the default item
                };
                $scope.District = $scope.friend.selectedTicket.id;
                RestService.getOrgByDistrictId($scope.District).then(function (responseCAA) {
                  console.log("responseCAA==" + JSON.stringify(responseCAA));
                  if (responseCAA == undefined || responseCAA == null || responseCAA == "") {
                    return false;
                  }
                  else {
                    for (var i = 0; i < responseCAA.length; i++) {

                      if ($localStorage.langNewId == "2") {
                        $scope.orgoptions.push({
                          id: responseCAA[i].lookUpId,
                          name: responseCAA[i].descLangSecond
                        });
                      } else {
                        $scope.orgoptions.push({
                          id: responseCAA[i].lookUpId,
                          name: responseCAA[i].descLangFirst
                        });
                      }

                    }

                  }
                }, function (err) {
                  toaster.error($filter('translate')('RTIAPIERROR')/* , $filter('translate')('ERROR_OCCURED') */);
                  $ionicLoading.hide();
                })
              } else {
                $scope.dstoptions.push({
                  id: responseCAA[i].lookUpId,
                  name: responseCAA[i].descLangFirst
                });
                $scope.friend = {
                  isPresent: true,
                  selectedTicket: { "name": responseCAA[i].descLangFirst, "id": responseCAA[i].lookUpId } // <-- this is the default item
                };
                $scope.District = $scope.friend.selectedTicket.id;
                RestService.getOrgByDistrictId($scope.District).then(function (responseCAA) {
                  console.log("responseCAA==" + JSON.stringify(responseCAA));
                  if (responseCAA == undefined || responseCAA == null || responseCAA == "") {
                    return false;
                  }
                  else {
                    for (var i = 0; i < responseCAA.length; i++) {

                      if ($localStorage.langNewId == "2") {
                        $scope.orgoptions.push({
                          id: responseCAA[i].lookUpId,
                          name: responseCAA[i].descLangSecond
                        });
                      } else {
                        $scope.orgoptions.push({
                          id: responseCAA[i].lookUpId,
                          name: responseCAA[i].descLangFirst
                        });
                      }

                    }

                  }
                }, function (err) {
                  toaster.error($filter('translate')('RTIAPIERROR')/* , $filter('translate')('ERROR_OCCURED') */);

                })
              }
              //  }
            }
            $ionicLoading.hide();
          }
        }, function (err) {
          //					toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR_OCCURED'));
          $ionicLoading.hide();
        })
      } else {
        $scope.uad = false;
      }

      var lookUpCode = "CAA";
      RestService.getNHPrefixData(lookUpCode, $scope.orgid).then(function (responseCAA) {
        console.log("responseCAA==" + JSON.stringify(responseCAA));
        if (responseCAA == undefined || responseCAA == null || responseCAA == "") {
          return false;
        }
        else {
          console.log("$sessionStorage.lookUpCodeAPL--" + $sessionStorage.lookUpCodeAPL);
          for (var i = 0; i < responseCAA.length; i++)
            if (responseCAA[i].lookUpCode == $sessionStorage.lookUpCodeAPL) {
              $sessionStorage.perfixchargeApplicableAt = responseCAA[i].lookUpId;
              // $state.go("app.COuploaddoc");
              $ionicLoading.hide();
            }
          $ionicLoading.hide();
        }
      }, function (err) {
        //					toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR_OCCURED'));
        $ionicLoading.hide();
      })

      var lookUpCode = "CAA";
      RestService.getNHPrefixData(lookUpCode, $scope.orgid).then(function (responseCAA) {
        console.log("responseCAA==" + responseCAA);
        if (responseCAA == undefined || responseCAA == null || responseCAA == "") {
          return false;
        }
        else {
          //					  $sessionStorage.responseCAA = responseCAA;
          console.log("$sessionStorage.lookUpCodeAPL--" + $sessionStorage.lookUpCodeAPL);
          for (var i = 0; i < responseCAA.length; i++)
            if (responseCAA[i].lookUpCode == $sessionStorage.lookUpCodeAPL) {
              $sessionStorage.perfixchargeApplicableAt = responseCAA[i].lookUpId;
              $ionicLoading.hide();
            }
          $ionicLoading.hide();
        }
      }, function (err) {
        //					toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR_OCCURED'));
        $ionicLoading.hide();
      })

      RestService.getinitializedmodelRti().then(function (responsedata) {
        console.log("COUresposeaayaainitial--" + JSON.stringify(responsedata));

        if (responsedata.wsStatus == "success") {
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
          $ionicLoading.hide();

          //showPopUp();
        }
        else {
          toaster.error($filter('translate')('RTIAPIERROR')/* , $filter('translate')('ERROR') */);
          $ionicLoading.hide();
        }
      }, function (err) {
        toaster.error($filter('translate')('RTIAPIERROR')/* , $filter('translate')('ERROR') */);
        $ionicLoading.hide();
      })
    };

    var showPopUp = function () {
      $scope.myPopup = $ionicPopup.show({
        template: $filter('translate')('POPTEXTRTI'),
        title: $filter('translate')('READANDACCEPT'),
        scope: $scope,
        buttons: [{
          text: $filter('translate')('CANCEL'),
          type: 'button customBgColor',

          onTap: function () {
            $state.go('app.home');
            //		  ionic.Platform.exitApp();
          }
        },
        {
          text: $filter('translate')('ACCEPT'),
          type: 'button customBgColor',
          onTap: function () {
          }
        }]
      });

      var myNullAction = $ionicPlatform.registerBackButtonAction(function () {
        // do nothing
      }, 401);
      $scope.myPopup.then(function (res) {
        myNullAction();
      });
    }

    var setDependentParameter = function (orgId) {
      $ionicLoading.show({ template: $filter('translate')('LOADING') });
      RestService.setdepentparamsforrti(orgId, $sessionStorage.serviceCode, $sessionStorage.perfixchargeApplicableAt).then(function (setdependresponse) {
        $sessionStorage.setDependentResponse = setdependresponse;
        if (setdependresponse.wsStatus == "success") {
          if (!setdependresponse.free) {
            $sessionStorage.TaxType = setdependresponse.responseObj[0].taxType;
            $sessionStorage.TaxCode = setdependresponse.responseObj[0].taxCode;
            $sessionStorage.TaxCategory = setdependresponse.responseObj[0].taxCategory;
            $sessionStorage.TaxSubcategory1 = setdependresponse.responseObj[0].taxSubCategory;
            $sessionStorage.chargeApplicableAt = setdependresponse.responseObj[0].chargeApplicableAt;
            var lookUpCode = "TAC";
            var level = "2";

            RestService.getHPrefixData(lookUpCode, level, $scope.orgid).then(function (TACresponse) {
              console.log("TACresponse==" + TACresponse);
              for (var i = 0; i < TACresponse.length; i++)
                if (TACresponse[i].lookUpCode == $sessionStorage.TaxSubcategory1) {
                  $sessionStorage.TaxSubcategory = TACresponse[i].descLangFirst;
                  $ionicLoading.hide();
                }
            }, function (err) {
              toaster.error($filter('translate')('RTIAPIERROR')/* , $filter('translate')('Please try after some time..') */);
              $ionicLoading.hide();
            })
          }
          $ionicLoading.hide();
        }
        else {
          toaster.error($filter('translate')('RTIAPIERROR')/* , $filter('translate')('ERROR') */);
          $ionicLoading.hide();
        }
      }, function (err) {
        toaster.error($filter('translate')('RTIAPIERROR')/* , $filter('translate')('ERROR_OCCURED') */);
        $ionicLoading.hide();
      });

      //get server time-
      // RestService.getServertime().then(function (serverTime) {
      //    $sessionStorage.serverTime = serverTime;
      //    console.log("server time"+JSON.stringify($sessionStorage.serverTime.time))
      //    var from = "10:00:00"
      //    var to = "22:00:00"
      //    if($sessionStorage.serverTime.time > from && $sessionStorage.serverTime.time < to){

      //    }else{
      //       alert($filter('translate')('RTIERROR'))
      //       $state.go("app.home");
      //    }
      //   },function (err) {
      //     //toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR_OCCURED'));
      //     $state.go("app.home");
      //     $ionicLoading.hide();
      //   });
    }
    _init();

  });
