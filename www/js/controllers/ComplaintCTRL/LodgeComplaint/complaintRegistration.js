//User story #161012
angular.module('starter')
    .controller('ComplaintRegistrationFormCtrl', function ($scope, RestService, $ionicLoading, $stateParams,
        toaster, $filter, ENV, $state, $localStorage, $sessionStorage, $cordovaGeolocation, $ionicHistory, $ionicPlatform, $ionicPopup) {

        var options = { timeout: 10000, enableHighAccuracy: true };

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

        //Defect #165841
        $scope.donationService = $sessionStorage.donationFlag;
        //Defect #191740
        $scope.fromLandingPage = $sessionStorage.fromLandingPage;
        if($scope.fromLandingPage == false){
            $scope.complaintMobileNo = $localStorage.responselogindata.mobileNo;
            console.log("fromLandingPage",$scope.fromLandingPage, $scope.complaintMobileNo);
            $("#complaintForm").removeClass("disable-div");
        } else {
            toaster.warning($filter('translate')('DONATIONWARNING'));
        }

        //default complaint values start (hardcoded values)
            if (!$sessionStorage.donationFlag) {
                $scope.categoryVal = 582;
            }

            $scope.districtVal = 4403;
            //$scope.organizationId = 1;
           /*  $scope.zoneVal = 12003;
            $scope.wardVal = 12004;   */ //Workflow not defined for this values
            $scope.zoneVal = 585;
            $scope.wardVal = 11632;   //For Defect #192343 
            if (!$sessionStorage.donationFlag) {
                $scope.referenceMode = 43370;
            }
            
            $scope.applicationType = 'C';
            $scope.referenceDate = year + '-' + month + '-' +day;

            $scope.complaintDeptType = 1; 

            if (!$sessionStorage.donationFlag) {
                if(ENV.environment == 'production'){
                    $scope.complaintSubType = 1603; 
                }else{
                    $scope.complaintSubType = 1612; 
                }
            }
            
            $scope.complaintPinCode = 248001; 
            $scope.complaintReferenceNumber = "";
            $scope.complaintLandMark = ""; 
            $scope.complaintLocation = 1; 
            $scope.complaintUserId = 1; 

            if ($sessionStorage.donationFlag) {
                $scope.complaintRemark = "";
            }
        //default complaint values end   
        
        //Defect #192384
        $scope.organizationId = $localStorage.selectedorgID;


        $scope.otpSubmitCheck = false;
        $scope.submitCheck = true;
        $scope.resendOTPCheck = true;

        $scope.complaintMobileNumberSubmit = function () {
            console.log('$scope.complaintMobileNo -->',$scope.complaintMobileNo);
            if ($scope.complaintMobileNo == "" || $scope.complaintMobileNo == undefined || $scope.complaintMobileNo == null) {
                toaster.error($filter('translate')('PLSENTMOB'));
            }
            else{
                if($scope.complaintMobileNo.length == 10)
                {                   
                    $ionicLoading.show({ template: $filter('translate')('LOADING') });
                    RestService.complaintOtpService($scope.complaintMobileNo, $scope.organizationId).then(function (response) {
                        console.log('OTP response -->',response);
                        if (response == undefined || response == null || response == "") {
                            $ionicLoading.hide();
                            return false;
                        }
                        else {
                            $scope.submitCheck = false;
                            toaster.pop('success', $filter('translate')('OTPRESENT'));
                            $scope.sentOTP = response;
                            $ionicLoading.hide();
                        }
                    }, function (err) {
                        toaster.error($filter('translate')('OTPERROR'));
                        $ionicLoading.hide();
                    });
                }
            }   
        }

        $scope.compliantOtpSubmit = function () {
            console.log('$scope.complaintOtp -->',$scope.complaintOtp);
            if ($scope.complaintOtp == "" || $scope.complaintOtp == undefined || $scope.complaintOtp == null) {
                toaster.error($filter('translate')('PLSENTOTP'));
            }
            else{
                if($scope.complaintOtp.length == 6){
                    console.log('$scope.sentOTP-->',$scope.sentOTP);
                    if($scope.complaintOtp == $scope.sentOTP){
                        toaster.pop('success', $filter('translate')('OTPVERIFIED'));
                        $scope.otpSubmitCheck = true;
                        $scope.resendOTPCheck = false;   
                        $("#complaintForm").removeClass("disable-div");
                    }
                    else{
                            toaster.error($filter('translate')('VALIDOTP'));
                    }
                }
            }
                
        }

        $scope.resendOTP = function () {
            $ionicLoading.show({ template: $filter('translate')('LOADING') });
            RestService.complaintOtpService($scope.complaintMobileNo, $scope.organizationId).then(function (response) {
                console.log('OTP response -->',response);
                if (response == undefined || response == null || response == "") {
                    $ionicLoading.hide();
                    return false;
                }
                else {
                    toaster.pop('success', $filter('translate')('OTPRESENT'));
                    $scope.sentOTP = response;
                    $ionicLoading.hide();
                }
            }, function (err) {
                toaster.error($filter('translate')('OTPERROR'));
                $ionicLoading.hide();
            });
        }

        $scope.savecomplaint = function(){
            console.log('$sessionStorage.currentLat-->', $sessionStorage.currentLat, ' $sessionStorage.currentLong-->', $sessionStorage.currentLong, '$scope.complaintRemark-->', $scope.complaintRemark)
        
            var complaintType = "New Complaint";
            var applicantDTO = {
                fName: "",
                mName: "",
                lName: "",
                mobileNo: $scope.complaintMobileNo,
                phone: null,
                email: "",
                orgId: $scope.organizationId,
                deptId: null,
                empId: null,
                applicationId: null,
                challanNo: null,
                txnId: null,
                licenseNo: null,
                userId: 1,
                langId: 1,
                payStatus: null,
                payAmount: null,
                macId: null,
                updatedBy: null,
                serviceShortCode: null,
                tenant: null,
                documentList: null,
                dirPath: null,
                titleId: 1,
                blockNo: null,
                floor: null,
                wing: null,
                bldgName: "",
                houseComplexName: null,
                roadName: null,
                areaName: "",
                pincodeNo: "",
                applicationType: null,
                phone1: null,
                phone2: null,
                wardNo: null,
                bplNo: null,
                gender: 79,
                aadhaarNo: null,
                zoneNo: null,
                blockName: null,
                flatBuildingNo: "",
                cityName: "",
                uid: null,
                free: false
              }
            
                $scope.cameraImg = $scope.myImgUrl;
                if ($scope.cameraImg == "" || $scope.cameraImg == undefined || $scope.cameraImg == null) {
                    $scope.cameraImg = null;
                }

                $ionicLoading.show({ template: $filter('translate')('LOADING') });
              RestService.lodgecomplaintsave($scope.districtVal,$scope.complaintPinCode,$scope.complaintDeptType,$scope.complaintSubType,
                $scope.complaintReferenceNumber,$scope.complaintLandMark,$scope.complaintRemark,$scope.complaintLocation,
                $scope.organizationId,$scope.complaintUserId,complaintType,applicantDTO,arrayListTest,$sessionStorage.currentLat,$sessionStorage.currentLong,
                $scope.referenceMode,$scope.categoryVal,$scope.zoneVal,$scope.referenceDate,$scope.applicationType,$scope.wardVal).then(function(response){
                
                    console.log('complaint response-->',response);
                    if(response != ""){
                        if(response.complaintId!=null){
                            if(!$sessionStorage.donationFlag){
                                var confirmPopup = $ionicPopup.show({
                                    title: $filter('translate')('message'),
                                    template: $filter('translate')('SUCCESSFULLYSUBMITTED') + "\n" + response.complaintId,
                                    buttons: [{
                                      text: $filter('translate')('OK'),
                                      type: 'button button-block customBgColor',
                                      onTap: function () {
                                        $state.go("app.LandingPage");
                                      }
                                    }]
                                  });
                                  $ionicLoading.hide();
                            }
                            else{
                                var confirmPopup = $ionicPopup.show({
                                    title: $filter('translate')('message'),
                                    template: $filter('translate')('DONATION_SUBMIT_1') + " " + response.complaintId + " " + $filter('translate')('DONATION_SUBMIT_2'),
                                    buttons: [{
                                      text: $filter('translate')('OK'),
                                      type: 'button button-block customBgColor',
                                      onTap: function () {
                                        if($scope.fromLandingPage == false){
                                            $state.go("app.home");
                                        } else {
                                            $state.go("app.LandingPage");
                                        }
                                        
                                      }
                                    }]
                                  });
                                  $ionicLoading.hide();
                            }
                        }
                        else{
                            toaster.error(response.errorMsg);
                            $ionicLoading.hide();
                        }
                    }
                    else {
                        if(!$sessionStorage.donationFlag){
                            toaster.error($filter('translate')('FILECOMPLAINTERROR')/* , $filter('translate')('COMPLERROR') */);
                            $ionicLoading.hide();
                        } else {
                            toaster.error($filter('translate')('DONATION_ERROR')/* , $filter('translate')('COMPLERROR') */);
                            $ionicLoading.hide();
                        }
                    }
              },
              function (err) {
                if(!$sessionStorage.donationFlag){
                    toaster.error($filter('translate')('FILECOMPLAINTERROR')/* , $filter('translate')('') */);
                    $ionicLoading.hide();
                } else {
                    toaster.error($filter('translate')('DONATION_ERROR')/* , $filter('translate')('COMPLERROR') */);
                    $ionicLoading.hide();
                }
              });

        }

        /*camera function*/
        $ionicPlatform.ready(function () {
            $scope.isIOS = ionic.Platform.isIOS();
            console.log('ios-->', $scope.isIOS);
            $scope.isAndroid = ionic.Platform.isAndroid();
            console.log('android-->', $scope.isAndroid);
        });

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
                    targetWidth: 400,
                    targetHeight: 300,
                    popoverOptions: CameraPopoverOptions
                }
            );

            function onSuccess(result) {
                if ($scope.isAndroid) {
                    console.log('under android');
                    onSuccessAndroid(result);
                }
                else if ($scope.isIOS) {
                    console.log('under ios');
                    onSuccessIOS(result);
                }
            }


            function onSuccessAndroid(result) {
                $ionicLoading.show({ template: 'Updating Details...' });
                var thisResult = JSON.parse(result);
                console.log("thisResult---" + JSON.stringify(thisResult));
                $scope.myImgUrl = 'data:image/jpeg;base64,' + thisResult.filename;
                $scope.sendImgUrl = thisResult.filename;
                console.log("$scope.myImgUrl------" + $scope.myImgUrl);
                $scope.defaultimage = false;
                $scope.cameraImage = true;
                var documentObject =
                {
                    attachmentId: null,
                    documentId: null,
                    documentName: "Image.jpg",
                    documentSerialNo: null,
                    descriptionType: null,
                    documentType: null,
                    doc_DESC_Mar: null,
                    doc_DESC_ENGL: null,
                    documentByteCode: $scope.sendImgUrl,
                    checkkMANDATORY: "Y"
                };
                arrayListTest.push(documentObject);
                $ionicLoading.hide();

                $cordovaGeolocation.getCurrentPosition(options).then(function (position) {
                    console.log(position.coords.latitude);
                    console.log(position.coords.longitude);
                    $scope.latitude = position.coords.latitude;
                    $scope.longitude = position.coords.longitude;
    
                    $sessionStorage.currentLat = $scope.latitude;
                    $sessionStorage.currentLong = $scope.longitude;
    
                    console.log('$sessionStorage.currentLat-->', $sessionStorage.currentLat, ' $sessionStorage.currentLong-->', $sessionStorage.currentLong);
    
                }, function (error) {
                    console.log("Could not get location");
                });
            }

            function onSuccessIOS(result) {
                try {
                    $ionicLoading.show({ template: 'Updating Details...' });

                    var image = document.getElementById('image');

                    $scope.myImgUrl = 'data:image/jpeg;base64,' + result;
                    $scope.myImgUrl1 = $scope.myImgUrl
                    console.log($scope.myImgUrl, "my image url...")
                    $scope.defaultimage = false;
                    $scope.cameraImage = true;
                    var documentObject =
                    {
                        attachmentId: null,
                        documentId: null,
                        documentName: $scope.imageName,
                        documentSerialNo: null,
                        descriptionType: null,
                        documentType: null,
                        doc_DESC_Mar: null,
                        doc_DESC_ENGL: null,
                        documentByteCode: $scope.myImgUrl1,
                        checkkMANDATORY: "Y"
                    };
                    arrayListTest.push(documentObject);
                    $ionicLoading.hide();

                    $cordovaGeolocation.getCurrentPosition(options).then(function (position) {
                        console.log(position.coords.latitude);
                        console.log(position.coords.longitude);
                        $scope.latitude = position.coords.latitude;
                        $scope.longitude = position.coords.longitude;
        
                        $sessionStorage.currentLat = $scope.latitude;
                        $sessionStorage.currentLong = $scope.longitude;
        
                        console.log('$sessionStorage.currentLat-->', $sessionStorage.currentLat, ' $sessionStorage.currentLong-->', $sessionStorage.currentLong);
        
                    }, function (error) {
                        console.log("Could not get location");
                    });
                }
                catch (err) {
                    alert("error==" + err.message);
                }
            }

            function onFail(message) {
                console.log('Failed because: ' + message);
            }
            $ionicLoading.hide();
        }

        $scope.onChangeDonationType = function(value){
            $scope.categoryVal = value;
            console.log('$scope.categoryVal-->',$scope.categoryVal);
        }

        var _init = function () {
            if($localStorage.langID == "2"){
                $ionicLoading.show({ template: 'लोड हो रहा है...'    });
              }else{
                $ionicLoading.show({ template: 'Loading...'    });
              }

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

                $scope.Latitude = position.coords.latitude;
                $scope.Longitude = position.coords.longitude;
                $ionicLoading.hide();

            };

            var fail = function (error) {
                console.log('code: ' + error.code + '\n' +
                    'message: ' + error.message + '\n');
            }

            navigator.geolocation.getCurrentPosition(geoSuccess, fail);

            //Defect #165841 start
            if($scope.donationService){
                RestService.getNHPrefixData('RFM', $scope.organizationId)
                    .then(function (response) {
                        console.log("RFM response" + JSON.stringify(response));
                        for (var i = 0; i < response.length; i++) {
                            if (response[i].lookUpCode == "DT") {
                                $scope.referenceMode = response[i].lookUpId;
                            }
                        }

                        $ionicLoading.hide();
                    }, function (err) {
                        toaster.error($filter('translate')('DONATION_ERROR'));
                        $ionicLoading.hide();
                    });

                RestService.getNHPrefixData('RFC', $scope.organizationId)
                    .then(function (response) {
                        console.log("RFC response" + JSON.stringify(response));
                        var rfcResponse = new Array();
                        for (var i = 0; i < response.length; i++) {
                            if ($localStorage.langID == "1") {
                                if(response[i].lookUpCode == 'CL' || response[i].lookUpCode == 'MD' || response[i].lookUpCode == 'BK'){
                                    rfcResponse.push({
                                        value: response[i].lookUpId,
                                        name: response[i].descLangFirst
                                    });
                                }
                            } else {
                                if(response[i].lookUpCode == 'CL' || response[i].lookUpCode == 'MD' || response[i].lookUpCode == 'BK'){
                                    rfcResponse.push({
                                        value: response[i].lookUpId,
                                        name: response[i].descLangSecond
                                    });
                                }
                            }
                        }

                        $scope.donationOption = rfcResponse;

                        $ionicLoading.hide();
                    }, function (err) {
                        toaster.error($filter('translate')('DONATION_ERROR'));
                        $ionicLoading.hide();
                    });

                    RestService.finddeptcompltype($scope.complaintDeptType, $scope.organizationId, $scope.applicationType)
                    .then(function (response) {
                        console.log("finddeptcompltype response" + JSON.stringify(response));
                        for (var i = 0; i < response.length; i++) {
                            if (response[i].complaintDesc == "Donation Service") {
                                $scope.complaintSubType = response[i].compId;
                            }
                        }

                        $ionicLoading.hide();
                    }, function (err) {
                        toaster.error($filter('translate')('DONATION_ERROR'));
                        $ionicLoading.hide();
                    });
            }
            //Defect #165841 end
        };
        _init();

    });
