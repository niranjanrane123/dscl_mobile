angular.module('starter')
    .controller('EbusTTandPrice', function ($scope, RestService, $ionicLoading, $stateParams, toaster, $filter, ENV, $ionicHistory,
        $state, $localStorage, $sessionStorage,$sce, $ionicModal, $ionicPopup, $timeout, $ionicScrollDelegate, $ionicPlatform, $cordovaGeolocation,$rootScope) {
            
          $scope.langId=$localStorage.langID;
			
          $scope.getEbusTTandPrice=function(service){
                          // $ionicLoading.show()
                          console.log("service",service)
                let code=null
                if(service=="BUSFARE"){
                  code ='112'
                }else if(service=="BUSROUTE"){
                  code='113'
                }else{
                  code='70';
                }

              RestService.getEbusTTandPrice(code).then(function (response) {
                //$ionicLoading.show({ template: $filter('translate')('LOADING') });
                console.log("On going projects**--" + response.messageList);
                $scope.OnGoingProjects = response.messageList;
                if (response == undefined || response == null || response == "") {
                  $ionicLoading.hide();
                  return false;
                }
                let heading=null;
                let responseData=null
                if($scope.langId=="1"){
                  heading= response.subLinkNameEn;
                  responseData=response.detailsHistories[0].txta_03_ren_blob // ✅
                }else{
                  heading= response.subLinkNameRg;
                  responseData=response.detailsHistories[0].txta_03_en_nnclob // ✅txta_03_en_nnclob
                }

                $scope.htmlContent= $sce.trustAsHtml(responseData)
                $scope.heading=heading;
                // $ionicLoading.hide();

			})
          }

           var deregisterSecond = $ionicPlatform.registerBackButtonAction(
      function () {
         if($scope.service == "BUSFARE" ||  $scope.service=="BUSROUTE"){
               $state.go('app.subHome')
              }else{
                $state.go('app.home')
              }
              $sessionStorage.ebusService=null
      }, 100
    );
     $scope.myGoBack=function(){
              if($scope.service == "BUSFARE" ||  $scope.service=="BUSROUTE"){
               $state.go('app.subHome')
              }else{
                $state.go('app.home')
              }
              $sessionStorage.ebusService=null
        }

      var _init =function(){
        $scope.service =$sessionStorage.ebusService;
         $scope.getEbusTTandPrice($scope.service);
      }
      _init()
		})