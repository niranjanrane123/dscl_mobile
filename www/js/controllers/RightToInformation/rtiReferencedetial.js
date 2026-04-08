angular.module('starter')
  .controller('rtiReferenceCtrl', function ($rootScope,$scope, RestService, $ionicLoading, $stateParams, toaster, $filter, ENV,$ionicHistory,
  $rootScope,$state, $localStorage,$sessionStorage,$ionicModal,$ionicPopup) {
  console.log("$localStorage.LoginData---"+JSON.stringify($localStorage.responselogindata));
  var StampList	= new Array();
  $scope.reference = {};
  $sessionStorage.usageSubtype1;
  $sessionStorage.usageSubtype2;
  $sessionStorage.usageSubtype3;
  $sessionStorage.usageSubtype4;
  $sessionStorage.usageSubtype5;
  $sessionStorage.factor1;
  $sessionStorage.factor2;
  $sessionStorage.factor3;
  $sessionStorage.factor4;
  $sessionStorage.isBPL = $localStorage.belowPovertycheck;
  $sessionStorage.noOfDays;
  $sessionStorage.serviceCode;
  $sessionStorage.deptCode;
  $sessionStorage.financialYear;
  $sessionStorage.ruleId;
  $sessionStorage.taxType;
  $sessionStorage.taxCode;
  $sessionStorage.taxCategory;
  $sessionStorage.taxSubCategory;
  $sessionStorage.consumption;
  $sessionStorage.meterType;
  $sessionStorage.gapCode;
  $sessionStorage.dependsOnFactor;
  $sessionStorage.chargeApplicableAt;
  $sessionStorage.slab1;
  $sessionStorage.slab2;
  $sessionStorage.slab3;
  $sessionStorage.slab4;
  $sessionStorage.mediaType;
  $sessionStorage.slabRate1;
  $sessionStorage.slabRate2;
  $sessionStorage.slabRate3;
  $sessionStorage.slabRate4;
  $sessionStorage.slabRate5;
  $sessionStorage.flatRate;
  $sessionStorage.percentageRate;
  $sessionStorage.chargeAmount;
  $sessionStorage.noOfCopies;

  $sessionStorage.taxId;
  $sessionStorage.chargeApplicableAt;


   $scope.referenceMode = null
   $scope.inWardType = null
   $scope.authorityName = null
   $scope.reqApplication = null
   $scope.address = null
   $scope.referenceNo = null
   $scope.date = null
   $scope.stampNo = null
   $scope.stampAmount = null
   StampList = null;
   var dtToday = new Date();
     var month = dtToday.getMonth() + 1;
     var day = dtToday.getDate();
     var year = dtToday.getFullYear();

     if(month < 10)
         month = '0' + month
     if(day < 10)
         day = '0' + day

     $scope.maxDate = new Date();
     console.log('fghj'+ $scope.maxDate)
  $scope.orgid = $localStorage.selectedorgID;
  var referenceresponse;
  $scope.formE = false;
  $scope.formE = false;
  $scope.stamp = false;
  $sessionStorage.serviceCode = "RAF";
  $sessionStorage.deptCode = "RTI";
  $scope.referenceDetails = {};
  $sessionStorage.direct = false;
  $scope.referenceModeChange = function()
 {
   $scope.$watch('referenceMode', function(newVal) {
     for(i=0; i<referenceresponse.length; i++){
          if(referenceresponse[i].lookUpId == $scope.referenceMode){
              $scope.referencelookupCode = referenceresponse[i].lookUpCode;
             // alert("referencelookupCode---"+$scope.referencelookupCode);
              if($scope.referencelookupCode == "E"){
                   $sessionStorage.direct = false;
                   $scope.formE = true;
                   $scope.stamp = false;
                   $sessionStorage.responseservicechargedata    = "";
                   $sessionStorage.free = true;
                   $scope.getNonHDatanew1("RIT","inwardTypeoptions",$scope.orgid);
               }
             if($scope.referencelookupCode == "S"){
                    $sessionStorage.direct = false;
                    $scope.stamp = true;
                    $scope.formE = false;
                    $sessionStorage.responseservicechargedata  = "";
                    $scope.getNonHDatanew1("RIT","inwardTypeoptions",$scope.orgid);
                    $sessionStorage.free = true;
              }
             if($scope.referencelookupCode == "D"){
                    $sessionStorage.direct = true;
                    $scope.stamp = false;
                    $scope.formE = false;
                    $scope.getNonHDatanew1("RIT","inwardTypeoptions",$scope.orgid);
                    if(!$sessionStorage.free && $localStorage.applicantDetails.povertyLineValue == "N"){
                    getRtiApplicationCharges();
                   }else{
                     $sessionStorage.free = true;
                   }
              }
            }
        }
     });
  }
       var getRtiApplicationCharges = function(){
        var chargeData =  {
          modelName:null,
            dataModel:[
              {orgId:$localStorage.applicantDetails.org,usageSubtype1:$sessionStorage.usageSubtype1,
              usageSubtype2:$sessionStorage.usageSubtype2,usageSubtype3:$sessionStorage.usageSubtype3,
              usageSubtype4:$sessionStorage.usageSubtype4,usageSubtype5:$sessionStorage.usageSubtype5,
              factor1:$sessionStorage.factor1,factor2:$sessionStorage.factor2,factor3:$sessionStorage.factor3,
              factor4:$sessionStorage.factor4,isBPL:$localStorage.applicantDetails.povertyLineValue,noOfDays:$sessionStorage.noOfDays,
              serviceCode:$sessionStorage.serviceCode,deptCode:$sessionStorage.deptCode,
              financialYear:$sessionStorage.financialYear,ruleId:$sessionStorage.ruleId,
              taxType:$sessionStorage.taxType,taxCode:$sessionStorage.taxCode,
              taxCategory:$sessionStorage.taxCategory,
              taxSubCategory:$sessionStorage.taxSubCategory,
              rateStartDate:new Date().getTime(),chargeApplicableAt:$sessionStorage.chargeApplicableAt,
              mediaType:$sessionStorage.mediaType,slab1:$sessionStorage.slab1,slab2:$sessionStorage.slab2,
              slab3:$sessionStorage.slab3,slab4:$sessionStorage.slab4,
              slabRate1:$sessionStorage.slabRate1,slabRate2:$sessionStorage.slabRate2,slabRate3:$sessionStorage.slabRate3,
              slabRate4:$sessionStorage.slabRate4,
              flatRate:$sessionStorage.flatRate,percentageRate:$sessionStorage.percentageRate,chargeAmount:$sessionStorage.chargeAmount,
              freeCopy:0.0,quantity:0.0,taxId:$sessionStorage.taxId}
              ]
            }
           // $scope.feesids = [];
           $scope.obj = {};
        $scope.couwrNewRatestartDate= new Date().getTime();
        RestService.servicechargeRti(chargeData).then(function (responseservicechargedata){
         console.log("responseservicechargedata-"+ JSON.stringify(responseservicechargedata));
         if(responseservicechargedata.wsStatus == "success"){
            $sessionStorage.responseservicechargedata = responseservicechargedata;
            for(var j=0 ; j< responseservicechargedata.responseObj.length; j++){
              $scope.obj[responseservicechargedata.responseObj[j].taxId] = responseservicechargedata.responseObj[j].chargeAmount;
              //  $scope.feesids.push(obj)
            }
              $sessionStorage.feesids = $scope.obj;
              // alert($sessionStorage.feesids);
              // $state.go("app.COpay");
              $ionicLoading.hide();
            }
            else{
                toaster.error($filter('translate')('NOCHARGES'), $filter('translate')(''));
              }
          },function (err) {
            toaster.error($filter('translate')('RTIAPIERROR')/* , $filter('translate')('') */);
            $ionicLoading.hide();
          })
       }
       $scope.imageupload = function(fileObject){
          	var reader = new FileReader();
          	var idValue	=	fileObject.getAttribute("id");
          	verfy  = fileObject.files[0];
          	var maxSize = 1000000;
            var fileSize = verfy.size;

          	var ext = fileObject.value.split('.').pop();
          	if(ext){
              	if(ext == "jpg" || ext == "pdf" || ext == "doc" || ext == "docx" || ext == "bmp"){
                  }
              	else{
              		fileObject.value = "";
                  	$rootScope.simpleAlert('Onlyjpgpdfdoc');
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
              }
          		reader.onload = function(e){
          		console.log("about to encode");
          		$scope.encoded_file = window.btoa(e.target.result.toString());
          //		$scope.encoded_file = "REUKGFGFBFJLF";


          			var documentObject	=
          		  	{
          					attachmentId: null,
          					documentId: null,
          					documentName: "sample",
          					documentSerialNo: null,
          					descriptionType: null,
          					documentType: null,
          					doc_DESC_Mar: null,
          					doc_DESC_ENGL: null,
          					documentByteCode: $scope.encoded_file,
          					checkkMANDATORY: "Y"
          	      };
                  if(verfy.name)
                  documentObject.documentName   = verfy.name;

                //if(StampList==null)
                //  StampList=[];

                //StampList.push(documentObject);
          		console.log("Final $sessionStorage.TempArray-----"+JSON.stringify(StampList));
          	 };
          	reader.readAsBinaryString(verfy);
          };



      $scope.getNonHDatanew1 = function(lookUpCode,dropdown,orgId){
      if($scope.stamp){
       RestService.getNHPrefixData(lookUpCode,orgId)
              .then(function(response){
                if(response.length > 0){
                  if(lookUpCode == "PAY"){
                    var listResponse = response;
                    console.log("lookUpCode: "+lookUpCode+"|listResponse: "+JSON.stringify(listResponse));
                    $rootScope[dropdown] = new Array();
                    for(var i=0;i<listResponse.length;i++){
                      if(listResponse[i].otherField == 'Y'){
                        $rootScope[dropdown].push({
                          id: listResponse[i].lookUpId,
                          value : listResponse[i].lookUpCode,
                          name : listResponse[i].descLangFirst
                        })
                      }
                    }
                  }
                  else{
                    var listResponse = response;
                    console.log("lookUpCode: "+lookUpCode+"|listResponse: "+JSON.stringify(listResponse));
                    $rootScope[dropdown] = new Array();
                    for(var i=0;i<listResponse.length;i++){
                    if(listResponse[i].lookUpCode=="O"){
                      $scope.inWardType = listResponse[i].lookUpId;
                     
                       if($localStorage.langNewId == "2"){
                         $rootScope[dropdown].push({
                           value : listResponse[i].lookUpId,
                           name : listResponse[i].descLangSecond
                         })
                      }else{
                        $rootScope[dropdown].push({
                          value : listResponse[i].lookUpId,
                          name : listResponse[i].descLangFirst
                        })
                        }
                    }
                        

                    }


                  }
                  $ionicLoading.hide();
                }
                else {
                  $ionicLoading.hide();
                  toaster.error($filter('translate')('RTIAPIERROR')/* , $filter('translate')('ERROR_OCCURED') */);
                  return [];
                }
              },function(err){
                toaster.error($filter('translate')('RTIAPIERROR')/* , $filter('translate')('ERROR_OCCURED') */);
                $ionicLoading.hide();
                return [];
              })
      }else{
      $scope.inWardType = null;
       RestService.getNHPrefixData(lookUpCode,orgId)
              .then(function(response){
                if(response.length > 0){
                  if(lookUpCode == "PAY"){
                    var listResponse = response;
                    console.log("lookUpCode: "+lookUpCode+"|listResponse: "+JSON.stringify(listResponse));
                    $rootScope[dropdown] = new Array();
                    for(var i=0;i<listResponse.length;i++){
                      if(listResponse[i].otherField == 'Y'){
                        $rootScope[dropdown].push({
                          id: listResponse[i].lookUpId,
                          value : listResponse[i].lookUpCode,
                          name : listResponse[i].descLangFirst
                        })
                      }
                    }
                  }
                  else{
                    var listResponse = response;
                    console.log("lookUpCode: "+lookUpCode+"|listResponse: "+JSON.stringify(listResponse));
                    $rootScope[dropdown] = [];
                    for(var i=0;i<listResponse.length;i++){
                    if($localStorage.langNewId == "2"){
                    $rootScope[dropdown].push({
                         value : listResponse[i].lookUpId,
                         name : listResponse[i].descLangSecond
                       })
                    }else{
                      $rootScope[dropdown].push({
                        value : listResponse[i].lookUpId,
                        name : listResponse[i].descLangFirst
                      })
                      }
                    }
                  }
                  // set default value for the dropdown Inward Type "Online"
                   // set default value for Reference Mode "Direct"
                  $scope.inWardType = 5825;
                  $scope.referenceMode = 5818;
                  $ionicLoading.hide();
                }
                else {
                  $ionicLoading.hide();
                  toaster.error($filter('translate')('RTIAPIERROR')/* , $filter('translate')('ERROR_OCCURED') */);
                  return [];
                }
              },function(err){
                toaster.error($filter('translate')('RTIAPIERROR')/* , $filter('translate')('ERROR_OCCURED') */);
                $ionicLoading.hide();
                return [];
              })
       }

      }

  $scope.next = function(){
  if($scope.referencelookupCode == 'S'){
    if($scope.encoded_file == undefined){
       $rootScope.simpleAlert($filter('translate')('UPLOADFILES'))
       return false;
    }
  }
   $scope.reference.referenceMode = $scope.referenceMode;
   $scope.reference.inWardType = $scope.inWardType;
   $scope.reference.authorityName = $scope.authorityName;
   $scope.reference.reqApplication = $scope.reqApplication;
   $scope.reference.address = $scope.address;
   $scope.reference.referenceNo = $scope.referenceNo;
   $scope.reference.date = $scope.date;
   if(document.getElementById("stampId")){
    $scope.reference.stampNo = document.getElementById("stampId").value;
   }
  if(document.getElementById("stampAmm")){
      $scope.reference.stampAmount = document.getElementById("stampAmm").value;
  }
   $scope.reference.encoded_file = StampList;
   $sessionStorage.referenceDetails = $scope.reference;
   console.log("referenceDetails",JSON.stringify($scope.reference));
   $state.go("app.rtiInformation");
   }

  var _init = function (){
    $ionicLoading.show({ template: ''});

    RestService.getNHPrefixData("RRM",$scope.orgid).then(function (response){
      console.log("refernec Mode- response--"+JSON.stringify(response));
    	 $scope.refernecModeOptions = new Array();
    	 referenceresponse = response;
    	  	for(var i=0;i<referenceresponse.length;i++){
    	  	if($localStorage.langNewId == "2"){
    	  	  $scope.refernecModeOptions.push({
                  id : referenceresponse[i].lookUpId,
                  name : referenceresponse[i].descLangSecond
                })
    	  	}else{
    	  	  $scope.refernecModeOptions.push({
                   id : referenceresponse[i].lookUpId,
                   name : referenceresponse[i].descLangFirst
                })
    	  	}

    	  	}
    	  		 $ionicLoading.hide();
        },
        function (err) {
          toaster.error($filter('translate')('RTIAPIERROR')/* , $filter('translate')('ERROR') */);
          $ionicLoading.hide();
        })

      $scope.getNonHDatanew1("RIT","inwardTypeoptions",$scope.orgid);
      	RestService.setdepentparamsforrti($localStorage.applicantDetails.org,$sessionStorage.serviceCode,$sessionStorage.perfixchargeApplicableAt).
      	then(function (setdependresponse){
            console.log("setdependresponse=="+JSON.stringify(setdependresponse));
            $sessionStorage.responseservicechargedata    = "";
            if(setdependresponse.wsStatus == "success"){
              $sessionStorage.free = setdependresponse.free;
              $sessionStorage.usageSubtype1 = setdependresponse.responseObj[0].usageSubtype1;
              $sessionStorage.usageSubtype2 = setdependresponse.responseObj[0].usageSubtype2;
              $sessionStorage.usageSubtype3 = setdependresponse.responseObj[0].usageSubtype3;
              $sessionStorage.usageSubtype4 = setdependresponse.responseObj[0].usageSubtype4;
              $sessionStorage.usageSubtype5 = setdependresponse.responseObj[0].usageSubtype5;
              $sessionStorage.factor1 = setdependresponse.responseObj[0].factor1;
              $sessionStorage.factor2 = setdependresponse.responseObj[0].factor2;
              $sessionStorage.factor3 = setdependresponse.responseObj[0].factor3;
              $sessionStorage.factor4 = setdependresponse.responseObj[0].factor4;
              $sessionStorage.isBPL = setdependresponse.responseObj[0].isBPL;
              $sessionStorage.noOfDays = setdependresponse.responseObj[0].noOfDays;
              $sessionStorage.serviceCode = setdependresponse.responseObj[0].serviceCode;
              $sessionStorage.financialYear = setdependresponse.responseObj[0].financialYear;
              $sessionStorage.ruleId = setdependresponse.responseObj[0].ruleId;
              $sessionStorage.taxType = setdependresponse.responseObj[0].taxType;
              $sessionStorage.taxCode = setdependresponse.responseObj[0].taxCode;
              $sessionStorage.taxCategory = setdependresponse.responseObj[0].taxCategory;
              $sessionStorage.taxSubCategory = setdependresponse.responseObj[0].taxSubCategory;
              $sessionStorage.consumption = setdependresponse.responseObj[0].consumption;
              $sessionStorage.meterType = setdependresponse.responseObj[0].meterType;
              $sessionStorage.gapCode = setdependresponse.responseObj[0].gapCode;
              $sessionStorage.dependsOnFactor = setdependresponse.responseObj[0].dependsOnFactor;
              $sessionStorage.chargeApplicableAt = setdependresponse.responseObj[0].chargeApplicableAt;
              $sessionStorage.slab1 = setdependresponse.responseObj[0].slab1;
              $sessionStorage.slab2 = setdependresponse.responseObj[0].slab2
              $sessionStorage.slab3 = setdependresponse.responseObj[0].slab3;
              $sessionStorage.slab4 = setdependresponse.responseObj[0].slab4;

              $sessionStorage.slabRate1 = setdependresponse.responseObj[0].slabRate1;
              $sessionStorage.slabRate2 = setdependresponse.responseObj[0].slabRate2;
              $sessionStorage.slabRate3 = setdependresponse.responseObj[0].slabRate3;
              $sessionStorage.slabRate4 = setdependresponse.responseObj[0].slabRate4;
              $sessionStorage.slabRate5 = setdependresponse.responseObj[0].slabRate5;
              $sessionStorage.flatRate = setdependresponse.responseObj[0].flatRate;
              $sessionStorage.percentageRate = setdependresponse.responseObj[0].percentageRate;
              $sessionStorage.chargeAmount = setdependresponse.responseObj[0].chargeAmount;
              $sessionStorage.noOfCopies = setdependresponse.responseObj[0].noOfCopies;

              $sessionStorage.taxId = setdependresponse.responseObj[0].taxId;
              $sessionStorage.chargeApplicableAt = setdependresponse.responseObj[0].chargeApplicableAt;
              var lookUpCode = "TAC";
              var level = "2";
             RestService.getHPrefixData(lookUpCode,level,$scope.orgid).then(function (TACresponse) {
                console.log("TACresponse=="+JSON.stringify(TACresponse));

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
                 toaster.error($filter('translate')('RTIAPIERROR')/* , $filter('translate')('ERROR') */);
                  $ionicLoading.hide();
            })
            $ionicLoading.hide();
            }
            else{
              toaster.error($filter('translate')('RTIAPIERROR')/* , $filter('translate')('') */);
            }$ionicLoading.hide();
            },function (err) {
              toaster.error($filter('translate')('RTIAPIERROR')/* , $filter('translate')('ERROR') */);
              $ionicLoading.hide();
         })

  };
    _init();
  });
