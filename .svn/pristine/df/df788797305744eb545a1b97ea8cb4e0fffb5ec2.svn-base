    angular.module('starter')
      .controller('experienceModalCtrl', function ($scope, RestService, $ionicLoading, $stateParams, toaster, $sessionStorage,
          $filter, ENV, $state, $rootScope,$localStorage) {


    console.log("$localStorage.responselogindata---"+JSON.stringify($localStorage.responselogindata));
    //$scope.orgId = $localStorage.responselogindata.orgId;
    $scope.orgid = $localStorage.selectedorgID;
    $rootScope.getNonHData("PFT","firmList",$scope.orgId);
    $rootScope.getNonHData("GEN","genList",$scope.orgId);

    $scope.receiptCollections_ = {};
    $scope.receiptCollections_.list = [];
    $scope.yearEx = null;
    $scope.calculateYear = function(){
     $scope.experience = null;
     $scope.experience = (Date.parse($scope.toDate) - Date.parse($scope.fromDate)) / 31536000000
     $scope.experience =  parseFloat($scope.experience.toFixed(2));

    }

    $scope.changeAttr = function(item){
      if($scope.toDate == "" || $scope.toDate == null || $scope.toDate == undefined )
        item.currentTarget.setAttribute("placeholder","to date");
      else item.currentTarget.setAttribute("placeholder","");
    }
    $scope.changeAttr2 = function(item){
      if($scope.fromDate == "" || $scope.fromDate == null || $scope.fromDate == undefined )
        item.currentTarget.setAttribute("placeholder","from date");
      else item.currentTarget.setAttribute("placeholder","");
    }
    $scope.additionalOwner = function(saveaction){

      if($scope.action == "new"){
        $scope.receiptCollections_.list.push({
          	plumExpId: 0,
            plumId: null,
            plumCompanyName: $scope.empName,
            plumCompanyAddress: $scope.empAddress,
            plumExpMonth: null,
            plumExpYear: null,
            orgId: null,
            userId: null,
            langId: 0,
            lmodDate: null,
            updatedBy: null,
            updatedDate: null,
            lgIpMac: null,
            lgIpMacUpd: null,
            expFromDate: Date.parse($scope.fromDate),
            expToDate: Date.parse($scope.toDate),
            experience: $scope.experience,
            firmType: $scope.firmType,
            totalExprience: null
        })
        $sessionStorage.receiptArray2 = $scope.receiptCollections_.list;
      }
      console.log("after push: "+JSON.stringify($sessionStorage.receiptArray2));
      $rootScope.$broadcast('ExperienceEv',$sessionStorage.receiptArray2);

      if(saveaction == "savenew"){
        $scope.empName = '';
        $scope.empAddress = '';
        $scope.fromDate = '';
        $scope.toDate = '';
        $scope.experience = '';
        $scope.firmType = '';

        $rootScope.modalAction = "new";
      }
      else $scope.closeModal2();
    }

    $scope.$on('ExperienceModalEv', function (event, data){
      $scope.RCOpenModalData = JSON.parse(data);
      console.log("$scope.RCOpenModalData--"+JSON.stringify($scope.RCOpenModalData));
      console.log("|action: "+$scope.RCOpenModalData.action);

      $scope.action = $scope.RCOpenModalData.action;
      console.log("scope.action: "+$scope.action);
      if($scope.action == "new"){
         $scope.empName = '';
         $scope.empAddress = '';
         $scope.fromDate = '';
         $scope.toDate = '';
         $scope.experience = '';
         $scope.firmType = '';

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
