angular.module('starter')

.controller('propertySearchCtrl', function ($scope, RestService, $ionicLoading, $stateParams, toaster, $filter,
  ENV, $state,$cordovaBarcodeScanner,$sessionStorage,$localStorage,$http) {

	console.log("$localStorage.responselogindata---"+JSON.stringify($localStorage.responselogindata));
	$scope.orgid = $localStorage.selectedorgID;
	$scope.userID = $localStorage.responselogindata.userId;
	$scope.loginUSername = $localStorage.responselogindata.firstName;
	$scope.LoginMobileNo = $localStorage.responselogindata.mobileNo;
  $scope.qrcode = false;
//  $scope.temp = {
//                    "returnCode": "Success",
//                    "result": {
//                        "payload": "[{\"TxId\":\"bddae0372c13d9340ee6cd410aaf38d06f957e40e9078190db3b4af17518b0da\", \"Value\":{\"docType\":\"marble\",\"name\":\"Flat2\",\"color\":\"sec21c-huda-gurgaon\",\"size\":789,\"owner\":\"huda\"}, \"Timestamp\":\"2018-10-15 13:13:17.532 +0000 UTC\", \"IsDelete\":\"false\"}]",
//                        "encode": "UTF-8"
//                    },
//                    "txid": "676ee675e2034c3e315b0d07aa13a41ad814db6cae18033daeaa062964049442"
//                }
    $scope.searchpropertyBill = function(){
//    $state.go("app.owenerShipDetails");
//    $localStorage.flatNo = $scope.propertysearch;
    	$ionicLoading.show({	template: $filter('translate')('LOADING')		});
        RestService.getMutablePropertyDetails($scope.propNo,$scope.oldPropNo,$scope.orgid).then(function (response){

                if(response == "" || response == null || response == undefined)
                    {
                      console.log(response);
                      toaster.error($filter('translate')('ERROR'), $filter('translate')(response));
                      $ionicLoading.hide();
                    }else
                    {
                       console.log("mutable data"+JSON.stringify(response.deptId));
                       $sessionStorage.mutablePropertyData = response;
                       $state.go("app.owenerShipDetails");
                    }
            			$ionicLoading.hide();
            		}, function (err) {
            			toaster.error($filter('translate')('ERROR'), $filter('translate')('Please Enter Valid Property Number'));
            			$ionicLoading.hide();
            		})
          }

       var init_ = function(){
          RestService.getDepartmentId($scope.orgid)
            .then(function (response) {
            console.log("service id response"+JSON.stringify(response));
            $ionicLoading.hide();
            $sessionStorage.deptId = response;

            console.log("DEPRTMENT ID "+response)

          }, function (err) {
            $ionicLoading.hide();
            toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR_OCCURED'));

          })
       }
      init_();
})
