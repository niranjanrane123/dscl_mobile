angular.module('starter')

  .controller('PLLicenceCTRL', function ($rootScope,$scope, $location, RestService, $ionicLoading, $stateParams, toaster,
		  $filter, ENV, dateFilter, $state, $localStorage,$sessionStorage,$ionicModal,$window,$ionicPopup,$ionicHistory,$ionicPlatform) {

	 console.log("$localStorage.responselogindata---"+JSON.stringify($localStorage.responselogindata));
    $scope.data_ = {};
		$scope.orgid = $localStorage.selectedorgID;
		$scope.userID = $localStorage.responselogindata.userId;
		$scope.loginUSername = $localStorage.responselogindata.firstName;
		$scope.LoginMobileNo = $localStorage.responselogindata.mobileNo;
    $scope.emailId = $localStorage.responselogindata.emailId;
    $localStorage.langID = "1";
    $scope.ServiceShortName = "WPL";
	  $scope.plbFirstName;
	  $scope.plbMiddleName;
	  $scope.plbLastName;
	  $scope.plbMobileNo;
	  $scope.plbEmail
	  $scope.plbAddress1;
	  $scope.plbAddress2;
	  $scope.plbAddress3;
	  $scope.plbPinCode;
	  $scope.plbAdharNumber;
	  $scope.plbPovertyLine;
	  $scope.plbZone;
	  $scope.plbWard;
	  $sessionStorage.lookUpCodeAPL = "APL";
	  $sessionStorage.serviceCode = "WPL";
	  $sessionStorage.deptCode = "WT";
    $scope.qualifications = new Array();
    $scope.qualifications2 = new Array();
    $scope.receiptCollections2 = {};
    $scope.receiptCollections = {};
		var cosconnsizetext;
		var costariftext;
		var cospermisetext;
		$scope.selectfilename;
		$scope.newtransfermode;
		/*old data*/
		$scope.oldCOWconnName;
		$scope.oldtitle;
		$scope.oldconnNo;
		$scope.oldcsidn;
		$scope.oldCOUconnSize;
		$scope.oldcodDwzid1;
		$scope.oldcodDwzid2;
		$scope.oldCOUtarifCate;
		$scope.oldCOUpermiseType;
		$scope.oldCOUmetertype;
		$scope.oldCOUapplicantType;

    $sessionStorage.lookUpCodeAPL = "APL";
    $sessionStorage.serviceCode = "WPL";
    $sessionStorage.deptCode = "WT";
    $localStorage.langID = "1";
    $scope.ServiceShortName = "WPL";

    $scope.selectfilename;
    $scope.newtransfermode;
    /*old data*/
    $scope.oldCOWconnName;
    $scope.oldtitle;
    $scope.oldconnNo;
    $scope.oldcsidn;
    $scope.oldCOUconnSize;
    $scope.oldcodDwzid1;
    $scope.oldcodDwzid2;
    $scope.oldCOUtarifCate;
    $scope.oldCOUpermiseType;
    $scope.oldCOUmetertype;
    $scope.oldCOUapplicantType;
    $scope.ruleId = null;
    $scope.documentGroup = null;
    $scope.financialYear ;

    // Custom popup
   $scope.myPopup = $ionicPopup.show({
      template: $filter('translate')('message'),
      title: $filter('translate')('READANDACCEPT'),
      scope: $scope,
      buttons : [{
             text : $filter('translate')('CANCEL'),
             type : 'button customBgColor',

              onTap : function() {

                 $state.go('app.home');
    //					            	 ionic.Platform.exitApp();
               }
           },
         {
            text : $filter('translate')('ACCEPT'),
            type : 'button customBgColor',
            onTap : function() {

           	  var deregisterSecond = $ionicPlatform.registerBackButtonAction(
           		      function() {

           		    	  var confirmPopup = $ionicPopup.show({

           		    		    title : 'MAINeT?',
           			          template : 'Are You Sure Want To Logout?',

           			          buttons : [{
           			        	  			text : 'Cancel',
           			        	  			type : 'button button-block  customBgColor',
           			          			},
           			          		{
           					             text : 'Ok',
           					             type : 'button button-block  customBgColor',

           					             onTap : function() {
           					            	 	$localStorage.$reset();
           					    			 	  $window.localStorage.clear();
           					    			      $ionicHistory.clearCache();
           					    			      $ionicHistory.clearHistory();
           					    			      $state.go('app.LoginPage');
           //					            	 ionic.Platform.exitApp();
           					             	}
           			          		}]
           		           });
           		      }, 100
           		    );
           	$scope.$on('$destroy', deregisterSecond);

            }
         }]
   });

   var myNullAction = $ionicPlatform.registerBackButtonAction(function(){
     // do nothing
   }, 401);
   $scope.myPopup.then(function(res) {
      myNullAction();
   });

       //initialize model
       $ionicLoading.show({
           template:$filter('translate')('LOADING')
         });
       RestService.getinitializedmodel().then(function (responsedata){
     //	console.log("resposeaayaainitial--"+responsedata);
       console.log("status--"+responsedata.wsStatus)
             $scope.initialResponse = responsedata;
       if(responsedata.wsStatus == "success"){

             $scope.orgId = responsedata.responseObj[0].orgId;
             $scope.usageSubtype1 = responsedata.responseObj[0].usageSubtype1;
             $scope.usageSubtype2 = responsedata.responseObj[0].usageSubtype2;
             $scope.usageSubtype3 = responsedata.responseObj[0].usageSubtype3;
             $scope.usageSubtype4 = responsedata.responseObj[0].usageSubtype4;
             $scope.usageSubtype5 = responsedata.responseObj[0].usageSubtype5;
             $scope.factor1 = responsedata.responseObj[0].factor1;
             $scope.factor2 = responsedata.responseObj[0].factor2;
             $scope.factor3 = responsedata.responseObj[0].factor3;
             $scope.factor4 = responsedata.responseObj[0].factor4;
             //$scope.isBPL = responsedata.responseObj[0].isBPL;
             $scope.noOfDays = responsedata.responseObj[0].noOfDays;
             $scope.serviceCode = responsedata.responseObj[0].serviceCode;
             $scope.deptCode = responsedata.responseObj[0].deptCode;
             $scope.applicantType = responsedata.responseObj[0].applicantType;
             $scope.isOutStandingPending = responsedata.responseObj[0].isOutStandingPending;
             $scope.isExistingConnectionOrConsumerNo = responsedata.responseObj[0].isExistingConnectionOrConsumerNo;
             $scope.isExistingProperty = responsedata.responseObj[0].isExistingProperty;
             $scope.disConnectionType = responsedata.responseObj[0].disConnectionType;
             $scope.financialYear =  responsedata.responseObj[0].financialYear;
             $scope.isBPL = responsedata.responseObj[0].isBPL;
             /*water rate master*/

             $sessionStorage.wrorgId = responsedata.responseObj[1].orgId;
             $sessionStorage.wrusageSubtype1 = responsedata.responseObj[1].usageSubtype1;
             $sessionStorage.wrusageSubtype2 = responsedata.responseObj[1].usageSubtype2;
             $sessionStorage.wrusageSubtype3 = responsedata.responseObj[1].usageSubtype3;
             $sessionStorage.wrusageSubtype4 = responsedata.responseObj[1].usageSubtype4;
             $sessionStorage.wrusageSubtype5 = responsedata.responseObj[1].usageSubtype5;
             $sessionStorage.wrfactor1 = responsedata.responseObj[1].factor1;
             $sessionStorage.wrfactor2 = responsedata.responseObj[1].factor2;
             $sessionStorage.wrfactor3 = responsedata.responseObj[1].factor3;
             $sessionStorage.wrfactor4 = responsedata.responseObj[1].factor4;
             $sessionStorage.wrisBPL = $scope.COBpl;
             $sessionStorage.wrisBPLno = $scope.CObplno;
             $sessionStorage.wrServiceCode = responsedata.responseObj[1].serviceCode;
             $sessionStorage.wrDeptCode = responsedata.responseObj[1].deptCode;
             $sessionStorage.wrTaxType = responsedata.responseObj[1].taxType;
             $sessionStorage.wrTaxCode = responsedata.responseObj[1].taxCode;
             $sessionStorage.wrTaxCate = responsedata.responseObj[1].taxCategory;
             $sessionStorage.wrTaxSubCate = responsedata.responseObj[1].taxSubCategory;
             $sessionStorage.wrMeterType = responsedata.responseObj[1].meterType;
             $sessionStorage.wrChargeAppl = responsedata.responseObj[1].chargeApplicableAt;
             $sessionStorage.wrConnSize = responsedata.responseObj[1].connectionSize;
             $sessionStorage.wrConnType = responsedata.responseObj[1].connectionType;
             $sessionStorage.wrRoadType = responsedata.responseObj[1].roadType;
             $sessionStorage.wrtransferMode = responsedata.responseObj[1].transferMode;
             $sessionStorage.wrDisConnType = responsedata.responseObj[1].disConnectionType;
             $sessionStorage.wrRatestartDate = responsedata.responseObj[1].rateStartDate;
             $ionicLoading.hide();
            }
             else{
               toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR'));
             }
         },function (err) {
           toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR'));
           $ionicLoading.hide();
         })

       //get deparment id
        RestService.getDepartId($scope.orgid,$scope.ServiceShortName)
          .then(function (response) {
          console.log("service id response"+JSON.stringify(response));
          $ionicLoading.hide();
          $sessionStorage.deptId = response;
          console.log("DEPRTMENT ID "+response)
          serviceId();
        }, function (err) {
          $ionicLoading.hide();
          toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR_OCCURED'));
        })
        var serviceId = function(){
           RestService.getServiceId($scope.orgid,"WPL")
                 .then(function (response) {
                 console.log("service id response"+JSON.stringify(response));
                 $ionicLoading.hide();
                 $scope.ServiceIdGet = response;
                 console.log("SERVICE OD "+$scope.ServiceIdGet)
                 }, function (err) {
                   $ionicLoading.hide();
                   toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR_OCCURED'));
            })
        }
      // property zone
       RestService.getHPrefixData("WZB","1",$scope.orgid).then(function (response) {
         if(response == undefined || response == null || response == ""){
             $ionicLoading.hide();
              return false;
         }else{
          console.log("response classification--"+JSON.stringify(response));
             $scope.Zone=new Array();
             for(var i=0;i<response.length;i++){
             if($localStorage.langNewId == "1"){
                $scope.Zone.push({
                 value: response[i].lookUpId,
                 name:response[i].descLangFirst
               })
             }else{
                 $scope.Zone.push({
                 value: response[i].lookUpId,
                 name:response[i].descLangSecond
               })
               }
              }
             }
              $ionicLoading.hide();
          },function (err) {
            toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR_OCCURED'));
            $ionicLoading.hide();
          })

       //get ward

         $scope.fetchWard = function(){
         console.log("property ward"+$scope.plbZone)
          RestService.getHPrefixData("WZB","2",$scope.orgid).then(function (response) {
              if(response == undefined || response == null || response == ""){
                  $ionicLoading.hide();
                   return false;
              }else{
               console.log("response classification--"+JSON.stringify(response));
                $scope.ZoneWard=new Array();
                for(var i=0;i<response.length;i++){
                 if(response[i].lookUpParentId == $scope.plbZone){
                   if($localStorage.langNewId == "1"){
                       $scope.ZoneWard.push({
                        value: response[i].lookUpId,
                        name:response[i].descLangFirst
                      })
                    }else{
                        $scope.ZoneWard.push({
                        value: response[i].lookUpId,
                        name:response[i].descLangSecond
                      })
                      }
                    }
                    }
                }
                  $ionicLoading.hide();
              },function (err) {
                toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR_OCCURED'));
              $ionicLoading.hide();
             })
           }
      //get education
          var lookUpCode  = "ECN";
            RestService.getNHPrefixData(lookUpCode,$scope.orgid).then(function (educationResponse){
              console.log("geteducationresponse=="+educationResponse);
              if(educationResponse==undefined || educationResponse == null || educationResponse=="")
              {

                $ionicLoading.hide();
                 return false;
              }
              else
              {
                $scope.EducationResponse = educationResponse;
                 for(var i=0;i<educationResponse.length;i++){
        //	  			if($localStorage.langID == "1"){
                      $scope.qualifications.push({
                        id : educationResponse[i].lookUpId,
                        name : educationResponse[i].descLangFirst,
                        option: educationResponse[i].descLangFirst
                      })

                 }
                $ionicLoading.hide();
              }
            },function (err) { toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR')); })

     //getfirm type
              var lookUpCode  = "PFT";
                 RestService.getNHPrefixData(lookUpCode,$scope.orgid).then(function (educationResponse2){
                   console.log("geteducationresponse=="+educationResponse2);
                   if(educationResponse2==undefined || educationResponse2 == null || educationResponse2=="")
                   {

                     $ionicLoading.hide();
                      return false;
                   }
                   else
                   {
                     $scope.EducationResponse2 = educationResponse2;
                      for(var i=0;i<educationResponse2.length;i++){
             //	  			if($localStorage.langID == "1"){
                           $scope.qualifications2.push({
                             id : educationResponse2[i].lookUpId,
                             name : educationResponse2[i].descLangFirst,
                             option: educationResponse2[i].descLangFirst
                           })

                      }
                     $ionicLoading.hide();
                   }
                 },function (err) { toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR')); })

            // get TITLE
             var lookUpCode  = "TTL";
                RestService.getNHPrefixData(lookUpCode,$scope.orgid).then(function (titleResponse2){
                  console.log("gettitle=="+JSON.stringify(titleResponse2));
                  if(titleResponse2==undefined || titleResponse2 == null || titleResponse2=="")
                  {
                     return false;
                  }
                else
                 {
                   $scope.titleResponse2 = new Array();
                   for(var i=0;i<titleResponse2.length;i++){
                     if($localStorage.langNewId == "1"){
                        $scope.titleResponse2.push({
                            id : titleResponse2[i].lookUpId,
                            value : titleResponse2[i].descLangFirst
                        })
                       }else{
                        $scope.titleResponse2.push({
                            id : titleResponse2[i].lookUpId,
                            value : titleResponse2[i].descLangSecond
                          })
                       }
                     }
                  }
                },function (err) { toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR')); })

                //get BPL
                 var lookUpCode  = "YNC";
                    RestService.getNHPrefixData(lookUpCode,$scope.orgid).then(function (bplResponse2){
                      console.log("gettitle=="+JSON.stringify(bplResponse2));
                      if(bplResponse2==undefined || bplResponse2 == null || bplResponse2=="")
                      {

                        $ionicLoading.hide();
                         return false;
                      }
                    else
                     {
                      $scope.bplResponse2 = new Array();
                       for(var i=0;i<bplResponse2.length;i++){
                        if($localStorage.langNewId == "1"){
                            $scope.bplResponse2.push({
                                id : bplResponse2[i].lookUpId,
                                value : bplResponse2[i].descLangFirst
                            })
                           }else{
                            $scope.bplResponse2.push({
                                id : bplResponse2[i].lookUpId,
                                value : bplResponse2[i].descLangSecond
                              })
                           }
                         }
                        $ionicLoading.hide();
                      }
                    },function (err) { toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR')); })

          //image to bycode
              $scope.imageupload = function(fileObject){
              	var reader = new FileReader();
              	var idValue	=	fileObject.getAttribute("id");
              	verfy  = fileObject.files[0];
              	var maxSize = 1000000;
                  var fileSize = verfy.size;

              	var ext = fileObject.value.split('.').pop();
              	if(ext){
                  	if(ext == "png" || ext == "jpeg" || ext == "jpg"){

                      }
                  	else{
                  		fileObject.value = "";
                      	$rootScope.simpleAlert('Only png or jpeg extension file(s) allowed.');
                          $('#iDivBusyLoad').hide();
                          return;
                  	}
                  }else{
                  	$rootScope.simpleAlert("Please uplaod a valid image");
                  	$('#iDivBusyLoad').hide();
                  	return;
                  }
                  if(fileSize > maxSize){
                  	fileObject.value = "";
                      $rootScope.simpleAlert('validdocumentSize');
                      $('#iDivBusyLoad').hide();
                      return;
                  }
              		reader.onload = function(e){
              		console.log("about to encode");
              		$scope.encoded_file = window.btoa(e.target.result.toString());

              	 };
              	reader.readAsBinaryString(verfy);
              };

		/* modal */
//
			 $ionicModal.fromTemplateUrl('templates/Water/PlumberLicence/modal/professionalDetails.html', {
				    scope: $scope,
				    animation: 'slide-in-up'
				  }).then(function(modal) {
				    $scope.modal = modal;
				  });

				  $scope.openModal = function(action,qualification,doPassing,percent,instituteName,instituteAddress) {
						$scope.RCModalParams = {
								action: action,
							  plumQualId: 0,
                plumId: null,
                plumQualification: qualification,
                plumPassMonth: Date.parse(doPassing),
                plumPassYear: null,
                plumPercentGrade: percent,
                plumInstituteName: instituteName,
                plumInstituteAddress: instituteAddress,
                orgId: null,
                userId: null,
                langId: 0,
                lmodDate: null,
                updatedBy: null,
                updatedDate: null,
                lgIpMac: null,
                lgIpMacUpd: null
							}
						$scope.$broadcast('ProfessionModalEv',JSON.stringify($scope.RCModalParams));
				    $scope.modal.show();
				  };

				  $scope.closeModal = function() {
				    $scope.modal.hide();
				  };

					$scope.$on('ProfessionEv', function (event, data){
				    	$scope.receiptCollections = {};
				    	$scope.receiptCollections = data;
				    	console.log("receiptCollections:"+JSON.stringify($scope.receiptCollections));
				    });

				  $scope.$on('$destroy', function() {
				    $scope.modal.remove();
				  });

				  $scope.removeReceiptHead = function (index) {
				    	var confirmDelete = $scope.showconfirmbox();
				    	if(confirmDelete == "Y"){
					    	var deleteAmount = $sessionStorage.receiptArray[index].amount;
					    	$scope.AccTotalAmount -= parseInt(deleteAmount);
					    	$sessionStorage.receiptArray.splice(index, 1);
					    	$scope.receiptCollections = $sessionStorage.receiptArray;
					    	if(!$scope.receiptCollections || $scope.receiptCollections.length < 1) $("#receiptErrorMsg").show();
				    	}else {
				    		return;
				    	}
				    };

  // modal experience

            $ionicModal.fromTemplateUrl('templates/Water/PlumberLicence/modal/experienceDetails.html', {
              scope: $scope,
              animation: 'slide-in-up'
            }).then(function(modal2) {
              $scope.modal2 = modal2;
            });

            $scope.openModal2 = function(action,empName,empAddress,fromDate,toDate,experience,firmType) {
              $scope.RCModalParams2 = {
                  action: action,
                  plumExpId: 0,
                  plumId: null,
                  plumCompanyName: empName,
                  plumCompanyAddress: empAddress,
                  plumExpMonth: null,
                  plumExpYear: null,
                  orgId: null,
                  userId: null,
                  langId: 0,
                  lmodDate: null,
                  updatedBy: null,
                  updatedDate: null,
                  lgIpMac: null,
                  lgIpMacUpd: null,
                  expFromDate: Date.parse(fromDate),
                  expToDate: Date.parse(toDate),
                  experience: experience,
                  firmType: firmType,
                  totalExprience: null
                }
              $scope.$broadcast('ExperienceModalEv',JSON.stringify($scope.RCModalParams2));
              $scope.modal2.show();
            };

            $scope.closeModal2 = function() {
              $scope.modal2.hide();
            };

            $scope.$on('ExperienceEv', function (event, data){
                $scope.receiptCollections2 = {};
                $scope.receiptCollections2 = data;
                console.log("receiptCollections2:"+JSON.stringify($scope.receiptCollections2));
              });

            $scope.$on('$destroy', function() {
              $scope.modal2.remove();
            });

            $scope.removeReceiptHead2 = function (index) {
                var confirmDelete = $scope.showconfirmbox();
                if(confirmDelete == "Y"){
                  var deleteAmount = $sessionStorage.receiptArray2[index].amount;
                  $scope.AccTotalAmount -= parseInt(deleteAmount);
                  $sessionStorage.receiptArray2.splice(index, 1);
                  $scope.receiptCollections2 = $sessionStorage.receiptArray2;
                  if(!$scope.receiptCollections2 || $scope.receiptCollections2.length < 1) $("#receiptErrorMsg").show();
                }else {
                  return;
                }
              };


    $scope.showconfirmbox = function () {
      if ($window.confirm("Are you sure you want to delete?")) return "Y";
      else return "N";
    }
    $scope.getTotal = function(){
        var total = 0;
        for(var i = 0; i < $scope.receiptCollections2.length; i++){
            var experience = $scope.receiptCollections2[i];
            total += (product.price * product.quantity);
        }
        return total;
    }
//		/* modal */
   $scope.filterQualification = function(id){
      for(var i=0;i<$scope.qualifications.length;i++){
        if(id == $scope.qualifications[i].id){
           var qualificationValue = $scope.qualifications[i].name;
           return qualificationValue;
        }
      }
    }

    $scope.firmType = function(id){
      for(var i=0;i<$scope.qualifications2.length;i++){
        if(id == $scope.qualifications2[i].id){
           var qualificationValue2 = $scope.qualifications2[i].name;
           return qualificationValue2;
        }
      }
    }
    
    $scope.savePlumberLicence = function(){
      if($scope.encoded_file == undefined){
        toaster.error($filter('translate')('ERROR'), $filter('translate')('UPLOADPLUMBERIMAGE'));
        return;
      }
      if($scope.receiptCollections.length == undefined){
        toaster.error($filter('translate')('ERROR'), $filter('translate')('ENTERQUALIFICATIONS'));
        return;
      }else{
      if($scope.receiptCollections2.length == undefined){
        $scope.receiptCollections2 = null
      }
      var plumberData = {
          plumberId: null,
          plumberLicenceNo: null,
          plumberFName: $scope.plbFirstName,
          plumberMName: $scope.plbMiddleName,
          plumberLName: $scope.plbLastName,
          plumberFullName: null,
          plumAppDate: Date.parse(new Date()),
          plumSex: null,
          plumDOB: null,
          plumContactPersonName: null,
          plumLicIssueFlag: null,
          plumLicIssueDate: null,
          plumLicFromDate: null,
          plumLicToDate: null,
          userId: $scope.userID,
          langId: parseInt($localStorage.langNewId),
          lmoddate: null,
          updatedBy: null,
          updatedDate: null,
          plumInterviewRemark: null,
          plumInterviewClr: null,
          plumLicType: null,
          plumFatherName: null,
          plumContactNo: null,
          plumCpdTitle: null,
          plumAddress: null,
          plumInterviewDate: null,
          plumOldLicNo: null,
          ported: null,
          lgIpMac: $localStorage.macAddress,
          lgIpMacUpd: null,
          plumEntryFlag: null,
          fileList: [],
          applicationId: null,
          serviceId: $scope.ServiceIdGet,
          fileCheckList: [],
          documentList: [],
          plumberImage: 'plumber.png',
          orgId: $scope.orgid,
          deptId: $sessionStorage.deptId,
          uploadedDocSize: 0,
          applicant: {
            organizationName: null,
            applicantFirstName: $scope.plbFirstName ,
            applicantMiddleName: $scope.plbMiddleName,
            applicantLastName: $scope.plbLastName,
            gender: null,
            mobileNo: $scope.plbMobileNo,
            emailId: $scope.plbEmail,
            pinCode: $scope.plbPinCode,
            buildingName: null,
            roadName: $scope.plbAddress1,
            applicantTitle: parseInt($localStorage.langNewId),
            areaName: $scope.plbAddress2,
            blockName: null,
            housingComplexName: null,
            wing: null,
            floorNo: null,
            phone1: null,
            phone2: null,
            contactPersonName: null,
            villageTownSub: $scope.plbAddress3,
            cfcCitizenId: null,
            povertyLine: null,
            orgId: $scope.orgid,
            langId: parseInt($localStorage.langNewId),
            userId: $scope.userID,
            bplNo: $scope.data_.plbBplno,
            flatBuildingNo: null,
            codTryId1: null,
            codTryId2: null,
            codTryId3: null,
            codTryId4: null,
            codTryId5: null,
            aadharNo: $scope.plbAdharNumber,
            dwzid1: $scope.plbZone,
            dwzid2: $scope.plbWard,
            dwzid3: null,
            dwzid4: null,
            dwzid5: null,
            serviceId: null,
            departmentId: null,
            isBPL: $scope.plbPovertyLine,
            panNo: null
          },
          plumberQualificationDTOList: $scope.receiptCollections,
          plumberExperienceDTOList: $scope.receiptCollections2,
          imageByteCode: $scope.encoded_file,
          amount: 0,
          licFromDate: null,
          licToDate: null,
          dupStatus: false,
          receiptNo: null,
          plumRenewFromDate: null,
          plumRenewToDate: null
        }

        console.log("plumber data"+JSON.stringify(plumberData))

       $sessionStorage.plumberData = plumberData;

       $ionicLoading.show({	template:$filter('translate')('LOADING')	});

       RestService.checklistcall2(
          $sessionStorage.serviceCode,$sessionStorage.deptCode,$scope.usageSubtype1,$scope.oldCOUpermiseType,
          $scope.applicantType,$scope.isExistingConnectionOrConsumerNo,$scope.isExistingProperty,
          $scope.plbPovertyLine,$scope.usageSubtype3,$scope.usageSubtype4,$scope.usageSubtype5,$scope.noOfDays,
          $scope.isOutStandingPending,$scope.disConnectionType,$scope.factor1,$scope.factor2,$scope.factor3,
          $scope.factor4,$scope.orgid,$scope.applicantType,$scope.ruleId,$scope.documentGroup,$scope.financialYear).
          then(function (responsechecklistdata){
          $ionicLoading.show({	template: $filter('translate')('LOADING')	});
          console.log("responsechecklistdata--"+JSON.stringify(responsechecklistdata));
        if(responsechecklistdata.wsStatus == "success"){
            $sessionStorage.responsechecklistdata = responsechecklistdata;
            var lookUpCode = "CAA";
            RestService.getNHPrefixData(lookUpCode,$scope.orgid).then(function (responseCAA) {
               $sessionStorage.responsechecklistdata = responsechecklistdata;
                var lookUpCode = "CAA";
                 RestService.getNHPrefixData(lookUpCode,$scope.orgid).then(function (responseCAA) {
                  console.log("responseCAA=="+JSON.stringify(responseCAA));
                    if(responseCAA==undefined || responseCAA == null || responseCAA =="")
                    {
                       calculateChargers();
                       return false;
                    }
                    else
                    {
                      console.log("$sessionStorage.lookUpCodeAPL--"+$sessionStorage.lookUpCodeAPL);
                        for(var i=0;i<responseCAA.length;i++)
                          if(responseCAA[i].lookUpCode == $sessionStorage.lookUpCodeAPL)
                            {
                              $sessionStorage.perfixchargeApplicableAt = 	responseCAA[i].lookUpId;
                              $state.go("app.plbUpload");
                              $ionicLoading.hide();
                            }
                      $ionicLoading.hide();
                    }
                 },function (err) {
        //					toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR_OCCURED'));
                    $ionicLoading.hide();
                   })
                  $ionicLoading.hide();
              },function (err) {
  //					toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR_OCCURED'));
                $ionicLoading.hide();
               })
                  $ionicLoading.hide();
          }
          else{
            savePlumber();
          }
            $ionicLoading.hide();
          },function (err) {
            toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR'));
            $ionicLoading.hide();
          })
          }
        }

      var savePlumber = function(){
         $ionicLoading.show({	template: $filter('translate')('LOADING')	});
         RestService.savePlumberLicenseData($sessionStorage.plumberData).then(function(response){
              console.log("plumber response"+JSON.stringify(response))
                if(response.status == "success"){
                 $scope.applictNo = response.applicationId;

                   var alertPopup = $ionicPopup.alert({
                      title: $filter('translate')('PLUMBERLICENSE'),
                      template: $filter('translate')('PLUMBERSAVED')+" - "+$scope.applictNo,
                      buttons : [{
                         text : $filter('translate')('OK'),
                         type : 'button button-block  customBgColor',
                         onTap : function(){
                            $ionicHistory.nextViewOptions({
                            disableBack: true,
                            disableAnimate: true,
                            historyRoot: true
                          });
                            $ionicHistory.clearCache();
                            $ionicHistory.clearHistory();
                            $state.go("app.home");
                         }
                      }]
                    });

                  $scope.feesId = {
                              1 : $scope.COUFlatRate
                            }

                 $ionicLoading.hide();
                }
                else{
                  $ionicLoading.hide();
                }
         },function (err) {
          toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR_OCCURED'));
          $ionicLoading.hide();
        })
      }
        
      var calculateChargers = function(){
         $ionicLoading.show({	template:$filter('translate')('LOADING')	});
              RestService.setdepentparams($scope.orgid,$sessionStorage.serviceCode,$sessionStorage.perfixchargeApplicableAt).then(function (setdependresponse) {
                 $sessionStorage.setDependentResponse = setdependresponse;
                if(setdependresponse.wsStatus == "success"){
                if(!setdependresponse.free){
                  $sessionStorage.TaxType = setdependresponse.responseObj[0].taxType;
                  $sessionStorage.TaxCode = setdependresponse.responseObj[0].taxCode;
                  $sessionStorage.TaxCategory = setdependresponse.responseObj[0].taxCategory;
                  $sessionStorage.TaxSubcategory1 = setdependresponse.responseObj[0].taxSubCategory;
                  $sessionStorage.chargeApplicableAt = setdependresponse.responseObj[0].chargeApplicableAt;

                    var lookUpCode = "TAC";
                    var level = "2";

                      RestService.getHPrefixData(lookUpCode,level,$scope.orgid).then(function (TACresponse) {
                        console.log("TACresponse=="+TACresponse);
                        for(var i=0;i<TACresponse.length;i++)
                          if(TACresponse[i].lookUpCode == $sessionStorage.TaxSubcategory1)
                             {
                              $sessionStorage.TaxSubcategory = 	TACresponse[i].descLangFirst;
                              $ionicLoading.hide();
                             }
                            },function (err){
                            toaster.error($filter('translate')('ERROR'), $filter('translate')('Please try after some time..'));
                            $ionicLoading.hide();
                           })
                  }else{
                     savePlumber();
                  }

                   $ionicLoading.hide();
              }
              else{
                  toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR'));
                  $ionicLoading.hide();
                }
              },function (err) {
                toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR_OCCURED'));
                $ionicLoading.hide();
              });
         }
 })
