angular.module('starter')
  .controller('billpayPageCtrl', function ($scope, RestService, $ionicLoading, $stateParams, toaster, $filter,
		  ENV, $state, $localStorage, localStorageService,$sessionStorage) {

	$scope.search = '';
	$scope.data_ = {};
	$scope.totalPayableAmount;
	$scope.CSidn;
	$scope.Rebate;

//	var logindata = $localStorage.responselogindata;
	console.log("$localStorage.responselogindata---"+JSON.stringify($localStorage.responselogindata));
//	$scope.orgid = $localStorage.responselogindata.orgId;
	$scope.orgid = $localStorage.selectedorgID;
	$scope.userID = $localStorage.responselogindata.userId;
	$scope.loginUSername = $localStorage.responselogindata.firstName;
	$scope.LoginMobileNo = $localStorage.responselogindata.mobileNo;
//	$scope.emailId = $localStorage.responselogindata.emailId;
  $scope.emailId = $localStorage.responselogindata.emailId;
	$scope.ServiceShortName = "WNC";
	$scope.payingAmount;
	$scope.paymentGateway;

	/*function start */
  console.log("water bill response"+JSON.stringify($sessionStorage.waterbillresponse))
	$scope.loginfname = $sessionStorage.waterbillresponse.applicantDto.applicantFirstName;
	$scope.loginMname = $sessionStorage.waterbillresponse.applicantDto.applicantMiddleName;
  $scope.loginlname = $sessionStorage.waterbillresponse.applicantDto.applicantLastName;

  if($scope.loginMname == null){$scope.loginMname = ''}
  if($scope.loginlname == null){$scope.loginlname = ''}
  $scope.fullName = $scope.loginfname.concat(" " +$scope.loginMname + " " +$scope.loginlname);

  $scope.applicationNumber = $sessionStorage.waterbillresponse.applicationNumber;
  $scope.mobileNo = $sessionStorage.waterbillresponse.applicantDto.mobileNo;
  $scope.emailId = $sessionStorage.waterbillresponse.applicantDto.emailId;

	$scope.totalPayableAmount = $sessionStorage.waterbillresponse.totalPayableAmount;

	if($scope.totalPayableAmount == 0)
		{

			$scope.table1 = false;
			$scope.table2 = false;
			$scope.amtzero = true;
		}else{
			$scope.table1 = true;
			$scope.table2 = false;
			$scope.amtzero = false;
		}

	$scope.CSidn = $sessionStorage.waterbillresponse.csIdn;
//	$scope.Rebate = $sessionStorage.waterbillresponse.rebate;
	$scope.Rebate = $sessionStorage.waterbillresponse.rebateAmount;
	$scope.applictNo = $sessionStorage.waterbillresponse.applicationNumber;
  $scope.rebateAmount = $sessionStorage.waterbillresponse.rebateAmount;
	$sessionStorage.taxes = $sessionStorage.waterbillresponse.taxes;
	$scope.taxes = $sessionStorage.taxes;
	$scope.docsitems = [];
	var counter = 1;
  if($scope.applictNo == null || $scope.applictNo == 0){
    $scope.applictNo = $sessionStorage.connNo;
  }
	var taxtable = "";
	for (var i = 0; i < $scope.taxes.length; i++) {
		var taxdata = {
				taxdesc : $scope.taxes[i].taxdescription,
				arrear : $scope.taxes[i].arrearTaxAmount,
				taxamt : $scope.taxes[i].taxAmount,
				total : $scope.taxes[i].total
		}
		$scope.docsitems.push(taxdata);
	}


    $scope.billpaymentsave = function()
    {
        $ionicLoading.show({	template: $filter('translate')('LOADING')		});
        RestService.watersavebillpayment($scope.CSidn,$scope.orgid,$scope.userID,$scope.Rebate,
          $scope.data_.payingAmount,$scope.totalPayableAmount).then(function (response) {
        $ionicLoading.hide();
      },function (err) {
        toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR_OCCURED'));
        $ionicLoading.hide();
      })
    };

    $scope.advancebillpaymentsave = function()
    {
        $ionicLoading.show({	template:$filter('translate')('LOADING')	});
        RestService.advancewatersavebillpayment($scope.CSidn,$scope.orgid,$scope.userID,$scope.Rebate,$scope.data_.payingAmount)
        .then(function (response) {
        $ionicLoading.hide();
        }, function (err) {
          toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR_OCCURED'));
          $ionicLoading.hide();
        })
    };


$scope.payWaterBill = function() {
$ionicLoading.show({	template: $filter('translate')('LOADING')	});
	if($scope.data_.payingAmount < 0 || $scope.data_.payingAmount == "0" || $scope.data_.payingAmount == "")
	{
		alert("Please Enter Vaild Amount");
		$ionicLoading.hide();
//		return;
	}

		console.log($scope.data_.payingAmount);
		console.log($scope.data_.paymentGateway);
//		document.getElementById('btn1').setAttribute("disabled","disabled");
    $scope.amount = parseInt($scope.data_.payingAmount);
		if($scope.totalPayableAmount == 0){
			$scope.advancebillpaymentsave();
        }else{
          $scope.billpaymentsave();
        }
        $scope.feesId = {
          1 : $scope.amount
        }
        if($scope.applictNo == 0 || $scope.applictNo == null || $scope.applictNo == ''){
           $scope.applictNo = null
          }
			RestService.savePayReqWCU($scope.orgid,$scope.userID,$localStorage.langID,$localStorage.responselogindata.emailId,
			$scope.loginUSername,$scope.LoginMobileNo,$scope.ServiceShortName,$scope.applictNo,$scope.amount,$scope.data_.paymentGateway,
			$scope.CSidn,"Y","Y",false,null,$scope.feesId)
				.then(function (response) {
				if(response.status == "pending"){
					console.log(response.payRequestMsg);
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
					$ionicLoading.hide();
				}
				else{
					  toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR'));
					  $ionicLoading.hide();
					}
//				$ionicLoading.hide();
			}, function (err) {
				toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR_OCCURED'));
				$ionicLoading.hide();
			})
 };

   var _init = function (){
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
  };
    _init();
  });
