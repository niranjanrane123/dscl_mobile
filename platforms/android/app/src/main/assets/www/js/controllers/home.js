angular.module('starter')

  .controller('HomeCtrl', function ($rootScope, ENV, $scope, $filter, RestService, $ionicLoading, $state, toaster, $stateParams, $ionicHistory,
    $ionicNavBarDelegate, $ionicPlatform, $localStorage, $window, $sessionStorage, $ionicPopup, $cordovaBarcodeScanner,$cordovaGeolocation) {
    //$ionicNavBarDelegate.showBackButton(false);
    $scope.orgid = $localStorage.selectedorgID;
    $scope.default = 'COMPL_SERVICE';
    $scope.userID = $localStorage.responselogindata.userId;
    $scope.loginUSername = $localStorage.responselogindata.firstName;
    $scope.LoginMobileNo = $localStorage.responselogindata.mobileNo;
    $scope.ulbName = $localStorage.orgName;
    $scope.dashBoardURL = RestService.dashBoardUrl;
    $scope.portalURL = ENV.portalURL + '/CitizenHome.html';
    $scope.locationGroup = $sessionStorage.locationGroup;
    $scope.aboutUsUrl = ENV.eipURL + '/CitizenAboutUs.html'
    $scope.group = [];
    $scope.group1 = [];
    $scope.group2 = [];
    console.log("dashboard url" + JSON.stringify($scope.locationGroup));
    console.log("dashboard url12345"+$scope.dashBoardURL);
    console.log("portal url" + JSON.stringify($scope.locationGroup));
    console.log("portal url12345"+$scope.portalURL);
    $scope.check == true;
    $scope.latitude = 19.060692;
    $scope.longitude = 72.836250;
    var options = { timeout: 10000, enableHighAccuracy: true };


    $scope.$on('$ionicView.enter', function () {
      console.log("Home entered")
    });

    $('#tollFree').click(function(){
      console.log('toll free number called');
      $scope.tollFreeNumber = '18001802525';
      window.plugins.CallNumber.callNumber(onSuccess, onError, $scope.tollFreeNumber, false);
    });

    $scope.apuniSarkar = function() {
      
      RestService.getJwtToken($scope.orgid,$scope.userID).then(function(tokenId){
        $ionicLoading.show();
        var url = ENV.apuniSarkarURL + tokenId;
        console.log('apuni sarkar url-->',url);
        location.href = url;
        $ionicLoading.hide();
      }, function (err) {
        toaster.error($filter('translate')('APUNISARKARERROR'));
        $ionicLoading.hide();
      });
    }

    var _init = function () {
      window.localStorage.removeItem("showRTIHelp");
      //$(".nav-bar-container").removeClass("hide");
      console.log('$rootScope.swmAccessToken' + $rootScope.swmAccessToken)
      if ($rootScope.swmAccessToken == null) {
        RestService.getAccessToken().then(function (data) {
          $rootScope.swmAccessTokenData = data.access_token;
          console.log($rootScope.swmAccessToken,"rrot scope toke")
          console.log(data.access_token,"data toke")
        },
          function (err) {
          })

      }

      // Get Location access

      var geoSuccess = function (position) {
        console.log("position---" + JSON.stringify(position));
        console.log('Latitude: ' + position.coords.latitude + '\n' +
          'Longitude: ' + position.coords.longitude + '\n' +
          'Altitude: ' + position.coords.altitude + '\n' +
          'Accuracy: ' + position.coords.accuracy + '\n' +
          'Altitude Accuracy: ' + position.coords.altitudeAccuracy + '\n' +
          'Heading: ' + position.coords.heading + '\n' +
          'Speed: ' + position.coords.speed + '\n' +
          'Timestamp: ' + position.timestamp + '\n');
        // $scope.myImgUrl = thisResult.filename;
        // console.log("result.filename------" + thisResult.filename);
        $scope.Latitude = position.coords.latitude;
        $scope.Longitude = position.coords.longitude;
       

      };
      var fail = function (err) {
        alert('code: ' + error.code + '\n' +
          'message: ' + error.message + '\n');
      }

      navigator.geolocation.getCurrentPosition(geoSuccess, fail);


      $cordovaGeolocation.getCurrentPosition(options).then(function (position) {
        console.log(position.coords.latitude);
        console.log(position.coords.longitude);
        $scope.latitude = position.coords.latitude;
        $scope.longitude = position.coords.longitude;
        console.log("lat=", $scope.latitude);
        console.log("log=",$scope.longitude);

      }, function (error) {
        console.log("Could not get location");
      });

    };



    _init();

    var deregisterSecond = $ionicPlatform.registerBackButtonAction(
      function () {

        var confirmPopup = $ionicPopup.show({

          title: $filter('translate')('message'),
          template: $filter('translate')('AREYOUSURELOGOUT'),

          buttons: [{
            text: $filter('translate')('CANCEL'),
            type: 'button button-block  customBgColor',
          },
          {
            text: $filter('translate')('OK'),
            type: 'button button-block  customBgColor',

            onTap: function () {
              $localStorage.$reset();
              $window.localStorage.clear();
              $ionicHistory.clearCache();
              $ionicHistory.clearHistory();
              $localStorage.langID = "2";
              $localStorage.english = false;
              $state.go('app.LandingPage');
              //					            	 ionic.Platform.exitApp();
            }
          }]
        });
      }, 100
    );
    $scope.$on('$destroy', deregisterSecond);



    $scope.callSOS = function(){
      var d = new Date();
      console.log($localStorage.address,"addresss....")
      // d.toLocaleString(); 
    
     
      // var payload={

      //     "dateTime": d.toLocaleString(),
      //     "authCode": "8CD84500AC",
      //     //"gender":  $localStorage.responselogindata.gender,
      //     "gender":  '',
      //     "latitude": $scope.latitude,
      //     "mobileNo": $scope.LoginMobileNo,
      //     "type": "EMERGENCY_SOS",
      //     "authId": "KLPOLICE.IntegratedApp",
      //     "victimAddress": "",
      //     "eventDesc": "DSCL Mobile App",
      //     "victimName": $scope.loginUSername,
      //     "district": "Dehradoon",
      //     "state": "UK",
      //     "incidentId": "SOS001",
      //     "age": 0,
      //     "longitude": $scope.longitude,
      //     "gpsPacketTime": "0",
      //     "incidentLocation": "Dehradoon"

      // };
      var payload={

        "dateTime": d.toLocaleString(),
        "authCode": "8CDAD55500AC",
        //"gender":  $localStorage.responselogindata.gender,
        "gender":  '',
        "latitude": $scope.latitude,
        "mobileNo": $scope.LoginMobileNo,
        "type": "EMERGENCY_SOS",
        "authId": "UKPOLICE.Doon1",
        "victimAddress": "Delhi",
        "eventDesc": "DSCL Mobile App",
        "victimName": $scope.loginUSername + "" + "" + $scope.lastName,
        "district": "Dehradoon",
        "state": "UK",
        "incidentId": "SOS001",
        "age": 0,
        "longitude": $scope.longitude,
        "gpsPacketTime": "0",
        "incidentLocation": "Dehradoon"

    };
      if ($localStorage.langNewId == "2") {
				$ionicLoading.show({ template: 'लोड हो रहा है...' });
			} else {
				$ionicLoading.show({ template: 'Loading...' });
			}

      RestService.EmergencySOSCall(payload).then(function (res){
        console.log("sos--"+res);  
        var response = JSON.stringify(res);
        // var responseJson = JSON.parse(res);     
        if(response==undefined || response == null || response=="")
          {
            toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR'));
            
            $ionicLoading.hide();
            return false;
          }
        else if(response.length>0)
          {
            console.log("1**");
            if(res.resultCode == "COMM_OPERATION_SUCCESS")
            {
              console.log("2**");
              $rootScope.simpleAlert('SOSCALLSUCCESS');
              console.log("3**");
            }
            console.log("5**");
          }
        
        $ionicLoading.hide();
      },function (err) {
        toaster.error($filter('translate')('EMERGENCY_CALL_112_ERROR'));
        $ionicLoading.hide();
})

    }

    /*in app browser loader start n stop*/
    $rootScope.inappbrowserlinnk = function (link) {

      console.log("link2 " + link);
      var inAppBrowserbRef = null;

      inAppBrowserbRef = window.open(encodeURI(link), '_blank', 'location=no,toolbar=no');

      inAppBrowserbRef.addEventListener('loadstart', inAppBrowserbLoadStart);
      inAppBrowserbRef.addEventListener('loadstop', inAppBrowserbLoadStop);
      inAppBrowserbRef.addEventListener('loaderror', inAppBrowserbLoadError);
      inAppBrowserbRef.addEventListener('exit', inAppBrowserbClose);

      function inAppBrowserbLoadStart(event) {
        navigator.notification.activityStart("Please Wait", "Its loading....");
      }

      function inAppBrowserbLoadStop(event) {
        navigator.notification.activityStop();
      }

      function inAppBrowserbLoadError(event) {
        navigator.notification.activityStop();
      }

      function inAppBrowserbClose(event) {
        inAppBrowserbRef.removeEventListener('loadstart', iabLoadStart);
        inAppBrowserbRef.removeEventListener('loadstop', iabLoadStop);
        inAppBrowserbRef.removeEventListener('loaderror', iabLoadError);
        inAppBrowserbRef.removeEventListener('exit', iabClose);
      }
    }

    $scope.scanBarcode = function () {
      $cordovaBarcodeScanner.scan().then(function (imageData) {
        console.log("Barcode Format -> " + imageData.format);
        console.log("Cancelled -> " + imageData.cancelled);
      }, function (error) {
        console.log("An error happened -> " + error);
      });
    };

    $scope.openLocation = function (id) {
      $sessionStorage.locationId = id;
      $state.go("app.nearBy");
    }
    /*
     * if given group is the selected group, deselect it
     * else, select the given group
     */
    $scope.toggleGroup = function (group) {
      $scope.default = null;
      if ($scope.isGroupShown(group)) {
        $scope.shownGroup = 'COMPL_SERVICE';
      } else {
        $scope.shownGroup = group;
      }
    };
    $scope.isGroupShown = function (group) {
      return $scope.shownGroup === group;
    };

    //platform specific
    $ionicPlatform.ready(function(){
      $scope.isIOS = ionic.Platform.isIOS();
      console.log('ios-->',$scope.isIOS);
      $scope.isAndroid = ionic.Platform.isAndroid();
      console.log('android-->',$scope.isAndroid);
    });
    

    //for Android
    if($scope.isAndroid){
      $scope.groups = [];

    $scope.groups[0] = {
      name: "COMPL_SERVICE",
      img: "../www/img/complaintRHeading.png"
    };
    $scope.groups[1] = {
      name: "RIGHTTOINFORMATION",
      img: "../www/img/rightToInfoHeading.png"
    };
    $scope.groups[2] = {
      name: "NEARBY",
      img: "../www/img/nearByHeaderIcon.png"
    };
    //          $scope.groups[1] = {
    //             name: "MUNCIPLEPROPERTY",
    //             img:"../www/img/muncipleProperty.png"
    //          };
    $scope.groups[3] = {
      name: "QUICK_SERVICES",
      img: "../www/img/quickServicesHeaderIcon.png"
    };
    // $scope.groups[4] = {
    //   name: "Property",
    //   img: "../www/img/propertyHeading.png"
    // };
    // $scope.groups[4] = {
    //   name: "WATER",
    //   img: "../www/img/waterHeading.png"
    // };
    $scope.groups[4] = {
      name: "SWM",
      img: "../www/img/complaintRHeading.png"
    };
    // $scope.groups[6] = {
    //   name: "SWM",
    //   img: "../www/img/waterHeading.png"
    // };
    //        $scope.groups[5] = {
    //            name: "SOCIALSECURITY",
    //            img:"../www/img/socialSecurity.png"
    //        };
    /*$scope.groups[8] = {
        name: "LANDANDINSPECTION",
        img:"../www/img/landinspection.png"
    };*/

    //    $scope.toggleGroup = function(group) {
    //         if ($scope.isGroupShown(group)) {
    //           $scope.shownGroup = null;
    //         } else {
    //           $scope.shownGroup = group;
    //         }
    //       };
    //       $scope.isGroupShown = function(group) {
    //         return $scope.shownGroup === group;
    //       };
    }

    //for iOS
    if($scope.isIOS){
      $scope.groups = [];

    $scope.groups[0] = {
      name: "COMPL_SERVICE",
      img: "../img/complaintRHeading.png"
    };
    $scope.groups[1] = {
      name: "RIGHTTOINFORMATION",
      img: "../img/rightToInfoHeading.png"
    };
    $scope.groups[2] = {
      name: "NEARBY",
      img: "../img/nearByHeaderIcon.png"
    };
    //          $scope.groups[1] = {
    //             name: "MUNCIPLEPROPERTY",
    //             img:"../www/img/muncipleProperty.png"
    //          };
    $scope.groups[3] = {
      name: "QUICK_SERVICES",
      img: "../img/quickServicesHeaderIcon.png"
    };
    // $scope.groups[4] = {
    //   name: "Property",
    //   img: "../www/img/propertyHeading.png"
    // };
    // $scope.groups[4] = {
    //   name: "WATER",
    //   img: "../www/img/waterHeading.png"
    // };
    $scope.groups[4] = {
      name: "SWM",
      img: "../img/complaintRHeading.png"
    };
    // $scope.groups[6] = {
    //   name: "SWM",
    //   img: "../www/img/waterHeading.png"
    // };
    //        $scope.groups[5] = {
    //            name: "SOCIALSECURITY",
    //            img:"../www/img/socialSecurity.png"
    //        };
    /*$scope.groups[8] = {
        name: "LANDANDINSPECTION",
        img:"../www/img/landinspection.png"
    };*/

    //    $scope.toggleGroup = function(group) {
    //         if ($scope.isGroupShown(group)) {
    //           $scope.shownGroup = null;
    //         } else {
    //           $scope.shownGroup = group;
    //         }
    //       };
    //       $scope.isGroupShown = function(group) {
    //         return $scope.shownGroup === group;
    //       };
    }


    /*IN app browser end*/
    /*--------Complaint services start---------*/
    $scope.filecomplaint = function () {
      $ionicLoading.show({ template: $filter('translate')('LOADING') });
      /*Department type*/
      RestService.deptprefix($scope.orgid).then(function (response) {
        console.log("deptresponse--" + response);
        if (response == undefined || response == null || response == "") {
          $ionicLoading.hide();
          return false;
        }
        else {
          $sessionStorage.deptresponse = response;
          $state.go("app.LodgeComplaint");
          $ionicLoading.hide();
        }
        $ionicLoading.hide();
      }, function (err) {
        toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR'));
        $ionicLoading.hide();
      })
    };

    $scope.reopen = function () {
      $ionicLoading.show({ template: $filter('translate')('LOADING') });
      /*for reopen*/
      RestService.allgrieavance($scope.userID, $scope.LoginMobileNo).then(function (response) {
        console.log("response--" + response);
        $scope.allgrievance = new Array();
        for (var i = 0; i < response.length; i++) {
          if (response[i].status == "CLOSED" && response[i].lastDecision == "APPROVED") {
            $scope.allgrievance.push(response[i]);
          }
        }

        $sessionStorage.allgrievanceresponse = $scope.allgrievance;
        $state.go("app.reopen");
        $ionicLoading.hide();
      }, function (err) {
        console.log("---error--" + err);
        toaster.error($filter('translate')('REOPENCOMPLAINTERROR')/* , $filter('translate')('ERROR_OCCURED') */);
        $ionicLoading.hide();
      })
    };
    /*---------------calling function--------------------------*/
    function onSuccess(result) {
      console.log("Success:" + result);
    }
    function onError(result) {
      console.log("Error:" + result);
    }
    $scope.openLogin11 = function(typeLogin) {
       $state.go('app.LoginPage');
       console.log("Error:");
   };
    $scope.comingSoon = function () {
      var confirmPopup = $ionicPopup.show({
        title: $filter('translate')('message'),
        template: $filter('translate')('COMINGSOON'),

        buttons: [{
          text: $filter('translate')('OK'),
          type: 'button button-block  customBgColor',
          onTap: function () {

          }
        }]
      });
      //    var confirmPopup = $ionicPopup.show({
      //
      //    		    		  title : $filter('translate')('message'),
      //    			          template : $filter('translate')('COMINGSOON')',
      //    			          buttons : [
      //    			          		{
      //    					             text : 'Ok',
      //    					             type : 'button button-block  customBgColor',
      //
      //    					             onTap : function() {
      //    					            	 	$localStorage.$reset();
      //    					    			 	  $window.localStorage.clear();
      //    					    			      $ionicHistory.clearCache();
      //    					    			      $ionicHistory.clearHistory();
      //    					    			       $localStorage.langID = "2";
      //                                               $localStorage.english = false;
      //    					    			      $state.go('app.LoginPage');
      //    //					            	 ionic.Platform.exitApp();
      //    					             	}
      //    			          		}]
      //    		           });
    }
    $scope.callNumber = function (number) {
      var confirmIn = $scope.confirmboxIn();
      if (confirmIn == "Y") {
        $scope.number = number;
        window.plugins.CallNumber.callNumber(onSuccess, onError, $scope.number, false);
      } else { return; }
    }

    $scope.navigateSWM = function (number) {
      var confirmIn = $scope.confirmboxIn();
      if (confirmIn == "Y") {
        $scope.number = number;
        window.plugins.CallNumber.callNumber(onSuccess, onError, $scope.number, false);
      } else { return; }
    }

    $scope.confirmboxIn = function () {
      if ($window.confirm("Note: The Time to File a Complaint is from 8:00am To 6:00pm.")) return "Y";
      else return "N";
    }
    /*--------Complaint services end---------*/

    /*--------Water Services Start---------------*/
    $scope.appltype = function () {
      $ionicLoading.show({ template: $filter('translate')('LOADING') });
      var lookUpCode = "APT";
      RestService.getNHPrefixData(lookUpCode, $scope.orgid).then(function (response) {
        console.log("response==" + response);
        if (response == undefined || response == null || response == "") {
          toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR_OCCURED'));
          $ionicLoading.hide();
          return false;
        }
        else {
          $sessionStorage.response = response;
          //						$state.go("app.NewWaterConnection");
          $state.go("app.NWCApplicantInfo");
          $ionicLoading.hide();
        }
        $ionicLoading.hide();
      }, function (err) {
        toaster.error($filter('translate')('ERROR'), $filter('translate')(''));
        $ionicLoading.hide();
      })
    };


    /*--------Water Services Endd---------------*/
    $scope.weatherInfo = function () {
      var inAppBrowserbRef = null;
      inAppBrowserbRef = window.open(encodeURI("https://weather.com/en-IN/weather/tenday/l/Mussoorie+Uttarakhand?canonicalCityId=75477fb197f4895cb58ac1d71b03f6988492750d947d47538c7e81330623e805"), '_blank', 'location=yes,toolbar=yes');
      inAppBrowserbRef.addEventListener('loadstart', inAppBrowserbLoadStart);
      inAppBrowserbRef.addEventListener('loadstop', inAppBrowserbLoadStop);
      inAppBrowserbRef.addEventListener('loaderror', inAppBrowserbLoadError);
      inAppBrowserbRef.addEventListener('exit', inAppBrowserbClose);
      function inAppBrowserbLoadStart(event) {
        navigator.notification.activityStart("Please Wait", "Its loading....");
      }
      function inAppBrowserbLoadStop(event) {
        navigator.notification.activityStop();
      }
      function inAppBrowserbLoadError(event) {
        navigator.notification.activityStop();
      }
      function inAppBrowserbClose(event) {
        inAppBrowserbRef.removeEventListener('loadstart', iabLoadStart);
        inAppBrowserbRef.removeEventListener('loadstop', iabLoadStop);
        inAppBrowserbRef.removeEventListener('loaderror', iabLoadError);
        inAppBrowserbRef.removeEventListener('exit', iabClose);
      }
    }

    // check if click from swm or compaint
    $scope.navigatecomplaint = function (check) {
      if (check) {
        $rootScope.swmCall = true;
        $state.go("app.complaintrefrence")
      } else {
        $rootScope.swmCall = false;
        $state.go("app.complaintrefrence")
      }
    }

    $scope.aboutUs = function () {
      var inAppBrowserbRef = null;
      console.log("dxfghj" + $scope.aboutUsUrl)
      inAppBrowserbRef = window.open(encodeURI($scope.aboutUsUrl), '_blank', 'location=yes,toolbar=yes');
      inAppBrowserbRef.addEventListener('loadstart', inAppBrowserbLoadStart);
      inAppBrowserbRef.addEventListener('loadstop', inAppBrowserbLoadStop);
      inAppBrowserbRef.addEventListener('loaderror', inAppBrowserbLoadError);
      inAppBrowserbRef.addEventListener('exit', inAppBrowserbClose);
      function inAppBrowserbLoadStart(event) {
        navigator.notification.activityStart("Please Wait", "Its loading....");
      }
      function inAppBrowserbLoadStop(event) {
        navigator.notification.activityStop();
      }
      function inAppBrowserbLoadError(event) {
        navigator.notification.activityStop();
      }
      function inAppBrowserbClose(event) {
        inAppBrowserbRef.removeEventListener('loadstart', iabLoadStart);
        inAppBrowserbRef.removeEventListener('loadstop', iabLoadStop);
        inAppBrowserbRef.removeEventListener('loaderror', iabLoadError);
        inAppBrowserbRef.removeEventListener('exit', iabClose);
      }
    }
  });
