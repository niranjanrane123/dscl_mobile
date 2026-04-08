angular.module('starter')
  .controller('ComplaintService', function ($rootScope, $scope, RestService, $ionicLoading, $stateParams, toaster,
    $filter, ENV, $state, $localStorage, $sessionStorage, $ionicPopup, $ionicModal, $cordovaGeolocation, $ionicHistory,$ionicPlatform,localStorageService,$window,$rootScope) {
    var options = { timeout: 10000, enableHighAccuracy: true };
    $scope.orgid = $localStorage.selectedorgID;
    $scope.userID = $localStorage.responselogindata.userId;
    $scope.loginUSername = $localStorage.responselogindata.firstName;
    $scope.loginLastName = $localStorage.responselogindata.lastName
    $scope.LoginMobileNo = $localStorage.responselogindata.mobileNo;
    // $scope.Orgid;
    $scope.Orgid = $sessionStorage.depOrgid;
    $scope.District;
    $scope.dstoptions = new Array();
    $scope.orgoptions = new Array();
    $scope.latitude = 19.060692;
    $scope.longitude = 72.836250;
    $scope.attachments = [];
    $scope.counter = 0;
    $scope.zoomedIn = false; 

console.log('$sessionStorage.referenceData.deptoptions 33',$sessionStorage.referenceData.deptoptions);
console.log(' $localStorage.deptalloptions11',  $localStorage.deptalloptions);
console.log(' $sessionStorage.referenceData.raddress',  $sessionStorage.referenceData.raddress);

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

    $scope.LimitInput = function () {
      var pinlimit = document.getElementById("descLim").value;
      var inputVal = pinlimit;
      if (inputVal.length > 3000) {
        inputVal.slice(0, -1);
        var inputValSlice = inputVal.slice(0, -1);
        document.getElementById("descLim").value = inputValSlice;
      }
    };

    $scope.onlyNumbers = /^\d+$/;
    /*care details*/
    $scope.NewCompDeptdetails = '';
    $scope.NewCompPincode;
    $scope.NewCompType;
    $scope.NewCompDescription;
    $scope.NewCompLocation;
    $scope.NewCompLandmark;
    $scope.refNumber;
    $scope.myImgUrl;
   // $scope.deptoptions = new Array();
   $scope.deptoptions =  $localStorage.deptalloptions;
   //new
   $scope.maxDate=  new Date().toISOString();
   var todayTime = new Date();
   var month = (todayTime .getMonth() + 1);
   var day = todayTime .getDate();
   var year = todayTime .getFullYear();
   if(day<10)
   {
       day='0'+day;
   }

   if(month<10)
   {
       month='0'+month;
   }
   var date = day + "/" + month + "/" + year;
   $scope.autoSelecteddate = year + '-' + month + '-' +day
   $scope.referenceDate = date;
   console.log('$scope.referenceDat', $scope.referenceDat);
   console.log('date', date)
   document.getElementById("dateEdit").innerHTML = date;
   //document.write(s);
  //  document.getElementById("dateEdit").innerText= moment(date  )
   console.log('document.getElementById("dateEdit").innerText= moment(date  )',document.getElementById("dateEdit").innerHTML)
    /* --------------binding the department --------------------------*/
    /*if ($sessionStorage.deptresponse != undefined) {
      for (var i = 0; i < $sessionStorage.deptresponse.length; i++) {
        if ($localStorage.langNewId == "2") {
          $scope.deptoptions.push({
            deptid: $sessionStorage.deptresponse[i].department.dpDeptid,
            deptname: $sessionStorage.deptresponse[i].department.dpNameMar
          })
        } else {
          $scope.deptoptions.push({
            deptid: $sessionStorage.deptresponse[i].department.dpDeptid,
            deptname: $sessionStorage.deptresponse[i].department.dpDeptdesc
          })
        }
      }
    }*/

    $scope.rd = new Rolldate({
			el: '#dateEdit',
			format: 'YYYY/MM/DD',
			// beginYear: new Date().getFullYear()-99,
      // beginYear: new Date().getFullYear()-99,
			 //endYear: new Date().getFullYear() - 19,
       //endYear: new Date().getFullYear(),
 
			minStep: 1,
			lang: {
				title: $filter('translate')('REFERENCEDATE'),
				cancel: $filter('translate')('CANCEL'),
				confirm: $filter('translate')('SELECT')
			},
			trigger: 'tap',
			confirm: function (date) {
        console.log('12345', date);
        


        

				$scope.referenceDate  = date
				$scope.item = new Date(date);
				$scope.referenceDate  =$scope.item
			//	$scope.isValueChange()
       // $scope.checkAge()
				$scope.$apply(function() {
          

          $scope.selectedDateYear = new Date(date).getFullYear();
          $scope.selectedDateMonth = new Date(date).getMonth() + 1;
          $scope.selectedDay = new Date(date).getDate();
  
          $scope.currentday = new Date().getDate();
          $scope.currentmonth = new Date().getMonth() + 1;
          $scope.currentYear = new Date().getFullYear();

          if($scope.selectedDateYear > $scope.currentYear){
            toaster.error($filter('translate')('COMPLAINTDATEERROR'));
            document.getElementById("dateEdit").innerText= 'Please Enter Valid Date'
          } else if($scope.selectedDateYear <= $scope.currentYear && $scope.selectedDateMonth > $scope.currentmonth){
            toaster.error($filter('translate')('COMPLAINTDATEERROR'));
            document.getElementById("dateEdit").innerText= 'Please Enter Valid Date'
          } else if($scope.selectedDateYear <= $scope.currentYear && $scope.selectedDay > $scope.currentday){
            toaster.error($filter('translate')('COMPLAINTDATEERROR'));
            document.getElementById("dateEdit").innerText= 'Please Enter Valid Date'
          } else{
            $scope.referenceDate  =$scope.item;
            document.getElementById("dateEdit").innerText= moment($scope.referenceDate ).format('DD/MM/YYYY')
            $scope.isEnableSubmit=true;
            console.log('selected value', $scope.referenceDate);
          }


					
          //console.log("EDIT DATE",$scope.editdob)
          //$scope.editdob = 
          //console.log("FROM INNER",document.getElementById("dateEdit"))
          // $scope.editdob = document.getElementById("dateEdit").innerText
				});

        setTimeout(function(){ 
          $scope.$apply(function() {
              $scope.isEnableSubmit=true;
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

    $scope.selectAction = function () {
      console.log($scope.NewCompDeptdetails);
      $scope.$watch('NewCompDeptdetails', function (newVal) {
        if ($scope.NewCompDeptdetails) {
          $ionicLoading.show({ template: $filter('translate')('LOADING') });
          RestService.finddeptcompltype($scope.NewCompDeptdetails, $scope.Orgid, $sessionStorage.referenceData.rapplicationType).then(function (complsubtyperesponse) {
            console.log("response 1" + JSON.stringify(complsubtyperesponse))
            if (complsubtyperesponse == undefined || complsubtyperesponse == null || complsubtyperesponse == "") {
              $ionicLoading.hide();
              return false;
            }
            else {
              $scope.compltypeoption = new Array();
              if ($sessionStorage.referenceData.rapplicationType == "C") {
                for (var i = 0; i < complsubtyperesponse.length; i++) {

                  if ($localStorage.langNewId == "2") {
                    $scope.compltypeoption.push({
                      comptypeID: complsubtyperesponse[i].compId,
                      comptypeDesc: complsubtyperesponse[i].complaintDescReg
                    })
                  } else {
                    $scope.compltypeoption.push({
                      comptypeID: complsubtyperesponse[i].compId,
                      comptypeDesc: complsubtyperesponse[i].complaintDesc
                    })
                  }
                }
              } else if ($sessionStorage.referenceData.rapplicationType == "R") {
                for (var i = 0; i < complsubtyperesponse.length; i++) {
                  $scope.compltypeoption.push({
                    comptypeID: complsubtyperesponse[i].serviceId,
                    comptypeDesc: complsubtyperesponse[i].complaintDesc
                  })
                }
              }
              $ionicLoading.hide();
            }
          }, function (err) {
            $ionicLoading.hide();
            toaster.error($filter('translate')('FILECOMPLAINTERROR')/* , $filter('translate')('ERROR') */);
          });
        }

      });
    };

    $scope.changeOrg = function () {
      $scope.deptoptions = [];
      var select = document.getElementById("organization");
      var disttext = select.options[select.selectedIndex].value;
      var org = disttext.split(":")[1];
      $scope.Orgid = org;
      RestService.deptprefix($scope.Orgid, $sessionStorage.referenceData.rapplicationType).then(function (response) {
        console.log("deptresponse--" + JSON.stringify(response));
        if (response == undefined || response == null || response == "" || response == []) {
          toaster.error($filter('translate')('FILECOMPLAINTERROR')/* , $filter('translate')('ERROR') */);
          $ionicLoading.hide();
          //return false;
        }
        else {
          $sessionStorage.deptresponse = response;
          for (var i = 0; i < $sessionStorage.deptresponse.length; i++) {
            if ($localStorage.langNewId == "2") {
              $scope.deptoptions.push({
                deptid: $sessionStorage.deptresponse[i].department.dpDeptid,
                deptname: $sessionStorage.deptresponse[i].department.dpNameMar
              })
            } else {
              $scope.deptoptions.push({
                deptid: $sessionStorage.deptresponse[i].department.dpDeptid,
                deptname: $sessionStorage.deptresponse[i].department.dpDeptdesc
              })
            }
          }
          $ionicLoading.hide();
        }
        $ionicLoading.hide();
      }, function (err) {
        if(err){
          $ionicLoading.hide();
          $scope.compltypeoption = [];
        } else{

        }
        
      })
      // setDependentParameter(org);
    }

    /* location fetch depending on dept*/

    $scope.deptloc = function (desc) {
      for (let index = 0; index < $scope.compltypeoption.length; index++) {
        const element = $scope.compltypeoption[index];
        if (element.comptypeID = $scope.NewCompType) {
          $scope.NewCompName = element.comptypeDesc;
        }
      }
      // $scope.NewCompName = desc;
      $ionicLoading.show({ template: $filter('translate')('LOADING') });
      RestService.deptdefinedlocation($scope.Orgid, $scope.NewCompDeptdetails).then(function (locationperesponse) {
        if (locationperesponse == undefined || locationperesponse == null || locationperesponse == "") {
          $ionicLoading.hide();
          return false;
        }
        else {
          $sessionStorage.locationresponse = locationperesponse;
          $scope.locationoptions = new Array();
          for (var i = 0; i < locationperesponse.length; i++) {

            if ($localStorage.langNewId == "2") {
              $scope.locationoptions.push({
                locationid: locationperesponse[i].locId,
                locationname: locationperesponse[i].locNameReg
              })
            } else {
              $scope.locationoptions.push({
                locationid: locationperesponse[i].locId,
                locationname: locationperesponse[i].locNameEng
              })
            }

          }
          $ionicLoading.hide();
        }
      }, function (err) {
        if(err){
          $ionicLoading.hide();
        } else{

        }
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
          // 					toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR'));
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
            if (locationPincode != null)
              $scope.NewCompPincode = locationPincode;
          }
        }
      });
    }

    var callSwm = function (complainId) {
      var params = {
        "name": $localStorage.responselogindata.firstName,
        "email": $localStorage.responselogindata.emailId,
        // "address": $scope.address,
        "address": $sessionStorage.referenceData.raddress,
        "phoneNo": $sessionStorage.referenceData.rmobileNumber,
        "latitude": $scope.latitude,
        "longitude": $scope.longitude,
        "complaintId": complainId,
        "description": $scope.NewCompDescription,
        "incidentSubTypeId": $scope.NewCompType,
        "incidentSubType": $scope.NewCompName,
        "files": {
          "images": [
            $scope.myImgUrl]
        },
        "videos": [""]
      }

      console.log('params' + JSON.stringify(params))
      RestService.registerComplaint(params).then(function (data) {
        if (data == undefined || data == null || data == "") {
          toaster.error($filter('translate')('FILECOMPLAINTERROR')/* , $filter('translate')('COMPLERROR') */);
          $ionicLoading.hide();
        }
        else {
          var confirmPopup = $ionicPopup.show({
            title: $filter('translate')('message'),
            template: $filter('translate')('SUCCESSFULLYSUBMITTED') + "\n" + data.complaintId,
            buttons: [{
              text: $filter('translate')('OK'),
              type: 'button button-block  customBgColor',
              onTap: function () {
                $state.go("app.home");
              }
            }]
          });
        }
        $ionicLoading.hide();
      },
        function (err) {
          $ionicLoading.hide();
          toaster.error($filter('translate')('FILECOMPLAINTERROR')/* , $filter('translate')('ERROR') */);
        })

    }

    $scope.savecomplaint = function () {
      console.log('$scope.NewCompLandmark',$scope.NewCompLandmark);
      console.log(' $scope.refNumber',  $scope.refNumber);
      console.log("session data--" + JSON.stringify($sessionStorage.referenceData));
      $ionicLoading.show({ template: $filter('translate')('LOADING') });
      $scope.cameraImg = $scope.myImgUrl;
      if ($scope.cameraImg == "" || $scope.cameraImg == undefined || $scope.cameraImg == null) {
        $scope.cameraImg = null;
      }
      console.log("modal doc--" + JSON.stringify($sessionStorage.uploadfinaldata));
      var loginData = $localStorage.responselogindata;
      console.log('loginData--' + loginData);

      var applicantDTO = {
        fName: $sessionStorage.referenceData.rfirstName,
        mName: $sessionStorage.referenceData.rmiddleName,
        lName: $sessionStorage.referenceData.rlastName,
        mobileNo: $sessionStorage.referenceData.rmobileNumber,
        phone: null,
        email: loginData.emailId,
        orgId: $scope.Orgid,
        deptId: null,
        empId: null,
        applicationId: null,
        challanNo: null,
        txnId: null,
        licenseNo: null,
        serviceId: $sessionStorage.referenceData.serviceIdR,
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
        titleId: $sessionStorage.referenceData.rTitle,
        blockNo: null,
        floor: null,
        wing: null,
        bldgName: "",
        houseComplexName: null,
        roadName: null,
        areaName:  $sessionStorage.referenceData.raddress,
        pincodeNo: loginData.pincode,
        applicationType: null,
        phone1: null,
        phone2: null,
        wardNo: null,
        bplNo: null,
        gender: $sessionStorage.referenceData.rgender,
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

      //console.log('latitude-->',$sessionStorage.currentLatitude,' longitude-->',$sessionStorage.currentLongitude);

      RestService.lodgecomplaintsave($scope.District, $scope.NewCompPincode, $scope.NewCompDeptdetails,
         $scope.NewCompType,$scope.refNumber,$scope.NewCompLandmark,
        $scope.NewCompDescription, $scope.NewCompLocation, $scope.Orgid, $scope.userID, complaintType,
        applicantDTO, $scope.attachments, $sessionStorage.currentLatitude, $sessionStorage.currentLongitude, $sessionStorage.referenceData.rmode,
        $sessionStorage.referenceData.rcategory, $sessionStorage.referenceData.rzone
        , $sessionStorage.referenceData.rdate, $sessionStorage.referenceData.rapplicationType,
        $sessionStorage.referenceData.wardTwo,).then(function (complaintresponse) {

          console.log("complaintresponse--->" + JSON.stringify(complaintresponse));
          $ionicLoading.hide();
          if (complaintresponse != "") {
            if(complaintresponse.complaintId!=null){
            // if ($rootScope.swmCall != true) {
              var confirmPopup = $ionicPopup.show({
                title: $filter('translate')('message'),
                template: $filter('translate')('SUCCESSFULLYSUBMITTED') + "\n" + complaintresponse.complaintId,

                buttons: [{
                  text: $filter('translate')('PROCEED'),
                  type: 'button button-block  customBgColor',
                  onTap: function () {
                    $ionicLoading.show({ template: $filter('translate')('LOADING') });
                    $sessionStorage.complaintresponse = complaintresponse;
                    $ionicLoading.hide();
                    var deregisterSecond = $ionicPlatform.registerBackButtonAction(
                      function () {
                
                        var confirmPopup = $ionicPopup.show({
                
                          title: $filter('translate')('message'),
                          template: $filter('translate')('AREYOUSUREEXIT'),
                
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
                              ionic.Platform.exitApp();
                            }
                          }]
                        });
                      }, 100
                    );
                    $scope.$on('$destroy', deregisterSecond);
                    $ionicLoading.show({ template: $filter('translate')('LOADING') });
                    RestService.getGrievanceStatus(complaintresponse.applicationId, $localStorage.langNewId).then(function (complaintstatusresponse) {
                      if (complaintstatusresponse == "" || complaintstatusresponse == undefined || complaintstatusresponse == null) {
                        $ionicLoading.hide();
                        return false;
                      } else {
                      
                        $sessionStorage.escresponse = complaintstatusresponse;
                        console.log('$sessionStorage.escresponse', $sessionStorage.escresponse)
                        $state.go("app.complaintreceipt");

                      }

                    }, function (err) {
                      $ionicLoading.hide();
                      toaster.error($filter('translate')('FILECOMPLAINTERROR')/* , $filter('translate')('ERROR') */);
                    })
                  }
                }]
              });
              $ionicLoading.hide();
            // } else {
            //   callSwm(complaintresponse.complaintId)
            // }
            }else{
              toaster.error(complaintresponse.errorMsg)
              $ionicLoading.hide();
            }
          }
          else {
            toaster.error($filter('translate')('FILECOMPLAINTERROR')/* , $filter('translate')('COMPLERROR') */);
            $ionicLoading.hide();
          }
        }, function (err) {
          $ionicLoading.hide();
          toaster.error($filter('translate')('FILECOMPLAINTERROR')/* , $filter('translate')('ERROR_OCCURED') */);
        })

    };
    $scope.changeDistrict = function () {
      //       var select = document.getElementById("district");
      //       var disttext= select.options[select.selectedIndex].value;
      //       var res = disttext.split(":")[1];
      //       $scope.District = res;

    }

    $scope.calculateImageSize = function(base64String) {
      let padding;
      let inBytes;
      let base64StringLength;
      if (base64String.endsWith('==')) { padding = 2; }
      else if (base64String.endsWith('=')) { padding = 1; }
      else { padding = 0; }
  
      base64StringLength = base64String.length;
      console.log(base64StringLength);
      inBytes = (base64StringLength / 4) * 3 - padding;
      console.log(inBytes);
      var kbytes = inBytes / 1000;
      console.log("kbytes of image", kbytes)
      return kbytes;
    }

    $scope.fileSizeCheck = function(){
      if($scope.attachments != undefined){
        var totalSize=0;
        $scope.attachments.forEach(function (x) { 
          console.log("x.docsize",x.docSize)            

          //totalSize = x.docSize;
          totalSize = totalSize + parseFloat(x.docSize);
          console.log("Total Size", totalSize);

          if(totalSize > 5000){
            alert($filter('translate')('TOTALSIZELESSERTHAN5MB'));
            return true;
          } else {
            console.log("totalSize", totalSize);
            return false;
          }
        
        });
      }
    }
 

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
      };
      reader.readAsBinaryString(verfy);
    }

    /*camera function*/

    $ionicPlatform.ready(function(){
      $scope.isIOS = ionic.Platform.isIOS();
      console.log('ios-->',$scope.isIOS);
      $scope.isAndroid = ionic.Platform.isAndroid();
      console.log('android-->',$scope.isAndroid);
    });

    $scope.defaultimage = true;
    $scope.cameraImage = false;
    var arrayListTest = [];
    var verfy;
    $scope.takeimage = function () {
      console.log("Attachments", $scope.attachments, $scope.counter);

      if($scope.fileSizeCheck()){
        console.log("Entered if");
        return;
      }
      if ($scope.counter < 5){
        console.log("Camera Called", $scope.counter);

        $ionicLoading.show({ template: $filter('translate')('LOADING') });
        navigator.camera.getPicture(onSuccess, onFail,
          {
            quality: 50,                  //quality increased to 50 from 10
            destinationType: Camera.DestinationType.DATA_URL,
            sourceType: Camera.PictureSourceType.CAMERA,
            encodingType: Camera.EncodingType.JPEG,
            targetWidth: 400,
            targetHeight: 300,
            popoverOptions: CameraPopoverOptions
          }
        );

        function onSuccess(result){
          if($scope.isAndroid){
            console.log('under android');
            onSuccessAndroid(result);
          }
          else if($scope.isIOS){
            console.log('under ios');
            onSuccessIOS(result);
          }
        }
        

        function onSuccessAndroid(result) {       
          $ionicLoading.show({ template: 'Updating Details...' });
          var thisResult = JSON.parse(result);
          console.log("thisResult---" + JSON.stringify(thisResult));
          // $scope.myImgUrl = 'data:image/jpeg;base64,' + thisResult.filename;
          $scope.myImgUrl = 'data:image/jpeg;base64,' + thisResult.filename;
          $scope.sendImgUrl = thisResult.filename;
          console.log("$scope.myImgUrl------" + $scope.myImgUrl);
          $scope.defaultimage = false;
          $scope.cameraImage = true;
          var sizeinKB = $scope.calculateImageSize($scope.myImgUrl);
          let x = Math.floor((Math.random() * 100) + 11);
          var docNum = x;
          var documentObject =
          {
            attachmentId: null,
            documentId: null,
            documentName: "Image" + docNum + ".png",
            documentSerialNo: null,
            descriptionType: null,
            documentType: null,
            doc_DESC_Mar: null,
            doc_DESC_ENGL: null,
            documentByteCode: $scope.sendImgUrl,
            checkkMANDATORY: "Y",
            docSize:sizeinKB
          };
          arrayListTest.push(documentObject);
          $scope.attachments.push(documentObject);
          $ionicLoading.hide();
          $scope.counter++;
        }

        function onSuccessIOS(result) {
          try{    
              $ionicLoading.show({ template: 'Updating Details...' });    
          //alert("1++++++++....."+ result);    
          var image = document.getElementById('image');    
          //alert(image,"Image data id")    
            // var thisResult = JSON.parse(result);    
            // alert("2"+ thisResult);    
            // console.log("IMAGE RESP", JSON.stringify(thisResult))    
              ///alert("3"+ JSON.stringify(thisResult));    
            // $scope.myImgUrl = result;    
          //alert("3"+ thisResult);    
              //alert("4"+ $scope.myImgUrl);    
              $scope.myImgUrl = 'data:image/jpeg;base64,' + result;  
              $scope.sendImgUrl = result;  
          $scope.myImgUrl1 = $scope.myImgUrl    
            //  alert("5"+ $scope.myImgUrl );    
          console.log($scope.myImgUrl ,"my image url...")  
          var sizeinKB = $scope.calculateImageSize($scope.myImgUrl1);  
              $scope.defaultimage = false;    
              $scope.cameraImage = true;
              let x = Math.floor((Math.random() * 100) + 11);
              var docNum = x;
                  
              var documentObject =
              {
                attachmentId: null,
                documentId: null,
                documentName: "Image" + docNum + ".png",
                documentSerialNo: null,
                descriptionType: null,
                documentType: png,
                doc_DESC_Mar: null,
                doc_DESC_ENGL: null,
                //documentByteCode: $scope.myImgUrl1,
                documentByteCode: $scope.sendImgUrl,
                checkkMANDATORY: "Y",
                docSize: sizeinKB
              };
              arrayListTest.push(documentObject);
              $scope.attachments.push(documentObject);
              $ionicLoading.hide();
              $scope.counter++;
            }
            catch(err)
            {
              alert("error=="+ err.message);
            }
          }

        function onFail(message) {
          console.log('Failed because: ' + message);
        }
        $ionicLoading.hide();

      } else {
        alert($filter('translate')('NOMORETHAN5IMG'));
      }
    }

    $scope.removeImage = function (index) {
      console.log("Enter Remove Image", index);
      if($scope.attachments!=undefined){
        $scope.attachments.splice(index, 1);
        $scope.counter--;
        console.log("Removed", $scope.attachments, $scope.counter)
      }
      if($scope.myImgUrl){
        $scope.myImgUrl = null
      } else{
        console.log('no image')
      }

    }

    $scope.zoomPic = function(name){
      console.log("Id Selected", name);
      $scope.zoomedIn = true;
  
      const myArrayFiltered = $scope.attachments.filter((el) => {
        return name === el.documentName;
      });
      $scope.imageZoomed = myArrayFiltered[0].documentByteCode;
      //console.log("myArrayFiltered for Upload",myArrayFiltered, myArrayFiltered[0].documentByteCode);
    }

    $scope.zoomPicClose = function(){
      $scope.zoomedIn = false;
    }


    /* popup for image upload*/

    /*  $ionicModal.fromTemplateUrl('templates/Complaint/modal-template.html', {
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
       });*/

    var _init = function () {
      //    $scope.uad = true;
      var geoSuccess = function (position) {
        //var thisResult = JSON.parse(position);
        console.log("position---" + JSON.stringify(position));
        console.log('Latitude: ' + position.coords.latitude + '\n' +
          'Longitude: ' + position.coords.longitude + '\n' +
          'Altitude: ' + position.coords.altitude + '\n' +
          'Accuracy: ' + position.coords.accuracy + '\n' +
          'Altitude Accuracy: ' + position.coords.altitudeAccuracy + '\n' +
          'Heading: ' + position.coords.heading + '\n' +
          'Speed: ' + position.coords.speed + '\n' +
          'Timestamp: ' + position.timestamp + '\n');
        //$scope.myImgUrl = thisResult.filename;
        console.log("result.filename------" + thisResult.filename);
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

        $sessionStorage.currentLatitude = $scope.latitude;
        $sessionStorage.currentLongitude = $scope.longitude;

        console.log($scope.latitude);
        console.log($scope.longitude);

      }, function (error) {
        console.log("Could not get location");
      });



      var lookUpCode = "DIS";
      RestService.getNHPrefixData(lookUpCode, $scope.orgid).then(function (responseCAA) {
        console.log("responseCAA==" + JSON.stringify(responseCAA));
        if (responseCAA == undefined || responseCAA == null || responseCAA == "") {
          return false;
        }
        else {
          for (var i = 0; i < responseCAA.length; i++) {
            //     if(responseCAA[i].lookUpCode == 'DNN' || responseCAA[i].lookUpCode == 'DDN'){
            if ($localStorage.langNewId == "2") {
              $scope.dstoptions.push({
                id: responseCAA[i].lookUpId,
                name: responseCAA[i].descLangSecond
              });
              $scope.friend = {
                isPresent: true,
                selectedTicket: { "name": responseCAA[i].descLangSecond, "id": responseCAA[i].lookUpId } // <-- this is the default item
              };
              $scope.District = $scope.friend.selectedTicket.id;
              RestService.getOrgByDistrictIdforcomplaint($scope.District).then(function (responseCAA) {
                console.log("responseCAA==" + JSON.stringify(responseCAA));
                if (responseCAA == undefined || responseCAA == null || responseCAA == "") {
                  return false;
                }
                else {
                  for (var i = 0; i < responseCAA.length; i++) {
                    if ($localStorage.langNewId == "2") {
                      $scope.orgoptions.push({
                        id: responseCAA[i].orgid,
                        name: responseCAA[i].onlsOrgnameMar
                      });
                    } else {
                      $scope.orgoptions.push({
                        id: responseCAA[i].orgid,
                        name: responseCAA[i].onlsOrgname
                      });
                    }
                  }
                  // $ionicLoading.hide();
                }
              }, function (err) {
                toaster.error($filter('translate')('FILECOMPLAINTERROR')/* , $filter('translate')('ERROR_OCCURED') */);
                //                    $ionicLoading.hide();
              })
            } else {
              $scope.dstoptions.push({
                id: responseCAA[i].lookUpId,
                name: responseCAA[i].descLangFirst
              });
              $scope.friend = {
                isPresent: true,
                selectedTicket: { "name": responseCAA[i].descLangFirst, "id": responseCAA[i].lookUpId } // <-- this is the default item
              };
              $scope.District = $scope.friend.selectedTicket.id;
              RestService.getOrgByDistrictIdforcomplaint($scope.District).then(function (responseCAA) {
                console.log("responseCAA==" + JSON.stringify(responseCAA));
                if (responseCAA == undefined || responseCAA == null || responseCAA == "") {
                  return false;
                }
                else {
                  for (var i = 0; i < responseCAA.length; i++) {
                    if ($localStorage.langNewId == "2") {
                      $scope.orgoptions.push({
                        id: responseCAA[i].orgid,
                        name: responseCAA[i].onlsOrgnameMar
                      });
                    } else {
                      $scope.orgoptions.push({
                        id: responseCAA[i].orgid,
                        name: responseCAA[i].onlsOrgname
                      });
                    }
                  }
                  //     $ionicLoading.hide();
                }
              }, function (err) {
                toaster.error($filter('translate')('FILECOMPLAINTERROR')/* , $filter('translate')('ERROR_OCCURED') */);
                //             $ionicLoading.hide();
              })
            }
            //    }
          }
          $ionicLoading.hide();
        }
      }, function (err) {
        //					toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR_OCCURED'));
        $ionicLoading.hide();
      })

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
