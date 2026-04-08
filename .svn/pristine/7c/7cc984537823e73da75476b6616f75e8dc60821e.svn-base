    angular.module('starter')
      .controller('professModalCtrl', function ($scope, RestService, $ionicLoading, $stateParams, toaster, $sessionStorage,
          $filter, ENV, $state, $rootScope,$localStorage) {


    console.log("$localStorage.responselogindata---"+JSON.stringify($localStorage.responselogindata));
    //$scope.orgId = $localStorage.responselogindata.orgId;
    $scope.orgid = $localStorage.selectedorgID;
    $rootScope.getNonHData("ECN","ttlList",$scope.orgId);
    $rootScope.getNonHData("GEN","genList",$scope.orgId);

    $scope.receiptCollections_ = {};
    $scope.receiptCollections_.list = [];

    $scope.changeAttr = function(item){
        if($scope.doPassing == "" || $scope.doPassing == null || $scope.doPassing == undefined )
          item.currentTarget.setAttribute("placeholder","to date");
        else item.currentTarget.setAttribute("placeholder","");
    }
    $scope.additionalOwner = function(saveaction){

      if($scope.action == "new"){
        $scope.receiptCollections_.list.push({
          plumQualId: 0,
          plumId: null,
          plumQualification: $scope.qualification,
          plumPassMonth: Date.parse($scope.doPassing),
          plumPassYear: null,
          plumPercentGrade: $scope.percent,
          plumInstituteName: $scope.instituteName,
          plumInstituteAddress: $scope.instituteAddress,
          orgId: null,
          userId: null,
          langId: 0,
          lmodDate: null,
          updatedBy: null,
          updatedDate: null,
          lgIpMac: null,
          lgIpMacUpd: null
        })
        $sessionStorage.receiptArray = $scope.receiptCollections_.list;
      }
      console.log("after push: "+JSON.stringify($sessionStorage.receiptArray));
      $rootScope.$broadcast('ProfessionEv',$sessionStorage.receiptArray);

      if(saveaction == "savenew"){
        $scope.qualification = '';
        $scope.instituteName = '';
        $scope.instituteAddress = '';
        $scope.dateOfPassing = '';
        $scope.percent = '';

        $rootScope.modalAction = "new";
      }
      else $scope.closeModal();
    }

    $scope.$on('ProfessionModalEv', function (event, data){
      $scope.RCOpenModalData = JSON.parse(data);
      console.log("$scope.RCOpenModalData--"+JSON.stringify($scope.RCOpenModalData));
      console.log("|action: "+$scope.RCOpenModalData.action);

      $scope.action = $scope.RCOpenModalData.action;
      console.log("scope.action: "+$scope.action);
      if($scope.action == "new"){
         $scope.qualification = '';
         $scope.instituteName = '';
         $scope.instituteAddress = '';
         $scope.dateOfPassing = '';
         $scope.percent = '';

         $rootScope.modalAction = "new";
      }
      else {
        $scope.qualification = $scope.RCOpenModalData.qualification;
        $scope.instituteName = $scope.RCOpenModalData.instituteName;
        $scope.instituteAddress = $scope.RCOpenModalData.instituteAddress;
        $scope.dateOfPassing = $scope.RCOpenModalData.dateOfPassing;
        $scope.percent = $scope.RCOpenModalData.percent;
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
