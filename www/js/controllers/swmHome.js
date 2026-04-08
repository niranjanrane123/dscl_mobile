angular.module('starter')
	.controller('swmHomeCtrl', function ($scope, RestService, $ionicLoading, $stateParams,
		toaster, $filter, ENV, $state, $localStorage, $sessionStorage,
		$ionicPopup, $ionicModal, $rootScope, $cordovaCapture, $cordovaGeolocation) {
		$scope.orgid = $localStorage.selectedorgID;
		$scope.userID = $localStorage.responselogindata.userId;
		$scope.loginUSername = $localStorage.responselogindata.firstName;
		$scope.LoginMobileNo = $localStorage.responselogindata.mobileNo;
		$scope.langID = $localStorage.langID;
		$scope.content = "New Complaint";
		$scope.accessToken = "";
		$scope.SelectedTask = null;
		$scope.img1 = '';
		$scope.img2 = '';
		$scope.img3 = '';
		$rootScope.swmCall = true;
		$scope.address = null;
		$scope.latitude = null;
		$scope.longitude = null;
		$scope.description = null;
		$scope.complaintReferenceCategory = null;
		var options = { timeout: 10000, enableHighAccuracy: true };
		$scope.filterCondition = {
			operator: 'eq'
		}


		$scope.respcompainTypes = {
			"SWM": {
				"complaints": [
					{
						"complaintId": 1,
						"complaintName": "Absenteeism of door to door garbage collector"
					},
					{
						"complaintId": 2,
						"complaintName": "Absenteeism of Sweepers"
					},
					{
						"complaintId": 3,
						"complaintName": "Biomedical Waste"
					}
				]
			}
		};

		$scope.$on('$ionicView.enter', function () {
			console.log("entered")
		});

		$scope.$on('$ionicView.beforeLeave'), function () {
			console.log("left")
		};

		//only calls when token is null
		if ($rootScope.swmAccessToken == null) {
			RestService.getAccessToken().then(function (data) {
				$rootScope.swmAccessToken = data.access_token;
				RestService.getComplaintsTypes($sessionStorage.swmAccessToken).then(function (data) {
					console.log("actionResponse--" + JSON.stringify(data));
					$scope.respcompains = data.SWM.complaints;
					$ionicLoading.hide();
				},
					function (err) {
						$ionicLoading.hide();
						toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR'));
					})
			},
				function (err) {
				})

		} else {
			RestService.getComplaintsTypes($sessionStorage.swmAccessToken).then(function (data) {
				console.log("actionResponse--" + JSON.stringify(data));
				$scope.respcompains = data.SWM.complaints;
				$ionicLoading.hide();
			},
				function (err) {
					$ionicLoading.hide();
					toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR'));
				})
		}
		// $scope.respcompains = $scope.respcompainTypes.SWM.complaints;


		if ($localStorage.langID == "2") {
			$ionicLoading.show({ template: 'लोड हो रहा है...' });
		} else {
			$ionicLoading.show({ template: 'Loading...' });
		}


		/* taking picyure function */
		$scope.getPhoto = function () {
			// alert('getPhoto')
			$ionicLoading.show({ template: $filter('translate')('LOADING') });
			navigator.camera.getPicture(onSuccess, onFail,
				{
					quality: 50,
					destinationType: Camera.DestinationType.DATA_URL,
					sourceType: Camera.PictureSourceType.CAMERA,
					encodingType: Camera.EncodingType.JPEG,
					targetWidth: 900,
					targetHeight: 600,
					popoverOptions: CameraPopoverOptions
				}
			);

			function onSuccess(result) {
				$ionicLoading.show({ template: 'Updating Details...' });
				console.log("thisResult---" + JSON.stringify(thisResult));
				$ionicLoading.hide();
				var thisResult = JSON.parse(result);
				if ($scope.img1 == '') {
					$scope.img1 = 'data:image/jpeg;base64,' + thisResult.filename;
					// $scope.img1 = 'data:image/jpeg;base64,' + thisResult.filename;
					// $scope.img1 = thisResult.filename;
				} else if ($scope.img2 == '') {
					// $scope.img2 = thisResult.filename;
					$scope.img2 = 'data:image/jpeg;base64,' + thisResult.filename;
				} else {
					// $scope.img3 = thisResult.filename;
					$scope.img3 = 'data:image/jpeg;base64,' + thisResult.filename;
				}
			}

			function onFail(message) {
				$ionicLoading.hide();
				// alert('Failed because: ' + message);
			}
		}

		/* taking picyure function */
		$scope.getVideo = function () {
			// alert('getPhoto')
			$cordovaCapture.captureVideo().then(function (videoData) {
				VideoService.saveVideo(videoData).success(function (data) {
					$scope.clip = data;
				}).error(function (data) {
					console.log('ERROR: ' + data);
				});
			});
		}
		$scope.submit = function (complaintReferenceCategory, description) {
			$scope.selection = JSON.parse(complaintReferenceCategory)
			console.log('complaintReferenceCategory' + $scope.selection.complaintName)
			if ($localStorage.langID == "2") {
				$ionicLoading.show({ template: 'लोड हो रहा है...' });
			} else {
				$ionicLoading.show({ template: 'Loading...' });
			}
			var params = {
				"name": $localStorage.responselogindata.firstName,
				"email": $localStorage.responselogindata.emailId,
				// "address": $scope.address,
				"address": 'Tilak Nagar, Khurbura Mohalla, Dehradun, Uttarakhand 248001',
				"phoneNo": $localStorage.responselogindata.mobileNo,
				"latitude": $scope.latitude,
				"longitude": $scope.longitude,
				"complaintId": "CID-20210609-3jr3ilk",
				"description": description,
				"incidentSubTypeId": $scope.selection.complaintId,
				"incidentSubType": $scope.selection.complaintName,
				"files": {
					"images": [
						$scope.img1,
						$scope.img2,
						$scope.img3]
				},
				"videos": [""]
			}

			console.log('params' + JSON.stringify(params))
			RestService.registerComplaint(params).then(function (data) {
				console.log("actionResponse--" + JSON.stringify(data));
				if (data.status == 'true') {
					$ionicHistory.goBack()
				} else {
					toaster.error($filter('translate')('ERROR'), $filter('translate')(''));
				}
				$ionicLoading.hide();
			},
				function (err) {
					$ionicLoading.hide();
					toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR'));
				})

		}

		var _init = function () {
			$cordovaGeolocation.getCurrentPosition(options).then(function (position) {
				var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

				console.log(position.coords.latitude);
				console.log(position.coords.longitude);

				$scope.latitude = position.coords.latitude;
				$scope.longitude = position.coords.longitude;
				console.log($scope.latitude);
				console.log($scope.longitude);
				var mapOptions = {
					center: latLng,
					zoom: 15,
					mapTypeId: google.maps.MapTypeId.ROADMAP
				};

				$scope.map = new google.maps.Map(document.getElementById("map"), mapOptions);
				console.log($scope.map);
				console.log('map2')

				// var geocoder = new google.maps.Geocoder();
				// var latlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
				// console.log("results---" + JSON.stringify(latlng));
				// geocoder.geocode({ 'latLng': latlng }, function (results, status) {
				// 	console.log("results---" + JSON.stringify(results));
				// 	alert("results---" + JSON.stringify(results));
				// })

				google.maps.event.addListenerOnce($scope.map, 'idle', function () {

					var marker = new google.maps.Marker({
						map: $scope.map,
						animation: google.maps.Animation.DROP,
						position: latLng,
						icon: 'http://i.imgur.com/fDUI8bZ.png'
					});

					var infoWindow = new google.maps.InfoWindow({
						content: "Here You Are.!"
					});

					google.maps.event.addListener(marker, 'click', function () {
						infoWindow.open($scope.map, marker);
					});
				});
			}, function (error) {
				console.log("Could not get location");
			});
		};
		_init();

	});
