angular.module('starter')
  .controller('uploadmodalCtrl', function ($rootScope,$scope, RestService, $ionicLoading, $stateParams, toaster, $sessionStorage,
		  $filter, ENV, $state, $rootScope,$localStorage,$window) {

//console.log("modal.responselogindata-->"+JSON.stringify($localStorage.responselogindata));
$scope.showbutton = false;

$scope.gallery = function()
{
//alert("function get call")
    $scope.uploadtableshow = true;
    $scope.showbutton = true;
}

$scope.removeimages = function (index){
	  angular.element("input[type='file']").val(null);
    console.log("arrayListTest---"+JSON.stringify(arrayListTest));
	  arrayListTest.splice(index, 1);
	 console.log("arrayListTest---"+JSON.stringify(arrayListTest));
}

var arrayListTest = [];
var verfy;
 $scope.imageupload = function(fileObject){
 $ionicLoading.show({			template: $filter('translate')('LOADING')	});
		var reader = new FileReader();
		var idValue	=	fileObject.getAttribute("id");
		verfy  = fileObject.files[0];
		  var maxSize = fileObject.getAttribute('data-max-size');
	    var fileSize = verfy.size;

	    var ext = fileObject.value.split('.').pop();
      		if(ext){
      	    	if(ext == "pdf" || ext == "docx" || ext == "doc" || ext == "jpg" || ext == "png"){
      	        }
      	    	else{
      	    		fileObject.value = "";
      	        	$rootScope.simpleAlert('Only pdf, doc, docx ,jpg and png extension file(s) allowed.');
                    $ionicLoading.hide();
      	            return;
      	    	}
      	    }else{
      	    	$rootScope.simpleAlert('validdocument');
              $ionicLoading.hide();
      	    	return;
      	    }
      	    if(fileSize > maxSize){
      	    	fileObject.value = "";
      	        $rootScope.simpleAlert('File Size Must Not Be Greater Than 5 MB');
              $ionicLoading.hide();
      	        return;
      	    }

     	reader.onload = function(e){
	  console.log("about to encode");
			$scope.encoded_file = window.btoa(e.target.result.toString());
			 $scope.encoded_file = "Testing";
//      console.log("Encoded data---"+$scope.encoded_file);

				var documentObject	=
				{
					attachmentId: null,
					documentId: null,
					documentName: verfy.name,
					documentSerialNo: null,
					descriptionType: null,
					documentType: null,
					doc_DESC_Mar:null,
					doc_DESC_ENGL: null,
					documentByteCode: $scope.encoded_file,
					checkkMANDATORY:null
				};
					arrayListTest.push(documentObject);
					console.log("TempArray-----"+JSON.stringify(arrayListTest))
			};
		reader.onloadend = function(){
		 $ionicLoading.hide();};
		reader.readAsBinaryString(verfy);
	};


/* -----------------------taking camera picture function ---------------------------------------*/
$scope.getPhoto = function()
{
	navigator.camera.getPicture(onSuccess, onFail,
		{
		  quality : 75,
		  destinationType : Camera.DestinationType.DATA_URL,
		  sourceType : Camera.PictureSourceType.CAMERA,
		  encodingType: Camera.EncodingType.JPEG,
		  targetWidth: 900,
		  targetHeight: 600,
		  popoverOptions: CameraPopoverOptions,
		  saveToPhotoAlbum: true
		  }
	);

	function onSuccess(result) {
//$scope.lastPhoto = "data:image/jpeg;base64," + result;
/*$('img#myImage').attr('src', $scope.lastPhoto);*/
$ionicLoading.show({	template: $filter('translate')('LOADING')	});
/* var image = document.getElementById('myImage');
    image.src = "data:image/jpeg;base64," + result;*/

//alert("===$scope.lastPhoto==="+$scope.lastPhoto);
  // convert JSON string to JSON Object
 	   var thisResult = JSON.parse(result);

	   var filebytecode = thisResult.filename;
     $scope.myImgUrl = 'data:image/jpeg;base64,' + thisResult.filename;
//         alert("$scope.myImgUrl------"+$scope.myImgUrl);
//    console.log("filebytecode--"+filebytecode);

$scope.showbutton = true;
$scope.takephotoshow =true;

    var cameraimage = "CameraImage";
		var documentObject	=
				{
					attachmentId: null,
					documentId: null,
					documentName: cameraimage,
					documentSerialNo: null,
					descriptionType: null,
					documentType: null,
					doc_DESC_Mar:null,
					doc_DESC_ENGL: null,
					documentByteCode: filebytecode,
					checkkMANDATORY:null
				};
					arrayListTest.push(documentObject);
			console.log("TempArray-camera----"+JSON.stringify(arrayListTest))
			 $ionicLoading.hide();
	}

	function onFail(message) {
	    alert('Failed because: ' + message);
	     $ionicLoading.hide();
	}
}


$scope.uploadmodal = function()
{
  $sessionStorage.uploadfinaldata = arrayListTest;
  console.log("$sessionStorage.uploadfinaldata-----"+JSON.stringify($sessionStorage.uploadfinaldata));
  $scope.modal.hide();
//  $state.go("app.LodgeComplaint");
}


/* $('#myTableNorth').on('click', 'input[type="button"]', function () {
     $(this).closest('tr').remove();
 })*/

 $scope.deleteTr = function(){
 alert("de");
    $(this).closest('tr').remove();
 }

$scope.deleteRow = function(row)
{
  alert("row--"+row);
//
//  console.log("row--"+JSON.stringify(row));
//    var i=row.parentNode.parentNode.rowIndex;
    document.getElementById("myTableID").deleteRow(0);
}

function deleteRow(r){
  alert("row--"+r);

 document.getElementById("myTableID").deleteRow(r);

}

var rowCount;

$scope.tradd = function(){

  rowCount = $('#myTableID tr').length;

     if(rowCount == 5)
     {
         $rootScope.simpleAlert("You cannot upload more than 5 images")
         return;
     }else{

             $('#myTableID').append('<tr id="rowCount">'
               +'<td><input data-max-size="5000000" type="file" class="filecss" onchange="angular.element(this).scope().imageupload(this)"/></td>'
               +'<td><input type="button" onclick="deleteRow(rowCount)" value="Delete" /></td>'
               +'</tr>');
         }
}

    var _init = function (){
//alert("$localStorage.responselogindata---"+JSON.stringify($localStorage.responselogindata));
    };
    _init();
  });

