angular.module('starter')

  .controller('ChangeofOwnerCTRL', function ($scope, $location, RestService, $ionicLoading, $stateParams, toaster,
		  $filter, ENV, dateFilter, $state, $localStorage,$ionicPopup,$sessionStorage,$ionicModal,$window) {

	  console.log("$localStorage.responselogindata---"+JSON.stringify($localStorage.responselogindata));
//		$scope.orgid = $localStorage.responselogindata.orgId;
		$scope.orgid = $localStorage.selectedorgID;
		$scope.userID = $localStorage.responselogindata.userId;
		$scope.loginUSername = $localStorage.responselogindata.firstName;
		$scope.LoginMobileNo = $localStorage.responselogindata.mobileNo;
	 // $scope.waterBillSearch = false;
    $scope.waterConnections = new Array();
	  $scope.usageSubtype3;
	  $scope.usageSubtype4;
	  $scope.usageSubtype5;
	  $scope.isOutStandingPending;
	  $scope.isExistingConnectionOrConsumerNo
	  $scope.isExistingProperty;
	  $scope.disConnectionType;
	  $scope.factor1;
	  $scope.factor2;
	  $scope.factor3;
	  $scope.factor4;
    $scope.changeowner = "";
	  /*water rate master*/
	  	$scope.wrorgId;
		$scope.wrusageSubtype1;
		$scope.wrusageSubtype2;
		$scope.wrusageSubtype3;
		$scope.wrusageSubtype4;
		$scope.wrusageSubtype5;
		$scope.wrfactor1;
		$scope.wrfactor2;
		$scope.wrfactor3;
		$scope.wrfactor4;
		$scope.wrisBPL;
		$scope.wrServiceCode;
		$scope.wrDeptCode;
		$scope.wrTaxType;
		$scope.wrTaxCode;
		$scope.wrTaxCate;
		$scope.wrTaxSubCate;
		$scope.wrMeterType;
		$scope.wrChargeAppl;
		$scope.wrConnSize;
		$scope.wrConnType;
		$scope.wrRoadType;
		$scope.wrtransferMode;
		$scope.wrDisConnType;
		$scope.wrRatestartDate;
		$scope.wrNewRatestartDate;
		$scope.WNCConnSize;
		$scope.TaxType;
		$scope.TaxCode;
		$scope.TaxCategory;
		$scope.TaxSubcategory;
		$scope.FlatRate;
		var cosconnsizetext;
		var costariftext;
		var cospermisetext;
		$scope.selectfilename;
		$scope.newtransfermode;
		/*old data*/
		$scope.oldCOWconnName;
		$scope.oldtitle;
		$scope.oldconnNo;
		$scope.oldcsidn;
		$scope.oldCOUconnSize;
		$scope.oldcodDwzid1;
		$scope.oldcodDwzid2;
		$scope.oldCOUtarifCate;
		$scope.oldCOUpermiseType;
		$scope.oldCOUmetertype;
		$scope.oldCOUapplicantType;
    $scope.hide = true;
//		$scope.searchchangeowner = function() { $state.go("app.COoldnewdetails");}

/* modal */

       $ionicModal.fromTemplateUrl('templates/modal.html', {
          scope: $scope,
          animation: 'slide-in-up'
        }).then(function(modal) {
          $scope.modal = modal;
        });

       $scope.getdetails = function(connectionNumber){
          $scope.hide = true;
          console.log("check connection number" + JSON.stringify(connectionNumber))
          $scope.changeowner = connectionNumber
       }
      if($sessionStorage.waterChangeOfOwnerConnections != undefined){
        $scope.waterConnections = $sessionStorage.waterChangeOfOwnerConnections;
      }
      $scope.Change = function(){
        $scope.hide = false;
      }
		  $scope.openModal = function(action,ownerTitle,ownerFirstName,ownerMiddleName,ownerLastName,gender,macAddress) {
				$scope.RCModalParams = {
						action: action,
						/*id: id,
						amount: amount*/
						ownerTitle:ownerTitle,
						ownerFirstName:ownerFirstName,
						ownerMiddleName:ownerMiddleName,
						ownerLastName:ownerLastName,
						cao_id:null,
						csIdn:null,
						cao_address:null,
						cao_contactno:null,
						orgid:null,
						userId:null,
						langId:null,
						lmoddate:null,
						updatedBy:null,
						updatedDate:null,
						lgIpMac:null,
						lgIpMacUpd:null,
						gender:gender,
						caoUID:null,
						caoNewTitle:ownerTitle,
						caoNewFName:ownerFirstName,
						caoNewMName:ownerMiddleName,
						caoNewLName:ownerLastName,
						caoNewGender:gender,
						caoNewUID:null,
						isDeleted:null
					}
				$scope.$broadcast('RCOpenModalEvt',JSON.stringify($scope.RCModalParams));
		    $scope.modal.show();
		  };

		  $scope.closeModal = function() {
		    $scope.modal.hide();
		  };

			$scope.$on('RCChangeEvt', function (event, data){
		    	$scope.receiptCollections = {};
		    	$scope.receiptCollections = data;
		    	console.log("$scope.receiptCollections: "+JSON.stringify($scope.receiptCollections));
		    });

		  $scope.$on('$destroy', function() {
		    $scope.modal.remove();
		  });

		  $scope.removeReceiptHead = function (index) {
		    	var confirmDelete = $scope.showconfirmbox();
		    	if(confirmDelete == "Y"){
			    	var deleteAmount = $sessionStorage.receiptArray[index].amount;
			    	$scope.AccTotalAmount -= parseInt(deleteAmount);
			    	$sessionStorage.receiptArray.splice(index, 1);
			    	$scope.receiptCollections = $sessionStorage.receiptArray;
			    	if(!$scope.receiptCollections || $scope.receiptCollections.length < 1) $("#receiptErrorMsg").show();
		    	}else {
		    		return;
		    	}
		    };

		    $scope.showconfirmbox = function () {
			    if ($window.confirm("Are you sure you want to delete?")) return "Y";
			    else return "N";
		    }
/* modal */

	$scope.searchchangeowner = function() {
      		$ionicLoading.show({
    					template: $filter('translate')('LOADING')
  				});
		  if(!$scope.changeowner == ""){
				RestService.changeofownerservice($scope.changeowner,$scope.orgid).then(function (ownerresponse){
					$sessionStorage.canApplyOrNot = ownerresponse.canApplyOrNot;
					console.log("changeOenwerResponse"+JSON.stringify(ownerresponse))
					if(ownerresponse.canApplyOrNot == "Y"){

						$sessionStorage.changeowner = $scope.changeowner;
						 $sessionStorage.ownerresponse = ownerresponse;
						 console.log("ownerresponse---"+$sessionStorage.ownerresponse);

						 var lookUpCode  = "CSZ";
						 RestService.getNHPrefixData(lookUpCode,$scope.orgid).then(function (getprefixdataresponsecsz){
						  console.log("getprefixdataresponsecsz=="+getprefixdataresponsecsz);
							  if(getprefixdataresponsecsz==undefined || getprefixdataresponsecsz == null || getprefixdataresponsecsz=="")
							  {

								  $ionicLoading.hide();
							  	 return false;
							  }
							  else
							  {
								  $sessionStorage.getprefixdataresponsecsz = getprefixdataresponsecsz;

								  $ionicLoading.hide();
							  }

						   },function (err) {toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR'));})

						   var lookUpCode  = "TRF";
					  		var level = "1";
					      RestService.getHPrefixData(lookUpCode,level,$scope.orgid).then(function (getprefixdataresponseTRF){
							  console.log("getprefixdataresponseTRF=="+getprefixdataresponseTRF);
							  if(getprefixdataresponseTRF==undefined || getprefixdataresponseTRF == null || getprefixdataresponseTRF=="")
							  {

								  $ionicLoading.hide();
							  	 return false;
							  }
							  else
							  {
								  $sessionStorage.getprefixdataresponseTRF = getprefixdataresponseTRF;

								  $ionicLoading.hide();
							  }
//							  	$sessionStorage.getprefixdataresponseTRF = getprefixdataresponseTRF;
							},function (err) {toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR')); })

							 var lookUpCode  = "TRF";
					   		 var level = "1";
							RestService.getHPrefixData(lookUpCode,level,$scope.orgid).then(function (prefixdataresponsepermise){
							  console.log("prefixdataresponsepermise=="+prefixdataresponsepermise);
							  if(prefixdataresponsepermise==undefined || prefixdataresponsepermise == null || prefixdataresponsepermise=="")
							  {

								  $ionicLoading.hide();
							  	 return false;
							  }
							  else
							  {
                    $sessionStorage.prefixdataresponsepermise = prefixdataresponsepermise;
                      if($scope.waterConnections.length == 0){
                         $scope.waterConnections.push({
                            number : $scope.changeowner
                          })
                      }else{
                        console.log("connections "+ JSON.stringify($scope.waterConnections))
                        for(var i=0;i<$scope.waterConnections.length;i++){
                          if($scope.waterConnections[i].number != $scope.changeowner.toString()){
                              $scope.waterConnections.push({
                                number : $scope.changeowner
                              })
                          }
                       }

                      }
                    $sessionStorage.waterChangeOfOwnerConnections = $scope.waterConnections;
									  $state.go("app.COoldnewdetails");
								    $ionicLoading.hide();
							  }
//							  	$sessionStorage.prefixdataresponsepermise = prefixdataresponsepermise;
							},function (err) {toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR'));})



//					$state.go("app.COoldnewdetails");
					$ionicLoading.hide();
				}else{

					$scope.applyornot = ownerresponse.canApplyOrNot;
//					alert($scope.applyornot);

					var confirmPopup = $ionicPopup.show({
						 title :$filter('translate')('message'),
				         template : '<b>#'+$scope.applyornot+'</b>',
				         buttons : [{
				             text : 'Proceed',
				             type : 'button-balanced',
				             onTap : function(){
				             }
			          		}]
						});
					$ionicLoading.hide();
				  }
				},function (err) {
					toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR'));
					$ionicLoading.hide();
				})

		  }else{
		  $ionicLoading.hide();
		  alert ("Please Enter Valid Connection Number");
		  }
	  };



	  var _init = function ()
	  {
		  /*new details*/
			 var lookUpCode  = "GEN";
			  RestService.getNHPrefixData(lookUpCode,$scope.orgid).then(function (getprefixdataresponsegen){
				  console.log("getprefixdataresponsegen=="+getprefixdataresponsegen);
				  if(getprefixdataresponsegen==undefined || getprefixdataresponsegen == null || getprefixdataresponsegen=="")
				  {

					  $ionicLoading.hide();
				  	 return false;
				  }
				  else
				  {
					  $sessionStorage.getprefixdataresponsegen = getprefixdataresponsegen;

					  $ionicLoading.hide();
				  }
//				  $sessionStorage.getprefixdataresponsegen = getprefixdataresponsegen;
				},function (err) { toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR')); })

				 var lookUpCode  = "TTL";
			  RestService.getNHPrefixData(lookUpCode,$scope.orgid).then(function (getprefixdataresponsettl){
				  console.log("getprefixdataresponsettl=="+getprefixdataresponsettl);
				  if(getprefixdataresponsettl==undefined || getprefixdataresponsettl == null || getprefixdataresponsettl=="")
				  {

					  $ionicLoading.hide();
				  	 return false;
				  }
				  else
				  {
					  $sessionStorage.getprefixdataresponsettl = getprefixdataresponsettl;

					  $ionicLoading.hide();
				  }
//				  $sessionStorage.getprefixdataresponsettl = getprefixdataresponsettl;
				},function (err) { toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR'));})

				var lookUpCode  = "TFM";
			   RestService.getNHPrefixData(lookUpCode,$scope.orgid).then(function (TFMresponse){
				   console.log("TFMresponse=="+JSON.stringify(TFMresponse));
				   if(TFMresponse==undefined || TFMresponse == null || TFMresponse=="")
				  {
					  $ionicLoading.hide();
				  	 return false;
				  }
				  else
				  {
					  $sessionStorage.TFMresponse = TFMresponse;
					  $ionicLoading.hide();
				  }
//				  $sessionStorage.TFMresponse = TFMresponse;
				},function (err) { toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR'));	})

	  }
	  _init();

  })
