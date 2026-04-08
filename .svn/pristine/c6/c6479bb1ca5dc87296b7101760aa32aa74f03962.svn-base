angular.module('starter')

 .controller('rticancelReceiptctrl', function ($scope, RestService, $ionicLoading, $stateParams,
		  toaster, $filter, ENV, $state, $localStorage,$sessionStorage,$ionicHistory) {

	 console.log("$localStorage.responselogindata---"+JSON.stringify($localStorage.responselogindata));
//		$scope.orgid = $localStorage.responselogindata.orgId;
		$scope.orgid = $localStorage.selectedorgID;
    $scope.userID = $localStorage.responselogindata.userId;
    $scope.loginUSername = $localStorage.responselogindata.firstName;
    $scope.LoginMobileNo = $localStorage.responselogindata.mobileNo;
    $scope.serviceName = "";
    $scope.applicant_nam = "";
    $scope.contact_number = "";
    $scope.email_id = "";
    $scope.payment_amount = 0;
    $scope.order_number = 0;
    $scope.transaction_reference_number = 0
    $scope.labelName = "";
    $scope.status = ""
    $scope.cancelPayment = false;
		var fullName = $scope.loginUSername;


		console.log("complaintresponse on reciptpage--"+JSON.stringify($sessionStorage.complaintresponse));
    	$scope.getTransactionAfterPaymentCancel = function (){
       
			
      var applicationId = $sessionStorage.applictNo,
       
      toString = applicationId.toString(),
      toConcat = applicationId + "";

    var mobileNo = $scope.LoginMobileNo
    var flaterate = $scope.FlatRate
    var pgId = $sessionStorage.paymentgatway
    var taxId = $sessionStorage.textnID
   
      console.log(JSON.stringify($sessionStorage.postData),"Posting data of transation ")
      $ionicLoading.show({ template: $filter('translate')('LOADING') });
        RestService.getTransactionAfterPayment($sessionStorage.postData).then(function (response) {
          console.log("payment option--" + JSON.stringify(response));
          $sessionStorage.paymentStaus = response
          //  alert("You lose!");
            $scope.service_information = response.sendProductinfo;
            $scope.applicant_name =  response.sendFirstname;
            $scope.contact_number = response.sendPhone;
            $scope.email_id = response.sendEmail;
            $scope.payment_amount = response.recvNetAmountDebit;
            $scope.order_number = response.recvMihpayid;
            $scope.transaction_reference_number = response.referenceId;
            $scope.transaction_date_time =  response.referenceDate
           // $scope.labelName = response.labelName;
            $scope.status = response.recvStatus;
            $ionicLoading.hide();
          
          console.log('1. $scope.paymentGateway=', $scope.paymentGateway);
          
        }, function (err) {
          $ionicLoading.hide();
        })
      }
    // $scope.getPayStatus = function (){
    //   $ionicLoading.show({ template: $filter('translate')('LOADING') });
    //     RestService.getPaymenystatus($sessionStorage.applictNo).then(function (response) {
    //       console.log("payment option--" + JSON.stringify(response));
    //       $sessionStorage.paymentStaus = response
    //       $ionicLoading.hide();
         
    //         //$showReceipt = true;
    //         $scope.service_information = response.service_information;
    //         $scope.applicant_name =  response.applicant_name;
    //         $scope.contact_number = response.contact_number;
    //         $scope.email_id = response.email_id;
    //         $scope.payment_amount = response.payment_amount;
    //         $scope.order_number = response.order_number;
    //         $scope.transaction_reference_number = response.transaction_reference_number;
    //         $scope.transaction_date_time =  response.transaction_date_time
    //         $scope.labelName = response.labelName;
    //         $scope.status = response.transaction_status;

    //        // $ionicLoading.hide();
         
          
          
    //       console.log('1. $scope.paymentGateway=', $scope.paymentGateway);
          
    //     }, function (err) {
    //       $ionicLoading.hide();
    //     })
    //   }
      $scope.reportImage;
      $scope.canvas;

      $scope.takeScreenShot = function() {
        $ionicLoading.show({	template: $filter('translate')('LOADING')	});
            html2canvas(document.getElementById("target"), {
                onrendered: function (canvas) {
                $scope.canvas = canvas;
                $scope.reportImage = canvas.toDataURL();
                console.log("$scope.reportImage--"+$scope.reportImage);
                window.plugins.socialsharing.share(null,'Receipt',$scope.reportImage, null)
                },
                height: 450,
                allowTaint:true,
               useCORS: true
            });
            // shareReceipt();
            $ionicLoading.hide();
        }
$scope.reportImage;
$scope.canvas;



 $scope.homepage = function()
 {
  
  $state.go("app.home");
 }

    var _init = function (){ 
    //  $scope.getPayStatus()
       
   
  	$scope.getTransactionAfterPaymentCancel()  
           
           }
     
    _init();
  });
