angular.module('starter')
  .controller('EnvironmentPageCtrl', function ($scope, $sessionStorage, $ionicPopup, $location, RestService, $ionicLoading, $stateParams, toaster,
    $filter, ENV, dateFilter, $state, $ionicSideMenuDelegate, $rootScope, $localStorage, $cordovaGeolocation) {
    $scope.enviornmentData = null;
    $scope.complaintReferenceCategory = null;
    var access_token;
    $scope.languageId = 1;
    // Guard state to prevent duplicate/re-entrant calls to getEnvData
    $scope.envDataState = {
      inProgress: false,
      lastFetched: 0,
      // cache TTL in ms - calls within this window will be skipped
      cacheTTL: 30000
    };
    var options = { timeout: 10000, enableHighAccuracy: true };
    $scope.showDetails = false;
    $scope.errorMsg = false;
    $scope.lat = $sessionStorage.lat;
    $scope.long = $sessionStorage.long;
    

    var _init = function () {
      if (!$rootScope.checkLocationOFF()) {
        return;
    }

    $scope.getEnvData();

      $scope.date = new Date().getDate();
      $scope.month = new Date().getMonth();
      $scope.year = new Date().getFullYear();
      $scope.hour = new Date().getHours();
      $scope.min = new Date().getMinutes();
      $scope.fromDate = $scope.year + "-" + ($scope.month+1) + "-" + ($scope.date-1);
      console.log("$scope.todate",$scope.fromDate);
      $scope.todate = $scope.year + "-" + ($scope.month+1) + "-" + $scope.date;
      //$scope.fromTime = ($scope.hour-6) + ":" +  $scope.min + ":00"
      $scope.toTime = $scope.hour + ":" +  $scope.min + ":00";


      
      // $scope.fromTime = '00:00:00'; 
      // $scope.toTime = '23:59:59';   //testing
      
      console.log("Current Time", $scope.fromDate, $scope.todate, $scope.toTime);


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
          toaster.error($filter('translate')('ENVIRONMENTERROR')/* , $filter('translate')('ENVIRONMENTERROR') */);
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
          console.log("Error for env Access", err);
          toaster.error($filter('translate')('ACCESSTOKENFAILED'));
        })

      $scope.nearbyLocation();

      value = 'environmental_sensor';
    

// function formatDateTime(date) {
//   const pad = (n) => String(n).padStart(2, "0");
//   const yyyy = date.getFullYear();
//   const mm = pad(date.getMonth() + 1);
//   const dd = pad(date.getDate());
//   const hh = pad(date.getHours());
//   const min = pad(date.getMinutes());
//   const ss = pad(date.getSeconds());
//   return `${yyyy}-${mm}-${dd} ${hh}:${min}:${ss}`;
// }
}

    $scope.AccessToken = function(type){
      console.log('$rootScope.swmAccessToken' + $rootScope.swmAccessToken, type)
    
        RestService.getAccessToken().then(function (data) {
          $rootScope.swmAccessTokenData = data.access_token;

      // $scope.changeABDMap(value);
          console.log($rootScope.swmAccessToken,"rrot scope toke")
          console.log(data.access_token,"data toke")
       

          if(type == 'env'){
            console.log("Entered env");
            // Only trigger getEnvData when not already fetching and not recently fetched
            var nowTs = Date.now();
            if (!$scope.envDataState.inProgress && (nowTs - $scope.envDataState.lastFetched) > $scope.envDataState.cacheTTL) {
              $scope.getEnvData();
            } else {
              console.log('Skipping getEnvData: already in progress or recently fetched');
            }
          } else {
               RestService.getEnvironmentAvg(type).then(function (resp) {
          console.log("res----------------",resp)
        })
          }
        },
          function (err) {
            toaster.error($filter('translate')('ACCESSTOKENFAILED'));
          })

    }

    $scope.container = L.DomUtil.get('map');
    $scope.nearbyLocation = function () {
      console.log($scope.lat, $scope.long, "Lat long map 2...")

      if ($scope.container != null) {
        $scope.container._leaflet_id = null;    
      }
      
      $scope.map = new L.Map('map');
      $scope.map.invalidateSize();
      //var map = L.map('map').setView([$scope.lat, $scope.long], 13, {

    // });
      $scope.map.setView(new L.LatLng($scope.lat, $scope.long), 13);
      /* var tiles = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
        layers: 'boundary_ward,boundary_zone',
        maxZoom: 18,
        attribution: 'Map data &copy; <a href="https://dsclgis.uk.gov.in:8443/cgi-bin/IGiS_Ent_service.exe?IEG_PROJECT=dehradun_ws">OpenStreetMap</a> contributors, ' +
          'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1
      }).addTo($scope.map); */

      /* L.esri.Vector.vectorTileLayer(
        "https://basemaps.arcgis.com/arcgis/rest/services/World_Basemap_v2/VectorTileServer"
      ).addTo($scope.map); */
      let layer = new L.TileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png');
      $scope.map.addLayer(layer);

      var circle = L.circle([$scope.lat, $scope.long], {
        color: 'red',
        fillColor: '#f03',
        fillOpacity: 0.5,
        radius: 100,
      }).addTo($scope.map);

      $scope.currentMarker;
      $scope.currentMarker = L.marker([$scope.lat, $scope.long]).addTo($scope.map).bindPopup('My Location').openPopup();
    }

    $scope.changeABDMap = function(mapValue){
      console.log('selected map value-->',mapValue);

      if(mapValue == 'environmental_sensor'){
        var paramList = {'param1':mapValue,'param2':'junction_name','distance':20000,'recordNo':10,'iconUrl':'img/mapIcon/envt_sensor.png'};
        $scope.getNearByPlaces(mapValue,paramList.param1,paramList.param2,paramList.distance,paramList.recordNo,paramList.iconUrl);
      } 
    }

    $scope.otherMarkers = [];
    $scope.getNearByPlaces = function(mapValue,param1,param2,distance,recordNo,iconUrl){

      console.log("Lat n Long in Map", $scope.lat, $scope.long)

      $ionicLoading.show({  template: 'Loading...'  });
      
      RestService.getYourNearByPlacesNew(param1,param2,distance,recordNo,$scope.lat,$scope.long).then(function (geocodeResponse) {
        console.log("near by places response -->" + JSON.stringify(geocodeResponse));

          var mapIcon = L.icon({
            iconUrl: iconUrl,
            iconSize: [30, 30]
          });

        if (geocodeResponse.length > 0) {
          if(mapValue == 'environmental_sensor'){
            if($scope.otherMarkers.length>0){
              for (var i = 0; i < $scope.otherMarkers.length; i++) {
                $scope.map.removeLayer($scope.otherMarkers[i]);
              }
            }
            //$scope.map.removeLayer($scope.otherMarkers);
            for (var i = 0; i < geocodeResponse.length; i++) {
              console.log(' name of location'+geocodeResponse[i].name_of_location);
              $scope.otherMarkers[i] = L.marker([geocodeResponse[i].latitude, geocodeResponse[i].longitude],{icon: mapIcon}).bindPopup(geocodeResponse[i].junction_name).openPopup().addTo($scope.map);
            }
          }
        } else {
          if($scope.otherMarkers.length>0){
            for (var i = 0; i < $scope.otherMarkers.length; i++) {
              $scope.map.removeLayer($scope.otherMarkers[i]);
            }
          }
          //toaster.error($filter('translate')('NO_DATA_FOUND'));
          console.log("NO Data Found")
          $ionicLoading.hide();
        }         
      }, function (err) {
        //toaster.error($filter('translate')('ENVIRONMENTERROR')/* , $filter('translate')('') */);
        console.log("Error for Envt", err);
        toaster.error($filter('translate')('ENVTHIRDPARTYERROR'));
        $ionicLoading.hide();
      });
    }

    $scope.reset = function () {
      console.log("reset function is caling")
      $scope.devices = null;
      console.log($scope.departmentLoc,"reset value")
    }

    $scope.getEnvData = function () {
      // Prevent duplicate/re-entrant calls. If a fetch is already running
      // or the last successful fetch is within cacheTTL, skip this call.
      var nowTs = Date.now();
      if ($scope.envDataState.inProgress) {
        console.log('getEnvData: already in progress - skipping duplicate call');
        return;
      }
      if ((nowTs - $scope.envDataState.lastFetched) < $scope.envDataState.cacheTTL) {
        console.log('getEnvData: recently fetched - skipping (within cacheTTL)');
        return;
      }

      $scope.envDataState.inProgress = true;

      $scope.devices = [];
      $scope.tags = [];
      var datas = [];
      var data = [];
      var j=0;


      const now = new Date();
const from = new Date(now);
from.setHours(0, 0, 0, 0); 
function formatDateTime(date) {
  const pad = (n) => String(n).padStart(2, "0");
  const yyyy = date.getFullYear();
  const mm = pad(date.getMonth() + 1);
  const dd = pad(date.getDate());
  const hh = pad(date.getHours());
  const min = pad(date.getMinutes());
  const ss = pad(date.getSeconds());
$scope.toDateandTime=`${yyyy}-${mm}-${dd} ${hh}:${min}:${ss}`
  return `${yyyy}-${mm}-${dd} ${hh}:${min}:${ss}`;
}

console.log("$scope.toDateandTime",$scope.toDateandTime);
const fromDate = encodeURIComponent(formatDateTime(from));
const toDate = encodeURIComponent(formatDateTime(now));
 $scope.dateUrl = `fromDate=${fromDate}&toDate=${toDate}`;
console.log("dateUrl ----", $scope.dateUrl);
        if ($localStorage.langID == "2") {
          $ionicLoading.show({ template: 'लोड हो रहा है...' });
        } else {
          $ionicLoading.show({ template: 'Loading...' });
        }
        RestService.getEnvironmentAvg( $scope.dateUrl).then(function (resp) {
          console.log("res",resp.Environment.data)
          if(resp == undefined || resp == null || resp == "" || resp == {}){
            $scope.showDetails = false;
            toaster.error($filter('translate')('ENVTHIRDPARTYERROR'));
          } else {
            if (resp.Environment.data) {
              $scope.envResponse = resp.Environment.data[0];
              $scope.dateTime = $scope.envResponse.DATE_TIME;

              //Converting to Date Object
              var originalDateTime = new Date($scope.dateTime);

              //GMT to IST Conversion
              // var hoursToAdd = 5;
              // var minutesToAdd = 30;
              // var secondsToAdd = 0;
              // originalDateTime.setHours(originalDateTime.getHours() + hoursToAdd);
              // originalDateTime.setMinutes(originalDateTime.getMinutes() + minutesToAdd);
              // originalDateTime.setSeconds(originalDateTime.getSeconds() + secondsToAdd);

              // //Converting to String Format
              // var year = originalDateTime.getFullYear();
              // var month = String(originalDateTime.getMonth() + 1).padStart(2, '0'); 
              // var day = String(originalDateTime.getDate()).padStart(2, '0');
              // var hours = String(originalDateTime.getHours()).padStart(2, '0');
              // var minutes = String(originalDateTime.getMinutes()).padStart(2, '0');
              // var seconds = String(originalDateTime.getSeconds()).padStart(2, '0');

              // $scope.dateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds} IST`;

              // console.log("envResponse", $scope.envResponse, $scope.dateTime)
              $scope.showDetails = true;
              $scope.errorMsg = false;
              console.log("$scope.envResponse",$scope.envResponse);
              
              for (var key in $scope.envResponse) {
                if (key != 'Date' && key != 'HUM' && key != 'LIGHT' && key != 'NOISE' && key != 'NS' && key != 'PS' && key != 'TEMP' && key != 'UV' && key != 'deviceName' && key != 'flood' && key != 'latitude' && key != 'location' && key != 'longitude' && key != 'mac' && key != 'tenantCode'){
                  $scope.devices.push(key);
                  data.push($scope.envResponse[key]);
                  datas = parseFloat(data[j])
                  $scope.tags.push(datas.toFixed(2));
                  console.log("$scope.envResponse", $scope.devices, $scope.tags);
                  
                  var no2 = $scope.tags[5];
                  var o3 = $scope.tags[0];
                  var pm10 = $scope.tags[9];
                  var so2 = $scope.tags[6];
                  var co = $scope.tags[2];
                  var co2 = $scope.tags[1];
                  var aqi = $scope.tags[8];
                  var no2Class = $scope.getEvenSensorColor(no2,"NO2");
                  var o3Class = $scope.getEvenSensorColor(o3,"O3");
                  var pm10Class = $scope.getEvenSensorColor(pm10,"PM10");
                  var so2Class= $scope.getEvenSensorColor(so2,"SO2");
                  var coClass = $scope.getEvenSensorColor(co,"CO");
                  var co2Class = $scope.getEvenSensorColor(co2,"CO2");
                  var aqiClass = $scope.getEvenSensorColor(aqi,"AQI");

                  $('#noReading').html(no2);
                  $('#noColor').removeClass().addClass(no2Class);
                  var no2per = $scope.getEnvper(no2,"NO2");
                  $('#noColor').css({"width":no2per});

                  $('#o3Reading').html(o3);
                  $('#o3Color').removeClass().addClass(o3Class);
                  var o3per = $scope.getEnvper(o3,"O3");
                  $('#o3Color').css({"width":o3per});

                  $('#pmReading').html(pm10);
                  $('#pmColor').removeClass().addClass(pm10Class);
                  var pmper = $scope.getEnvper(pm10,"PM10");
                  $('#pmColor').css({"width":pmper});

                  $('#soReading').html(so2);
                  $('#soColor').removeClass().addClass(so2Class);
                  var soper = $scope.getEnvper(so2,"SO2");
                  $('#soColor').css({"width":soper});

                  $('#coReading').html(co);
                  $('#coColor').removeClass().addClass(coClass);
                  var coper = $scope.getEnvper(co,"CO");
                  $('#coColor').css({"width":coper});

                  $('#cReading').html(co2);
                  $('#cColor').removeClass().addClass(co2Class);
                  var cper = $scope.getEnvper(co2,"CO2");
                  $('#cColor').css({"width":cper});

                  $('#aqiReading').html(aqi);
                  $('#aqiColor').removeClass().addClass(aqiClass);
                  var aqiper = $scope.getEnvper(aqi,"AQI");
                  $('#aqiColor').css({"width":aqiper});
      
                  j++
                }
                i++
              }
            } else {
              $scope.showDetails = false;
              $scope.errorMsg = true;
              //toaster.error($filter('translate')('ENVTHIRDPARTYERROR'));
            }
          }
          /* if (resp) {
            console.log("enviv=",resp);
            $scope.showDetails = true;
            $scope.enviornmentData = resp.Environment.data;
            
            $scope.devices = [];
            $scope.tags = [];
            $scope.datas = [];
            var i = 0;
            for (var key in $scope.enviornmentData) {
              if (key != 'DATE_TIME' && key != 'MAC')
                $scope.devices.push(key)
              if($scope.devices[i]!=undefined){  
                var data = $scope.enviornmentData[$scope.devices[i]].split(',');
                $scope.datas.push(data[1]);
                // var tag = parseFloat($scope.enviornmentData[$scope.devices[i]])
                // $scope.tags.push(tag.toFixed(2))
                console.log("Value" , data[0]);
                if(data[0] == ""){
                  console.log("Entered if", data[0]);
                  $scope.tags.push(data[0]);
                } else {
                  console.log("Entered else", data[0]);
                  var tag = parseFloat(data[0]);
                  $scope.tags.push(tag.toFixed(2));
                }
                console.log("Tags arr", $scope.tags);
                i++;
              }
            } 
            $ionicLoading.hide();
          } */
          // mark successful fetch time
          $scope.envDataState.lastFetched = Date.now();
          $ionicLoading.hide();
        },
          function (err) {
            $ionicLoading.hide();
            $scope.showDetails = false;
            $scope.errorMsg = true;
            //toaster.error($filter('translate')('ENVIRONMENTERROR')/* , $filter('translate')('ENVIRONMENTERROR') */);
            console.log("Error for Envt", err);
            // toaster.error($filter('translate')('ENVTHIRDPARTYERROR'));
            if (err.status == 401){
              $scope.AccessToken('env');
              console.log("if got true in err");
            } 
          }).finally(function(){
            // clear inProgress flag whether success or error
            $scope.envDataState.inProgress = false;
          })
      // }

      $scope.getEvenSensorColor = function(aqiDigit,aqiName){
        //debugger;
        console.log(aqiDigit, aqiName);
  
        var evnColor = "";
        if(aqiName == "O3"){
          var evnColor = "";
          if(aqiDigit >= 0 && aqiDigit <=50){
            evnColor = "aqi-bg-green";
            return evnColor;
          }
          else if(aqiDigit >= 51 && aqiDigit <=100){
            evnColor = "aqi-bg-yellow";
            return evnColor;
          }
          else if(aqiDigit >= 101 && aqiDigit <=168){
            evnColor = "aqi-bg-ddyellow";
            return evnColor;
          }
          else if(aqiDigit >= 169 && aqiDigit <=208){
            evnColor = "aqi-bg-pink";
            return evnColor;
          }
          else if(aqiDigit >= 209 && aqiDigit <=708){
            evnColor = "aqi-bg-megenta";
            return evnColor;
          }
          else{
            evnColor = "aqi-bg-red";
            return evnColor;
          }
        }
  
        if(aqiName == "SO2"){
          var evnColor = "";
          if(aqiDigit >= 0 && aqiDigit <=40){
            evnColor = "aqi-bg-green";
            return evnColor;
          }
          else if(aqiDigit >= 41 && aqiDigit <=80){
            evnColor = "aqi-bg-yellow";
            return evnColor;
          }
          else if(aqiDigit >= 81 && aqiDigit <=380){
            evnColor = "aqi-bg-ddyellow";
            return evnColor;
          }
          else if(aqiDigit >= 381 && aqiDigit <=800){
            evnColor = "aqi-bg-pink";
            return evnColor;
          }
          else if(aqiDigit >= 801 && aqiDigit <=1600){
            evnColor = "aqi-bg-megenta";
            return evnColor;
          }
          else{
            evnColor = "aqi-bg-red";
            return evnColor;
          }
        }
    
        if(aqiName == "NO2"){
          var evnColor = "";
          if(aqiDigit >= 0 && aqiDigit <=40){
            evnColor = "aqi-bg-green";
            return evnColor;
          }
          else if(aqiDigit >= 41 && aqiDigit <=80){
            evnColor = "aqi-bg-yellow";
            return evnColor;
          }
          else if(aqiDigit >= 81 && aqiDigit <=180){
            evnColor = "aqi-bg-ddyellow";
            return evnColor;
          }
          else if(aqiDigit >= 181 && aqiDigit <=280){
            evnColor = "aqi-bg-pink";
            return evnColor;
          }
          else if(aqiDigit >= 281 && aqiDigit <=400){
            evnColor = "aqi-bg-megenta";
            return evnColor;
          }
          else{
            evnColor = "aqi-bg-red";
            return evnColor;
          }
        }
    
        if(aqiName == "CO"){
          var evnColor = "";
          if(aqiDigit >= 0 && aqiDigit <=1){
            evnColor = "aqi-bg-green";
            return evnColor;
          }
          else if(aqiDigit >= 1.1 && aqiDigit <=2){
            evnColor = "aqi-bg-yellow";
            return evnColor;
          }
          else if(aqiDigit >= 2.1 && aqiDigit <=10){
            evnColor = "aqi-bg-ddyellow";
            return evnColor;
          }
          else if(aqiDigit >= 10.1 && aqiDigit <=17){
            evnColor = "aqi-bg-pink";
            return evnColor;
          }
          else if(aqiDigit >= 17.1 && aqiDigit <=34){
            evnColor = "aqi-bg-megenta";
            return evnColor;
          }
          else{
            evnColor = "aqi-bg-red";
            return evnColor;
          }
        }
    
        if(aqiName == "CO2"){
          var evnColor = "";

          if(aqiDigit >= 0 && aqiDigit <=700){    
            evnColor = "aqi-bg-green";
            return evnColor;
          }
          else if(aqiDigit >= 701 && aqiDigit <=800){
            evnColor = "aqi-bg-yellow";
            return evnColor;
          }
          else if(aqiDigit >= 801 && aqiDigit <=1100){
            evnColor = "aqi-bg-ddyellow";
            return evnColor;
          }
          else if(aqiDigit >= 1101 && aqiDigit <=1500){
            evnColor = "aqi-bg-pink";
            return evnColor;
          }
          else if(aqiDigit >= 1501 && aqiDigit <=3000){
            evnColor = "aqi-bg-megenta";
            return evnColor;
          }
          else{
            evnColor = "aqi-bg-red";
            return evnColor;
          }
        }
  
        else{
          if(aqiDigit >= 0 && aqiDigit <=50){
            evnColor = "aqi-bg-green";
            return evnColor;
          }
          else if(aqiDigit >= 51 && aqiDigit <=100){
            evnColor = "aqi-bg-yellow";
            return evnColor;
          }
          else if(aqiDigit >= 101 && aqiDigit <=250){
            evnColor = "aqi-bg-ddyellow";
            return evnColor;
          }
          else if(aqiDigit >= 251 && aqiDigit <=350){
            evnColor = "aqi-bg-pink";
            return evnColor;
          }
          else if(aqiDigit >= 351 && aqiDigit <=430){
            evnColor = "aqi-bg-megenta";
            return evnColor;
          }
          else{
            evnColor = "aqi-bg-red";
            return evnColor;
          }
        }
      }

      $scope.getEnvper = function(aqiDigit,aqiName){
        //debugger;
        console.log(aqiDigit, aqiName)

        if(aqiName=="O3"){
          if(aqiDigit > 708){
            var aqiper = (aqiDigit*100)/aqiDigit;
          }else{
            var aqiper = (aqiDigit*100)/708;
          }
          return aqiper+"%";
        }
        else if(aqiName == "SO2"){
          if(aqiDigit > 1600){
            var aqiper = (aqiDigit*100)/aqiDigit;
          }else{
            var aqiper = (aqiDigit*100)/1600;
          }
          return aqiper+"%";
        }
        else if(aqiName == "CO"){
          if(aqiDigit > 34){
            var aqiper = (aqiDigit*100)/aqiDigit;
          }else{
            var aqiper = (aqiDigit*100)/34;
          }
          return aqiper+"%";
        }
        else if(aqiName == "CO2"){
          if(aqiDigit > 3000){
            var aqiper = (aqiDigit*100)/aqiDigit;
          }else{
            var aqiper = (aqiDigit*100)/3000;
          }
          return aqiper+"%";
        }
        else if(aqiName == "NO2"){
          if(aqiDigit > 400){
            var aqiper = (aqiDigit*100)/aqiDigit;
          }else{
            var aqiper = (aqiDigit*100)/400;
          }
          return aqiper+"%";
        }
        else {
          if(aqiDigit > 431){
            var aqiper = (aqiDigit*100)/aqiDigit;
          }else{
            var aqiper = (aqiDigit*100)/431;
          }
          return aqiper+"%";
        }    
    }


    $scope.container = L.DomUtil.get('map');

    }
    _init();
  });
