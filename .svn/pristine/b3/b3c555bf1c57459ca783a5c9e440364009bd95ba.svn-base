angular.module('starter')
  .controller('EnvironmentPageCtrl', function ($scope, $sessionStorage, $ionicPopup, $location, RestService, $ionicLoading, $stateParams, toaster,
    $filter, ENV, dateFilter, $state, $ionicSideMenuDelegate, $rootScope, $localStorage) {
    $scope.enviornmentData = null;
    $scope.complaintReferenceCategory = null;
    var access_token;
    $scope.languageId = 1;
    var _init = function () {
      //only calls when token is null
      if ($localStorage.langID == "2") {
        $ionicLoading.show({ template: 'लोड हो रहा है...' });
      } else {
        $ionicLoading.show({ template: 'Loading...' });
      }
      RestService.retriveNonHData().then(function (resp) {
        if (resp) {
          $scope.languageId = $localStorage.langNewId;
          $scope.locationoptions = resp;
          for (var i = 0; i < $scope.locationoptions.length; i++) {
            if ($localStorage.langNewId == "2") {
              $scope.locationoptions[i].name = $scope.locationoptions[i].descLangSecond;
              // $scope.locationoptions[i].push({
              //   name: $scope.locationoptions[i].descLangSecond
              // })
            } else {
              $scope.locationoptions[i].name = $scope.locationoptions[i].descLangFirst
              // $scope.locationoptions[i].push({
              //   name: $scope.locationoptions[i].descLangFirst
              // })
            }
          }
        }
        $ionicLoading.hide();
      },
        function (err) {
          $ionicLoading.hide();
          toaster.error($filter('translate')('ENVIRONMENTERROR'), $filter('translate')('ENVIRONMENTERROR'));
        })
      // RestService.getEnvironmentAccessToken().then(function (data) {
      //   if (data) {
      //     access_token = data.data.access_token;
      //     $ionicLoading.hide();
      //   }
      // },
      RestService.getEnvironmentAccessToken().then(function (data) {
        if (data) {
          $rootScope.swmAccessTokenEnv = data.data.access_token;
          $ionicLoading.hide();
        }
      },
        function (err) {
          $ionicLoading.hide();
        })
    }
    $scope.reset = function () {
      console.log("reset function is caling")
      $scope.devices = null;
      console.log($scope.departmentLoc,"reset value")
      }
    $scope.locationpincode = function () {
      if ($scope.complaintReferenceCategory != null) {
        if ($localStorage.langID == "2") {
          $ionicLoading.show({ template: 'लोड हो रहा है...' });
        } else {
          $ionicLoading.show({ template: 'Loading...' });
        }
        RestService.getEnviornmentData(access_token, $scope.complaintReferenceCategory).then(function (resp) {
          if (resp) {
            console.log("enviv=",resp);
            $scope.enviornmentData = resp.Environment.data;
            $scope.devices = [];
            $scope.tags = [];
            var i = 0;
            for (var key in $scope.enviornmentData) {
              if (key != 'DATE_TIME' && key != 'MAC')
                $scope.devices.push(key)
              $scope.tags.push($scope.enviornmentData[$scope.devices[i]])
              i++;
            } 
          }
          $ionicLoading.hide();
        },
          function (err) {
            $ionicLoading.hide();
            toaster.error($filter('translate')('ENVIRONMENTERROR')/* , $filter('translate')('ENVIRONMENTERROR') */);
          })
      }

    }
    _init();
  });
