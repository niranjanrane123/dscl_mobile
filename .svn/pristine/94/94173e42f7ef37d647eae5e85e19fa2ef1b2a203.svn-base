angular.module('starter')

  .controller('termsandConditionCtrl', function ($scope, RestService,$localStorage, $ionicPlatform,$ionicListDelegate,$ionicLoading, $stateParams, toaster, $filter, ENV, $state) {

  	  var deregisterSecond = $ionicPlatform.registerBackButtonAction(
  		      function() {
                  if($localStorage.responselogindata){
                      $state.go('app.home');
                     }else{
                     $state.go('app.LandingPage');
                     }
  		      }, 100
  		    );
  	$scope.$on('$destroy', deregisterSecond);



  })
