angular.module('starter')
  .controller('noChangeValidateCTRL', function ($scope, RestService, $ionicLoading, $stateParams, toaster, $filter, ENV,$ionicHistory,
		  $state,$localStorage,$sessionStorage,$ionicModal,$ionicPopup) {
    $scope.data = {};
      $scope.orgid = $localStorage.selectedorgID;
      $scope.userID = $localStorage.responselogindata.userId;
      $scope.loginUSername = $localStorage.responselogindata.firstName;
      $scope.LoginMobileNo = $localStorage.responselogindata.mobileNo;

    $scope.validateProperty = function()
    {
        $ionicLoading.show({template:	$filter('translate')('LOADING')		});
        RestService.validateProperty($scope.propertyNumber,$scope.orgid).then(function (response) {
          if(response != "" || response != null || response != undefined)
          {
            if(response.provisionalMas == null){
               toaster.error($filter('translate')('INVALIDPROPERTY'));
               $ionicLoading.hide();
            }else{
            console.log("response--"+JSON.stringify(response));
            $scope.resposeProp = response;
            $sessionStorage.deptId = $scope.resposeProp.deptId;
            $scope.resposeProp.finYearList = Object.keys($scope.resposeProp.financialYearMap);
            $sessionStorage.validatePropertyDetails = $scope.resposeProp;
            var provisionalMas = response.provisionalMas;
            var provAsseFactDtlDto = response.provAsseFactDtlDto;
            RestService.propertyBillPaymentSelf2($sessionStorage.validatePropertyDetails).then(function (response) {
                  console.log("response---r2"+JSON.stringify(response));
                 if(response == "" || response == null || response == undefined)
                     {
                        toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR_OCCURED'));
                        $ionicLoading.hide();
                     }else
                     {
                        console.log("checkListResponse--"+JSON.stringify(response));
                        $sessionStorage.checkListResponse = response;
                        $state.go("app.noChangeuserDetail");
                     }
                  $ionicLoading.hide();
                   }, function (err) {
                  toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR_OCCURED'));
                  $ionicLoading.hide();
                })




    //          RestService.propertyBillPaymentSelf2($sessionStorage.validatePropertyDetails).then(function (checkListResponse) {
    //            if(checkListResponse != "" || checkListResponse != null || checkListResponse != undefined)
    //            {
    //               console.log("checkListResponse--"+JSON.stringify(checkListResponse));
    //               $sessionStorage.checkListResponse = checkListResponse;
    //               $state.go("app.noChangeuserDetail");
    //               $ionicLoading.hide();
    //            }else
    //            {
    //              alert(response);
    //              $ionicLoading.hide();
    //            }
    //          },function (err) {
    //             toaster.error($filter('translate')('ERROR'), $filter('translate')('VALIDPROPERTY'));
    //             $ionicLoading.hide();
    //          })
          }
          }else
          {
            alert(response);
            $ionicLoading.hide();
          }
        }, function (err) {
           toaster.error($filter('translate')('ERROR'), $filter('translate')('Please Enter Valid Property Number'));
           $ionicLoading.hide();
        })
    }

    var _init = function (){};
    _init();
  });
