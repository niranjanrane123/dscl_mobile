angular.module('starter')

  .controller('pDataEntryView', function ($scope, RestService, $ionicLoading, $stateParams, toaster,
  $filter, ENV, $state, $rootScope,$localStorage,$sessionStorage,$ionicPopup,$ionicHistory) {
  $scope.orgid = $localStorage.LoginData.orgId;
  $scope.ownersDetails = new Array();
  $scope.showJoint = $localStorage.joint;
  $scope.showSingle = $localStorage.single;
  $scope.showOther = $localStorage.Other;
  $scope.nameOfLabel = $localStorage.ownerTytpe;
  $scope.typeO = $localStorage.ownerTytpe;
  $scope.landData = $localStorage.masterDtoLand1;
  console.log("landDataValue "+$scope.checkLand);
  $scope.landData2 = $localStorage.masterDtoLandShow;
  $scope.address =  $localStorage.mseterDtoobjShow;
  $scope.assesArray = $localStorage.floorDetailsk;
  console.log("year check"+$scope.assesArray.year);
  $scope.yearFllor = $localStorage.yearI;
  $scope.yearOfAqa = $localStorage.aqayear;
  $scope.waterArray = $localStorage.provisionalAssesmentDetailDtoList;
  $scope.isWater = $localStorage.waterCheck;
  $scope.arrearsEntry = $localStorage.arreasEntery;
    $scope.ownerDtlDto = $localStorage.ownerDto;
    $scope.masterDto1 = $localStorage.masterDtoLand1;
    $scope.masterDto2 = $localStorage.mseterDtoobj;
    $scope.provisionalAssesmentDetailDtoList = $localStorage.provisionalAssesmentDetailDtoList;
    console.log("check 2nd"+$localStorage.provisionalAssesmentDetailDtoList)
    $scope.provAsseFactDtlDto = $localStorage.provAsseFactDtlDto;
  if($localStorage.langNewId == "1"){
  $scope.nameOfLabel = "Name of "+$scope.nameOfLabel;
 }else{
  $scope.nameOfLabel = $scope.nameOfLabel+" का नाम";
 }

 if($scope.waterArray.length == 0){
   $scope.isWater = false;
 }
  function isEmpty(obj) {
      for(var key in obj) {
          if(obj.hasOwnProperty(key))
              return false;
      }
      return true;
  }
  if($scope.showJoint){
    $scope.arrayShow1 = $localStorage.tempArray1;
  }else if($scope.showSingle){
    $scope.arrayShow1 = $localStorage.tempArray1;
        $scope.nameowner = $scope.arrayShow1.assoOwnerName;
        $scope.pdegender = $scope.arrayShow1.gender;
        $scope.PDErelation = $scope.arrayShow1.relation;
        $scope.PDEgurdian = $scope.arrayShow1.gurdian;
        $scope.PDEmobile = $scope.arrayShow1.mobile;

  }else{
    $scope.objectShow1 = $localStorage.tempArray1;
    $scope.PDEnameof = $scope.objectShow1.assoOwnerName;
    $scope.PDEcontactperson = $scope.objectShow1.PDEcontactperson;
    $scope.PDEmobile = $scope.objectShow1.mobile;
  }

  $scope.sbmit = function(){
      var ProvisionalAssesmentMstDto = {}

       ProvisionalAssesmentMstDto.assOldpropno = $scope.landData.assOldpropno;
       ProvisionalAssesmentMstDto.assLandType = $scope.landData.assLandType;
       ProvisionalAssesmentMstDto.assDistrict = $scope.landData.assDistrict;
       ProvisionalAssesmentMstDto.assTahasil = $scope.landData.assTahasil;
       ProvisionalAssesmentMstDto.tppVillageMauja = $scope.landData.tppVillageMauja;
       ProvisionalAssesmentMstDto.tppPlotNoCs = $scope.landData.tppPlotNoCs;
       ProvisionalAssesmentMstDto.halkano = $scope.landData.halkano;
       ProvisionalAssesmentMstDto.mohalla = $scope.landData.mohalla;
       ProvisionalAssesmentMstDto.assStreetNo = $scope.landData.assStreetNo;
       ProvisionalAssesmentMstDto.tppPlotNo = $scope.masterDto1.tppPlotNo;
       ProvisionalAssesmentMstDto.assOwnerType = $localStorage.ownerType;
       ProvisionalAssesmentMstDto.lgIpMac= $localStorage.macAddress;
       ProvisionalAssesmentMstDto.orgId = $scope.orgid;
       //ProvisionalAssesmentMstDto.smServiceId = 850;

       ProvisionalAssesmentMstDto.assAddress = $scope.masterDto2.assAddress;
       ProvisionalAssesmentMstDto.locId = $scope.masterDto2.locId;
       ProvisionalAssesmentMstDto.assPincode = $scope.masterDto2.assPincode;
       ProvisionalAssesmentMstDto.assCorrAddress = $scope.masterDto2.assCorrAddress;
       ProvisionalAssesmentMstDto.assCorrPincode = $scope.masterDto2.assCorrPincode;
       ProvisionalAssesmentMstDto.assWard1 = $scope.masterDto2.assWard1;
       ProvisionalAssesmentMstDto.assWard2 = $scope.masterDto2.assWard2;
       ProvisionalAssesmentMstDto.propLvlRoadType = $scope.masterDto2.propLvlRoadType;
       ProvisionalAssesmentMstDto.assAcqDate = $scope.masterDto2.assAcqDate;
       ProvisionalAssesmentMstDto.assPlotArea = $scope.masterDto2.assPlotArea;
       ProvisionalAssesmentMstDto.taxCollEmp = $scope.masterDto2.taxCollEmp;
       ProvisionalAssesmentMstDto.provisionalAssesmentDetailDtoList =  $localStorage.provisionalAssesmentDetailDtoList;
       ProvisionalAssesmentMstDto.provisionalAssesmentOwnerDtlDtoList = $scope.ownerDtlDto;
       //ProvisionalAssesmentMstDto.provisionalAssesmentDetailDtoList.provisionalAssesmentFactorDtlDtoList = $localStorage.factorDto;

       var savePropertyData2 = {
           billMasList : $scope.arrearsEntry,
           provisionalMas : ProvisionalAssesmentMstDto,
           deptId : $sessionStorage.ddeeppttId,
           empId : $sessionStorage.usseerrID,
           languageId : 1,
           finYear : parseInt($localStorage.yearI)
        }
           console.log("request"+JSON.stringify(savePropertyData2));
           if($localStorage.langNewId == "2"){
             $ionicLoading.show({	template: 'कृपया प्रतीक्षा करें...'	});
           }else{
             $ionicLoading.show({	template: 'Please wait...'	});
           }
          RestService.savePropertyData(savePropertyData2)

             .then(function(response){
                    $ionicLoading.hide();
                    console.log("property Response"+response);
                     var alertPopup = $ionicPopup.alert({
                    title: $filter('translate')('PROPERTYDATA'),
                    template: $filter('translate')('PROPERTYNUMBERIS') +response.proertyNo,
                    buttons : [{
                       text : $filter('translate')('OK'),
                       type : 'button button-block button-positive customBgColor',
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

                 },function(err){
                       $ionicLoading.hide();
                       toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR_OCCURED'));
                       $ionicLoading.hide();
                 })

 }

 $scope.factorS = {
     factorDescr: function(assfFactorValueId){
     console.log("idY"+assfFactorValueId)
     console.log("factor check"+JSON.stringify($scope.factors));
       for(var y = 0; y < $scope.factors.length;y++){
           if(assfFactorValueId == $scope.factors[y].value){
             console.log("1stcheck"+$scope.factors[y].name);
             return $scope.factors[y].name;
           }
       }
     },
     getYear: function(yearId){
       for(var y = 0; y < $scope.yesrNewList.length;y++){
          console.log("show1"+yearId+"show second"+$scope.yesrNewList[y].id)
           if(yearId == $scope.yesrNewList[y].id){
             console.log("2ndcheck"+$scope.yesrNewList[y].value);
             return $scope.yesrNewList[y].value;
           }
       }
     }
   }
   var init_ = function(){
       RestService.getYeardata($sessionStorage.ddeeppttId,$scope.orgid)
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
      RestService.getNHPrefixData("WCF",$scope.orgid)
        .then(function(response){
          console.log("water factor"+JSON.stringify(response));
          if(response.length > 0){
              var listResponse = response;
              $scope.factors = new Array();
              for(var i=0;i<listResponse.length;i++){
              if($localStorage.langNewId == "2"){
              $scope.factors.push({
                  value : listResponse[i].lookUpId,
                  name : listResponse[i].descLangSecond
                })
              }else{
                $scope.factors.push({
                  value : listResponse[i].lookUpId,
                  name : listResponse[i].descLangFirst
                })
                }
              }
              console.log("preparation"+JSON.stringify($scope.factors))

            $ionicLoading.hide();
          }
          else {
            $ionicLoading.hide();
            toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR_OCCURED'));

          }
        },function(err){
          toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR_OCCURED'));
          $ionicLoading.hide();

        })
         RestService.getYear()
                      .then(function(response){
          console.log("location year"+JSON.stringify(response))
          var obj = response;
          $scope.yesrNewList = new Array();
          for (var key in obj) {
            if (obj.hasOwnProperty(key)) {
              var val = obj[key];
               $scope.yesrNewList.push({
                id:key,
                value:val
               })
               //console.log(key);console.log(val);
            }
          }

         console.log("year list"+JSON.stringify($scope.yesrNewList))
      },function(err){
            toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR_OCCURED'));
            $ionicLoading.hide();
      })
   }
   $scope.getData = {
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
   init_();
  })
