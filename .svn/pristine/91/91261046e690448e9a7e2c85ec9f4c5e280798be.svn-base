angular.module('starter')

.controller('LocationSearchCTRL', function($scope,$ionicLoading) {

$scope.takephotoshow =true;
$scope.tableshow=true;

function showResult(result) {

    $scope.Latitude=result.geometry.location.lat();
    $scope.Longitude=result.geometry.location.lng();

   var geocoder = new google.maps.Geocoder();
   var latlng = new google.maps.LatLng($scope.Latitude, $scope.Longitude);
        geocoder.geocode({ 'latLng': latlng }, function (results, status) {
              if (status == google.maps.GeocoderStatus.OK) {
                          if (results[1]) {
  //                            alert(results[1].formatted_address);
                              $scope.address = results[1].formatted_address;
                              console.log(results[1].formatted_address); // details address
                          } else {
  //                           alert('Location not found');
                               console.log('Location not found');
                          }
                      } else {
                          console.log('Geocoder failed due to: ' + status);
                      }

                  })


    getMap($scope.Latitude,$scope.Longitude);
    $ionicLoading.hide();

}

function getLatitudeLongitude(callback, address) {
    // If adress is not supplied, use default value 'Ferrol, Galicia, Spain'
    //address = address || 'Ferrol, Galicia, Spain';
    // Initialize the Geocoder
    geocoder = new google.maps.Geocoder();
    if (geocoder) {
        geocoder.geocode({
            'address': address
        }, function (results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                callback(results[0]);
            }
        });
    }
}

/*var button = document.getElementById('btn');
button.addEventListener("click", function () {
    var address = document.getElementById('address').value;
    $ionicLoading.show({ template: $filter('translate')('LOADING') });
    getLatitudeLongitude(showResult, address)
});*/

// Get map by using coordinates

function getMap(latitude, longitude) {

    var mapOptions = {
        center: new google.maps.LatLng(0, 0),
        zoom: 1,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    map = new google.maps.Map
    (document.getElementById("map"), mapOptions);

    var latLong = new google.maps.LatLng(latitude, longitude);

    var marker = new google.maps.Marker({
        position: latLong
    });

    marker.setMap(map);
    map.setZoom(15);
    map.setCenter(marker.getPosition());

}

// Success callback for watching your changing position

var onMapWatchSuccess = function (position) {

    var updatedLatitude = position.coords.latitude;
    var updatedLongitude = position.coords.longitude;

    if (updatedLatitude != Latitude && updatedLongitude != Longitude) {

        Latitude = updatedLatitude;
        Longitude = updatedLongitude;

        getMap(updatedLatitude, updatedLongitude);
    }
}

// Error callback

function onMapError(error) {
    console.log('code: ' + error.code + '\n' +
        'message: ' + error.message + '\n');
}

// Watch your changing position

function watchMapPosition() {

    return navigator.geolocation.watchPosition
    (onMapWatchSuccess, onMapError, { enableHighAccuracy: true });
}
/*-----------------------------------------------------------------------------------------------------------------------------*/

/* taking picyure function */
$scope.getPhoto = function()
{

	navigator.camera.getPicture(onSuccess, onFail,
		{
		  quality : 50,
		  destinationType : Camera.DestinationType.FILE,
		  sourceType : Camera.PictureSourceType.CAMERA,
		  encodingType: Camera.EncodingType.JPEG,
		  targetWidth: 800,
		  targetHeight: 100,
		  popoverOptions: CameraPopoverOptions,
		  saveToPhotoAlbum: true,
		  correctOrientation: true
		}
	);

function onSuccess(result) {
  console.log("result------"+result);
   var thisResult = JSON.parse(result);
    $ionicLoading.show({ template: $filter('translate')('LOADING') });

    var geoSuccess = function(position) {
          console.log("position---"+JSON.stringify(position));
          console.log('Latitude: '          + position.coords.latitude          + '\n' +
                           'Longitude: '         + position.coords.longitude         + '\n' +
                           'Altitude: '          + position.coords.altitude          + '\n' +
                           'Accuracy: '          + position.coords.accuracy          + '\n' +
                           'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
                           'Heading: '           + position.coords.heading           + '\n' +
                           'Speed: '             + position.coords.speed             + '\n' +
                           'Timestamp: '         + position.timestamp                + '\n');



               $scope.myImgUrl= thisResult.filename;
               console.log("result.filename------"+thisResult.filename);
               $scope.Latitude = position.coords.latitude;
               $scope.Longitude = position.coords.longitude;

               var geocoder = new google.maps.Geocoder();
                  var latlng = new google.maps.LatLng($scope.Latitude, $scope.Longitude);
                       geocoder.geocode({ 'latLng': latlng }, function (results, status) {
                         console.log("results---"+JSON.stringify(results));
                         alert("results---"+JSON.stringify(results));
                             if (status == google.maps.GeocoderStatus.OK) {
                                if (results[1]) {
                                  console.log(results[1].formatted_address); // details address
                                  $scope.address = results[1].formatted_address;
                                  $scope.takephotoshow =false;
                                  $scope.tableshow=false;
                                  $ionicLoading.hide();
                                } else{
                                   console.log('Location not found');
                                   $ionicLoading.hide();
                                }
                             } else {
                                 console.log('Geocoder failed due to: ' + status);
                                  $ionicLoading.hide();
                               }
                           })
     };
     // onError Callback receives a PositionError object
     //
     function geoError(error) {
         alert('code: '    + error.code    + '\n' +
               'message: ' + error.message + '\n');
     }
        navigator.geolocation.getCurrentPosition(geoSuccess, geoError);
	}

	function onFail(message) {
	    alert('Failed because: ' + message);
	}
}

});
