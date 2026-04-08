angular.module('starter')
  .controller('noChangeUserDetailCTRL', function ($rootScope,$scope, RestService, $ionicLoading, $stateParams, toaster, $filter, ENV,$ionicHistory,
		  $state,$localStorage,$sessionStorage,$ionicModal,$ionicPopup) {
	$scope.orgid = $localStorage.selectedorgID;
	$scope.userID = $localStorage.responselogindata.userId;
	$scope.loginUSername = $localStorage.responselogindata.firstName;
	$scope.LoginMobileNo = $localStorage.responselogindata.mobileNo;
			$sessionStorage.Lock	= 0;
  		$sessionStorage.TempArray;
  		var arrayListTest	=	new Array();
console.log("User Detail"+JSON.stringify($sessionStorage.validatePropertyDetails));

/*--------BInding owner details------------*/

$scope.ownerShipTypeID = $sessionStorage.validatePropertyDetails.provisionalMas.assOwnerType;
	RestService.getNHPrefixData("OWT",$scope.orgid).then(function (responseOWT){
		if(responseOWT==undefined || responseOWT == null || responseOWT=="")
			{
					$ionicLoading.hide();
					return false;
			}
		else
			{
				for(var i=0;i<responseOWT.length;i++){
					if($scope.ownerShipTypeID == responseOWT[i].lookUpId)
						{
							$scope.ownerShipType = responseOWT[i].descLangFirst;
						}
				}
				$ionicLoading.hide();
		  }
	},function (err) {
//	toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR'));
	  $ionicLoading.hide();
	})

 var ownerDetailsList = $sessionStorage.validatePropertyDetails.provisionalMas.provisionalAssesmentOwnerDtlDtoList;
			 if(ownerDetailsList.length >= 0){
			 	$scope.detailsList = [];
			 	for(var i=0;i<ownerDetailsList.length;i++){
            $scope.detailsList.push({
              ownerName : ownerDetailsList[i].assoOwnerName,
              contactPerson: ownerDetailsList[i].assoGuardianName,
              mobileNumber: ownerDetailsList[i].assoMobileno,
              panNumber : ownerDetailsList[i].assoPanno,
            })
			 	  }
			 }
/*--------BInding proerty address details------------*/
$scope.propertyAddress = $sessionStorage.validatePropertyDetails.provisionalMas.assAddress;
$scope.location = $sessionStorage.validatePropertyDetails.provisionalMas.locationName
$scope.pincode = $sessionStorage.validatePropertyDetails.provisionalMas.assPincode;
$scope.eMail = $sessionStorage.validatePropertyDetails.provisionalMas.assCorrEmail;

/*--------Binding Tax calculation details------------*/
console.log("checkListResponse-->"+JSON.stringify($sessionStorage.checkListResponse));
$scope.taxDetails = [];

var taxdetailList = $sessionStorage.checkListResponse.displayDto;

	for (var i = 0; i < taxdetailList.length; i++) {
		var taxdata = {
				taxdesc : taxdetailList[i].taxDesc,
				arrear : taxdetailList[i].arrearsTaxAmt,
				curtamt :taxdetailList[i].currentYearTaxAmt,
				total :taxdetailList[i].totalTaxAmt
		}
		$scope.taxDetails.push(taxdata);
	}

$scope.totalPayableAmt = $sessionStorage.checkListResponse.provisionalMas.billTotalAmt;

/*--------Binding Document  details------------*/

var taxdetailList = $sessionStorage.checkListResponse.checkList;
console.log("taxdetailList--"+JSON.stringify(taxdetailList));
 $scope.uploadDocument = [];

		for (var i = 0; i < taxdetailList.length; i++) {

			var docdata = {
				    attactID: taxdetailList[i].attachmentId,
		        docID: taxdetailList[i].documentId,
		        docName: taxdetailList[i].documentName,
		        docSerialNo: taxdetailList[i].documentSerialNo,
		        docDescType: taxdetailList[i].descriptionType,
		        docType: taxdetailList[i].documentType,
		        docpath: taxdetailList[i].uploadedDocumentPath,
		        docDescMar: taxdetailList[i].doc_DESC_Mar,
		        docDesceng: taxdetailList[i].doc_DESC_ENGL,
		        docByteCode: taxdetailList[i].documentByteCode,
		        docMandatory: fullmandatory(taxdetailList[i].checkkMANDATORY)
			   }



            if(docdata.docMandatory == "Mandatory"){
              console.log("docdata--"+JSON.stringify(docdata));
              $scope.uploadDocument.push(docdata)
            }
//    			$scope.uploadDocument.push(docdata);
			}

$scope.taxDetail = function(){
  $state.go("app.noChangeTaxdetail");
}


/*-------------IMage Upload function----------------*/

var verfy;
		$scope.imageupload = function(fileObject){

			var reader = new FileReader();
			var idValue	=	fileObject.getAttribute("id");
			verfy  = fileObject.files[0];
			var maxSize = 5000000;
	    var fileSize = verfy.size;
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
		        $rootScope.simpleAlert('File Size Must Not Be Greater Than 5 MB');
		        $ionicLoading.hide();
		        return;
		    }

			reader.onload = function(e){
			console.log("about to encode");
//			$scope.encoded_file = window.btoa(e.target.result.toString());
			$scope.encoded_file = "TESTING";

			for(var k=0;k<taxdetailList.length;k++)
			{
				var documentObject	=
				{
						attachmentId: taxdetailList[k].attachmentId,
						documentId: taxdetailList[k].documentId,
						documentName: null,
						documentSerialNo: taxdetailList[k].documentSerialNo,
						descriptionType: taxdetailList[k].descriptionType,
						documentType: taxdetailList[k].documentType,
						uploadedDocumentPath: taxdetailList[k ].uploadedDocumentPath,
						doc_DESC_Mar: taxdetailList[k].doc_DESC_Mar,
						doc_DESC_ENGL: taxdetailList[k].doc_DESC_ENGL,
						documentByteCode: null,
						checkkMANDATORY: taxdetailList[k].checkkMANDATORY
				};


          if($sessionStorage.Lock== 0)
          {
            if(taxdetailList[k].documentId == idValue)
            {
              documentObject.documentName		=	verfy.name;
              documentObject.documentByteCode	=	$scope.encoded_file;
            }
            arrayListTest.push(documentObject);
            if((k+1)== taxdetailList.length)
            {
              $sessionStorage.Lock = 1;
            }
          }
				else
				{
					 for (var l=0; l <arrayListTest.length; l++) {
					      if (arrayListTest[l].documentId == idValue && taxdetailList[k].documentId == idValue)
					        {
					        	arrayListTest[l].documentName		=	verfy.name;
					        	arrayListTest[l].documentSerialNo 	= 	taxdetailList[k].documentSerialNo;
					        	arrayListTest[l].doc_DESC_Mar 		=	taxdetailList[k].doc_DESC_Mar;
					        	arrayListTest[l].doc_DESC_ENGL 		=	taxdetailList[k].doc_DESC_ENGL;
					        	arrayListTest[l].documentByteCode	=	$scope.encoded_file;
					        	arrayListTest[l].checkkMANDATORY 	= 	taxdetailList[k].checkkMANDATORY;
					        }
					    }
				 }
			}
		    console.log("Final $sessionStorage.TempArray-----"+JSON.stringify(arrayListTest));
		 };
			reader.readAsBinaryString(verfy);
		};


/*------------------*/

$scope.pay = function()
{
$state.go("app.noChangePaymentPage");
//	console.log("arrayListTest---"+JSON.stringify(arrayListTest));
//	if(arrayListTest.length>0)
//	for(var i = 0; i < arrayListTest.length; i++)
//	{
//		if(arrayListTest[i].checkkMANDATORY == "Y")
//		{
//			if(arrayListTest[i].documentByteCode ==	null)
//			{
//				$rootScope.simpleAlert('UploadMandatoryDocuments');
//				return false;
//			}
//			else
//			{
//				$sessionStorage.uploadDocument	=	arrayListTest;
//				$state.go("app.noChangePaymentPage");
//			}
//		}
//	}
//	else
//	{
//		$rootScope.simpleAlert('UploadMandatoryDocuments');
//		return false;
//	}

}



var _init = function (){    };
_init();

});
