angular.module('starter')
    .controller('Complaintstatusctrl', function ($scope, RestService, $ionicLoading, $stateParams,
        toaster, $filter, ENV, $state, $ionicPopup, $sessionStorage, $localStorage) {

        console.log('$sessionStorage.withoutLogin-->',$sessionStorage.withoutLogin);
        if($sessionStorage.withoutLogin){
            $scope.submitCheck = true;
            $scope.complaintStatusShow = false;
            $scope.organizationId = 1;
        }
        else{
            console.log("$localStorage.responselogindata---" + JSON.stringify($localStorage.responselogindata));
            $scope.complaintStatusShow = true;
        //      $scope.orgid = $localStorage.responselogindata.orgId;
            $scope.orgid = $localStorage.selectedorgID;
            $scope.userID = $localStorage.responselogindata.userId;
            $scope.loginUSername = $localStorage.responselogindata.firstName;
            $scope.LoginMobileNo = $localStorage.responselogindata.mobileNo;
        }
        $scope.allComplaints=null;
        $scope.recordNotAvailable =false;
        $scope.tokennumber;
        $scope.complaintStatusFormResponse = false;
        $scope.langID =$localStorage.langID

        $scope.changeColor =function(status){
            //console.log("STYATYS",status)
            if(status==='PENDING'){
                return 'redColorStatus'
            }else{
                return 'greenColorSta'
            }
        }

        $scope.applicationstatussearch = function (compId) {
            $ionicLoading.show({template:'<ion-spinner class="spinner-energized" icon="circles"></ion-spinner>'});
            RestService.getGrievanceApplicantStatus(compId, $localStorage.langID).then(function (complaintstatusresponse) {
                console.log("complaintstatusresponse",JSON.stringify(complaintstatusresponse))
                if (complaintstatusresponse == "" || complaintstatusresponse == undefined) {
                    toaster.clear()
                    toaster.error($filter('translate')('VALIDCOMPLAINTNU'));
                    $ionicLoading.hide();
                } else {
                    $sessionStorage.complaintstatusresponse = complaintstatusresponse;
                    $state.go("app.compstatusdetail");
                }
                $ionicLoading.hide();
            },
                function (err) {
                    $ionicLoading.hide();
                    toaster.clear()
                    toaster.error($filter('translate')('COMPLAINTSTATUSERROR'));
                })
        }

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

                        $ionicLoading.show({template:'<ion-spinner class="spinner-energized" icon="circles"></ion-spinner>'});
                        RestService.getAllComplaints($scope.complaintMobileNo).then(function (response) {
                            console.log('complaint status response-->',response);
                            $scope.complaintStatusShow = true;
                            $ionicLoading.hide()
                            if(response.length>0){
                                $scope.allComplaints = response;
                            }else{
                                $scope.recordNotAvailable=true;
                                toaster.clear()
                                toaster.error($filter('translate')('NO_RECORD'));
                            }
                        }).catch((error)=>{
                            toaster.clear()
                            toaster.error($filter('translate')('COMPLAINTSTATUSERROR'));
                        });
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

        $scope.getPhoto = function () {
            navigator.camera.getPicture(onSuccess, onFail,
                {
                    quality: 75,
                    destinationType: Camera.DestinationType.FILE_URI,
                    sourceType: Camera.PictureSourceType.CAMERA,
                    encodingType: Camera.EncodingType.JPEG,
                    targetWidth: 100,
                    targetHeight: 100,
                    popoverOptions: CameraPopoverOptions,
                    saveToPhotoAlbum: true
                }
            );

            function onSuccess(result) {
                // convert JSON string to JSON Object
                var thisResult = JSON.parse(result);

                // convert json_metadata JSON string to JSON Object
                var metadata = JSON.parse(thisResult.json_metadata);

                $scope.image = document.getElementById('myImage');
                $scope.image.src = thisResult.filename

                if (thisResult.json_metadata != "{}") {
                    if (device.platform == 'iOS') {

                        // notice the difference in the properties below and the format of the result when you run the app.
                        // iOS and Android return the exif and gps differently and I am not converting or accounting for the Lat/Lon reference.
                        // This is simply the raw data being returned.

                        alert('Lat: ' + metadata.GPS.Latitude + ' Lon: ' + metadata.GPS.Longitude);
                    } else {
                        alert('Lat: ' + metadata.gpsLatitude + ' Lon: ' + metadata.gpsLongitude);
                    }

                }
            }

            function onFail(message) {
                alert('Failed because: ' + message);
            }
        }

        // $scope.getAllData=function(){
        //  $scope.editmobilenum = $localStorage.responselogindata.mobileNo;
        //  RestService.commonSearchStatus($scope.editmobilenum).then(function (resp) {

        //      console.log("COMPLAINT RESP",JSON.stringify(resp))
        //  })
        // }

        $scope.setSelected = function (SelectedTask) {


        }


        var _init = function () {
            if(!$sessionStorage.withoutLogin){
                $ionicLoading.show({template:'<ion-spinner class="spinner-energized" icon="circles"></ion-spinner>'});
                    $scope.editmobilenum = $localStorage.responselogindata.mobileNo;
                    RestService.getAllComplaints($scope.editmobilenum).then(function (resp) {
                    
                        $ionicLoading.hide()
                        // console.log("COMPLAINT RESP",JSON.stringify(resp))
                        if(resp.length>0){
                            $scope.allComplaints =resp
                        }else{
                            $scope.recordNotAvailable=true;
                            toaster.clear()
                            toaster.error($filter('translate')('NO_RECORD'));
                        }
                    }).catch((error)=>{
                        toaster.clear()
                        toaster.error($filter('translate')('COMPLAINTSTATUSERROR'));
                    });
            }
        };
        _init();
    });
