angular.module('starter')
  .controller('rtiApplicantHistoryCtrl', function ($rootScope,$scope, RestService, $ionicLoading, $stateParams, toaster, $filter, ENV,$ionicHistory,
  $rootScope,$state, $localStorage,$sessionStorage,$ionicModal,$ionicPopup) {
     $scope.data=$sessionStorage.rtistatusresponse;
     $scope.lang = $localStorage.langNewId;
     $scope.vieHistoryData = $localStorage.vieHistoryData
     console.log("data"+ $scope.data)
     console.log('$scope.vieHistoryData 22', $scope.vieHistoryData)
     $scope.showRTIAtt = false;
     $scope.zoomedIn = false;

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
       var getDepartmentId = function(){
           RestService.getDepartId($scope.data.orgId,"RAF")
               .then(function (response) {
               console.log("department id response"+JSON.stringify(response));
               $ionicLoading.hide();
               $scope.DepartmentIdGet = response;
               console.log("department OD "+$scope.ServiceIdGet)
             }, function (err) {
               $ionicLoading.hide();
               toaster.error($filter('translate')('RTIAPIERROR')/* , $filter('translate')('ERROR_OCCURED') */);
             });
             RestService.getDepartmentByOrg($scope.data.orgId)
          .then(function(response){
            console.log("department"+JSON.stringify(response));
            if(response.length > 0){
                var listResponse = response;
                $scope.departmentList = new Array();
                for(var i=0;i<listResponse.length;i++){
                 if(listResponse[i].lookUpCode=="RTI"){
                    if($localStorage.langNewId == "2"){
                        $scope.departmentList.push({
                            value : listResponse[i].lookUpId,
                            name : listResponse[i].descLangSecond
                          })
                    }else{
                      $scope.departmentList.push({
                        value : listResponse[i].lookUpId,
                        name : listResponse[i].descLangFirst
                      })
                    }
                  }
                }
                console.log("preparation"+JSON.stringify($scope.departmentList))

              $ionicLoading.hide();
            }
            else {
                    $ionicLoading.hide();
                    toaster.error($filter('translate')('RTIAPIERROR')/* , $filter('translate')('ERROR_OCCURED') */);
                 }
          },function(err){
                toaster.error($filter('translate')('RTIAPIERROR')/* , $filter('translate')('ERROR_OCCURED') */);
                $ionicLoading.hide();
          })
        }

        $scope.RTIArrays = [];

        $scope.getRTIAttachmentId = function(){
          console.log("Attachment Data", $scope.data.documentList)
                
          $scope.RTIArrays = $scope.data.documentList;

          if($scope.RTIArrays.length>0){
            $scope.showRTIAtt = true;

            for(i=0;i<$scope.RTIArrays.length;i++){
              var documentType = $scope.RTIArrays[i].documentName.split('.');
              documentType = documentType[1];
              console.log("$scope.documentType2",documentType);
              var key = 'docType';
              $scope.RTIArrays[i][key] = documentType;
            }
            console.log("$scope.RTIArrays",$scope.RTIArrays, $scope.showRTIAtt);
                        
          } else {
            $scope.showRTIAtt = false;
          }
            // $scope.getComplaintDoc();
        }

        $scope.openCitizenDoc = function(toggleValue1){
          // console.log("Citizen Toggle",toggleValue1);
          $scope.showCitizenDoc = !toggleValue1;
        }

        $scope.zoomPic = function(id, type, docDes){
          console.log("Id Selected", id, type, docDes);
          $scope.zoomedIn = true;

          const myArrayFiltered = $scope.RTIArrays.filter((el) => {
            return id === el.attachmentId;
          });
          $scope.imageZoomed = myArrayFiltered[0].documentByteCode;
          console.log("myArrayFiltered",myArrayFiltered, myArrayFiltered[0].documentByteCode);
          if(type=="pdf" || type=="doc" || type== "docx"){
              toaster.error($filter('translate')('CANTPREVIEWTHISFILE'));
          }
      }

      $scope.zoomPicClose = function(){
        $scope.zoomedIn = false;
      }

        
      var _init = function (){

        $scope.getRTIAttachmentId();
        
        RestService.getNHPrefixData("ATP",$scope.data.orgId).then(function (TACresponse) {
                   console.log("TACresponse=="+TACresponse);
                   for(var i=0;i<TACresponse.length;i++){
                    if($scope.data.applicationType==TACresponse[i].lookUpId){
                     if($localStorage.langNewId == "2"){
                       $scope.aaplType = TACresponse[i].descLangSecond
                       }else{
                        $scope.aaplType = TACresponse[i].descLangFirst
                       }
                    }
                   }
                },function (err){
                  toaster.error($filter('translate')('RTIAPIERROR')/* , $filter('translate')('ERROR_OCCURED') */);
              })
	      $scope.getNonHDatanew1("ATP","aptoptions",$scope.data.orgId);
	      $scope.getNonHDatanew1("TTL","ttloptions",$scope.data.orgId);
	      $scope.getNonHDatanew1("GEN","genoptions",$scope.data.orgId);
	      $scope.getNonHDatanew1("RRM","refernecModeOptions",$scope.data.orgId);
	      $scope.getNonHDatanew1("RIT","refernecInwardOptions",$scope.data.orgId);
	      getDepartmentId();
	      
  		}
      _init();

  });
