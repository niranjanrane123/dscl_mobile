angular.module('starter')
.controller('EstateAmenityDetail', function ($scope, RestService,$localStorage,$ionicHistory, $ionicLoading, $stateParams, toaster, $filter, ENV, $state) {
  $scope.orgId = $localStorage.selectedorgID;
  $scope.back = function(){
   $ionicHistory.goBack()
  }
  var propId = $localStorage.propId;
	var _init = function (){
	      var postData = {
	        orgId:$scope.orgId,
	        categoryTypeId:null,
	        prefixName:null,
	        cpdValue:null,
	        type:null,
	        propId:propId,
	        fromDate:null,
	        toDate:null,
	        eventId:null,
	        capcityFrom:0,
	        capcityTo:0,
	        rentFrom:0.0,
	        rentTo:0.0
	      }
        RestService.getPropertyAmenityAndFacility(postData)
          .then(function(response){
              $scope.eventResponse = response;
              console.log("$scope.eventResponse: "+JSON.stringify($scope.eventResponse));
          },function(categoryerr){
            toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR_OCCURED'));
          })
		};
	_init();
});
