angular.module('starter')
	.controller('swmComplainCtrl', function ($scope, RestService, $ionicLoading, $stateParams,
		toaster, $filter, ENV, $state, $localStorage, $sessionStorage, $ionicPopup, $ionicModal, $rootScope, $cordovaCapture) {

		$scope.respcompainList = null;

		//only calls when token is null
		if ($localStorage.langID == "2") {
			$ionicLoading.show({ template: 'लोड हो रहा है...' });
		} else {
			$ionicLoading.show({ template: 'Loading...' });
		}
		if ($rootScope.swmAccessToken == null) {
			RestService.getAccessToken().then(function (data) {
				$rootScope.swmAccessToken = data.access_token;
				RestService.getComplaintList($localStorage.responselogindata.mobileNo).then(function (resp) {
					$scope.respcompainList = resp;
					// if (resp.SWM.complaints.lenght > 0) {
					// 	$scope.respcompainList = resp.SWM.complaints;
					 	console.log("actionResponsew--" + JSON.stringify($scope.respcompainList));
					// }
					if (resp) {
						console.log("actionResponse--" + JSON.stringify(resp.SWM.complaints.lenght));
						if (resp.SWM.complaints.lenght > 0) {
							$scope.respcompainList = resp.SWM.complaints;
							console.log("actionResponse--" + JSON.stringify($scope.respcompainList.lenght));
						}
					}
					$ionicLoading.hide();
				},
					function (err) {
						$ionicLoading.hide();
						//toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR'));
						toaster.error($filter('translate')('SWMERROR'));
					})
			},
				function (err) {
				})

		} else {
			RestService.getComplaintList($localStorage.responselogindata.mobileNo).then(function (resp) {
				 console.log("actionResponse--" + JSON.stringify(resp));
				 $scope.respcompainList = resp;
				if (resp) {
					console.log("actionResponse11--" + JSON.stringify(resp.SWM.complaints));
					if (resp.SWM.complaints) {
						$scope.respcompainList = resp.SWM.complaints;
						// console.log("actionResponse--" + JSON.stringify($scope.respcompainList.lenght));
						console.log("actionResponse22--" + $scope.respcompainList);
					}
				}
				$ionicLoading.hide();
			},
				function (err) {
					$ionicLoading.hide();
					//toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR'));
					toaster.error($filter('translate')('SWMERROR'));
				})
		}
		// $scope.respcompains = $scope.respcompainList.SWM.complaints;
		//api for calling list param ph no

	});

