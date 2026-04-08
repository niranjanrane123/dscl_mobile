angular.module('starter')

  .controller('EditProfileController', function ($scope, $rootScope, $ionicPopup, $localStorage, RestService, $ionicPlatform, $ionicLoading, $stateParams, toaster, $filter, ENV,
    $state) {

    var deregisterSecond = $ionicPlatform.registerBackButtonAction(
      function () {
        $state.go('app.home');
      }, 100
    );
    $scope.$on('$destroy', deregisterSecond);
    $scope.orgid = $localStorage.selectedorgID;
    $scope.editemailid = $localStorage.responselogindata.emailId;
    $scope.editmobilenum = $localStorage.responselogindata.mobileNo;
    console.log("DATA DEFAULT", $localStorage.responselogindata);
    $scope.isEnableSubmit=false;
    $scope.dateEnable=false;
    
    $scope.isEnableButton = function(data){
      console.log("FORM VALUE",data)
      console.log('$scope.townCityDistrict', $scope.townCityDistrict)
      if($scope.townCityDistrict == undefined){
        return true
      } else {
        if(data){
          if ($scope.isEnableSubmit){
            return true
          }else{
            return false
          }
          
        }else{
          if ($scope.isEnableSubmit){
            return false
          }else{
            return true
          }
        }
      }
      console.log("$scope.isEnableSubmit",$scope.isEnableSubmit)
    
      //console.log("FORM VALUE",data)
    }

    console.log('ppk', $scope.gender);

    $scope.isValueChange=function(){
      $scope.isEnableSubmit=true;
    }


    $scope.rd = new Rolldate({
			el: '#dateEdit',
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
				$scope.editdob = date
				$scope.item = new Date(date);
				$scope.editdob =$scope.item
				$scope.isValueChange()
        $scope.checkAge()
				$scope.$apply(function() {
          
					$scope.editdob =$scope.item;
          document.getElementById("dateEdit").innerText= moment($scope.editdob).format('DD/MM/YYYY')
          $scope.isEnableSubmit=true;
          //console.log("EDIT DATE",$scope.editdob)
          //$scope.editdob = 
          //console.log("FROM INNER",document.getElementById("dateEdit"))
          // $scope.editdob = document.getElementById("dateEdit").innerText
				});

        setTimeout(function(){ 
          $scope.$apply(function() {
              $scope.isEnableSubmit=true;
              $scope.isEnableButton(true)
             // console.log("iSENABLE",$scope.isEnableSubmit)
          })
        }, 3000);
			},
			cancel: function () {
				console.log('CANCEL DATE');
			}
		})

		$scope.openCalender = function () {
			$scope.rd.show();
		}
    $scope.initialData = function () {
      if ($localStorage.editedData) {
        console.log("DATA AVAILABE", $localStorage.editedData)
        $scope.editfirstname = $localStorage.editedData.firstName;
        $scope.editlastname = $localStorage.editedData.lastName;
        $scope.editemailid = $localStorage.editedData.emailId;
        $scope.edittitle = $localStorage.editedData.titleId;
        $scope.editdob =new Date($localStorage.editedData.dob);
        $scope.editgender = $localStorage.editedData.genderId;
        if ($localStorage.editedData.middleName != null)
          $scope.editmiddlename = $localStorage.editedData.middleName;
        if ($localStorage.editedData.address != null)
          $scope.editAddress = $localStorage.editedData.address;
        if ($localStorage.editedData.corrAddress != null)
          $scope.townCityDistrict = $localStorage.editedData.corrAddress;
        if ($localStorage.editedData.pincode != null)
          $scope.pincode = $localStorage.editedData.pincode;
      } else {
        console.log("DATA NOT AVAILABE", $localStorage.responselogindata.titleId)
        $scope.editfirstname = $localStorage.responselogindata.firstName;
        $scope.editlastname = $localStorage.responselogindata.lastName;
        $scope.editdob = new Date($localStorage.responselogindata.dob);
        $scope.edittitle = $localStorage.responselogindata.titleId;
        $scope.editgender = $localStorage.responselogindata.genderId;
        if ($localStorage.responselogindata.middleName != null)
          $scope.editmiddlename = $localStorage.responselogindata.middleName;
        if ($localStorage.responselogindata.address != null)
          $scope.editAddress = $localStorage.responselogindata.address;
        if ($localStorage.responselogindata.corrAddress != null)
          $scope.townCityDistrict = $localStorage.responselogindata.corrAddress;
        if ($localStorage.responselogindata.pincode != null)
          $scope.pincode = $localStorage.responselogindata.pincode;
      }


      if($scope.editfirstname != null && $scope.edittitle != null && $scope.editlastname != null &&
        $scope.editgender != null && $scope.editdob != null && $scope.editemailid != null && $scope.editmobilenum != null 
        && $scope.editAddress != null && $scope.townCityDistrict != null && $scope.pincode != null){
          $scope.isEnableSubmit = true
        }
    }
    $scope.orgId = $localStorage.selectedorgID;
    $scope.userId = $localStorage.responselogindata.userId;

    console.log('townCityDistrict 12345', $scope.townCityDistrict);
    $scope.checkAge = function () {
      var today = new Date();
      var birthDate = new Date($scope.editdob);
      var age = today.getFullYear() - birthDate.getFullYear();
      var m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age = age - 1;
      }
      $scope.ageAsOn = age;
      if ($scope.ageAsOn < 18 || $scope.ageAsOn > 99) {
        $ionicPopup.show({

          title: $filter('translate')('message'),
          //template : $filter('translate')('NOTELIGIBLE'),
          template: "<center>{{'NOTELIGIBLE'|translate}}<center>",
          buttons: [{
            text: $filter('translate')('OK'),
            type: 'button button-block  customBgColor',
          }]
        });
        // alert("You are not eligible to register on this application");
        $scope.editdob = '';
      }
    }
    $scope.regsubmit = function () {
      // $ionicLoading.show({ template: $filter('translate')('LOADING') });
     // $ionicLoading.show({template:'<ion-spinner class="spinner-energized" icon="circles"></ion-spinner>'});
      // if($localStorage.langNewId == "2"){
      //    $ionicLoading.show({	template: 'लोड करीत आहे...'		});
      //  }else{
      //    $ionicLoading.show({	template: 'Loading...'		});
      //  }
      
      console.log("$scope.edittitle====", $scope.edittitle)
      if($scope.editgender == null){
        toaster.error($filter('translate')('ERROR'), $filter('translate')('VALIDGENDER'));
      } else{
        if ($scope.editgender == 80) {
          $scope.gender = "F";
        } else if ($scope.editgender == 79) {
          $scope.gender = "M";
        } else {
          $scope.gender = "T";
        }
        //$localStorage.editedData.genderId = $scope.gender;
        let param = {
          "status": "success",
          "userId": $scope.userId,
          "orgId": $scope.orgId,
          "responseMsg": "लॉगिन सफलतापूर्वक है",
          "errorMsg": null,
          "httpstatus": null,
          "wsInputErrorList": null,
          "userName": null,
          "title": "Mr.",
          "mobileNo": $scope.editmobilenum,
          "firstName": $scope.editfirstname,
          "middleName": $scope.editmiddlename,
          "lastName": $scope.editlastname,
          "gender": $scope.gender,
          "address": $scope.editAddress,
          "corrAddress": $scope.townCityDistrict,
          "addhaarNo": null,
          "emailId": $scope.editemailid,
          "dob": $scope.editdob,
          "userStatus": null,
          "userType": "Citizen",
          "titleId": $scope.edittitle,
          "genderId": $scope.editgender,
          "pincode": $scope.pincode,
          "corrPincode": null,
          "synchTime": null
        }
        console.log("EDIT PARAMS",param)
        RestService.saveProfileEdit(param).then(function (response) {
          console.log("edit response", response);
          if (response == "User profile saved for provided details") {
            $localStorage.editedData = param;
            var confirmPopup = $ionicPopup.show({
              title: $filter('translate')('PROFILE'),
              //template : $filter('translate')('ACCOUNTUPDATE'),
              template: "<center>{{'ACCOUNTUPDATE'|translate}}<center>",
              buttons: [{
                text: $filter('translate')('OK'),
                type: 'button button-block customBgColor',
                onTap: function () {
                  $state.go("app.home");
                }
              }]
            });
          }
          $ionicLoading.hide();
        }, function (err) {
         // toaster.error($filter('translate')('ERROR'));
          toaster.error($filter('translate')('SAVEPROFILEERROR'));
          $ionicLoading.hide();
        })
      }
      
    }
    //   $scope.changeAttr = function(item){
    //   			if($scope.editdob == "" || $scope.editdob == null || $scope.editdob == undefined )
    //   				item.currentTarget.setAttribute("placeholder","Date of Birth");
    //   			else item.currentTarget.setAttribute("placeholder","");
    //   }

    /*  var leapYearCount = 365;
     //   var begin_year = new Date($scope.regdob).getFullYear();
     //   var end_year = new Date().getFullYear();
     //   for(var i = begin_year; i < end_year; i++){
     //      if($scope.isLeapYear(i)){
     //        leapYearCount++;
     //      }
     //    }
       var timeDiff = Math.abs(Date.now() - $scope.regdob);
       var age = Math.floor((timeDiff / (1000 * 3600 * 24))/leapYearCount);
       if(age<18){
        alert("You are not eligible to register on this application");
        $scope.regdob = '';*/



    var _init = function () {
      $scope.initialData()
      $rootScope.getNonHData("GEN", "genoptions", $scope.orgid);
      $rootScope.getNonHData("TTL", "ttloptions", $scope.orgid);
    };

    _init();
  })
