angular.module('starter')

  .controller('propCOdocUploadCTRL', function ($rootScope,$scope, $location, RestService, $ionicLoading, $stateParams, toaster,
		  $filter, ENV, dateFilter, $state, $localStorage,$sessionStorage,$ionicHistory) {

	  console.log("$localStorage.responselogindata---"+JSON.stringify($localStorage.responselogindata));
//		$scope.orgid = $localStorage.responselogindata.orgId;
		$scope.orgid = $localStorage.selectedorgID;
		$scope.userID = $localStorage.responselogindata.userId;
		$scope.loginUSername = $localStorage.responselogindata.firstName;

    $scope.propertyroadSelect;
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


		$scope.subjects = $sessionStorage.checkListMutationData;
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

     function saveMutation(checkListDto){
            $ionicLoading.show({	template: $filter('translate')('LOADING')		});
            RestService.saveMutationData(checkListDto).then(function (response){

              if(response == "" || response == null || response == undefined)
                  {
                    console.log(response);
                    toaster.error("no check list defined");
                    $ionicLoading.hide();
                  }else
                  {
                     console.log("mutable save data"+JSON.stringify(response));
                     $scope.applicationIdGenerated = response.apmApplicationId;
                      var alertPopup = $ionicPopup.alert({
                       title: $filter('translate')('MUTATION'),
                       template: $filter('translate')('MUTATIONSAVED') +$scope.applicationIdGenerated,
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
                  }
                $ionicLoading.hide();

              }, function (err) {
                toaster.error($filter('translate')('ERROR'), $filter('translate')('Please Enter Valid Property Number'));
                $ionicLoading.hide();
              })
          }

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
				 $ionicLoading.show({						template:$filter('translate')('LOADING')					});
         var checkListDto = $sessionStorage.checkListDto;
         checkListDto.docs = $sessionStorage.documentObjectArray;
         RestService.getMutablePropertyCharges(checkListDto).then(function (response){

          if(response == "" || response == null || response == undefined)
              {
                console.log(response);
                toaster.error("no charges defined");
                saveMutation(checkListDto)
                $ionicLoading.hide();
              }else
              {
                 console.log("mutable charges data"+JSON.stringify(response.charges));

                if(response.charges == null || response.charges.length == 0){
                 saveMutation(checkListDto)
               }else{
                 $sessionStorage.mutableCharges = response.charges;
                 $state.go("app.propertyTransferPayment");
               }
              }
            $ionicLoading.hide();

          }, function (err) {
            toaster.error($filter('translate')('ERROR'), $filter('translate')('Please Enter Valid Property Number'));
            $ionicLoading.hide();
          })

      };


		  var _init = function (){

		  }

		  _init();


  })
