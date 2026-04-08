angular.module('starter')

 .controller('nidanReceiptctrl', function ($scope, RestService, $ionicLoading, $stateParams,
		  toaster, $filter, ENV, $state, $localStorage,$sessionStorage,$ionicHistory) {

$sessionStorage.applicantDTO
$scope.loginUSername = $sessionStorage.applicantDTO.fName;
		$scope.loginlastname = $sessionStorage.applicantDTO.lName;
		var fullName = $scope.loginUSername.concat(" " +$scope.loginlastname);

	if($sessionStorage.complaintresponse){
		console.log("file complaint");
		 $scope.ReceiptToken = $sessionStorage.complaintresponse.applicationId;
		 $scope.dated = $sessionStorage.complaintresponse.dateOfRequest;
		 $scope.date = formatDate($scope.dated);
//		 $scope.ReceiptapplName = $sessionStorage.complaintresponse.applicationId;
		 $scope.ReceiptapplName = fullName;
		 $scope.ReceiptCompdept = $sessionStorage.complaintresponse.departmentComplaintDesc;
		 $scope.CompltypeReceipt = $sessionStorage.complaintresponse.complaintTypeDesc;
		 $scope.LocationReceipt = $sessionStorage.complaintresponse.locationEngName;
		 $scope.ReceiptDescrition = $sessionStorage.complaintresponse.description;

			 var escalationDetailsList = $sessionStorage.escresponse;
			 if(escalationDetailsList.length >= 0){
			 	$scope.escalDetailsList = [];
			 	for(var i=0;i<escalationDetailsList.length;i++){
			 		$scope.escalDetailsList.push({
			 			level : escalationDetailsList[i].level,
			 			duration : escalationDetailsList[i].sla,
			 			empName: escalationDetailsList[i].empName,
			 			designation: escalationDetailsList[i].designation,
			 			department : escalationDetailsList[i].department,
			 			email : escalationDetailsList[i].email,
			 		})
			 	  }
			 		$scope.esctable = true;
			 		$ionicLoading.hide();
			 }
	}


	 $scope.homepage = function()
	 {
		 $ionicHistory.nextViewOptions({
             disableBack: true,
             disableAnimate: true,
             historyRoot: true
         });
	 	$state.go("app.LoginPage");
	 }


    var _init = function (){

    };
    _init();
  });
