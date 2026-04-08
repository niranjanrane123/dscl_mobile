angular.module('starter')
  .controller('jalsansthanViewBillCtrl', function ($rootScope, $scope, RestService, $ionicLoading, $stateParams, toaster,
    $filter, ENV, $state, $localStorage, $sessionStorage, $ionicPopup, $ionicModal, $cordovaGeolocation, $ionicHistory,$ionicPlatform,localStorageService,$window) {
      $scope.consumerNo;
      $scope.upclFormDetailsCard=false;
      $scope.showPayBtn = true;

      $scope.searchBill=function(){
        $ionicLoading.show();
        console.log( $scope.consumerNo)
        if($scope.consumerNo==null){
          $ionicLoading.hide();
          toaster.error($filter('translate')('CONNECREQ'));
        }else{
          RestService.getJalSansthan($scope.consumerNo).then(function (data) {
            $ionicLoading.hide();
            console.log(data,"jal sansthan")
            if(data.status=="fail"){
                 toaster.error($filter('translate')('WRONG_CONN_NUMBER'));
            }else{
                $ionicLoading.hide();
                $scope.upclFormDetailsCard=true;
                $scope.consumerName=data.consumerName;
                $scope.consumerCode=data.consumerCode;
                $scope.conAddress=data.conAddress;
                $scope.billNo=data.waterBillNo;
                $scope.billAmount=data.waterBillAmount;
                $scope.dueDate=data.waterPaymentDueDate;

                if($scope.billAmount==0){
                  $scope.showPayBtn = false;
                } else {
                  $scope.showPayBtn = true;
                }
            }
            
          })
          
        }
      }

      $scope.payBill = function(){
        console.log("Entered")
    
        var url = ENV.jalSansthanURL + $scope.consumerNo;
        console.log('Jal Sansthan Pay url-->',url);
        if($scope.isAndroid){
          console.log("In android")
          window.open(encodeURI(url), '_system', 'location=no,toolbar=yes,useWideViewPort=yes')
        }else{
            cordova.InAppBrowser.open(url, '_system', 'location=no,toolbar=yes,useWideViewPort=yes');
        }
      }

  var _init = function () {
    //console.log("Entered Jal Sansthan")
  }
      
  _init();


});
  