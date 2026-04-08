// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', [
  'ionic',
  'starter.controllers',
  'ui.calendar',
  'ui.bootstrap',
  'LocalStorageModule',
  'pascalprecht.translate',
  'toaster',
  'ngSanitize',
  'ui.utils.masks',
  'ngStorage',
  'ngCordova',
  'chart.js',
  'ja.qr',
  'ui.select',
  'ngAnimate',
  /*'ngMaterial'*/
])
  .controller('TodoCtrl', function ($ionicPopup, $filter, $rootScope, $scope, $state, $ionicLoading, $ionicHistory, $localStorage,
    $window, $cordovaImagePicker, $ionicPlatform, $cordovaCapture) {

      $scope.myGoBack = function() {
        // console.log("BACK",$ionicHistory.viewHistory())
        // $ionicHistory.goBack();
        if ($localStorage.responselogindata) {
          $state.go('app.home');
        } else {
          $state.go('app.LandingPage');
        }
      };

    $rootScope.swmCall = false;
    $rootScope.swmAccessToken = null;
    $rootScope.swmCall = false;
    $scope.scheduleMultipleNotifications = function () {
      $cordovaLocalNotification.schedule([
        {
          id: 1,
          title: 'Title 1 here',
          text: 'Text 1 here',
          data: {
            customProperty: 'custom 1 value'
          }
        },
        {
          id: 2,
          title: 'Title 2 here',
          text: 'Text 2 here',
          data: {
            customProperty: 'custom 2 value'
          }
        },
        {
          id: 3,
          title: 'Title 3 here',
          text: 'Text 3 here',
          data: {
            customProperty: 'custom 3 value'
          }
        }
      ]).then(function (result) {
        // ...
      });
    };


   

    $scope.$on('$ionicView.enter', function (e) {
      if ($localStorage.responselogindata) {
        $scope.loginUSername = $localStorage.responselogindata.firstName;
        $scope.loginlast = $localStorage.responselogindata.lastName;
        $scope.loginName = $scope.loginUSername + " " + $scope.loginlast;
        // $state.go("app.home");
      } else {
        // $state.go("app.LandingPage");
        return;
      };
    });

    $scope.logout = function () {
      $ionicLoading.show({ template: 'Logging out....' });
      var langId = $localStorage.langID;
      $localStorage.$reset();      
      $window.localStorage.clear();
      $ionicHistory.clearCache();
      $ionicHistory.clearHistory();
      $ionicHistory.nextViewOptions({ disableBack: true, historyRoot: true });
      $ionicLoading.hide();
      $localStorage.langID = langId;
      if(langId == 1)
        $localStorage.english = false;
      else
        $localStorage.english = true;
      // $state.go("app.LoginPage");
      $state.go("app.LandingPage");
    }

    $rootScope.emergencyCallSOS = function () {    
    }
    $rootScope.showLocationPermissionPopup = function () {
      console.log("showLocationPermissionPopup called 2");
      
      var confirmPopup = $ionicPopup.confirm({
          title: $filter('translate')('LOCATIONIREQ'),
          template: $filter('translate')('LOCATIONACCESSDOC'),
          buttons: [{
                  text: $filter('translate')('CANCEL'),
                  type: 'button-cancel',
                  onTap: function() {
                      // Handle cancel action
                      // if($localStorage.responselogindata){
                      //   $state.go('app.home')
                      // }else{
                      //   $state.go("app.LoginPage");
                      // }
                  }
              },
              {
                  text: $filter('translate')('Enable'),
                  type: 'button-positive',
                  onTap: function() {
                      cordova.plugins.diagnostic.switchToLocationSettings();
                  }
              }
          ]
      });
    }
    
$rootScope.checkLocationOFF=function(){
  console.log("$rootScope.checkLocationOFF called")
if (window.cordova && window.cordova.plugins && window.cordova.plugins.diagnostic) {
  cordova.plugins.diagnostic.isLocationAvailable(function(enabled) {
      console.log("Location is " + (enabled ? "enabled" : "disabled"));
      $rootScope.locationEnabled = enabled;
      if(!enabled){
       $rootScope.showLocationPermissionPopup();
        // return enabled;
      }
  }, function(error) {
      console.error("The following error occurred: " + error);
  });
  // if(!$rootScope.locationEnabled) return;
  return $rootScope.locationEnabled;
} else {
  console.error("Cordova Diagnostic plugin not found. Are you running on a device?");
}

}

$rootScope.loginPopUp = function (res) {      
      var confirmPopup = $ionicPopup.confirm({
          title: $filter('translate')(res),
          template: $filter('translate')('WANTLOGIN'),
          buttons: [{
                  text: $filter('translate')('CANCEL'),
                  type: 'button-cancel',
                  onTap: function() {
                  }
              },
              {
                  text: $filter('translate')('YES'),
                  type: 'button-positive',
                  onTap: function() {
                      $state.go('app.LoginPage')
                  }
              }
          ]
      });
    }



    $rootScope.simpleAlert = function (message) {
      var confirmPopup = $ionicPopup.show({
        title: $filter('translate')('message'),
        template: $filter('translate')(message),
        buttons: [{
          text: $filter('translate')('OK'),
          type: 'button button-block  customBgColor',
          onTap: function () {

          }
        }]
      });
    }
  })

  .run(function ($ionicPlatform, ENV, $rootScope, $window, $ionicPopup, $ionicHistory, $location, $state, RestService, toaster, $filter, $ionicLoading, $localStorage, $sessionStorage) {
    $ionicPlatform.ready(function () 
    {

      
      // in app update start
      console.log("window.plugins.updatePlugin.update",window.plugins.updatePlugin.update)
      console.log("cordova.plugins.diagnostic",cordova.plugins.diagnostic)
      // $rootScope.checkLocationOFF()
      window.plugins.updatePlugin.update(()=>{
        //success callback
        // alert("in update code")
        console.log("success****");
        },()=>{
        //error callback
        console.log("error****");
        },{
          IOS: {
              type: "FLEXIBLE",
              stallDays: 0    
          },
          ANDROID: {
              type: "FLEXIBLE"
            }
        });

      // in app update end

      $ionicPlatform.ready(function () {

    if (window.StatusBar) {
        StatusBar.overlaysWebView(false);
        StatusBar.styleDefault();
        StatusBar.backgroundColorByHexString("#095788");
    }

});


      navigator.splashscreen.hide(); 
      
      cordova.plugins.notification.local.setDummyNotifications();
      
      $rootScope.isIOS = ionic.Platform.isIOS();
      console.log('ios-->',$rootScope.isIOS);
      $rootScope.isAndroid = ionic.Platform.isAndroid();
      console.log('android-->',$rootScope.isAndroid);

      // window.plugins.PushbotsPlugin.initialize("5a2f8b989b823a43638b4576", { "android": { "sender_id": "414930510455" } });
      // window.plugins.PushbotsPlugin.on("user:ids", function (data) {
      //   userToken = data.token;
      //   userId = data.userId
      // });

      if (window.Connection) {
        if (navigator.connection.type == Connection.NONE) {
          var confirmPopup = $ionicPopup.show({
            title: $filter('translate')('message'),
            template: 'The internet is disconnected on your device.',
            buttons: [
              {
                text: 'Ok',
                type: 'button button-block button-positive customBgColor',
                onTap: function () { }
              }]
          })
            .then(function (result) {
              console.log("result connection---" + result);
              if (!result) {
                ionic.Platform.exitApp();
              }
            });
        }
      }

      /*Get MAC Address Start
      cordova.exec(successCallback, failureCallback, 'MacAddressPlugin',
            'getMacAddress', []);

      function successCallback(data){
        $localStorage.macAddress = data;
      }
      function failureCallback(err){
      }
      Get MAC Address End*/

      /*Get MAC Address Start*/
      window.MacAddress.getMacAddress(
        function (macAddress) {
          console.log(macAddress);
          $localStorage.macAddress = macAddress;
          console.log("macaddress " + $localStorage.macAddress)
        }, function (fail) { console.log(fail); }

      );
      /*Get MAC Address End*/
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      if (window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(false);
        cordova.plugins.Keyboard.disableScroll(true);
      }
      if (window.StatusBar) {
        // org.apache.cordova.statusbar required
        StatusBar.styleDefault();
      }

      /* if($localStorage.responselogindata == null ||
           typeof $localStorage.responselogindata == undefined){
         $state.go("app.LoginPage");
       }else{
         $state.go("app.home");
       }*/
      // $rootScope.appVersion = "0.0.0";
      // cordova.getAppVersion(function (version) {
      //   $rootScope.appVersion = version;
      // });

      if (window.cordova){
        cordova.getAppVersion(function(version) {
          console.log("Application Version",version)
          $rootScope.appVersion = version;
        });
      }

      window.open = cordova.InAppBrowser.open;

      if ($localStorage.responselogindata) {
        console.log("in home***");
        $state.go('app.home');
      }
      else{
        console.log("in landing***");
        $state.go('app.LandingPage');
      }
    });
    $localStorage.langID = "1";
    var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    $rootScope.pad = function (s) { return (s < 10) ? '0' + s : s; }
    $rootScope.formatDate = function (myDate) {
      if (myDate == "" || myDate == null || myDate == undefined) return "";
      else {
        var d = new Date(myDate);
        return [pad(d.getDate()), monthNames[d.getMonth()], d.getFullYear()].join('-');
      }
    }
    /*$rootScope.dateToMilli = function(myDate){
      var milliDate = new Date(myDate).getTime();
      return milliDate;
    }*/
    $rootScope.makeFloat = function (number) {
      var num = number;
      if (num != '' || num == 0) {
        return num + ".00";
      }
      else {
        return num;
      }
    }
    $rootScope.fullmandatory = function (checkkMANDATORY) {
      var fullcheckkMANDATORYDesc;
      if (checkkMANDATORY == "Y") fullcheckkMANDATORYDesc = $filter('translate')("YES");
      else if (checkkMANDATORY == "N") fullcheckkMANDATORYDesc = $filter('translate')("NO");
      else fullcheckkMANDATORYDesc = "";
      return fullcheckkMANDATORYDesc;
    }
    $rootScope.capitalise = function (string) {
      return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
    }
    $rootScope.fullGender = function (gender) {
      var fullGenderDesc;
      if (gender == "F") fullGenderDesc = "Female";
      else if (gender == "M") fullGenderDesc = "Male";
      else if (gender == "T") fullGenderDesc = "Transgender";
      else fullGenderDesc = "";
      return fullGenderDesc;
    }
    $rootScope.changeDateAttr = function (item, model, placeholder) {
      if (model == "" || model == null || model == undefined)
        item.currentTarget.setAttribute("placeholder", placeholder);
      else item.currentTarget.setAttribute("placeholder", "");
    }
    $rootScope.homepage = function () {
      $location.replace();
      $state.go("app.home");
    }

    $rootScope.readFile = function () {
      var reader = new FileReader();
      var file = e.files[0];
      uploadedFileName = file.name;
      var maxSize = e.getAttribute('data-max-size');
      var fileSize = file.size;
      var ext = e.value.split('.').pop();
      if (ext) {
        if (ext == "pdf" || ext == "docx" || ext == "doc") {
        }
        else {
          e.value = "";
          $rootScope.simpleAlert('Onlypdfdoc');
          $('#iDivBusyLoad').hide();
          return;
        }
      } else {
        $rootScope.simpleAlert('validdocument');
        $('#iDivBusyLoad').hide();
        return;
      }
      if (fileSize > maxSize) {
        e.value = "";
        $rootScope.simpleAlert('validdocumentSize');
        $('#iDivBusyLoad').hide();
        return;
      }

      reader.onload = function () {
        uploadedFile = btoa(reader.result.toString());
        docList.push({
          attachmentId: null,
          documentId: null,
          documentName: uploadedFileName,
          documentSerialNo: null,
          descriptionType: null,
          documentType: null,
          uploadedDocumentPath: null,
          doc_DESC_Mar: null,
          doc_DESC_ENGL: "",
          documentByteCode: uploadedFile,
          checkkMANDATORY: null
        });
      };
      reader.onloadend = function () { $('#iDivBusyLoad').hide(); };
      reader.readAsBinaryString(file);
    }
    $rootScope.getCurrentDate = function () {
      RestService.getServerDate()
        .then(function (response) {
          $sessionStorage.currentDate = response;
          return response;
        }, function (err) {
          return [];
        })
    }
    $rootScope.callService =function(service){   
      console.log("IN app call service,",service)
      if (!$rootScope.checkLocationOFF()) {
        return;
    }else{
      $state.go(service);  
    } 
    }

    $rootScope.getNonHData = function (lookUpCode, dropdown, orgId) {
      $ionicLoading.show();
      RestService.getNHPrefixData(lookUpCode, 6)
        .then(function (response) {
          if (response.length > 0) {
            var listResponse = response;
            console.log("lookUpCode: " + lookUpCode + "|listResponse: " + JSON.stringify(listResponse));
            $rootScope[dropdown] = new Array();
            for (var i = 0; i < listResponse.length; i++) {
              if ($localStorage.langID == "1") {
                $rootScope[dropdown].push({
                  value: listResponse[i].lookUpId,
                  name: listResponse[i].descLangFirst
                })
              } else {
                $rootScope[dropdown].push({
                  value: listResponse[i].lookUpId,
                  name: listResponse[i].descLangSecond
                })
              }
            }
            //if(lookUpCode == "SHF"){
            $rootScope["temp" + dropdown] = $rootScope[dropdown];
            $rootScope["main" + dropdown] = response;
            //}

            $ionicLoading.hide();
          }
          else {
            $ionicLoading.hide();
            toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR_OCCURED'));
            return [];
          }
        }, function (err) {
          toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR_OCCURED'));
          $ionicLoading.hide();
          return [];
        })
    }



   // Download  code start
onErrorLoadFs = function(errror) {

  console.log(" Eror onErrorLoadFs "+errror);
  toaster.error($filter('translate')('LOADERROR'));
  
}

onErrorCreateFile = function(error) {

  console.log("Eror onErrorCreateFile "+ JSON.stringify(error));
  toaster.error($filter('translate')('DOWNLOADERROR'));
  
}

onErrorReadFile = function(error) {

  console.log("Eror onErrorReadFile "+error);
  toaster.error($filter('translate')('READERROR'));
  
}


function readFile(fileEntry,typ) {

  fileEntry.file(function (file) {
      var reader = new FileReader();

      reader.onloadend = function() {
          console.log("Successful file read: " + this.result);
          // displayFileData(fileEntry.fullPath + ": " + this.result);
          console.log("file entry---", fileEntry.fullPath,"2nd ",fileEntry.toNativeURL())
          // displayFileData(fileEntry.fullPath + ": " + this.result);
          cordova.plugins.notification.local.schedule({
            id:1,
            title: 'Your file has been downloaded successfully',
            text: 'Check your Downloads Folder',
            foreground: true,
            icon: "res://ic_launcher",
          });

// Defect. #185631
          /* cordova.plugins.fileOpener2.open(
            fileEntry.toNativeURL(), // You can also use a Cordova-style file uri: cdvfile://localhost/persistent/Downloads/starwars.pdf
            typ,
            {
                error : function(e) {
                    console.log('Error status: ' + e.status + ' - Error message: ' + e.message);
                    toaster.error($filter('translate')('ERROR'),e.message);
                },
                success : function () {
                    console.log('file opened successfully');
                    toaster.success($filter('translate')('DOWNLOADSUCCESS'));
                }
            }
        ); */
      };

      reader.readAsDataURL(file);

  }, onErrorReadFile);
}


function writeFile(fileEntry, dataObj,typ) {
  // Create a FileWriter object for our FileEntry (log.txt).
  fileEntry.createWriter(function (fileWriter) {

      fileWriter.onwriteend = function() {
          console.log("Successful file write...");
          console.log("fileEntry="+fileEntry.fullPath+ " "+fileEntry);
          readFile(fileEntry,typ);
      };

      fileWriter.onerror = function (e) {
          console.log("Failed file write: " + e.toString());
          toaster.error($filter('translate')('DOWNLOADERROR'));
          
      };

      // If data object is not passed in,
      // create a new Blob instead.
      // if (!dataObj) {
      //     dataObj = new Blob(['some file data'], { type: 'text/plain' });
      // }

      fileWriter.write(dataObj);
  });
} 
    $rootScope.base64toBlob= function(base64Data, contentType,fn) {
      contentType = contentType;
      // contentType = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
      var sliceSize = 1024;
      var byteCharacters = atob(base64Data);
      var bytesLength = byteCharacters.length;
      var slicesCount = Math.ceil(bytesLength / sliceSize);
      var byteArrays = new Array(slicesCount);
  
      for (var sliceIndex = 0; sliceIndex < slicesCount; ++sliceIndex) {
          var begin = sliceIndex * sliceSize;
          var end = Math.min(begin + sliceSize, bytesLength);
  
          var bytes = new Array(end - begin);
          for (var offset = begin, i = 0; offset < end; ++i, ++offset) {
              bytes[i] = byteCharacters[offset].charCodeAt(0);
          }
          byteArrays[sliceIndex] = new Uint8Array(bytes);
      }
       
  
      var blob = new Blob(byteArrays, { type: contentType });
  
              console.log("blob="+blob);
              // var fileName = $scope.accNo + ".pdf";
              var fileName = fn;
              var dataDirectory;
              if($rootScope.isIOS){
                dataDirectory=cordova.file.syncedDataDirectory;
              }else{
                dataDirectory=cordova.file.externalRootDirectory
              }
              console.log("dataDirectory-----s",dataDirectory)
  
              window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fs) {
  
                console.log('file system open: ' + fs.name);
                window.resolveLocalFileSystemURL(dataDirectory,function ( dirEntry) {
      
                  dirEntry.getDirectory('Download', { create: true }, function (dirEntry) {
      
                  dirEntry.getFile('_'+Date.now()+'_'+fileName, { create: true, exclusive: false }, function (fileEntry) {
            
                    console.log("fileEntry is file?" + fileEntry.isFile.toString());
                    // fileEntry.name == 'someFile.txt'
                    // fileEntry.fullPath == '/someFile.txt'
                    writeFile(fileEntry, blob,contentType);
                    $ionicLoading.hide();
                }, onErrorCreateFile);
              });
            });
            }, onErrorLoadFs);
  }

