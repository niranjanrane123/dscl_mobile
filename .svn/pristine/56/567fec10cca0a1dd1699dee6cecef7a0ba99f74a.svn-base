angular.module('starter')
    .controller('ItsHomeCTRL', function ($scope, RestService, $ionicLoading, $stateParams, toaster, $filter, ENV, $ionicHistory,
        $state, $localStorage, $sessionStorage, $ionicModal, $ionicPopup, $timeout, $ionicScrollDelegate) {
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
        $scope.raduis = "2000";
        // $scope.data = {
        //     "distinctStopList": [
        //         {
        //             "Latitude": 12.96985149383545,
        //             "StopId": 117,
        //             "PoiName": "Stop 1",
        //             "Longitude": 77.59132385253906
        //         },
        //         {
        //             "Latitude": 19.863085,
        //             "StopId": 118,
        //             "PoiName": "RTO OFFICE",
        //             "Longitude": 75.310601
        //         },
        //         {
        //             "Latitude": 19.868734,
        //             "StopId": 120,
        //             "PoiName": "PADAMPURA",
        //             "Longitude": 75.311826
        //         },
        //         {
        //             "Latitude": 19.872774,
        //             "StopId": 121,
        //             "PoiName": "HOTEL PANCHVATI",
        //             "Longitude": 75.314003
        //         }
        //     ],
        //     "status": true
        // }

        var im = 'http://www.robotwoods.com/dev/misc/bluecircle.png';
        var map = null;
        var radius_circle = null;
        var markers_on_map = [];
        // $scope.respcompainList = $scope.data.distinctStopList;
        function initialize(all_locations) {
            var myLatLng = new google.maps.LatLng(30.316496, 78.032188);
            var mapOptions = {
                zoom: 15,
                center: myLatLng,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            }
            var map = new google.maps.Map(document.getElementById('map'), mapOptions);
            var userMarker = new google.maps.Marker({
                position: myLatLng,
                map: map,
                icon: im
            });


            /*     if (radius_circle) {
                    radius_circle.setMap(null);
                    radius_circle = null;
                  }*/
            for (i = 0; i < markers_on_map.length; i++) {
                if (markers_on_map[i]) {
                    markers_on_map[i].setMap(null);
                    markers_on_map[i] = null;
                }
            }
            var circle = {
                strokeColor: "#48c3fc",
                strokeOpacity: 0.8,
                strokeWeight: 1,
                fillColor: "#48c3fc",
                fillOpacity: 0.35,
                map: map,
                center: myLatLng,
                radius: $scope.raduis * 1000 // in meters
            };
            cityCircle = new google.maps.Circle(circle);
            cityCircle.bindTo('center', userMarker, 'position');
            var infoWindow = new google.maps.InfoWindow();
            //if(radius_circle) map.fitBounds(radius_circle.getBounds());

            for (var j = 0; j < all_locations.length; j++) {
                (function (location) {
                    var marker_lat_lng = new google.maps.LatLng(location.Latitude, location.Longitude);
                    var distance_from_location = google.maps.geometry.spherical.computeDistanceBetween(myLatLng, marker_lat_lng); //distance in meters between your location and the marker
                    if (distance_from_location <= $scope.raduis * 1000) {
                        var new_marker = new google.maps.Marker({
                            position: marker_lat_lng,
                            map: map,
                            title: location.PoiName
                        });
                        google.maps.event.addListener(new_marker, 'click', function () {
                            infoWindow.setContent('<div style=" width:200px;height:100px;"><strong>' + location.PoiName + '</strong></div>');
                            infoWindow.open(map, new_marker);
                        });
                        markers_on_map.push(new_marker);
                    }
                })(all_locations[j]);
                $ionicLoading.hide();
            }
            //$ionicLoading.hide();
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

            mapVisible: false,
            reset: function () {
                var self = this;
                this.jobs = [];
                this.moreDataCanBeLoaded = true;
                //When navigated from dashboard
                this.selectedTab = 'bystop'
            },
            onJobClick: function (job) {
                $sessionStorage.routLat = job.Latitude;
                $sessionStorage.routLon = job.Longitude;
                $state.go("app.nearbystops");
            },

            onMapClicl: function (value) {
                if (value) {
                    $scope.view.mapVisible = true;
                    $timeout(function () {
                        initialize($scope.respcompainList)
                    }, 500);
                } else {
                    $scope.view.mapVisible = false;
                }

            },

            callByRoute: function () {
                RestService.getRoutes().then(function (resp) {
                    if (resp == undefined || resp == null || resp == "") {
                        toaster.error($filter('translate')('ERROR'), $filter('translate')('COMPLERROR'));
                        $ionicLoading.hide();
                    }
                    else {
                        $scope.resproutecompainList = resp.data.routeList;
                    }
                    $ionicLoading.hide();
                },
                    function (err) {
                        $ionicLoading.hide();
                        toaster.error($filter('translate')('BUSROUTEERROR')/* , $filter('translate')('ERROR') */);
                    })
            },

            callByBusStop: function () {
                RestService.getDistinctStops().then(function (resp) {
                    if (resp == undefined || resp == null || resp == "") {
                        toaster.error($filter('translate')('ERROR'), $filter('translate')('COMPLERROR'));
                        $ionicLoading.hide();
                    }
                    else {
                        $scope.respcompainList = resp.data.distinctStopList;
                    }
                    $ionicLoading.hide();
                },
                    function (err) {
                        $ionicLoading.hide();
                        toaster.error($filter('translate')('BUSROUTEERROR')/* , $filter('translate')('ERROR') */);
                    })
            },
            init: function () {
                $scope.view.callByBusStop();
            },

            onTabClick: function (selectedTab) {
                var self = this;
                this.selectedTab = selectedTab;
                if (selectedTab == 'byroute') {
                    $scope.view.tabs.byroute = true;
                    $scope.view.tabs.bystop = false;
                    $scope.view.callByRoute();
                } else {
                    $scope.view.tabs.byroute = false;
                    $scope.view.tabs.bystop = true;
                    $scope.view.callByBusStop();
                }
                // _.each(this.tabs, function (tab, tabIndex) {

                // });
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


        $scope.$on('$ionicView.leave', function () {
            syncEvent();
            $ionicPlatform.offHardwareBackButton($scope.view.onDeviceBack);
        });
    })
