angular.module('starter')

  .controller('ProjectSummryCtrl', function ($scope,RestService,$localStorage,$sessionStorage, $ionicPlatform,$ionicListDelegate,$ionicLoading, $stateParams, toaster, $filter, ENV, $state) {

    $scope.comeFrom  =  $sessionStorage.comeFrom; 
    $scope.approvedProjects = []; 
    $scope.otherProjects = [];  
    $scope.projects = $sessionStorage.mddaSummaryData;
    $scope.pageTitle = "MDDA";
    $scope.url = "";
    console.log("***comeFrom=", $scope.comeFrom);
    console.log('projectPage='+$scope.projects);    
    var min = Math.min.apply( null, $scope.projects.map((v) => v.year));
    console.log("min. year="+ min);
    var max = Math.max.apply( null, $scope.projects.map((v) => v.year));
    console.log("max. year="+ max);

    var showPieChart = function(){

      $scope.projects,    
      group = function (array) {
              var r = [], o = {};
              array.forEach(function (a) {
                // if(a.approvalStatus == 'approved')
                // {
                  if (!o[a.subDesc]) {
                      o[a.subDesc] = { key: a.subDesc, value: 0 };
                      r.push(o[a.subDesc]);
                  }
                  o[a.subDesc].value++;
                  // o[a.subDesc].value = o[a.subDesc].value + a.count;
                // }
              });
              return r;
          }($scope.projects);
      
      console.log("eg count="+JSON.stringify(group, 0, 4));
      
      var lab = [];
      var countVal = [];
      
      group.forEach(function (x) { 
        
        lab.push($filter('translate')(x.key.toUpperCase().replaceAll(" ","_")));  
        countVal.push(x.value);
      
       });
      
       console.log("eg lab="+JSON.stringify(lab, 0, 4));
       console.log("eg countVal="+JSON.stringify(countVal, 0, 4));
      
      
      $scope.labels = lab;
      $scope.data = countVal;
      
      
       // demo code start
       var canvas = document.getElementById('myChart');
       new Chart(canvas, {
           type: 'pie',    
           data: {
             labels: lab,
             datasets: [{
               data: countVal,
               backgroundColor: ['#46bbb1', '#525ca2','#7BABA5','#1fa630','#aa3300']
             }]
           },
           options: {
            legend: {
              position: 'bottom',
              display: true,
              fontColor: '#191947',
              fontSize: 14
          },
            title: {
              display: true,
              fontSize: 17,
              fontColor: '#191947',
              text: $filter('translate')('MDDA_SERVICE') + " " + min + "-" + max
          },
             responsive: true,
             maintainAspectRatio: true,
             plugins: {
                 labels: {
                 render: 'value',
                 fontStyle: 'bold',
                 fontSize: 14,
                 fontColor: ['white', 'white', 'white','white','white']
               },

               outlabels: {
                text: '',
                backgroundColor: null,
                color: ['white', 'white', 'white'],
                stretch: 0,
                font: {
                  resizable: true,
                  minSize: 12,
                  maxSize: 16,
                  style: 'bold'
                },
                // zoomOutPercentage: 100,
                textAlign: 'center',
                backgroundColor: null
             }
             }
           }
       });
      
    }

    var showDoughnutChart = function(){

      $scope.projects,    
        group = function (array) {
                var r = [], o = {};
                array.forEach(function (a) {
                  if(a.approvalStatus != 'approved')
                  {
                    if (!o[a.approvalStatus]) {
                        o[a.approvalStatus] = { key: a.approvalStatus, value: 0 };
                        r.push(o[a.approvalStatus]);
                    }
                    o[a.approvalStatus].value++;
                    // o[a.subDesc].value = o[a.subDesc].value + a.count;
                  }
                });
                return r;
            }($scope.projects);
        
        console.log("eg count="+JSON.stringify(group, 0, 4));
        
        var lab = [];
        var countVal = [];
        var pointers=[];
        
        group.forEach(function (x) { 
          if(x.key == " ")
          {
            x.key = 'Others';
          }
        lab.push($filter('translate')(x.key.toUpperCase()));
        countVal.push(x.value);
        pointers.push($filter('translate')(x.key.toUpperCase())+'\n'+x.value);
        
         });
        
         console.log("eg lab="+JSON.stringify(lab, 0, 4));
         console.log("eg countVal="+JSON.stringify(countVal, 0, 4));
        
        
        $scope.labels = lab;
        $scope.data = countVal;
        
        
         // demo code start
         var canvas = document.getElementById('myChart');
         new Chart(canvas, {
             type: 'doughnut',    
             data: {
               labels: lab,
               datasets: [{
                 data: countVal,
                 backgroundColor: ['blue', 'green','red']
               }]
             },
             options: {
              layout: {
               padding:30
            },
              
              legend: {
                position: 'top',
                display: true,
                fontColor: 'black',
                fontSize: 14,
                fontStyle: 'bold',
               

            },
              title: {
                display: true,
                fontSize: 17,
                fontColor: '#191947',
                text: $filter('translate')('MDDA_BPMS') + " " + min + "-" + max
            },
               responsive: true,
               maintainAspectRatio: true,
               plugins: {
                labels: {
                  render: () => {}
                },
                //    labels: {
                //    render: 'value',
                //    fontStyle: 'bold',
                //    fontSize: 14,
                //    fontColor: ['white', 'white', 'white']
                //  },
                outlabels: {
                  text: pointers,
                  backgroundColor: null,
                  color: ['blue', 'green', 'red'],
                  stretch: 10,
                  font: {
                    resizable: true,
                    minSize: 12,
                    maxSize: 16,
                    style: 'bold'
                  },
                  // zoomOutPercentage: 100,
                  textAlign: 'center',
                  backgroundColor: null
               }
             }
            }
         });
    }

    if($scope.comeFrom == "appCount")
    {
        $scope.pageTitle = $filter('translate')('MDDA_SERVICE');
        showPieChart(); 
      
    }
    else if($scope.comeFrom == "bpmsCount")
    {
        $scope.pageTitle =  $filter('translate')('MDDA_BPMS');
        showDoughnutChart();
    
    }
    
    
    var deregisterSecond = $ionicPlatform.registerBackButtonAction(
  		      function() {
                          if($localStorage.responselogindata){
                           		                $state.go('app.home');
                           		               }else{
                           		               $state.go('app.LandingPage');
                           		               }
  		      }, 100
  		    );

        })          