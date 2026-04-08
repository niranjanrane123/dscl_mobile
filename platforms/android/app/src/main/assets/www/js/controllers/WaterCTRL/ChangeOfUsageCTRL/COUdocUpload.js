angular.module('starter')

  .controller('COUdocUploadCTRL', function ($rootScope,$scope, $location, RestService, $ionicLoading, $stateParams, toaster,
		  $filter, ENV, dateFilter, $state, $localStorage,$sessionStorage,$ionicHistory,$ionicPopup) {
/*declare start*/

	  var arrayListTest	=	new Array();

	  console.log("$localStorage.responselogindata---"+JSON.stringify($localStorage.responselogindata));
//		$scope.orgid = $localStorage.responselogindata.orgId;
		$scope.orgid = $localStorage.selectedorgID;
		$scope.userID = $localStorage.responselogindata.userId;
		$scope.loginUSername = $localStorage.responselogindata.firstName;
		$scope.LoginMobileNo = $localStorage.responselogindata.mobileNo;

		$sessionStorage.Lock	= 0;
		$sessionStorage.TempArray;

    $scope.newAppInDate = new Date().getTime();
    $scope.applnDate = new Date().getTime();
    $sessionStorage.serviceCode = "WCU";
    $sessionStorage.deptCode = "WT";

	  var coupermisetext;
	  var coutariftext;
	  var actiondetails;
	  $scope.COUpaidamt;

		$scope.subjects;

/*declare end*/


/*new details*/

	  $scope.subjects = $sessionStorage.responsechecklistdata.responseObj;
	  console.log("subjects ::: "+JSON.stringify($scope.subjects));

	  $scope.docsitems = [];

	  var usagedoctable = "";
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
			}

		var verfy;

		$scope.imageupload = function(fileObject){

			var reader = new FileReader();
			var idValue	=	fileObject.getAttribute("id");
			verfy  = fileObject.files[0];

			var maxSize =  1000000;
	    var fileSize = verfy.size;
//	    var filesize = (fileObject.files.length && verfy.size) || '';

	    console.log("fileSize-----"+fileSize);


			var ext = fileObject.value.split('.').pop();
			if(ext){
		    	if(ext == "pdf" || ext == "docx" || ext == "doc" || ext == "jpg"){
		        }
		    	else{
		    	  	fileObject.value = "";
		        	$rootScope.simpleAlert('Onlypdfdoc');
		          $ionicLoading.hide();
		          return;
		    	}
		    }else{
		    	$rootScope.simpleAlert('validdocument');
		    	$ionicLoading.hide();
		    	return;
		    }

		    if(fileSize > maxSize){
		    	fileObject.value = "";
		        $rootScope.simpleAlert('validdocumentSize');
		        $ionicLoading.hide();
		        return;
		    }

			reader.onload = function(e){
			console.log("about to encode");
			$scope.encoded_file = window.btoa(e.target.result.toString());
//			$scope.encoded_file = "TESTING";

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
console.log("$sessionStorage.applmeterread--"+$sessionStorage.applmeterread);
	$sessionStorage.couwrNewRatestartDate= new Date().getTime();
	 $ionicLoading.show({
			template: $filter('translate')('LOADING')
		});
   if($sessionStorage.setDependentResponse.free){
              savedata();
     }else{
           RestService.servicecharge(
             $sessionStorage.serviceCode,
             $sessionStorage.deptCode,
              $sessionStorage.coutariftext,
              $sessionStorage.coupermisetext,
              $sessionStorage.couwrusageSubtype3,
              $sessionStorage.couwrusageSubtype4,
              $sessionStorage.couwrusageSubtype5,
              $sessionStorage.applmeterread,
              $sessionStorage.couwrConnType,
              $sessionStorage.applbplflag,
              $sessionStorage.couwrRoadType,
              $sessionStorage.couwrtransferMode,
              $sessionStorage.couwrDisConnType,
              $sessionStorage.couwrfactor1,
              $sessionStorage.couwrfactor2,
              $sessionStorage.couwrfactor3,
              $sessionStorage.couwrfactor4,
              $sessionStorage.couTaxType,
              $sessionStorage.couTaxCode,
              $sessionStorage.couTaxCategory,
              $sessionStorage.couTaxSubcategory,
              $sessionStorage.chargeApplicableAt,
              $sessionStorage.couwrConnSize,
              $sessionStorage.couwrNewRatestartDate,
               $scope.orgid,"Application Charge").then(function (responseservicechargedata) {
    //		alert("responseservicechargedata.wsStatus--"+responseservicechargedata.wsStatus)
        if(responseservicechargedata.wsStatus == "success"){

          $sessionStorage.responseservicechargedata = responseservicechargedata;

          $scope.COUFlatRate = responseservicechargedata.responseObj[0].flatRate;

          RestService.getPayOpt($scope.orgid,$scope.userID).then(function (response) {
            console.log("dash==="+response);
            if(response.status =="success"){
              $sessionStorage.Bankresponse = response;
              $ionicLoading.hide();
              $state.go("app.COUpay");
            }else{
              return false;
            }
            $ionicLoading.hide();
          }, function (err) {
            $ionicLoading.hide();
          })
            $ionicLoading.hide();
          }
          else{
              toaster.error($filter('translate')('ERROR'), $filter('translate')(''));
            }
          },function (err) {
        //			alert("Problem occurred while processing to find Checklist");
              toaster.error($filter('translate')('ERROR'), $filter('translate')(''));
              $ionicLoading.hide();
          })
      }
	  };


var _init = function ()
{
//alert("$sessionStorage.perfixchargeApplicableAt--"+$sessionStorage.perfixchargeApplicableAt);
 $ionicLoading.show({	template:$filter('translate')('LOADING')	});
	  RestService.setdepentparams($scope.orgid,$sessionStorage.serviceCode,$sessionStorage.perfixchargeApplicableAt).then(function (setdependresponse){
			  console.log("setdependresponse=="+JSON.stringify(setdependresponse));
        $sessionStorage.setDependentResponse = setdependresponse;
			  if(setdependresponse.wsStatus == "success"){
           if(!setdependresponse.free){
              $sessionStorage.couTaxType = setdependresponse.responseObj[0].taxType;
              $sessionStorage.couTaxCode = setdependresponse.responseObj[0].taxCode;
              $sessionStorage.couTaxCategory = setdependresponse.responseObj[0].taxCategory;
              $sessionStorage.couTaxSubcategory1 = setdependresponse.responseObj[0].taxSubCategory;
              $sessionStorage.chargeApplicableAt = setdependresponse.responseObj[0].chargeApplicableAt;
            var lookUpCode = "TAC";
            var level = "2";
            RestService.getHPrefixData(lookUpCode,level,$scope.orgid).then(function (TACresponse) {
              console.log("TACresponse--"+TACresponse);

                for(var i=0;i<TACresponse.length;i++){
                  if(TACresponse[i].lookUpCode ==  $sessionStorage.couTaxSubcategory1)
                  {
                     $sessionStorage.couTaxSubcategory = 	TACresponse[i].descLangFirst;
  //					    		 $state.go("app.COUuploaddoc");
                     $ionicLoading.hide();
                  }
              }
            },function (err){
               toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR'));
                $ionicLoading.hide();
          })
				}
		  }
				else{
						toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR'));
						$ionicLoading.hide();
					}$ionicLoading.hide();
			},function (err) {
					  toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR'));
						$ionicLoading.hide();
			})
}

_init();

      var savedata = function(){
      /*	if ($scope.COUFlatRate <= $scope.COUpaidamt) {
      			alert("Paid Amount Should Not Be Greater Then Total Amount");
      			return false;
      		}
      		else {	*/
      			$ionicLoading.show({
      				template: $filter('translate')('LOADING')
      			});
      			RestService.COUsaveservice($sessionStorage.applFName,$sessionStorage.applMname,$sessionStorage.applLname,$sessionStorage.applmobileno,$sessionStorage.appltitle,
      				$sessionStorage.appladdress,$scope.COUpaidamt,$sessionStorage.csidn,$sessionStorage.applRoadname,$sessionStorage.connNo,$sessionStorage.applConnsize,
      				$sessionStorage.COURemarks,$sessionStorage.COUtarifCate,$sessionStorage.COUpermiseType,$sessionStorage.newCOUtarifnew,
      				$sessionStorage.newCOUpermise,$scope.orgid,$scope.userID,$sessionStorage.documentObjectArray,$sessionStorage.applbplflag,
      				$sessionStorage.couwrNewRatestartDate,$sessionStorage.macAddress).then(function(COUresponse){
      					  console.log("COUresponse=="+JSON.stringify(COUresponse));
      					  if(COUresponse.status == "success"){
      						 $scope.applictNo = COUresponse.applicationNo;

                     var alertPopup = $ionicPopup.alert({
                        title: $filter('translate')('CHANGEOFUSAGE'),
                        template: $filter('translate')('CHANGEOFSAVED') +$scope.applictNo,
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


      						 $ionicLoading.show({
      								template: $filter('translate')('LOADING')
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
      //			  }
      		};

  })
