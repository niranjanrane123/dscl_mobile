angular.module('starter')

  .controller('SelectLanguageCtrl', function ($localStorage,$translate,$ionicPlatform,localStorageService,$scope, RestService, $ionicPlatform,$ionicListDelegate,$ionicLoading, $stateParams, toaster, $filter, ENV, $state) {

  $scope.active = '';
  $scope.setActive = function(type) {
      $scope.active = type;
      if(type === "Hindi"){
           $localStorage.langID = "2";
           $localStorage.english = false;
           $translate.use("2");
           $localStorage.langNewId = "2";
           $state.go("app.slider");

      }else{
          $localStorage.langID = "1";
          $translate.use("1");
          $localStorage.english = true;
          $localStorage.langNewId = "1";
          $state.go("app.slider");

      }
  };
  $scope.isActive = function(type) {
      return type === $scope.active;
  };



  })
