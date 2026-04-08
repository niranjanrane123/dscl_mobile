angular.module('starter')

  .controller('SliderCtrl', function ($localStorage,$ionicPlatform,localStorageService,$scope, RestService, $ionicPlatform,$ionicListDelegate,$ionicLoading, $stateParams, toaster, $filter, ENV, $state) {


    $scope.loginRegister = function( ){
      $state.go("app.LoginPage");
    }
    $scope.slideHasChanged = function(index){

    }
    var _init = function()
      {
         if($localStorage.langID=="1"){
            $scope.langEnglish=true;
         }else {
            $scope.langEnglish=false;
         }
      };
    _init();

  })
