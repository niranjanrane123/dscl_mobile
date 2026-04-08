angular.module('starter')

  .controller('propertyTransferPayment', function ($rootScope,$scope, RestService, $ionicLoading, $stateParams, toaster, $filter,$ionicPopup,
  ENV, $state,$sessionStorage,$localStorage,$ionicHistory) {
$scope.data = {};
$localStorage.langID = "1";
/* login User Detial*/
//$scope.orgid = $localStorage.responselogindata.orgId;
//$scope.orgid = "8";
  $scope.orgid = $localStorage.selectedorgID;
  $scope.userID = $localStorage.responselogindata.userId;
  $scope.loginUSername = $localStorage.responselogindata.firstName;
  $scope.LoginMobileNo = $localStorage.responselogindata.mobileNo;
  $scope.emailId = $localStorage.responselogindata.emailId;
 var checkListDto = $sessionStorage.checkListDto;
 $scope.propNo = $sessionStorage.mutableChargesData.proAssNo;
 $scope.applicantName = $sessionStorage.mutableChargesData.propTransferOwnerList[0].ownerName;
 $scope.mobileNo = $sessionStorage.mutableChargesData.propTransferOwnerList[0].mobileno;


 $scope.totalPayableAmount = $sessionStorage.mutableCharges[0].totalTaxAmt;
 $scope.payingAmount = $sessionStorage.mutableCharges[0].totalTaxAmt;
/* property OWner detail*/

//$scope.applictNo = $sessionStorage.propertyBillResponse.applNo;
//$scope.serviceId = $sessionStorage.propertyBillResponse.serviceId;

if($scope.applictNo == 0 || $scope.applictNo == null || $scope.applictNo == ''){
  $scope.applictNo = null
}


     $scope.saveMutation = function(){
          $ionicLoading.show({	template:$filter('translate')('LOADING')		});
          RestService.saveMutationData(checkListDto).then(function (response){

            if(response == "" || response == null || response == undefined)
                {
                  console.log(response);
                  toaster.error("no check list defined");
                  $ionicLoading.hide();
                }else
                {
                   console.log("mutable save data"+JSON.stringify(response));
                   $scope.applicationIdGenerated = response.apmApplicationId;
                   propertypaybill();
                }
              $ionicLoading.hide();

            }, function (err) {
              toaster.error($filter('translate')('ERROR'), $filter('translate')('Please Enter Valid Property Number'));
              $ionicLoading.hide();
            })
        }

  /* payment function*/
  function propertypaybill() {

  if($scope.payingAmount < 0 || $scope.payingAmount == "0" || $scope.payingAmount == "")
    {
      $rootScope.simpleAlert("Please Enter Vaild Amount");
      return;
    }
      console.log($scope.payingAmount);
      console.log($scope.paymentGateway);
  //		document.getElementById('btn1').setAttribute("disabled","disabled");
        $ionicLoading.show({	template:$filter('translate')('LOADING')	});
         $scope.feesId = {
            1 : $scope.totalPayableAmount
          }
			RestService.savePayReqProperty($scope.orgid,$scope.userID,$localStorage.langID,$scope.emailId,
			$scope.applicantName,$scope.LoginMobileNo,'MUT',$scope.applicationIdGenerated,$scope.totalPayableAmount,$scope.paymentGateway,
			$scope.propNo,"Y","N",false,null,$scope.feesId,$scope.serviceId)
				.then(function (response) {
				if(response.status == "success" || response.status == "pending"){
				  $sessionStorage.mutableCharges = null;
				  $sessionStorage.checkListDto = null;
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
						     var alertPopup = $ionicPopup.alert({
                   title: $filter('translate')('MUTATION'),
                   template: $filter('translate')('MUTATIONSAVED') +$scope.applicationIdGenerated,
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
				$ionicLoading.hide();
			}, function (err) {
				toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR_OCCURED'));
				$ionicLoading.hide();
			})
 };
 /* function end */

/* fetching bank list */
 var _init = function (){
 	$ionicLoading.show({	template:$filter('translate')('LOADING')	});
    	RestService.getPayOpt($scope.orgid,$scope.userID,$localStorage.langID).then(function (response) {
    		console.log("bankList---"+JSON.stringify(response));
    		if(response.status == "failure"){
    		  toaster.error($filter('translate')('ERROR'), $filter('translate')(response.errorMsg));
    		  $ionicLoading.hide();
    		}else{
    		       $scope.options = new Array();
            	    for(var i=0;i<response.list.length;i++){
            				$scope.options.push({
                      id : response.list[i].bankId,
                      name : response.list[i].cbbankname
            		    })
            	    }
    			$ionicLoading.hide();
    		}
    		$ionicLoading.hide();
    	},function (err) {
    		$ionicLoading.hide();
    	})
  };

    _init();

  })
