angular.module('starter')
  .controller('nidanStatusctrl', function ($rootScope,$scope, RestService, $ionicLoading, $stateParams,
		toaster, $filter, ENV, $state, $ionicPopup,$sessionStorage, $localStorage) {


$scope.tokennumber;
$scope.complaintStatusFormResponse = false;

$scope.applicationstatussearch123 = function()
{
	$ionicLoading.show({	template: $filter('translate')('LOADING')});
  if($scope.tokennumber != "" || $scope.nidanmobileNumber != ""){
      if($scope.tokennumber != null)
      {
        RestService.getGrievanceStatus($scope.tokennumber).then(function (nidanStatusresponse) {
        if(nidanStatusresponse != "" || nidanStatusresponse != undefined)
          {
              $sessionStorage.nidanStatusresponse = nidanStatusresponse;
              $state.go("app.nidanStatusdetail");
          }else{
              toaster.error($filter('translate')('ERROR'), $filter('translate')('Please Enter Valid Token Number'));
              $ionicLoading.hide();
          }
            $ionicLoading.hide();
          },
        function (err){
          $ionicLoading.hide();
          toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR'));
        })
      }else{

             if($scope.nidanmobileNumber != null)
              {
                  RestService.getGrievanceStatusMobile($scope.nidanmobileNumber).then(function (nidanMobileNoresponse) {
                  if(nidanMobileNoresponse != "" || nidanMobileNoresponse != undefined)
                    {
                        $sessionStorage.nidanMobileNoresponse = nidanMobileNoresponse;
                        $state.go("app.nidanStatusdetail");

                    }else{
                        toaster.error($filter('translate')('ERROR'), $filter('translate')('Please Enter Valid Token Number'));
                        $ionicLoading.hide();
                    }
                      $ionicLoading.hide();
                    },
                  function (err){
                    $ionicLoading.hide();
                    toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR'));
                  })
              }
              $ionicLoading.hide();
      }
  }else{
       $rootScope.simpleAlert("Please Enter Token Number OR Mobile Number");
       $ionicLoading.hide();
  }
}

$scope.applicationstatussearch = function(){

    if($scope.tokennumber != "" ){

        RestService.commonSearchStatus($scope.tokennumber).then(function (nidanStatusresponse) {
        if(nidanStatusresponse != "" || nidanStatusresponse != undefined)
          {
              $sessionStorage.nidanStatusresponse = nidanStatusresponse;
              $state.go("app.nidanStatusdetail");
          }else{
              toaster.error($filter('translate')('ERROR'), $filter('translate')('Please Enter Valid Token Number'));
              $ionicLoading.hide();
          }
            $ionicLoading.hide();
          },
        function (err){
          $ionicLoading.hide();
          toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR'));
        })
    }else{
        $rootScope.simpleAlert("Please Enter Token Number OR Mobile Number");
        $ionicLoading.hide();
    }

}
    var _init = function (){

    };
    _init();
  });
