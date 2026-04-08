angular.module('starter')
  .controller('nidanStatusDetailctrl', function ($scope, RestService, $ionicLoading, $stateParams,
		  toaster, $filter, ENV, $state, $ionicPopup,$sessionStorage, $localStorage,$ionicHistory) {
$scope.complaintStatusFormResponse = false;
$scope.esctable = false;
$scope.tokenstatus = false;
$scope.mobilestatus = false;

$scope.data = {}
//console.log("complaintstatusresponse--"+JSON.stringify($sessionStorage.complaintstatusresponse));
//console.log("logdetailresponse--"+JSON.stringify($sessionStorage.logdetailresponse));

/*if($sessionStorage.nidanStatusresponse){

    var statusresponse = $sessionStorage.nidanStatusresponse
    $scope.tokenNo = statusresponse.tokenNumber;
    $scope.Date1 = statusresponse.date;
    $scope.date = formatDate(statusresponse.date);
    $scope.complainantName = statusresponse.complainantName;
    $scope.complaintType = statusresponse.complaintType;
    $scope.complaintSubType = statusresponse.complaintSubType;
    $scope.ward = statusresponse.ward;
    $scope.description = statusresponse.description;
    $scope.status = statusresponse.status
    $scope.tokenstatus = true;
    $scope.mobilestatus = false;
*//* log details *//*

*//*      var escalationDetailsList = statusresponse.actions;

      var tempTest = 0;
      if(escalationDetailsList.length >= 0){

        $scope.escalDetailsList = [];
        for(var i=0;i<escalationDetailsList.length;i++){
            $scope.escalDetailsList.push({
              datetime : formatDate(escalationDetailsList[i].dateOfAction),
              action : escalationDetailsList[i].decision,
              empName: escalationDetailsList[i].empName,
              designation: escalationDetailsList[i].empGroupDescEng,
              Email : escalationDetailsList[i].empEmail,
              remarks : escalationDetailsList[i].comments,
            })
          }
            $scope.esctable = true;
            $ionicLoading.hide();
        }*//*
}else{*/

    console.log("$sessionStorage.nidanMobileNoresponse");
    $scope.tokenstatus = false;
    var mobileStatusList = $sessionStorage.nidanStatusresponse
     if(mobileStatusList.length >= 0){
        $scope.mobileStatus = [];
        for(var i=0;i<mobileStatusList.length;i++){
            $scope.mobileStatus.push({
              tokenNo : mobileStatusList[i].applicationId,
              date : formatDate(mobileStatusList[i].createdDate),
              complaintType : mobileStatusList[i].departmentComplaintDesc,
              complaintSubType : mobileStatusList[i].complaintTypeDesc,
              ward : mobileStatusList[i].locationEngName,
              description : mobileStatusList[i].description,
         })
      }
        $scope.mobilestatus = true;
          $ionicLoading.hide();
    }
//}

/*---------------------------Selected TABLE CLICK--------------------------------------------------*/

$scope.selectedToken = function(tokenNoselected){
	$ionicLoading.show({	template: $filter('translate')('LOADING')	});
  console.log("token---"+tokenNoselected);
  RestService.getGrievanceStatus(tokenNoselected).then(function (nidanStatusresponse) {
     if(nidanStatusresponse != "" || nidanStatusresponse != undefined)
       {
                 var statusresponse = nidanStatusresponse
                   $scope.tokenNo = statusresponse.tokenNumber;
                   $scope.Date1 = statusresponse.date;
                   $scope.date = formatDate(statusresponse.date);
                   $scope.complainantName = statusresponse.complainantName;
                   $scope.complaintType = statusresponse.complaintType;
                   $scope.complaintSubType = statusresponse.complaintSubType;
                   $scope.ward = statusresponse.ward;
                   $scope.description = statusresponse.description;
                   $scope.status = statusresponse.status
                   $scope.tokenstatus = true;
                   $scope.mobilestatus = false;
               /* log details */

                     var escalationDetailsList = statusresponse.actions;
                     var tempTest = 0;
                     if(escalationDetailsList.length >= 0){

                       $scope.escalDetailsList = [];
                       for(var i=0;i<escalationDetailsList.length;i++){
                           $scope.escalDetailsList.push({
                             datetime : formatDate(escalationDetailsList[i].dateOfAction),
                             action : escalationDetailsList[i].decision,
                             empName: escalationDetailsList[i].empName,
                             designation: escalationDetailsList[i].empGroupDescEng,
                             Email : escalationDetailsList[i].empEmail,
                             remarks : escalationDetailsList[i].comments,
                           })
                         }
                           $scope.esctable = true;
                           $ionicLoading.hide();
                       }
                       $state.go("app.nidanStatusdetail");
       }else{
         toaster.error($filter('translate')('ERROR'), $filter('translate')('Please Enter Valid Token Number'));
          $ionicLoading.hide();
        }
          $ionicLoading.hide();
     },function (err){
            $ionicLoading.hide();
            toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR'));
          })

}


$scope.homepage = function()
{
	$sessionStorage.$reset();
	 $ionicHistory.nextViewOptions({
         disableBack: true,
         disableAnimate: true,
         historyRoot: true
     });

	$state.go("app.LoginPage");
}

var _init = function (){  };
    _init();
  });
