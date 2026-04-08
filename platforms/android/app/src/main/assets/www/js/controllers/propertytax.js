angular.module('starter').controller('PropertyPageCtrl', function ($scope, $sessionStorage, $ionicPopup, $location, RestService, $ionicLoading, $stateParams, toaster,
    $filter, ENV, dateFilter, $state, $ionicSideMenuDelegate, $rootScope, $localStorage) {

    $scope.getDashBoardData = [];
    $scope.getDashBoardDataPage = [];
    $scope.totalPagination = 0;
    $scope.currentPagination = 0;
    $scope.currentPaginationArray = [];
    $scope.mysearch = '';
    $scope.langID = $localStorage.langID;
    $scope.orgid = $localStorage.selectedorgID;
    $scope.tokennumber;

    $scope.respcompainList = [];
	$scope.generatedTokenValue;
   
    $scope.getNumber = function (num) {
      return new Array(num);
    }
    var _init = function () {

    };
    _init();

    $scope.getPropertTaxFunction = function (chlllanId) {
	// 	console.log('$scope.tokennumber', $scope.tokennumber);
	// 	if( $scope.tokennumber == undefined){
	// 		console.log('hi')
	// 	} else{
	// 		console.log('hello')
	// 	}
      $ionicLoading.show({ template: $filter('translate')('LOADING') });
	  RestService.getPropertyTaxToken().then(function (req) {
		  console.log('token value', req);
		  $scope.generatedTokenValue = req.data;
		RestService.getPropertyTaxId(chlllanId).then(function (resp) {
			console.log('resp', resp)
			$ionicLoading.hide();
			  $scope.respcompainList = resp.Bill[0];
			  console.log('$scope.respcompainList',$scope.respcompainList)
	 
		   
		  },
			function (err) {
			  $ionicLoading.hide();
			  toaster.error($filter('translate')('NO_DATA_FOUND')/* , $filter('translate')('RECORDNOTFOUND') */);
			   
			})
	  },function (err) {
		$ionicLoading.hide();
		toaster.error($filter('translate')('PROPERTYERROR')/* , $filter('translate')('RECORDNOTFOUND') */);		 
	  });
	 
     
    }

    $scope.Payment = function () {
		console.log('$scope.generatedTokenValue', $scope.generatedTokenValue);
		$ionicLoading.show({ template: $filter('translate')('LOADING') });
		let Postdata = {
				"RequestInfo": {
				"apiId": "string",
				"ver": "string",
				"ts": 0,
				"action": "string",
				"did": "string",
				"key": "string",
				"msgId": "string",
				"authToken": $scope.generatedTokenValue.access_token
				},
			  "Payment":{
				"tenantId":"uk.dehradun",
				"instrumentNumber":"dsd",
				"instrumentDate":"112232323",
				"totalAmountPaid":$scope.respcompainList.totalAmount,
				"paymentMode":"CASH",
				"paidBy":"xyz",
				"mobileNumber": $scope.generatedTokenValue.UserRequest.mobileNumber,
				"paymentDetails":[{
					"businessService":"PT",
					"billId":"ac5d6e70-4077-4aa5-8cbf-eace466782ae",
					"totalAmountPaid": $scope.respcompainList.totalAmount
				}
					]	
			  }
			
		}
		RestService.properyPayment(Postdata).then(function (responseOPTdata){
			console.log("responseOPTdata---"+JSON.stringify(responseOPTdata));
				 $ionicLoading.hide();
				 var confirmPopup = $ionicPopup.show({

					title: $filter('translate')('message'),
					template: $filter('translate')('PAYMENTMESSAGE'),
		  
					buttons: [{
					  text: $filter('translate')('CANCEL'),
					  type: 'button button-block  customBgColor',
					},
					{
					  text: $filter('translate')('OK'),
					  type: 'button button-block  customBgColor',
		  
					  onTap: function () {
						$state.go('app.home');
						//					            	 ionic.Platform.exitApp();
					  }
					}]
				  });
				},
				function (err) {
					console.log('err-->',err);
					let errorArray = new Array();
					errorArray = err.data.Errors;	

					var msg = errorArray[0].message;
					$ionicLoading.hide();
					//toaster.error($filter('translate')('PROPERTYERROR')/* , $filter('translate')('RECORDNOTFOUND') */);

					var confirmPopup = $ionicPopup.alert({

						title: $filter('translate')('message'),
						template: $filter('translate')(msg),
			  
						buttons: [{
						  text: $filter('translate')('CANCEL'),
						  type: 'button button-block  customBgColor',
						},
						{
						  text: $filter('translate')('OK'),
						  type: 'button button-block  customBgColor',
			  
						  onTap: function () {
							$state.go('app.home');
							//					            	 ionic.Platform.exitApp();
						  }
						}]
					  });
				  })
		}

  })