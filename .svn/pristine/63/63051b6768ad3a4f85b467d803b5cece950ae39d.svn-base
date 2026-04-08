angular.module('starter')
    .controller('EnroutedDetailsCTRL', function ($scope, RestService, $ionicLoading, $stateParams, toaster, $filter, ENV, $ionicHistory,
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
            "enroutedDet": [
                {
                    "dRAdultFare": 20.0,
                    "dRChildFare": 10.0,
                    "isDirectRoute": true,
                    "directRouteDet": {
                        "DepartureTime": "09:21,10:06,10:35,10:35,10:35,10:35,11:49,12:14,12:14,13:08,14:00, 14:14,14:25,14:48,15:45,15:57,16:00,16:01,16:25,17:06,23:40",
                        "DestinationName": "CIDCO BUS STAND",
                        "RouteName": "R18",
                        "SourceName": "Stop 1",
                        "RouteViaName": "RAILWAY STATION TO CIDCO BUS STAND",
                        "RouteId": 9618,
                        "ArrivalTime": "10:21,10:06,11:00,11:04,11:00,11:04,12:18,12:43,13:39,13:37,14:15, 14:43,14:45,15:17,16:14,16:26,16:15,16:30,16:45,17:35,00:09"
                    }
                },
                {
                    "eR1AdultFare": 5.0,
                    "DepartureTime": "08:02,09:07,10:12,11:17,16:26,17:50",
                    "eR1ChildFare": 0.0,
                    "CStopName": "CIDCO BUS STAND",
                    "SourceId": 117,
                    "SourceName": "Stop 1",
                    "RouteViaName": "G09",
                    "eR2ChildFare": 0.0,
                    "RouteId": 10620,
                    "DestinationId": 306,
                    "eR2AdultFare": 5.0,
                    "CRouteViaName": "CIDCO BUS STAND TO RAILWAY STATION",
                    "CRouteName": "R18",
                    "DestinationName": "SEVEN HILL",
                    "RouteName": "G09",
                    "CStopDepartureTime": "08:11,09:30,09:30,09:55,10:00,10:00,10:00,10:01,11:09,11:34,12:00,12:00,12:14,12:28,13:39,14:00,14:00,15:17,15:22,16:31,16:35,17:00,17:40",
                    "CStopId": 178,
                    "isDirectRoute": false,
                    "CRouteId": 9617,
                    "ArrivalTime": "08:13,09:32,09:32,09:57,10:02,10:02,10:02,10:03,11:11,11:36,12:02,12:02,12:16,12:30,13:41,14:02,14:02,15:19,15:24,16:33,16:37,17:02,17:42"
                }
            ],
            "status": true
        }
        $scope.respcompainList = $scope.data.enroutedDet;


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

            onJobClick: function (job) {
                $sessionStorage.source = job.SourceName;
                $sessionStorage.destination = job.DestinationName;
                $sessionStorage.time = '10:21';
                $state.go("app.tripplanner");
            },
            init: function () {
                var params = {
                    "sourceId": 0,
                    "destinationId": 0,
                    "routeId": $sessionStorage.routeId
                }
                RestService.enroutedDetails(params).then(function (resp) {
                    if (resp == undefined || resp == null || resp == "") {
                        toaster.error($filter('translate')('ERROR'), $filter('translate')('COMPLERROR'));
                        $ionicLoading.hide();
                    }
                    else {
                        $scope.respcompainList = resp.data.enroutedDet;
                    }
                    $ionicLoading.hide();
                },
                    function (err) {
                        $ionicLoading.hide();
                        toaster.error($filter('translate')('BUSROUTEERROR')/* , $filter('translate')('ERROR') */);
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
