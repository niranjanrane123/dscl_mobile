angular.module('starter')
    .controller('ComplaintstatusDetailctrl', function ($scope, RestService, $ionicLoading, $stateParams,
        toaster, $filter, ENV, $state, $ionicPopup, $sessionStorage, $localStorage, $ionicHistory,$rootScope) {
        $scope.complaintStatusFormResponse = false;
        $scope.esctable = false;
        $scope.actionHistoryTable = false;
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
        $scope.langID = $localStorage.langID;
        console.log($scope.langID);

        var statusresponse = $sessionStorage.complaintstatusresponse

        $scope.tokenNo = statusresponse.tokenNumber;
        $scope.Date1 = statusresponse.date;
        $scope.date = converDate(statusresponse.date);
        $scope.complainantName = statusresponse.complainantName;
        $scope.complaintType = statusresponse.department;
        $scope.complaintSubType = statusresponse.complaintSubType;
        $scope.ward = statusresponse.landmark;
        $scope.description = statusresponse.description;
        $scope.showEscHeader = true;
        $scope.zoomedInStatus = false;
        $scope.showCompAtt = false;
        $scope.showActHistHeader = true;
        
        if(statusresponse.status == 'PENDING'){
          //  $scope.status = 'Pending';
          $scope.status = statusresponse.status
        } else{    
            $scope.status = statusresponse.status
        }
       
        function converDate(date) {
            //var date = new Date(date);
            var date =moment(date).format('DD/MM/YYYY HH:mm:ss');
            return date.toLocaleString();
        }

        /* log details */
        for(var i=0;i<statusresponse.actions.length;i++){ 
            var decision = statusresponse.actions[i].decision;
            if(decision.includes("Resolved") || decision.includes("समाप्त")){
                $scope.showDeptAction = true;
                $scope.actionRemark = statusresponse.actions[i].comments;
                console.log("Remark",$scope.actionRemark)
            } else {
                $scope.showDeptAction = false;
            }
        }


        var escalationDetailsList = statusresponse.escalationDetailsList;
        if(escalationDetailsList == null || escalationDetailsList == "" ){
            $scope.showEscHeader = false;
        } else {
            $scope.showEscHeader = true;
        }

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

        $scope.allAttachments = [];
		$scope.actionhistory = [];
        $scope.docURL = [];
        // var extensions = [];
		// var extensions2 = [];
        
		$scope.showActionHistAttc = function(){

            var actionHist = statusresponse.actions; 
            console.log("Action Hist", actionHist, actionHist.length);

            if(actionHist == null || actionHist == "" ){
                $scope.showActHistHeader = false;
            } else {
                $scope.showActHistHeader = true;
            }

			
			if (actionHist.length >= 0) {
				for (var i = 0; i < actionHist.length; i++) {
					var objAttachments = actionHist[i].attachements;
					console.log("objAttachments",objAttachments)

					var attchForActionHist = $scope.deptArrays.filter(a => 
						objAttachments.some(b => b.lookUpCode == a.documentName));
					
					console.log("attchForActionHist", attchForActionHist);

//Code to push Document Type in array
                    for(var j=0; j<attchForActionHist.length; j++){
                        // extensions.push(attchForActionHist[j].documentName.split('.').pop());  
                        var extensions = attchForActionHist[j].documentName.split('.').pop();
                        console.log("extension",extensions);
                        attchForActionHist[j].documentType = extensions;
                    }
                    console.log("attchForActionHist2", attchForActionHist);
                 

                    
                    /* for(i=0;i<$scope.deptArr.length;i++){
                        $scope.docURL = attchForActionHist[i].docDes
                    } */
                    
					$scope.actionhistory.push({
						datetime: formatDate(actionHist[i].dateOfAction),
						action: actionHist[i].decision,
						empName: actionHist[i].empName,
						designation: $scope.langID == "1" ? actionHist[i].empGroupDescEng : actionHist[i].empGroupDescReg,
						Email: actionHist[i].empEmail,
						remarks: actionHist[i].comments, 
						actionAttachements: attchForActionHist,
                        //docURL: $scope.docURL
                        //docType: attchForActionHist[i].documentName.split('.').pop(),
					})
				}
				console.log("$scope.actionhistory", $scope.actionhistory, $scope.actionhistory.docType)
			}
		}



//code to zoom pictures
        $scope.zoomPicStatus = function(id, type, docDes,documentName,base64){
            console.log("base64="+base64);
            console.log("name Selected", id, type, docDes);
               
            if(type=="pdf"){                   
                $rootScope.base64toBlob(base64, 'application/pdf',documentName);
            } 
            else {if(type=="doc" || type== "docx"){
                    var t;
                        if(type=='docx'){
                        
                         t = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
                        }
                        else{
                           t = 'application/msword';
                        }
                        $rootScope.base64toBlob(base64,t,documentName);
                } else {
                    //$scope.showImagePreview(url);
                    $rootScope.base64toBlob(base64,'image/png',documentName);
                    // $scope.zoomedInStatus = true;

                    // const myArrayFiltered = $scope.deptArrays.filter((el) => {
                    //     return id === el.attachmentId;
                    // });

                    // $scope.imageZoomedStatus = myArrayFiltered[0].documentByteCode;
                    // console.log("myArrayFiltered",myArrayFiltered, myArrayFiltered[0].documentByteCode);
                }
            }
            }
        
        
        $scope.zoomPicCloseStatus = function(){
            $scope.zoomedInStatus = false;
        }

        $scope.compArrays = [];
        $scope.deptArrays = [];

//To get attachments uploaded by the complainant
        $scope.getCompAttachmentId = function(){

            $ionicLoading.show({ template: $filter('translate')('LOADING') });
            //$scope.token = "13202300288";
            RestService.getComplaintAttachmentId($scope.tokenNo).then(function (response) {
                if(response == null || response == '' || response == undefined){
                    $ionicLoading.hide();
                    return false;
                } else {
                    $ionicLoading.hide();
                    $scope.compArrays = response.attachments;
                    if($scope.compArrays.length>0){
                        $scope.showCompAtt = true;

                        for(i=0;i<$scope.compArrays.length;i++){
                            var documentType = $scope.compArrays[i].documentName.split('.');
                            documentType = documentType[1];
                            console.log("$scope.documentType2",documentType);
                            var key = 'docType';
                            $scope.compArrays[i][key] = documentType;
                        }
                        console.log("$scope.compArrays",$scope.compArrays, $scope.showCompAtt);
                        
                    } else {
                        $scope.showCompAtt = false;
                    }
                    $scope.getComplaintDoc();
                }

            }).catch((error)=>{
                $ionicLoading.hide();
                toaster.clear()
                toaster.error($filter('translate')('COMPLAINTSTATUSERROR'));
            });
        }

//To get attachments uploaded by the Department
        $scope.getComplaintDoc = function(){
            $ionicLoading.show({ template: $filter('translate')('LOADING') });
            //$scope.token = "13202300288";
            RestService.getComplantDoc($scope.tokenNo).then(function (response) {
                // console.log("response", response);
                if(response == null || response == '' || response == undefined){
                    $ionicLoading.hide();
                    return false;
                } else {
                    
                    $scope.attId = $scope.compArrays.attachmentId;
                    $scope.deptArrays = response.attachments;
                    console.log("$scope.deptArrays",$scope.deptArrays);

                   
                    $ionicLoading.hide();
                    $scope.showActionHistAttc();
                }
                

            }).catch((error)=>{
                $ionicLoading.hide();
                toaster.clear()
                toaster.error($filter('translate')('COMPLAINTSTATUSERROR'));
            });
        }

        $scope.openCitizenDoc = function(toggleValue1){
            // console.log("Citizen Toggle",toggleValue1);
            $scope.showCitizenDoc = !toggleValue1;
        }

        $scope.openDeptDoc = function(toggleValue2, index){
            console.log("Dept Toggle",toggleValue2, index);
            $scope.showDeptDoc = !toggleValue2;
            $scope.indexValue = index;
        }

        $scope.homepage = function () {
            $ionicHistory.nextViewOptions({
                disableBack: true,
                disableAnimate: true,
                historyRoot: true
            });

            $state.go("app.home");
        }

        $scope.goBack = function () {
            $state.go("app.complaintstatus");
        }

        var _init = function () {

            $scope.getCompAttachmentId();
            //$scope.getComplaintDoc();

        };
        _init();
    });