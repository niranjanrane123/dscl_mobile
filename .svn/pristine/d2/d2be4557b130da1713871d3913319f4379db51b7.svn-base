angular.module('starter')

  .controller('LoginRegCtrl', function ($localStorage,$translate,$ionicHistory,$sessionStorage,$window,$ionicPopup,$ionicSideMenuDelegate,$ionicPlatform,localStorageService,$scope, RestService, $ionicPlatform,$ionicListDelegate,$ionicLoading, $stateParams, toaster, $filter, ENV, $state) {
  $ionicSideMenuDelegate.canDragContent(false);
  $scope.$on('$ionicView.leave', function () { $ionicSideMenuDelegate.canDragContent(true) });
  $localStorage.english = false;
    var deregisterSecond = $ionicPlatform.registerBackButtonAction(
        function() {
          var confirmPopup = $ionicPopup.show({

              title : $filter('translate')('message'),
              template : $filter('translate')('AREYOUSURELOGOUT'),

              buttons : [
              {text: $filter('translate')('CANCEL'),
               type : 'button button-block  customBgColor',},
                  {
                       text : $filter('translate')('OK'),
                       type : 'button button-block  customBgColor',

                       onTap : function() {
                          $sessionStorage.$reset();
                          $window.localStorage.clear();
                          $ionicHistory.clearCache();
                          $ionicHistory.clearHistory();
                          navigator.app.exitApp();
                          ionic.Platform.exitApp();
                      }
                  }]
             });
        }, 100
      );
        $scope.$on('$destroy', deregisterSecond);
  $scope.login = function (){
    $state.go("app.LoginPage");
  };
  $scope.register = function (){
      $state.go("app.Register");
  };
  $translate.use("2");
  $localStorage.langID = "2";
    if($localStorage.langID=="2"){
       $scope.myText = 'English';
    }else{
      $scope.myText = 'Hindi';
    }

   $scope.changeText = function(value) {
       if(value === "Hindi"){
           $translate.use("2");
           $localStorage.langID = "2";
           $localStorage.english = true;
           $localStorage.langNewId = "2";
           console.log("langId:"+ $localStorage.langNewId)
           $scope.myText = 'English';
           _init();
        }else{
            $translate.use("1");
            $localStorage.langID = "1";
            $localStorage.english = false;
            $localStorage.langNewId = "1";
            console.log("langId:"+ $localStorage.langNewId)
            $scope.myText = 'Hindi';
            _init();
        }
      };
  var _init = function()
  {

//      if($localStorage === "Hindi"){
//              $translate.use("2");
//              $localStorage.langID = "2";
//              $localStorage.english = true;
//              $localStorage.langNewId = "2";
//              console.log("langId:"+ $localStorage.langNewId)
//              $scope.myText = 'English';
//              _init();
//       }else{
//           $translate.use("1");
//           $localStorage.langID = "1";
//           $localStorage.english = false;
//           $localStorage.langNewId = "1";
//           console.log("langId:"+ $localStorage.langNewId)
//           $scope.myText = 'Hindi';
//           _init();
//       }
  };
_init();
  })
