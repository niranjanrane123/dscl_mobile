angular.module('starter')
  .controller('nidanHomePagectrl', function ($scope, RestService, $ionicLoading, $stateParams,
		  toaster, $filter, ENV, $state,$localStorage,$sessionStorage,$window) {

 $scope.filecomplaint = function (){

       	$ionicLoading.show({	template: $filter('translate')('LOADING')	});
        	 /*DISTRICT LIST */
        	var lookUpCode = "DIS";
    		RestService.getNHPrefixData(lookUpCode,'0').then(function (response){
    			console.log("District list--"+response);
    			if(response==undefined || response == null || response=="")
    				{
    					$ionicLoading.hide();
    					return false;
    				}
    			else
    				{
    					$sessionStorage.districtResponse = response;
//    			alert("districtResponse----"+JSON.stringify($sessionStorage.districtResponse));
    					$state.go("app.nidanApplicationDetail")
    					$ionicLoading.hide();
    				}
    			$ionicLoading.hide();
    		},function (err) {
    			toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR'));
    			$ionicLoading.hide();
    		})
};

/*---------------calling function--------------------------*/
function onSuccess(result){
  console.log("Success:"+result);
}
function onError(result) {
  console.log("Error:"+result);
}

$scope.callNumber=function(pid){
var confirmIn = $scope.confirmboxIn();
  if(confirmIn == "Y"){
    $scope.number=document.getElementById(pid).textContent;
    window.plugins.CallNumber.callNumber(onSuccess, onError, $scope.number, false);
}else{ return; }
}

$scope.confirmboxIn = function () {
  if ($window.confirm("Note: The Time to File a Complaint is from 8:00am To 6:00pm.")) return "Y";
	 else return "N";
}


var _init = function()
{

}
//
//_init();

});
