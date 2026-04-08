angular.module('starter')
  .controller('CCaboutusCtrl', function ($scope, RestService, $ionicLoading, $stateParams, toaster, $filter,
		  ENV, $state, sharedProperties, $localStorage, localStorageService,$sessionStorage) {
    $scope.allItems=[
    {news:"Total Visitors :- 1892"},
    {news:"Today Visitors :- 852"},
    {news:"Active Users :- 82"},
    {news:"Total Visitors :- 1892"},
        {news:"Today Visitors :- 852"},
        {news:"Active Users :- 82"},
            {news:"Registered Users :- 852"}
    ];

 $scope.labels = ["January", "February", "March", "April", "May", "June", "July"];
    $scope.series = ['Series A', 'Series B'];
    $scope.data = [
        [65, 59, 80, 81, 56, 55, 40],
        [28, 48, 40, 19, 86, 27, 90]
    ];

var json = {
        "series": ["SeriesA"],
        "data": [["90", "99", "80", "91", "76", "75", "60", "67", "59", "55"]],
        "labels": ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10"],
        "colours": [{ // default
          "fillColor": "rgba(224, 108, 112, 1)",
          "strokeColor": "rgba(207,100,103,1)",
          "pointColor": "rgba(220,220,220,1)",
          "pointStrokeColor": "#fff",
          "pointHighlightFill": "#fff",
          "pointHighlightStroke": "rgba(151,187,205,0.8)"
        }]
      };
  $scope.ocw = json;
  var _init = function (){

    };
    _init();
  });
