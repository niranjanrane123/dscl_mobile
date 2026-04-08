angular.module('starter')

  .controller('RegisterPageCtrl', function ($scope,$ionicHistory,$ionicPopup, $location, RestService, $ionicLoading, $stateParams, toaster,
		  $filter, ENV, dateFilter, $state,$ionicSideMenuDelegate,$rootScope,$localStorage) {
      $scope.orgid = "1";
	  $ionicSideMenuDelegate.canDragContent(false);
    $scope.currentDate =new Date();
	  
	  let projectNameControl = document.getElementById("fName");
//      projectNameControl.addEventListener("input", function (event) {
//         alert(event.target.value);
//                       var numericReg = /^[a-zA-Z]*$/;
//                       if(!numericReg.test(this.value))
//                       {
//                        //  this.value  = this.value.slice(0,-1);
//                         // $scope.regmiddlename = this.value;
//                          this.value = this.value.replace(/[0-9]/, "");
//                         // event.target.value = event.target.value.replace(/[^0-9]/, '');
//                       }
//      })


$scope.rd = new Rolldate({
  el: '#date',
  format: 'YYYY/MM/DD',
  beginYear: new Date().getFullYear()-99,
  endYear: new Date().getFullYear() - 19,
  minStep: 1,
  lang: {
    title: $filter('translate')('DOB'),
    cancel: $filter('translate')('CANCEL'),
    confirm: $filter('translate')('SELECT')
  },
  trigger: 'tap',
  confirm: function (date) {
    $scope.regdob = date
    $scope.item = new Date(date);
    $scope.regdob =$scope.item
    $scope.checkAge()
    $scope.$apply(function() {
      $scope.regdob =$scope.item;
    });
    
  },
  cancel: function () {
    console.log('CANCEL DATE');
  }
})

$scope.openCalender = function () {
  $scope.rd.show();
}


   $scope.onlyNumericTenLimitInputMname = function()
        {
          var mobileno = document.getElementById("middleName").value;
          var inputVal = mobileno;
              var numericReg = /^[a-zA-Z]*$/;
              if(!numericReg.test(inputVal))
              {
                  inputVal.slice(0,-1);
                  var inputValSlice = inputVal.slice(0,-1);
                  document.getElementById("middleName").value = inputValSlice;
                  $scope.regmiddlename = inputValSlice;
              }
        }
     $scope.onlyNumericTenLimitInputLname = function()
          {
              var mobileno = document.getElementById("lastName").value;
              var inputVal = mobileno;
                var numericReg = /^[a-zA-Z ]*$/;
                if(!numericReg.test(inputVal))
                {
                    inputVal.slice(0,-1);
                    var inputValSlice = inputVal.slice(0,-1);
                    document.getElementById("lastName").value = inputValSlice;
                    $scope.reglastname = inputValSlice;
                }
          }
          var password = document.getElementById("txtPassword");
          password.addEventListener('keyup', function() {
          
            var pwd = password.value
          
            // Reset if password length is zero
            if (pwd.length === 0) {
              document.getElementById("progresslabel").innerHTML = "";
              document.getElementById("progress").value = "0";
              return;
            }
          
            // Check progress
            var prog = [/[$@$!%*#?&]/, /[A-Z]/, /[0-9]/, /[a-z]/]
              .reduce((memo, test) => memo + test.test(pwd), 0);
          
            // Length must be at least 8 chars
            if(prog > 2 && pwd.length > 7){
              prog++;
            }
          
            // Display it
            var progress = "";
            var strength = "";
            switch (prog) {
              case 0:
              case 1:
              case 2:
                strength = "25%";
                progress = "25";
                break;
              case 3:
                strength = "50%";
                progress = "50";
                break;
              case 4:
                strength = "75%";
                progress = "75";
                break;
              case 5:
                strength = "100% - Password strength is good";
                progress = "100";
                break;
            }
            document.getElementById("progresslabel").innerHTML = strength;
            document.getElementById("progress").value = progress;
          
          });
	  $scope.regOrgID;
      $scope.regUserID;
	  $scope.show = 1;
	  $scope.regsubmit1 = function() {$scope.show = 2;}

	  $scope.otpsubmit1 = function() { $scope.show = 3;}

	  $scope.passwordsubmit1 = function(){$state.go("app.LoginPage");}

    $scope.onGenderChange =function(value){
      $scope.reggender=value
    }

    $scope.onTitleChange =function(value){
      //console.log("Title",value)
      $scope.regtitle=value
    }

	  $scope.regsubmit= function() {
      /*if($scope.regmiddlename)
        if($scope.regmiddlename.length<3 && $scope.regmiddlename.length>0)
        {
          $rootScope.simpleAlert($filter('translate')('VALIDMIDDLENAME'));
          return false;
        }*/
         $scope.langId = "1";
				 $ionicLoading.show({
        					template: $filter('translate')('LOADING')
        				});
RestService.registerservice($scope.regfirstname,$scope.reglastname,$scope.reggender,$scope.regdob,$scope.regmobile,
		$scope.regemailid,$scope.orgid,$scope.langId,$scope.regmiddlename,$scope.regtitle).then(function (responseregisterdata){
		console.log("responseregisterdata---",JSON.stringify(responseregisterdata));
		 if(responseregisterdata.status == "success"){
			 $ionicLoading.hide();
             $scope.show = 2;
			 $scope.REGORGID = responseregisterdata.orgId;
			 $scope.regUserID = responseregisterdata.userId;
//		   	alert($scope.REGORGID);

//			 sharedProperties.setregorgID($scope.REGORGID);
//			 sharedProperties.setreguserID($scope.regUserID);
           $ionicLoading.hide();

		  }else if(responseregisterdata.status == "mobileAlreadyReg"){
		    $ionicLoading.hide();
		    toaster.error($filter('translate')('ALREADY'), $filter('translate')(''));
		  }
      else if(responseregisterdata.status == "emailAlreadyReg"){
		    $ionicLoading.hide();
		    toaster.error($filter('translate')('ALREADY_EMAIL'), $filter('translate')(''));
		  }
      else{
		    $ionicLoading.hide();
			toaster.error($filter('translate')('REGISTERERROR')/* , $filter('translate')('') */);
		  }
		 $ionicLoading.hide();
		},
		function (err) {
      console.log("Error",JSON.stringify(err))
			toaster.error($filter('translate')('REGISTERERROR')/* , $filter('translate')('') */);
			$ionicLoading.hide();
		  })
	  }


//	  $scope.RegorgId = sharedProperties.getRegorgId();
//	  $scope.regUserID = sharedProperties.getreguserID();

      $scope.otpsubmit= function() {
//	  alert(" $scope.regorgId ----get--" +$scope.regorgId);
      $ionicLoading.show({
         template: $filter('translate')('LOADING')
      });
      RestService.optservice($scope.regmobile,$scope.regotp, $scope.orgid,$scope.regUserID).then(function (responseOPTdata){
	  console.log("responseOPTdata---"+responseOPTdata);
		 if(responseOPTdata.status == "success"){
			  $ionicLoading.hide();
              $scope.show = 3;
		    } else{
			  toaster.error($filter('translate')('ERROR'), $filter('translate')('WRONG_OTP'));
			}
		 $ionicLoading.hide();
		},
		function (err) {
			toaster.error($filter('translate')('ERROR'), $filter('translate')('WRONG_OTP'));
			$ionicLoading.hide();
		  })

	  }
//  $scope.filterValue = function(evt){
//           //    evt.value = String.fromCharCode(evt.keyCode).value(/[^0-9]/g,"");
//               var val = String.fromCharCode(evt.keyCode)
//               var transformedInput = val ? val.replace(/[^\d.-]/g,'') : null;
//               if(transformedInput==""){
//                  if(evt.target.value ){
//                   evt.target.value = evt.target.value.slice(0, -1);
//                   console.log(evt.target.value.slice(0, -1));
//                  }else{
//                    evt.key="";
//                  }
//
//               }
//   }
  $scope.passwordsubmit = function(){

		/*  var password = document.getElementById("txtPassword").value;
	      var confirmPassword = document.getElementById("txtConfirmPassword").value;
	        if (password != confirmPassword) {
	            alert("Passwords do not match.");
	            return false;
	        }
	        return true;*/

			 $ionicLoading.show({
					template:$filter('translate')('LOADING')
				});

		RestService.passwordservice($scope.regmobile,$scope.regpassword,$scope.orgid,$scope.regUserID)
		.then(function (responsepassworddata){
		console.log("responsepassworddata---"+responsepassworddata);
		 if(responsepassworddata.status == "success"){
			 $ionicLoading.hide();
			 $scope.registered()
             //alert("Account created successfully !")
//			 $scope.show = 3;
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
	 $scope.registered = function(){
     var confirmPopup = $ionicPopup.show({

     		    		    title : $filter('translate')('message'),
     			          template : $filter('translate')('ACCOUNTCREATEDSUCCESSFULLY'),

     			          buttons : [{
     					             text : $filter('translate')('OK'),
     					             type : 'button button-block  customBgColor',
     			          		}]
     		           });
     }
      $scope.forgotmobilesubmit1 = function() {  //$scope.show = 2;
     	   $ionicLoading.show({
           					template: $filter('translate')('LOADING')
           				});

     	   RestService.forgotoptservice(1,$scope.regmobile).then(function (responseregisterdata){
          		console.log("responseregisterdata---"+JSON.stringify(responseregisterdata));
          		//alert("responseregisterdata---"+responseregisterdata.status);
          		 if(responseregisterdata.status == "success"){
          		 $scope.userData = responseregisterdata;
               $rootScope.simpleAlert($filter('translate')('OTPRESENT'));
          			 $ionicLoading.hide();
          			 $scope.show = 2;
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

	  $scope.inputType = 'password';

		  $scope.hideShowPassword = function(){
		    if ($scope.inputType == 'password')
		      $scope.inputType = 'text';
		    else
		      $scope.inputType = 'password';
		  };



//$scope.organizationChange = function(organizationChange)
//{
//    $scope.org = organizationChange.id;
//    $scope.$watch('organisationID', function(newVal) {
//    console.log("organisationID--"+$scope.organisationID)
//
//    	$rootScope.getNonHData("GEN","genoptions",$scope.organisationID);
//      $rootScope.getNonHData("TTL","ttloptions",$scope.organisationID);
//    });
//}
$scope.checkAge = function(){
  var today = new Date();
			var birthDate = new Date($scope.regdob);
			var age = today.getFullYear() - birthDate.getFullYear();
			var m = today.getMonth() - birthDate.getMonth();
			if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
				age = age - 1;
			}

			$scope.ageAsOn = age;
			console.log("BEFORE AGE", $scope.ageAsOn)
			if ($scope.ageAsOn < 18 || $scope.ageAsOn > 99) {
				$scope.alertt();
				$scope.regdob = '';
				document.getElementById('date').innerHTML = ''
			}

//   console.log("checkAge");
//   console.log(document.getElementById('regdob').value);
//  var leapYearCount = 365;
// //   var begin_year = new Date($scope.regdob).getFullYear();
// //   var end_year = new Date().getFullYear();
// //   for(var i = begin_year; i < end_year; i++){
// //      if($scope.isLeapYear(i)){
// //        leapYearCount++;
// //      }
// //    }
 
//   var timeDiff = Math.abs(Date.now() - new Date(document.getElementById('regdob').value));
//   console.log(timeDiff);
//   var age = Math.floor((timeDiff / (1000 * 3600 * 24))/leapYearCount);
//    console.log(age);
//   if(age<18){
//    $scope.alertt()
//    document.getElementById('regdob').value = '';
//   }
}


$scope.isLeapYear = function(year){
 return ((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0);
}
$scope.alertt = function(){
var confirmPopup = $ionicPopup.show({

		    		    title : $filter('translate')('message'),
			          template : $filter('translate')('NOTELIGIBLE'),

			          buttons : [{
					             text : $filter('translate')('OK'),
					             type : 'button button-block  customBgColor',
			          		}]
		           });
}

$scope.ULBoptions = new Array();
var _init = function()
{
    $rootScope.getNonHData("GEN","genoptions","1");
    $rootScope.getNonHData("TTL","ttloptions","1");
//	$ionicLoading.show({template: $filter('translate')('LOADING')});
	$scope.ULBoptions.length = 0;
//	RestService.ulbService().then(function (responseULB){
//		console.log("responseULB---"+JSON.stringify(responseULB));
//		 if(responseULB.status == "success"){
//        var ULBList = responseULB.lookUpList;
//			    for(var i=0;i<ULBList.length;i++){
//			         if($localStorage.langNewId == "2"){
//                $scope.ULBoptions.push({
//                  id : ULBList[i].lookUpId,
//                  name : ULBList[i].descLangSecond
//                })
//                }else{
//                 $scope.ULBoptions.push({
//                    id : ULBList[i].lookUpId,
//                    name : ULBList[i].descLangFirst
//                  })
//                }
//			    }
//			 $ionicLoading.hide();
//		  }	else{
////			toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR'));
//				$ionicLoading.hide();
//			}
//		 $ionicLoading.hide();
//	},
//	function (err){
//      toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR'));
//      $ionicLoading.hide();
//	 })

};
$scope.goback=function()
    {
      console.log("back");
      if($scope.show==1)
        $ionicHistory.goBack();
      else if($scope.show>1)
        $scope.show=$scope.show-1;
    }
    
$scope.checkPasswordStrength=function(password) {
password=$("#txtPassword").val();
 if(password)
 {
    var number     = /([0-9])/;
    var upperCase  = /([A-Z])/;
    var lowerCase  = /([a-z])/;
    var specialCharacters = /([~,!,@,#,$,%,^,&,*,-,_,+,=,?,>,<])/;

    var characters     = (password.length >= 8 && password.length <= 15 );
    var capitalletters = password.match(upperCase) ? 1 : 0;
    var loweletters    = password.match(lowerCase) ? 1 : 0;
    var numbers        = password.match(number) ? 1 : 0;8
    var special        = password.match(specialCharacters) ? 1 : 0;

    $scope.update_info('length', password.length >= 8 && password.length <= 15);
      $scope.update_info('capital', capitalletters);
      $scope.update_info('small', loweletters);
      $scope.update_info('number', numbers);
      $scope.update_info('special', special);

    var total = characters + capitalletters + loweletters + numbers + special;
    $scope.password_meter(total);
 }

}

$scope.update_info=function(criterion, isValid) {
    var $passwordCriteria = $('#passwordCriterion').find('li[data-criterion="' + criterion + '"]');
    if (isValid) {
        $passwordCriteria.removeClass('invalid').addClass('valid');
    } else {
        $passwordCriteria.removeClass('valid').addClass('invalid');
    }
}

$scope.password_meter=function(total) {
    var meter = $('#password-strength-status');
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

_init();
})
.directive('replace', function() {
  return {
    require: 'ngModel',
    scope: {
      regex: '@replace',
      with: '@with'
    },
    link: function(scope, element, attrs, model) {
      model.$parsers.push(function(val) {
        if (!val) { return; }
        var regex = new RegExp(scope.regex);
        var replaced = val.replace(regex, scope.with);
        if (replaced !== val) {
          model.$setViewValue(replaced);
          model.$render();
        }
        return replaced;
      });
    }
  };
})