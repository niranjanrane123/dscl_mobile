angular.module('starter')

    .controller('RtiPayCTRL', function ($scope, $location, RestService, $ionicLoading, $stateParams, toaster,
        $filter, ENV, dateFilter, $state, $localStorage, $ionicPopup, $sessionStorage,$ionicPlatform,$timeout,$interval) {


        console.log("$localStorage.responselogindata---" + JSON.stringify($localStorage.responselogindata));
        //      $scope.orgid = $localStorage.responselogindata.orgId;
        $scope.orgid = $localStorage.selectedorgID;
        $scope.userID = $localStorage.responselogindata.userId;
        $scope.loginUSername = $localStorage.responselogindata.firstName;
        $scope.LoginMobileNo = $localStorage.responselogindata.mobileNo;
        $scope.emailId = $localStorage.responselogindata.emailId;
        $scope.paymentGateway = 0;
        $showReceipt = false;
        $scope.service_information = "";
        $scope.applicant_name = "";
        $scope.contact_number = "";
        $scope.email_id_status = "";
        $scope.payment_amount = "";
        $scope.order_number = "";
        $scope.transaction_date_time = "";
        $scope.labelName = "";
        $scope.transaction_status = ""
        $scope.ORG_ID = '';
        // $scope.applicantOrgId = 1;
        $scope.taxId = null;
        $scope.comeFrom = $sessionStorage.comeFrom;
       
            if($sessionStorage.comeFrom == 'ApplicationPayment' || $sessionStorage.comeFrom == 'statusOfPayments')
            {
               
                $scope.FlatRate = $sessionStorage.amount;
                $scope.ORG_ID = $sessionStorage.orgId;
               
            }
            else{
                $scope.ORG_ID = $localStorage.applicantDetails.org
                $scope.applicantOrgId = $scope.ORG_ID;
                $scope.taxId = null;
                $scope.ServiceShortName = "RAF";
                $scope.FlatRate = 10;
                $scope.feesId = {
                1: $scope.FlatRate
        }
            }


var setLOIParam = function() {
    var pendingPaymentparam = {
        // $sessionStorage.applictNo = rowData.applicationId;
        // $sessionStorage.serviceName = rowData.serviceName;
        // $sessionStorage.amount = rowData.loiMasData.loiAmount;
        // $sessionStorage.orgId = rowData.loiMasData.orgid;
        // $sessionStorage.serviceId = rowData.loiMasData.loiServiceId;
        // $sessionStorage.fees = fees;

    "applicantName": $localStorage.responselogindata.firstName +
    ''+ $localStorage.responselogindata.middleName + ''+ $localStorage.responselogindata.lastName,  
    "dueAmt": $sessionStorage.amount,  
    "mobileNo": $scope.LoginMobileNo ,
    "email": $localStorage.responselogindata.emailId,
    "udf1": $sessionStorage.applictNo ,
    "udf2": $sessionStorage.serviceId,
    "bankId":$scope.paymentGateway,
    "udf3": "CitizenHome.html",
    "udf4": null,
    "udf5": "RTI",
    "udf6": null,
    "udf7": $sessionStorage.applictNo,
    "referenceId":$sessionStorage.applictNo,
    "serviceShortName":"RAF",
    "txnId":null,
    "orgId":  $sessionStorage.orgId ,
    "userId": $scope.userID,
    "langId":$localStorage.langID,
    "documentUploaded": false,
    "challanServiceType":"N",
    "feeIds": $sessionStorage.fees

    };

    saveLOIPaymentRequest(pendingPaymentparam);
}

            var setAppPendingPaymentParam = function (payData)
            {
                console.log("app pending data=", payData);
                 var pendingPaymentparam = {
                           
                            "applicantName": $localStorage.responselogindata.firstName +
                            ''+ $localStorage.responselogindata.middleName + ''+ $localStorage.responselogindata.lastName,  
                            "dueAmt": payData.amount,  
                            "mobileNo": $scope.LoginMobileNo ,
                            "email": $localStorage.responselogindata.emailId,
                            "udf1": payData.refId,
                            "udf2": payData.serviceId,
                            "bankId":$scope.paymentGateway,
                            "udf3": "CitizenHome.html",
                            "udf4": null,
                            "udf5": "RTI",
                            "udf6": null,
                            "udf7": payData.refId,
                            "referenceId":payData.refId,
                            "serviceShortName":"RAF",
                            "txnId": $sessionStorage.taxId,
                            "orgId":  $sessionStorage.orgId ,
                            "userId": $scope.userID,
                            "langId":$localStorage.langID,
                            "documentUploaded": false,
                            "challanServiceType":"N",
                            "feeIds": {'1':payData.amount}

                }

                saveLOIPaymentRequest(pendingPaymentparam);
       
        }


   
        $localStorage.langID = "1";
        $scope.checklist = '';
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
        // $scope.FlatRate;
        $scope.selectfilename;
        $scope.newAppInDate = new Date().getTime();
        // $scope.FlatRate = $sessionStorage.responseservicechargedata.responseObj[0].chargeAmount;
        $scope.ApplicantNumberRefid = $sessionStorage.applictNo;


       
   
        $scope.paymentGatway = function(value){
            $scope.paymentGateway = value
            $sessionStorage.paymentgatway = value
        }
        $scope.getPayStatus = function (){
        $ionicLoading.show({ template: $filter('translate')('LOADING') });
            RestService.getPaymenystatus($sessionStorage.applictNo).then(function (response) {
                console.log("payment option--" + JSON.stringify(response));
                $sessionStorage.paymentStaus = response
                if(response == !null || response == !undefined){
                    $showReceipt = true;
                    $ionicLoading.hide();
                }else{

                }
               
               
                console.log('1. $scope.paymentGateway=', $scope.paymentGateway);
               
            }, function (err) {
                $ionicLoading.hide();
            })
        }
        $scope.getinsertIntoReceiptMaster = function (){
            var postData = {
               
               
                    "challanNo": null,
                    "serviceId": 780,
                    "oflPaymentMode": 2433,
                    "applNo": $sessionStorage.applictNo,
                    "ddNo": null,
                    "ddDate": null,
                    "poNo": null,
                    "poDate": null,
                    "bankaAccId": 0,
                    "isDeleted": null,
                    "orgId": 13,
                    "userId": $scope.userID,
                    "langId": 1,
                    "lmodDate": null,
                    "lgIpMac": "192.168.100.59",
                    "bmBankAccountId": null,
                    "payModeIn":$sessionStorage.perfixchargeApplicableAt,
                    "bmDrawOn": "",
                    "bmChqDDNo": null,
                    "bmChqDDDate": null,
                    "amountToPay": $scope.FlatRate,
                    "amountToShow": $scope.FlatRate,
                    "hidebmChqDDNo": null,
                    "hidebmChqDDDate": null,
                    "deptId": 19,
                    "faYearId": null,
                    "challanServiceType": "N",
                    "challanValidDate": null,
                    "feeIds": {
                        "2097": $scope.FlatRate
                    },
                    "billDetIds": null,
                    "finYearStartDate": null,
                    "finYearEndDate": null,
                    "applicantAddress": "null null null null",
                    "documentUploaded": false,
                    "fromedate": null,
                    "toDate": null,
                    "bankData": [],
                    "loiNo": null,
                    "mobileNumber":$scope.LoginMobileNo,
                    "emailId": $scope.emailId,
                    "applicantName": $scope.loginUSername,
                    "offlinePaymentText": "PCB",
                    "onlineOfflineCheck": "Y",
                    "cbBankId": null,
                    "uniquePrimaryId": null,
                    "paymentCategory": null,
                    "taskId": null,
                    "empType": 1001,
                    "loggedLocId": null,
                    "tdpPrefixId": null,
                    "narration": null,
                    "manualReceiptNo": null,
                    "manualReeiptDate": null,
                    "documentList": null,
                    "paymentStatus": "success",
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
                    "pgRefId": 220522,
                    "transferType": null,
                    "workflowEnable": null,
                    "flatNo": null,
                    "licNo": null,
                    "multiModeList": [],
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
                    "postalCardDocList": null
                }
               

                console.log(JSON.stringify(postData),"Posting data of IntoReceiptMaster ")
            $ionicLoading.show({ template: $filter('translate')('LOADING') });
                RestService.getinsertIntoReceiptMaster(postData).then(function (response) {
                    console.log("payment option--" + JSON.stringify(response));
                    $sessionStorage.paymentStaus = response
                    if(response == !null || response == !undefined){
                        $showReceipt = true;
                        $ionicLoading.hide();
                    }else{
   
                    }
                   
                   
                    console.log('1. $scope.paymentGateway=', $scope.paymentGateway);
                   
                }, function (err) {
                    $ionicLoading.hide();
                })
            }
            $scope.getTransactionAfterPaymentCancel = function (){
           
                var applicationId = $sessionStorage.applictNo,
               
                toString = applicationId.toString(),
                toConcat = applicationId + "";

            var mobileNo = $scope.LoginMobileNo
            var flaterate = $scope.FlatRate
            var pgId = $scope.paymentGateway
            var taxId = $sessionStorage.textnID 
                var postData = {
                   
                        "pgId":toString = pgId.toString(),
                        "addedon":"20-01-2022 13:47:00",
                        "orgId":"13",
                        "mode":"Net Banking",
                        "SuccessMessage":"Y",
                        "ownerName":$scope.loginUSername,
                        "error_Message":"",
                        "payment_source":"CCAvenue",
                        "bank_ref_num":"1642666528506",
                        "lang":"1",
                        "email":$scope.emailId,
                        "txnid":taxId.toString(),
                        "app_no_label":"Your payment has been received Successfully ,Your Application Number",
                        "amount":toString = flaterate.toString(),
                        "orgName":"Bhatapara Municipal Council",
                        "udf5":"RAF",
                        "mihpayid":"311007919621",
                        "udf3":"CitizenHome.html",
                        "net_amount_debit":toString = flaterate.toString(),
                        "udf1":"780",
                        "udf2": toString ,
                        "phone": toString = mobileNo.toString(),
                        "applicationId": toString ,
                        "productinfo":"File RTI On-line",
                        "hash":"NA",
                        "status":"cancel",
                   
                       
                }
                $sessionStorage.postData = postData
                console.log(JSON.stringify(postData),"Posting data of transation ")
                $ionicLoading.show({ template: $filter('translate')('LOADING') });
                    RestService.getTransactionAfterPayment(postData).then(function (response) {
                        console.log("payment option--" + JSON.stringify(response));
                        $sessionStorage.paymentStaus = response
                          
                        if(response == !null || response == !undefined){
                            $showReceipt = true;
                            $ionicLoading.hide();
                        }else{
       
                        }
                       
                       
                        console.log('1. $scope.paymentGateway=', $scope.paymentGateway);
                       
                    }, function (err) {
                        $ionicLoading.hide();
                    })
                }

                $scope.getTransactionAfterPaymentfaild = function (){
           
                    var applicationId = $sessionStorage.applictNo,
                   
                    toString = applicationId.toString(),
                    toConcat = applicationId + "";
   
                var mobileNo = $scope.LoginMobileNo
                var flaterate = $scope.FlatRate
                var pgId = $scope.paymentGateway
                var taxId = $sessionStorage.textnID 
                    var postData = {
                       
                            "pgId":toString = pgId.toString(),
                            "addedon":"20-01-2022 13:47:00",
                            "orgId":"13",
                            "mode":"Net Banking",
                            "SuccessMessage":"Y",
                            "ownerName":$scope.loginUSername,
                            "error_Message":"",
                            "payment_source":"CCAvenue",
                            "bank_ref_num":"1642666528506",
                            "lang":"1",
                            "email":$scope.emailId,
                            "txnid":"1176",
                            "app_no_label":"Your payment has been received Successfully ,Your Application Number",
                            "amount":toString = flaterate.toString(),
                            "orgName":"Bhatapara Municipal Council",
                            "udf5":"RAF",
                            "mihpayid":"311007919621",
                            "udf3":"CitizenHome.html",
                            "net_amount_debit":toString = flaterate.toString(),
                            "udf1":"780",
                            "udf2": toString ,
                            "phone": toString = mobileNo.toString(),
                            "applicationId": toString ,
                            "productinfo":"File RTI On-line",
                            "hash":"NA",
                            "status":"fail",
                       
                           
                    }
                    $sessionStorage.postData = postData
                    console.log(JSON.stringify(postData),"Posting data of transation ")
                    $ionicLoading.show({ template: $filter('translate')('LOADING') });
                        RestService.getTransactionAfterPayment(postData).then(function (response) {
                            console.log("payment option--" + JSON.stringify(response));
                            $sessionStorage.paymentStaus = response
                            
                            if(response == !null || response == !undefined){
                                $showReceipt = true;
                                $ionicLoading.hide();
                            }else{
           
                            }
                           
                           
                            console.log('1. $scope.paymentGateway=', $scope.paymentGateway);
                           
                        }, function (err) {
                            $ionicLoading.hide();
                        })
                    }
            $scope.getTransactionAfterPayment = function (){
           
                var applicationId = $sessionStorage.applictNo,
               
                toString = applicationId.toString(),
                toConcat = applicationId + "";

            var mobileNo = $scope.LoginMobileNo
            var flaterate = $scope.FlatRate
            var pgId = $scope.paymentGateway
            var taxId = $sessionStorage.textnID 
                var postData = {
                   
                        "pgId":toString = pgId.toString(),
                        "addedon":"20-01-2022 13:47:00",
                        "orgId":"13",
                        "mode":"Net Banking",
                        "SuccessMessage":"Y",
                        "ownerName":$scope.loginUSername,
                        "error_Message":"",
                        "payment_source":"CCAvenue",
                        "bank_ref_num":"1642666528506",
                        "lang":"1",
                        "email":$scope.emailId,
                        "txnid":taxId.toString(),
                        "app_no_label":"Your payment has been received Successfully ,Your Application Number",
                        "amount":toString = flaterate.toString(),
                        "orgName":"Bhatapara Municipal Council",
                        "udf5":"RAF",
                        "mihpayid":"311007919621",
                        "udf3":"CitizenHome.html",
                        "net_amount_debit":toString = flaterate.toString(),
                        "udf1":"780",
                        "udf2": toString ,
                        "phone": toString = mobileNo.toString(),
                        "applicationId": toString ,
                        "productinfo":"File RTI On-line",
                        "hash":"NA",
                        "status":"success",
                   
                       
                }
                $sessionStorage.postData = postData
                console.log(JSON.stringify(postData),"Posting data of transation ")
                $ionicLoading.show({ template: $filter('translate')('LOADING') });
                    RestService.getTransactionAfterPayment(postData).then(function (response) {
                        console.log("payment option--" + JSON.stringify(response));
                        $sessionStorage.paymentStaus = response
                       
                        if(response == !null || response == !undefined){
                            $showReceipt = true;
                            $ionicLoading.hide();
                        }else{
       
                        }
                       
                       
                        console.log('1. $scope.paymentGateway=', $scope.paymentGateway);
                       
                    }, function (err) {
                        $ionicLoading.hide();
                    })
                }
        $scope.initialize = function() {
            this.bindEvents();
        },
        // Bind Event Listeners
        //
        // Bind any events that are required on startup. Common events are:
        // 'load', 'deviceready', 'offline', and 'online'.
        $scope.bindEvents = function() {
            document.addEventListener('deviceready', this.onDeviceReady, false);
        },
        // deviceready Event Handler
        //
        // The scope of 'this' is the event. In order to call the 'receivedEvent'
        // function, we must explicitly call 'app.receivedEvent(...);'
        $scope.onDeviceReady =  function() {
            app.addRZPEventListener();
        }

    var vm = this;
   

    var called = false

    var options = {
        description: 'Transactional Payment',
        image: 'https://i.imgur.com/3g7nmJC.png',
        currency: 'INR',
        key: "rzp_live_QjZY3oXqZFTZvg", //prod key
        // key: 'rzp_test_BXNDZx6RL88D83', // test key for uat
        amount:"1000",  
        name: $scope.loginUSername,
        prefill: {
          email: $scope.emailId,
          contact: $scope.LoginMobileNo,
          name: $scope.loginUSername
        },
        theme: {
          color: '#F37254'
        }
      };
    var successCallback = function(payment_id) {
       
        called = false
   
        $scope.getTransactionAfterPayment()
        // var payment_id = "order_IgThdNNuyeltmr"
        var cancelCallbacks = $ionicPopup.show({
            title: $filter('translate')('ALERT'),
            template: $filter('translate')('Paymnet_sucsses'),
           
            buttons: [
            {
              text: $filter('translate')('OK'),
              type: 'button button-block  customBgColor'
            }]
          });
        //$scope.getTransactionAfterPayment()
        $state.go("app.rtiReceipt")
    // if(payment_id == null || payment_id == undefined){
    //  $scope.getTransactionAfterPaymentfaild()
    //  // var payment_id = "order_IgThdNNuyeltmr"
    //  alert("Payment faild")
    //  //$scope.getTransactionAfterPayment()
    //  $state.go("app.rtiReceiptfaild")

    // }else{
    //  $scope.getTransactionAfterPayment()
    //  // var payment_id = "order_IgThdNNuyeltmr"
    //  var cancelCallbacks = $ionicPopup.show({
    //      title: $filter('translate')('ALERT'),
    //      template: $filter('translate')('PAYMENT_DONE'),
           
    //      buttons: [
    //      {
    //        text: $filter('translate')('OK'),
    //        type: 'button button-block  customBgColor'
    //      }]
    //    });
    //  //$scope.getTransactionAfterPayment()
    //  $state.go("app.rtiReceipt")
    // }
        $ionicLoading.hide();
    };
 
    var cancelCallback = function(error) {
    //  alert(error.description + ' (Error ' + error.code + ')');
      //alert(error.reason + ' (Error ' + error.code + ')');
      var cancelCallbacks = $ionicPopup.show({
        title: $filter('translate')('ALERT'),
        template: $filter('translate')('PAYMENT_CANCEL'),
       
        buttons: [
        {
          text: $filter('translate')('OK'),
          type: 'button button-block  customBgColor'
        }]
      });
      $state.go("app.rtiCancelReceipt")
      $scope.getTransactionAfterPaymentCancel()
        //$scope.getTransactionAfterPayment()
      called = false
    };
    $ionicPlatform.ready(function(){
       
        $scope.pay = function(event) {
        // cancelCallback()
       
             if (!called) {
           
          RazorpayCheckout.open(options, successCallback, cancelCallback);
           
          called = true
           
             
             
               $ionicLoading.hide();
             
         }
          }
       });
        $scope.Payment = function (value) {
           
            $scope.paymentGateway = value
            //$scope.paymentGateway = $scope.options[0].id;
       
   
   
            console.log('test****');
           
            if($sessionStorage.comeFrom == 'statusOfPayments')
            {
                    // saveLOIPaymentRequest();
                    console.log('test11****');

                    setLOIParam();

            }
            else if($sessionStorage.comeFrom == 'ApplicationPayment')
            {
                console.log('testytyuy****');

                saveAppPendingPayment();
               

            }
            else {
                console.log("twst**");          
            if ($localStorage.langNewId == "2") {
                $ionicLoading.show({ template: 'लोड हो रहा है...' });
            } else {
                $ionicLoading.show({ template: 'Loading...' });
            }
           
            RestService.savePayReq($localStorage.applicantDetails.org , $scope.userID, $localStorage.langID, $scope.emailId, $scope.loginUSername, $scope.LoginMobileNo,
                $scope.ServiceShortName,$sessionStorage.applictNo, $scope.FlatRate, $scope.paymentGateway, $sessionStorage.applictNo, "Y", "N",
                false, $scope.taxId, $scope.feesId)
                .then(function (response) {
                    if (response.status == "pending") {
                    $sessionStorage.textnID = response.txnId
                        $scope.getinsertIntoReceiptMaster();

                    //  var data_ = JSON.parse(response.payRequestMsg);
                    //  var options = {
                    //      "key": data_.key, // Enter the Key ID generated from the Dashboard
                    //      "amount": data_.amount,// Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
                    //      "currency": data_.currency,
                    //      "name": data_.name,
                    //      "description": data_.description,
                    //      "image": data_.image,
                    //      "order_id": data_.order_id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
                    //      "callback_url": data_.callback_url,
                    //      "prefill": {
                    //          "name": data_.name,
                    //          "email": data_.email,
                    //          "contact": data_.contact,
                    //      },
                    //      "notes": {
                    //          "address": data_.address,
                    //      },
                    //      "theme": {
                    //          "color": "#3399cc"
                    //      },
                    //      "handler": function (response){
                    //          alert(response.order_id);
                    //      },
                           
                    //          "modal": { escape: false, ondismiss: function(){
                    //          //window.location.replace("mobile/close");
                    //      //  window.location.reload()
                    //          window.close()
                    //          alert("HELOO")
                    //          $state.go("app.home");
                    //          console.log('Checkout form closed'); } },
                           
                    //  }

                       
                    //  $sessionStorage.response = response
                    //  console.log($sessionStorage.response.payRequestMsg.order_id)
                   
                   
                    //  document.getElementById('rzp-button').addEventListener('click', function(e) {
                    //      console.log(event,"fsfsd")
                    //   RazorpayCheckout.open(options, successCallback, cancelCallback)
                       
                    //   // window.close()
                    //   e.preventDefault();
                    //   // rzp1.addEventListener('exit', iabClose);
                    //       alert("Hello event 2 ...")
                    //   // rzp1.addEventListener('loadstop', iabClose1);
                    //       alert("Hello event 1 ...")
                    //   // function iabClose(event)
                    //         //{
                    //           //rzp1.removeEventListener('exit', iabClose);
                    //           alert("Hello event 3 ...")
                    //           e.preventDefault();
                    //           window.close()
                    //          $state.go("app.home");
                    //          e.preventDefault();
                    //      //event.preventDefault();
                    //      //H.addEventListener('exit', iabClose);
                    //      //H.addEventListener('loadstop', iabClose1);
                    //      //function iabClose(event)
                    //      //  {
                    //      //  H.removeEventListener('exit', iabClose);
                    //      //   $state.go("app.home");
                    //      //  }
                    //      //function iabClose1(event){
                    //      //  if (event.url.match("mobile/close")) {
                    //      //  H.close();
                    //      //  H.removeEventListener('loadstop', iabClose1);
                    //      //  $state.go("app.home");
                       
                           
                    //  })
                    // }
                    //  var rzp1 = new Razorpay(options);
                    //  rzp1.on('payment.failed', function (response){
                    //          alert(response.error.code);
                    //          alert(response.error.description);
                    //          alert(response.error.source);
                    //          alert(response.error.step);
                    //          alert(response.error.reason);
                    //          alert(response.error.metadata.order_id);
                    //          alert(response.error.metadata.payment_id);
                    //  });
                    //  document.getElementById('rzp-button1').onclick = function(e){
                    //      alert("Hello event 1 ...")
                    //   rzp1.open();
                    //  // window.close()
                    //      e.preventDefault();
                    //  //  rzp1.addEventListener('exit', iabClose);
                    //      alert("Hello event 2 ...")
                    //  //  rzp1.addEventListener('loadstop', iabClose1);
                    //      alert("Hello event 1 ...")
                    //  //  function iabClose(event)
                    //        //{
                    //          //rzp1.removeEventListener('exit', iabClose);
                    //          alert("Hello event 3 ...")
                    //          e.preventDefault();
                    //          e.close();
                    //         $state.go("app.home");
                    //         e.preventDefault();
                    //        }
                    //  //  function iabClose1(event){
                    //      //  if (event.url.match("mobile/close")) {
                           
                    //          // e.preventDefault();
                    //          // alert("Hello event 1 ...")
                    //          // //rzp1.removeEventListener('loadstop', iabClose1);
                    //          // alert("Hello event 1 ...")
                    //          // $state.go("app.home");
                    //          // e.preventDefault();
                    //       // }
                    //      //}
                    //  //}
       
                    }
                    else {
                        toaster.error($filter('translate')('RTIAPIERROR')/* , $filter('translate')('ERROR_OCCURED') */);
                    }
                    $ionicLoading.hide();
                }, function (err) {
                    toaster.error($filter('translate')('RTIAPIERROR')/* , $filter('translate')('ERROR_OCCURED') */);
                   
                })
        }
    }

//  $scope.Payment = function () {
//      console.log('test****');
       
//      if($sessionStorage.comeFrom == 'statusOfPayments')
//      {
//              // saveLOIPaymentRequest();
//              console.log('test11****');

//              setLOIParam();

//      }
//      else if($sessionStorage.comeFrom == 'ApplicationPayment')
//      {
//          console.log('testytyuy****');

//          saveAppPendingPayment();
           

//      }
//      else {
//          console.log("twst**");          
//      if ($localStorage.langNewId == "2") {
//          $ionicLoading.show({ template: 'लोड हो रहा है...' });
//      } else {
//          $ionicLoading.show({ template: 'Loading...' });
//      }
//      console.log('teskkkkkkt****');

//      RestService.savePayReq($localStorage.applicantDetails.org , $scope.userID, $localStorage.langID, $scope.emailId, $scope.loginUSername, $scope.LoginMobileNo,
//          $scope.ServiceShortName, $sessionStorage.applictNo, $scope.FlatRate, $scope.paymentGateway, $sessionStorage.applictNo, "Y", "N",
//          false, $scope.taxId, $scope.feesId)
//          .then(function (response) {
//              if (response.status == "pending") {
//                  $ionicLoading.hide();
//                  var H = null;
//                  var data_ = JSON.parse(response.payRequestMsg);
//                  var options = {
//                      "key": data_.key, // Enter the Key ID generated from the Dashboard
//                      "amount": data_.amount,// Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
//                      "currency": data_.currency,
//                      "name": data_.name,
//                      "description": data_.description,
//                      "image": data_.image,
//                      "order_id": data_.order_id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
//                      "callback_url": data_.callback_url,
//                      "prefill": {
//                          "name": data_.name,
//                          "email": data_.email,
//                          "contact": data_.contact,
//                      },
//                      "notes": {
//                          "address": data_.address,
//                      },
//                      "theme": {
//                          "color": "#3399cc"
//                      }
//                  }
//                  console.log('data_.callback_url', data_.callback_url);
//                  console.log(options)
//                  // `ng-click` is triggered twice on ionic. (See https://github.com/driftyco/ionic/issues/1022).
//                  // This is a dirty flag to hack around it
//                  var called = false;



//                  window.addEventListener('loadstop', function(event) {
//                      console.log('response11', response);
//                      console.log('event11', event)
//                      var param = getParameters(event.url); //Read the parameters from the url
                     
                     
//                      if (isCorrectParameters(param)) { //Check parameters agaist the payment gateway response url
//                          window.close(); // colse the browser
//                          $state.go("app.home");
//                          console.log('broser close 1')
//                        //Handle the success and failed scenarios
//                        if(success){
//                          //$state.go('test');
//                          console.log('broser close 2')
//                        }else{
//                          // handle fail scenario
//                          console.log('broser close 3')
//                        }
//                      }
//                    });

//                  var successCallback = function (payment_id) {
                   
//                      alert('payment_id: ' + payment_id);
//                      called = false
//                  };

//                  var cancelCallback = function (error) {
//                      // alert(error.description + ' (Error ' + error.code + ')');
//                      called = false;
//                      var cancelCallbacks = $ionicPopup.show({
//                          title: $filter('translate')('ALERT'),
//                          template: $filter('translate')('SOMETHINGWENTRONG'),
                           
//                          buttons: [
//                          {
//                            text: $filter('translate')('OK'),
//                            type: 'button button-block  customBgColor'
//                          }]
//                        });
//                  }          
//                  H = RazorpayCheckout.open(options, successCallback, cancelCallback);

//                  // RazorpayCheckout.on('payment.success', successCallback);
//                  // RazorpayCheckout.on('payment.cancel', cancelCallback);
//                  // RazorpayCheckout.open(options);

//                  called = true;
//                  // H = window.open(encodeURI(response.payRequestMsg), '_blank',
//                  console.log('hh', data_.callback_url);
//                  console.log('hhh', encodeURI(data_.callback_url));
//                  //H = window.open(encodeURI(data_.callback_url), '_blank',
                   
//                      //'location=no,closebuttoncaption=Back,hardwareback=yes,fullscreen=yes,zoom=yes,toolbarposition=top,enableviewportscale=yes');
//                  H.addEventListener('exit', iabClose);
//                  H.addEventListener('loadstop', iabClose1);
//                  function iabClose(event) {
//                      H.removeEventListener('exit', iabClose);
//                      $state.go("app.home");
//                  }
//                  function iabClose1(event) {
//                      //if (event.url.match("mobile/close")) {
//                          H.close();
//                          H.removeEventListener('loadstop', iabClose1);
//                          $state.go("app.home");
//                  //  }
//                  }
//              }
//              else {
//                  toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR_OCCURED'));
//              }
//              $ionicLoading.hide();
//          }, function (err) {
//              toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR_OCCURED'));
//              $ionicLoading.hide();
//          })
//  }
// }

var saveAppPendingPayment = function () {

    RestService.getPayPendingDataByONLTransId('[' +$sessionStorage.taxId+']').then(function (response){
        console.log("getPayPendingDataByONLTransId--"+response);
        var pendingdappata = JSON.stringify(response);
        var pendingdappataj = JSON.parse(pendingdappata);
        console.log("6**");
        if(pendingdappata==undefined || pendingdappata == null || pendingdappata=="")
          {
            console.log("7**");
            $ionicLoading.hide();
            return false;
          }
        else if(pendingdappata.length>0)
          {
            console.log("1**");
            // $scope.FlatRate = pendingdappataj.amount;
            setAppPendingPaymentParam(pendingdappataj);                
            console.log("2**");
         
          }
          console.log("8**");
        $ionicLoading.hide();
      },function (err) {
        toaster.error($filter('translate')('RTIAPIERROR')/* , $filter('translate')('ERROR') */);
        $ionicLoading.hide();
})
   
}


    var saveLOIPaymentRequest =function (param) {

        if ($localStorage.langNewId == "2") {
            $ionicLoading.show({ template: 'लोड हो रहा है...' });
        } else {
            $ionicLoading.show({ template: 'Loading...' });
        }
        // RestService.loisavePayReq($sessionStorage.loiParam)
        RestService.loisavePayReq(param)
            .then(function (response) {
                $ionicLoading.hide();
                // $scope.payNowPayment(response);
   
            console.log("FINAL RES",response)

           
            var H = null;
            var data_ = JSON.parse(response.payRequestMsg);
            var options = {
                "key": data_.key, // Enter the Key ID generated from the Dashboard
                "amount": data_.amount,// Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
                "currency": data_.currency,
                "name": data_.name,
                "description": data_.description,
                "image": data_.image,
                "order_id": data_.order_id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
                "callback_url": data_.callback_url,
                "prefill": {
                    "name": data_.name,
                    "email": data_.email,
                    "contact": data_.contact,
                },
                "notes": {
                    "address": data_.address,
                },
                "theme": {
                    "color": "#3399cc"
                }
            }
            console.log(options)
           
            var called = false

            var successCallback = function (payment_id) {
           
                alert('payment_id: ' + payment_id);
                called = false
            };

            var cancelCallback = function (error) {
                // alert(error.description + ' (Error ' + error.code + ')');
                called = false;
                var cancelCallbacks = $ionicPopup.show({
                    title: $filter('translate')('ALERT'),
                    template: $filter('translate')('SOMETHINGWENTRONG'),
                   
                    buttons: [
                    {
                      text: $filter('translate')('OK'),
                      type: 'button button-block  customBgColor'
                    }]
                  });
            }          
            RazorpayCheckout.open(options, successCallback, cancelCallback);

       
            called = true;
       
   
        $ionicLoading.hide();
    }, function (err) {
        toaster.error($filter('translate')('RTIAPIERROR')/* , $filter('translate')('ERROR_OCCURED') */);
        $ionicLoading.hide();
    })      

    }
   
    $scope.payNowPayment =function (response) {

        let payRequest={
            "serviceId": response.serviceId,
            "applicationId": response.applicationId,
            "applicantName": response.applicantName,
            "dueAmt": response.dueAmt,
            "mobNo": response.mobNo,
            "email": response.email,
            "serviceName": response.serviceName,
            "udf1": response.udf1,
            "udf2": response.udf2,
            "udf3": response.udf3,
            "udf4": null,
            "udf5": response.udf5,
            "udf6": null,
            "udf7": response.udf7,
            "udf8": null,
            "udf9": null,
            "udf10": response.udf10,
            "errors": null,
            "finalAmount": response.finalAmount,//"b4cbkiinMqhYkXUYEawmuQ"
            "validateAmount": response.validateAmount,
            "key": null,
            "txnid": response.txnid,
            "salt": null,
            "bankId": response.bankId,
            "hash": null,
            "controlUrl": response.controlUrl,
            "pgUrl": null,
            "successUrl": response.successUrl,
            "failUrl": response.failUrl,
            "cancelUrl": response.cancelUrl,
            "errorCause": null,
            "onlineBankList": response.onlineBankList,
            "orgId": response.orgId,
            "empId": response.empId,
            "payRequestMsg": null,
            "pgName": null,
            "merchantId": null,
            "schemeCode": null,
            "production": null,
            "requestType": null,
            "chargeFlag": response.chargeFlag,
            "recieptDTO": response.recieptDTO,
            "payModeorType": response.payModeorType,
            "challanServiceType": response.challanServiceType,
            "documentUploaded": response.documentUploaded,
            "feeIds":'{"28"=665,"88"=167}',
            "orderId": null,
            "trnCurrency": null,
            "trnRemarks": null,
            "recurrPeriod": null,
            "recurrDay": null,
            "noOfRecurring": null,
            "responseUrl": null,
            "addField1": null,
            "addField2": null,
            "addField3": null,
            "addField4": null,
            "addField5": null,
            "addField6": null,
            "addField7": null,
            "addField8": null,
            "serviceID": null,
            "fundID": null,
            "checksumKey": null,
            "enableChildWindowPosting": false,
            "enablePaymentRetry": false,
            "retryAttemptCount": 0,
            "txtPayCategory": null,
            "securityId": null,
            "typeField1": null,
            "typeField2": null,
            "typeField3": null
        }
        console.log("FINAL REQUESt",payRequest)

        if ($localStorage.langNewId == "2") {
            $ionicLoading.show({ template: 'लोड हो रहा है...' });
        } else {
            $ionicLoading.show({ template: 'Loading...' });
        }
        RestService.loiTransactionBeforePayment(payRequest)
        .then(function (response) {
            console.log("FINAL RES",response)

            $ionicLoading.hide();
            var H = null;
            var data_ = JSON.parse(response.payRequestMsg);
            var options = {
                "key": data_.key, // Enter the Key ID generated from the Dashboard
                "amount": data_.amount,// Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
                "currency": data_.currency,
                "name": data_.name,
                "description": data_.description,
                "image": data_.image,
                "order_id": data_.order_id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
                "callback_url": data_.callback_url,
                "prefill": {
                    "name": data_.name,
                    "email": data_.email,
                    "contact": data_.contact,
                },
                "notes": {
                    "address": data_.address,
                },
                "theme": {
                    "color": "#3399cc"
                }
            }
            console.log(options)
            // `ng-click` is triggered twice on ionic. (See https://github.com/driftyco/ionic/issues/1022).
            // This is a dirty flag to hack around it
            var called = false

            var successCallback = function (payment_id) {
           
                alert('payment_id: ' + payment_id);
                called = false
            };

            var cancelCallback = function (error) {
                // alert(error.description + ' (Error ' + error.code + ')');
                called = false;
                var cancelCallbacks = $ionicPopup.show({
                    title: $filter('translate')('ALERT'),
                    template: $filter('translate')('SOMETHINGWENTRONG'),
                   
                    buttons: [
                    {
                      text: $filter('translate')('OK'),
                      type: 'button button-block  customBgColor'
                    }]
                  });
            }          
            RazorpayCheckout.open(options, successCallback, cancelCallback);

       
            called = true;
       
   
        $ionicLoading.hide();
    }, function (err) {
        toaster.error($filter('translate')('RTIAPIERROR')/* , $filter('translate')('ERROR_OCCURED') */);
        $ionicLoading.hide();
    })
}


        var init = function () {
           
            $localStorage.langID = "1";
            $ionicLoading.show({ template: $filter('translate')('LOADING') });
            RestService.getPayOpt($scope.ORG_ID, $scope.userID, $localStorage.langID).then(function (response) {
                console.log("payment option--" + JSON.stringify(response));
                $scope.options = new Array();
                for (var i = 0; i < response.list.length; i++) {
                    $scope.options.push({
                        id: response.list[i].bankId,
                        name: response.list[i].cbbankname
                    })
                }
                console.log('1. $scope.paymentGateway=', $scope.paymentGateway);
            //  $scope.paymentGateway = $scope.options[0].id;
                console.log('1. $scope.paymentGateway=', $scope.paymentGateway);
                $ionicLoading.hide();
            }, function (err) {
                $ionicLoading.hide();
            })


            var lookUpCode = "PAY";
            RestService.getNHPrefixData(lookUpCode, $scope.orgid).then(function (responseCAA) {
              console.log("responseCAA==" + JSON.stringify(responseCAA));
              if (responseCAA == undefined || responseCAA == null || responseCAA == "") {
                return false;
              }
              else {
                console.log("$sessionStorage.lookUpCodeAPL--" + $sessionStorage.lookUpCodeAPL);
                $sessionStorage.perfixchargeApplicableAt = responseCAA[6].lookUpId
                console.log($sessionStorage.perfixchargeApplicableAt,"Lookup code.....")
                // for (var i = 0; i < responseCAA.length; i++)
                //   if (responseCAA[i].lookUpCode == $sessionStorage.lookUpCodeAPL) {
                //  $sessionStorage.perfixchargeApplicableAt = responseCAA[i].lookUpId;
                //  // $state.go("app.COuploaddoc");
                //  $ionicLoading.hide();
                //   }
                $ionicLoading.hide();
              }
            }, function (err) {
              //                    toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR_OCCURED'));
              $ionicLoading.hide();
            })
        }
        init();



    }) /*controler ends*/

