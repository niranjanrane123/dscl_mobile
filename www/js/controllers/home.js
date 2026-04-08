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
    $scope.totalAppCount;
    $scope.totalBMPSCount;

        $scope.lang = $localStorage.langNewId
console.log("langid",$scope.lang )
const codes = ['M', 'DM', 'CO', 'DC'];
$scope.memberDetails = [];

Promise.all(
  codes.map(code => RestService.getMemberProfileDetails(code, 1))
).then(responses => {
  responses.forEach((response, index) => {
    console.log(`Response for code ${codes[index]}:`, response);
    $scope.memberDetails = $scope.memberDetails.concat(response);
  });
  console.log("Final $scope.memberDetails:", $scope.memberDetails);
   $scope.memberDetailsGrouped = [];
  for (let i = 0; i < $scope.memberDetails.length; i += 2) {
    $scope.memberDetailsGrouped.push($scope.memberDetails.slice(i, i + 2));
  }
  if (!$scope.$$phase) {
    $scope.$apply();
  }
}).catch(err => {
  console.error('Error fetching details:', err);
});

    $scope.$on('$ionicView.enter', function () {
      console.log("Home entered")
    });

// Enhancement #193178
    /* RestService.getMDDALid().then(function (response) {
      $ionicLoading.show();
      console.log("lid response="+ JSON.stringify(response));        
      if (response == undefined || response == null || response == "") {
        $ionicLoading.hide();
        return false;
      }
      var lidData = response.data;
      // var lidData= response;
      console.log("***get Lid" + lidData);       
      $scope.lid = lidData.lid;

      RestService.getMDDAProjectSummary($scope.lid).then(function (response1) {
   
        console.log("summary response="+ JSON.stringify(response1));        
        if (response1 == undefined || response1 == null || response1 == "") {
          $ionicLoading.hide();
          return false;
        }

        var respData = response1.data;
        var ct = respData.length;
        $scope.totalAppCount = ct;
        $scope.totalBMPSCount = ct;
        // console.log("total count="+$scope.totalCount);
        $sessionStorage.mddaSummaryData = respData;
        // $state.go('app.mdda-project'); 
        $ionicLoading.hide();
      }, function (err) {
        //toaster.error($filter('translate')('MDDAERROR'));
        console.log("Error in MDDA", err)
        //toaster.error($filter('translate')('MDDATHIRDPARTYERROR'));
        $ionicLoading.hide();
      })
      $ionicLoading.hide();
    }, function (err) {
      //toaster.error($filter('translate')('MDDAERROR'));
      console.log("Error in MDDA", err)
      //toaster.error($filter('translate')('MDDAACCESSFAILED'));   ////Defect: #187848
      $ionicLoading.hide();
    })  */

    $('#tollFree').click(function(){
      console.log('toll free number called');
      $scope.tollFreeNumber = '18001802525';
      window.plugins.CallNumber.callNumber(onSuccess, onError, $scope.tollFreeNumber, false);
    });

    $('#callSOS').click(function(){
      console.log('toll free number called');
      $scope.callSOS();
    });

    $('#whatsAppId').click(function(){
      if($scope.isAndroid){
        window.open(encodeURI(RestService.whatsappUrl), '_system', 'location=no,toolbar=yes,useWideViewPort=yes');
      }else{
        window.location.href=RestService.whatsappUrl;
      }

    });

    $scope.apuniSarkar = function() {
      
      RestService.getJwtToken($scope.orgid,$scope.userID).then(function(tokenId){
        $ionicLoading.show();
        var url = ENV.apuniSarkarURL + tokenId;
        console.log('apuni sarkar url-->',url);
        if($scope.isAndroid){
          window.open(encodeURI(url), '_system', 'location=no,toolbar=yes,useWideViewPort=yes')
        }else{
          cordova.InAppBrowser.open(url, '_system', 'location=no,toolbar=yes,useWideViewPort=yes');
        }
        //location.href = url;
        $ionicLoading.hide();
      }, function (err) {
        //toaster.error($filter('translate')('APUNISARKARERROR'));
        console.log("Error in Apuni Sarkar", err),
        toaster.error($filter('translate')('ACCESSTOKENFAILED'));
        $ionicLoading.hide();
      });
    }

    // Ongoing project view all
    $scope.viewAll = function() {
      $sessionStorage.comeFrom =  "OnGoingProjects";
      $state.go('app.OnGoingProjects');
    };

    // Ongoing project view all
    $scope.viewAllPopular = function() {
      $sessionStorage.comeFrom =  "PopularPlaces";
      $state.go('app.OnGoingProjects');
    };

  // Open Links 
  $scope.openLink = function(comeFrom){
    $sessionStorage.comeFrom = comeFrom;
    $sessionStorage.comeFromPage = 'Home'; 
    $state.go('app.OpenLink');      
  }

   $scope.openService=function(comeFrom){
        console.log("comfo.",comeFrom)
        $sessionStorage.comeFrom=comeFrom
        $state.go('app.subHome')
    }
    
  $scope.callService =function(service){   
    $rootScope.callService(service) 
  }

        $scope.notAvailable=function(){
       var confirmPopup = $ionicPopup.show({

          title: $filter('translate')('message'),
          template: $filter('translate')('SERVICENOTAVAI'),

          buttons: [{
            text: $filter('translate')('CANCEL'),
            type: 'button button-block  customBgColor',
          },
        ]
        })
      }

    var _init = function () {
      
      if (!$rootScope.checkLocationOFF()) {
        return;
    }
  
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
            toaster.error($filter('translate')('ACCESSTOKENFAILED'));
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
          'message: ' + error.message + '\n',"home page alrt");
      }

      navigator.geolocation.getCurrentPosition(geoSuccess, fail);



      $cordovaGeolocation.getCurrentPosition(options).then(function (position) {
        console.log(position.coords.latitude);
        console.log(position.coords.longitude);
        $scope.lat = position.coords.latitude;
        $scope.long = position.coords.longitude;
        $sessionStorage.lat = $scope.lat;
        $sessionStorage.long = $scope.long;
        console.log("lat=", $sessionStorage.lat);
        console.log("log=",$sessionStorage.long);


        //for testing
        //$scope.lat = 30.3255646;
        //$scope.long = 78.0436813;
        //$sessionStorage.lat = $scope.lat;
        //$sessionStorage.long = $scope.long;
        //console.log("lat= near by js", $scope.lat);
        //console.log("log= near by js", $scope.long);

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
        
        if(res == "Exception occured while calling emergency sos call 112"){
          // toaster.error($filter('translate')(res));
          toaster.error($filter('translate')('SOSTHIRDPARTYERROR'));
          $ionicLoading.hide();
        } else {
          var response =  JSON.parse(res);
          console.log("sos4--", response, response.resultCode, response.payLoad, response.errorMsg);  
          // var responseJson = JSON.parse(res);     
          if(res==undefined || res == null || res=="")
            {
              toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR'));
              
              $ionicLoading.hide();
              return false;
            }
          else if(res.length>0)
            {
              console.log("1**");
              if(response.resultCode == "COMM_OPERATION_SUCCESS"){
                console.log("2**");
                $rootScope.simpleAlert($filter('translate')('SOSCALLSUCCESS') + response.payLoad);
                console.log("3**");
              } else {
                console.log("4**");
                $rootScope.simpleAlert(response.errorMsg);
              }
              console.log("5**");
            }
          
          $ionicLoading.hide();
        }
      },function (err) {
        //toaster.error($filter('translate')('EMERGENCY_CALL_112_ERROR'));
        console.log("Error for SOS", err);
        toaster.error($filter('translate')('SOSTHIRDPARTYERROR'));
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

        //$sessionStorage.allgrievanceresponse = $scope.allgrievance;
        $scope.allgrievance.sort(function(a,b){
          return b.dateOfRequest - a.dateOfRequest;
        });
        $sessionStorage.allgrievanceresponse = $scope.allgrievance;
        $state.go("app.reopen");

        $ionicLoading.hide();
      }, function (err) {
        console.log("---error--" + err);
        toaster.error($filter('translate')('REOPENCOMPLAINTERROR')/* , $filter('translate')('ERROR_OCCURED') */);
        $ionicLoading.hide();
      })
    };

// Enhancement #193178
    /* $scope.mddaProject = function(comeFrom){
      $sessionStorage.comeFrom = comeFrom;
      $state.go('app.mdda-project');
    } */

    $scope.openDonation = function(){
      $sessionStorage.donationFlag = true;
      $sessionStorage.fromLandingPage = false;
      console.log('donation service called');
      $state.go('app.complaintRegistration');
    }
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
