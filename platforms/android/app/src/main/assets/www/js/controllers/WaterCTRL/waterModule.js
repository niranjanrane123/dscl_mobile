angular.module('starter')
  .controller('waterModuleCtrl', function ($scope, RestService, $ionicLoading, $stateParams, toaster, $filter,
	ENV, $state,  $localStorage,$ionicPlatform,$sessionStorage) {

	  console.log("$localStorage.responselogindata---"+JSON.stringify($localStorage.responselogindata));
//		$scope.orgid = $localStorage.responselogindata.orgId;
		$scope.orgid = $localStorage.selectedorgID;
		$scope.userID = $localStorage.responselogindata.userId;
		$scope.loginUSername = $localStorage.responselogindata.firstName;
		$scope.LoginMobileNo = $localStorage.responselogindata.mobileNo;


	  var deregisterSecond = $ionicPlatform.registerBackButtonAction(
		      function() {
		    	  $state.go("app.home");
		      }, 100
		    );
		    $scope.$on('$destroy', deregisterSecond);

		    $scope.appltype = function()
			  {
						$ionicLoading.show({	template: $filter('translate')('LOADING')			});

				var lookUpCode = "APT";
				RestService.getNHPrefixData(lookUpCode,$scope.orgid).then(function (response) {
					console.log("response=="+response);
					  if(response==undefined || response==null || response=="")
					  {
						  toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR_OCCURED'));
						  $ionicLoading.hide();
						  return false;
					  }
					  else
					  {
						  $sessionStorage.response = response;
//							$state.go("app.NewWaterConnection");
							$state.go("app.NWCApplicantInfo");
						  $ionicLoading.hide();
					  }
					    $ionicLoading.hide();
					}, function (err) {
						toaster.error($filter('translate')('ERROR'), $filter('translate')(''));
						$ionicLoading.hide();
					})
			  };

			  $scope.reconndata1 = function()
				{
				  	$state.go("app.waterReconnection");
				}

  $scope.reconndata = function()
	{
		 $ionicLoading.show({	template: 'Loading..'	});
			RestService.reconnectionsearch($scope.orgid,$scope.userID).then(function (responsedata){
			 console.log("responsedata--"+JSON.stringify(responsedata));
			   if(responsedata.responseDTOs == null || responsedata.responseDTOs == undefined
					 || responsedata.responseDTOs == ""){
						toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR_OCCURED'));
						$ionicLoading.hide();
						return false;
				  	}
				else{
						$sessionStorage.responsedata = responsedata.responseDTOs;
						console.log("reconnectionSerach--"+JSON.stringify(responsedata.responseDTOs));
						$state.go("app.waterReconnection");
						$ionicLoading.hide();
					}
			},function (err){
				toaster.error($filter('translate')('ERROR'), $filter('translate')(''));
				$ionicLoading.hide();
			})
	}



    var _init = function (){

    };
    _init();
  });
