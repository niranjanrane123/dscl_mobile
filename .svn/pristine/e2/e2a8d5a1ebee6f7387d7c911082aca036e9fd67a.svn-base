angular.module('starter')

  .controller('propertypaymentCtrl', function ($rootScope,$scope, RestService, $ionicLoading, $stateParams, toaster, $filter,$ionicPopup,
  ENV, $state,$sessionStorage,$localStorage) {
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
console.log("propertyBillResponse--"+JSON.stringify($sessionStorage.propertyBillResponse));


/* property OWner detail*/
$scope.propNo = $sessionStorage.propertyBillResponse.propNo;
$scope.totalPayableAmount = $sessionStorage.propertyBillResponse.totalPayableAmt;
$scope.applicantName = $sessionStorage.propertyBillResponse.primaryOwnerName;
$scope.mobileNo = $sessionStorage.propertyBillResponse.primaryOwnerMobNo;
$scope.applictNo = $sessionStorage.propertyBillResponse.applNo;
$scope.serviceId = $sessionStorage.propertyBillResponse.serviceId;

if($scope.applictNo == 0 || $scope.applictNo == null || $scope.applictNo == ''){
  $scope.applictNo = null
}
/* payment function*/
$scope.propertypaybill = function() {

if($scope.payingAmount < 0 || $scope.payingAmount == "0" || $scope.payingAmount == "")
	{
		$rootScope.simpleAlert("Please Enter Vaild Amount");
		return;
	}
		console.log($scope.payingAmount);
		console.log($scope.paymentGateway);
//		document.getElementById('btn1').setAttribute("disabled","disabled");
			 if($localStorage.langNewId == "2"){
          $ionicLoading.show({	template: 'लोड हो रहा है...'		});
        }else{
          $ionicLoading.show({	template: 'Loading...'		});
        }
       $scope.feesId = {
          1 : $scope.payingAmount
        }
			RestService.savePayReqProperty($scope.orgid,$scope.userID,$localStorage.langID,$scope.emailId,
			$scope.applicantName,$scope.LoginMobileNo,'DES',$scope.applictNo,$scope.payingAmount,$scope.paymentGateway,
			$scope.propNo,"Y","Y",false,null,$scope.feesId,$scope.serviceId)
				.then(function (response) {
				if(response.status == "success" || response.status == "pending"){
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
						      var confirmPopup = $ionicPopup.show({

                      title : $filter('translate')('message'),
                      template : event,

                      buttons : [
                          {
                             text : 'Ok',
                             type : 'button button-block  customBgColor',

                             onTap : function() {
                                $state.go('app.home');
      //					            	 ionic.Platform.exitApp();
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
 	 if($localStorage.langNewId == "2"){
        $ionicLoading.show({	template: 'लोड हो रहा है...'		});
      }else{
        $ionicLoading.show({	template: 'Loading...'		});
      }
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
