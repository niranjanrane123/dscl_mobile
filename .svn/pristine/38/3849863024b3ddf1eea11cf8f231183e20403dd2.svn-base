angular.module('starter')
  .controller('rtiApplicantHistoryCtrl', function ($rootScope,$scope, RestService, $ionicLoading, $stateParams, toaster, $filter, ENV,$ionicHistory,
  $rootScope,$state, $localStorage,$sessionStorage,$ionicModal,$ionicPopup) {
     $scope.data=$sessionStorage.rtistatusresponse;
     $scope.lang = $localStorage.langNewId;
     $scope.vieHistoryData = $localStorage.vieHistoryData
     console.log("data"+ $scope.data)
     console.log('$scope.vieHistoryData 22', $scope.vieHistoryData)
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
      var _init = function (){
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
