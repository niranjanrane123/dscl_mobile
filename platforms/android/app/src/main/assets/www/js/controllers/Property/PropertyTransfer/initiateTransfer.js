angular.module('starter')

  .controller('initiateTransferCtrl', function ($scope, RestService, $ionicLoading, $stateParams, toaster, $filter,
   ENV, $state,$sessionStorage,$localStorage,$ionicPopup) {

  $scope.breakUp = new Array;


/* BILL DETIALS */

$scope.owner;
//$scope.location = propertyBillResponse.location;
//$scope.pinCode = propertyBillResponse.pinCode;
//$scope.primaryOwnerMobNo = propertyBillResponse.primaryOwnerMobNo;
//$scope.totalPayableAmount = propertyBillResponse.totalPayableAmt;




  $scope.paypropertyBill = function()
  {
      $state.go("app.propertypaymentpage");
  }
$scope.showPopup = function() {
    var alertPopup = $ionicPopup.alert({
      title: 'Info!',
      template: 'Submited'
    });
    alertPopup.then(function(res) {
      console.log('Thank you ');
    });
  };


     $scope.Add = function () {
         //Add the new item to the Array.
         var breakUps = {};
         breakUps.ownerName = $scope.ownerName;
         breakUps.ownerContact = $scope.ownerContact;
         breakUps.ownerAddress = $scope.ownerAddress;
         breakUps.ownerPan = $scope.ownerPan;
         $scope.breakUp.push(breakUps);
         $scope.totalVolume = 0;



         //Clear the TextBoxes.
         $scope.ownerName = "";
         $scope.ownerContact = "";
         $scope.ownerAddress = "";
         $scope.ownerPan = "";
     };

       $scope.Remove = function (index) {
              //Find the record using Index from Array.
               var name = $scope.breakUp[index].Name;
                //Remove the item from Array using Index.
                $scope.breakUp.splice(index, 1);
          }
 })
