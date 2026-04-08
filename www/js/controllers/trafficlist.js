angular.module('starter')

  .controller('TrafficListPageCtrl', function ($scope, $sessionStorage, $ionicPopup, $location, RestService, $ionicLoading, $stateParams, toaster,
    $filter, ENV, dateFilter, $state, $ionicSideMenuDelegate, $rootScope, $localStorage) {

    $scope.getDashBoardData = [];
    $scope.getDashBoardDataPage = [];
    $scope.totalPagination = 0;
    $scope.currentPagination = 0;
    $scope.currentPaginationArray = [];
    $scope.mysearch = '';

/*     $scope.date = new Date().getDate();
    $scope.month = new Date().getMonth();
    $scope.year = new Date().getFullYear();
    $scope.hour = new Date().getHours();
    $scope.min = new Date().getMinutes();
    $scope.date = $scope.year + "-" + ($scope.month+1) + "-" + $scope.date;
    $scope.time = $scope.hour + ":" +  $scope.min + ":00"; */

    $scope.timeCompare = function(xTimeISO){
      //var xTimeISO = "2023-09-22T08:40:00Z";   //for testing
     
      var currentTime = new Date();
      var xTime = new Date(xTimeISO);

      
      var hoursToMinus = 5;
      var minutesToMinus = 30;
      var secondsToMinus = 0;
      xTime.setHours(xTime.getHours() - hoursToMinus);
      xTime.setMinutes(xTime.getMinutes() - minutesToMinus);
      xTime.setSeconds(xTime.getSeconds() - secondsToMinus);    
      
      var timeDifferenceMs = currentTime - xTime;

      var timeDifferenceMinutes = timeDifferenceMs / (1000 * 60);

      //console.log("Current Time", currentTime, xTime, timeDifferenceMinutes);

    // Check if the difference is greater than 120 minutes
      if (timeDifferenceMinutes > 120) {
        //console.log("Error")
        return false
      } else {
        return true
      }
    }
    
    $scope.langID = $localStorage.langID;
    $scope.orgid = $localStorage.selectedorgID;

    $scope.trafficList = [];

    $scope.trafficListOption = function(){

      $scope.trafficList = [
        {name:'Clock Tower',value:'J001'},
        {name:'Prince Chowk',value:'J002'},
        {name:'Orient Tiraha',value:'J003'},
        {name:'Purani Chungi Bypass',value:'J004'},
        {name:'BEHL Chowk',value:'J005'},
        {name:'Nanys Bakery',value:'J006'},
        {name:'Anurag Chowk',value:'J007'},
        {name:'Survey Chowk',value:'J008'},
        {name:'Araghar Chowk',value:'J009'},
        {name:'Ajanta Chowk',value:'J010'},
        {name:'Tehsil Chowk',value:'J011'},
        {name:'Ballupur Chowk',value:'J012'},
        {name:'Yamuna Colony Chowk',value:'J013'},
        {name:'Kishan Nagar Chowk',value:'J014'},
        {name:'Dilaram Chowk',value:'J015'},
        {name:'Balliwala Chowk',value:'J016'},
        {name:'Lencidon Chowk',value:'J017'},
        {name:'Buddha Park',value:'J018'},
        {name:'Laal Pul Chowk',value:'J019'},
        {name:'Niranjanpur Sabji Mandi Chowk',value:'J020'},
        {name:'Shimla Bypass Chowk',value:'J021'},
        {name:'ISBT Chowk',value:'J022'},
        {name:'Bengali Koti',value:'J023'},
        {name:'Saharanpur Chowk',value:'J024'},
        {name:'City Heart Centre',value:'J025'},
        {name:'Bindal Chowk',value:'J026'},
        {name:'Kanak Chowk',value:'J027'},
        {name:'Dwarika Chowk',value:'J028'},
        {name:'MKP Chowk',value:'J029'},
        {name:'Globe Chowk',value:'J030'},
        {name:'Sri Durga Sweet Shop',value:'J031'},
        {name:'Near CMI Hospital',value:'J032'},
        {name:'Race Course Chowk',value:'J033'},
        {name:'Garhi Cantt Chowk',value:'J034'},
        {name:'Kamla Palace',value:'J035'},
        {name:'Income Tax Chowk',value:'J036'},
        {name:'Doon Hospital',value:'J037'},
        {name:'Fountain Chowk',value:'J038'},
        {name:'Rispana Junction',value:'J039'},
        {name:'Saint Jude Chowk',value:'J040'},
        {name:'Kargi Chowk',value:'J041'},
        {name:'Dharampur Chowk',value:'J042'},
        {name:'Shastradhara Crossing',value:'J043'},
        {name:'ONGC Chowk',value:'J044'},
        {name:'6 No. Puliya',value:'J045'},
        {name:'Darshan Lal Chowk',value:'J046'},
        {name:'FRI Gate',value:'J047'},
        {name:'Vasant Vihar',value:'J048'},
        {name:'Shubhash Chowk',value:'J049'},
        
      ];

      console.log("TrafficListArray", $scope.trafficList);
    }

    //for traffic signal
    $scope.getDashBoardDataFunTrafficSignal = function () {

      if($localStorage.langID == "2"){
        $ionicLoading.show({ template: 'लोड हो रहा है...'    });
      }else{
        $ionicLoading.show({ template: 'Loading...'    });
      }

      RestService.getTrafficSignalListDynamic().then(function (response) {
        if (response == undefined || response == null || response == "") {
          toaster.error($filter('translate')('TRAFFICERROR'));
          $ionicLoading.hide();
          return false;
        }
        else{
          $ionicLoading.hide();

          var trafficSignalArray = new Array();
          response.TrafficSignal.dynamics.map(data =>{

            var TimePackateRec = data.congestionLastUpdated;
            var isInTime = $scope.timeCompare(TimePackateRec)                                                                                                                         
              
            //if(data.modeType=="Flash" && data.isActive==0){
            if(data.colour > 0.0){  
              if(isInTime==true && data.isActive==1){
                trafficSignalArray.push({
                  systemCodeNumber : data.systemCodeNumber,
                  //shortDescription : data.shortDescription,
                  colour : parseFloat(data.colour).toFixed(3),
                  isInTime : isInTime,
                  //modeType: data.modeType,
                  isActive: data.isActive
                });
              } /* else {
                console.log("systemCodeNumber", data.systemCodeNumber);
              } */
            }
          });

//var trafficSignalArray2 = new Array();
          for(i=0;i<trafficSignalArray.length;i++){
            for(j=0;j<$scope.trafficList.length;j++){
              if(trafficSignalArray[i].systemCodeNumber == $scope.trafficList[j].value){
                trafficSignalArray[i].shortDescription = $scope.trafficList[j].name;
              }
            }
          }

          console.log("trafficFullList Full", trafficSignalArray);

          //response.TrafficSignal.definitions.map(data =>{
          /* for(i=0;i<$scope.trafficList.length;i++){
            trafficSignalArray.push({
              //systemCodeNumber : data.systemCodeNumber,
              //shortDescription : data.shortDescription,
              systemCodeNumber : $scope.trafficList[i].value,
              shortDescription : $scope.trafficList[i].name,
              //colour : parseFloat(data.colour).toFixed(3)
            });
          } */
          
          //});

          trafficSignalArray.sort(function(a, b) {                    //Sorting List from High to Low
            if (a.colour < b.colour) return 1;
            if (a.colour > b.colour) return -1;
            return 0;
          });
          
          $scope.getDashBoardData = trafficSignalArray;
          console.log("getDashBoardData", $scope.getDashBoardData);

          if($scope.getDashBoardData.length > 0){                                       //Pagination
              $scope.totalPagination = parseInt($scope.getDashBoardData.length / 8);
              if ($scope.totalPagination * 8 != $scope.getDashBoardData.length)
                $scope.totalPagination = $scope.totalPagination + 1;
              $scope.getDashBoardDataPageDataTrafficSignal(0);
              for (var i = 0; i < $scope.totalPagination; i++)
                $scope.currentPaginationArray.push(i);
              }
        }
        $ionicLoading.hide();
      }, function (err) {
        //toaster.error($filter('translate')('TRAFFICERROR'));
        console.log("Error for Traffic", err);
        toaster.error($filter('translate')('TRAFFICTHIRDPARTYERROR'));
        $ionicLoading.hide();
      })
    }

    $scope.getDashBoardDataPageDataTrafficSignal = function (page, option) {
      if (option == 'fix')
        $scope.pagginationSelect = page;

      $scope.currentPagination = page;
      var minD = page * 8, maxD = minD + 8;
      $scope.getDashBoardDataPage = [];
      $scope.getDashBoardData.forEach((entry, index) => {
        if (index >= minD && index < maxD)
          $scope.getDashBoardDataPage.push(entry);
      });
    }

    $scope.calculateIndex = function (index) {
      // console.log("$scope.currentPagination" + $scope.currentPagination);
      if ($scope.currentPagination == 0) {
        return index + 1;
      } else {
        return ($scope.currentPagination) * 8 + (index+1);
      }
    }


    $scope.getNumber = function (num) {
      return new Array(num);
    }
    var _init = function () {      
      if(!$rootScope.checkLocationOFF()) {
        return;
    }
      $scope.getDashBoardDataFunTrafficSignal();
      $scope.trafficListOption();
    };
    _init();

  })