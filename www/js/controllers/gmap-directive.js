angular.module('starter')

	.directive('mobGmap', ['$timeout', '$window', function ($timeout, $window, PSpinner, App) {

		return {
			restrict: 'E',
			replace: true,
			scope: {
				winmap: '=',
				onLoadSuccess: '&',
				onLoadError: '&'
			},

			template: '<div data-tap-disabled="true"></div>',

			link: function (scope, el, attrs) {
				var screenHeight = $window.innerHeight - $('.header-bar.bar-header').innerHeight() - $('.locate-us-header').innerHeight() - 1,
					deviceHeight = screenHeight - ($window.innerHeight - (screenHeight + $('.locate-us-header').innerHeight())),
					mapCanvas = null,
					iframeContDoc = null
				var gmap = scope.winmap;
				// deviceHeight = (gmap.height) ? gmap['height'] : 200;
				if (_.isUndefined(gmap) || !_.isObject(gmap)) return;

				//Google map script to be loaded dynamically.
				function getGoogleMapScript() {
					var script = document.createElement("script"),
						apiKey = (gmap.apiKey) ? gmap['apiKey'] : '';

					script.type = "text/javascript";
					script.src = "https://maps.googleapis.com/maps/api/js?key=" + apiKey +
						"&callback=onGMapScriptLoad"
					return script;
				};


				//Start - Load map
				scope.winmap.load = function () {
					loadGoogleMap();

				};

				//For Android & iOS
				function loadGoogleMap() {
					if (_.isUndefined($window.google)) {
						var script = getGoogleMapScript();
						script.onerror = onLoadError;
						document.body.appendChild(script);
					}
					else
						$window.onGMapScriptLoad();
				};

				//Google maps script load success callback for Android & iOS.
				$window.onGMapScriptLoad = function () {
					$timeout(function () {
						var canvas = $(el);
						canvas.css({
							// 'height': deviceHeight,
							'width': '100%'
						});
						initGoogleMap(canvas);
					}, 100);
				};
				// load google map for windows phone

				//Google map script load error callback.
				function onLoadError(e) {
					PSpinner.hide();
					// console.log(e);
					scope.$apply(function () {
						scope.onLoadError();
					});
				};

				//Initialize google map
				function initGoogleMap(canvas) {
					var mapCenter = (gmap.center) ? gmap['center'] : '',
						zoom = (gmap.zoom) ? gmap['zoom'] : 10
					mapCanvas = canvas;
					mapCanvas.gmap({
						'center': '18.59, 73.73',
						'zoom': zoom
						// 'draggable':(isWindowsPhone) ? (false) : (true)
						// 'disableDefaultUI': true,
						// 'mapTypeId': google.maps.MapTypeId.ROADMAP
					});
					scope.$apply(function () {
						scope.onLoadSuccess({ map: { canvas: mapCanvas } });
					});
				};
			}
		};
	}]);