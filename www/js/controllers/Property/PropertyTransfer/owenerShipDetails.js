angular.module('starter')

  .controller('owenerShipDetailsCtrl', function ($scope, RestService, $ionicLoading, $stateParams, toaster, $filter,
   ENV, $state,$sessionStorage,$localStorage,$rootScope,$ionicPopup,$ionicHistory) {
  $scope.ownersDetails = new Array();
//console.log("propertyBillResponse--"+JSON.stringify($sessionStorage.propertyBillResponse));
  $scope.orgid = $localStorage.selectedorgID;
	$scope.userID = $localStorage.responselogindata.userId;
	$scope.loginUSername = $localStorage.responselogindata.firstName;
	$scope.LoginMobileNo = $localStorage.responselogindata.mobileNo;
  $scope.relationShow;
  $scope.tempArray = new Array();
  $scope.ownerType;
  $scope.ownerShip;
  $scope.showOther = false;
  $scope.showJoint = false;
  $scope.showSingle = false;
  $scope.roadType = new Array();


   $scope.nameOfLabel;
    $scope.pdegender;
    $scope.nameowner;
    $scope.ProvisionalAssesmentOwnerDtlDto = new Array();
    $scope.ownerTypeShow;
    $scope.genderShow;
    $scope.relationShow;
    $scope.showJointBtn = false;
    $scope.tempArray =new Array();
    $scope.add = function(){
      var ownerDetailsObject ={}
      ownerDetailsObject.ownerDtlId= 0;
      ownerDetailsObject.tbAsTransferrMast= null;
      ownerDetailsObject.active= null;
      ownerDetailsObject.addharno= $scope.PDEaadharno;
      ownerDetailsObject.apmApplicationId= null;
      ownerDetailsObject.assNo= null;
      ownerDetailsObject.createdBy= null;
      ownerDetailsObject.createdDate= null;
      ownerDetailsObject.endDate= null;
      ownerDetailsObject.genderId= $scope.pdegender;
      ownerDetailsObject.guardianName= $scope.PDEgurdian;
      ownerDetailsObject.lgIpMac= null;
      ownerDetailsObject.lgIpMacUpd= null;
      ownerDetailsObject.mobileno= $scope.PDEmobile.toString();
      ownerDetailsObject.orgId= null;
      ownerDetailsObject.ownerName= $scope.nameowner;
      ownerDetailsObject.panno= $scope.PDEpanno;
      ownerDetailsObject.propertyShare= $scope.PDEpropertyshare;
      ownerDetailsObject.relationId= $scope.PDErelation;
      ownerDetailsObject.eMail= null;
      ownerDetailsObject.smServiceId= null;
      ownerDetailsObject.startDate= null;
      ownerDetailsObject.type= null;
      ownerDetailsObject.updatedBy= null;
      ownerDetailsObject.updatedDate= null;
      ownerDetailsObject.genderIdDesc= null;
      ownerDetailsObject.relationIdDesc= null;
       if($scope.ProvisionalAssesmentOwnerDtlDto.length == 0){
       ownerDetailsObject.otype="P";
       }else{
       ownerDetailsObject.otype=null;
       }

      $scope.ProvisionalAssesmentOwnerDtlDto.push(ownerDetailsObject);

      if($scope.tempArray.length > 0){
        $scope.showJointBtn = true;
      }else{
        $scope.showJointBtn = false;
      }


       var tempObject = {}
        tempObject.ownerType=$scope.ownerTypeShow;
        tempObject.ownersName=$scope.nameowner;
        tempObject.gender=$scope.genderShow;
        tempObject.relation=$scope.relationShow;
        tempObject.gurdian=$scope.PDEgurdian;
        tempObject.propertyShare=$scope.PDEpropertyshare;
        tempObject.mobile=$scope.PDEmobile;

        $scope.tempArray.push(tempObject);
        $scope.nameowner = "";
        $scope.pdegender = "";
        $scope.PDErelation = "";
        $scope.PDEpropertyshare = "";
        $scope.PDEmobile = "";
        $scope.PDEgurdian = "";
        $scope.PDEpanno = "";
        $scope.PDEaadharno = "";
        if($scope.tempArray.length > 0){
          $scope.showJointBtn = true;
        }else{
          $scope.showJointBtn = false;
        }

    }
/* BILL DETIALS */
//$scope.primaryOwnerName = $localStorage.flatInfo.data.result
//$scope.flatNo = $localStorage.flatNo;
//$scope.owner;
//$scope.value;
//var foo = [];
//$scope.owner;
// foo = $localStorage.flatInfo.data.result.payload
//
//console.log("foo"+ foo.toString())
//
//if($scope.flatNo == "Flat1" || $scope.flatNo == "flat1"){
//  $scope.owner = "huda";
//}else if($scope.flatNo == "Flat2" || $scope.flatNo == "flat2"){
//  $scope.owner = "parsun";
//}else {
//  $scope.owner = "huda";
//}

//$scope.location = propertyBillResponse.location;
//$scope.pinCode = propertyBillResponse.pinCode;
//$scope.primaryOwnerMobNo = propertyBillResponse.primaryOwnerMobNo;
//$scope.totalPayableAmount = propertyBillResponse.totalPayableAmt;
//console.log("get value "+$localStorage.flatInfo.data.result.payload[0].TxId)
//for (var i = 0; i < $scope.primaryOwnerName.payload.length; i++) {
//
//    $scope.owner = $scope.primaryOwnerName.payload[i].Value;
//}

  var mutablePropDetails = $sessionStorage.mutablePropertyData;
  $scope.ownerDetails = mutablePropDetails.provisionalAssesmentOwnerDtlDtoList;
  $scope.ownerShipType = mutablePropDetails.assOwnerType;
  $scope.oldPropertyNo = mutablePropDetails.assOldpropno;
  $scope.landType = mutablePropDetails.assLandType;
  $scope.address = mutablePropDetails.assAddress;
  $scope.propertyAddress = mutablePropDetails.assAddress;
  $scope.locationAddress = mutablePropDetails.locId;
  $scope.pinCode = mutablePropDetails.assPincode;

  $scope.propertyZone = mutablePropDetails.assWard1;
  $scope.locationWard = mutablePropDetails.assWard2;
  $scope.propertyRoadType = mutablePropDetails.propLvlRoadType;

  if($scope.totalPayableAmount == 0)
      {			$scope.amtzero = true;
      $scope.amtzerobtn = false;
      }else{
        $scope.amtzero = false;
        $scope.amtzerobtn = true;
      }

    $scope.paypropertyBill = function()
    {
        $state.go("app.initiateTransfer");
    }

    $scope.billdetail = function()
    {
      $state.go("app.propertytaxdetail");
    }

   function saveMutation(checkListDto){
       $ionicLoading.show({	template:$filter('translate')('LOADING')		});
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

     $scope.fetchGender = function(){
       RestService.getNHPrefixData("GEN",$scope.orgid)
           		.then(function(response){
               console.log("gender type"+$scope.pdegender)
           		console.log("my y response"+ JSON.stringify(response))
           		for(var i=0;i<response.length;i++){
           		  if(response[i].lookUpId == $scope.pdegender){
           		    if($localStorage.langNewId == "1"){
                       $scope.genderShow =  response[i].descLangFirst;
                   }else{
                      $scope.genderShow =  response[i].descLangSecond;
                   }
           		  }
           		}

           		console.log("gender show"+$scope.genderShow)
   //        		  for(var i=0;i<response.length;i++){
   //        		    if(response[i].lookUpId == $scope.PDEgender){
   //        		        if($localStorage.langNewId == "1"){
   //                       $scope.relationShow; =  response[i].descLangFirst;
   //                    }else{
   //                       $scope.relationShow; =  response[i].descLangSecond;
   //                    }
   //
   //        		    }
   //        		  }
           		},function(err){
                			toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR_OCCURED'));
                			$ionicLoading.hide();
               })
     }

     $scope.fetchRelation = function(){
      RestService.getNHPrefixData("REL",$scope.orgid)
            		.then(function(response){
                console.log("relation type"+$scope.PDErelation)
            		console.log("my y response"+ JSON.stringify(response))
            		for(var i=0;i<response.length;i++){
            		  if(response[i].lookUpId == $scope.PDErelation){
            		    if($localStorage.langNewId == "1"){
                        $scope.relationShow =  response[i].descLangFirst;
                    }else{
                       $scope.relationShow =  response[i].descLangSecond;
                    }
            		  }
            		}

            		console.log("gender show"+$scope.relationShow)
    //        		  for(var i=0;i<response.length;i++){
    //        		    if(response[i].lookUpId == $scope.PDEgender){
    //        		        if($localStorage.langNewId == "1"){
    //                       $scope.relationShow; =  response[i].descLangFirst;
    //                    }else{
    //                       $scope.relationShow; =  response[i].descLangSecond;
    //                    }
    //
    //        		    }
    //        		  }
            		},function(err){
                 			toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR_OCCURED'));
                 			$ionicLoading.hide();
                })
       }

     $scope.remove = function(index){
         $scope.tempArray.splice(index, 1);
         $scope.ProvisionalAssesmentOwnerDtlDto.splice(index, 1);
          if($scope.tempArray.length > 0){
               $scope.showJointBtn = true;
             }else{
               $scope.showJointBtn = false;
           }
     }

      $scope.toggleItem = function(item) {
         if ($scope.isItemShown(item)) {
           $scope.shownItem = null;
         } else {
           $scope.shownItem = item;
         }
       };
       $scope.isItemShown = function(item) {
         return $scope.shownItem === item;
       };






    $scope.getNonHDatanew1 = function(lookUpCode,dropdown,orgId){
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
              $ionicLoading.hide();
            }
            else {
              $ionicLoading.hide();
              toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR_OCCURED'));
              return [];
            }
          },function(err){
            toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR_OCCURED'));
            $ionicLoading.hide();
            return [];
          })
        }
   var init_ = function(){

      RestService.getServiceId($scope.orgid,"MUT")
            .then(function (response) {
            console.log("service id response"+JSON.stringify(response));
            $ionicLoading.hide();
            $scope.ServiceIdGet = response;

            console.log("SERVICE OD "+$scope.ServiceIdGet)

          }, function (err) {
            $ionicLoading.hide();
            toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR_OCCURED'));

          })


      //$rootScope.getCurrentDate();
         $scope.getNonHDatanew1("GEN","genoptions",$scope.orgid);
         $scope.getNonHDatanew1("REL","relation",$scope.orgid);
         RestService.getNHPrefixData("OWT",$scope.orgid).then(function (response) {
             if(response == undefined || response == null || response == ""){
                 $ionicLoading.hide();
                  return false;
             }else{
              console.log("response ownerShipType--"+JSON.stringify(response));
                 $scope.ownership=new Array();
                 for(var i=0;i<response.length;i++){

                   if($localStorage.langID == "2"){
                      $scope.ownership.push({
                       value: response[i].lookUpId,
                       name:response[i].descLangSecond
                     })
                   }else{
                       $scope.ownership.push({
                       value: response[i].lookUpId,
                       name:response[i].descLangFirst
                     })
                     }
                   }
                 }
                   $ionicLoading.hide();
               },function (err) {
                 toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR_OCCURED'));
               $ionicLoading.hide();
           })


       RestService.getNHPrefixData("TFT",$scope.orgid).then(function (response) {
          if(response == undefined || response == null || response == ""){
              $ionicLoading.hide();
               return false;
          }else{
           console.log("response transferType--"+JSON.stringify(response));
              $scope.transferType=new Array();
              for(var i=0;i<response.length;i++){

                    if($localStorage.langID == "2"){
                       $scope.transferType.push({
                        value: response[i].lookUpId,
                        name:response[i].descLangSecond
                      })
                    }else{
                        $scope.transferType.push({
                        value: response[i].lookUpId,
                        name:response[i].descLangFirst
                      })
                      }
                  }
              }
                $ionicLoading.hide();
            },function (err) {
              toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR_OCCURED'));
            $ionicLoading.hide();
       })

      RestService.getNHPrefixData("RFT",$scope.orgid).then(function (response) {
       if(response == undefined || response == null || response == ""){
           $ionicLoading.hide();
            return false;
       }else{
        console.log("response roadType--"+JSON.stringify(response));

           for(var i=0;i<response.length;i++){

               if($localStorage.langID == "1"){
                $scope.roadType.push({
                   value: response[i].lookUpId,
                   name:response[i].descLangFirst
                 })
               }else{
                 $scope.roadType.push({
                   value: response[i].lookUpId,
                   name:response[i].descLangSecond
                 })
               }

               }
           }
           $ionicLoading.hide();
         },function (err) {
           toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR_OCCURED'));
         })

       RestService.getHPrefixData("WZB","2",$scope.orgid).then(function (response) {
           if(response == undefined || response == null || response == ""){
               $ionicLoading.hide();
                return false;
           }else{
            console.log("response classification 2--"+JSON.stringify(response));
               $scope.propertyZoneWard=new Array();
               for(var i=0;i<response.length;i++){

                  if($localStorage.langID == "1"){
                      $scope.propertyZoneWard.push({
                       value: response[i].lookUpId,
                       name:response[i].descLangFirst
                     })
                   }else{
                       $scope.propertyZoneWard.push({
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

         RestService.getHPrefixData("WZB","1",$scope.orgid).then(function (response) {
           if(response == undefined || response == null || response == ""){
               $ionicLoading.hide();
                return false;
           }else{
            console.log("response classification--"+JSON.stringify(response));
               $scope.propertyZone2=new Array();
               for(var i=0;i<response.length;i++){
               if($localStorage.langID == "1"){
                  $scope.propertyZone2.push({
                   value: response[i].lookUpId,
                   name:response[i].descLangFirst
                 })
               }else{
                   $scope.propertyZone2.push({
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
        RestService.getYeardata($sessionStorage.deptId,$scope.orgid)
                    .then(function(response){
            console.log("location response"+JSON.stringify(response))

            var locationList = response.location;
            $scope.showList = response.location;
            console.log("locations"+JSON.stringify(locationList))
            $scope.locations = new Array();
            for(var i=0;i<locationList.length;i++){
            if($localStorage.langNewId == "2"){
            $scope.locations.push({
                value : locationList[i].lookUpId,
                name : locationList[i].descLangSecond
              })
            }else{
              $scope.locations.push({
                value : locationList[i].lookUpId,
                name : locationList[i].descLangFirst
              })
              }
            }
            console.log("location new data"+JSON.stringify($scope.locations))

          $ionicLoading.hide();
        },function(err){
              toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR_OCCURED'));
              $ionicLoading.hide();
        })
     }

     $scope.fetchGender = function(){
         RestService.getNHPrefixData("GEN",$scope.orgid)
             		.then(function(response){
                 console.log("gender type"+$scope.pdegender)
             		console.log("my y response"+ JSON.stringify(response))
             		for(var i=0;i<response.length;i++){
             		  if(response[i].lookUpId == $scope.pdegender){
             		    if($localStorage.langID == "1"){
                         $scope.genderShow =  response[i].descLangFirst;
                     }else{
                        $scope.genderShow =  response[i].descLangSecond;
                     }
             		  }
             		}

             		console.log("gender show"+$scope.genderShow)
     //        		  for(var i=0;i<response.length;i++){
     //        		    if(response[i].lookUpId == $scope.PDEgender){
     //        		        if($localStorage.langNewId == "1"){
     //                       $scope.relationShow; =  response[i].descLangFirst;
     //                    }else{
     //                       $scope.relationShow; =  response[i].descLangSecond;
     //                    }
     //
     //        		    }
     //        		  }
             		},function(err){
                  			toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR_OCCURED'));
                  			$ionicLoading.hide();
                 })
       }

       $scope.fetchRelation = function(){
        RestService.getNHPrefixData("REL",$scope.orgid)
              		.then(function(response){
                  console.log("relation type"+$scope.PDErelation)
              		console.log("my y response"+ JSON.stringify(response))
              		for(var i=0;i<response.length;i++){
              		  if(response[i].lookUpId == $scope.PDErelation){
              		    if($localStorage.langID == "1"){
                          $scope.relationShow =  response[i].descLangFirst;
                      }else{
                         $scope.relationShow =  response[i].descLangSecond;
                      }
              		  }
              		}

              		console.log("gender show"+$scope.relationShow)
      //        		  for(var i=0;i<response.length;i++){
      //        		    if(response[i].lookUpId == $scope.PDEgender){
      //        		        if($localStorage.langNewId == "1"){
      //                       $scope.relationShow; =  response[i].descLangFirst;
      //                    }else{
      //                       $scope.relationShow; =  response[i].descLangSecond;
      //                    }
      //
      //        		    }
      //        		  }
              		},function(err){
                   			toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR_OCCURED'));
                   			$ionicLoading.hide();
                  })
         }

     init_();

       $scope.fetchOwner = function(){
          console.log("console type"+$scope.ownerShipType)
           RestService.getNHPrefixData("OWT",$scope.orgid)
           		.then(function(response){
           		console.log("yatin response"+JSON.stringify(response))
           		  for(var i=0;i<response.length;i++){
           		    if(response[i].lookUpId == $scope.ownerShipType){
           		        $scope.OwnerType = response[i].descLangFirst;
           		        if($localStorage.langID == "1"){
           		           $scope.ownerTypeShow =  response[i].descLangFirst;
           		        }else{
           		           $scope.ownerTypeShow =  response[i].descLangSecond;
           		        }

           		        console.log("type"+$scope.OwnerType);
                        if($scope.OwnerType === 'Joint Owner' || $scope.OwnerType === 'Single Owner'){
                         $scope.showOther = false;
                         if($scope.OwnerType === 'Joint Owner'){
                             $scope.showJoint = true;
                             $scope.showSingle = false;
                         }else if($scope.OwnerType === 'Single Owner'){
                             $scope.showJoint = false;
                             $scope.showSingle = true;
                          }
                        }else{
                        if($localStorage.langID == "1"){
                         $scope.nameOfLabel = "Name of "+response[i].descLangFirst;
                        }else{
                         $scope.nameOfLabel = response[i].descLangSecond+" का नाम";
                        }

                         $scope.showJoint = false;
                         $scope.showSingle = false;
                         $scope.showOther = true;
                        }
           		    }
           		  }
           		},function(err){
                			toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR_OCCURED'));
                			$ionicLoading.hide();
               })
           }

           var fetchCheckListandCharges = function(checkListDto){
           $ionicLoading.show({	template:$filter('translate')('LOADING')		});
           checkListDto.smServiceId = $scope.ServiceIdGet;
           RestService.getMutablePropertyCheckList(checkListDto).then(function (response){
            console.log("mutableDtoResponse"+ JSON.stringify(response))
            if(response.length == 0 || JSON.stringify(response) == "{}" || response == null || JSON.stringify(response) == ""){
                 toaster.error("no check list defined");
                 RestService.getMutablePropertyCharges(checkListDto).then(function (response){

                  if(response == "" || response == null || response == undefined)
                      {
                        console.log(response);
                        toaster.error("something went wrong");
                        $ionicLoading.hide();
                      }else
                      {
                         console.log("mutable charges data"+JSON.stringify(response));
                          $sessionStorage.mutableChargesData = response;
                          $sessionStorage.checkListDto = checkListDto;
                         if(response.charges == null || response.charges.length == 0){
                          saveMutation(checkListDto)
                         }else{
                          $sessionStorage.mutableCharges = response.charges;
                          $state.go("app.propertyTransferPayment");
                         }
 //                              $sessionStorage.mutablePropertyCheckListData = response;
                         //$state.go("app.owenerShipDetails");
                      }
                    $ionicLoading.hide();

                  }, function (err) {
                    toaster.error($filter('translate')('ERROR'), $filter('translate')('Please Enter Valid Property Number'));
                    $ionicLoading.hide();
                  })
               }else{
                   $sessionStorage.checkListMutationData = response;
                   $sessionStorage.checkListDto = checkListDto;
                   $ionicLoading.show({	template:$filter('translate')('LOADING')		});
                   console.log("checklist reponse"+JSON.stringify(response))
                   $state.go("app.propertyDocUpload");
               }
//                 if(response == "" || response == null || response == undefined)
//                     {
//                       console.log(response);
//                       toaster.error("no check list defined");
//                       $ionicLoading.hide();
//                     }else
//                     {
//                        console.log("mutable checklist data"+JSON.stringify(response));
//                        $sessionStorage.mutablePropertyCheckListData = response;
//                        //$state.go("app.owenerShipDetails");
//                     }


                 $ionicLoading.hide();

             }, function (err) {
               toaster.error($filter('translate')('ERROR'), $filter('translate')('Please Enter Valid Property Number'));
               $ionicLoading.hide();
             })
        }
        $scope.transferNext = function(){

          $localStorage.joint = $scope.showJoint;
          $localStorage.single = $scope.showSingle;
          $localStorage.Other = $scope.showOther;
          $localStorage.ownerTytpe = $scope.ownerTypeShow;

          $localStorage.ownerType = $scope.WNCselecttitle;
          if($scope.showJoint == true){
            $localStorage.tempArray1 = $scope.tempArray;
//                $localStorage.ownerDto =  $scope.ProvisionalAssesmentOwnerDtlDto;
            console.log("owner dto check1"+JSON.stringify($scope.ProvisionalAssesmentOwnerDtlDto));
            $localStorage.ownrType = "Joint";

              var checkListDto = {
                transferMstId:0,
                actualTransferDate:new Date($scope.actualTransferDate).getTime(),
                apmApplicationId:null,
                autBy:null,
                autDate:null,
                autStatus:null,
                baseValue:null,
                createdBy:null,
                createdDate:null,
                lgIpMac:null,
                lgIpMacUpd:null,
                marketValue:parseInt($scope.marketValue),
                orgId:$scope.orgid,
                ownerType:$scope.ownerShipType,
                proAssNo:mutablePropDetails.assNo,
                salesDeedValue:parseInt($scope.salesDeadValue),
                status:null,
                transferType:$scope.transferTypeValue,
                updatedBy:null,
                updatedDate:null,
                smServiceId:mutablePropDetails.smServiceId,
                billTotalAmt:mutablePropDetails.billTotalAmt,
                proAssOwnerTypeName:null,
                deptId:$sessionStorage.deptId,
                langId:0,
                empId:$scope.userID,
                locationId:$scope.locationAddress,
                docs:null,
                propTransferOwnerList:$scope.ProvisionalAssesmentOwnerDtlDto,
                charges:null,
                appliChargeFlag:null,
                smFeesSchedule:null,
                mutIntiFlag:null,
                mutId:0,
                assLandType:null
              }


          }else if($scope.showSingle == true){

            var ownerDetailsObject ={}
                ownerDetailsObject.ownerDtlId= 0;
                ownerDetailsObject.tbAsTransferrMast= null;
                ownerDetailsObject.active= null;
                ownerDetailsObject.addharno= null;
                ownerDetailsObject.apmApplicationId= null;
                ownerDetailsObject.assNo= null;
                ownerDetailsObject.createdBy= null;
                ownerDetailsObject.createdDate= null;
                ownerDetailsObject.endDate= null;
                ownerDetailsObject.genderId= $scope.pdegender;
                ownerDetailsObject.guardianName= $scope.PDEgurdian;
                ownerDetailsObject.lgIpMac= null;
                ownerDetailsObject.lgIpMacUpd= null;
                ownerDetailsObject.mobileno= $scope.PDEmobile.toString();
                ownerDetailsObject.orgId= null;
                ownerDetailsObject.ownerName= $scope.nameowner;
                ownerDetailsObject.panno= null;
                ownerDetailsObject.propertyShare= $scope.PDEpropertyshare;
                ownerDetailsObject.relationId= null;
                ownerDetailsObject.eMail= null;
                ownerDetailsObject.smServiceId= null;
                ownerDetailsObject.startDate= null;
                ownerDetailsObject.type= null;
                ownerDetailsObject.updatedBy= null;
                ownerDetailsObject.updatedDate= null;
                ownerDetailsObject.genderIdDesc= null;
                ownerDetailsObject.relationIdDesc= null;
                ownerDetailsObject.otype="P";

                $scope.ProvisionalAssesmentOwnerDtlDto.push(ownerDetailsObject);
                  var checkListDto = {
                    transferMstId:0,
                    actualTransferDate:new Date($scope.actualTransferDate).getTime(),
                    apmApplicationId:null,
                    autBy:null,
                    autDate:null,
                    autStatus:null,
                    baseValue:null,
                    createdBy:null,
                    createdDate:null,
                    lgIpMac:null,
                    lgIpMacUpd:null,
                    marketValue:parseInt($scope.marketValue),
                    orgId:$scope.orgid,
                    ownerType:$scope.ownerShipType,
                    proAssNo:mutablePropDetails.assNo,
                    salesDeedValue:parseInt($scope.salesDeadValue),
                    status:null,
                    transferType:$scope.transferTypeValue,
                    updatedBy:null,
                    updatedDate:null,
                    smServiceId:mutablePropDetails.smServiceId,
                    billTotalAmt:mutablePropDetails.billTotalAmt,
                    proAssOwnerTypeName:null,
                    deptId:$sessionStorage.deptId,
                    langId:0,
                    empId:$scope.userID,
                    locationId:$scope.locationAddress,
                    docs:null,
                    propTransferOwnerList:$scope.ProvisionalAssesmentOwnerDtlDto,
                    charges:null,
                    appliChargeFlag:null,
                    smFeesSchedule:null,
                    mutIntiFlag:null,
                    mutId:0,
                    assLandType:null
                  }

          }else{

            var ownerDetailsObject ={}
                ownerDetailsObject.ownerDtlId= 0;
                ownerDetailsObject.tbAsTransferrMast= null;
                ownerDetailsObject.active= null;
                ownerDetailsObject.addharno= null;
                ownerDetailsObject.apmApplicationId= null;
                ownerDetailsObject.assNo= null;
                ownerDetailsObject.createdBy= null;
                ownerDetailsObject.createdDate= null;
                ownerDetailsObject.endDate= null;
                ownerDetailsObject.genderId= null;
                ownerDetailsObject.guardianName= $scope.PDEcontactperson;
                ownerDetailsObject.lgIpMac= null;
                ownerDetailsObject.lgIpMacUpd= null;
                ownerDetailsObject.mobileno= $scope.PDEmobile.toString();
                ownerDetailsObject.orgId= null;
                ownerDetailsObject.ownerName= $scope.PDEnameof;
                ownerDetailsObject.panno= null;
                ownerDetailsObject.propertyShare= null;
                ownerDetailsObject.relationId= null;
                ownerDetailsObject.eMail= null;
                ownerDetailsObject.smServiceId= null;
                ownerDetailsObject.startDate= null;
                ownerDetailsObject.type= null;
                ownerDetailsObject.updatedBy= null;
                ownerDetailsObject.updatedDate= null;
                ownerDetailsObject.genderIdDesc= null;
                ownerDetailsObject.relationIdDesc= null;
                ownerDetailsObject.otype="P";
                $scope.ProvisionalAssesmentOwnerDtlDto.push(ownerDetailsObject);



               var checkListDto = {
                  transferMstId:0,
                  actualTransferDate:new Date($scope.actualTransferDate).getTime(),
                  apmApplicationId:null,
                  autBy:null,
                  autDate:null,
                  autStatus:null,
                  baseValue:null,
                  createdBy:null,
                  createdDate:null,
                  lgIpMac:null,
                  lgIpMacUpd:null,
                  marketValue:parseInt($scope.marketValue),
                  orgId:$scope.orgid,
                  ownerType:$scope.ownerShipType,
                  proAssNo:mutablePropDetails.assNo,
                  salesDeedValue:parseInt($scope.salesDeadValue),
                  status:null,
                  transferType:$scope.transferTypeValue,
                  updatedBy:null,
                  updatedDate:null,
                  smServiceId:mutablePropDetails.smServiceId,
                  billTotalAmt:mutablePropDetails.billTotalAmt,
                  proAssOwnerTypeName:null,
                  deptId:$sessionStorage.deptId,
                  langId:0,
                  empId:$scope.userID,
                  locationId:$scope.locationAddress,
                  docs:null,
                  propTransferOwnerList:$scope.ProvisionalAssesmentOwnerDtlDto,
                  charges:null,
                  appliChargeFlag:null,
                  smFeesSchedule:null,
                  mutIntiFlag:null,
                  mutId:0,
                  assLandType:null
                }

          }
           console.log("owner dto check2"+JSON.stringify($scope.ProvisionalAssesmentOwnerDtlDto));

           if($scope.ProvisionalAssesmentOwnerDtlDto.length == 0){
            toaster.error($filter('translate')('ERROR'), $filter('translate')('ENTEROWNSERSHIPTYPE'));
           }else{
            fetchCheckListandCharges(checkListDto);
           }

     }


	  $scope.getValue = {
      fetchRoadType: function(roadType2){
        //alert(roadType)
        for(var y = 0; y < $scope.roadType.length;y++){
          if(roadType2 == $scope.roadType[y].value){
             return $scope.roadType[y].name
          }
        }
       },
       fetchZoneType: function(zone){
        console.log("zone "+zone)
       //alert(roadType)
         for(var z = 0; z < $scope.propertyZone2.length;z++){
           if(zone == $scope.propertyZone2[z].value){

              return $scope.propertyZone2[z].name
           }
         }
       },
       fetchZoneWardType: function(zone){
        console.log("zone "+zone)
       //alert(roadType)
         for(var z = 0; z < $scope.propertyZoneWard.length;z++){
           if(zone == $scope.propertyZoneWard[z].value){
              return $scope.propertyZoneWard[z].name
           }
         }
       },
       getLocation: function(location){
        console.log("zone "+location)
       //alert(roadType)
         for(var a = 0; a < $scope.locations.length;a++){
           if(location == $scope.locations[a].value){
              return $scope.locations[a].name
           }
         }
       }
     }

  })
