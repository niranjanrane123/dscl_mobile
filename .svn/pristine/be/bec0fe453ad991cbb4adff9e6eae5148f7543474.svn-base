angular.module('starter')

 .controller('complaintreceiptctrl', function ($scope, RestService, $ionicLoading, $stateParams,
		  toaster, $filter, ENV, $state, $localStorage,$sessionStorage,$ionicHistory) {

	 console.log("$localStorage.responselogindata---"+JSON.stringify($localStorage.responselogindata));
//		$scope.orgid = $localStorage.responselogindata.orgId;
		$scope.orgid = $localStorage.selectedorgID;
		$scope.userID = $localStorage.responselogindata.userId;
		$scope.loginUSername = $localStorage.responselogindata.firstName;
		$scope.loginmiddleName = $localStorage.responselogindata.middleName;
		$scope.loginlastname = $localStorage.responselogindata.lastName;
		var fullName = $scope.loginUSername.concat(" " + $scope.loginmiddleName).concat(" " +$scope.loginlastname);
		$scope.LoginMobileNo = $localStorage.responselogindata.mobileNo;

		console.log("complaintresponse on reciptpage--"+JSON.stringify($sessionStorage.complaintresponse));

	if($sessionStorage.complaintresponse){
		console.log("file complaint");
		 $scope.ReceiptToken = $sessionStorage.complaintresponse.complaintId;
		 $scope.dated = $sessionStorage.complaintresponse.dateOfRequest;
		 $scope.date = formatDate($scope.dated);
//		 $scope.ReceiptapplName = $sessionStorage.complaintresponse.applicationId;
		 $scope.ReceiptapplName = fullName;
		 $scope.ReceiptCompdept = $sessionStorage.complaintresponse.departmentComplaintDesc;
		 $scope.CompltypeReceipt = $sessionStorage.complaintresponse.complaintTypeDesc;
		 $scope.LocationReceipt = $sessionStorage.complaintresponse.locationEngName;
		 $scope.ReceiptDescrition = $sessionStorage.complaintresponse.description;

			 var escalationDetailsList = $sessionStorage.escresponse.escalationDetailsList;
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
	else
		{
			 console.log("reopen complaint-*-*-"+JSON.stringify($sessionStorage.reopensavedata));
			 $scope.ReceiptToken = $sessionStorage.RequestNoresponse.complaintId;
			 $scope.dated = $sessionStorage.RequestNoresponse.dateOfRequest;
			 $scope.date = formatDate($scope.dated);
//			 $scope.ReceiptapplName = $sessionStorage.RequestNoresponse.applicationId;
			 $scope.ReceiptapplName = fullName;
			 $scope.ReceiptCompdept = $sessionStorage.RequestNoresponse.departmentComplaintDesc;
			 $scope.CompltypeReceipt = $sessionStorage.RequestNoresponse.complaintTypeDesc;
			 $scope.LocationReceipt = $sessionStorage.RequestNoresponse.locationEngName;
			 $scope.ReceiptDescrition = $sessionStorage.RequestNoresponse.description;

				 var escalationDetailsList = $sessionStorage.escresponse.escalationDetailsList;
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


		/*$scope.dated = $sessionStorage.complaintresponse.document.dateOfRequest;
		 console.log("$scope.dated--"+$scope.dated);
		 $scope.date = formatDate($scope.dated);
		 $scope.ReceiptapplName = fullName;
		 $scope.ReceiptCompdept = $sessionStorage.complaintresponse.document.descriptions.GRIEVANCE_DEPARTMENT.description;
		 $scope.CompltypeReceipt = $sessionStorage.complaintresponse.document.descriptions.GRIEVANCE_COMPLAINT_TYPE.description;;
		 $scope.LocationReceipt = $sessionStorage.complaintresponse.document.careDetails.location.locNameEng;
		 $scope.ReceiptDescrition = $sessionStorage.complaintresponse.document.descriptions.GRIEVANCE_DESCRIPTION.description;*/

		/* $scope.ResposeData = $localStorage.complaintresponse.responseData;
		 $scope.receipttoken = $scope.ResposeData.requestNo;*/
/*if($sessionStorage.complaintresponse){
	console.log("complaintresponse on reciptpage--"+JSON.stringify($sessionStorage.complaintresponse));
	console.log("from file complaint");
		 $scope.compReceiptdata = $sessionStorage.complaintresponse.complaintAcknowledgementModel;
		 $scope.receipttoken = $scope.compReceiptdata.tokenNumber;
		 $scope.receiptapplname = fullName;
		 $scope.receiptcompdept = $scope.compReceiptdata.department;
		 $scope.compltypereceipt = $scope.compReceiptdata.complaintType;
		 $scope.locationreceipt = $scope.compReceiptdata.ward;
		 $scope.receiptdescrition = $scope.compReceiptdata.description;
	}
	else{
		console.log(" $sessionStorage.reopensavedata--"+JSON.stringify($sessionStorage.reopensavedata));
		console.log("from reopen complaint")
		 $scope.reOpenReceiptdata = $sessionStorage.reopensavedata.complaintAcknowledgementModel;
		 $scope.receipttoken = $scope.reOpenReceiptdata.tokenNumber;
		 $scope.receiptapplname = $scope.loginUSername;
		 $scope.receiptcompdept = $scope.reOpenReceiptdata.department;
		 $scope.compltypereceipt = $scope.reOpenReceiptdata.complaintType;
		 $scope.locationreceipt = $scope.reOpenReceiptdata.ward;
		 $scope.receiptdescrition = $scope.reOpenReceiptdata.description;
	}*/

		/* $scope.ResposecareApplicantDetails = $localStorage.complaintresponse.document.careApplicantDetails;
		 $scope.receiptapplname = $scope.ResposecareApplicantDetails.applicantFirstName;
		 $scope.ResposecareDetails = $localStorage.complaintresponse.document.careDetails;
		 $scope.receiptcompdept = $scope.ResposecareDetails.departmentComplaint.department.dpDeptdesc
		 $scope.receiptcomplainttype = $scope.ResposecareDetails.complaintType;
			$scope.receiptcompltype = $localStorage.deptcompltype.complaintTypes;
			for(var i=0;i<$scope.receiptcompltype.length;i++){
				var complID = $scope.receiptcompltype[i].compId;
				if($scope.receiptcomplainttype == complID)
					 $scope.compltypereceipt = $scope.receiptcompltype[i].complaintDesc;
			 }

		 $scope.receiptlocation = $scope.ResposecareDetails.location.locId;
		 console.log("location response---"+JSON.stringify($localStorage.locationresponse));
		 for(var i=0;i<$localStorage.locationresponse.length;i++){
			 var locationID = $localStorage.locationresponse[i].locationId;
			 if($scope.receiptlocation == locationID)
			 $scope.locationreceipt = $localStorage.locationresponse[i].locationName;
		 }

		 $scope.receiptdescrition =  $scope.ResposecareDetails.description;*/

		 /* log details  */


	 $scope.homepage = function()
	 {
		 $ionicHistory.nextViewOptions({
             disableBack: true,
             disableAnimate: true,
             historyRoot: true
         });
	 	$state.go("app.home");
	 }

    var _init = function (){  };
    _init();
  });
