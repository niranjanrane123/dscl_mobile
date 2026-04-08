angular.module('starter')
.controller('noChangePaymentCtrl', function ($scope, RestService, $ionicLoading, $stateParams, toaster, $filter,
  ENV, $state,$sessionStorage,$localStorage) {
$scope.data = {};

$scope.orgid = $localStorage.selectedorgID;
$scope.userID = $localStorage.responselogindata.userId;
$scope.loginUSername = $localStorage.responselogindata.firstName;
$scope.LoginMobileNo = $localStorage.responselogindata.mobileNo;
$scope.emailId = $localStorage.responselogindata.emailId;
 $scope.langId = 1;
/* property OWner detail*/
$scope.totalPayableAmount = $sessionStorage.checkListResponse.provisionalMas.billTotalAmt;
$scope.applicantName = $scope.loginUSername;
$scope.mobileNo = $scope.LoginMobileNo;
$scope.propNo = $sessionStorage.checkListResponse.provisionalMas.assNo;

/*----------------- function start*-----------------*/
$scope.noChangePaymentClick = function()
{
    $ionicLoading.show({	template: $filter('translate')('LOADING')		});
    $sessionStorage.checkListResponse.provisionalMas.orgId = $scope.orgid;
    $sessionStorage.checkListResponse.provisionalMas.createdBy = $scope.userID;
    $sessionStorage.checkListResponse.provisionalMas.billPartialAmt = $scope.totalPayableAmount;
    $sessionStorage.checkListResponse.provisionalMas.docs = $sessionStorage.uploadDocument;
    console.log("provisionalMas---"+JSON.stringify($sessionStorage.checkListResponse.provisionalMas));
    $scope.serviceId = $sessionStorage.checkListResponse.provisionalMas.smServiceId;
    var offlineDto = {
       orgId : $scope.orgid,
       userId : $scope.userID,
       deptId : $sessionStorage.deptId,
       langId: $scope.langId,
       serviceId: $scope.ServiceIdGet,
       empType: null,
       applicantName:$scope.loginUSername
     }

       var noChangeSaveDate = {
                            demandLevelRebateList :$sessionStorage.checkListResponse.demandLevelRebateList,
                            provisionalMas : $sessionStorage.checkListResponse.provisionalMas,
                            languageId : $localStorage.langID,
                            finYearList : $sessionStorage.checkListResponse.provisionalMas.financialYearList,
                            billMasList :$sessionStorage.checkListResponse.billMasList,
                            offline : offlineDto
                           }
       console.log("noChangeSaveDate---"+JSON.stringify(noChangeSaveDate));

           	RestService.saveSelfAssessment(noChangeSaveDate).then(function (response) {
           		if(response != "" || response != null || response != undefined)
           		{
           		$scope.feesId = {
                        1 : $scope.totalPayableAmount
                      }
           		  console.log("Success--"+JSON.stringify(response.provisionalMas));
                $scope.applictNo = response.provisionalMas.apmApplicationId;
                console.log("SuccessAppId--"+$scope.applictNo);

           		  	RestService.savePayReqProperty($scope.orgid,$scope.userID,$localStorage.langID,$scope.emailId,$scope.loginUSername,$scope.LoginMobileNo,
                      'NCA',$scope.applictNo,$scope.totalPayableAmount,$scope.paymentGateway,$scope.propNo,"Y","Y",false,null,$scope.feesId,$scope.serviceId)

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
                				$ionicLoading.hide();
                			}, function (err) {
                				toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR_OCCURED'));
                				$ionicLoading.hide();
                			})

           		}else{
                      console.log("fail--"+response);
                      $ionicLoading.hide();
              }
           	}, function (err) {
           	 toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR'));
           		$ionicLoading.hide();
           	})


}
/* fetching bank list */
 var _init = function (){
 	$ionicLoading.show({	template: $filter('translate')('LOADING')	});
    	RestService.getPayOpt($scope.orgid,$scope.userID,$localStorage.langID).then(function (response) {
    		console.log("bankList---"+JSON.stringify(response));
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

     RestService.getServiceId($scope.orgid,"NCA")
        .then(function (response) {
        console.log("service id response"+JSON.stringify(response));
        $ionicLoading.hide();
        $scope.ServiceIdGet = response;

        console.log("SERVICE OD "+$scope.ServiceIdGet)
        getSelf();
      }, function (err) {
        $ionicLoading.hide();
        toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR_OCCURED'));

      })
};

    _init();

  })
