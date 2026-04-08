angular.module('starter')

.controller('propertyPayCtrl', function ($scope, RestService, $ionicLoading, $stateParams, toaster, $filter,
  ENV, $state,$cordovaBarcodeScanner,$sessionStorage,$localStorage,$ionicPopup) {

	console.log("$localStorage.responselogindata---"+JSON.stringify($localStorage.responselogindata));
	$scope.orgid = $localStorage.selectedorgID;
	$scope.userID = $localStorage.responselogindata.userId;
	$scope.loginUSername = $localStorage.responselogindata.firstName;
	$scope.LoginMobileNo = $localStorage.responselogindata.mobileNo;
  $scope.qrcode = false;
  $scope.showValue = false;

  $scope.changeText = function(){
   if($scope.propertysearch.length > 2 ){
     if($localStorage.catchNo != undefined || $localStorage.catchNo != null){
           $scope.showValue = true;
           $scope.showno = $localStorage.catchNo;
        }else{
          $scope.showValue = false;
        }
    }
  }
  $scope.getValue = function(){
    $scope.propertysearch = $scope.showno;
    $scope.showValue = false;
  }
  $scope.searchpropertyBill = function()
    {
        if($localStorage.langNewId == "2"){
          $ionicLoading.show({	template: 'लोड हो रहा है...'		});
        }else{
          $ionicLoading.show({	template: 'Loading...'		});
        }
      	console.log("propertysearch--"+$scope.propertysearch);
         RestService.propertyBillPayment($scope.propertysearch,$scope.orgid,$scope.userID).then(function (response){

          if(response == "" || response == null || response == undefined)
              {
                console.log(response);
                toaster.error($filter('translate')('ERROR'), $filter('translate')(response));
                $ionicLoading.hide();
              }else
              {
                if(response.redirectCheck == 'Y'){
                   var confirmPopup = $ionicPopup.show({

                      title : $filter('translate')('message'),
                      template : 'Assessment is not done for current Year. Please filed assessment first.',

                      buttons : [
                          {
                             text : 'Ok',
                             type : 'button button-block  customBgColor',

                             onTap : function() {
                                $state.go('app.home');
                              }
                          }]
                     });
                }else{
                 $localStorage.catchNo = $scope.propertysearch;
                 $sessionStorage.propertyBillResponse = response;
                 $state.go("app.propertydetail");
                 }
              }
      			$ionicLoading.hide();
      		}, function (err) {
      			toaster.error($filter('translate')('ERROR'), $filter('translate')('PLEASEENTERVALIDPROPERTY'));
      			$ionicLoading.hide();
      		})
    }

 $scope.scanBarcode = function() {
     cordova.plugins.barcodeScanner.scan(
          function (result) {
             console.log(  "Result: " + result.text );
             var scanResult = result.text;
             if($localStorage.langNewId == "2"){
                $ionicLoading.show({	template: 'लोड हो रहा है...'		});
              }else{
                $ionicLoading.show({	template: 'Loading...'		});
              }
             RestService.propertyBillPayment(scanResult,$scope.orgid,$scope.userID).then(function (response) {
               if(response != "" || response != null || response != undefined)
                  {
                      $sessionStorage.propertyBillResponse = response;
                      $state.go("app.propertydetail");
                      $ionicLoading.hide();
                  }else
                  {
                      alert(response);
                      	$ionicLoading.hide();
                  }

             }, function (err) {
                 toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR_OCCURED'));
                 $ionicLoading.hide();
             })
          },function (error) {
              console.log("Scanning failed: " + error);
          });
 }


})
