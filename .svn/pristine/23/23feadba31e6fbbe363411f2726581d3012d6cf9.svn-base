angular.module('starter')
  .controller('LodgeComplaintCtrl', function ($rootScope, $scope, RestService, $ionicLoading, $stateParams,
    toaster, $filter, ENV, $state, $localStorage, $sessionStorage, $ionicPopup, $ionicModal) {

    /*-------------------------FROM LOGIN PAGE---------------------------------------------------------*/
    $scope.orgid = $localStorage.selectedorgID;
    $scope.userID = $localStorage.responselogindata.userId;
    $scope.loginUSername = $localStorage.responselogindata.firstName;
    $scope.LoginMobileNo = $localStorage.responselogindata.mobileNo;

    $scope.onlyNumericSixLimitInput = function () {
      var pinlimit = document.getElementById("pincodelim").value;
      var inputVal = pinlimit;
      var numericReg = /^[0-9]{1,6}$/;
      if (!numericReg.test(inputVal) || inputVal.length > 6) {
        inputVal.slice(0, -1);
        var inputValSlice = inputVal.slice(0, -1);
        document.getElementById("pincodelim").value = inputValSlice;
      }
    };

    $scope.onlyNumbers = /^\d+$/;
    /*care details*/
    $scope.NewCompDeptdetails;
    $scope.NewCompPincode;
    $scope.NewCompType;
    $scope.NewCompDescription;
    $scope.NewCompLocation;
    $scope.NewCompLandmark;
    $scope.myImgUrl;

    /* --------------binding the department --------------------------*/
    $scope.deptoptions = new Array();
    for (var i = 0; i < $sessionStorage.deptresponse.length; i++) {
      $scope.deptoptions.push({
        deptid: $sessionStorage.deptresponse[i].department.dpDeptid,
        deptname: $sessionStorage.deptresponse[i].department.dpDeptdesc
      })
    }

    $scope.selectAction = function () {
      console.log($scope.NewCompDeptdetails);
      $scope.$watch('NewCompDeptdetails', function (newVal) {
        $ionicLoading.show({ template: $filter('translate')('LOADING') });
        RestService.finddeptcompltype($scope.NewCompDeptdetails, $scope.orgid).then(function (complsubtyperesponse) {
          if (complsubtyperesponse == undefined || complsubtyperesponse == null || complsubtyperesponse == "") {
            $ionicLoading.hide();
            return false;
          }
          else {
            $scope.compltypeoption = new Array();
            for (var i = 0; i < complsubtyperesponse.length; i++) {
              $scope.compltypeoption.push({
                comptypeID: complsubtyperesponse[i].compId,
                comptypeDesc: complsubtyperesponse[i].complaintDesc
              })
            }
            $ionicLoading.hide();
          }
        }, function (err) {
          $ionicLoading.hide();
          toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR'));
        })

      });
    };

    /* location fetch depending on dept*/

    $scope.deptloc = function () {
      $ionicLoading.show({ template: $filter('translate')('LOADING') });

      RestService.deptdefinedlocation($scope.orgid, $scope.NewCompDeptdetails).then(function (locationperesponse) {
        if (locationperesponse == undefined || locationperesponse == null || locationperesponse == "") {
          $ionicLoading.hide();
          return false;
        }
        else {

          $sessionStorage.locationresponse = locationperesponse;
          $scope.locationoptions = new Array();
          for (var i = 0; i < locationperesponse.length; i++) {
            $scope.locationoptions.push({
              locationid: locationperesponse[i].locId,
              locationname: locationperesponse[i].locNameEng
            })
          }
          $ionicLoading.hide();
        }
      }, function (err) {
        $ionicLoading.hide();
        toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR'));
      })
    }

    $scope.locationperfix = function () {
      $scope.$watch('NewCompPincode', function () {
        $ionicLoading.show({ template: $filter('translate')('LOADING') });
        RestService.pincodeprefix($scope.NewCompPincode).then(function (response) {
          if (response == undefined || response == null || response == "") {
            $ionicLoading.hide();
            return false;
          }
          else {
            $scope.locationoptions = new Array();
            for (var i = 0; i < response.length; i++) {
              $scope.locationoptions.push({
                locationid: response[i].locId,
                locationname: response[i].locNameEng
              })
            }
            $ionicLoading.hide();
          }
          $ionicLoading.hide();
        }, function (err) {
          $ionicLoading.hide();
          // 						toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR'));
        })
      });
    };

    $scope.locationpincode = function () {
      $scope.$watch('NewCompPincode', function (newVal) {
        console.log("$scope.NewCompLocation-" + $scope.NewCompLocation);
        for (var i = 0; i < $sessionStorage.locationresponse.length; i++) {
          //		 if($scope.NewCompLocation == $sessionStorage.locationresponse[i].locationId)
          if ($scope.NewCompLocation == $sessionStorage.locationresponse[i].locId) {
            var locationPincode = $sessionStorage.locationresponse[i].pincode
            $scope.NewCompPincode = locationPincode;
          }
        }
      });
    }

    $scope.savecomplaint = function () {
      $ionicLoading.show({ template: $filter('translate')('LOADING') });
      $scope.cameraImg = $scope.myImgUrl;
      if ($scope.cameraImg == "" || $scope.cameraImg == undefined || $scope.cameraImg == null) {
        $rootScope.simpleAlert('erroNoPhoto');
        $ionicLoading.hide();
      } else {
        console.log("modal doc--" + JSON.stringify($sessionStorage.uploadfinaldata));
        var loginData = $localStorage.responselogindata;

        //var address = $localStorage.responselogindata.address;
        //var addnames = address.split(/,/);
        //var roadname = addnames[2];
        //var blockName = addnames[3];

        var applicantDTO = {
          fName: loginData.firstName,
          mName: loginData.middleName,
          lName: loginData.lastName,
          mobileNo: loginData.mobileNo,
          phone: null,
          email: loginData.emailId,
          orgId: $scope.orgid,
          deptId: null,
          empId: null,
          applicationId: null,
          challanNo: null,
          txnId: null,
          licenseNo: null,
          serviceId: null,
          userId: $scope.userID,
          langId: 1,
          payStatus: null,
          payAmount: null,
          macId: null,
          updatedBy: null,
          serviceShortCode: null,
          tenant: null,
          documentList: null,
          dirPath: null,
          titleId: loginData.titleId,
          blockNo: null,
          floor: null,
          wing: null,
          bldgName: "",
          houseComplexName: null,
          roadName: null,
          areaName: null,
          pincodeNo: loginData.pincode,
          applicationType: null,
          phone1: null,
          phone2: null,
          wardNo: null,
          bplNo: null,
          gender: loginData.genderId,
          aadhaarNo: loginData.addhaarNo,
          zoneNo: null,
          blockName: null,
          flatBuildingNo: "",
          cityName: "",
          uid: null,
          free: false
        }
        console.log("applicant--" + JSON.stringify(applicantDTO));
        var complaintType = "New Complaint";        //sanket
        RestService.lodgecomplaintsave($scope.NewCompPincode, $scope.NewCompDeptdetails, $scope.NewCompType,
          $scope.NewCompDescription, $scope.NewCompLocation, $scope.orgid, $scope.userID, complaintType,
          applicantDTO, $sessionStorage.uploadfinaldata, $scope.Latitude, $scope.Longitude)
          .then(function (complaintresponse) {
            console.log("complaintresponse--->" + JSON.stringify(complaintresponse));
            if (complaintresponse != "") {

              var confirmPopup = $ionicPopup.show({
                title: $filter('translate')('message'),
                template: '<b> Your Complaint is Successfully Submitted.</b>',
                buttons: [{
                  text: 'Proceed',
                  type: 'button button-block  customBgColor',
                  onTap: function () {
                    $sessionStorage.complaintresponse = complaintresponse;
                    RestService.getGrievanceStatus(complaintresponse.applicationId, $localStorage.langID).then(function (complaintstatusresponse) {
                      if (complaintstatusresponse == "" || complaintstatusresponse == undefined || complaintstatusresponse == null) {
                        return false;
                        $ionicLoading.hide();
                      } else {
                        $sessionStorage.escresponse = complaintstatusresponse;
                        $state.go("app.complaintreceipt");
                      }
                      $ionicLoading.hide();
                    }, function (err) {
                      $ionicLoading.hide();
                      toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR'));
                    })
                  }
                }]
              });
              $ionicLoading.hide();
            }
            else {
              toaster.error($filter('translate')('ERROR'), $filter('translate')('COMPLERROR'));
              $ionicLoading.hide();
            }
          }, function (err) {
            $ionicLoading.hide();
            toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR_OCCURED'));
          })
      }  /* else close*/
    };


    $scope.imageupload = function ($file) {
      var reader = new FileReader();
      var verfy = document.getElementById('verfiyFile').files[0];
      $scope.selectfilename = verfy.name;
      console.log("name=----" + $scope.selectfilename);

      var maxSize = 1000000;
      var fileSize = verfy.size;

      if (fileSize > maxSize) {
        fileObject.value = "";
        $rootScope.simpleAlert('validdocumentSize');
        $('#iDivBusyLoad').hide();
        return;
      }

      reader.onload = function (e) {
        console.log("about to encode");
        $scope.encoded_file = window.btoa(e.target.result.toString());
        //		console.log("encoded byte--"+$scope.encoded_file);
      };
      reader.readAsBinaryString(verfy);
    }

    /*camera function*/

    $scope.defaultimage = true;
    $scope.cameraImage = false;
    var arrayListTest = [];
    var verfy;
    $scope.takeimage = function () {
      $ionicLoading.show({ template: $filter('translate')('LOADING') });
      navigator.camera.getPicture(onSuccess, onFail,
        {
          quality: 50,
          destinationType: Camera.DestinationType.DATA_URL,
          sourceType: Camera.PictureSourceType.CAMERA,
          encodingType: Camera.EncodingType.JPEG,
          targetWidth: 900,
          targetHeight: 600,
          popoverOptions: CameraPopoverOptions
        }
      );

      function onSuccess(result) {
        $ionicLoading.show({ template: 'Updating Details...' });
        var thisResult = JSON.parse(result);
        console.log("thisResult---" + JSON.stringify(thisResult));
        $scope.myImgUrl = 'data:image/jpeg;base64,' + thisResult.filename;
        console.log("$scope.myImgUrl------" + $scope.myImgUrl);

        $scope.defaultimage = false;
        $scope.cameraImage = true;
        $ionicLoading.hide();
      }
      function onFail(message) {
        console.log('Failed because: ' + message);
      }
      $ionicLoading.hide();
    }


    /* popup for image upload*/

    $ionicModal.fromTemplateUrl('templates/Complaint/modal-template.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function (modal) {
      $scope.modal = modal;
    });

    $scope.openModal = function () {
      //   alert("getting call to modal...");
      $scope.modal.show();
    };

    $scope.closeModal = function () {
      $scope.modal.hide();
    };

    //Cleanup the modal when we're done with it!
    $scope.$on('$destroy', function () {
      $scope.modal.remove();
    });

    // Execute action on hide modal
    $scope.$on('modal.hidden', function () {
      // Execute action
    });

    // Execute action on remove modal
    $scope.$on('modal.removed', function () {
      // Execute action
    });

    var _init = function () {
      //      var geoSuccess = function(position) {
      //         $scope.Latitude = position.coords.latitude;
      //         $scope.Longitude = position.coords.longitude;
      //        }
      //
      //        function geoError(error) {
      //         console.log('code: '    + error.code    + '\n' +
      //               'message: ' + error.message + '\n');
      //     }
      //        navigator.geolocation.getCurrentPosition(geoSuccess, geoError);

    };
    _init();

  });
