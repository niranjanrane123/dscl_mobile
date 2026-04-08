angular.module('starter')
  .controller('ComplaintRefrenceCtrl', function ($scope, RestService, $ionicLoading, $stateParams, toaster,
		  $filter, ENV, $state, $localStorage,$sessionStorage,$ionicPopup,$ionicPlatform) {
   $scope.orgid = $localStorage.selectedorgID;
   	$scope.firstName = $localStorage.responselogindata.firstName;
   	$scope.lastName = $localStorage.responselogindata.lastName;
   	 $scope.middleName = $localStorage.responselogindata.middleName;
   	 $scope.email = $localStorage.responselogindata.emailId;
   	$scope.address = $localStorage.responselogindata.address;
   	$scope.mobileNumber = $localStorage.responselogindata.mobileNo;
   	$scope.gender = $localStorage.responselogindata.genderId;
   	$scope.nameTitle = $localStorage.responselogindata.titleId;
    $scope.pinCode = $localStorage.responselogindata.pincode;
    $scope.dstoptions = new Array();
    $scope.orgoptions = new Array();
    $scope.deptoptions = new Array();
  
 //  $scope.allWard = [{"level":1, "Desc":"Ward karyalaya"},{"level":2, "Desc":"Ward"}];
   $scope.maxDate=  new Date().toISOString();
   var todayTime = new Date();
   var month = (todayTime .getMonth() + 1);
   var day = todayTime .getDate();
   var year = todayTime .getFullYear();
   if(day<10)
   {
       day='0'+day;
   }

   if(month<10)
   {
       month='0'+month;
   }
   var date = day + "/" + month + "/" + year;
   $scope.autoSelecteddate = year + '-' + month + '-' +day
   $scope.referenceDate = date;




   var deregisterSecond = $ionicPlatform.registerBackButtonAction(
    function () {
                    
            $state.go('app.home');
        
    }, 100
  );
  $scope.$on('$destroy', deregisterSecond);

//   $scope.fetchMode = function(){
//       for(var i=0;i<$scope.modeList.length;i++){
//          if($scope.modeList[i].lookUpId == $scope.complaintReferenceMode){
//            if($localStorage.langNewId == "2"){
//               $scope.shoLoc = $scope.modeList[i].descLangSecond;
//            }else{
//               $scope.shoLoc = $scope.modeList[i].descLangFirst;
//            }
//          }
//       }
//    }


// var deregisterSecond = $ionicPlatform.registerBackButtonAction(
//   function() {
//     $state.go("app.home");
//   }, 100
// );
//   $scope.$on('$destroy', deregisterSecond);

  $scope.showW = function(value){
     if(value=='R'){
      $scope.getDepartMent('R');
      $scope.applicationType = 'R';
     }else{
      $scope.getDepartMent('C');
      $scope.applicationType = 'C';
     }
  }
  $scope.getDepartMent = function(type) {
    RestService.deptprefix($scope.orgid,type).then(function (response){
         console.log("deptresponse--"+JSON.stringify(response));
         if(response==undefined || response == null || response=="" || response == [])
           {
            // toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR'));
             $ionicLoading.hide();
             //return false;
           }
         else
           {
             $sessionStorage.deptresponse = response;
             $ionicLoading.hide();
           }
         $ionicLoading.hide();
       },function (err) {
       //  toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR'));
         $ionicLoading.hide();
      })
  }
//  $scope.fetchCategory = function(){
//       for(var i=0;i<$scope.categoryList.length;i++){
//          if($scope.categoryList[i].lookUpId == $scope.complaintReferenceCategory){
//            if($localStorage.langNewId == "2"){
//               $scope.shoLoc = $scope.categoryList[i].descLangSecond;
//            }else{
//               $scope.shoLoc = $scope.categoryList[i].descLangFirst;
//            }
//          }
//       }
//    }
  $scope.fetchZone = function(wardType, value){
    
    console.log('click');

  if(wardType == 2){
  
  $scope.wardSec = new Array();
  if(value!=undefined){
    $scope.wardOne=value;
    if($scope.ward2){
      for(var i=0;i<$scope.ward2.length;i++){
               if($scope.ward2[i].lookUpParentId == value){
                     if($localStorage.langNewId == "2"){
                        $scope.wardSec.push({
                            value : $scope.ward2[i].lookUpId,
                            name : $scope.ward2[i].descLangSecond
                          })
                        }else{
                          $scope.wardSec.push({
                            value : $scope.ward2[i].lookUpId,
                            name : $scope.ward2[i].descLangFirst
                          })
                        }
                }
            }
            
            $scope.ward_One = $scope.wardSec[0].value;
            $scope.wardTwo = $scope.ward_One;
            
     }
  }
  }else if(wardType == 3){
   $scope.wardTwo=value;
   $scope.wardTh = new Array();
   if($scope.ward3){
     for(var i=0;i<$scope.ward3.length;i++){
              if($scope.ward3[i].lookUpParentId == value){
                    if($localStorage.langNewId == "2"){
                       $scope.wardTh.push({
                           value : $scope.ward3[i].lookUpId,
                           name : $scope.ward3[i].descLangSecond
                         })
                       }else{

                         $scope.wardTh.push({
                           value : $scope.ward3[i].lookUpId,
                           name : $scope.ward3[i].descLangFirst
                         })
                         }
              }
           }
   }
  }else if(wardType == 4){
  $scope.wardThree=value;
   $scope.wardFor = new Array();
    if($scope.ward4){
       for(var i=0;i<$scope.ward4.length;i++){
                if($scope.ward4[i].lookUpParentId == value){
                      if($localStorage.langNewId == "2"){
                         $scope.wardFor.push({
                             value : $scope.ward4[i].lookUpId,
                             name : $scope.ward4[i].descLangSecond
                           })
                         }else{

                           $scope.wardFor.push({
                             value : $scope.ward4[i].lookUpId,
                             name : $scope.ward4[i].descLangFirst
                           })
                           }
                }
             }
    }

  }else if(wardType == 5){
   $scope.wardFour=value;
   $scope.wardFiv = new Array();
    if($scope.ward5){
       for(var i=0;i<$scope.ward5.length;i++){
                if($scope.ward5[i].lookUpParentId == value){
                      if($localStorage.langNewId == "2"){
                         $scope.wardFiv.push({
                             value : $scope.ward5[i].lookUpId,
                             name : $scope.ward5[i].descLangSecond
                           })
                         }else{

                           $scope.wardFiv.push({
                             value : $scope.ward5[i].lookUpId,
                             name : $scope.ward5[i].descLangFirst
                           })
                           }
                }
             }
    }
  }else if(wardType == 6){
   $scope.wardFive=value;
  }
  console.log(' $scope.wardSec',  $scope.wardSec);
}

  $scope.fetchTitle = function(){
    for(var i=0;i<$scope.titleList.length;i++){
      if($scope.titleList[i].lookUpId == $scope.complaintReferenceZone){
        if($localStorage.langNewId == "2"){
         $scope.shoLoc = $scope.titleList[i].descLangSecond;
        }else{
         $scope.shoLoc = $scope.titleList[i].descLangFirst;
        }
      }
    }
  }
        $scope.fetchGender = function(){
//          for(var i=0;i<$scope.genderList.length;i++){
//            if($scope.genderList[i].lookUpId == $scope.complaintReferenceZone){
//              if($localStorage.langNewId == "2"){
//               $scope.shoLoc = $scope.genderList[i].descLangSecond;
//              }else{
//               $scope.shoLoc = $scope.genderList[i].descLangFirst;
//              }
//            }
//          }
          }
          $scope.next = function(){
           var rData = {}
               rData.rmode = $scope.complaintReferenceMode;
               rData.rcategory = $scope.complaintReferenceCategory;
               rData.rzone = $scope.wardOne;
               rData.wardTwo = $scope.wardTwo;
               rData.wardThree = $scope.wardThree;
               rData.wardFour = $scope.wardFour;
               rData.wardFive = $scope.wardFive;
               rData.rdate = $scope.autoSelecteddate;
               rData.rapplicationType = $scope.applicationType;
               rData.rmobileNumber = $scope.mobileNumber;
               rData.rfirstName = $scope.firstName;
               rData.rmiddleName = $scope.middleName;
               rData.rlastName = $scope.lastName;
               rData.rgender = $scope.gender;
               rData.rTitle = $scope.nameTitle;
               rData.remail = $scope.email;
               rData.raddress = $scope.address;
               rData.rpinCode = $scope.pinCode;
               //rData.serviceIdR = $scope.careServiceId
               $sessionStorage.referenceData = rData;
               console.log("session data"+JSON.stringify($sessionStorage.referenceData));
               $state.go("app.complaintservice");
          }


          $scope.changeDistrict = function () {
            //       var select = document.getElementById("district");
            //       var disttext= select.options[select.selectedIndex].value;
            //       var res = disttext.split(":")[1];
            //       $scope.District = res;
      
          }
          $scope.changeOrg = function (value) {
            console.log('org value is:', value)
            $scope.deptoptions = [];
            var select = document.getElementById("organization");
            var disttext = select.options[select.selectedIndex].value;
            var org = disttext.split(":")[1];
            $scope.Orgid = value;
            // RestService.deptprefix($scope.Orgid, $sessionStorage.referenceData.rapplicationType).then(function (response) {
              RestService.deptprefix($scope.Orgid, 'C').then(function (response) {
              console.log("deptresponse--" + JSON.stringify(response));
              if (response == undefined || response == null || response == "" || response == []) {
                toaster.error($filter('translate')('FILECOMPLAINTERROR')/* , $filter('translate')('ERROR') */);
                $ionicLoading.hide();
                //return false;
              }
              else {
                $sessionStorage.deptresponse = response;
                for (var i = 0; i < $sessionStorage.deptresponse.length; i++) {
                  if ($localStorage.langNewId == "2") {
                    if($scope.Orgid!=1){
                      $scope.deptoptions.push({
                        deptid: $sessionStorage.deptresponse[i].department.dpDeptid,
                        deptname: $sessionStorage.deptresponse[i].department.dpNameMar
                      })
                    }
                    else{
                      if($sessionStorage.deptresponse[i].department.dpDeptcode == 'CFC'){
                        $scope.deptoptions.push({
                          deptid: $sessionStorage.deptresponse[i].department.dpDeptid,
                          deptname: $sessionStorage.deptresponse[i].department.dpNameMar
                        })
                      }
                    }
                    
                  } else {
                    if($scope.Orgid!=1){
                      $scope.deptoptions.push({
                        deptid: $sessionStorage.deptresponse[i].department.dpDeptid,
                        deptname: $sessionStorage.deptresponse[i].department.dpDeptdesc
                      })
                    }
                    else{
                      if($sessionStorage.deptresponse[i].department.dpDeptcode == 'CFC'){
                        $scope.deptoptions.push({
                          deptid: $sessionStorage.deptresponse[i].department.dpDeptid,
                          deptname: $sessionStorage.deptresponse[i].department.dpDeptdesc
                        })
                      }
                    }
                    
                  }
                 
                  $localStorage.deptalloptions = $scope.deptoptions;
                  $sessionStorage.depOrgid = $scope.Orgid
                  
                  lookUpCode = "CWZ"
           //demo
         RestService.getHPrefixLavel(lookUpCode,$scope.orgid).then(function(response){
           $scope.allWard=response;
            for(var j=0; j<$scope.allWard.length; j++){
                      var level = $scope.allWard[j].comLevel;
                        if(level==1){
                         if($localStorage.langNewId == "2"){
                           $scope.FirstLabel = $scope.allWard[0].comDescMar
                         }else{
                           $scope.FirstLabel = $scope.allWard[0].comDesc
                         }
                        let index = j;
                         RestService.getHPrefixData('CWZ',level,value)
                                .then(function(response){
                                 //console.log("zone response"+JSON.stringify(response))
                                 ZoneList = response;
                                 $scope.zoneList = response;
                                 //console.log("zone"+JSON.stringify(ZoneList))
                                  $scope.ward1 = new Array();
                                   for(var i=0;i<ZoneList.length;i++){
                                        if($localStorage.langNewId == "2"){
                                        $scope.ward1.push({
                                            value : ZoneList[i].lookUpId,
                                            name : ZoneList[i].descLangSecond
                                          })
                                          $scope.wardKaryalaya = $scope.ward1[i].value;
                                        }else{

                                          $scope.ward1.push({
                                            value : ZoneList[i].lookUpId,
                                            name : ZoneList[i].descLangFirst
                                          })
                                          $scope.wardKaryalaya = $scope.ward1[i].value;
                                          }
                                        }
                                    $scope.allWard[index]["options"] = $scope.ward1;
                                   // console.log("zone new data111"+JSON.stringify( $scope.allWard))
                                     $ionicLoading.hide();

                           },function(err){
                               toaster.error($filter('translate')('FILECOMPLAINTERROR')/* , $filter('translate')('ERROR_OCCURED') */);
                               $ionicLoading.hide();
                             });

                         }else if(level==2){
                           if($localStorage.langNewId == "2"){
                              $scope.SecondLabel = $scope.allWard[1].comDescMar
                            }else{
                              $scope.SecondLabel = $scope.allWard[1].comDesc
                            }
                           RestService.getHPrefixData('CWZ',level,value)
                                .then(function(response){
                                //console.log("zone response"+JSON.stringify(response))
                                ZoneList = response;
                                $scope.zoneList = response;
                               // console.log("zone"+JSON.stringify(ZoneList))
                                 $scope.ward2 = new Array();
                                 $scope.ward2 = $scope.zoneList;
                                 
                                 $scope.fetchZone(2,$scope.wardKaryalaya);
                                 $ionicLoading.hide();
                                  },function(err){
                                    //  toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR_OCCURED'));
                                      $ionicLoading.hide();
                                    });
                                  }
                                  else if(level==3){
                                  if($localStorage.langNewId == "2"){
                                    $scope.thiredLabel = $scope.allWard[2].comDescMar
                                  }else{
                                    $scope.thiredLabel = $scope.allWard[2].comDesc
                                  }
                                  RestService.getHPrefixData('CWZ',level,value)
                                  .then(function(response){
                                  // console.log("zone response"+JSON.stringify(response))
                                   ZoneList = response;
                                   $scope.zoneList = response;
                                   //console.log("zone"+JSON.stringify(ZoneList))
                                    $scope.ward3 = new Array();
                                    $scope.ward3 = $scope.zoneList
                                   // console.log("zone new data"+JSON.stringify($scope.ward2))
                                       $ionicLoading.hide();

                                  },function(err){
                                    // toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR_OCCURED'));
                                     $ionicLoading.hide();
                                   });
                                    }else if(level==4){
                                     if($localStorage.langNewId == "2"){
                                        $scope.fourthLabel = $scope.allWard[3].comDescMar
                                      }else{
                                        $scope.fourthLabel = $scope.allWard[3].comDesc
                                      }
                                     RestService.getHPrefixData('CWZ',level,value)
                                     .then(function(response){
                                     // console.log("zone response"+JSON.stringify(response))
                                      ZoneList = response;
                                      $scope.zoneList = response;
                                      //console.log("zone"+JSON.stringify(ZoneList))
                                       $scope.ward4 = new Array();
                                       $scope.ward4 = $scope.zoneList;
                                         // console.log("zone new data"+JSON.stringify($scope.ward2))
                                          $ionicLoading.hide();

                                        },function(err){
                                         //   toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR_OCCURED'));
                                            $ionicLoading.hide();
                                          });
                                    }else if(level==5){
                                    if($localStorage.langNewId == "2"){
                                        $scope.fifthLabel = $scope.allWard[4].comDescMar
                                      }else{
                                        $scope.fifthLabel = $scope.allWard[4].comDesc
                                      }
                                        RestService.getHPrefixData('CWZ',level,value)
                                        .then(function(response){
                                         //console.log("zone response"+JSON.stringify(response))
                                         ZoneList = response;
                                         $scope.zoneList = response;
                                         //console.log("zone"+JSON.stringify(ZoneList))
                                          $scope.ward5 = new Array();
                                          $scope.ward5 = $scope.zoneList;
                                            //console.log("zone new data"+JSON.stringify($scope.ward5))
                                             $ionicLoading.hide();
                                               },function(err){
                                        //   toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR_OCCURED'));
                                           $ionicLoading.hide();
                                         });
                                    }
           //
           //                         for(var i=0;i<ZoneList.length;i++){
           //                         if($localStorage.langNewId == "2"){
           //                         $scope.zones.push({
           //                             value : ZoneList[i].lookUpId,
           //                             name : ZoneList[i].descLangSecond
           //                           })
           //                         }else{
           //                           $scope.zones.push({
           //                             value : ZoneList[i].lookUpId,
           //                             name : ZoneList[i].descLangFirst
           //                           })
           //                           }
           //                         }
           //                         console.log("zone new data"+JSON.stringify($scope.zones))
                                    $ionicLoading.hide();

                   }
         },function(err){
                        toaster.error($filter('translate')('FILECOMPLAINTERROR')/* , $filter('translate')('ERROR_OCCURED') */);
                        $ionicLoading.hide();
          })
         
                            
                  


                  //////////////////////////////////////////
                }
                $ionicLoading.hide();
              }
              $ionicLoading.hide();
            }, function (err) {
              if(err){
                $ionicLoading.hide();
                $scope.compltypeoption = [];
              } else{
      
              }
              
            })
            // setDependentParameter(org);
          }
        var _init = function (){
           $scope.getDepartMent('C');
           $scope.applicationType = 'C';
        //    lookUpCode = "CWZ"
        //    //demo
        //  RestService.getHPrefixLavel(lookUpCode,$scope.orgid).then(function(response){
        //    $scope.allWard=response;
        //     for(var j=0; j<$scope.allWard.length; j++){
        //               var level = $scope.allWard[j].comLevel;
        //                 if(level==1){
        //                  if($localStorage.langNewId == "2"){
        //                    $scope.FirstLabel = $scope.allWard[0].comDescMar
        //                  }else{
        //                    $scope.FirstLabel = $scope.allWard[0].comDesc
        //                  }
        //                 let index = j;
        //                  RestService.getHPrefixData('CWZ',level,$scope.orgid)
        //                         .then(function(response){
        //                          //console.log("zone response"+JSON.stringify(response))
        //                          ZoneList = response;
        //                          $scope.zoneList = response;
        //                          //console.log("zone"+JSON.stringify(ZoneList))
        //                           $scope.ward1 = new Array();
        //                            for(var i=0;i<ZoneList.length;i++){
        //                                 if($localStorage.langNewId == "2"){
        //                                 $scope.ward1.push({
        //                                     value : ZoneList[i].lookUpId,
        //                                     name : ZoneList[i].descLangSecond
        //                                   })
        //                                 }else{
        //                                     $scope.ward1.push({
        //                                       value : ZoneList[i].lookUpId,
        //                                       name : ZoneList[i].descLangFirst
        //                                     })
        //                                   }
        //                                 }
        //                             $scope.allWard[index]["options"] = $scope.ward1;
                                    
        //                            // console.log("zone new data111"+JSON.stringify( $scope.allWard))
        //                              $ionicLoading.hide();

        //                    },function(err){
        //                        toaster.error($filter('translate')('FILECOMPLAINTERROR')/* , $filter('translate')('ERROR_OCCURED') */);
        //                        $ionicLoading.hide();
        //                      });

        //                  }else if(level==2){
        //                    if($localStorage.langNewId == "2"){
        //                       $scope.SecondLabel = $scope.allWard[1].comDescMar
        //                     }else{
        //                       $scope.SecondLabel = $scope.allWard[1].comDesc
        //                     }
        //                    RestService.getHPrefixData('CWZ',level,$scope.orgid)
        //                         .then(function(response){
        //                         //console.log("zone response"+JSON.stringify(response))
        //                         ZoneList = response;
        //                         $scope.zoneList = response;
        //                        // console.log("zone"+JSON.stringify(ZoneList))
        //                          $scope.ward2 = new Array();
        //                          $scope.ward2 = $scope.zoneList;
        //                          $ionicLoading.hide();
        //                           },function(err){
        //                             //  toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR_OCCURED'));
        //                               $ionicLoading.hide();
        //                             });
        //                           }
        //                           else if(level==3){
        //                           if($localStorage.langNewId == "2"){
        //                             $scope.thiredLabel = $scope.allWard[2].comDescMar
        //                           }else{
        //                             $scope.thiredLabel = $scope.allWard[2].comDesc
        //                           }
        //                           RestService.getHPrefixData('CWZ',level,$scope.orgid)
        //                           .then(function(response){
        //                           // console.log("zone response"+JSON.stringify(response))
        //                            ZoneList = response;
        //                            $scope.zoneList = response;
        //                            //console.log("zone"+JSON.stringify(ZoneList))
        //                             $scope.ward3 = new Array();
        //                             $scope.ward3 = $scope.zoneList
        //                            // console.log("zone new data"+JSON.stringify($scope.ward2))
        //                                $ionicLoading.hide();

        //                           },function(err){
        //                             // toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR_OCCURED'));
        //                              $ionicLoading.hide();
        //                            });
        //                             }else if(level==4){
        //                              if($localStorage.langNewId == "2"){
        //                                 $scope.fourthLabel = $scope.allWard[3].comDescMar
        //                               }else{
        //                                 $scope.fourthLabel = $scope.allWard[3].comDesc
        //                               }
        //                              RestService.getHPrefixData('CWZ',level,$scope.orgid)
        //                              .then(function(response){
        //                              // console.log("zone response"+JSON.stringify(response))
        //                               ZoneList = response;
        //                               $scope.zoneList = response;
        //                               //console.log("zone"+JSON.stringify(ZoneList))
        //                                $scope.ward4 = new Array();
        //                                $scope.ward4 = $scope.zoneList;
        //                                  // console.log("zone new data"+JSON.stringify($scope.ward2))
        //                                   $ionicLoading.hide();

        //                                 },function(err){
        //                                  //   toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR_OCCURED'));
        //                                     $ionicLoading.hide();
        //                                   });
        //                             }else if(level==5){
        //                             if($localStorage.langNewId == "2"){
        //                                 $scope.fifthLabel = $scope.allWard[4].comDescMar
        //                               }else{
        //                                 $scope.fifthLabel = $scope.allWard[4].comDesc
        //                               }
        //                                 RestService.getHPrefixData('CWZ',level,$scope.orgid)
        //                                 .then(function(response){
        //                                  //console.log("zone response"+JSON.stringify(response))
        //                                  ZoneList = response;
        //                                  $scope.zoneList = response;
        //                                  //console.log("zone"+JSON.stringify(ZoneList))
        //                                   $scope.ward5 = new Array();
        //                                   $scope.ward5 = $scope.zoneList;
        //                                     //console.log("zone new data"+JSON.stringify($scope.ward5))
        //                                      $ionicLoading.hide();
        //                                        },function(err){
        //                                 //   toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR_OCCURED'));
        //                                    $ionicLoading.hide();
        //                                  });
        //                             }
        //    //
        //    //                         for(var i=0;i<ZoneList.length;i++){
        //    //                         if($localStorage.langNewId == "2"){
        //    //                         $scope.zones.push({
        //    //                             value : ZoneList[i].lookUpId,
        //    //                             name : ZoneList[i].descLangSecond
        //    //                           })
        //    //                         }else{
        //    //                           $scope.zones.push({
        //    //                             value : ZoneList[i].lookUpId,
        //    //                             name : ZoneList[i].descLangFirst
        //    //                           })
        //    //                           }
        //    //                         }
        //    //                         console.log("zone new data"+JSON.stringify($scope.zones))
        //                             $ionicLoading.hide();

        //            }
        //  },function(err){
        //                 toaster.error($filter('translate')('FILECOMPLAINTERROR')/* , $filter('translate')('ERROR_OCCURED') */);
        //                 $ionicLoading.hide();
        //   })
        var lookUpCode = "RFM"
        RestService.getNHPrefixData(lookUpCode,$scope.orgid)
            .then(function(response){
              console.log("Mode response"+JSON.stringify(response))
                ModeList = response;
                $scope.modeList = response;
                console.log("mode"+JSON.stringify(ModeList))
                $scope.modes = new Array();
                for(var i=0;i<ModeList.length;i++){
                  if(ModeList[i].lookUpCode == "MA"){
                  $scope.complaintReferenceMode = ModeList[i].lookUpId;
                       if($localStorage.langNewId == "2"){
                         $scope.modes.push({
                             value : ModeList[i].lookUpId,
                             name : ModeList[i].descLangSecond
                           })
                         }else{
                           $scope.modes.push({
                             value : ModeList[i].lookUpId,
                             name : ModeList[i].descLangFirst
                            })
                           }
                  }
                }
                console.log("mode new data"+JSON.stringify($scope.modes))

            $ionicLoading.hide();
        },function(err){
              toaster.error($filter('translate')('FILECOMPLAINTERROR')/* , $filter('translate')('ERROR_OCCURED') */);
              $ionicLoading.hide();
        })

        lookUpCode = "RFC"
        RestService.getNHPrefixData('RFC',$scope.orgid)
            .then(function(response){
              console.log("cate response"+JSON.stringify(response))
              CategoryList = response;
              $scope.categoryList = response;
              console.log("cate"+JSON.stringify(CategoryList))
              $scope.category = new Array();
              for(var i=0;i<CategoryList.length;i++){
              if(CategoryList[i].lookUpCode == "GP"){
              $scope.complaintReferenceCategory = CategoryList[i].lookUpId;
              if($localStorage.langNewId == "2"){
              $scope.category.push({
                  value : CategoryList[i].lookUpId,
                  name : CategoryList[i].descLangSecond
                })
              }else{
                $scope.category.push({
                  value : CategoryList[i].lookUpId,
                  name : CategoryList[i].descLangFirst
                })
                }
                }
              }
              console.log("cate new data"+JSON.stringify($scope.categoryList))
              $ionicLoading.hide();
        },function(err){
        toaster.error($filter('translate')('FILECOMPLAINTERROR')/* , $filter('translate')('ERROR_OCCURED') */);
        $ionicLoading.hide();
        })


        lookUpCode = "TTL"
        RestService.getNHPrefixData(lookUpCode,$scope.orgid)
              .then(function(response){
                console.log("cate response"+JSON.stringify(response))
                TitleList = response;
                $scope.titleList = response;
                console.log("cate"+JSON.stringify(TitleList))
                $scope.title = new Array();
                for(var i=0;i<TitleList.length;i++){
                if($localStorage.langNewId == "2"){
                $scope.title.push({
                    value : TitleList[i].lookUpId,
                    name : TitleList[i].descLangSecond
                  })
                }else{
                  $scope.title.push({
                    value : TitleList[i].lookUpId,
                    name : TitleList[i].descLangFirst
                  })
                  }
                }
                console.log("cate new data"+JSON.stringify($scope.categoryList))
                $ionicLoading.hide();
            },function(err){
            toaster.error($filter('translate')('FILECOMPLAINTERROR')/* , $filter('translate')('ERROR_OCCURED') */);
            $ionicLoading.hide();
            })
        lookUpCode = "GEN"
        RestService.getNHPrefixData(lookUpCode,$scope.orgid)
                 .then(function(response){
                   console.log("cate response"+JSON.stringify(response))
                   GenderList = response;
                   $scope.genderList = response;
                   console.log("cate"+JSON.stringify(GenderList))
                   $scope.genderV = new Array();
                   for(var i=0;i<GenderList.length;i++){
                   if($localStorage.langNewId == "2"){
                   $scope.genderV.push({
                       value : GenderList[i].lookUpId,
                       name : GenderList[i].descLangSecond
                     })
                   }else{
                     $scope.genderV.push({
                       value : GenderList[i].lookUpId,
                       name : GenderList[i].descLangFirst
                     })
                     }
                   }
                   console.log("cate new data"+JSON.stringify($scope.categoryList))
                   $ionicLoading.hide();
             },function(err){
             toaster.error($filter('translate')('FILECOMPLAINTERROR')/* , $filter('translate')('ERROR_OCCURED') */);
             $ionicLoading.hide();
        })
        RestService.getComplaintTypeConfig("AC",$scope.orgid)
                         .then(function(response){
                           console.log("cate response"+JSON.stringify(response))
                           List = response;
                           $scope.List = response;
                           console.log("cate"+JSON.stringify(List))
                           $scope.compType = new Array();
                           for(var i=0;i<List.length;i++){
                           if($localStorage.langNewId == "2"){
                           $scope.compType.push({
                               value : List[i].lookUpId,
                               code : List[i].lookUpCode,
                               name :  List[i].descLangSecond,
                               active : List[i].otherField
                             })
                           }else{
                             $scope.compType.push({
                               value : List[i].lookUpId,
                               code : List[i].lookUpCode,
                               name : List[i].descLangFirst,
                               active : List[i].otherField
                             })
                             }
                           }
                           console.log("cate new data"+JSON.stringify($scope.compType))
                           $ionicLoading.hide();
                     },function(err){
                     toaster.error($filter('translate')('FILECOMPLAINTERROR')/* , $filter('translate')('ERROR_OCCURED') */);
                     $ionicLoading.hide();
                     })


                     ///demo


                     var lookUpCode = "DIS";
                     RestService.getNHPrefixData(lookUpCode, $scope.orgid).then(function (responseCAA) {
                       console.log("responseCAA==" + JSON.stringify(responseCAA));
                       if (responseCAA == undefined || responseCAA == null || responseCAA == "") {
                         return false;
                       }
                       else {
                         for (var i = 0; i < responseCAA.length; i++) {
                           //     if(responseCAA[i].lookUpCode == 'DNN' || responseCAA[i].lookUpCode == 'DDN'){
                           if ($localStorage.langNewId == "2") {
                             $scope.dstoptions.push({
                               id: responseCAA[i].lookUpId,
                               name: responseCAA[i].descLangSecond
                             });
                             $scope.friend = {
                               isPresent: true,
                               selectedTicket: { "name": responseCAA[i].descLangSecond, "id": responseCAA[i].lookUpId } // <-- this is the default item
                             };
                             $scope.District = $scope.friend.selectedTicket.id;
                             RestService.getOrgByDistrictIdforcomplaint($scope.District).then(function (responseCAA) {
                               console.log("responseCAA==" + JSON.stringify(responseCAA));
                               if (responseCAA == undefined || responseCAA == null || responseCAA == "") {
                                 return false;
                               }
                               else {
                                 for (var i = 0; i < responseCAA.length; i++) {
                                   if ($localStorage.langNewId == "2") {
                                    if(responseCAA[i].orgid == 1){
                                      $scope.orgoptions.push({
                                        id: responseCAA[i].orgid,
                                        name: responseCAA[i].onlsOrgnameMar
                                      });
                                      $scope.organization = $scope.orgoptions[i].id;
                                    }                                    
                                   } else {
                                    if(responseCAA[i].orgid == 1){
                                      $scope.orgoptions.push({
                                        id: responseCAA[i].orgid,
                                        name: responseCAA[i].onlsOrgname
                                      });
                                      $scope.organization = $scope.orgoptions[i].id;
                                    }
                                   }
                                 }
                                console.log('$scope.organization-->',$scope.organization);
                                $scope.changeOrg($scope.organization);
                                 // $ionicLoading.hide();
                               }
                             }, function (err) {
                               toaster.error($filter('translate')('FILECOMPLAINTERROR')/* , $filter('translate')('ERROR_OCCURED') */);
                               //                    $ionicLoading.hide();
                             })
                           } else {
                             $scope.dstoptions.push({
                               id: responseCAA[i].lookUpId,
                               name: responseCAA[i].descLangFirst
                             });
                             $scope.friend = {
                               isPresent: true,
                               selectedTicket: { "name": responseCAA[i].descLangFirst, "id": responseCAA[i].lookUpId } // <-- this is the default item
                             };
                             $scope.District = $scope.friend.selectedTicket.id;
                             RestService.getOrgByDistrictIdforcomplaint($scope.District).then(function (responseCAA) {
                               console.log("responseCAA==" + JSON.stringify(responseCAA));
                               if (responseCAA == undefined || responseCAA == null || responseCAA == "") {
                                 return false;
                               }
                               else {
                                 for (var i = 0; i < responseCAA.length; i++) {
                                   if ($localStorage.langNewId == "2") {
                                    if(responseCAA[i].orgid == 1){
                                     $scope.orgoptions.push({
                                       id: responseCAA[i].orgid,
                                       name: responseCAA[i].onlsOrgnameMar
                                     });
                                     $scope.organization = $scope.orgoptions[i].id;
                                    }
                                   } else {
                                    if(responseCAA[i].orgid == 1){
                                     $scope.orgoptions.push({
                                       id: responseCAA[i].orgid,
                                       name: responseCAA[i].onlsOrgname
                                     });
                                     $scope.organization = $scope.orgoptions[i].id;
                                    }
                                   }
                                 }
                                console.log('$scope.organization-->',$scope.organization);
                                $scope.changeOrg($scope.organization);
                                 //     $ionicLoading.hide();
                               }
                             }, function (err) {
                               toaster.error($filter('translate')('FILECOMPLAINTERROR')/* , $filter('translate')('ERROR_OCCURED') */);
                               //             $ionicLoading.hide();
                             })
                           }
                           //    }
                         }
                         $ionicLoading.hide();
                       }
                     }, function (err) {
                       //					toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR_OCCURED'));
                       $ionicLoading.hide();
                     })
                     //demodetail
      };
    _init();
  });
