angular.module('starter')

  .controller('rtiFirstAppealCtrl', function ($rootScope, ENV, $scope, $filter, RestService, $ionicLoading, $state, toaster, $stateParams, $ionicHistory,
    $ionicNavBarDelegate, $ionicPlatform, $localStorage, $window, $sessionStorage, $ionicPopup, $cordovaBarcodeScanner,$cordovaGeolocation) {

      $scope.orgid = $localStorage.selectedorgID;
      console.log("$scope.orgid", $scope.orgid)


      //$scope.radioChn = 'I';
      $scope.firstName;
      $scope.middleName;
      $scope.lastName;
      $scope.gender;
      $scope.mobilenum;
      $scope.emailid;
      $scope.aadharno
      $scope.editAddress;
      $scope.title;
      $scope.userId=$localStorage.responselogindata.userId;
      $scope.deptName = 19;
      $scope.serviceName = 780;   //Enhancement #183555;
      $scope.showDetails = false;
      $scope.showErrorMsg = false;

//Defect #184222
      /* $scope.showW = function(){
        console.log("Choose Radio", $scope.radioChn);
     } */

      $scope.getDeptForFirstAppeal = function(){

        var params = {
          "objectionId": null,
          "objectionNumber": null,
          "objectionDate": null,
          "objectionDeptId": null,
          "apmApplicationId": null,
          "address": null,
          "eMail": null,
          "fName": null,
          "lName": null,
          "mName": null,
          "mobileNo": null,
          "gender": null,
          "title": null,
          "uid": null,
          "objectionReferenceNumber": null,
          "objectionAddReferenceNumber": null,
          "objectionDetails": null,
          "objectionStatus": null,
          "serviceId": null,
          "createdBy": null,
          "createdDate": null,
          "updatedDate": null,
          "lgIpMac": null,
          "lgIpMacUpd": null,
          // "orgId": $scope.orgid,
          "orgId":$scope.refOrgId,
          "userId": null,
          "langId": null,
          "objectionSerialNumber": null,
          "codIdOperLevel1": null,
          "codIdOperLevel2": null,
          "codIdOperLevel3": null,
          "codIdOperLevel4": null,
          "codIdOperLevel5": null,
          "locId": null,
          "deptCode": null,
          "lModDate": null,
          "updateDate": null,
          "billNo": null,
          "billDueDate": null,
          "noticeNo": null,
          "schedulingSelection": null,
          "inspectionType": null,
          "objectionIssuerName": null,
          "objectionOn": null,
          "hearingDate": null,
          "name": null,
          "nameOfInspector": null,
          "deptName": null,
          "serviceName": null,
          "locName": null,
          "taskId": null,
          "ipAddress": null,
          "ename": null,
          "empType": null,
          "errorList": null,
          "docs": [],
          "charges": null,
          "isFree": null,
          "free": false,
          "isPaymentGenerated": null,
          "paymentMode": null,
          "objTime": null,
          "objectionReason": null,
          "flatNo": null,
          "selectType": null,
          "chargesMap": {},
          "offlineDTO": {
              "challanNo": null,
              "serviceId": null,
              "oflPaymentMode": 0,
              "applNo": null,
              "ddNo": null,
              "ddDate": null,
              "poNo": null,
              "poDate": null,
              "bankaAccId": null,
              "isDeleted": null,
              "orgId": null,
              "userId": null,
              "langId": 0,
              "lmodDate": null,
              "lgIpMac": null,
              "bmBankAccountId": null,
              "payModeIn": null,
              "bmDrawOn": null,
              "bmChqDDNo": null,
              "bmChqDDDate": null,
              "amountToPay": null,
              "amountToShow": null,
              "hidebmChqDDNo": null,
              "hidebmChqDDDate": null,
              "deptId": null,
              "faYearId": null,
              "challanServiceType": null,
              "challanValidDate": null,
              "feeIds": {},
              "billDetIds": null,
              "finYearStartDate": null,
              "finYearEndDate": null,
              "applicantAddress": null,
              "documentUploaded": false,
              "fromedate": null,
              "toDate": null,
              "bankData": [],
              "loiNo": null,
              "mobileNumber": null,
              "emailId": null,
              "applicantName": null,
              "offlinePaymentText": null,
              "onlineOfflineCheck": null,
              "cbBankId": null,
              "uniquePrimaryId": null,
              "paymentCategory": null,
              "taskId": null,
              "empType": null,
              "loggedLocId": null,
              "tdpPrefixId": null,
              "narration": null,
              "manualReceiptNo": null,
              "manualReeiptDate": null,
              "documentList": null,
              "paymentStatus": null,
              "objectionNumber": null,
              "chargesMap": {},
              "charges": null,
              "vendorId": null,
              "receiptcategoryId": null,
              "demandLevelRebate": 0.0,
              "referenceNo": null,
              "usageType": null,
              "propNoConnNoEstateNoL": null,
              "propNoConnNoEstateNoV": null,
              "deptCode": null,
              "propName": null,
              "serviceCode": null,
              "serviceName": null,
              "pdRv": null,
              "applicantFullName": null,
              "plotNo": null,
              "billDetails": {},
              "billYearDetails": {},
              "printDtoList": null,
              "supplimentryBillIdMap": {},
              "dwzDTO": {
                  "areaDivision1": 0,
                  "areaDivision2": 0,
                  "areaDivision3": 0,
                  "areaDivision4": 0,
                  "areaDivision5": 0,
                  "empId": 0,
                  "tariffCategory": 0,
                  "available": false
              },
              "pgRefId": null,
              "transferType": null,
              "workflowEnable": null,
              "flatNo": null,
              "licNo": null,
              "rebateMode": null,
              "rebateAmt": null,
              "serviceNameMar": null,
              "fromDateStr": null,
              "toDateStr": null,
              "orgName": null,
              "orgNameMar": null,
              "orgAddress": null,
              "orgAddressMar": null,
              "slaSmDuration": null,
              "time": null,
              "cfcCenter": null,
              "cfcCounterNo": null,
              "payeeName": null,
              "transferOwnerFullName": null,
              "transferInitiatedDate": null,
              "transferDate": null,
              "regNo": null,
              "transferAddress": null,
              "certificateNo": null,
              "parentPropNo": null,
              "uniquePropertyId": null,
              "postalCardDocList": null,
              "occupierName": null,
              "pushToPayErrMsg": null,
              "posPayMode": null,
              "posTxnId": null,
              "newHouseNo": null,
              "referenceDate": null,
              "registrationYear": null,
              "registrationNo": null,
              "parshadWard1": null,
              "parshadWard2": null,
              "parshadWard3": null,
              "parshadWard4": null,
              "parshadWard5": null,
              "tranRefNumber": null,
              "tranRefDate": null,
              "assParshadWard1": null,
              "assParshadWard2": null,
              "assParshadWard3": null,
              "assParshadWard4": null,
              "assParshadWard5": null,
              "posPayApplicable": false
          }
      }

        $ionicLoading.show({ template: $filter('translate')('LOADING') });
        RestService.getDeptForFirstAppeal(params).then(function (response) {
          console.log("Response of Dept--firstApi", response);
          if (response == undefined || response == null || response == "") {
            $ionicLoading.hide();
            return false;
          } else {
            $scope.deptResponse = response;
            $scope.deptOptions = new Array();
            for (var i = 0; i < response.length; i++) {

              if ($localStorage.langNewId == "2") {
                $scope.deptOptions.push({
                  lookUpId: response[i].lookUpId,
                  deptname: response[i].descLangSecond
                })
              } else {
                $scope.deptOptions.push({
                  lookUpId: response[i].lookUpId,
                  deptname: response[i].descLangFirst
                })
              
              }
            }
            $ionicLoading.hide();
          }        
          
          $ionicLoading.hide();
        }, function (err) {
          $ionicLoading.hide();
          // 					toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR'));
        })
      }
      

      /* $scope.selectService = function(){
        console.log("Entered Service", $scope.deptName);

        var params2 = {
          "objectionId": null,
          "objectionNumber": null,
          "objectionDate": null,
          "objectionDeptId": $scope.deptName,
          "apmApplicationId": null,
          "address": null,
          "eMail": null,
          "fName": null,
          "lName": null,
          "mName": null,
          "mobileNo": null,
          "gender": null,
          "title": null,
          "uid": null,
          "objectionReferenceNumber": null,
          "objectionAddReferenceNumber": null,
          "objectionDetails": null,
          "objectionStatus": null,
          "serviceId": null,
          "createdBy": null,
          "createdDate": null,
          "updatedDate": null,
          "lgIpMac": null,
          "lgIpMacUpd": null,
          "orgId": $scope.refOrgId,
          "userId": null,
          "langId": null,
          "objectionSerialNumber": null,
          "codIdOperLevel1": null,
          "codIdOperLevel2": null,
          "codIdOperLevel3": null,
          "codIdOperLevel4": null,
          "codIdOperLevel5": null,
          "locId": null,
          "deptCode": null,
          "lModDate": null,
          "updateDate": null,
          "billNo": null,
          "billDueDate": null,
          "noticeNo": null,
          "schedulingSelection": null,
          "inspectionType": null,
          "objectionIssuerName": null,
          "objectionOn": null,
          "hearingDate": null,
          "name": null,
          "nameOfInspector": null,
          "deptName": null,
          "serviceName": null,
          "locName": null,
          "taskId": null,
          "ipAddress": null,
          "ename": null,
          "empType": null,
          "errorList": null,
          "docs": [],
          "charges": null,
          "isFree": null,
          "free": false,
          "isPaymentGenerated": null,
          "paymentMode": null,
          "objTime": null,
          "objectionReason": null,
          "flatNo": null,
          "selectType": null,
          "chargesMap": {},
          "offlineDTO": {
              "challanNo": null,
              "serviceId": null,
              "oflPaymentMode": 0,
              "applNo": null,
              "ddNo": null,
              "ddDate": null,
              "poNo": null,
              "poDate": null,
              "bankaAccId": null,
              "isDeleted": null,
              "orgId": null,
              "userId": null,
              "langId": 0,
              "lmodDate": null,
              "lgIpMac": null,
              "bmBankAccountId": null,
              "payModeIn": null,
              "bmDrawOn": null,
              "bmChqDDNo": null,
              "bmChqDDDate": null,
              "amountToPay": null,
              "amountToShow": null,
              "hidebmChqDDNo": null,
              "hidebmChqDDDate": null,
              "deptId": null,
              "faYearId": null,
              "challanServiceType": null,
              "challanValidDate": null,
              "feeIds": {},
              "billDetIds": null,
              "finYearStartDate": null,
              "finYearEndDate": null,
              "applicantAddress": null,
              "documentUploaded": false,
              "fromedate": null,
              "toDate": null,
              "bankData": [],
              "loiNo": null,
              "mobileNumber": null,
              "emailId": null,
              "applicantName": null,
              "offlinePaymentText": null,
              "onlineOfflineCheck": null,
              "cbBankId": null,
              "uniquePrimaryId": null,
              "paymentCategory": null,
              "taskId": null,
              "empType": null,
              "loggedLocId": null,
              "tdpPrefixId": null,
              "narration": null,
              "manualReceiptNo": null,
              "manualReeiptDate": null,
              "documentList": null,
              "paymentStatus": null,
              "objectionNumber": null,
              "chargesMap": {},
              "charges": null,
              "vendorId": null,
              "receiptcategoryId": null,
              "demandLevelRebate": 0.0,
              "referenceNo": null,
              "usageType": null,
              "propNoConnNoEstateNoL": null,
              "propNoConnNoEstateNoV": null,
              "deptCode": null,
              "propName": null,
              "serviceCode": null,
              "serviceName": null,
              "pdRv": null,
              "applicantFullName": null,
              "plotNo": null,
              "billDetails": {},
              "billYearDetails": {},
              "printDtoList": null,
              "supplimentryBillIdMap": {},
              "dwzDTO": {
                  "areaDivision1": 0,
                  "areaDivision2": 0,
                  "areaDivision3": 0,
                  "areaDivision4": 0,
                  "areaDivision5": 0,
                  "empId": 0,
                  "tariffCategory": 0,
                  "available": false
              },
              "pgRefId": null,
              "transferType": null,
              "workflowEnable": null,
              "flatNo": null,
              "licNo": null,
              "rebateMode": null,
              "rebateAmt": null,
              "serviceNameMar": null,
              "fromDateStr": null,
              "toDateStr": null,
              "orgName": null,
              "orgNameMar": null,
              "orgAddress": null,
              "orgAddressMar": null,
              "slaSmDuration": null,
              "time": null,
              "cfcCenter": null,
              "cfcCounterNo": null,
              "payeeName": null,
              "transferOwnerFullName": null,
              "transferInitiatedDate": null,
              "transferDate": null,
              "regNo": null,
              "transferAddress": null,
              "certificateNo": null,
              "parentPropNo": null,
              "uniquePropertyId": null,
              "postalCardDocList": null,
              "occupierName": null,
              "pushToPayErrMsg": null,
              "posPayMode": null,
              "posTxnId": null,
              "newHouseNo": null,
              "referenceDate": null,
              "registrationYear": null,
              "registrationNo": null,
              "parshadWard1": null,
              "parshadWard2": null,
              "parshadWard3": null,
              "parshadWard4": null,
              "parshadWard5": null,
              "tranRefNumber": null,
              "tranRefDate": null,
              "assParshadWard1": null,
              "assParshadWard2": null,
              "assParshadWard3": null,
              "assParshadWard4": null,
              "assParshadWard5": null,
              "posPayApplicable": false
          }
      }

        $ionicLoading.show({ template: $filter('translate')('LOADING') });
        RestService.getServiceForFirstAppeal(params2).then(function (response) {
          console.log("Response of Service--2nd API", response);
          if (response == undefined || response == null || response == "") {
            $ionicLoading.hide();
            return false;
          }
          else {
            $scope.serviceResponse = response;
            $scope.serviceOptions = new Array();
            for (var i = 0; i < response.length; i++) {

              if ($localStorage.langNewId == "2") {
                $scope.serviceOptions.push({
                  lookUpId: response[i].lookUpId,
                  deptname: response[i].descLangSecond
                })
              } else {
                $scope.serviceOptions.push({
                  lookUpId: response[i].lookUpId,
                  deptname: response[i].descLangFirst
                })
              
              }
            }
            $ionicLoading.hide();
          }

        
          
          $ionicLoading.hide();
        }, function (err) {
          $ionicLoading.hide();
          // 					toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR'));
        })
      } */

// Enhancement #182314
      /* $scope.getLocation = function(){
        console.log("Entered Loc", $scope.deptName, $scope.serviceName);

        var param3 = {
          "objectionId": null,
          "objectionNumber": null,
          "objectionDate": null,
          "objectionDeptId": $scope.deptName,
          "apmApplicationId": null,
          "address": null,
          "eMail": null,
          "fName": null,
          "lName": null,
          "mName": null,
          "mobileNo": null,
          "gender": null,
          "title": null,
          "uid": null,
          "objectionReferenceNumber": null,
          "objectionAddReferenceNumber": null,
          "objectionDetails": null,
          "objectionStatus": null,
          "serviceId": null,
          "createdBy": null,
          "createdDate": null,
          "updatedDate": null,
          "lgIpMac": null,
          "lgIpMacUpd": null,
          "orgId": $scope.orgid,
          "userId": null,
          "langId": null,
          "objectionSerialNumber": null,
          "codIdOperLevel1": null,
          "codIdOperLevel2": null,
          "codIdOperLevel3": null,
          "codIdOperLevel4": null,
          "codIdOperLevel5": null,
          "locId": null,
          "deptCode": null,
          "lModDate": null,
          "updateDate": null,
          "billNo": null,
          "billDueDate": null,
          "noticeNo": null,
          "schedulingSelection": null,
          "inspectionType": null,
          "objectionIssuerName": null,
          "objectionOn": null,
          "hearingDate": null,
          "name": null,
          "nameOfInspector": null,
          "deptName": null,
          "serviceName": null,
          "locName": null,
          "taskId": null,
          "ipAddress": null,
          "ename": null,
          "empType": null,
          "errorList": null,
          "docs": [],
          "charges": null,
          "isFree": null,
          "free": false,
          "isPaymentGenerated": null,
          "paymentMode": null,
          "objTime": null,
          "objectionReason": null,
          "flatNo": null,
          "selectType": null,
          "chargesMap": {},
          "offlineDTO": {
              "challanNo": null,
              "serviceId": null,
              "oflPaymentMode": 0,
              "applNo": null,
              "ddNo": null,
              "ddDate": null,
              "poNo": null,
              "poDate": null,
              "bankaAccId": null,
              "isDeleted": null,
              "orgId": null,
              "userId": null,
              "langId": 0,
              "lmodDate": null,
              "lgIpMac": null,
              "bmBankAccountId": null,
              "payModeIn": null,
              "bmDrawOn": null,
              "bmChqDDNo": null,
              "bmChqDDDate": null,
              "amountToPay": null,
              "amountToShow": null,
              "hidebmChqDDNo": null,
              "hidebmChqDDDate": null,
              "deptId": null,
              "faYearId": null,
              "challanServiceType": null,
              "challanValidDate": null,
              "feeIds": {},
              "billDetIds": null,
              "finYearStartDate": null,
              "finYearEndDate": null,
              "applicantAddress": null,
              "documentUploaded": false,
              "fromedate": null,
              "toDate": null,
              "bankData": [],
              "loiNo": null,
              "mobileNumber": null,
              "emailId": null,
              "applicantName": null,
              "offlinePaymentText": null,
              "onlineOfflineCheck": null,
              "cbBankId": null,
              "uniquePrimaryId": null,
              "paymentCategory": null,
              "taskId": null,
              "empType": null,
              "loggedLocId": null,
              "tdpPrefixId": null,
              "narration": null,
              "manualReceiptNo": null,
              "manualReeiptDate": null,
              "documentList": null,
              "paymentStatus": null,
              "objectionNumber": null,
              "chargesMap": {},
              "charges": null,
              "vendorId": null,
              "receiptcategoryId": null,
              "demandLevelRebate": 0.0,
              "referenceNo": null,
              "usageType": null,
              "propNoConnNoEstateNoL": null,
              "propNoConnNoEstateNoV": null,
              "deptCode": null,
              "propName": null,
              "serviceCode": null,
              "serviceName": null,
              "pdRv": null,
              "applicantFullName": null,
              "plotNo": null,
              "billDetails": {},
              "billYearDetails": {},
              "printDtoList": null,
              "supplimentryBillIdMap": {},
              "dwzDTO": {
                  "areaDivision1": 0,
                  "areaDivision2": 0,
                  "areaDivision3": 0,
                  "areaDivision4": 0,
                  "areaDivision5": 0,
                  "empId": 0,
                  "tariffCategory": 0,
                  "available": false
              },
              "pgRefId": null,
              "transferType": null,
              "workflowEnable": null,
              "flatNo": null,
              "licNo": null,
              "rebateMode": null,
              "rebateAmt": null,
              "serviceNameMar": null,
              "fromDateStr": null,
              "toDateStr": null,
              "orgName": null,
              "orgNameMar": null,
              "orgAddress": null,
              "orgAddressMar": null,
              "slaSmDuration": null,
              "time": null,
              "cfcCenter": null,
              "cfcCounterNo": null,
              "payeeName": null,
              "transferOwnerFullName": null,
              "transferInitiatedDate": null,
              "transferDate": null,
              "regNo": null,
              "transferAddress": null,
              "certificateNo": null,
              "parentPropNo": null,
              "uniquePropertyId": null,
              "postalCardDocList": null,
              "occupierName": null,
              "pushToPayErrMsg": null,
              "posPayMode": null,
              "posTxnId": null,
              "newHouseNo": null,
              "referenceDate": null,
              "registrationYear": null,
              "registrationNo": null,
              "parshadWard1": null,
              "parshadWard2": null,
              "parshadWard3": null,
              "parshadWard4": null,
              "parshadWard5": null,
              "tranRefNumber": null,
              "tranRefDate": null,
              "assParshadWard1": null,
              "assParshadWard2": null,
              "assParshadWard3": null,
              "assParshadWard4": null,
              "assParshadWard5": null,
              "posPayApplicable": false
          }
      }

        $ionicLoading.show({ template: $filter('translate')('LOADING') });
        RestService.getLocForFirstAppeal(param3).then(function (response) {
          console.log("Response of Loc---3Rd API", response);
          if (response == undefined || response == null || response == "") {
            $ionicLoading.hide();
            return false;
          } else {
            $scope.locationResponse = response;
            $scope.locationOptions = new Array();
            for (var i = 0; i < response.length; i++) {

              if ($localStorage.langNewId == "2") {
                $scope.locationOptions.push({
                  locationid: response[i].lookUpId,
                  locationname: response[i].descLangSecond
                })
              } else {
                $scope.locationOptions.push({
                  locationid: response[i].lookUpId,
                  locationname: response[i].descLangFirst
                })
              
              }
            }
            $ionicLoading.hide();
          }

        
          
          $ionicLoading.hide();
        }, function (err) {
          $ionicLoading.hide();
          // 					toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR'));
        })
      } */

      $scope.submitRTIAppeal = function(){
        var org = 1;
        if ($scope.referenceNo && $scope.title && $scope.firstName && $scope.lastName && $scope.gender && $scope.mobilenum && $scope.editAddress && $scope.appealType && $scope.objDetails ) {

          $ionicLoading.show();
          console.log("Seached", $scope.deptName, $scope.serviceName, $scope.appealType, $scope.Location,$scope.emailid,$scope.editAddress,$scope.appealType,);
          var param6={
            "objectionId": null,
            "objectionNumber": null,
            "objectionDate": null,
            //"objectionDeptId":  $scope.deptName,   //test
            "objectionDeptId": null,
            "apmApplicationId": null,
            "address":$scope.editAddress,
            "eMail":$scope.emailid,
            "fName":$scope.firstName,
            "lName":$scope.lastName,
            "mName":$scope.middleName,
            "mobileNo":$scope.mobilenum,
            "gender":  $scope.gender,
            "title":  $scope.gender,
            "uid": $scope.aadharno,
            "objectionReferenceNumber":$scope.referenceNo,
            "objectionAddReferenceNumber": null,
            "objectionDetails": $scope.objDetails,
            // "objectionStatus":$scope.objectionStatus,
            //"objectionStatus": "PENDING",
            //"serviceId": $scope.serviceName,   //test
            "objectionStatus":"Pending",
            "serviceId": null,
            "createdBy": null,
            "createdDate": null,
            "updatedDate": null,
            "lgIpMac": null,
            "lgIpMacUpd": null,
            "orgId":$scope.refOrgId,  //test
            // "orgId":org,        
            "userId":$scope.userId,
            "langId": 1,
            "objectionSerialNumber": null,
            "codIdOperLevel1": null,
            "codIdOperLevel2": null,
            "codIdOperLevel3": null,
            "codIdOperLevel4": null,
            "codIdOperLevel5": null,
            "locId": null,
            "deptCode": null,
            "lModDate": null,
            "updateDate": null,
            "billNo": null,
            "billDueDate": null,
            "noticeNo": null,
            "schedulingSelection": null,
            "inspectionType": null,
            "objectionIssuerName": null,
            "objectionOn": 3834,
            "hearingDate": null,
            "name": null,
            "nameOfInspector": null,
            "deptName": null,
            "serviceName": null,
            "locName": null,
            "taskId": null,
            "ipAddress": "10.67.112.1",
            "ename": "Vaibhav",
            "empType": 1001,
            "errorList": null,    
            "charges": null,
            "isFree": null,
            "free": false,
            "isPaymentGenerated": false,
            "paymentMode": null,                                                            
            "objTime": null,       
            "applicationDate": null,
            "validDate": null,
            "flatNo": null,
            "docs": null,
            "inspectionStatus": null,
            "applicantName": null,
            "objectionReason": null,
            "objectionAppealType": null,
            "dispatchNo": null,
            "dispachDate": null,          
            "deliveryDate": null,
            "selectType": null,
            "chargesMap": {},
            "offlineDTO": {
                "challanNo": null,
                "serviceId": null,
                "oflPaymentMode": 0,
                "applNo": null,
                "ddNo": null,
                "ddDate": null,
                "poNo": null,
                "poDate": null,
                "bankaAccId": null,
                "isDeleted": null,
                "orgId": null,
                "userId": null,
                "langId": 0,
                "lmodDate": null,
                "lgIpMac": null,
                "bmBankAccountId": null,
                "payModeIn": null,
                "bmDrawOn": null,
                "bmChqDDNo": null,
                "bmChqDDDate": null,
                "amountToPay": null,
                "amountToShow": null,
                "hidebmChqDDNo": null,
                "hidebmChqDDDate": null,
                "deptId": null,
                "faYearId": null,
                "challanServiceType": null,
                "challanValidDate": null,
                "feeIds": {},
                "billDetIds": null,
                "finYearStartDate": null,
                "finYearEndDate": null,
                "applicantAddress": null,
                "documentUploaded": false,
                "fromedate": null,
                "toDate": null,
                "bankData": [],
                "loiNo": null,
                "mobileNumber": null,
                "emailId": null,
                "applicantName": null,
                "offlinePaymentText": null,
                "onlineOfflineCheck": null,
                "cbBankId": null,
                "uniquePrimaryId": null,
                "paymentCategory": null,
                "taskId": null,
                "empType": null,
                "loggedLocId": null,
                "tdpPrefixId": null,
                "narration": null,
                "manualReceiptNo": null,
                "manualReeiptDate": null,
                "documentList": null,
                "paymentStatus": null,
                "objectionNumber": null,
                "chargesMap": {},
                "charges": null,
                "vendorId": null,
                "receiptcategoryId": null,
                "demandLevelRebate": 0.0,
                "referenceNo": null,
                "usageType": null,
                "propNoConnNoEstateNoL": null,
                "propNoConnNoEstateNoV": null,
                "deptCode": null,
                "propName": null,
                "serviceCode": null,
                "serviceName": null,
                "pdRv": null,
                "applicantFullName": null,
                "plotNo": null,
                "billDetails": {},
                "billYearDetails": {},
                "printDtoList": null,
                "supplimentryBillIdMap": {},
                "dwzDTO": {
                    "areaDivision1": 0,
                    "areaDivision2": 0,
                    "areaDivision3": 0,
                    "areaDivision4": 0,
                    "areaDivision5": 0,
                    "empId": 0,
                    "tariffCategory": 0,
                    "available": false
                },
                "pgRefId": null,
                "transferType": null,
                "workflowEnable": null,
                "flatNo": null,
                "licNo": null,
                "rebateMode": null,
                "rebateAmt": null,
                "serviceNameMar": null,
                "fromDateStr": null,
                "toDateStr": null,
                "orgName": null,
                "orgNameMar": null,
                "orgAddress": null,
                "orgAddressMar": null,
                "slaSmDuration": null,
                "time": null,
                "cfcCenter": null,
                "cfcCounterNo": null,
                "payeeName": null,
                "transferOwnerFullName": null,
                "transferInitiatedDate": null,
                "transferDate": null,
                "regNo": null,
                "transferAddress": null,
                "certificateNo": null,
                "parentPropNo": null,
                "uniquePropertyId": null,
                "postalCardDocList": null,
                "occupierName": null,
                "pushToPayErrMsg": null,
                "posPayMode": null,
                "posTxnId": null,
                "newHouseNo": null,
                "referenceDate": null,
                "registrationYear": null,
                "registrationNo": null,
                "parshadWard1": null,
                "parshadWard2": null,
                "parshadWard3": null,
                "parshadWard4": null,
                "parshadWard5": null,
                "tranRefNumber": null,
                "tranRefDate": null,
                "assParshadWard1": null,
                "assParshadWard2": null,
                "assParshadWard3": null,
                "assParshadWard4": null,
                "assParshadWard5": null,
                "posPayApplicable": false
            }
        }

          RestService.saveFirstAppeal(param6).then(function (response) {
            console.log("Response After Saving", response);
            if (response == undefined || response == null || response == "" || response == {}) {
              console.log("Error");
              $ionicLoading.hide();
              return false;
            } else {       
              $ionicLoading.hide();
              messageP = '<b>' + $filter('translate')('RTIFIRAPP') +'<br>'+$filter('translate')('OBJAPLINO') + '</b>' + response.apmApplicationId +'<br>'+'<b>' +$filter('translate')('RTIOBJNUM')+'</b>' +response.objectionNumber;
              $scope.saveResponse = response;
              var alertPopup = $ionicPopup.alert({
                title: '<b>'+$filter('translate')('RTIFIRSTAPPEAL')+'</b>',
                template: messageP,
                  buttons : [{
                    text : $filter('translate')('OK'),
                    type : 'button button-block  customBgColor',
                    onTap : function(){
                        $state.go("app.home");
                    }
                  }]
              });
              $ionicLoading.hide();
            }
            $ionicLoading.hide();
          }, function (err) {
            $ionicLoading.hide();
            // 					toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR'));
          })
        } else if (!$scope.referenceNo && $scope.edittitle && $scope.firstName && $scope.lastName && $scope.editgender && $scope.editmobilenum && $scope.editAddress && $scope.appealType && $scope.objDetails) {
          toaster.clear()
          toaster.error($filter('translate')('PLSENTAPPLNO'));
        } else if (!$scope.edittitle && $scope.referenceNo && $scope.firstName && $scope.lastName && $scope.editgender && $scope.editmobilenum && $scope.editAddress && $scope.appealType && $scope.objDetails) {
          toaster.clear()
          toaster.error($filter('translate')('PLSSELTITLE'));
        } else if (!$scope.firstName && $scope.referenceNo && $scope.edittitle && $scope.lastName && $scope.editgender && $scope.editmobilenum && $scope.editAddress && $scope.appealType && $scope.objDetails) {
          toaster.clear()
          toaster.error($filter('translate')('PLSENTFNAME'));
        } else if (!$scope.lastName && $scope.referenceNo && $scope.edittitle && $scope.firstName && $scope.editgender && $scope.editmobilenum && $scope.editAddress && $scope.appealType && $scope.objDetails) {
          toaster.clear()
          toaster.error($filter('translate')('PLSENTLNAME'));
        } else if (!$scope.editgender && $scope.referenceNo && $scope.edittitle && $scope.firstName && $scope.lastName && $scope.editmobilenum && $scope.editAddress && $scope.appealType && $scope.objDetails) {
          toaster.clear()
          toaster.error($filter('translate')('PLSSELGENDER'));
        } else if (!$scope.editmobilenum && $scope.referenceNo && $scope.edittitle && $scope.firstName && $scope.lastName && $scope.editgender && $scope.editAddress && $scope.appealType && $scope.objDetails) {
          toaster.clear()
          toaster.error($filter('translate')('PLSENTMOBNO'));
        } else if (!$scope.editAddress && $scope.referenceNo && $scope.edittitle && $scope.firstName && $scope.lastName && $scope.editgender && $scope.editmobilenum && $scope.appealType && $scope.objDetails) {
          toaster.clear()
          toaster.error($filter('translate')('PLSENTADD'));
        } else if (!$scope.appealType && $scope.referenceNo && $scope.edittitle && $scope.firstName && $scope.lastName && $scope.editgender && $scope.editmobilenum && $scope.editAddress && $scope.objDetails) {
          toaster.clear()
          toaster.error($filter('translate')('PLSSELOBJON'));
        } else if (!$scope.objDetails && $scope.referenceNo && $scope.edittitle && $scope.firstName && $scope.lastName && $scope.editgender && $scope.editmobilenum && $scope.editAddress && $scope.appealType) {
          toaster.clear()
          toaster.error($filter('translate')('PLSENTOBJDETAILS'));
        } else {
          toaster.clear()
          toaster.error($filter('translate')('PLSENTALLDET'));
        }
      }
      
      $scope.callRefrenceNo=function(){
        // $scope.referenceNo = referenceNo;
        console.log($scope.referenceNo,"$scope.referenceNo")
       var postData={
          "objectionId": null,
          "objectionNumber": null,
          "objectionDate": null,
          "objectionDeptId": null,
          "apmApplicationId": null,
          "address": null,
          "eMail": null,
          "fName": null,
          "lName": null,
          "mName": null,
          "mobileNo": null,
          "gender": null,
          "title": null,
          "uid": null,
          "objectionReferenceNumber":$scope.referenceNo,
          "objectionAddReferenceNumber": null,
          "objectionDetails": null,
          "objectionStatus": null,
          "serviceId": null,
          "createdBy": null,
          "createdDate": null,
          "updatedDate": null,
          "lgIpMac": null,
          "lgIpMacUpd": null,
          "orgId": $scope.orgid,
          "userId": null,
          "langId": null,
          "objectionSerialNumber": null,
          "codIdOperLevel1": null,
          "codIdOperLevel2": null,
          "codIdOperLevel3": null,
          "codIdOperLevel4": null,
          "codIdOperLevel5": null,
          "locId": null,
          "deptCode": null,
          "lModDate": null,
          "updateDate": null,
          "billNo": null,
          "billDueDate": null,
          "noticeNo": null,
          "schedulingSelection": null,
          "inspectionType": null,
          "objectionIssuerName": null,
          "objectionOn": null,
          "hearingDate": null,
          "name": null,
          "nameOfInspector": null,
          "deptName": null,
          "serviceName": null,
          "locName": null,
          "taskId": null,
          "ipAddress": null,
          "ename": null,
          "empType": null,
          "errorList": null,
          "charges": null,
          "isFree": null,
          "free": false,
          "isPaymentGenerated": null,
          "paymentMode": null,
          "objTime": null,
          "applicationDate": null,
          "validDate": null,
          "flatNo": null,
          "docs": [],
          "inspectionStatus": null,
          "applicantName": null,
          "objectionReason": null,
          "objectionAppealType": null,
          "dispatchNo": null,
          "dispachDate": null,
          "deliveryDate": null,
          "selectType": null,
          "chargesMap": {},
          "offlineDTO": {
              "challanNo": null,
              "serviceId": null,
              "oflPaymentMode": 0,
              "applNo": null,
              "ddNo": null,
              "ddDate": null,
              "poNo": null,
              "poDate": null,
              "bankaAccId": null,
              "isDeleted": null,
              "orgId": null,
              "userId": null,
              "langId": 0,
              "lmodDate": null,
              "lgIpMac": null,
              "bmBankAccountId": null,
              "payModeIn": null,
              "bmDrawOn": null,
              "bmChqDDNo": null,
              "bmChqDDDate": null,
              "amountToPay": null,
              "amountToShow": null,
              "hidebmChqDDNo": null,
              "hidebmChqDDDate": null,
              "deptId": null,
              "faYearId": null,
              "challanServiceType": null,
              "challanValidDate": null,
              "feeIds": {},
              "billDetIds": null,
              "finYearStartDate": null,
              "finYearEndDate": null,
              "applicantAddress": null,
              "documentUploaded": false,
              "fromedate": null,
              "toDate": null,
              "bankData": [],
              "loiNo": null,
              "mobileNumber": null,
              "emailId": null,
              "applicantName": null,
              "offlinePaymentText": null,
              "onlineOfflineCheck": null,
              "cbBankId": null,
              "uniquePrimaryId": null,
              "paymentCategory": null,
              "taskId": null,
              "empType": null,
              "loggedLocId": null,
              "tdpPrefixId": null,
              "narration": null,
              "manualReceiptNo": null,
              "manualReeiptDate": null,
              "documentList": null,
              "paymentStatus": null,
              "objectionNumber": null,
              "chargesMap": {},
              "charges": null,
              "vendorId": null,
              "receiptcategoryId": null,
              "demandLevelRebate": 0.0,
              "referenceNo": null,
              "usageType": null,
              "propNoConnNoEstateNoL": null,
              "propNoConnNoEstateNoV": null,
              "deptCode": null,
              "propName": null,
              "serviceCode": null,
              "serviceName": null,
              "pdRv": null,
              "applicantFullName": null,
              "plotNo": null,
              "billDetails": {},
              "billYearDetails": {},
              "printDtoList": null,
              "supplimentryBillIdMap": {},
              "dwzDTO": {
                  "areaDivision1": 0,
                  "areaDivision2": 0,
                  "areaDivision3": 0,
                  "areaDivision4": 0,
                  "areaDivision5": 0,
                  "empId": 0,
                  "tariffCategory": 0,
                  "available": false
              },
              "pgRefId": null,
              "transferType": null,
              "workflowEnable": null,
              "flatNo": null,
              "licNo": null,
              "rebateMode": null,
              "rebateAmt": null,
              "serviceNameMar": null,
              "fromDateStr": null,
              "toDateStr": null,
              "orgName": null,
              "orgNameMar": null,
              "orgAddress": null,
              "orgAddressMar": null,
              "slaSmDuration": null,
              "time": null,
              "cfcCenter": null,
              "cfcCounterNo": null,
              "payeeName": null,
              "transferOwnerFullName": null,
              "transferInitiatedDate": null,
              "transferDate": null,
              "regNo": null,
              "transferAddress": null,
              "certificateNo": null,
              "parentPropNo": null,
              "uniquePropertyId": null,
              "postalCardDocList": null,
              "occupierName": null,
              "pushToPayErrMsg": null,
              "posPayMode": null,
              "posTxnId": null,
              "newHouseNo": null,
              "referenceDate": null,
              "registrationYear": null,
              "registrationNo": null,
              "parshadWard1": null,
              "parshadWard2": null,
              "parshadWard3": null,
              "parshadWard4": null,
              "parshadWard5": null,
              "tranRefNumber": null,
              "tranRefDate": null,
              "assParshadWard1": null,
              "assParshadWard2": null,
              "assParshadWard3": null,
              "assParshadWard4": null,
              "assParshadWard5": null,
              "posPayApplicable": false
          }
       }
       console.log("Refrence ",JSON.stringify(postData))
       RestService.getReferenceData(postData).then(function (response) {
        console.log("RefrenceData-----th api", response);
        $scope.referenceData=response;
        console.log(response.apmApplicationId)
        if(response.apmApplicationId==null || response.apmApplicationId==undefined){
          toaster.error($filter('translate')('INVAPPLNO'));
          $scope.showDetails = false;
          $scope.showErrorMsg = false;
        }else{
          console.log("RefrenceData-----in else", JSON.stringify(response))
          console.log("ErrorList", $scope.referenceData.errorList[0])
          if($scope.referenceData.errorList[0] == 'First Appeal already done'){
            toaster.error($scope.referenceData.errorList[0]);
            $scope.showDetails = false;
            $scope.showErrorMsg = true;
          } else {
            $scope.showDetails = true;
            $scope.showErrorMsg = false;
            $scope.firstName=$scope.referenceData.fName
            $scope.middleName=$scope.referenceData.mName;
            $scope.lastName=$scope.referenceData.lName
            $scope.gender=$scope.referenceData.gender
            $scope.mobilenum=$scope.referenceData.mobileNo
            $scope.emailid=$scope.referenceData.eMail;
            $scope.aadharno=$scope.referenceData.uid
            $scope.editAddress=$scope.referenceData.address;
            $scope.title=$scope.referenceData.title;
            $scope.refOrgId=$scope.referenceData.orgId
            $scope.getDeptForFirstAppeal();
          }
        }
        //console.log($scope.firstName,  $scope.lastName)

        // if (response == undefined || response == null || response == "") {
        //   $ionicLoading.hide();
        //   return false;
        // } else {
        //   $scope.saveResponse = response;
          
        //   $ionicLoading.hide();
        // }
        $ionicLoading.hide();
      }, function (err) {
        $ionicLoading.hide();
        // 					toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR'));
      })

      }


      var verfyImg;
      $scope.attachments = [];
      $scope.counter = 0;
      $scope.defaultimage = true;
      $scope.cameraImage = false;
      var arrayListTest = [];

      $scope.imageupload = function (fileObject, type) {
      
      var fileSizeChecking = $scope.fileSizeCheck()
      if(fileSizeChecking){
        console.log("Entered if", fileSizeChecking);
        return;
      } else {

        if($scope.counter >= 5){
          console.log("Entered if", $scope.counter)
          alert($filter('translate')('NOMORETHAN5IMG'));
          return
        }
        console.log("Entered Image Upload", $scope.counter)
         
          if(ionic.Platform.isIOS()){
            $rootScope.isHeaderHide=true;
            $scope.$apply(function() {
              $rootScope.isHeaderHide=true;
            })
          }

        
          var imgreader = new FileReader();
          //var idValue = fileObject.getAttribute("id");
          verfyImg = fileObject.files[0];
          var maxSize = fileObject.getAttribute('data-max-size');
          // $scope.maxSize = 5000000;
          // var fileSize = verfyImg.size;
          var fileSize = verfyImg.size;
          var ext = fileObject.value.split('.').pop();
          $scope.imageName = verfyImg.name;
          console.log("EXTENSION:", ext)
          console.log("FILE NAME",verfyImg)
          console.log("FILE SIZE",fileSize)
          var sizeinKB = fileSize / 1000;
          $scope.num = fileSize;
    
          $scope.filefirstDigitStr = String($scope.num)[0];
    
          $scope.filefirstDigitNum = Number($scope.filefirstDigitStr);
          if(ext){
            if(ext == "pdf" || ext == "doc" || ext == "docx" ){
              console.log('$scope.filefirstDigitNum ', $scope.filefirstDigitNum);
              console.log('maxSize', maxSize);
              if($scope.filefirstDigitNum > 5){
                // fileObject.value = "";
                  alert($filter('translate')('COMPLAINTFILEVALIDATION'));
                  return;
                } else{
                  imgreader.onload = function (e) {
                //console.log("TARGET"+e.target.result)
                    $scope.encoded_fileCom = window.btoa(e.target.result.toString());
                    $scope.defaultimage = false;
                    $scope.cameraImage = true;
                    $scope.myImgUrl = $scope.encoded_fileCom;
                    $scope.$apply(function() {
                      $scope.myImgUrl = $scope.encoded_fileCom;
                    })
                    var sizeinKB = $scope.calculateImageSize($scope.myImgUrl);
                    console.log("Upload $scope.myImgUrl", $scope.myImgUrl);
                    //$scope.$apply();
                    let x = Math.floor((Math.random() * 100) + 11);
                    var docNum = x;

                    var documentObjectImg =
                    {
                      attachmentId: null,
                      documentId: null,
                      documentName: "Doc" + docNum + "." + ext,
                      documentSerialNo: null,
                      descriptionType: null,
                      documentType: ext,
                      doc_DESC_Mar: null,
                      doc_DESC_ENGL: null,
                      documentByteCode: $scope.myImgUrl,
                      checkkMANDATORY: "Y",
                      docSize: sizeinKB
                    };
                  arrayListTest.push(documentObjectImg);
                  $scope.$apply(function() {
                    $scope.attachments.push(documentObjectImg);
                  })
                  console.log("Upload Attachment", $scope.attachments);
                }
              }
            } else {
              fileObject.value = "";
              alert($filter('translate')('ONLYPDFDOCXLSALLOWED'));
              return;
            }
          } else {
            alert($filter('translate')('upload_document'));
            return;
          }
          imgreader.readAsBinaryString(verfyImg);
          $scope.counter++;
      }
    };

    $scope.removeImage = function (index) {
      console.log("Enter Remove Image", index);
      if($scope.attachments!=undefined){
        $scope.attachments.splice(index, 1);
        $scope.counter--;
      }
      if($scope.myImgUrl){
        $scope.myImgUrl = null
      } else{
        console.log('no image')
      }

    }

    $scope.calculateImageSize = function(base64String) {
      let padding;
      let inBytes;
      let base64StringLength;
      if (base64String.endsWith('==')) { padding = 2; }
      else if (base64String.endsWith('=')) { padding = 1; }
      else { padding = 0; }
  
      base64StringLength = base64String.length;
      console.log(base64StringLength);
      inBytes = (base64StringLength / 4) * 3 - padding;
      console.log(inBytes);
      var kbytes = inBytes / 1000;
      console.log("kbytes of image", kbytes)
      return kbytes;
    }

    $scope.fileSizeCheck = function(){
      if($scope.attachments != undefined){
        var totalSize=0;
        $scope.attachments.forEach(function (x) { 
          console.log("x.docsize",x.docSize)

          //totalSize = x.docSize;
          totalSize = totalSize + parseFloat(x.docSize);
          console.log("Total Size", totalSize);

          if(totalSize > 5000){
            alert($filter('translate')('TOTALSIZELESSERTHAN5MB'));
            return true;
          } else {
            console.log("totalSize", totalSize);
            return false;
          }
        
        });
      }
    }

    $scope.LimitInput = function () {
      var pinlimit = document.getElementById("descLim").value;
      var inputVal = pinlimit;
      if (inputVal.length > 3000) {
        inputVal.slice(0, -1);
        var inputValSlice = inputVal.slice(0, -1);
        document.getElementById("descLim").value = inputValSlice;
      }
    };

      var _init = function () {
        $rootScope.getNonHData("GEN", "genoptions", $scope.orgid);
        $rootScope.getNonHData("TTL", "ttloptions", $scope.orgid);
        $rootScope.getNonHData("OBJ", "appealTypeOptions", $scope.orgid);
        
      
        $scope.applicationType = 'I';
      }

      _init();
});


