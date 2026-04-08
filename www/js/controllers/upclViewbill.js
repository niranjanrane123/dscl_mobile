angular.module('starter')
  .controller('upclViewBillCtrl', function ($rootScope, $scope, RestService, $ionicLoading, $stateParams, toaster,
    $filter, ENV, $state, $localStorage, $sessionStorage, $ionicPopup, $ionicModal, $cordovaGeolocation, $ionicHistory,$ionicPlatform,localStorageService,$window) {

  //$scope.accNo = 41701026541;     //testing
  $scope.accNo = "";
  $scope.fileName = "download.pdf";
  $scope.showList = false;
  $scope.showPayBtn = true;

  $ionicPlatform.ready(function(){
    $scope.isIOS = ionic.Platform.isIOS();
    console.log('ios-->',$scope.isIOS);
    $scope.isAndroid = ionic.Platform.isAndroid();
    console.log('android-->',$scope.isAndroid);
  });
  

  $scope.searchBill = function(){

    if($scope.accNo){
      console.log("Entered upcl", $scope.accNo)

      $ionicLoading.show({ template: $filter('translate')('LOADING') });
            
      RestService.getUPCLBillDetails($scope.accNo).then(function (response) {
        //console.log("response 1", response);
        if (response == undefined || response == null || response == "") {
          $ionicLoading.hide();
          $scope.showList = false;
          return false;
        } else {
          if(response.status == 'FAIL'){
            $ionicLoading.hide();
            toaster.error($filter('translate')('VALIDACCOUNTNO'));
          } else {
            $scope.billDetail = response.billDetails[0];
            $scope.accNumber = $scope.billDetail.electricityAccountNumber;
            $scope.serviceNumber = $scope.billDetail.electricityServiceNumber;
            $scope.custName = $scope.billDetail.consumerName ; 
            $scope.catCode = $scope.billDetail.category ;
            $scope.billDate = $scope.billDetail.billDate ;
            $scope.billDueDate = $scope.billDetail.billDueDate ;
            $scope.currentBillAmount = $scope.billDetail.billAmount ;
            $scope.downloadBill = $scope.billDetail.amountDue ;
            //$scope.downloadBill = 100 ; //testing


            if($scope.downloadBill==0){
              $scope.showPayBtn = false;
            } else {
              $scope.showPayBtn = true;
            }

            console.log($scope.billDetail);
            $scope.showList = true;
            $ionicLoading.hide();
          }
        }

        $ionicLoading.hide();
      }, function (err) {
        $ionicLoading.hide();
        toaster.error($filter('translate')('UPCLTHIRDPARTYERROR'));
      });
    } else {
      toaster.error($filter('translate')('PLSENTACCNO'));
    } 
  }

  onErrorLoadFs = function(errror) {

    console.log(" Eror onErrorLoadFs "+errror);
    toaster.error($filter('translate')('LOADERROR'));
    
  }

  onErrorCreateFile = function(error) {

    console.log("Eror onErrorCreateFile "+ JSON.stringify(error));
    toaster.error($filter('translate')('DOWNLOADERROR'));
    
  }

  onErrorReadFile = function(error) {

    console.log("Eror onErrorReadFile "+error);
    toaster.error($filter('translate')('READERROR'));
    
  }

  
  function readFile(fileEntry) {

    fileEntry.file(function (file) {
        var reader = new FileReader();

        reader.onloadend = function() {
            console.log("Successful file read: " + this.result);
            // displayFileData(fileEntry.fullPath + ": " + this.result);
            console.log("file entry---", fileEntry.fullPath,"2nd ",fileEntry.toNativeURL())
            // displayFileData(fileEntry.fullPath + ": " + this.result);
            cordova.plugins.notification.local.schedule({
              id:1,
              title: 'Your file has been downloaded successfully',
              text: 'Check your Downloads Folder',
              foreground: true,
              icon: "res://ic_launcher",
            });
  
// Defect. #185631            
            /* cordova.plugins.fileOpener2.open(
              fileEntry.toNativeURL(), // You can also use a Cordova-style file uri: cdvfile://localhost/persistent/Downloads/starwars.pdf
              'application/pdf',
              {
                  error : function(e) {
                      console.log('Error status: ' + e.status + ' - Error message: ' + e.message);
                      toaster.error(e.message);
                  },
                  success : function () {
                      console.log('file opened successfully');
                      toaster.success($filter('translate')('DOWNLOADSUCCESS'));
                  }
              }
          ); */
        };

        reader.readAsDataURL(file);

    }, onErrorReadFile);
}


  function writeFile(fileEntry, dataObj) {
    // Create a FileWriter object for our FileEntry (log.txt).
    fileEntry.createWriter(function (fileWriter) {

        fileWriter.onwriteend = function() {
            console.log("Successful file write...");
            console.log("fileEntry="+fileEntry.fullPath+ " "+fileEntry);
            readFile(fileEntry);
        };

        fileWriter.onerror = function (e) {
            console.log("Failed file write: " + e.toString());
            toaster.error($filter('translate')('DOWNLOADERROR'));
        };

        // If data object is not passed in,
        // create a new Blob instead.
        // if (!dataObj) {
        //     dataObj = new Blob(['some file data'], { type: 'text/plain' });
        // }

        fileWriter.write(dataObj);
    });
}



//   $scope.downloadPDFFn = function() {
//     // toaster.error($filter('translate')('CANTPREVIEWTHISFILE'));




//      RestService.getUPCLBillDownload($scope.accNo).then(function (response) {
//       console.log("response 1", response);
//       if (response == undefined || response == null || response == "") {
//         $ionicLoading.hide();
//         return false;
//       } else {
//         $scope.downloadPDF = response;
//           var fileName = $scope.accNo + ".pdf";
//         //Convert the Byte Data to BLOB object.
//         var blob = new Blob([response], { type: "application/pdf" });


//         var filePath = cordova.file.externalRootDirectory + '/Download/'+ fileName;
//         console.log("file path="+ filePath);

//         window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fs) {

//           console.log('file system open: ' + fs.name);
//           window.resolveLocalFileSystemURL(cordova.file.externalRootDirectory,function ( dirEntry) {

//             dirEntry.getDirectory('Download', { create: true }, function (dirEntry) {

//             dirEntry.getFile(fileName, { create: true, exclusive: false }, function (fileEntry) {
      
//               console.log("fileEntry is file?" + fileEntry.isFile.toString());
//               // fileEntry.name == 'someFile.txt'
//               // fileEntry.fullPath == '/someFile.txt'
//               writeFile(fileEntry, $scope.downloadPDF);
          
//           }, onErrorCreateFile);
//         });
//       });
//       }, onErrorLoadFs);

     
// // file download code end

         
//         $ionicLoading.hide();
//       }

//       $ionicLoading.hide();
//     }, function (err) {
//       $ionicLoading.hide();
//       toaster.error($filter('translate')('UPCLTHIRDPARTYERROR'));
//     });

//   }



  // download code start

  $scope.downloadPDFFn = function() {

    $ionicLoading.show({ template: $filter('translate')('DOWNLOADING') });
    var xhr = new XMLHttpRequest();
    // xhr.open('GET', 'http://cordova.apache.org/static/img/cordova_bot.png', true);
    xhr.open('GET', ENV.upclURL + 'wssservices/api/v1/externalDownloadBill?accountNumber=' + $scope.accNo, true);
    xhr.responseType = 'blob';
    xhr.setRequestHeader("did", "849fecb23fd5795266cff42731c82873");
    xhr.setRequestHeader("serviceKey", "D20LUPCL22849");

    xhr.onload = function() {
        if (this.status == 200) {

            var blob = new Blob([this.response], { type: 'application/pdf' });
            console.log("blob="+blob);
            var fileName = $scope.accNo +'_'+Date.now()+ ".pdf";
            var dataDirectory;
            if($scope.isIOS){
              dataDirectory=cordova.file.syncedDataDirectory;
            }else{
              dataDirectory=cordova.file.externalRootDirectory
            }
            console.log("dataDirectory-----s",dataDirectory)

            window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fs) {

              console.log('file system open: ' + fs.name);
              window.resolveLocalFileSystemURL(dataDirectory,function ( dirEntry) {
    
                dirEntry.getDirectory('Download', { create: true }, function (dirEntry) {
    
                dirEntry.getFile(fileName, { create: true, exclusive: false }, function (fileEntry) {
          
                  console.log("fileEntry is file?" + fileEntry.isFile.toString());
                  // fileEntry.name == 'someFile.txt'
                  // fileEntry.fullPath == '/someFile.txt'
                  writeFile(fileEntry, blob);
                  $ionicLoading.hide();
              }, onErrorCreateFile);
            });
          });
          }, onErrorLoadFs);
        }
    };
    xhr.send();
}

 // download code end
 

  $scope.payBill = function(){
    console.log("Entered")

    var url = ENV.upclURL + "wss/viewBillDetails/" +$scope.accNo;
    console.log('UPCL Pay url-->',url);
    if($scope.isAndroid){
      console.log("In android")
      window.open(encodeURI(url), '_system', 'location=no,toolbar=yes,useWideViewPort=yes')
    }else{
        cordova.InAppBrowser.open(url, '_system', 'location=no,toolbar=yes,useWideViewPort=yes');
    }
  }

  /* $scope.base64ToArrayBuffer = function(base64) {
    var binaryString = window.atob(base64);
    console.log("1",binaryString);
    var binaryLen = binaryString.length;
    console.log("2",binaryLen);
    var bytes = new Uint8Array(binaryLen);
    console.log("3",bytes);
    for (var i = 0; i < binaryLen; i++) {
       var ascii = binaryString.charCodeAt(i);
       bytes[i] = ascii;
    }
    return bytes;
 }

 $scope.saveByteArray = function(reportName, byte) {
  console.log("4",reportName, byte);
  var blob = new Blob([byte], {type: "application/pdf"});
  console.log("5",blob);
  var link = document.createElement('a');
  link.href = window.URL.createObjectURL(blob);
  var fileName = reportName;
  link.download = fileName;
  console.log("6",link);
  link.click();
}; */


  var _init = function () {
    
  }
      
  _init();


});
  