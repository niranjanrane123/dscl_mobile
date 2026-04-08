angular.module('starter')

	.controller('reopenTokenCtrl', function ($scope, $rootScope, RestService, $ionicLoading, $stateParams, $ionicPopup,
		toaster, $filter, ENV, $state, $localStorage, $sessionStorage, $ionicHistory, $ionicScrollDelegate) {

		$scope.orgid = $localStorage.selectedorgID;
		$scope.userID = $localStorage.responselogindata.userId;
		$scope.loginUSername = $localStorage.responselogindata.firstName;
		$scope.LoginMobileNo = $localStorage.responselogindata.mobileNo;
		$scope.tokenNumber = "";
		$scope.reply = "";
		$scope.data = {};
		$scope.selectfilename;
		$scope.encoded_file;
		$scope.langID = $localStorage.langID;
		console.log("allgrievance--->" + JSON.stringify($sessionStorage.allgrievanceresponse));
		
		$scope.zoomedIn = false;
		$scope.zoomedInStatus = false;
		$scope.showCompAtt = false;

		$scope.attachments = [];
  	$scope.counter = 0;
		
		var allgrievanceresponse = $sessionStorage.allgrievanceresponse;

		console.log("allgrievanceresponse " + allgrievanceresponse);

		if (allgrievanceresponse != "") {
			for (var i = 0; i < allgrievanceresponse.length; i++) {
				if ($sessionStorage.SelectedTask == allgrievanceresponse[i].complaintId) {
					$scope.complaintID = allgrievanceresponse[i].complaintId
					$scope.tokenNumber = allgrievanceresponse[i].applicationId;
					$scope.department = $scope.langID == "1" ? allgrievanceresponse[i].departmentComplaintDesc : allgrievanceresponse[i].departmentComplaintDescReg;
					$scope.complainttype = $scope.langID == "1" ? allgrievanceresponse[i].complaintTypeDesc : allgrievanceresponse[i].complaintTypeDescReg;
					$scope.compdesc = allgrievanceresponse[i].description
					if(allgrievanceresponse[i].status == 'CLOSED'){
						$scope.status = 'Closed';
					} else if (allgrievanceresponse[i].status == 'PENDING'){
						$scope.status = 'Pending';
					} else{
						$scope.status = allgrievanceresponse[i].status;
					}
					
				}
			}
		} else {

			var confirmPopup = $ionicPopup.show({

				title: $filter('translate')('message'),
				template: 'Closed Request Not Found',

				buttons: [
					{
						text: 'Ok',
						type: 'button button-block  customBgColor',
						onTap: function () {
							$state.go("app.home");
							//					            	 ionic.Platform.exitApp();
						}
					}]
			});

		}

		console.log("$sessionStorage.actionhistoryresponse--" + $sessionStorage.actionhistoryresponse);
		var actionhistoryresponse = $sessionStorage.actionhistoryresponse;



		/*var counter = 1;
		
		var tempvar = '<tr>'+
			'<th>Sr.No</th>'+
			'<th>Date</th>'+
			'<th>Action</th>'+
			'<th>Employee Name</th>'+
			'<th>Email</th>'+
			'<th>Designation</th>'+
			'<th>Remarks</th>'+
			'</tr>';
		var usagedoctable = "";
		for (var i = 0; i < actionhistoryresponse.length; i++) {
		
				var date = formatDate(actionhistoryresponse[i].dateOfAction);
				var fname = actionhistoryresponse[i].actor.fname;
				var lname = actionhistoryresponse[i].actor.lname;
		//		var fullname = fname.concat(lname);
				var fullname = fname+ " " +lname;
				var comments = capitalise(actionhistoryresponse[i].decision);
		
			tempvar = tempvar +
			'<td><span>'+ counter++ +'</span></td>'+
			'<td><span>'+ date +'</span></td>'+
			'<td><span>'+ fullname +'</span></td>'+
			'<td><span>'+ comments +'</span></td>'+
			'</tr>';
		
			var date = formatDate(actionhistoryresponse[i].dateOfAction);
			var action = actionhistoryresponse[i].decision;
			var fullname = actionhistoryresponse[i].empName;
			var email = actionhistoryresponse[i].empEmail;
			var designation = actionhistoryresponse[i].empGroupDescEng;
			var remarks = actionhistoryresponse[i].comments;
		
			tempvar = tempvar +
			'<td><span>'+ counter++ +'</span></td>'+
			'<td><span>'+ date +'</span></td>'+
			'<td><span>'+ action +'</span></td>'+
			'<td><span>'+ fullname +'</span></td>'+
			'<td><span>'+ email +'</span></td>'+
			'<td><span>'+ designation +'</span></td>'+
			'<td><span>'+ remarks +'</span></td>'+
			'</tr>';
		
		}
		
		var tempvar = '<table class="gridtable">'+tempvar+'</table>';
		document.getElementById('ReplyDocIDData').innerHTML = tempvar;*/

		/*function start*/

		$scope.compdescription = false;




		$scope.tokenNumber;
		$scope.reopencomplaint = function () {
			$scope.tokenNumber;
			console.log("$scope.tokenNumber---" + $scope.tokenNumber);
			if ($localStorage.langID == "2") {
				$ionicLoading.show({ template: 'लोड हो रहा है...' });
			} else {
				$ionicLoading.show({ template: 'Loading...' });
			}
			RestService.getCareRequestByRequestNo($scope.tokenNumber).then(function (response) {
				console.log("response=", response);

				if (response == undefined || response == null || response == "") {
					$ionicLoading.hide();
					return false;
				}
				else {
					console.log("compdescription");
					$sessionStorage.RequestNoresponse = response;
					$scope.compdescription = true;
					$ionicScrollDelegate.scrollBottom();
				}
				$ionicLoading.hide();
			}, function (err) {
				toaster.error($filter('translate')('REOPENCOMPLAINTERROR')/* , $filter('translate')('ERROR') */);
				$ionicLoading.hide();
			})
		}

		$scope.reopencompsave = function () {
			var complaintType = "Reopen Complaint";
			console.log("selectfilename=--" + $scope.selectfilename);
			console.log("$scope.encoded_file=--" + $scope.encoded_file);

			$scope.uploadeddoc = arrayListTest;

			if($scope.data.reOpeningRemark){

				if ($scope.data.reOpeningRemark == 43377){
					if($scope.data.reply){
						$scope.saveReopenCompAfterValidation();
					} else if(!$scope.data.reply){
						toaster.clear()
						toaster.error($filter('translate')('PLSENTREPLY'));
					}
				} else {
					$scope.saveReopenCompAfterValidation();
				}
			
			} else if (!$scope.data.reOpeningRemark) {
				toaster.clear()
				toaster.error($filter('translate')('PLSENTREOPENINGREMARK'));
			} 
		}


		$scope.saveReopenCompAfterValidation = function(){

			$scope.uploadeddoc = arrayListTest;
			if ($localStorage.langID == "2") {
				$ionicLoading.show({ template: 'लोड हो रहा है...' });
			} else {
				$ionicLoading.show({ template: 'Loading...' });
			}
			RestService.reopenedSaveGrievances($sessionStorage.RequestNoresponse, $scope.data.reply, $scope.orgid, $scope.userID,
				$scope.tokenNumber, $scope.uploadeddoc, $scope.data.reOpeningRemark, $scope.LoginMobileNo).then(function (response) {
					if (response.response == "SUCCESS") {

						$scope.requestNo = response.responseData.requestNo;
						$scope.decision = response.responseData.decision;

						var confirmPopup = $ionicPopup.show({

							title: $filter('translate')('message'),
							template: $filter('translate')('COMPNUMBERIS') + $sessionStorage.RequestNoresponse.complaintId + " " + $filter('translate')('ISSUCCESS') + " " + $filter('translate')('REOPENED') + '</b>',
							buttons: [{
								text: $filter('translate')('OK'),
								type: 'button button-block  customBgColor',
								onTap: function () {
									$sessionStorage.reopensavedata = response;
									$state.go("app.home");

									console.log("$sessionStorage.RequestNoresponse---" + JSON.stringify($sessionStorage.RequestNoresponse));
									$scope.NewCompDeptdetails = $sessionStorage.RequestNoresponse.departmentComplaint;
									$scope.NewCompType = $sessionStorage.RequestNoresponse.complaintType;
									/*     	 RestService.escalation($scope.NewCompDeptdetails,$scope.NewCompType,$scope.orgid)
												 .then(function (escresponse) {
													 if(escresponse==undefined || escresponse == null || escresponse=="")
													   {
															  return false;
															  $ionicLoading.hide();
													   }
													   else
													   {
														   $sessionStorage.escresponse = escresponse;
															 $state.go("app.complaintreceipt");
																 $ionicLoading.hide();
													   }
													 $ionicLoading.hide();
												 },
												 function (err) {
													 $ionicLoading.hide();
													 toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR'));
												 })*/

									RestService.getGrievanceStatus($sessionStorage.RequestNoresponse.applicationId, $localStorage.langID).then(function (escresponse) {
										if (escresponse == "" || escresponse == undefined || escresponse == null) {
											return false;
											$ionicLoading.hide();
										} else {
											$sessionStorage.escresponse = escresponse;
											$state.go("app.complaintreceipt");
										}
										$ionicLoading.hide();
									}, function (err) {
										$ionicLoading.hide();
										toaster.error($filter('translate')('REOPENCOMPLAINTERROR')/* , $filter('translate')('ERROR') */);
									})
									$ionicLoading.hide();
								}
							}]
						});

					}
					else {
						console.log('testing 1');
						//toaster.error($filter('translate')('ERROR'), $filter('translate')('ERROR'));
						toaster.error(response.responseData.errorMessage);
						$ionicLoading.hide();
					}
					$ionicLoading.hide();
				}, function (err) {
					toaster.error($filter('translate')('REOPENCOMPLAINTERROR')/* , $filter('translate')('ERROR') */);
					$ionicLoading.hide();
				})
		}

		var arrayListTest = [];

		$scope.imageupload = function (fileObject) {

			var fileSizeChecking = $scope.fileSizeCheck();
			console.log("Outside if", fileSizeChecking);
      if(fileSizeChecking){
        console.log("Entered if", fileSizeChecking);
        return;
      } else {

					if($scope.counter >= 5){
						console.log("Entered if", $scope.counter)
						alert($filter('translate')('NOMORETHAN5IMG'));
						return
					}
					console.log("Entered Image Upload", $scope.counter)

			if ($localStorage.langID == "2") {
				$ionicLoading.show({ template: 'लोड हो रहा है...' });
			} else {
				$ionicLoading.show({ template: 'Loading...' });
			}
			var verfy = document.getElementById('verfiyFile').files[0];
			$scope.selectfilename = verfy.name;
			var reader = new FileReader();
			var maxSize = fileObject.getAttribute('data-max-size');
			var fileSize = verfy.size;
			var ext = fileObject.value.split('.').pop();
			if (ext) {
				if (ext == "pdf" || ext == "docx" || ext == "doc" || ext == "jpeg" || ext == "jpg" || ext == "png" || ext == "gif") {
					$scope.extension = ext;
				} else {
					fileObject.value = "";
					$ionicLoading.hide();
					$rootScope.simpleAlert('Onlypdfdocxls');
					return;
				}
			} else {
				$rootScope.simpleAlert('validdocument');
				$ionicLoading.hide();
				return;
			}
			if (fileSize > maxSize) {
				fileObject.value = "";
				$rootScope.simpleAlert('validdocumentSize');
				$ionicLoading.hide();
				return;
			}

			reader.onload = function (e) {
				//	$scope.encoded_file ="Testing";
				console.log("about to encode");
				$scope.encoded_file = window.btoa(e.target.result.toString());
				console.log("encoded byte--" + $scope.encoded_file);
				var sizeinKB = $scope.calculateImageSize($scope.encoded_file);
					let x = Math.floor((Math.random() * 100) + 11);
					var docNum = x;
					if($scope.extension == "pdf" || $scope.extension == "doc" || $scope.extension == "docx"){
						attName = "Doc";
					} else {
						attName = "Image";
					}
					
				var documentObject =
				{
					attachmentId: null,
					documentId: null,
					//documentName: verfy.name,
					documentName: attName + docNum + "." + $scope.extension,
					documentSerialNo: null,
					descriptionType: null,
					documentType:  $scope.extension,
					doc_DESC_Mar: null,
					doc_DESC_ENGL: null,
					documentByteCode: $scope.encoded_file,
					checkkMANDATORY: null,
					docSize: sizeinKB
				};
				arrayListTest.push(documentObject);
				$scope.attachments.push(documentObject);
				console.log("TempArray-----" + JSON.stringify(arrayListTest))
			};
			reader.onloadend = function () {
				$ionicLoading.hide();
			};
			reader.readAsBinaryString(verfy);

			$scope.counter++;
		}
	}
		
		$scope.reopencompreset = function (){
			$scope.data.reply = null   
			$scope.data.reOpeningRemark = null
			$scope.data.Document = null
			//$scope.data.reOpeningRemark = null
			//$scope.reOpeningOption = null
		}

		//For Defect #172512
		$scope.showRemarkDesc = false;

		$scope.selectedRemark = function(){
			console.log("remark", $scope.data.reOpeningRemark);

			if ($scope.data.reOpeningRemark == 43377){
				$scope.showRemarkDesc = true;
			} else {
				$scope.showRemarkDesc = false;
			}
		}

		$scope.allAttachments = [];
		$scope.actionhistory = [];
		var ext = [];
		
		$scope.showActionHistAttc = function(){
			
			if (actionhistoryresponse.length >= 0) {

				
				for (var i = 0; i < actionhistoryresponse.length; i++) {
					var objAttachments = actionhistoryresponse[i].attachements;
					console.log("objAttachments",objAttachments)

					var attchForActionHist = $scope.deptArrays.filter(a => 
						objAttachments.some(b => b.lookUpCode == a.documentName));
					
					console.log("attchForActionHist", attchForActionHist);

					for(var j=0; j<attchForActionHist.length; j++){
						// extensions.push(attchForActionHist[j].documentName.split('.').pop());  
						var extensions = attchForActionHist[j].documentName.split('.').pop();
						console.log("extension",extensions);
						attchForActionHist[j].documentType = extensions;
					}
					console.log("attchForActionHist2", attchForActionHist);

					/* var ext = attchForActionHist[i].documentName.split('.').pop();
					console.log("ext",ext) */
					
					$scope.actionhistory.push({
						datetime: formatDate(actionhistoryresponse[i].dateOfAction),
						action: actionhistoryresponse[i].decision,
						empName: actionhistoryresponse[i].empName,
						designation: $scope.langID == "1" ? actionhistoryresponse[i].empGroupDescEng : actionhistoryresponse[i].empGroupDescReg,
						Email: actionhistoryresponse[i].empEmail,
						remarks: actionhistoryresponse[i].comments, 
						actionAttachements: attchForActionHist,
						// docType: ext
					})
				}
				console.log("$scope.actionhistory2", $scope.actionhistory)
			}
		}

//Show Images Uploaded by Complainant and Departmnent Code
				$scope.compArrays = [];
        $scope.deptArrays = [];

        $scope.getCompAttachmentId = function(){
					console.log("Entered");
					
            $ionicLoading.show({ template: $filter('translate')('LOADING') });
            RestService.getComplaintAttachmentId($scope.complaintID).then(function (response) {
                if(response == null || response == '' || response == undefined){
                    $ionicLoading.hide();
                    return false;
                } else {
                    $ionicLoading.hide();
                    $scope.compArrays = response.attachments;
                    if($scope.compArrays.length>0){
                        $scope.showCompAtt = true;

                        for(i=0;i<$scope.compArrays.length;i++){
                            var documentType = $scope.compArrays[i].documentName.split('.');
                            documentType = documentType[1];
                            console.log("$scope.documentType2",documentType);
                            var key = 'docType';
                            $scope.compArrays[i][key] = documentType;
                        }
                        console.log("$scope.compArrays",$scope.compArrays, $scope.showCompAtt);
                        
                    } else {
                        $scope.showCompAtt = false;
                    }
                    $scope.getComplaintDoc();
                }

            }).catch((error)=>{
                $ionicLoading.hide();
                toaster.clear()
                toaster.error($filter('translate')('COMPLAINTSTATUSERROR'));
            });
        }

        $scope.getComplaintDoc = function(){
            $ionicLoading.show({ template: $filter('translate')('LOADING') });
            RestService.getComplantDoc($scope.complaintID).then(function (response) {
                // console.log("response", response);
                if(response == null || response == '' || response == undefined){
                    $ionicLoading.hide();
                    return false;
                } else {
                    $scope.attId = $scope.compArrays.attachmentId;
                    $scope.deptArrays = response.attachments;
										console.log("$scope.deptArrays",$scope.deptArrays);

                    /* $scope.deptArr = $scope.deptArrays.filter(ad => 
                        $scope.compArrays.every(fd => fd.attachmentId !== ad.attachmentId));
                    
                    console.log("deptArr",$scope.deptArr); */
                    
                    /* for(i=0;i<$scope.deptArr.length;i++){
                        let x = Math.floor((Math.random() * 100) + 11);
                        var documentType = $scope.deptArr[i].documentName.split('.');
                        documentType = documentType[1];
                        console.log("$scope.documentType2",documentType);
                        var key = 'docType';
                        var key2 = 'documentName';
                        $scope.deptArr[i][key] = documentType;
                        if(documentType == "pdf" || documentType == "doc" || documentType == "docx"){
                            attName = "Doc";
                          } else {
                            attName = "Image";
                          }
                        $scope.deptArr[i][key2] = attName + x + "." + documentType;		
                    }
                    console.log("$scope.deptArr",$scope.deptArr); */

										$scope.showActionHistAttc();
										$ionicLoading.hide();
                }
          }).catch((error)=>{
              $ionicLoading.hide();
              toaster.clear()
              toaster.error($filter('translate')('COMPLAINTSTATUSERROR'));
          });
        }

        $scope.openCitizenDoc = function(toggleValue1){
            // console.log("Citizen Toggle",toggleValue1);
            $scope.showCitizenDoc = !toggleValue1;
        }

        $scope.openDeptDoc = function(toggleValue2, index){
            console.log("Dept Toggle",toggleValue2, index);
            $scope.showDeptDoc = !toggleValue2;
						$scope.indexValue = index;
        }

//Zoom Picture of Reopened Image
				$scope.zoomPicStatus = function(id, type, docDes,documentName,base64){
					console.log("base64="+base64);
					console.log("Id Selected", id, type, docDes);
            if(type=="pdf"){                                        
							$rootScope.base64toBlob(base64, 'application/pdf',documentName);
						} else {
                if(type=="doc" || type== "docx"){
									// toaster.error($filter('translate')('CANTPREVIEWTHISFILE'));
									var t;
									if(type=='docx'){
									
									 t = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
									}
									else{
									   t = 'application/msword';
									}
									$rootScope.base64toBlob(base64,t,documentName);
								} else {
									//$scope.showImagePreview(url);
									$rootScope.base64toBlob(base64,'image/png',documentName);
										// $scope.zoomedInStatus = true;

										// const myArrayFiltered = $scope.deptArrays.filter((el) => {
										// 		return id === el.attachmentId;
										// });

										// $scope.imageZoomedStatus = myArrayFiltered[0].documentByteCode;
										// console.log("myArrayFiltered",myArrayFiltered, myArrayFiltered[0].documentByteCode);
								}
            	}
						}

				$scope.zoomPicCloseStatus = function(){
					$scope.zoomedInStatus = false;
				}


// Reopen Complaint upload multiple pictures code
		$scope.calculateImageSize = function(base64String) {
      let padding;
      let inBytes;
      let base64StringLength;
      if (base64String.endsWith('==')) { padding = 2; }
      else if (base64String.endsWith('=')) { padding = 1; }
      else { padding = 0; }
  
      base64StringLength = base64String.length;
      console.log(base64StringLength);
      inBytes = (base64StringLength / 4) * 3 - padding;
      console.log(inBytes);
      var kbytes = inBytes / 1000;
      console.log("kbytes of image", kbytes)
      return kbytes;
    }

		$scope.fileSizeCheck = function(){
      if($scope.attachments != undefined){
        var totalSize=0;
        $scope.attachments.forEach(function (x) { 
          console.log("x.docsize",x.docSize)

          //totalSize = x.docSize;
          totalSize = totalSize + parseFloat(x.docSize);
          console.log("Total Size", totalSize);

          if(totalSize > 5000){
            alert($filter('translate')('TOTALSIZELESSERTHAN5MB'));
            return true;
          } else {
            console.log("totalSize", totalSize);
            return false;
          }
        
        });
      }
    }

//Zoom any cliced picture code for Upload Image
		$scope.zoomPic = function(name, type){
      if($scope.attachments != undefined){
        console.log("name Selected", name, type);
        $scope.zoomedIn = true;

        const myArrayFiltered = $scope.attachments.filter((el) => {
          return name === el.documentName;
        });

        $scope.imageZoomed = myArrayFiltered[0].documentByteCode;
        console.log("myArrayFiltered",myArrayFiltered, myArrayFiltered[0].documentByteCode);
        if(type=="pdf" || type=="doc" || type== "docx"){
          toaster.error($filter('translate')('CANTPREVIEWTHISFILE'));
        }
      }
    }

    $scope.zoomPicClose = function(){
      $scope.zoomedIn = false;
    }

		$scope.removeImage = function (index) {
      console.log("Enter Remove Image", index);
      if($scope.attachments!=undefined){
        $scope.attachments.splice(index, 1);
        $scope.counter--;
      }
		}

		var _init = function () {
			$scope.getCompAttachmentId();
			//$scope.getComplaintDoc();

			if ($localStorage.langID == "2") {
				$ionicLoading.show({ template: 'लोड हो रहा है...' });
			} else {
				$ionicLoading.show({ template: 'Loading...' });
			}
			RestService.getNHPrefixData("RRN", $scope.orgid).then(function (response) {
				$scope.reOpeningOption = new Array();
				for (i = 0; i < response.length; i++) {
					if ($localStorage.langNewId == "2") {
						$scope.reOpeningOption.push({
							id: response[i].lookUpId,
							name: response[i].descLangSecond
						})
					} else {
						$scope.reOpeningOption.push({
							id: response[i].lookUpId,
							name: response[i].descLangFirst
						})
					}
				}
				$ionicLoading.hide();
			}, function (err) {
				$ionicLoading.hide();
				toaster.error($filter('translate')('REOPENCOMPLAINTERROR')/* , $filter('translate')('ERROR') */);
			})
		};
		_init();
	});
