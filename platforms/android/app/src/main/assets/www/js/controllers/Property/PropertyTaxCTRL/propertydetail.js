angular.module('starter')

  .controller('propertyDetailsCtrl', function ($scope, RestService, $ionicLoading, $stateParams, toaster, $filter,
   ENV, $state,$sessionStorage) {

console.log("propertyBillResponse--"+JSON.stringify($sessionStorage.propertyBillResponse));

 var propertyBillResponse = $sessionStorage.propertyBillResponse;

/* BILL DETIALS */
$scope.primaryOwnerName = propertyBillResponse.primaryOwnerName;
$scope.address = propertyBillResponse.address;
$scope.location = propertyBillResponse.location;
$scope.pinCode = propertyBillResponse.pinCode;
$scope.primaryOwnerMobNo = propertyBillResponse.primaryOwnerMobNo;
$scope.totalPayableAmount = propertyBillResponse.totalPayableAmt;

if($scope.totalPayableAmount == 0)
		{			$scope.amtzero = true;
		$scope.amtzerobtn = false;
		}else{
			$scope.amtzero = false;
			$scope.amtzerobtn = true;
		}

  $scope.paypropertyBill = function()
  {
      $state.go("app.propertypaymentpage");
  }

  $scope.billdetail = function()
  {
    $state.go("app.propertytaxdetail");
  }


  })
