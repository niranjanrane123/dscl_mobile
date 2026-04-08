angular.module('starter')
  .controller('ComplaintPagectrl', function ($scope, RestService, $ionicLoading, $stateParams,
		  toaster, $filter, ENV, $state,$localStorage,$sessionStorage,$window) {



	  console.log("$localStorage.responselogindata---"+JSON.stringify($localStorage.responselogindata));
//		$scope.orgid = $localStorage.responselogindata.orgId;
    $scope.orgid = $localStorage.selectedorgID;
		$scope.userID = $localStorage.responselogindata.userId;
		$scope.loginUSername = $localStorage.responselogindata.firstName;
		$scope.LoginMobileNo = $localStorage.responselogindata.mobileNo;

$scope.reopen = function(){
	$ionicLoading.show({	template: $filter('translate')('LOADING')	});
	/*for reopen*/
		RestService.allgrieavance($scope.userID).then(function (response) {
				console.log("response--"+response);
			$scope.allgrievance = new Array();
				for(var i=0;i<response.length;i++)
				{
            if(response[i].status == "CLOSED" && response[i].lastDecision == "APPROVED")
            {
              $scope.allgrievance.push(response[i]);
            }
				}
				$sessionStorage.allgrievanceresponse = $scope.allgrievance;
//				$sessionStorage.allgrievanceresponse = response
//					$state.go("app.LodgeComplaint");
				$state.go("app.reopen");
//				}
				$ionicLoading.hide();
		},function (err) {
			console.log("---error--"+err);
			toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR_OCCURED'));
			$ionicLoading.hide();
		})
	};

 $scope.filecomplaint = function (){
    	$ionicLoading.show({	template: $filter('translate')('LOADING')	});

    	        /*Department type*/
              RestService.deptprefix($scope.orgid).then(function (response){
                console.log("deptresponse--"+response);
                if(response==undefined || response == null || response=="")
                  {
                    $ionicLoading.hide();
                    return false;
                  }
                else
                  {
                    $sessionStorage.deptresponse = response;
                    $state.go("app.LodgeComplaint");
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
  if($localStorage.langID == "2"){
    $ionicLoading.show({ template: 'लोड हो रहा है...'    });
  }else{
    $ionicLoading.show({ template: 'Loading...'    });
  }
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
  if($localStorage.langID == "2"){
    $ionicLoading.show({ template: 'लोड हो रहा है...'    });
  }else{
    $ionicLoading.show({ template: 'Loading...'    });
  }

}

_init();

});
