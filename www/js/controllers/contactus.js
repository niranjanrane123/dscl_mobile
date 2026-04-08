//angular.module('starter')
//
//  .controller('ContactusCtrl', function ($scope, RestService, $ionicPlatform,$ionicLoading, $stateParams, toaster, $filter, ENV,
//   $state) {
//     $scope.save = function(){
//    	 $ionicLoading.show({	template: 'Loading...'	});
//    	  var postData = {
//                "phoneNo": $scope.mobileno,
//                "descQuery": $scope.desc,
//                "firstName": $scope.firstname,
//                "lastName": $scope.lastname,
//                "emailId": $scope.EmailID,
//                "isDeleted": null,
//                "orgId": $scope.orgid,
//                "empId": $scope.userID,
//                "langId":$scope.langid,
//                "lmodDate": null,
//                "updatedBy": null,
//                "updatedDate": null,
//                "lgIpMac": null
//    	  }
//    	  RestService.saveContachData(postData).then(function (response) {
//
//          					  if(response==undefined || response==null || response=="")
//          					  {
//          						  toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR_OCCURED'));
//          						  $ionicLoading.hide();
//          						  return false;
//          					  }
//          					  else if(response == true)
//          					  {
//          					     alert("Data Successfully Saved");
//
//                                    $scope.mobileno: '',
//                                    $scope.firstname: '',
//                                    $scope.lastname: '',
//                                    $scope.EmailID: '',
//                                    $scope.desc: ''
//
//          						  $ionicLoading.hide();
//          					  }else{
//          					   toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR_OCCURED'));
//                                     						  $ionicLoading.hide();
//                                     						  return false;
//          					  }
//          					    $ionicLoading.hide();
//          					}, function (err) {
//          						toaster.error($filter('translate')('ERROR'), $filter('translate')(''));
//          						$ionicLoading.hide();
//          					})
//    		 alert("save:"+ $scope.firstname + "\n" + $scope.lastname + "\n" + $scope.mobileno + "\n" + $scope.EmailID + "\n" + $scope.desc);
//    	 }
//  	  var deregisterSecond = $ionicPlatform.registerBackButtonAction(
//  		      function() {
//                         $state.go('app.home');
//  		      }, 100
//  		 );
//  	$scope.$on('$destroy', deregisterSecond);
//    $scope.fetchSelected = function(){
//
//    	 }
//    	  var _init = function (){
//               RestService.contactuslist($scope.orgid).then(function (response){
//                              console.log("deptresponse--"+response);
//                              if(response==undefined || response == null || response=="")
//                                {
//                                  $ionicLoading.hide();
//                                  toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR'));
//                                  return false;
//                                }
//                              else
//                                {
//                                  $scope.response = response;
//                                  console.log("dfgh"+$scope.response);
//                                  console.log("dfgh"+typeof($scope.response));
//                                  $ionicLoading.hide();
//                                }
//                              $ionicLoading.hide();
//                            },function (err) {
//                              toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR'));
//              			          $ionicLoading.hide();
//              	            })
//             };
//             _init();
//
//  })
