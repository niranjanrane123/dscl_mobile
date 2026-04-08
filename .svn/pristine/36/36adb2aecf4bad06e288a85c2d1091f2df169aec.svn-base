angular.module('starter')

  .controller('FaqCtrl', function ($scope, $sessionStorage,RestService, $ionicLoading, $ionicPlatform,$stateParams,$localStorage, toaster, $filter, ENV, $state) {
	$scope.langID=$localStorage.langID;
	$scope.groups = [];
	$scope.displayans = false
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



//	                 $scope.toggleGroupData = function(group) {
//	                   if (group == null) {
//	                    $scope.displayans = false
//	                   } else {
//
//	                     $scope.displayans = true;
//	                     $scope.displayans = null;
//	                   }
//	                 };
//	                 $scope.isGroupShown = function(group) {
//	                   return $scope.shownGroup === group;
//	                 };


					 //new integration
					 var _init = function()
					 {
					   $scope.faqalldata=[];
					   if($localStorage.langID == "2"){
						  $ionicLoading.show({ template: 'लोड हो रहा है...'    });
						}else{
						  $ionicLoading.show({ template: 'Loading...'    });
						}


					  RestService.getFaqData(1).then(function (response){
								 if(response==undefined || response == null || response=="")
								   {
									 $ionicLoading.hide();
									 return false;
								   }
								 else
								   {
									$scope.faqalldata=JSON.stringify(response);
								$sessionStorage.faqalldata = response


									  for(var i = 0 ;i<response.length; i++){
										  console.log('$scope.langID', $scope.langID);
										  if($scope.langID == 1 ){
											  var faqallDatadata = {
												  name : response[i].questionEn,
												  value:response[i].id,
												  item:response[i].answerEn,
												  items: [{ subId: response[i].answerEn }]

											  }
											  $scope.groups.push(faqallDatadata)
										  }else{
											var faqallDatadata = {
												name : response[i].questionReg,
												value:response[i].id,
												item:response[i].answerReg,
												items: [{ subId: response[i].answerReg }]

											}
											$scope.groups.push(faqallDatadata)
										  }

									  }

								   }
								 $ionicLoading.hide();
							   },function (err) {
								 //toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR'));
								 toaster.error($filter('translate')('FAQEERROR'));
								 $ionicLoading.hide();
						 })
					 };

				   _init();
                  $scope.toggleGroup = function(group) {
	                   if ($scope.isGroupShown(group)) {
	                     $scope.shownGroup = null;
	                   } else {
	                     $scope.shownGroup = group;
	                   }
	                 };
	                 $scope.isGroupShown = function(group) {
	                   return $scope.shownGroup === group;
	                 };


  });