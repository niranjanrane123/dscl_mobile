angular.module('starter')

  .controller('ApplicationHistoryPageCtrl', function ($scope,$sessionStorage,$ionicPopup, $location, RestService, $ionicLoading, $stateParams, toaster,
		  $filter, ENV, dateFilter, $state,$ionicSideMenuDelegate,$rootScope,$localStorage) {
       $scope.historydata=[];
  	  $ionicSideMenuDelegate.canDragContent(false);
      $scope.langID=$localStorage.langID;
      var _init = function()
      {
        $scope.historydata=[];
        if($localStorage.langID == "2"){
           $ionicLoading.show({ template: 'लोड हो रहा है...'    });
         }else{
           $ionicLoading.show({ template: 'Loading...'    });
         }

       RestService.getDashBoardDataAction($sessionStorage.applicationHistoryId,$localStorage.langID).then(function (response){

                  console.log("deptresponse--"+response);
                  if(response==undefined || response == null || response=="")
                    {
                      $ionicLoading.hide();
                      return false;
                    }
                  else
                    {
                     $scope.historydata=response;
                    }
                  $ionicLoading.hide();
                },function (err) {
                  toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR'));
                  $ionicLoading.hide();
          })
      };

    _init();
})