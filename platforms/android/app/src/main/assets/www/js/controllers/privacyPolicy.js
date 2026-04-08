angular.module('starter')

  .controller('PrivacyPolicyCtrl', function ($scope,RestService,$localStorage, $ionicPlatform,$ionicListDelegate,$ionicLoading, $stateParams, toaster, $filter, ENV, $state) {

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

    $scope.cardshow = true;
      $scope.cardshow1 = false;

      $scope.card = function($event)
      {
    	  $event.stopPropagation();
    	  $scope.cardshow = !$scope.cardshow;
    	  $scope.cardshow1 = false;
    	  $ionicListDelegate.closeOptionButtons();
      }

      $scope.card1 = function($event)
      {
    	  $event.stopPropagation();
    	  $scope.cardshow1 = !$scope.cardshow1;
    	  $scope.cardshow = false;
    	  $ionicListDelegate.closeOptionButtons();
      }

      $scope.adddata = false;
	    $scope.checkedOrNot = function (addinfochecked) {

	        if (addinfochecked) {
	            $scope.adddata = true;
	        } else {

	        	 $scope.adddata = false;
	        }
	    };


     /* $scope.click1 = function($event) {
    	    $event.stopPropagation();
    	    $scope.show1 = !$scope.show1;
    	    $scope.show2 = false;
    	    $ionicListDelegate.closeOptionButtons(); }*/


  })