// Download  code end

  })

  .config(function ($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
    $stateProvider
      .state('app', {
        url: '/app',
        abstract: true,
        templateUrl: 'templates/menu.html',

      })

      .state('app.home', {
        url: '/home/{index:[a-zA-Z]{0,12}}',
        views: {
          'menuContent': {
            templateUrl: 'templates/states/home.html'
          }
        }
      })
      .state('app.subHome', {
              views: {
                'menuContent': {
                  templateUrl: 'templates/states/subHome.html'
                }
              }
            })
      .state('app.LoginPage', {
        url: '/LoginPage',
        views: {
          'menuContent': {
            templateUrl: 'templates/LoginPage.html'
          }
        }
      })

  
      // Langing page 

      .state('app.LandingPage', {
        url: '/LandingPage',
        views: {
          'menuContent': {
            templateUrl: 'templates/LandingPage/LandingPage.html',
            controller: 'LandingPageCtrl'
          }
        }
      })

      // Open Links

      .state('app.OpenLink', {
        url: '/OpenLink',
        views: {
          'menuContent': {
          templateUrl: 'templates/LandingPage/OpenLinks.html'
          }
        }
      })


      // On Going Project page 

      .state('app.OnGoingProjects', {
        url: '/OnGoingProjects',
        views: {
          'menuContent': {
            templateUrl: 'templates/OnGoingProjects/OnGoingProjects.html'
          }
        }
      })

      .state('app.publicnotices', {
        url: '/publicnotices',
        views: {
          'menuContent': {
            templateUrl: 'templates/states/publicnotices.html'
          }
        }
      })

      .state('app.faq', {
        url: '/faq',
        views: {
          'menuContent': {
            templateUrl: 'templates/states/faq.html'
          }
        }
      })

      .state('app.contactus', {
        url: '/contactus',
        views: {
          'menuContent': {
            templateUrl: 'templates/states/contactus.html',
            controller: 'ContactusCtrl'
          }
        }
      })

      .state('app.termsandCondition', {
        url: '/termsandCondition',
        views: {
          'menuContent': {
            templateUrl: 'templates/states/termsandCondition.html'
          }
        }
      })
      
      //edit profile
        // .state('app.editProfile', {
      //   cache: false,
      //   url: '/editProfile',
      //   views: {
      //     'menuContent': {
      //       templateUrl: 'templates/editProfile.html',
      //       controller: 'EditProfileController'
      //     }
      //   }
      // })

      .state('app.editProfile', {
        url: '/editProfile',
        views: {
          'menuContent': {
            templateUrl: 'templates/editProfile.html'
          }
        }
      })

      .state('app.AboutUs', {
        url: '/AboutUs',
        views: {
          'menuContent': {
            templateUrl: 'templates/states/AboutUs.html',
            controller: 'AboutUsCtrl'
          }
        }
      })
      .state('app.Metrological', {
        url: '/Metrological',
        views: {
          'menuContent': {
            templateUrl: 'templates/states/Metrological.html',
            controller: 'AboutUsCtrl'
          }
        }
      })
      .state('app.privacyPolicy', {
        url: '/privacyPolicy',
        views: {
          'menuContent': {
            templateUrl: 'templates/states/privacyPolicy.html'
          }
        }
      })
      .state('app.helpLine', {
        url: '/helpLine',
        views: {
          'menuContent': {
            templateUrl: 'templates/states/helpLine.html'
          }
        }
      })

      .state('app.Register', {
        url: '/Register',
        views: {
          'menuContent': {
            templateUrl: 'templates/states/Register.html'
          }
        }
      })

      .state('app.forgotpassword', {
        url: '/forgotpassword',
        views: {
          'menuContent': {
            templateUrl: 'templates/states/forgotpassword.html'
          }
        }
      })
      /*--------application start*-----------*/
      .state('app.applicationStatus', {
        url: '/applicationStatus',
        views: {
          'menuContent': {
            templateUrl: 'templates/states/applicationStatus.html'
          }
        }
      })
      .state('app.applicationStatusDetail', {
        url: '/applicationStatusDetail',
        views: {
          'menuContent': {
            templateUrl: 'templates/states/applicationStatusDetail.html'
          }
        }
      })
      /*complaint start */

      /* new complaint*/
      .state('app.complaintPage', {
        url: '/complaintPage',
        views: {
          'menuContent': {
            templateUrl: 'templates/Complaint/complaintPage.html'
          }
        }
      })

      .state('app.LodgeComplaint', {
        url: '/LodgeComplaint',
        views: {
          'menuContent': {
            templateUrl: 'templates/Complaint/LodgeComplaint.html'
          }
        }
      })

      .state('app.reopen', {
        url: '/reopen',
        views: {
          'menuContent': {
            templateUrl: 'templates/Complaint/reopen.html'
          }
        }
      })

      /*  .state('app.complaintreceipt', {
          url: '/complaintreceipt',
          views: {
            'menuContent': {
              templateUrl: 'templates/Complaint/complaintreceipt.html'
            }
          }
        })*/

      .state('app.complaintstatus', {
        url: '/complaintstatus',
        views: {
          'menuContent': {
            templateUrl: 'templates/Complaint/complaintstatus.html'
          }
        }
      })

      .state('app.compstatusdetail', {
        url: '/compstatusdetail',
        views: {
          'menuContent': {
            templateUrl: 'templates/Complaint/compstatusdetail.html'
          }
        }
      })

      .state('app.reopentokenpage', {
        url: '/reopentokenpage',
        views: {
          'menuContent': {
            templateUrl: 'templates/Complaint/reopentokenpage.html'
          }
        }
      })

      .state('modal-template', {
        url: '/modal-template',
        views: {
          templateUrl: 'templates/Complaint/modal-template',
          controller: 'uploadmodalCtrl'
        }
      })

      .state('app.newComplaint', {
        url: '/newComplaint',
        views: {
          'menuContent': {
            templateUrl: 'templates/Complaint/newComplaint.html'
          }
        }
      })

      .state('app.commentPage', {
        url: '/commentPage',
        views: {
          'menuContent': {
            templateUrl: 'templates/Complaint/commentPage.html'
          }
        }
      })

      /* new */

      /*----NIDAN COMPLAINT---*/

      .state('app.nidanHomePage', {
        url: '/nidanHomePage',
        views: {
          'menuContent': {
            templateUrl: 'templates/Complaint/Nidan/nidanHomePage.html'
          }
        }
      })

      .state('app.nidanApplicationDetail', {
        url: '/nidanApplicationDetail',
        views: {
          'menuContent': {
            templateUrl: 'templates/Complaint/Nidan/nidanApplicationDetail.html'
          }
        }
      })

      .state('app.nidanComplaintRegister', {
        url: '/nidanComplaintRegister',
        views: {
          'menuContent': {
            templateUrl: 'templates/Complaint/Nidan/nidanComplaintRegister.html'
          }
        }
      })
      .state('app.nidanReceipt', {
        url: '/nidanReceipt',
        views: {
          'menuContent': {
            templateUrl: 'templates/Complaint/Nidan/nidanReceipt.html'
          }
        }
      })

      .state('app.nidanStatus', {
        url: '/nidanStatus',
        views: {
          'menuContent': {
            templateUrl: 'templates/Complaint/Nidan/nidanStatus.html'
          }
        }
      })
      .state('app.nidanStatusdetail', {
        url: '/nidanStatusdetail',
        views: {
          'menuContent': {
            templateUrl: 'templates/Complaint/Nidan/nidanStatusdetail.html'
          }
        }
      })

      /*complaint end*/

      /*property tax module start */

      .state('app.propertyservice', {
        url: '/propertyservice',
        views: {
          'menuContent': {
            templateUrl: 'templates/Property/PropertyService.html'
            /*controller: 'propertyServiceCtrl'*/
          }
        }
      })

      .state('app.qrCode', {
        url: '/qrCode',
        views: {
          'menuContent': {
            templateUrl: 'templates/Property/qrCode.html'
            /*controller: 'propertyServiceCtrl'*/
          }
        }
      })

      .state('app.propertypay', {
        url: '/propertypay',
        views: {
          'menuContent': {
            templateUrl: 'templates/Property/PropertyTax/propertypay.html'
            /*controller: 'propertyPayCtrl'*/
          }
        }
      })

      .state('app.propertydetail', {
        url: '/propertydetail',
        views: {
          'menuContent': {
            templateUrl: 'templates/Property/PropertyTax/propertydetail.html'
            /* controller: 'propertyDetailsCtrl'*/
          }
        }
      })
      .state('app.propertytaxdetail', {
        url: '/propertytaxdetail',
        views: {
          'menuContent': {
            templateUrl: 'templates/Property/PropertyTax/propertytaxdetail.html'
            /* controller: 'propertyTaxDetailCtrl'*/
          }
        }
      })
      .state('app.propertypaymentpage', {
        url: '/propertypaymentpage',
        views: {
          'menuContent': {
            templateUrl: 'templates/Property/PropertyTax/propertypaymentpage.html'
            /* controller: 'propertypaymentCtrl'*/
          }
        }
      })

      .state('app.noChangeValidate', {
        url: '/noChangeValidate',
        views: {
          'menuContent': {
            templateUrl: 'templates/Property/NoChange/noChangeValidate.html'
            /* controller: 'propertypaym??entCtrl'*/
          }
        }
      })

      .state('app.noChangeuserDetail', {
        url: '/noChangeuserDetail',
        views: {
          'menuContent': {
            templateUrl: 'templates/Property/NoChange/noChangeuserDetail.html'
          }
        }
      })

      .state('app.noChangeTaxdetail', {
        url: '/noChangeTaxdetail',
        views: {
          'menuContent': {
            templateUrl: 'templates/Property/NoChange/noChangeTaxdetail.html'
          }
        }
      })

      .state('app.noChangePaymentPage', {
        url: '/noChangePaymentPage',
        views: {
          'menuContent': {
            templateUrl: 'templates/Property/NoChange/noChangePaymentPage.html'
          }
        }
      })


      /*block chain*/
      .state('app.propertySearch', {
        url: '/propertySearch',
        views: {
          'menuContent': {
            templateUrl: 'templates/Property/PropertyTransfer/propertySearch.html'
          }
        }
      })

      .state('app.owenerShipDetails', {
        url: '/owenerShipDetails',
        views: {
          'menuContent': {
            templateUrl: 'templates/Property/PropertyTransfer/ownerShipDetail.html'
          }
        }
      })

      .state('app.initiateTransfer', {
        url: '/initiateTransfer',
        views: {
          'menuContent': {
            templateUrl: 'templates/Property/PropertyTransfer/initiateTransfer.html'
          }
        }
      })
      .state('app.propertyDocUpload', {
        url: '/propertyDocUpload',
        views: {
          'menuContent': {
            templateUrl: 'templates/Property/PropertyTransfer/propertyDocUpload.html'
          }
        }
      })
      /*property tax module  end */

      /*  water module */

      .state('app.WaterModule', {
        url: '/WaterModule',
        views: {
          'menuContent': {
            templateUrl: 'templates/Water/WaterModule.html'
          }
        }
      })
      .state('app.WaterModule1', {
        url: '/WaterModule1',
        views: {
          'menuContent': {
            templateUrl: 'templates/Water/WaterModule1.html'
          }
        }
      })
      /*water bill*/
      .state('app.waterBillpay', {
        url: '/waterBillpay',
        views: {
          'menuContent': {
            templateUrl: 'templates/Water/WaterBill/waterBillpay.html'
          }
        }
      })
      .state('app.billpayPage', {
        url: '/billpayPage',
        views: {
          'menuContent': {
            templateUrl: 'templates/Water/WaterBill/billpayPage.html'
          }
        }
      })
      /*  .state('app.taxdetail', {
           url: '/taxdetail',
           views: {
             'menuContent': {
               templateUrl: 'templates/Water/WaterBill/taxdetail.html'
             }
           }
        })*/
      /*change of usage*/
      .state('app.ChangeofUsage', {
        url: '/ChangeofUsage',
        views: {
          'menuContent': {
            templateUrl: 'templates/Water/ChangeOfUsage/ChangeofUsage.html'
          }
        }
      })
      .state('app.COUoldnewdetails', {
        url: '/COUoldnewdetails',
        views: {
          'menuContent': {
            templateUrl: 'templates/Water/ChangeOfUsage/COUoldnewdetails.html'
          }
        }
      })
      .state('app.COUuploaddoc', {
        url: '/COUuploaddoc',
        views: {
          'menuContent': {
            templateUrl: 'templates/Water/ChangeOfUsage/COUuploaddoc.html'
          }
        }
      })
      .state('app.COUpay', {
        url: '/COUpay',
        views: {
          'menuContent': {
            templateUrl: 'templates/Water/ChangeOfUsage/COUpay.html'
          }
        }
      })
      /*change of owner*/
      .state('app.ChangeofOwner', {
        url: '/ChangeofOwner',
        views: {
          'menuContent': {
            templateUrl: 'templates/Water/ChangeOfOwner/ChangeofOwner.html'
          }
        }
      })
      .state('app.COoldnewdetails', {
        url: '/COoldnewdetails',
        views: {
          'menuContent': {
            templateUrl: 'templates/Water/ChangeOfOwner/COoldnewdetails.html'
          }
        }
      })
      .state('app.COuploaddoc', {
        url: '/COuploaddoc',
        views: {
          'menuContent': {
            templateUrl: 'templates/Water/ChangeOfOwner/COuploaddoc.html'
          }
        }
      })
      .state('app.COpay', {
        url: '/COpay',
        views: {
          'menuContent': {
            templateUrl: 'templates/Water/ChangeOfOwner/COpay.html'
          }
        }
      })
      /* new water conn */
      .state('app.NewWaterConnection', {
        url: '/NewWaterConnection',
        views: {
          'menuContent': {
            templateUrl: 'templates/Water/NewWaterConn/NewWaterConnection.html'
          }
        }
      })
      .state('app.NWCApplicantInfo', {
        url: '/NWCApplicantInfo',
        views: {
          'menuContent': {
            templateUrl: 'templates/Water/NewWaterConn/NWCApplicantInfo.html'

          }
        }
      })
      .state('app.NWCApplicantAddress', {
        url: '/NWCApplicantAddress',
        views: {
          'menuContent': {
            templateUrl: 'templates/Water/NewWaterConn/NWCApplicantAddress.html'
          }
        }
      })
      .state('app.NWCExistConndetails', {
        url: '/NWCExistConndetails',
        views: {
          'menuContent': {
            templateUrl: 'templates/Water/NewWaterConn/NWCExistConndetails.html'
          }
        }
      })
      .state('app.NWCuploadoc', {
        url: '/NWCuploadoc',
        views: {
          'menuContent': {
            templateUrl: 'templates/Water/NewWaterConn/NWCuploadoc.html'
          }
        }
      })
      .state('app.NWCpay', {
        url: '/NWCpay',
        views: {
          'menuContent': {
            templateUrl: 'templates/Water/NewWaterConn/NWCpay.html'
          }
        }
      })

      .state('app.PLLicence', {
        url: '/PLLicence',
        views: {
          'menuContent': {
            templateUrl: 'templates/Water/PlumberLicence/LicenceApplication.html'
          }
        }
      })
      .state('app.plbUpload', {
        url: '/plbUpload',
        views: {
          'menuContent': {
            templateUrl: 'templates/Water/PlumberLicence/plbUpload.html'
          }
        }
      })

      // plumber licence



      /*water disconnection*/
      .state('app.waterDisconnection', {
        url: '/waterDisconnection',
        views: {
          'menuContent': {
            templateUrl: 'templates/Water/WaterDisConnection/waterDisconnection.html'
          }
        }
      })
      .state('app.UploadDoc', {
        url: '/UploadDoc',
        views: {
          'menuContent': {
            templateUrl: 'templates/Water/WaterDisConnection/UploadDoc.html'
          }
        }
      })
      .state('app.DisconnPay', {
        url: '/DisconnPay',
        views: {
          'menuContent': {
            templateUrl: 'templates/Water/WaterDisConnection/DisconnPay.html'
          }
        }
      })

      /*water reconnection*/
      .state('app.waterReconnection', {
        url: '/waterReconnection',
        views: {
          'menuContent': {
            templateUrl: 'templates/Water/WaterReconnection/waterReconnection.html'
          }
        }
      })
      //no dues certificate
      .state('app.waterConnectionDetails', {
        url: '/waterConnectionDetails',
        views: {
          'menuContent': {
            templateUrl: 'templates/Water/NoDueCertificate/waterConnectionDetails.html'
          }
        }
      })
      /*rent and lease*/
      .state('app.estateAmenityDetail', {
        url: '/estateAmenityDetail',
        views: {
          'menuContent': {
            templateUrl: 'templates/RentandLease/estateAmenityDetail.html',
            controller: 'EstateAmenityDetail'
          }
        }
      })
      .state('app.estateBooking', {
        url: '/estateBooking',
        views: {
          'menuContent': {
            templateUrl: 'templates/RentandLease/estateBooking.html',
            controller: 'EstateBookingCtrl'
          }
        }
      })
      .state('app.RNLTermsAndCondition', {
        url: '/RNLTermsAndCondition',
        views: {
          'menuContent': {
            templateUrl: 'templates/RentandLease/RNLTermsAndCondition.html',
            controller: 'termsandConditionCtrl'
          }
        }
      })
      .state('app.estateBookingDetails', {
        url: '/estateBookingDetails/:response/:propId/:disabledDates',
        views: {
          'menuContent': {
            templateUrl: 'templates/RentandLease/estateBookingDetails.html',
            controller: 'EstateBookingDetailsCtrl'
          }
        }
      })
      .state('app.estateBookProp', {
        url: '/estateBookProp/:response/:disabledDates',
        views: {
          'menuContent': {
            templateUrl: 'templates/RentandLease/estateBookProp.html',
            controller: 'EstateBookPropCtrl'
          }
        }
      })

      /*changes */
      .state('app.estateBookPropDetail', {
        url: '/estateBookPropDetail/:response/:disabledDates',
        views: {
          'menuContent': {
            templateUrl: 'templates/RentandLease/estateBookPropDetail.html',
            controller: 'EstateBookPropDetailCtrl'
          }
        }
      })
      .state('app.propertytax', {
        url: '/propertytax ',
        views: {
          'menuContent': {
            templateUrl: 'templates/states/propertylist.html',
            controller: 'PropertyPageCtrl'
          }
        }
      })

      .state('app.estateBookapplicantInfo', {
        url: '/estateBookapplicantInfo/:response/:disabledDates',
        views: {
          'menuContent': {
            templateUrl: 'templates/RentandLease/estateBookapplicantInfo.html',
            controller: 'EstateBookAppInfoCtrl'
          }
        }
      })

      .state('app.estateBookedDetail', {
        url: '/estateBookedDetail/:response/:disabledDates',
        views: {
          'menuContent': {
            templateUrl: 'templates/RentandLease/estateBookedDetail.html',
            controller: 'EstateBookedDetailCtrl'
          }
        }
      })

      /*changes end*/
      /*BRMS*/
      .state('app.checklistUpload', {
        url: '/checklistUpload/:serviceChargeInput',
        views: {
          'menuContent': {
            templateUrl: 'templates/BRMS/checklistUpload.html',
            controller: 'ChecklistUploadCTRL'
          }
        }
      })
      .state('app.paymentPage', {
        url: '/paymentPage',
        views: {
          'menuContent': {
            templateUrl: 'templates/BRMS/paymentPage.html',
            controller: 'PaymentPageCTRL'
          }
        }
      })


      /*self assessment start*/
      .state('app.unitDetails', {
        url: '/unitDetails',
        views: {
          'menuContent': {
            templateUrl: 'templates/SelfAssessment/unitDetails.html',
            controller: 'unitDetailsCtrl'
          }
        }
      })
      /*self assessment end */

      /*citizen charter  start*/

      .state('app.citizencharter', {
        url: '/citizencharter',
        views: {
          'menuContent': {
            templateUrl: 'templates/CitizenCharter/citizencharter.html',
            controller: 'CitizenCharterCtrl'
          }
        }
      })

      .state('app.CCcontactus', {
        url: '/CCcontactus',
        views: {
          'menuContent': {
            templateUrl: 'templates/CitizenCharter/CCcontactus.html',
            controller: 'CCcontactUsCtrl'
          }
        }
      })

      .state('app.CCaboutus', {
        url: '/CCaboutus',
        views: {
          'menuContent': {
            templateUrl: 'templates/CitizenCharter/CCaboutus.html',
            controller: 'CCaboutusCtrl'
          }
        }
      })

      .state('app.CCoffice', {
        url: '/CCoffice',
        views: {
          'menuContent': {
            templateUrl: 'templates/CitizenCharter/CCoffice.html',
            controller: 'ContactusCtrl'
          }
        }
      })

      .state('app.StatusOfService', {
        url: '/StatusOfService',
        views: {
          'menuContent': {
            templateUrl: 'templates/StatusOfService/StatusOfService.html',
            controller: 'StatusOfServiceCtrl'
          }
        }
      })

      .state('app.LocationSearch', {
        url: '/LocationSearch',
        views: {
          'menuContent': {
            templateUrl: 'templates/Location/LocationSearch.html',
            controller: 'LocationSearchCTRL'
          }
        }
      })

      .state('app.nearBy', {
        url: '/nearBy',
        views: {
          'menuContent': {
            templateUrl: 'templates/Location/nearBy.html',
            controller: 'nearByCTRL'
          }
        }
      })

      .state('app.knowYour', {
        url: '/knowYour',
        views: {
          'menuContent': {
            templateUrl: 'templates/Location/knowYour.html',
            //controller: 'knowYourCTRL'
          }
        }
      })
      /*citizen charter  end*/

      /*payment*/
      .state('app.paymentreceipt', {
        url: '/paymentreceipt',
        views: {
          'menuContent': {
            templateUrl: 'templates/Paymentreceipt/paymentreceipt.html',
            controller: 'paymentReceiptCtrl'
          }
        }
      })

      /*social security*/
      .state('app.SSApplicationForm', {
        url: '/SSApplicationForm',
        views: {
          'menuContent': {
            templateUrl: 'templates/SocialSecurity/SSApplicationForm.html',
            controller: 'SSApplicationCTRL'
          }
        }
      })
      .state('app.SSUuploaddoc', {
        url: '/SSUuploaddoc',
        views: {
          'menuContent': {
            templateUrl: 'templates/SocialSecurity/SSuploaddoc.html'
          }
        }
      })
      .state('app.propertyTransferPayment', {
        url: '/propertyTransferPayment',
        views: {
          'menuContent': {
            templateUrl: 'templates/Property/PropertyTransfer/propertyTransferPayment.html'
            /* controller: 'propertypaymentCtrl'*/
          }
        }
      })

      /*---RTI Application---*/
      .state('app.rtiApplicantDetial', {
        url: '/rtiApplicantDetial',
        views: {
          'menuContent': {
            templateUrl: 'templates/RightToInformation/rtiApplicantDetial.html',
          }
        }
      })

      .state('app.rtiReferencedetial', {
        url: '/rtiReferencedetial',
        views: {
          'menuContent': {
            templateUrl: 'templates/RightToInformation/rtiReferencedetial.html',
          }
        }
      })

      .state('app.rtiInformation', {
        url: '/rtiInformation',
        views: {
          'menuContent': {
            templateUrl: 'templates/RightToInformation/rtiInformation.html',
          }
        }
      })
      .state('app.RtiPay', {
        url: '/RtiPay',
        views: {
          'menuContent': {
            templateUrl: 'templates/RightToInformation/RtiPay.html',
          }
        }
      })
      .state('app.rtiReceipt', {
        url: '/rtiReceipt',
        views: {
          'menuContent': {
            templateUrl: 'templates/RightToInformation/rtiReceipt.html',
          }
        }
      })

      .state('app.rtiCancelReceipt', {
        url: '/rtiCancelReceipt',
        views: {
          'menuContent': {
            templateUrl: 'templates/RightToInformation/rtiCancelReceipt.html',
          }
        }
      }).state('app.rtifirstappeal', {
        url: '/rtifirstappeal',
        views: {
          'menuContent': {
            templateUrl: 'templates/RightToInformation/rtiFirstAppeal.html',
            controller: 'rtiFirstAppealCtrl'
          }
        }
      })

     
    
      // .state('app.swmcompainlist', {
      //   url: '/reopen',
      //   views: {
      //     'menuContent': {
      //       templateUrl: 'templates/states/swmcomplaintlist.html',
      //       controller: 'swmComplainCtrl'
      //     }
      //   }
      // })

      .state('app.gisMap', {
        url: '/gisMap',
        views: {
          'menuContent': {
            templateUrl: 'twww/templates/GIS/gisMap.html',
          }
        }
      })

      .state('app.rtiReceiptfaild', {
        url: '/rtiReceiptfaild',
        views: {
          'menuContent': {
            templateUrl: 'templates/RightToInformation/rtiReceiptfaild.html',
          }
        }
      })

      .state('app.selectLanguage', {
        url: '/selectLanguage',
        views: {
          'menuContent': {
            templateUrl: 'templates/selectLanguage.html',
          }
        }
      })
      .state('app.slider', {
        url: '/slider',
        views: {
          'menuContent': {
            templateUrl: 'templates/slider.html',
          }
        }
      })
      .state('app.loginRegister', {
        url: '/loginRegister',
        views: {
          'menuContent': {
            templateUrl: 'templates/loginRegister.html',
          }
        }
      })

      .state('app.complaintservice', {
        url: '/ComplaintService',
        views: {
          'menuContent': {
            templateUrl: 'templates/Complaint/LodgeComplaint/ComplaintService.html',
            controller: 'ComplaintService'
          }
        }
      })
      .state('app.complaintreceipt', {
        url: '/complaintreceipt',
        views: {
          'menuContent': {
            templateUrl: 'templates/Complaint/LodgeComplaint/complaintreceipt.html'
          }
        }
      })
      .state('app.complaintrefrence', {
        url: '/ComplaintRefrence',
        views: {
          'menuContent': {
            templateUrl: 'templates/Complaint/LodgeComplaint/ComplaintRefrence.html',
            controller: 'ComplaintRefrenceCtrl'
          }
        }
      })
      .state('app.applicationHistory', {
        url: '/applicationHistory',
        views: {
          'menuContent': {
            templateUrl: 'templates/states/applicationHistory.html',
            controller: 'ApplicationHistoryPageCtrl'
          }
        }
      }).state('app.applicationList', {
        url: '/applicationList',
        views: {
          'menuContent': {
            templateUrl: 'templates/states/applicationlist.html',
            controller: 'ApplicationListPageCtrl'
          }
        }
      }).state('app.applicationPaymentStatus', {
        url: '/applicationPaymentStatus',
        views: {
          'menuContent': {
            templateUrl: 'templates/states/applicationPaymentStatus.html',
            controller: 'ApplicationPaymentStatusPageCtrl'
          }
        }
      }).state('app.rtiapplicationHistory', {
        url: '/rtiapplicationHistory',
        views: {
          'menuContent': {
            templateUrl: 'templates/RightToInformation/rtiApplicantHistory.html',
            controller: 'rtiApplicantHistoryCtrl'
          }
        }
      })
      .state('app.swmHome', {
        url: '/swmHome',
        views: {
          'menuContent': {
            templateUrl: 'templates/swmHome.html',
            // controller: 'swmHomeCtrl'
          }
        }
      })

      .state('app.swmcompainlist', {
        url: '/reopen',
        views: {
          'menuContent': {
            templateUrl: 'templates/states/swmcomplaintlist.html',
            controller: 'swmComplainCtrl'
          }
        }
      })
      .state('app.feedback', {
        url: '/feedback',
        views: {
          'menuContent': {
            templateUrl: 'templates/states/feedback.html',
            controller: 'FeedbackCtrl'
          }
        }
      })
      .state('app.trafficlist', {
        url: '/trafficlist',
        views: {
          'menuContent': {
            templateUrl: 'templates/states/trafficlistlist.html',
            controller: 'TrafficListPageCtrl'
          }
        }
      })
      .state('app.environment', {
        url: '/environment ',
        views: {
          'menuContent': {
            templateUrl: 'templates/states/environment.html',
            // controller: 'EnvironmentPageCtrl'
          }
        }
      })
      .state('app.echallan', {
        url: '/echallan ',
        views: {
          'menuContent': {
            templateUrl: 'templates/states/challanlist.html',
            controller: 'EchallanPageCtrl'
          }
        }
      })
      // .state('app.propertytax', {
      //   url: '/propertytax ',
      //   views: {
      //     'menuContent': {
      //       templateUrl: 'templates/states/propertylist.html',
      //       controller: 'PropertyPageCtrl'
      //     }
      //   }
      // })
      .state('app.itshome', {
        url: '/itshome ',
        views: {
          'menuContent': {
            templateUrl: 'templates/ITS/ItsHome.html',
            controller: 'ItsHomeCTRL'
          }
        }
      })
       .state('app.sourcetodestination', {
        views: {
          'menuContent': {
            templateUrl: 'templates/ITS/sourceToDestination.html',
          }
        }
      })
      .state('app.eBusTTandPrice', {
         url: '/eBusTTandPrice ',
        views: {
          'menuContent': {
            templateUrl: 'templates/ITS/eBusTTandPrice.html',
          }
        }
      })
      .state('app.nearbystops', {
        url: '/nearbystops ',
        views: {
          'menuContent': {
            templateUrl: 'templates/ITS/NearByStops.html',
            controller: 'NearByStopsCTRL'
          }
        }
      })
      .state('app.tripplanner', {
        url: '/tripplanner ',
        views: {
          'menuContent': {
            templateUrl: 'templates/ITS/TripPlanner.html',
            controller: 'TripPlannerCTRL'
          }
        }
      })
      .state('app.enrouteddetails', {
        url: '/enrouteddetails ',
        views: {
          'menuContent': {
            templateUrl: 'templates/ITS/EnroutedDetails.html',
            controller: 'EnroutedDetailsCTRL'
          }
        }
      })
      .state('app.arrivingbus', {
        url: '/arrivingbus ',
        views: {
          'menuContent': {
            templateUrl: 'templates/ITS/ArrivingBus.html',
            controller: 'ArrivingBusCTRL'
          }
        }
      })
      .state('app.routetimetable', {
        url: '/routetimetable',
        views: {
          'menuContent': {
            templateUrl: 'templates/ITS/RouteTimetable.html',
            controller: 'routeTimetableCtrl'
          }
        }
      }).state('app.atobmap', {
        url: '/atobmap',
        views: {
          'menuContent': {
            templateUrl: 'templates/ITS/AtoBMap.html',
            controller: 'AtoBMapCtrl'
          }
        }
      }).state('app.atobroutedetails', {
        url: '/atobroutedetails',
        views: {
          'menuContent': {
            templateUrl: 'templates/ITS/AtoBRouteDetails.html',
            controller: 'AtoBRouteDetailsCtrl'
          }
        }
      })
      .state('app.mdda-project', {
        url: '/mddaprojectsummary',
        views: {
          'menuContent': {
            templateUrl: 'templates/MDDA/ProjectSummary.html',
           
          }
        }
      }).state('app.complaintRegistration', {
        url: '/complaintRegistration',
        views: {
          'menuContent': {
            templateUrl: 'templates/Complaint/LodgeComplaint/complaintRegistration.html',
            controller: 'ComplaintRegistrationFormCtrl'
          }
        }
      }).state('app.upclViewBill', {
        url: '/upclViewBill',
        views: {
          'menuContent': {
            templateUrl: 'templates/states/upclViewBill.html',
            controller: 'upclViewBillCtrl'
          }
        }
      }).state('app.jalsansthanViewBill', {
        url: '/jalsansthanViewBill',
        views: {
          'menuContent': {
            templateUrl: 'templates/states/jalsansthanViewbill.html',
            controller: 'jalsansthanViewBillCtrl'
          }
        }
      }).state('app.garbageCollectionTracking', {
        url: '/garbageCollectionTracking',
        views: {
          'menuContent': {
            templateUrl: 'templates/GarbageCollectionTracking/garbageCollectionTracking.html',
            controller: 'garbageCollectionTrackingCtrl'
          }
        }
      }).state('app.smartToilets', {
        url: '/smartToilets',
        views: {
          'menuContent': {
            templateUrl: 'templates/smartToilets/smartToilets.html',
            controller: 'smartToiletsCtrl'
          }
        }
      }).state('app.smartWaterATMs', {
        url: '/smartWaterATMs',
        views: {
          'menuContent': {
            templateUrl: 'templates/smartWaterATMs/smartWaterATMs.html',
            controller: 'smartWaterATMCtrl'
          }
        }
      })

    // if none of the above states are matched, use this as the fallback LoginPage

    //  $urlRouterProvider.otherwise('/app/home/');
    // $urlRouterProvider.otherwise('/app/LoginPage');

  
    
    // $urlRouterProvider.otherwise('/app/LandingPage');
    
    

    // $urlRouterProvider.otherwise('/app/StatusOfService');
    // Use x-www-form-urlencoded Content-Type

    //  $httpProvider.defaults.headers.post['Authorization'] = 'Bearer ' + $localStorage.token;
    //  $httpProvider.defaults.headers.post['Authorization'] = 'eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiI0NDczIiwiaWF0IjoxNDg2NDYzMzUwLCJzdWIiOiI0NDczIiwiaXNzIjoiQUJNIiwiZXhwIjoxNDg2NTEzMzUwfQ.gUit8Dup0I_CJ2WepoipJPAx7hUIhwSOaeh7c7g07nE';

    /* $httpProvider.interceptors.push(function($localStorage) {
         return {
          'request': function(config) {
        if($localStorage.jwtToken){
           config.headers['Authorization'] = $localStorage.jwtToken;
           return config;
        }else{
          config.headers['Authorization'] = "";
           return config;
        }
           }
         };
   });*/

    // $httpProvider.interceptors.push(function ($localStorage, $rootScope) {
    //   //$localStorage.jwtToken = "eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiI5OTk2IiwiaWF0IjoxNDg4OTU1NDI4LCJzdWIiOiI5OTk2IiwiaXNzIjoiQUJNIiwiZXhwIjoxNDg5MDA1NDI4fQ.L7WxO7tnXxt70kGKAsZdMZPkFosCHnp9ufGnsT1_XWA";
    //   return {
    //     'request': function (config) {
    //       if ($localStorage.jwtToken) {
    //         $httpProvider.defaults.headers.post['Content-Type'] = 'application/json';
    //         $httpProvider.defaults.headers.put['Content-Type'] = 'application/json';
    //         config.headers['Authorization'] = "Basic Z2FuZ2EudmVtcGFyYWxhQGFibWluZGlhLmNvbTpBYm1vcmFjbGUjNjg5";
    //         return config;
    //       } else {
    //         console.log(' $rootScope.swmAccessToken  ' + $rootScope.swmAccessToken)
    //         // config.headers['Authorization'] = "Bearer cf7c1d13-84c0-3f07-b4f7-80922469e91c"

    //         if ($rootScope.swmAccessToken == undefined) {
    //           $httpProvider.defaults.headers.post['Content-Type'] = 'application/json';
    //           config.headers['Authorization'] = "Basic Z2FuZ2EudmVtcGFyYWxhQGFibWluZGlhLmNvbTpBYm1vcmFjbGUjNjg5";
    //         } else {
    //           config.headers['Authorization'] = "Bearer " + $rootScope.swmAccessToken
    //         }

    //         // if ($rootScope.swmCall == true) {
    //         //   console.log($localStorage.swmAccessToken)
    //         //   config.headers['Authorization'] = "Bearer cf7c1d13-84c0-3f07-b4f7-80922469e91c"
    //         // } else {
    //         //   config.headers['Authorization'] = "Basic Z2FuZ2EudmVtcGFyYWxhQGFibWluZGlhLmNvbTpBYm1vcmFjbGUjNjg5";
    //         // }
    //         return config;
    //       }
    //     }
    //   };
    // });

    $ionicConfigProvider.views.transition('none');
    $ionicConfigProvider.views.forwardCache(true);
    $ionicConfigProvider.views.maxCache(0);
    $ionicConfigProvider.backButton.text('');

  }).directive('numbersOnly', function () {
    return {
      require: 'ngModel',
      scope: {
        limit: '@',
        amount: '@'
      },
      link: function (scope, element, attr, ngModelCtrl) {
        function fromUser(text) {
          if (text) {


            var transformedInput = text.replace(/[^0-9.]/g, '');


            transformedInput = transformedInput.replace(/\s/g, '');
            if (transformedInput !== text || transformedInput.length > scope.limit) {
              transformedInput = transformedInput.substring(0, scope.limit);

              ngModelCtrl.$setViewValue(transformedInput);
              ngModelCtrl.$render();
            }
            return transformedInput;
          }
          return '';
        }
        ngModelCtrl.$parsers.push(fromUser);
      }
    };
  }).directive('alphaNumericOnly', function () {
    return {
      require: 'ngModel',
      scope: {
        limit: '@',
        space: '@'
      },
      link: function (scope, element, attr, ngModelCtrl) {
        function fromUser(text) {
          if (text) {


            var transformedInput = text.replace(/[^0-9a-zA-Z\u0900-\u097F]/g, '');


            if (scope.space)
              transformedInput = text.replace(/[^0-9a-zA-Z\u0900-\u097F ]/g, '');

            transformedInput = transformedInput.replace(/^\s/, '');
            if (transformedInput !== text || transformedInput.length > scope.limit) {
              transformedInput = transformedInput.substring(0, scope.limit);

              ngModelCtrl.$setViewValue(transformedInput);
              ngModelCtrl.$render();
            }
            return transformedInput;
          }
          return '';
        }
        ngModelCtrl.$parsers.push(fromUser);
      }
    };
  }).directive('alphabetOnly', function () {
    return {
      require: 'ngModel',
      scope: {
        limit: '@'
      },
      link: function (scope, element, attr, ngModelCtrl) {
        function fromUser(text) {
          if (text) {


            var transformedInput = text.replace(/[^a-zA-Z\u0900-\u097F ]/g, '');
            transformedInput = transformedInput.replace(/^\s/, '');
            if (transformedInput !== text || transformedInput.length > scope.limit) {
              transformedInput = transformedInput.substring(0, scope.limit);

              ngModelCtrl.$setViewValue(transformedInput);
              ngModelCtrl.$render();
            }
            return transformedInput;
          }
          return '';
        }
        ngModelCtrl.$parsers.push(fromUser);
      }
    };
  }).directive('limitCharacter', function () {
    return {
      require: 'ngModel',
      scope: {
        limit: '@'
      },
      link: function (scope, element, attr, ngModelCtrl) {
        function fromUser(text) {
          console.log("out=", text);
          if (text) {
            text = text.replace(/^\s/, '');

            if (text.length > scope.limit)
              text = text.substring(0, scope.limit);

            ngModelCtrl.$setViewValue(text);
            ngModelCtrl.$render();
            return text;
          }
          return '';
        }
        ngModelCtrl.$parsers.push(fromUser);
      }
    };
  });
