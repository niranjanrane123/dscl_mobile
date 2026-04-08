angular.module('starter')
  .controller('helpLineCTRL', function ($scope, RestService, $ionicLoading, $stateParams, toaster, $filter, ENV,$ionicHistory,
		  $state,$localStorage,$sessionStorage,$ionicModal,$ionicPopup,$ionicPlatform) {
        var deregisterSecond = $ionicPlatform.registerBackButtonAction(
          function() {
                       if($localStorage.responselogindata){
                          $state.go('app.home');
                         }else{
                         $state.go('app.LandingPage');
                         }
          }, 100
        );
  $scope.$on('$destroy', deregisterSecond);

/*---------------calling function--------------------------*/
function onSuccess(result){
  console.log("Success:"+result);
}
function onError(result) {
  console.log("Error:"+result);
}

$scope.callNumber=function(number){
    $scope.number = number;
    window.plugins.CallNumber.callNumber(onSuccess, onError, $scope.number, false);
}


    var _init = function (){

    };
    _init();
  });
