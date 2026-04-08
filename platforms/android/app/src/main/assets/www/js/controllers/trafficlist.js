angular.module('starter')

  .controller('TrafficListPageCtrl', function ($scope, $sessionStorage, $ionicPopup, $location, RestService, $ionicLoading, $stateParams, toaster,
    $filter, ENV, dateFilter, $state, $ionicSideMenuDelegate, $rootScope, $localStorage) {

    $scope.getDashBoardData = [];
    $scope.getDashBoardDataPage = [];
    $scope.totalPagination = 0;
    $scope.currentPagination = 0;
    $scope.currentPaginationArray = [];
    $scope.mysearch = '';
    $scope.langID = $localStorage.langID;
    $scope.orgid = $localStorage.selectedorgID;
    $scope.getDashBoardDataFun = function () {

      RestService.getTrafficList().then(function (response) {
        console.log("deptresponse--" + response);
        $scope.getDashBoardData = response;
        if (response == undefined || response == null || response == "") {
          toaster.error($filter('translate')('TRAFFICERROR')/* , $filter('translate')('ERROR') */);
          $ionicLoading.hide();
          return false;
        }
        else if ($scope.getDashBoardData.length > 0) {
          console.log("$scope.getDashBoardData");
          $scope.totalPagination = parseInt($scope.getDashBoardData.length / 8);
          if ($scope.totalPagination * 8 != $scope.getDashBoardData.length)
            $scope.totalPagination = $scope.totalPagination + 1;
          $scope.getDashBoardDataPageData(0);
          for (var i = 0; i < $scope.totalPagination; i++)
            $scope.currentPaginationArray.push(i);
        }
        $ionicLoading.hide();
      }, function (err) {
        toaster.error($filter('translate')('TRAFFICERROR')/* , $filter('translate')('ERROR') */);
        $ionicLoading.hide();
      })
    }

    $scope.calculateIndex = function (index) {
      console.log("$scope.currentPagination" + $scope.currentPagination);
      if ($scope.currentPagination == 0) {
        return index + 1;
      } else {
        return ($scope.currentPagination) * 8 + index;
      }
    }
    $scope.getDashBoardDataPageData = function (page, option) {
      if (option == 'fix')
        $scope.pagginationSelect = page;

      $scope.currentPagination = page;
      var minD = page * 8, maxD = minD + 8;
      $scope.getDashBoardDataPage = [];
      $scope.getDashBoardData.forEach((entry, index) => {
        if (index >= minD && index < maxD)
          $scope.getDashBoardDataPage.push(entry);
      });
    }

    $scope.viewHistory = function (data) {
      $sessionStorage.applicationHistoryId = data.appId;
      $state.go('app.applicationHistory');
    }
    $scope.viewApplication = function (data) {

      if (data.serviceName == "Complaint Registration") {
        $ionicLoading.show({ template: $filter('translate')('LOADING') });
        RestService.getGrievanceStatus(data.appId, $localStorage.langID).then(function (complaintstatusresponse) {
          if (complaintstatusresponse == "" || complaintstatusresponse == undefined) {
            toaster.error($filter('translate')('VALIDTOKEN'));
            $ionicLoading.hide();
          } else {
            $sessionStorage.complaintstatusresponse = complaintstatusresponse;
            $sessionStorage.complaintstatusresponseHome = true;
            $state.go("app.compstatusdetail");
          }
          $ionicLoading.hide();
        },
          function (err) {
            $ionicLoading.hide();
            toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR'));
          })
      }
      else if (data.serviceName == "File RTI On-line") {
        $ionicLoading.show({ template: $filter('translate')('LOADING') });
        RestService.fetchInformationByApplicationid(data.appId, $scope.orgid).then(function (complaintstatusresponse) {
          if (complaintstatusresponse == "" || complaintstatusresponse == undefined) {
            toaster.error($filter('translate')('VALIDTOKEN'));
            $ionicLoading.hide();
          } else {
            $sessionStorage.rtistatusresponse = complaintstatusresponse;
            $state.go("app.rtiapplicationHistory");
          }
          $ionicLoading.hide();
        },
          function (err) {
            $ionicLoading.hide();
            toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR'));
          })
      }
    }
    $scope.getNumber = function (num) {
      return new Array(num);
    }
    var _init = function () {
      $scope.getDashBoardDataFun();
    };
    _init();

  })