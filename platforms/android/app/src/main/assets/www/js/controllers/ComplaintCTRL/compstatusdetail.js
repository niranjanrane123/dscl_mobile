angular.module('starter')
    .controller('ComplaintstatusDetailctrl', function ($scope, RestService, $ionicLoading, $stateParams,
        toaster, $filter, ENV, $state, $ionicPopup, $sessionStorage, $localStorage, $ionicHistory) {
        $scope.complaintStatusFormResponse = false;
        $scope.esctable = false;
        if(!$sessionStorage.withoutLogin){
            console.log("$localStorage.responselogindata---" + JSON.stringify($localStorage.responselogindata));
            $scope.orgid = $localStorage.selectedorgID;
            $scope.userID = $localStorage.responselogindata.userId;
            $scope.loginUSername = $localStorage.responselogindata.firstName;
            $scope.loginlastname = $localStorage.responselogindata.lastName;
            var fullName = $scope.loginUSername.concat(" " + $scope.loginlastname);
            $scope.LoginMobileNo = $localStorage.responselogindata.mobileNo;
        }
        $scope.data = {}
        console.log("complaintstatusresponse--", JSON.stringify($sessionStorage.complaintstatusresponse));

        var statusresponse = $sessionStorage.complaintstatusresponse

        $scope.tokenNo = statusresponse.tokenNumber;
        $scope.Date1 = statusresponse.date;
        $scope.date = converDate(statusresponse.date);
        $scope.complainantName = statusresponse.complainantName;
        $scope.complaintType = statusresponse.department;
        $scope.complaintSubType = statusresponse.complaintSubType;
        $scope.ward = statusresponse.landmark;
        $scope.description = statusresponse.description;
        if(statusresponse.status == 'PENDING'){
            $scope.status = 'Pending';
        } else{
            $scope.status = statusresponse.status
        }
       
        function converDate(date) {
            //var date = new Date(date);
            var date =moment(date).format('DD/MM/YYYY HH:mm:ss');
            return date.toLocaleString();
        }

        /* log details */


        var escalationDetailsList = statusresponse.escalationDetailsList;

        var tempTest = 0;
        if (escalationDetailsList.length >= 0) {

            $scope.escalDetailsList = [];
            for (var i = 0; i < escalationDetailsList.length; i++) {
                if(escalationDetailsList[i].status!='NOT_ASSIGNED')
                $scope.escalDetailsList.push({
                    // datetime: converDate(escalationDetailsList[i].dateOfAction),
                    datetime: escalationDetailsList[i].assignmentDate,
                    action: escalationDetailsList[i].decision,
                    status: escalationDetailsList[i].status,
                    empName: escalationDetailsList[i].empName,
                    designation: escalationDetailsList[i].designation,
                    department: escalationDetailsList[i].department,
                    Email: escalationDetailsList[i].empEmail,
                    remarks: escalationDetailsList[i].comments,
                })
            }
            $scope.esctable = true;
            $ionicLoading.hide();
        }



        /*var escalationDetailsList = $sessionStorage.logdetailresponse;
       
        var tempTest = 0;
        if(escalationDetailsList.length >= 0){
       
            $scope.escalDetailsList = [];
            for(var i=0;i<escalationDetailsList.length;i++){
                $scope.escalDetailsList.push({
                    datetime : formatDate(escalationDetailsList[i].dateOfAction),
                    action : escalationDetailsList[i].decision,
                    empName: escalationDetailsList[i].empName,
                    designation: escalationDetailsList[i].empGroupDescEng,
                    Email : escalationDetailsList[i].empEmail,
                    remarks : escalationDetailsList[i].comments,
                })
              }
                $scope.esctable = true;
                $ionicLoading.hide();
        }*/

        /*
        $scope.organizationName = statusresponse.organizationName;
        $scope.tokenNo = statusresponse.tokenNumber;
        $scope.Date1 = statusresponse.date;
        $scope.date = formatDate(statusresponse.date);
        $scope.complainantName = statusresponse.complainantName;
        $scope.complaintType = statusresponse.complaintType;
        $scope.complaintSubType = statusresponse.complaintSubType;
        $scope.ward = statusresponse.ward;
        $scope.description = statusresponse.description;
        /*
        var escalationDetailsList = statusresponse.escalationDetailsList;
       
        var tempTest = 0;
        if(escalationDetailsList.length > 0){
        if(escalationDetailsList[0].level==undefined || escalationDetailsList[0].level == null || escalationDetailsList[0].level=="")
        {
            tempTest    =   1;
            $scope.esctable = false;
            $ionicLoading.hide();
            return false;
        }
        else
        {
            $scope.escalDetailsList = [];
            for(var i=0;i<escalationDetailsList.length;i++){
                $scope.escalDetailsList.push({
                    level : escalationDetailsList[i].level,
                    duration : escalationDetailsList[i].sla,
                    empName: escalationDetailsList[i].empName,
                    Designation: escalationDetailsList[i].designation,
                    Department : escalationDetailsList[i].department,
                    Email : escalationDetailsList[i].email,
                    Decision : escalationDetailsList[i].decision,
                })
            }
            $scope.esctable = true;
            if(tempTest==0)
            $ionicLoading.hide();
        }
        }*/
        /*$scope.escalDetailsList = [];
        for(var i=0;i<escalationDetailsList.length;i++){
            $scope.escalDetailsList.push({
                level : escalationDetailsList[i].level,
                duration : escalationDetailsList[i].sla,
                empName: escalationDetailsList[i].empName,
                Designation: escalationDetailsList[i].designation,
                Department : escalationDetailsList[i].department,
                Email : escalationDetailsList[i].email,
                Decision : escalationDetailsList[i].decision,
            })
        }   */

        $scope.homepage = function () {
            $ionicHistory.nextViewOptions({
                disableBack: true,
                disableAnimate: true,
                historyRoot: true
            });

            $state.go("app.home");
        }


        var _init = function () {

        };
        _init();
    });