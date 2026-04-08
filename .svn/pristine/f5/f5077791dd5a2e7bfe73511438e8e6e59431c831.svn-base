angular.module('starter')
  .controller('applicationStatusCTRL', function ($scope, RestService, $ionicLoading, $stateParams, toaster, $filter, ENV,$ionicHistory,
		  $state,$localStorage,$sessionStorage,$ionicModal,$ionicPopup) {
$scope.data = {};

    $scope.applicationsearch = function()
    {
      $ionicLoading.show({	template: $filter('translate')('LOADING')	});
        RestService.applicationStatus($scope.applicationNumber).then(function (statusResponse) {
        if(statusResponse != "" || statusResponse != undefined )
          {
              if(statusResponse.status==null){
                toaster.error($filter('translate')(statusResponse.errors));
                $ionicLoading.hide();
              }else{
                $sessionStorage.statusResponse = statusResponse;
                $state.go("app.applicationStatusDetail");
              }

          }else{
               toaster.error( $filter('translate')('VALIDTOKEN'));
             
              $ionicLoading.hide();
          }
        },
        function (err){
          $ionicLoading.hide();
          toaster.error($filter('translate')('APPLICATIONSTATUSERROR')/* , $filter('translate')('ERROR') */);
        })
    }
    var _init = function (){

    };
    _init();
  });
