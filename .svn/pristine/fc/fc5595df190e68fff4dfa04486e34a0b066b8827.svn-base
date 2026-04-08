angular.module('starter')

  .controller('COdocUploadCTRL', function ($rootScope,$scope, $location, RestService, $ionicLoading, $stateParams, toaster,
		  $filter, ENV, dateFilter, $state, $localStorage,$sessionStorage) {

	  console.log("$localStorage.responselogindata---"+JSON.stringify($localStorage.responselogindata));
//		$scope.orgid = $localStorage.responselogindata.orgId;
		$scope.orgid = $localStorage.selectedorgID;
		$scope.userID = $localStorage.responselogindata.userId;
		$scope.loginUSername = $localStorage.responselogindata.firstName;
    $localStorage.langID = "1";
    $scope.ServiceShortName = "WCO";
    $sessionStorage.lookUpCodeAPL = "APL";
	  $sessionStorage.serviceCode = "WCO";
	  $sessionStorage.deptCode = "WT";
	  var arrayListTest	=	new Array();
	  $sessionStorage.Lock	= 0;
	  $sessionStorage.TempArray;

	  $scope.usageSubtype3;
	  $scope.usageSubtype4;
	  $scope.usageSubtype5;
	  $scope.isOutStandingPending;
	  $scope.isExistingConnectionOrConsumerNo
	  $scope.isExistingProperty;
	  $scope.disConnectionType;
	  $scope.factor1;
	  $scope.factor2;
	  $scope.factor3;
	  $scope.factor4;

	  /*water rate master*/
	  	$scope.wrorgId;
		$scope.wrusageSubtype1;
		$scope.wrusageSubtype2;
		$scope.wrusageSubtype3;
		$scope.wrusageSubtype4;
		$scope.wrusageSubtype5;
		$scope.wrfactor1;
		$scope.wrfactor2;
		$scope.wrfactor3;
		$scope.wrfactor4;
		$scope.wrisBPL;
		$scope.wrServiceCode;
		$scope.wrDeptCode;
		$scope.wrTaxType;
		$scope.wrTaxCode;
		$scope.wrTaxCate;
		$scope.wrTaxSubCate;
		$scope.wrMeterType;
		$scope.wrChargeAppl;
		$scope.wrConnSize;
		$scope.wrConnType;
		$scope.wrRoadType;
		$scope.wrtransferMode;
		$scope.wrDisConnType;
		$scope.wrRatestartDate;
		$scope.wrNewRatestartDate;
		$scope.WNCConnSize;
		$scope.TaxType;
		$scope.TaxCode;
		$scope.TaxCategory;
		$scope.TaxSubcategory;
		$scope.FlatRate;
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


		$scope.subjects = $sessionStorage.responsechecklistdata.responseObj;
					  console.log("subjects ::: "+JSON.stringify($scope.subjects));
//					  alert("subjects ::: "+JSON.stringify($scope.subjects));

					  $scope.docsitems = [];
					  /*var tempvar = '<tr>'+
//						'<th class="head" width="100%" colspan="2"><div align="center">Upload Document</div></th>'+
						'<th style="width: 40%;">Sr.No</th>'+
						'<th>DocID</th>'+
						'<th>Description</th>'+
						'<th>Mandatory</th>'+
						'<th>Upload Doc</th>'+
						'</tr>';*/
					  var ownerdoctable = "";
						for (var i = 0; i < $scope.subjects.length; i++) {

							var docdata = {
							    attactID: $scope.subjects[i].attachmentId,
					            docID: $scope.subjects[i].documentId,
					            docName: $scope.subjects[i].documentName,
					            docSerialNo: $scope.subjects[i].documentSerialNo,
					            docDescType: $scope.subjects[i].descriptionType,
					            docType: $scope.subjects[i].documentType,
					            docDescMar: $scope.subjects[i].doc_DESC_Mar,
					            docDesceng: $scope.subjects[i].doc_DESC_ENGL,
					            docByteCode: $scope.subjects[i].documentByteCode,
					            docMandatory: fullmandatory($scope.subjects[i].checkkMANDATORY)
							   }
							$scope.docsitems.push(docdata);
//							alert("docdata-->"+JSON.stringify(docdata));
						/*tempvar = tempvar +
						'<tr id="'+$scope.subjects[i].documentId+'">'+
						'<td><span>'+$scope.subjects[i].documentSerialNo+'</span></td>'+
						'<td><span>'+$scope.subjects[i].documentId+'</span></td>'+
						'<td><span>'+$scope.subjects[i].doc_DESC_ENGL+'</span></td>'+
						'<td><span>'+fullmandatory($scope.subjects[i].checkkMANDATORY)+'</span></td>'+
						'<td><input type="file" class="filecss " id="'+ $scope.subjects[i].documentId +'" ng-model="COUdocupload" onchange="angular.element(this).scope().imageupload(this)"/></td>'+
						'</tr>';*/
					 }


var verfy;

$scope.imageupload = function(fileObject){
	var reader = new FileReader();
	var idValue	=	fileObject.getAttribute("id");
	verfy  = fileObject.files[0];
	var maxSize = 1000000;
    var fileSize = verfy.size;

	var ext = fileObject.value.split('.').pop();
	/*if(ext){
    	if(ext == "pdf" || ext == "docx" || ext == "doc"){
        }
    	else{
    		fileObject.value = "";
        	$rootScope.simpleAlert('Onlypdfdoc');
            $('#iDivBusyLoad').hide();
            return;
    	}
    }else{
    	$rootScope.simpleAlert('validdocument');
    	$('#iDivBusyLoad').hide();
    	return;
    }
    if(fileSize > maxSize){
    	fileObject.value = "";
        $rootScope.simpleAlert('validdocumentSize');
        $('#iDivBusyLoad').hide();
        return;
    }*/
		reader.onload = function(e){
		console.log("about to encode");
		$scope.encoded_file = window.btoa(e.target.result.toString());
//		$scope.encoded_file = "REUKGFGFBFJLF";

		for(var k=0;k<$scope.subjects.length;k++)
		{
			var documentObject	=
			{
					attachmentId: $scope.subjects[k].attachmentId,
					documentId: $scope.subjects[k].documentId,
					documentName: null,
					documentSerialNo: $scope.subjects[k].documentSerialNo,
					descriptionType: $scope.subjects[k].descriptionType,
					documentType: $scope.subjects[k].documentType,
					doc_DESC_Mar: $scope.subjects[k].doc_DESC_Mar,
					doc_DESC_ENGL: $scope.subjects[k].doc_DESC_ENGL,
					documentByteCode: null,
					checkkMANDATORY: $scope.subjects[k].checkkMANDATORY
	     };
			if($sessionStorage.Lock== 0)
			{
				if($scope.subjects[k].documentId == idValue)
				{
					documentObject.documentName		=	verfy.name;
					documentObject.documentByteCode	=	$scope.encoded_file;
				}
				arrayListTest.push(documentObject);
				if((k+1)==$scope.subjects.length)
				{
					$sessionStorage.Lock = 1;
				}
			}
			else
			{
				 for (var l=0; l <arrayListTest.length; l++) {
				        if (arrayListTest[l].documentId == idValue && $scope.subjects[k].documentId == idValue)
				        {
				        	arrayListTest[l].documentName		=	verfy.name;
				        	arrayListTest[l].documentSerialNo 	= 	$scope.subjects[k].documentSerialNo;
				        	arrayListTest[l].doc_DESC_Mar 		=	$scope.subjects[k].doc_DESC_Mar;
				        	arrayListTest[l].doc_DESC_ENGL 		=	$scope.subjects[k].doc_DESC_ENGL;
				        	arrayListTest[l].documentByteCode	=	$scope.encoded_file;
				        	arrayListTest[l].checkkMANDATORY 	= 	$scope.subjects[k].checkkMANDATORY;

				        }
				    }
			}
		}
		console.log("Final $sessionStorage.TempArray-----"+JSON.stringify(arrayListTest));
	 };
	reader.readAsBinaryString(verfy);
};


 $scope.uploaddocuments = function() {

	console.log("arrayListTest---"+JSON.stringify(arrayListTest));
		if(arrayListTest.length>0)
		for(var i = 0; i < arrayListTest.length; i++)
		{
			if(arrayListTest[i].checkkMANDATORY == "Y")
			{
				if(arrayListTest[i].documentByteCode ==	null)
				{
					$rootScope.simpleAlert('UploadMandatoryDocuments');
					return false;
				}
				else
				{
					$sessionStorage.documentObjectArray	=	arrayListTest;
				}
			}
		}
		else
		{
			$rootScope.simpleAlert('UploadMandatoryDocuments');
			return false;
		}
	$scope.couwrNewRatestartDate= new Date().getTime();
				 $ionicLoading.show({						template: $filter('translate')('LOADING')				});
//				 console.log("documentObjectArray---"+JSON.stringify($sessionStorage.documentObjectArray));
/*	 RestService.COSservicecharge($sessionStorage.TFMtext,$sessionStorage.costariftext,$sessionStorage.cospermisetext,$sessionStorage.wrusageSubtype3,$sessionStorage.wrusageSubtype4,$sessionStorage.wrusageSubtype5,
			 $sessionStorage.wrConnType,$sessionStorage.wrRoadType,$sessionStorage.wrDisConnType,$sessionStorage.wrfactor1,$sessionStorage.wrfactor2,$sessionStorage.wrfactor3,$sessionStorage.wrfactor4,
			 $sessionStorage.TaxType,$sessionStorage.TaxCode,$sessionStorage.TaxCategory,$sessionStorage.TaxSubcategory,
			 $scope.couwrNewRatestartDate,$sessionStorage.cosconnsizetext,$scope.orgid).then(function (responseservicechargedata) {*/


				    RestService.servicecharge($sessionStorage.serviceCode,
				    	$sessionStorage.deptCode,
						  $sessionStorage.costariftext,
						  $sessionStorage.cospermisetext,
						  $sessionStorage.wrusageSubtype3,
						  $sessionStorage.wrusageSubtype4,
						  $sessionStorage.wrusageSubtype5,
						  $sessionStorage.applmeterread,
						  $sessionStorage.wrConnType,
						  $sessionStorage.wrisBPL,
						  $sessionStorage.wrRoadType,
						  $sessionStorage.TFMtext,
						  $sessionStorage.wrDisConnType,
						  $sessionStorage.wrfactor1,
						  $sessionStorage.wrfactor2,
						  $sessionStorage.wrfactor3,
						  $sessionStorage.wrfactor4,
						  $sessionStorage.TaxType,
						  $sessionStorage.TaxCode,
						  $sessionStorage.TaxCategory,
						  $sessionStorage.TaxSubcategory,
						  $sessionStorage.chargeApplicableAt,
						  $sessionStorage.oldCOUconnSize,
						  $scope.couwrNewRatestartDate,$scope.orgid,"Application Charge")
						 .then(function (responseservicechargedata){
				 console.log("responseservicechargedata.wsStatus-"+ JSON.stringify(responseservicechargedata));
				 if(responseservicechargedata.wsStatus == "success"){

					$sessionStorage.responseservicechargedata = responseservicechargedata;
					 $state.go("app.COpay");

						 $ionicLoading.hide();
						}
						else{
								toaster.error($filter('translate')('ERROR'), $filter('translate')(''));
							}
					},function (err) {
						toaster.error($filter('translate')('ERROR'), $filter('translate')(''));
						$ionicLoading.hide();
					})
		  };


		  var _init = function (){
        RestService.getServiceId($scope.orgid,"WCO").then(function (response){
          console.log("response"+ response)
          $scope.serviceID = response;
        }, function (err) {	$ionicLoading.hide();	})

		  $ionicLoading.show({template: $filter('translate')('LOADING')					});
      	RestService.setdepentparams($scope.orgid,$sessionStorage.serviceCode,$sessionStorage.perfixchargeApplicableAt).then(function (setdependresponse){
      			  console.log("setdependresponse=="+JSON.stringify(setdependresponse));
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

      					    			RestService.getPayOpt($scope.orgid,$scope.userID).then(function (response) {
                        					console.log("bankresponse--->"+response);
                        					$sessionStorage.Bankresponse = response;
                        				$ionicLoading.hide();
                        					}, function (err) {	$ionicLoading.hide();	})
//      					    		$state.go("app.COuploaddoc");
      					    		$ionicLoading.hide();
      					    }
      					},function (err){
      						 toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR'));
      							$ionicLoading.hide();
      				})
             $ionicLoading.hide();
             }else{
              savedata();
             }
      		  }
      		else{
      				toaster.error($filter('translate')('ERROR'), $filter('translate')(''));
      			}$ionicLoading.hide();
      		  },function (err) {
      			  toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR'));
      				$ionicLoading.hide();
      			})

				RestService.getPayOpt($scope.orgid,$scope.userID).then(function (response) {
					console.log("bankresponse--->"+response);
					$sessionStorage.Bankresponse = response;
				$ionicLoading.hide();
					}, function (err) {	$ionicLoading.hide();	})
		  }

		  _init();
    var savedata = function() {
        $ionicLoading.show({
          template: $filter('translate')('LOADING')
          });

      var applicantinfo = {
          organizationName:null,
          applicantFirstName:$localStorage.responselogindata.firstName,
          applicantMiddleName:$localStorage.responselogindata.middleName,
          applicantLastName:$localStorage.responselogindata.lastName,
          gender:$localStorage.responselogindata.gender,
          mobileNo:$localStorage.responselogindata.mobileNo,
          emailId:$localStorage.responselogindata.emailId,
          pinCode:"",
          buildingName:"",
          roadName:"",
          applicantTitle:$localStorage.responselogindata.titleId,
      //	  applicantTitle:$sessionStorage.title,
          areaName:"",
          blockName:"",
          housingComplexName:null,
          wing:null,
          floorNo:null,
          phone1:null,
          phone2:null,
          contactPersonName:null,
          villageTownSub:"",
          cfcCitizenId:null,
          povertyLine:null,
          orgId:$localStorage.responselogindata.orgId,
          langId:1,
          userId:$localStorage.responselogindata.userId,
          bplNo:$sessionStorage.wrisBPLno,
          flatBuildingNo:"",
          codTryId1:null,
          codTryId2:null,
          codTryId3:null,
          codTryId4:null,
          codTryId5:null,
          aadharNo:"",
          dwzid1:0,
          dwzid2:0,
          dwzid3:null,
          dwzid4:null,
          dwzid5:null,
          isBPL:"N"
      }

  	RestService.changeofownersaveservice($sessionStorage.WNCselecttitle,$sessionStorage.WNCFirstname,$sessionStorage.WNCMiddlename,$sessionStorage.WNCLastname,
  		$sessionStorage.COURemarks,$sessionStorage.changeowner,$sessionStorage.WNCgender,$sessionStorage.oldCOWconnName,$sessionStorage.oldtitle,$sessionStorage.oldconnNo,$sessionStorage.CSidn,
  		$sessionStorage.oldCOUconnSize,$sessionStorage.oldcodDwzid1,$sessionStorage.oldcodDwzid2,$sessionStorage.oldCOUtarifCate,$sessionStorage.oldCOUpermiseType,
  		$sessionStorage.oldCOUmetertype,$sessionStorage.oldCOUapplicantType,$sessionStorage.newtransfermode,$sessionStorage.documentObjectArray,
  		$scope.orgid,$scope.userID,applicantinfo,$sessionStorage.canApplyOrNot,$localStorage.macAddress)
  		.then(function(COWresponse){
  			console.log("COWresponse.status--->"+COWresponse);
  			if(COWresponse.status == "success"){
  				$scope.applictNo = COWresponse.applicationNo;
  					$ionicLoading.show({	template:$filter('translate')('LOADING')});

            $scope.feesId = {
              1 : $scope.COSFlatRate
            }

  						$ionicLoading.hide();
  				}
  			 else{
  					$rootScope.simpleAlert("Your Application for Change of Ownership has been Not Saved.");
  					$ionicLoading.hide();
  				}
  			},function (err) {
  				toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR'));
  				$ionicLoading.hide();
  			})
  //		}
   };

  })
