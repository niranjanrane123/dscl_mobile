angular.module('starter')
    .controller('TripPlannerCTRL', function ($scope, RestService, $ionicLoading, $stateParams, toaster, $filter, ENV, $ionicHistory,
        $state, $localStorage, $sessionStorage, $ionicModal, $ionicPopup, $rootScope) {
        $scope.orderByDate = 'DueDate';
        $scope.reverseOrder = false;
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
            "plannerDetails": [
                {
                    "RouteName": "R100",
                    "Destination": "Stop 3",
                    "Source": "Stop 1",
                    "PK_RouteId": 7590,
                    "fleetId": 245
                },
                {
                    "RouteName": "R200",
                    "Destination": "Stop 3",
                    "Source": "Stop 1",
                    "PK_RouteId": 7599,
                    "fleetId": null
                }
            ],
            "status": true
        }
        $scope.respcompainList = $scope.data.plannerDetails;


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
                var params = { "source": $sessionStorage.source, "destination": $sessionStorage.destination, "time": $sessionStorage.time }
                RestService.tripPlannerDetails(params).then(function (resp) {
                    if (resp == undefined || resp == null || resp == "") {
                        toaster.error($filter('translate')('ERROR'), $filter('translate')('COMPLERROR'));
                        $ionicLoading.hide();
                    }
                    else {
                        $scope.respcompainList = resp.data.nearByStops;
                    }
                    $ionicLoading.hide();
                },
                    function (err) {
                        $ionicLoading.hide();
                        toaster.error($filter('translate')('BUSROUTEERROR')/* , $filter('translate')('ERROR') */);
                    })
                var paramsfar = {
                    "srcId": $sessionStorage.source,
                    "destId": $sessionStorage.destination,
                    "routeId": 0
                }
                RestService.getFareDetails(paramsfar).then(function (resp) {
                    if (resp == undefined || resp == null || resp == "") {
                        toaster.error($filter('translate')('ERROR'), $filter('translate')('COMPLERROR'));
                        $ionicLoading.hide();
                    }
                    else {
                        $scope.respcompainList = resp.data.nearByStops;
                    }
                    $ionicLoading.hide();
                },
                    function (err) {
                        $ionicLoading.hide();
                        toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR'));
                    })
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
    })
