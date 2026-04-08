angular.module('starter')
  .controller('nidanComplaintRegister', function ($scope, RestService, $ionicLoading, $stateParams,
		  toaster, $filter, ENV, $state,$localStorage,$sessionStorage,$ionicPopup,$ionicModal) {

//alert("SApplicantDTO----"+JSON.stringify($sessionStorage.applicantDTO));
//alert("districtResponse----"+JSON.stringify($sessionStorage.districtResponse));
 $scope.districtOptions = new Array();
	for(var i=0;i<$sessionStorage.districtResponse.length;i++){
		$scope.districtOptions.push({
		districtID : $sessionStorage.districtResponse[i].lookUpId,
		districtName : $sessionStorage.districtResponse[i].descLangFirst
	})
}
/*-----------------DISTRICT CHANGE---------------------*/
$scope.nidanOrganisation;
$scope.distrcitchange = function()
{
	$ionicLoading.show({	template:$filter('translate')('LOADING')	});
	console.log("$scope.disrict--"+$scope.disrict);
  $scope.$watch('district', function() {

      RestService.organisationList($scope.district).then(function (response){
            console.log("Organisation list--"+response);
            if(response==undefined || response == null || response=="")
              {
                $ionicLoading.hide();
                return false;
              }
            else
              {
                 $scope.organisationOptions = new Array();
                	for(var i=0;i<response.length;i++){
                		$scope.organisationOptions.push({
                		id : response[i].orgid,
                		name : response[i].onlsOrgname
                	})
                }
                $ionicLoading.hide();
              }
            $ionicLoading.hide();
          },function (err) {
            toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR'));
            $ionicLoading.hide();
          })
  });
}

/*-----------------ORGANISATION CHANGE---------------------*/
$scope.organisationChange= function()
{
  console.log("nidanORgan---"+$scope.nidanOrganisation)
  $scope.$watch('district', function() {
    RestService.deptprefix($scope.nidanOrganisation).then(function (response){
      console.log("deptresponse--"+response);
         if(response==undefined || response == null || response=="")
           {
             $ionicLoading.hide();

           }
         else
           {
             $scope.departmentOptions = new Array();
                for(var i=0;i<response.length;i++){
                  $scope.departmentOptions.push({
                   	id : response[i].department.dpDeptid,
                   	name : response[i].department.dpDeptdesc
                 })
             }
              $ionicLoading.hide();
           }
           $ionicLoading.hide();
      },function (err) {
       toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR'));
    	 $ionicLoading.hide();
    	})
  });
}
/*----------------------------Department CHANGE--------------------------------------------------*/
$scope.departmentType;
$scope.departmentChange = function(){
  $ionicLoading.show({	template: $filter('translate')('LOADING')	});
  console.log("departmentType---"+$scope.departmentType);
    $scope.$watch('departmentType', function(newVal) {

	  RestService.finddeptcompltype($scope.departmentType,$scope.nidanOrganisation)
	  .then(function (complaintTypeResponse) {
		console.log("complsubtyperesponse>->-"+JSON.stringify(complaintTypeResponse));
						if(complaintTypeResponse==undefined || complaintTypeResponse == null || complaintTypeResponse=="")
						  {
                 $ionicLoading.hide();
                 return false;
						  }
						  else
						  {
								$scope.compltypeoption = new Array();
									for(var i=0;i<complaintTypeResponse.length;i++){
											$scope.compltypeoption.push({
											comptypeID : complaintTypeResponse[i].compId,
	 										comptypeDesc : complaintTypeResponse[i].complaintDesc
										})
									}
                  //	deptloc();
							  $ionicLoading.hide();
						  }
					},function (err){
						$ionicLoading.hide();
						toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR'));
				})

		    });
 		};
/*----------------------------Complaint Type CHANGE--------------------------------------------------*/
$scope.complaintTypeChange = function()
{
    $ionicLoading.show({	template: $filter('translate')('LOADING')	});

   RestService.deptdefinedlocation($scope.nidanOrganisation,$scope.departmentType).then(function (locationperesponse) {
		console.log("peresponse>->-"+JSON.stringify(locationperesponse));
						if(locationperesponse==undefined || locationperesponse == null || locationperesponse=="")
						  {
							 $ionicLoading.hide();
						  	 return false;
						  }
						  else
						  {
                $sessionStorage.locationresponse = locationperesponse;
                  $scope.locationoptions = new Array();
                    for(var i=0;i<locationperesponse.length;i++){
                      $scope.locationoptions.push({
                      locationid : locationperesponse[i].locId,
                      locationname : locationperesponse[i].locNameEng
                    })
                  }
							$ionicLoading.hide();
						  }
					},function (err) {
						$ionicLoading.hide();
						toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR'));
				})
}

$scope.locationChange = function(){
	$scope.$watch('nidanPincode', function(newVal) {
	 for(var i=0;i<$sessionStorage.locationresponse.length;i++){
		 if($scope.nidanLocation == $sessionStorage.locationresponse[i].locId)
			 {
				 var locationPincode = $sessionStorage.locationresponse[i].pincode
				 $scope.nidanPincode = locationPincode;
			 }
	 }
  });
}
/*----------------------------Complaint Save--------------------------------------------------*/

$scope.nidanSaveComplaint = function(){

  $ionicLoading.show({			template: $filter('translate')('LOADING')	});

//console.log("modal doc--"+JSON.stringify($sessionStorage.uploadfinaldata));
$sessionStorage.applicantDTO.orgId = $scope.nidanOrganisation;
console.log("applicantDTO --"+JSON.stringify($sessionStorage.applicantDTO));

 var complaintType= "New Complaint";
	RestService.lodgecomplaintsave($scope.nidanPincode,$scope.departmentType,$scope.nidanComplaintType,
		$scope.nidanDescription,$scope.nidanLocation,$scope.nidanOrganisation,$sessionStorage.userID,
		complaintType,$sessionStorage.applicantDTO,$sessionStorage.uploadfinaldata)
		.then(function(complaintresponse){
			console.log("complaintresponse--->"+JSON.stringify(complaintresponse));
			if(complaintresponse != ""){
 $ionicLoading.hide();
				var confirmPopup = $ionicPopup.show({
					title : $filter('translate')('message'),
					template : '<b> Your Complaint is Successfully Submitted.</b>',
					buttons : [{
					text : 'OK',
					type : 'button button-block  customBgColor',
					onTap : function(){

					$sessionStorage.complaintresponse = complaintresponse;

					RestService.escalation($scope.departmentType,$scope.nidanComplaintType,$scope.nidanOrganisation)
					.then(function (escresponse) {
					  if(escresponse==undefined || escresponse == null || escresponse=="")
					    {
					      return false;
					      $ionicLoading.hide();
					    }
					  else
					    {
					      $sessionStorage.escresponse = escresponse;
					      $state.go("app.nidanReceipt");
						     $ionicLoading.hide();
					    }

					       $ionicLoading.hide();
					  },
					function (err) {
					        $ionicLoading.hide();
					        toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR'));
					  })
					}
				}]
			 });
//					$ionicLoading.hide();
		}
		else{
			   toaster.error($filter('translate')('ERROR'), $filter('translate')('COMPLERROR'));
			   $ionicLoading.hide();
			 }
	},function (err) {
		$ionicLoading.hide();
		toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR_OCCURED'));
	})
};


/*----------------------------- popup for image upload------------------------------------*/

  $ionicModal.fromTemplateUrl('templates/Complaint/modal-template.html', {
      scope: $scope,
      animation: 'slide-in-up'
   }).then(function(modal) {
      $scope.modal = modal;
   });

   $scope.openModal = function() {
//   alert("getting call to modal...");
      $scope.modal.show();
   };

   $scope.closeModal = function() {
      $scope.modal.hide();
   };

   //Cleanup the modal when we're done with it!
   $scope.$on('$destroy', function() {
      $scope.modal.remove();
   });

   // Execute action on hide modal
   $scope.$on('modal.hidden', function() {
      // Execute action
   });

   // Execute action on remove modal
   $scope.$on('modal.removed', function() {
      // Execute action
   });



var _init = function()
{

}

_init();

});
