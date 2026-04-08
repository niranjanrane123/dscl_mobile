angular.module('starter')

  .controller('COUpaymentCTRL', function ($scope, $location, RestService, $ionicLoading, $stateParams, toaster,
		  $filter, ENV, dateFilter, $state, $localStorage,$ionicPopup,$sessionStorage,$ionicHistory,$ionicPopup) {
/*declare start*/

	  console.log("$sessionStorage.responselogindata---"+JSON.stringify($localStorage.responselogindata));
//		$scope.orgid = $localStorage.responselogindata.orgId;
		$scope.orgid = $localStorage.selectedorgID;
		$scope.userID = $localStorage.responselogindata.userId;
		$scope.loginUSername = $localStorage.responselogindata.firstName;
		$scope.LoginMobileNo = $localStorage.responselogindata.mobileNo;
		$scope.emailId = $localStorage.responselogindata.emailId;
    $scope.ServiceShortName = "WCU";
    $scope.csIdn = $sessionStorage.custinfo.csIdn;
	  var coupermisetext;
	  var coutariftext;
	  var actiondetails;
	  $scope.COUpaidamt;

/*declare end*/
//		$scope.COUFlatRate = $sessionStorage.responseservicechargedata.responseObj[0].flatRate;
		$scope.COUFlatRate = $sessionStorage.responseservicechargedata.responseObj[0].chargeAmount;
		$scope.options = new Array();
		for(var i=0;i<$sessionStorage.Bankresponse.list.length;i++){
			$scope.options.push({
			id : $sessionStorage.Bankresponse.list[i].bankId,
			name : $sessionStorage.Bankresponse.list[i].cbbankname
		})
	}

$scope.COUsavedata = function(){
/*	if ($scope.COUFlatRate <= $scope.COUpaidamt) {
			alert("Paid Amount Should Not Be Greater Then Total Amount");
			return false;
		}
		else {	*/
			$ionicLoading.show({
				template: $filter('translate')('LOADING')
			});
			RestService.COUsaveservice($sessionStorage.applFName,$sessionStorage.applMname,$sessionStorage.applLname,$sessionStorage.applmobileno,$sessionStorage.appltitle,
				$sessionStorage.appladdress,$scope.COUpaidamt,$sessionStorage.csidn,$sessionStorage.applRoadname,$sessionStorage.connNo,$sessionStorage.applConnsize,
				$sessionStorage.COURemarks,$sessionStorage.COUtarifCate,$sessionStorage.COUpermiseType,$sessionStorage.newCOUtarifnew,
				$sessionStorage.newCOUpermise,$scope.orgid,$scope.userID,$sessionStorage.documentObjectArray,$sessionStorage.applbplflag,
				$sessionStorage.couwrNewRatestartDate,$sessionStorage.macAddress).then(function(COUresponse){
					  console.log("COUresponse=="+JSON.stringify(COUresponse));
					  if(COUresponse.status == "success"){
						 $scope.applictNo = COUresponse.applicationNo;

						 $ionicLoading.show({
								template: $filter('translate')('LOADING')
							});
							$scope.feesId = {
                          1 : $scope.COUFlatRate
                        }
						/* var confirmPopup = $ionicPopup.show({
							 title : $filter('translate')('message'),
					         template : 'Your application <b>#'+$scope.applictNo+'</b> is successfully submitted.',
					         buttons : [{
					             text : 'Proceed',
					             type : 'button-balanced',
					             onTap : function(){	*/
						 RestService.savePayReqWCU($scope.orgid,$scope.userID,$localStorage.langID,$localStorage.responselogindata.emailId,$scope.loginUSername,$scope.LoginMobileNo,
						 $scope.ServiceShortName,$scope.applictNo,$scope.COUFlatRate,$scope.COUpaymettype,$scope.applictNo,"Y","N",false,null,$scope.feesId)
									.then(function (response) {
									if(response.status == "pending"){
										$ionicLoading.hide();

										var H= null;
										H = window.open(encodeURI(response.payRequestMsg), '_blank',
										'location=no,closebuttoncaption=Back,hardwareback=yes,fullscreen=yes,zoom=yes,toolbarposition=top,enableviewportscale=yes');

										H.addEventListener('exit', iabClose);
										H.addEventListener('loadstop', iabClose1);
										function iabClose(event)
										{
//											$scope.PaymentRecieptMethod1();
											H.removeEventListener('exit', iabClose);
											$state.go("app.WaterModule");
										}
										function iabClose1(event){
											if (event.url.match("mobile/close")) {
													H.close();
													H.removeEventListener('loadstop', iabClose1);
//													alert("Payment Have Successfully Done")
													$state.go("app.WaterModule");
											}
										}
									}
									else{
											toaster.error($filter('translate')('ERROR'), $filter('translate')('WRONG_CONN_NUMBER'));
										}
									$ionicLoading.hide();
								}, function (err) {
									toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR_OCCURED'));
									$ionicLoading.hide();
								})
					          /*   }
				          		}]
							});*/
						 $ionicLoading.hide();
					  }
					  else{
							$ionicLoading.hide();
					  }
					},function (err) {
						toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR_OCCURED'));
						$ionicLoading.hide();
				})
//			  }
		};
  })
