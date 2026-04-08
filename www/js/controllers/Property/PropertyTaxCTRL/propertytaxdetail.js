angular.module('starter')

  .controller('propertyTaxDetailCtrl', function ($scope, RestService, $ionicLoading, $stateParams, toaster, $filter,
   ENV, $state,$sessionStorage) {

console.log("propertyBillResponse--"+JSON.stringify($sessionStorage.propertyBillResponse));

$scope.billNo = $sessionStorage.propertyBillResponse.billNo;
$scope.billDate = formatDate($sessionStorage.propertyBillResponse.billDate);
$scope.primaryOwnerName = $sessionStorage.propertyBillResponse.primaryOwnerName;
$scope.propNo = $sessionStorage.propertyBillResponse.propNo;
$scope.address = $sessionStorage.propertyBillResponse.address;
$scope.docsitems = [];
$scope.totalPayableAmt =  $sessionStorage.propertyBillResponse.totalPayableAmt;

var propertyTaxdetailResponse = $sessionStorage.propertyBillResponse.billDisList;

	for (var i = 0; i < propertyTaxdetailResponse.length; i++) {
		var taxdata = {
				taxdesc : propertyTaxdetailResponse[i].taxDesc,
				arrear : propertyTaxdetailResponse[i].arrearsTaxAmt,
				curtamt :propertyTaxdetailResponse[i].currentYearTaxAmt,
				total :propertyTaxdetailResponse[i].totalTaxAmt
		}
		$scope.docsitems.push(taxdata);
	}


  $scope.paypropertyBill = function()
    {
      $state.go("app.propertypaymentpage");
    }


  })
