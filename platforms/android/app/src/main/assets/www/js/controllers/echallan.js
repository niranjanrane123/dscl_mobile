angular.module('starter')

  .controller('EchallanPageCtrl', function ($scope, $sessionStorage, $ionicPopup, $location, RestService, $ionicLoading, $stateParams, toaster,
    $filter, ENV, dateFilter, $state, $ionicSideMenuDelegate, $rootScope, $localStorage) {

    $scope.getDashBoardData = [];
    $scope.getDashBoardDataPage = [];
    $scope.totalPagination = 0;
    $scope.currentPagination = 0;
    $scope.currentPaginationArray = [];
    $scope.mysearch = '';
    $scope.langID = $localStorage.langID;
    $scope.orgid = $localStorage.selectedorgID;
    $scope.tokennumber;

    $scope.respcompainList = [];
   
    $scope.getNumber = function (num) {
      return new Array(num);
    }
    var _init = function () {

    };
    _init();

    $scope.getChallanListFunction = function (chlllanId) {
      $ionicLoading.show({ template: $filter('translate')('LOADING') });
      RestService.getEchallanById(chlllanId).then(function (resp) {

       
        if (resp.message == "Successfully fetched challan details") {
          $scope.respcompainList = resp.myObjectList
          $ionicLoading.hide();
         
        }
        else {
          console.log('resp', resp)
          // alert("Record Not Found..")
          toaster.error(resp.message);
          $ionicLoading.hide();
          $scope.respcompainList = null
           
             // $ionicLoading.hide();
          }
        
       
      },
        function (err) {
          $ionicLoading.hide();
           toaster.error($filter('translate')('ECHALLANERROR')/* , $filter('translate')('ERROR') */);
          toaster.error(err);
          // alert("Error= " +JSON.stringify(err));
           
        })
    }

  })