angular.module('starter')

  .controller('PublicNoticeCtrl', function ($scope,$ionicPlatform, RestService, $ionicLoading, $stateParams, toaster, $filter, ENV, $state) {
	  var deregisterSecond = $ionicPlatform.registerBackButtonAction(
  		      function() {
                         $state.go('app.home');
  		      }, 100
  		    );
  	$scope.$on('$destroy', deregisterSecond);


  })
