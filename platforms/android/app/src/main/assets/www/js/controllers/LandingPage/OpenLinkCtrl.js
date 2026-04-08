angular.module('starter')

  .controller('OpenLinkCtrl', function ($scope,$sessionStorage,$ionicPopup, $location, RestService, $ionicLoading, $stateParams, toaster,
		  $filter, ENV, dateFilter, $state,$ionicSideMenuDelegate,$rootScope,$localStorage) {
       $scope.langID=$localStorage.langID;
       $scope.baseUrl = ENV.baseURL + '/' ; 
       $scope.dataList=[];
       $scope.comeFrom = $sessionStorage.comeFrom;
       $scope.pageTitle = "";
       
       console.log('$scope.baseUrl',$scope.baseUrl);
       if($scope.comeFrom == "Important")
    {
       $scope.pageTitle = $filter('translate')('IMPORTANT_LINKS');
       $scope.url = "citizenAPI/getCitizenPublicNotices/orgid/1/noticeType/I";
       
    }
    else if($scope.comeFrom == "Quick")
    {
        $scope.pageTitle = $filter('translate')('QUICK_LINKS');
        $scope.url = "citizenAPI/getCitizenPublicNotices/orgid/1/noticeType/Q"; 
    }

    else if($scope.comeFrom == "Public")
    {
        $scope.pageTitle = $filter('translate')('PUBLIC_NOTICE') ;
        $scope.url = "citizenAPI/getCitizenPublicNotices/orgid/1/noticeType/P"; 
    }

    console.log("comeFrom=**", $scope.pageTitle);

  	  $ionicSideMenuDelegate.canDragContent(false);
      var _init = function()
      {
        $scope.dataList=[];
        if($localStorage.langID == "2"){
           $ionicLoading.show({ template: 'लोड हो रहा है...'    });
         }else{
           $ionicLoading.show({ template: 'Loading...'    });
         }

       RestService.getOpenLinks($scope.url).then(function (response){
                  console.log("link resp***--"+response);
                  if(response==undefined || response == null || response=="")
                    {
                      toaster.error($scope.pageTitle + ' ' +$filter('translate')('ERRORSERVICE')/* , $filter('translate')('ERROR') */);
                      $ionicLoading.hide();
                      return false;
                    }
                  else
                    {
                     $scope.dataList=response;
                     console.log('$scope.dataList',$scope.dataList);
                    }
                  $ionicLoading.hide();
                },function (err) {
                    if($scope.comeFrom == "Important"){
                      toaster.error($scope.pageTitle + ' ' +$filter('translate')('ERRORSERVICE')/* , $filter('translate')('ERROR') */);
                      $ionicLoading.hide();
                    }
                    else if($scope.comeFrom == "Quick"){
                      toaster.error($scope.pageTitle + ' ' +$filter('translate')('ERRORSERVICE')/* , $filter('translate')('ERROR') */);
                      $ionicLoading.hide();
                    }
                    else{
                      toaster.error($scope.pageTitle + ' ' +$filter('translate')('ERRORSERVICE')/* , $filter('translate')('ERROR') */);
                      $ionicLoading.hide();
                    }
                  
          })
      };

    _init();
})