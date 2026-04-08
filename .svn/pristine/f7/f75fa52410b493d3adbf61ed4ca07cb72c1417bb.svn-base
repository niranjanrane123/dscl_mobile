angular.module('starter')

  .controller('MenuCtrl', function ($scope,$localStorage,$translate, RestService, $ionicLoading, $ionicPlatform,$stateParams, toaster, $filter, ENV, $state) {
//  	$scope.LogoutAndHome;
//  	$scope.showMenuIcon;
//            if($localStorage.responselogindata)
//                 {
//                   $scope.showMenuIcon = true;
//                   alert($scope.showMenuIcon)
//                 }else{
//                   $scope.showMenuIcon = false;
//                   alert($scope.showMenuIcon)
//                 }
    $scope.isLoggedIn = function(){
    if($localStorage.responselogindata){
     return true
    }else{
     return false
    }

    }

    $scope.hiBtn = "H";
    $scope.enBtn = "E";

    $scope.changeLanguage = function(value){
      if(value === "H"){
        $('#lang1').removeClass('activeLang');
        $('#lang2').addClass('activeLang');
        $translate.use("2");
        $localStorage.langID = "2";
        $localStorage.english = true;
        $localStorage.langNewId = "2";
        console.log("langId:"+ $localStorage.langNewId)
        _init();
     }else{
         $('#lang2').removeClass('activeLang');
         $('#lang1').addClass('activeLang');
         $translate.use("1");
         $localStorage.langID = "1";
         $localStorage.english = false;
         $localStorage.langNewId = "1";
         console.log("langId:"+ $localStorage.langNewId)
         _init();
     }
    };

    var _init = function()
    {

    };

_init();

  })
