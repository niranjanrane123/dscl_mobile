angular.module('starter')
    .controller('NearByStopsCTRL', function ($scope, RestService, $ionicLoading, $stateParams, toaster, $filter, ENV, $ionicHistory,
        $state, $localStorage, $sessionStorage, $ionicModal, $ionicPopup, $rootScope, $ionicPlatform) {
        $scope.orderByDate = 'DueDate';
        $scope.reverseOrder = false;
        $scope.heading = $filter('translate')('EBUSNEARBYSTOPS');
        var dtFormat1 = 'YYYY-MM-DD HH:mm:ss',
            dtFormat2 = 'MMM DD, YYYY',
            dtFormat3 = 'YYYY-MM-DD',
            dtFormat4 = 'MMM DD, YYYY HH:mm',
            syncing = true,
            syncEvent;
        $scope.search = {};
        $scope.isCompleted = false;
        $scope.navTitle = "Service Orders";
        $scope.JobTypeNameForFilter = [];
        $scope.CustomerNames = [];
        $scope.unsynced = [];
        $scope.data = {
            "nearByStops": [
                {
                    "PK_PoiId": 75,
                    "Latitude": 12.979366302490234,
                    "PoiName": "Stop 3",
                    "Longitude": 77.60430145263672
                },
                {
                    "PK_PoiId": 100,
                    "Latitude": 12.977484703063965,
                    "PoiName": "DS02",
                    "Longitude": 77.60853576660156
                }
            ],
            "status": true
        }
        $scope.respcompainList = $scope.data.nearByStops;


        $scope.getNearByStops=function(token){
               
            var params = { "tenantCode": "dscl", "lat": $sessionStorage.routLat, "lon": $sessionStorage.routLon, "radius": 2000 }
            RestService.nearByBusStops(params,token).then(function (resp) {
                if (resp == undefined || resp == null || resp == "") {
                    toaster.error($filter('translate')('ERROR'), $filter('translate')('COMPLERROR'));
                    $ionicLoading.hide();
                }
                else {
                    $scope.respcompainList = resp.data.nearByStops;
                    $ionicLoading.hide();
                }
                $ionicLoading.hide();
            },
                function (err) {
                    if (err.status == 401){
                        $scope.AccessToken('nearby');
                        console.log("if got true in err");
                      } 
                    $ionicLoading.hide();
                    //toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR'));
                    console.log("Error in Bus Route nearbystops",err)
                    // toaster.error($filter('translate')('EBUSTHIRDPARTYERROR'));
                })
        }

        
      $scope.AccessToken = function(type){
        console.log('$rootScope.swmAccessToken' + $rootScope.swmAccessToken, type)
      
          RestService.getAccessToken().then(function (data) {
            $rootScope.swmAccessTokenData = data.access_token;
            console.log($rootScope.swmAccessToken,"rrot scope toke")
            console.log(data.access_token,"data toke")

            if(type == 'nearby'){
              console.log("Entered waypt");
 
              $scope.getNearByStops($rootScope.swmAccessTokenData);
            }
          },
            function (err) {
              toaster.error($filter('translate')('ACCESSTOKENFAILED'));
            })
      }



        // By Stop :
        // 1(Distinct Stop) - 5(Near By Stops) - 9(Arriving Buses List) - 10(Enrouted Details)/7(Trip Planner Details) - 18(Get Fare Details)

        // By Route :
        // 2(Get Route) - 3(Route Type)(Exceptional) - 20(Time Table Details) - 10(Enrouted Details)/4(Route Details) - 18(Get Fare Details) - 8(Scheduled Trip Details) - 6(WayPointDetails)

        // Grievance :
        // 14(Get Incident Types) - 13(Get Incident Sub Types) - 11(Create Grievance)/15(Create SOS Alarm) - 12(Get Complaints) - 16(Get Complaint By Id) - 17(Get Grievance Lifecycle) - 19(Insert Citizen Feedback)


        function scrollTop() {
            $ionicScrollDelegate
                .$getByHandle('so-handle')
                .scrollTop(true);
        };


        $scope.resetFilter = function () {
            $scope.search.CompletionDate = undefined;
            $scope.search.JobTypeName = '';
            $scope.search.CustomerName = '';
            $scope.unsynced = [];
        }


        $scope.view = {
            tabs: {
                bystop: true,
                byroute: false
            },
            reset: function () {
                var self = this;
                this.jobs = [];
                this.moreDataCanBeLoaded = true;
                //When navigated from dashboard
                this.selectedTab = 'bystop'
            },
            init: function () {
                if($localStorage.langID == "2"){
                    $ionicLoading.show({ template: 'लोड हो रहा है...'    });
                  }else{
                    $ionicLoading.show({ template: 'Loading...'    });
                  }

                  var token = $rootScope.swmAccessTokenData;
                  $scope.getNearByStops(token);
               
            },
            onJobClick: function (job) {
                $sessionStorage.PK_PoiId = job.stopId;
                $state.go("app.arrivingbus");
            },
            onTabClick: function (selectedTab) {
                var self = this;
                this.selectedTab = selectedTab;
                _.each(this.tabs, function (tab, tabIndex) {
                    if (tabIndex === selectedTab)
                        self.tabs[selectedTab] = true;
                    else
                        self.tabs[tabIndex] = false;
                });
                scrollTop();
            },

            onRefresh: function (handle) {
                var self = this;
            },

            onDeviceBack: function () {
                if (App.isLoadingShown())
                    $ionicLoading.hide();
                else
                    App.goBack(-1);
            }
        };


        $scope.$on('$ionicView.beforeEnter', function () {
            var view = $scope.view;
            view.reset();
            view.init();
        });

        $scope.$on('$ionicView.enter', function () {
            syncEvent = $rootScope.$on('service:order:marked:as:synced', function () {
                $scope.view.refreshSyncStatus();
            });

            $ionicPlatform.onHardwareBackButton($scope.view.onDeviceBack);
        });

        $scope.$on('$ionicView.leave', function () {
            syncEvent();
            $ionicPlatform.offHardwareBackButton($scope.view.onDeviceBack);
        });
        $scope.myGoBack=function(){
            $state.go('app.itshome')
        }
    })
