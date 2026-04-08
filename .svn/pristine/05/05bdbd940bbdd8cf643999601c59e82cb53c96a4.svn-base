angular.module('starter')

  .controller('ForgotPasswordCtrl', function ($rootScope,$scope,$ionicPlatform, $location, RestService, $ionicLoading, $stateParams, toaster,
  $filter, ENV, dateFilter, $state,$ionicSideMenuDelegate,$localStorage) {

	  $ionicSideMenuDelegate.canDragContent(false)
  $scope.orgid = $localStorage.selectedorgID;
    $scope.userData ;
	  $scope.show = 1;
	  $scope.forgotmobileNo;

	  $scope.forgotmobilesubmit1 = function() {  //$scope.show = 2;
	   $ionicLoading.show({
      					template: $filter('translate')('LOADING')
      				});

	   RestService.forgotoptservice(1,$scope.forgotmobileNo).then(function (responseregisterdata){
     		console.log("responseregisterdata---"+JSON.stringify(responseregisterdata));
     		//alert("responseregisterdata---"+responseregisterdata.status);
     		 if(responseregisterdata.status == "success"){
     		 $scope.userData = responseregisterdata;
     			 $ionicLoading.hide();
     			 $scope.show = 2;
     		    }else{
     				toaster.error($filter('translate')('FORGOTPASSERROR')/* , $filter('translate')('') */);
     			}
     		 $ionicLoading.hide();
     		},
     		function (err) {
     			toaster.error($filter('translate')('ERROR'), $filter('translate')('WRONG_PASSWORD'));
     			$ionicLoading.hide();
     		  })

     	  }

     $scope.resendOTP=function()
     {
     	$ionicLoading.show({
      					template: $filter('translate')('LOADING')
      				});

	   RestService.forgotoptservice(1,$scope.forgotmobileNo).then(function (responseregisterdata){
     		console.log("responseregisterdata---"+JSON.stringify(responseregisterdata));
     		//alert("responseregisterdata---"+responseregisterdata.status);
     		 if(responseregisterdata.status == "success"){
     		 $scope.userData = responseregisterdata;
     			 $ionicLoading.hide();
     				$rootScope.simpleAlert($filter('translate')('OTPRESENT'));
     		    }else{
     				toaster.error($filter('translate')('OTPERROR')/* , $filter('translate')('') */);
     			}
     		 $ionicLoading.hide();
     		},
     		function (err) {
     			toaster.error($filter('translate')('ERROR'), $filter('translate')('WRONG_PASSWORD'));
     			$ionicLoading.hide();
     		  })

     }
	  $scope.forgototpsubmit1 = function() { $scope.show = 3;}
	  $scope.forgotpasswordsubmit1 = function(){
			 $state.go("app.LoginPage");
	  }


 $scope.forgotmobilesubmit = function() {
//  $scope.show = 2;
//			 $ionicLoading.show({
//					template: $filter('translate')('LOADING')
//				});

	RestService.forgotoptservice($scope.orgid,$scope.forgotmobileNo).then(function (responseregisterdata){
		console.log("responseregisterdata---"+responseregisterdata);
		//alert("responseregisterdata---"+responseregisterdata.status);
		 if(responseregisterdata.status == "success"){
			// $ionicLoading.hide();
			 $scope.show = 2;

		  }	else{
				toaster.error($filter('translate')('ERROR'), $filter('translate')('WRONG_OTP'));
			}
		// $ionicLoading.hide();
		},
		function (err) {
			toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR'));
		//	$ionicLoading.hide();
		  })
	  }


 $scope.forgototpsubmit = function() {
		  	 //$scope.show = 3;
			 $ionicLoading.show({
					template: 'Loading...'
				});

	RestService.forgototpverfiy($scope.userData.orgId,$scope.userData.userId,$scope.forgotmobileNo,$scope.forgototp).then(function (responseOPTdata){
	console.log("responseOPTdata---"+JSON.stringify(responseOPTdata));
		 if(responseOPTdata.status == "success"){
			 $ionicLoading.hide();
			 $scope.show = 3;

		  }	else{
				toaster.error(responseOPTdata.responseMsg);
			}
		 $ionicLoading.hide();
		},
		function (err) {
			toaster.error($filter('translate')('ERROR'), $filter('translate')('WRONG_PASSWORD'));
			$ionicLoading.hide();
		  })
	  }

  $scope.forgotpasswordsubmit = function(){
//		  var password = document.getElementById("txtPassword").value;
//	      var confirmPassword = document.getElementById("txtConfirmPassword").value;
//	        if (password != confirmPassword) {
//	            alert("Passwords do not match.");
//	            return false;
//	        }
//	        return true;

			 $ionicLoading.show({
					template: $filter('translate')('LOADING')
				});

		RestService.forgotpasswordservice($scope.userData.orgId,$scope.userData.userId,$scope.forgotmobileNo,$scope.forgotpassword).then(function (responsepassworddata){
		console.log("responsepassworddata---"+responsepassworddata);
		 if(responsepassworddata.status == "success"){
			 $ionicLoading.hide();
			 $rootScope.simpleAlert("Password set successfully !")
			 $state.go("app.LoginPage");
		  }	else{
				toaster.error($filter('translate')('PASSWORDERROR')/* , $filter('translate')('') */);
			}
		 $ionicLoading.hide();
		},
		function (err) {
			toaster.error($filter('translate')('ERROR'), $filter('translate')('WRONG_PASSWORD'));
			$ionicLoading.hide();
		  })
	 }

	  $scope.inputType = 'password';

		  $scope.hideShowPassword = function(){
		    if ($scope.inputType == 'password')
		      $scope.inputType = 'text';
		    else
		      $scope.inputType = 'password';
		  };

		  $scope.checkPasswordStrength=function(password) {
 if(password)
 {
    var number     = /([0-9])/;
    var upperCase  = /([A-Z])/;
    var lowerCase  = /([a-z])/;
    var specialCharacters = /([~,!,@,#,$,%,^,&,*,-,_,+,=,?,>,<])/;

    var characters     = (password.length >= 6 && password.length <= 15 );
    var capitalletters = password.match(upperCase) ? 1 : 0;
    var loweletters    = password.match(lowerCase) ? 1 : 0;
    var numbers        = password.match(number) ? 1 : 0;
    var special        = password.match(specialCharacters) ? 1 : 0;

    $scope.update_info('length', password.length >= 6 && password.length <= 15);
      $scope.update_info('capital', capitalletters);
      $scope.update_info('small', loweletters);
      $scope.update_info('number', numbers);
      $scope.update_info('special', special);

    var total = characters + capitalletters + loweletters + numbers + special;
    $scope.password_meter(total);
 }

}

$scope.update_info=function(criterion, isValid) {
    var $passwordCriteria = $('#passwordCriterion1').find('li[data-criterion="' + criterion + '"]');
    if (isValid) {
        $passwordCriteria.removeClass('invalid').addClass('valid');
    } else {
        $passwordCriteria.removeClass('valid').addClass('invalid');
    }
}

$scope.password_meter=function(total) {
    var meter = $('#password-strength-status1');
    meter.removeClass();
    if (total === 0) {
        meter.html('');
    } else if (total === 1) {
        meter.addClass('veryweak-password').html('very weak');
    } else if (total === 2) {
        meter.addClass('weak-password').html('weak');
    } else if (total === 3) {
        meter.addClass('medium-password').html('medium');
    } else if (total === 4) {
        meter.addClass('average-password').html('average');
    } else {
        meter.addClass('strong-password').html('strong');
    }
}
})
