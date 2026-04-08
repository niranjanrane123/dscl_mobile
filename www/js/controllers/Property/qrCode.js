angular.module('starter')

.controller('qrCodeCtrl', function ($scope, RestService, $ionicLoading, $stateParams, toaster, $filter,
  ENV, $state,$cordovaBarcodeScanner,$sessionStorage,$localStorage) {

	$scope.orgid = $localStorage.selectedorgID;
	$scope.userID = $localStorage.responselogindata.userId;
	$scope.loginUSername = $localStorage.responselogindata.firstName;
	$scope.LoginMobileNo = $localStorage.responselogindata.mobileNo;

$scope.qrcode = false;

  $scope.generate = function()
    {
       var qr = $scope.propertyNo.toString();
       $scope.qrCodevalue = qr;
       console.log("$scope.qrCodevalue---"+JSON.stringify($scope.qrCodevalue));
       $scope.qrcode = true;
    }

})
