    angular.module('starter')
      .controller('modalCtrl', function ($scope, RestService, $ionicLoading, $stateParams, toaster, $sessionStorage,
          $filter, ENV, $state, $rootScope,$localStorage) {


    console.log("$localStorage.responselogindata---"+JSON.stringify($localStorage.responselogindata));
    //$scope.orgId = $localStorage.responselogindata.orgId;
    $scope.orgid = $localStorage.selectedorgID;
    $rootScope.getNonHData("TTL","ttlList",$scope.orgId);
    $rootScope.getNonHData("GEN","genList",$scope.orgId);
    $scope.selectAction = function(name){
      //console.log("clicked yatin"+name)
    }
    $scope.savemodaldata = function()
    {
    console.log("$scope.WNCselecttitle---"+$scope.WNCselecttitle);
    console.log("$scope.WNCFirstname---"+$scope.WNCFirstname);
    console.log("$scope.WNCMiddlename---"+$scope.WNCMiddlename);
    console.log("$scope.WNCLastname---"+$scope.WNCLastname);
    console.log("$scope.WNCgender---"+$scope.WNCgender);
    console.log("$scope.WNCaadharnumber---"+$scope.WNCaadharnumber);
    $state.go("app.ChangeofOwner");
    }


    $scope.receiptCollections_ = {};
    $scope.receiptCollections_.list = [];

    $scope.additionalOwner = function(saveaction){

      if($scope.action == "new"){
        $scope.receiptCollections_.list.push({
    //			action: action,
          /*id: id,
          amount: amount*/
          ownerTitle:$scope.WNCselecttitle,
          ownerFirstName:$scope.WNCFirstname,
          ownerMiddleName:$scope.WNCMiddlename,
          ownerLastName:$scope.WNCLastname,
          cao_id:null,
          csIdn:null,
          cao_address:null,
          cao_contactno:null,
          orgid:null,
          userId:null,
          langId:null,
          lmoddate:null,
          updatedBy:null,
          updatedDate:null,
          lgIpMac:null,
          lgIpMacUpd:null,
          gender:$scope.WNCgender.value,
          gender_name:$scope.WNCgender.name,
          caoUID:null,
          caoNewTitle:$scope.WNCselecttitle,
          caoNewFName:$scope.WNCFirstname,
          caoNewMName:$scope.WNCMiddlename,
          caoNewLName:$scope.WNCLastname,
          caoNewGender:$scope.WNCgender.value,
          caoNewUID:null,
          isDeleted:null
    //			amount : $scope.CRRCAmount
        })
        $sessionStorage.receiptArray = $scope.receiptCollections_.list;
      }
      else{
    //console.log("else part me aaya");
    //			$sessionStorage.receiptArray[index].amount = $scope.CRRCAmount;
      }
      console.log("$sessionStorage.receiptArray after push: "+JSON.stringify($sessionStorage.receiptArray));
      $rootScope.$broadcast('RCChangeEvt',$sessionStorage.receiptArray);

      if(saveaction == "savenew"){
        $scope.WNCselecttitle = '';
        $scope.WNCFirstname = '';
        $scope.WNCMiddlename = '';
        $scope.WNCLastname = '';
        $scope.WNCgender = '';
    //		$scope.CRRCAmount = "";
        $rootScope.modalAction = "new";
      }
      else $scope.closeModal();
    }

    $scope.$on('RCOpenModalEvt', function (event, data){
      $scope.RCOpenModalData = JSON.parse(data);
      console.log("$scope.RCOpenModalData--"+JSON.stringify($scope.RCOpenModalData));
      console.log("|action: "+$scope.RCOpenModalData.action);

      $scope.action = $scope.RCOpenModalData.action;
      console.log("scope.action: "+$scope.action);
      if($scope.action == "new"){
        $scope.WNCselecttitle = '';
        $scope.WNCFirstname = '';
        $scope.WNCMiddlename = '';
        $scope.WNCLastname = '';
        $scope.WNCgender = '';
    //		$scope.CRRCAmount = "";
        $rootScope.modalAction = "new";
      }
      else {
        $scope.WNCselecttitle = $scope.RCOpenModalData.ownerTitle;
        $scope.WNCFirstname = $scope.RCOpenModalData.ownerFirstName;
        $scope.WNCMiddlename = $scope.RCOpenModalData.ownerMiddleName;
        $scope.WNCLastname = $scope.RCOpenModalData.ownerLastName;
        $scope.WNCgender = $scope.RCOpenModalData.gender;
    //		$scope.CRRCAmount = $scope.RCOpenModalData.amount;
        $rootScope.modalAction = "edit";
      }
      console.log("receiptHeadList in the end: "+JSON.stringify($scope.receiptHeadsList));
    });

    function findWithAttr(array, attr, value) {
        for(var i = 0; i < array.length; i += 1) {
            if(array[i][attr] === value) {
                return i;
            }
        }
        return -1;
    }
    var _init = function (){

    };
    _init();
  });
