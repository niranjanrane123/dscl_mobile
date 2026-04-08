angular.module('starter')
	.controller('swmComplainCtrl', function ($scope, RestService, $ionicLoading, $stateParams,
		toaster, $filter, ENV, $state, $localStorage, $sessionStorage, $ionicPopup, $ionicModal, $rootScope, $cordovaCapture) {

		$scope.respcompainList = null;

		//only calls when token is null
		$scope.getComplaintList=function(){
			RestService.getComplaintList($localStorage.responselogindata.mobileNo).then(function (resp) {
				console.log("actionResponse--" + JSON.stringify(resp));
				$scope.respcompainList = resp;
			   if (resp) {
				   console.log("actionResponse11--" + JSON.stringify(resp.SWM.complaints));
				   if (resp.SWM.complaints) {
					   $scope.respcompainList = resp.SWM.complaints;
					   // console.log("actionResponse--" + JSON.stringify($scope.respcompainList.lenght));
					   console.log("actionResponse22--" + $scope.respcompainList);
				   }else{
					$ionicLoading.hide();
					$scope.errorMsg=true
					// toaster.error($filter('translate')('SWMERR'))
				   }
			   }
			   $ionicLoading.hide();
		   },
			   function (err) {
				   $ionicLoading.hide();
				   //toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR'));
				   //toaster.error($filter('translate')('SWMERROR'));
				   console.log("Error in SWM", err);
				   toaster.error($filter('translate')('SWMTHIRDPARTYERROR'));
			   })
		}
			$ionicLoading.show($filter('translate')('LOADING'));
		


		var _init = function () {
			$scope.errorMsg=false

		if ($rootScope.swmAccessToken == null) {
			RestService.getAccessToken().then(function (data) {
				$rootScope.swmAccessToken = data.access_token;
				$scope.getComplaintList();
			},
				function (err) {
				})

		} else {
			$scope.getComplaintList();
		}
	}
	_init()
		// $scope.respcompains = $scope.respcompainList.SWM.complaints;
		//api for calling list param ph no

	});

