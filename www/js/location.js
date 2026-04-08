angular.module('FSA.common')

	.factory('Location', ['$q', 'App', 'FsaDB', 'FsaAPI', function ($q, App, FsaDB, FsaAPI) {

		var Location = {

			isEnabled: function () {
				var defer = $q.defer();
				//Diagnostic plugin does not support windows phone 8.
				if (!App.isWebView() || App.isWindowsPhone())
					defer.resolve(true);
				else if (App.isAndroid())
					this.checkLocationForAndroid()
						.then(function (enabled) {
							defer.resolve(enabled);
						});
				else if (App.isIOS())
					this.checkLocationForIOS()
						.then(function (enabled) {
							defer.resolve(enabled);
						});

				return defer.promise;
			},

			checkLocationForAndroid: function () {
				var self = this, defer = $q.defer();
				this.isLocationAuthorized().then(function (authorized) {
					if (authorized) {
						cordova.plugins.diagnostic.isLocationEnabled(function (enabled) {
							defer.resolve(enabled);
							if (!enabled) self.enableServices();
						});
					} else {
						self.requestLocationAuthorization().then(function (status) {
							if (status == cordova.plugins.diagnostic.permissionStatus.GRANTED)
								self.checkLocationForAndroid();
							else
								defer.resolve(false);
						});
					}
				});
				return defer.promise;
			},

			checkLocationForIOS: function () {
				var self = this,
					defer = $q.defer();

				cordova.plugins.diagnostic.isLocationEnabledSetting(function (enabled) {
					defer.resolve(enabled);
					if (!enabled) self.enableServices();
				});

				return defer.promise;
			},

			enableServices: function () {
				var self = this;

				if (App.isWebView()) {
					navigator.notification.confirm(
						'Please enable location services',
						function (btnIndex) {
							if (btnIndex == 1) self.switchToSettings();
						},
						"Location Services Disabled",
						['Enable', 'Cancel']);
				}
			},

			switchToSettings: function () {
				if (App.isIOS())
					cordova.plugins.diagnostic.switchToSettings();
				else
					//Android & Windows
					cordova.plugins.diagnostic.switchToLocationSettings();
			},

			isLocationAuthorized: function () {
				var defer = $q.defer();

				cordova.plugins.diagnostic.getLocationAuthorizationStatus(function (status) {
					defer.resolve(status == cordova.plugins.diagnostic.permissionStatus.GRANTED);
				}, function (error) {
					defer.reject(error);
				});

				return defer.promise;
			},

			requestLocationAuthorization: function () {
				var defer = $q.defer();

				cordova.plugins.diagnostic.requestLocationAuthorization(function (success) {
					defer.resolve(success);
				}, function (error) {
					defer.reject(error);
				});

				return defer.promise;
			},

			saveGeolocation: function (geoData) {
				FsaDB.saveGeolocation(geoData).then(function (res) {
					if (res) {
						FsaDB.getGeoLocation().then(function (geolocation) {
							angular.forEach(geolocation, function (value) {
								var locationData = {
									"latitude": value.Lat,
									"longitude": value.Lng,
									"datetime": value.DateTime,
									"userId": value.UserId,
									"reason": value.Reason
								}
								if (value.UserId) {
									FsaAPI.InsertUserGeolocation(locationData).then(function (res) {
										if (res.Status == 'SUCCESS') {
											FsaDB.updateGeoLocation(value);
										}
									}, function (err) {
										console.log(err);
									});
								}
							})
						})
					}
				})
			},

			getLocation: function (userId) {
				var geoData = {
					"Lat": 0,
					"Lng": 0,
					"reason": '',
					"userId": userId
				};
				cordova.plugins.diagnostic.isLocationEnabled(function (enabled) {
					if (enabled && userId != null && userId != '') {
						Location.isLocationAuthorized().then(function (res) {
							if (res) {
								var posOptions = { timeout: 10000, enableHighAccuracy: false };
								cordova.plugins.locationServices.geolocation.getCurrentPosition(function (position) {
									geoData.Lat = position.coords.latitude;
									geoData.Lng = position.coords.longitude;
									geoData.reason = 'Success';
									Location.saveGeolocation(geoData);
								}, function (error) {
									console.log(error)
									geoData.reason = 'Location service error : ' + JSON.stringify(error);
									Location.saveGeolocation(geoData);
								}, posOptions);
							} else {
								geoData.reason = 'Location service permission not allowed.';
								Location.saveGeolocation(geoData);
							}
						})
					} else {
						geoData.reason = 'GPS is not enabled.';
						Location.saveGeolocation(geoData);
					}
				});
			}
		};

		return Location;
	}])