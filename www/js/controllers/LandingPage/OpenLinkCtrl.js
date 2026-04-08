angular.module('starter')

  .controller('OpenLinkCtrl', function ($scope,$sessionStorage,$ionicPopup, $location, RestService, $ionicLoading, $stateParams, toaster,
		  $filter, ENV, dateFilter, $state,$ionicSideMenuDelegate,$rootScope,$localStorage) {
       $scope.langID=$localStorage.langID;
       $scope.baseUrl = ENV.baseURL + '/dscl/' ; 
       $scope.dataList=[];
       $scope.comeFrom = $sessionStorage.comeFrom;
       $scope.pageTitle = "";
       
       console.log('$scope.baseUrl',$scope.baseUrl);
      
      //Popup
       $scope.errpopup=function(){
        $ionicPopup.show({ 
          title: $filter('translate')('message'),
          template: $filter('translate')($scope.pageTitle) + $filter('translate')('NOTAVAILABLE'),
  
          buttons: [{
            text: $filter('translate')('OK'),
            type: 'button button-block  customBgColor',
            onTap: function () {
              if($sessionStorage.comeFromPage == 'Home'){
                console.log($sessionStorage.comeFromPage);
                $state.go('app.home');
              } else {
                $state.go('app.LandingPage');
              }
  
            }
          }]
        });
       }


      if($scope.comeFrom == "Important") {
        $scope.pageTitle = $filter('translate')('IMPORTANT_LINKS');
        $scope.url = "citizenAPI/getCitizenPublicNotices/orgid/1/noticeType/I";
      
      } else if($scope.comeFrom == "Quick") {
        $scope.pageTitle = $filter('translate')('QUICK_LINKS');
        $scope.url = "citizenAPI/getCitizenPublicNotices/orgid/1/noticeType/Q"; 
      
      } else if($scope.comeFrom == "Public"){
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
        } else {
          $ionicLoading.show({ template: 'Loading...'    });
        }

       RestService.getOpenLinks($scope.url).then(function (response){
                  console.log("link resp***--"+response);
                  if(response==undefined || response == null || response=="")
                    {
                      console.log("null***--"+response);
                      $ionicLoading.hide();
                      $scope.errpopup();
                      // toaster.error($scope.pageTitle + ' ' +$filter('translate')('ERRORSERVICE')/* , $filter('translate')('ERROR') */);
                      // $ionicLoading.hide();
                      // return false;
                      
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

      $scope.clickURL = function(endUrl){
        if($scope.comeFrom == 'Important' || $scope.comeFrom == 'Public'){
          var url = $scope.baseUrl + endUrl;
        } else if ($scope.comeFrom == 'Quick'){
          var url = endUrl;
        }
        console.log("Entered URL", url)
        if(ionic.Platform.isIOS()){
          console.log("ios")
          window.location.href = encodeURI(url);
         }else if(ionic.Platform.isAndroid()){
          window.open(encodeURI(url), '_system', 'location=no,toolbar=yes,useWideViewPort=yes')
          }
      }

    _init();
});
                          