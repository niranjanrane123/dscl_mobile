angular.module('starter')

  .controller('ApplicationPaymentStatusPageCtrl', function ($scope,$sessionStorage,$ionicPopup, $location, RestService, $ionicLoading, $stateParams, toaster,
		  $filter, ENV, dateFilter, $state,$ionicSideMenuDelegate,$rootScope,$localStorage) {
    
     $scope.getPaymentDashBoardData=[];
     $scope.getPaymentDashBoardDataPage=[];
     $scope.PaymenttotalPagination=0;
     $scope.PaymentcurrentPagination=0;
     $scope.PaymentcurrentPaginationArray=[];
     $scope.Paymentmysearch='';
    //  $scope.langID=$localStorage.langID;
     $scope.langID=$localStorage.langNewId;
     $scope.LoginMobileNo = $localStorage.responselogindata.mobileNo;
     $scope.orgid = $localStorage.selectedorgID;
     $scope.userID = $localStorage.responselogindata.userId;
     $scope.userName = $localStorage.responselogindata.firstName + 
     ''+ $localStorage.responselogindata.middleName + ''+ $localStorage.responselogindata.lastName;

// LOI to be paid



$scope.getLOIData=[];
     $scope.getLOIDataPage=[];
     $scope.LOItotalPagination=0;
     $scope.LOIcurrentPagination=0;
     $scope.LOIcurrentPaginationArray=[];
     $scope.LOImysearch='';
        
     $scope.showApplication = 'true';
    //  $scope.viewLOI = 'false';
    //$scope.viewAppl = 'true';
    console.log("Colour",$scope.viewLOI,$scope.viewAppl)

    $scope.showTab = function(showTab) {
      if (showTab == 'true') {
        $scope.viewLOI = false;
        $scope.viewAppl = true;
      } else if(showTab == 'false'){
        $scope.viewLOI = true;
        $scope.viewAppl = false;
      }
      $scope.showApplication = showTab;
    }


    $scope.getLOIPageData=function(page,option)
   {
    if(option=='fix')
      $scope.pagginationSelect1=page;

    $scope.PaymentcurrentPagination=page;
    var minD=page*8,maxD=minD+8;
    $scope.getLOIDataPage=[];
    $scope.getLOIData.forEach((entry,index)=>{
      if(index>=minD && index<=maxD)
      $scope.getLOIDataPage.push(entry);
    });
   }

   $scope.getLOIDataFun=function (){
    if($localStorage.langID == "2"){
      $ionicLoading.show({ template: 'लोड हो रहा है...'    });
    }else{
      $ionicLoading.show({ template: 'Loading...'    });
    }

      RestService.getLOIData([$scope.orgid,$scope.userID,$scope.LoginMobileNo]).then(function (response){
                console.log("deptresponse--"+response);
                if(response==undefined || response == null || response=="")
                  {
                    $ionicLoading.hide();
                    return false;
                  }
                else if(response.length>0)
                  {
                   $scope.getLOIData=response;
                   $scope.LOItotalPagination=parseInt($scope.getLOIData.length/8);
                   if($scope.LOItotalPagination*8 != $scope.getLOIData.length)
                    $scope.LOItotalPagination=$scope.LOItotalPagination+1;

                   
                    $scope.getLOIPageData(0);
                 
                   for(var i=0;i<$scope.LOItotalPagination;i++)
                    $scope.LOIcurrentPaginationArray.push(i);
                  }
                $ionicLoading.hide();
              },function (err) {
                toaster.error($filter('translate')('STATUSOFPAYMENTERROR')/* , $filter('translate')('ERROR') */);
                $ionicLoading.hide();
        })
   }

   $scope.viewHistory=function(data)
   {
      $sessionStorage.applicationHistoryId=data.appId;
      $state.go('app.applicationHistory');
   }
   $scope.viewApplication=function(data)
   {

       if(data.serviceName=="Complaint Registration")
       {
          $ionicLoading.show({ template: $filter('translate')('LOADING')  });
          RestService.getGrievanceStatus(data.appId,$localStorage.langID).then(function (complaintstatusresponse) {
            if(complaintstatusresponse == "" || complaintstatusresponse == undefined)
            {
               toaster.error( $filter('translate')('VALIDTOKEN'));
                     $ionicLoading.hide();
            }else{
                $sessionStorage.complaintstatusresponse = complaintstatusresponse;
                $sessionStorage.complaintstatusresponseHome=true;
                $state.go("app.compstatusdetail");
            }
              $ionicLoading.hide();
            },
          function (err){
            $ionicLoading.hide();
            toaster.error($filter('translate')('STATUSOFPAYMENTERROR')/* , $filter('translate')('ERROR') */);
          })
       }
      else if(data.serviceName=="File RTI On-line")
       {
        $ionicLoading.show({ template: $filter('translate')('LOADING')  });
          RestService.fetchInformationByApplicationid(data.appId,$scope.orgid).then(function (complaintstatusresponse) {
            if(complaintstatusresponse == "" || complaintstatusresponse == undefined)
            {
               toaster.error( $filter('translate')('VALIDTOKEN'));
                     $ionicLoading.hide();
            }else{
                $sessionStorage.rtistatusresponse = complaintstatusresponse;
                $state.go("app.rtiapplicationHistory");
            }
              $ionicLoading.hide();
            },
          function (err){
            $ionicLoading.hide();
            toaster.error($filter('translate')('STATUSOFPAYMENTERROR')/* , $filter('translate')('ERROR') */);
          })
       }
    }
    $scope.getNumber = function(num) {
      return new Array(num);   
    } 
    
    
// Application Pending Payment


$scope.getPaymentDashBoardDataPageData=function(page,option)
{
 if(option=='fix')
   $scope.pagginationSelect1=page;

 $scope.PaymentcurrentPagination=page;
 var minD=page*8,maxD=minD+8;
 $scope.getPaymentDashBoardDataPage=[];
 $scope.getPaymentDashBoardData.forEach((entry,index)=>{
   if(index>=minD && index<=maxD)
   $scope.getPaymentDashBoardDataPage.push(entry);
 });
}

$scope.getPaymentDashBoardDataFun=function (){
  if($localStorage.langID == "2"){
    $ionicLoading.show({ template: 'लोड हो रहा है...'    });
  }else{
    $ionicLoading.show({ template: 'Loading...'    });
  }

   RestService.getPayPendingDashBoardData([$scope.LoginMobileNo,$scope.orgid]).then(function (response){
             console.log("deptresponse--"+response);
             if(response==undefined || response == null || response=="")
               {
                 $ionicLoading.hide();
                 return false;
               }
             else if(response.length>0)
               {
                $scope.getPaymentDashBoardData=response;
                $scope.PaymenttotalPagination=parseInt($scope.getPaymentDashBoardData.length/8);
                if($scope.PaymenttotalPagination*8 != $scope.getPaymentDashBoardData.length)
                 $scope.PaymenttotalPagination=$scope.PaymenttotalPagination+1;

                
                 $scope.getPaymentDashBoardDataPageData(0);
              
                for(var i=0;i<$scope.PaymenttotalPagination;i++)
                 $scope.PaymentcurrentPaginationArray.push(i);
               }
             $ionicLoading.hide();
           },function (err) {
             toaster.error($filter('translate')('STATUSOFPAYMENTERROR')/* , $filter('translate')('ERROR') */);
             $ionicLoading.hide();
     })
}



// Payment page 

$scope.Payment = function (rowData, title, type) {

  var alertPopup = $ionicPopup.alert({
    title: $filter('translate')(title),
    template: $filter('translate')('DOYOUWANTTOPAY'),
      buttons : [{
         text : $filter('translate')('PROCEEDFORPAYMENT'),
         type : 'button button-block  customBgColor',
         onTap : function(){


         
            if(type == 'loi')
             {

              $sessionStorage.comeFrom = 'statusOfPayments';

            $sessionStorage.applictNo = rowData.loiApplicationId;
            $sessionStorage.serviceName = rowData.serviceName;
            $sessionStorage.amount = rowData.loiAmount;
            $sessionStorage.orgId = rowData.orgid;
             
            

            var params={

              "serviceId":null,
              "applicantName":null,
              "applicationId": rowData.loiApplicationId,
              "loiNo":null,
              "loiDate":null,
              "loiAmount":null,
              "orgId":rowData.orgid,
              "serviceName":null,
              "applicationDate":null,
              "email":null,
              "mobileNo": $scope.LoginMobileNo,
              "loiMasData":null,
              "loiCharges":null,
              "chargeDesc":{},
              "total":0.0,
              "referenceNo":null,
              "address":null,
              "empId":$scope.userID,
              "deptId":null
            };
          

            RestService.getLOIDetails(params).then(function (response){
              console.log("Loiresponse--"+response);
              var loidata = JSON.stringify(response);
              var loidataj = JSON.parse(loidata);
              console.log("6**");
              if(loidata==undefined || loidata == null || loidata=="")
                {
                  console.log("7**");
                  $ionicLoading.hide();
                  return false;
                }
              else if(loidata.length>0)
                {
                  console.log("1**");

                  setLOIParams(loidataj);
                  console.log("2**");
                
                }
                console.log("8**");
              $ionicLoading.hide();
            },function (err) {
              toaster.error($filter('translate')('STATUSOFPAYMENTERROR')/* , $filter('translate')('ERROR') */);
              $ionicLoading.hide();
      })

    }
          else if(type == 'application')
          {
            RestService.getPayPendingDataByONLTransId('['+rowData.onlTransactionId+']').then(function (response){
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
                  setAppPendingPaymentParam(pendingdappataj);
                   // console.log("9**");
          $sessionStorage.applictNo = rowData.refId;
          $sessionStorage.serviceName = rowData.serviceName;
          $sessionStorage.amount = pendingdappataj.amount;
          $sessionStorage.orgId = rowData.orgId;
          $sessionStorage.taxId = rowData.onlTransactionId;
          $sessionStorage.comeFrom = 'ApplicationPayment';
 
          $state.go("app.RtiPay"); 
                 
                  console.log("2**");
                
                }
                console.log("8**");
              $ionicLoading.hide();
            },function (err) {
              toaster.error($filter('translate')('STATUSOFPAYMENTERROR')/* , $filter('translate')('ERROR') */);
              $ionicLoading.hide();
      })



         
         



          }
         // console.log('$sessionStorage.applictNo', $sessionStorage.applictNo);
           // console.log('$sessionStorage.responseservicechargedata.responseObj[0].chargeAmount);
  
            // organization 2 and individual 10
         }
      }]
  });

  
}


var setAppPendingPaymentParam = function (rowData,payData)
{
    console.log("app pending row data=", rowData);
var param = {
  // "applicantName": "Pooja M   M",   --Applicant Name
	// "dueAmt": 44652,  --Due Amount
	// "mobileNo": "9764673834", ---Mobile no
	// "email": "pooja.maske@abmindia.com", email Id
	// "udf1": "780", --service Id
	// "udf2": "1321082000001", Application No
	// "bankId":9, -Payment GateWay Id what you select
	// "udf3": "CitizenHome.html", URL
	// "udf4": null,
	// "udf5": "RTI", ---Department Short Code
	// "udf6": null,
	// "udf7": "1321082000001", ---ApplicationId
	// "referenceId":"1321082000001",---ApplicationId
	// "serviceShortName":"RAF",--Service ShortCCOde
	// "txnId": null,
	// "orgId": 13, --Organisation Id
	// "userId": 782, --Employee Id
	// "langId":1, --Language Id
	// "documentUploaded": false,
  // "feeIds": {"2097":100}

// $sessionStorage.applictNo = rowData.refId;
          // $sessionStorage.serviceName = rowData.serviceName;
          // $sessionStorage.amount = 10.0;
          // $sessionStorage.orgId = rowData.orgId;
          // $sessionStorage.taxId = rowData.onlTransactionId;
          // $sessionStorage.comeFrom = 'ApplicationPayment';

    //       $scope.LoginMobileNo = $localStorage.responselogindata.mobileNo;
    //  $scope.orgid = $localStorage.selectedorgID;
    //  $scope.userID = $localStorage.responselogindata.userId;
 
  // "applicantName": $scope.userName,  
	// "dueAmt": 10.0,  
	// "mobileNo": $scope.LoginMobileNo , 
	// "email": $localStorage.responselogindata.emailId,
	// "udf1": payData.serviceId,
  // "udf2": rowData.refId, 
	// "bankId":9, 
	// "udf3": "CitizenHome.html", URL
	// "udf4": null,
	// "udf5": "RTI", ---Department Short Code
	// "udf6": null,
	// "udf7": "1321082000001", ---ApplicationId
	// "referenceId":"1321082000001",---ApplicationId
	// "serviceShortName":"RAF",--Service ShortCCOde
	// "txnId": null,
	// "orgId": 13, --Organisation Id
	// "userId": 782, --Employee Id
	// "langId":1, --Language Id
	// "documentUploaded": false,
	// "feeIds": {"2097":100}

}

}


 var setLOIParams = function (rowData) {

  console.log("3**");
//   let newSt = JSON.stringify(rowData.loiCharges)
// let fees = newSt.replace(/:/g, '=');
// console.log("fees==", fees);
  $sessionStorage.applictNo = rowData.applicationId;
  $sessionStorage.serviceName = rowData.serviceName;
  $sessionStorage.amount = rowData.loiMasData.loiAmount;
  $sessionStorage.orgId = rowData.loiMasData.orgid;
  $sessionStorage.serviceId = rowData.loiMasData.loiServiceId;
  $sessionStorage.fees = rowData.loiCharges;
  
  console.log("4**");
  console.log("rowdata==",rowData);
  $state.go("app.RtiPay"); 

 }
  
  // var params={

  //   "serviceId":rowData.loiMasData.loiServiceId,
  //   "applicationId":rowData.applicationId,
  //   "applicantName":rowData.applicantName,
  //   "dueAmt": $sessionStorage.amount,
  //   "mobNo":rowData.mobileNo,
  //   "email":rowData.email,
  //   "serviceName":rowData.serviceName,
  //   "udf1":rowData.loiMasData.loiServiceId,
  //   "udf2":rowData.applicationId,
  //   "udf3":"CitizenHome.html",
  //   "udf4":null,
  //   "udf5":"ML",
  //   "udf6":null,
  //   "udf7":rowData.applicationId,
  //   "udf8":null,
  //   "udf9":null,
  //   "udf10":rowData.deptId,
  //   "errors":null,
  //   "finalAmount":null,
  //   "validateAmount": $sessionStorage.amount,
  //   "key":null,
  //   "txnid":null,
  //   "salt":null,
  //   "bankId":null,
  //   "hash":null,
  //   "controlUrl":RestService.cxfServiceUrl+"rest/commonPaymentController/savePaymentRequest",
  //   "pgUrl":null,
  //   "successUrl":RestService.eipURL+"/PendingLoiForm.html?payuSuccess",
  //   "failUrl":RestService.eipURL+"/PendingLoiForm.html?failPayU",
  //   "cancelUrl":RestService.eipURL+"/PendingLoiForm.html?cancelPayU",
  //   "errorCause":null,
  //   "onlineBankList":null,
  //   "orgId":rowData.loiMasData.orgid,
  //   "empId":rowData.empId,
  //   "payRequestMsg":null,
  //   "pgName":null,
  //   "merchantId":null,
  //   "schemeCode":null,
  //   "production":null,
  //   "requestType":null,
  //   "chargeFlag":null,
  //   "recieptDTO":null,
  //   "payModeorType":null,
  //   "challanServiceType":"N",
  //   "documentUploaded":"N",
  //   "feeIds":fees,
  //   "orderId":null,
  //   "trnCurrency":null,
  //   "trnRemarks":null,
  //   "recurrPeriod":null,
  //   "recurrDay":null,
  //   "noOfRecurring":null,
  //   "responseUrl":null,
  //   "addField1":null,
  //   "addField2":null,
  //   "addField3":null,
  //   "addField4":null,
  //   "addField5":null,
  //   "addField6":null,
  //   "addField7":null,
  //   "addField8":null,
  //   "serviceID":null,
  //   "fundID":null,
  //   "checksumKey":null,
  //   "enableChildWindowPosting":false,
  //   "enablePaymentRetry":false,
  //   "retryAttemptCount":0,
  //   "txtPayCategory":null,
  //   "securityId":null,
  //   "typeField1":null,
  //   "typeField2":null,
  //   "typeField3":null
  // }
  // console.log("5**");
  
  // $sessionStorage.loiParam = params;  
  // $state.go("app.RtiPay"); 
  // console.log("6**");
// }



    var _init = function () {
      $ionicLoading.show({template:'<ion-spinner class="spinner-energized" icon="circles"></ion-spinner>'});
       $scope.getPaymentDashBoardDataFun();   
       $scope.getLOIDataFun();

       $scope.viewAppl = true;
       $scope.viewLOI = false;
    };
   _init();

})