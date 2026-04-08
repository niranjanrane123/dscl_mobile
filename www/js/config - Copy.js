//"use strict";

angular.module("starter")
  .constant("ENV", {
    name: "production",
   
  // Production url  start
  // https://smartcitydehradun.uk.gov.in/MainetService/rest/api/sos/create
       eipURL: "https://smartcitydehradun.uk.gov.in",
      baseURL: "https://dsclegov.uk.gov.in",
      brmsURL: "https://dsclegov.uk.gov.in",
      dashBoardURL: "https://dsclegov.uk.gov.in/DashboardDun/",
      portalURL: "https://smartcitydehradun.uk.gov.in/dscl",
      apuniSarkarURL:"https://eservices.uk.gov.in/user/login/smartcity?token=",
      environment:'production',  
  
  // Production URL end

  // new changes for UAT start
      // eipURL: "http://103.116.27.198",            
      // baseURL: "http://103.116.27.198",
      // brmsURL: "http://103.116.27.198", 
      // portalURL: "http://103.116.27.198/dscl",
      // dashBoardURL: "http://103.116.27.198/DashboardDun/",
      // apuniSarkarURL:"https://13.232.191.11/e-district-uk-client-user/login/smartcity?token=",
 //new changes for UAT end

// UAT End working

 // new changes for UAT start
      // eipURL: "http://103.116.27.197:8065",          //portalrest APIs are not working   
      /* baseURL: "http://103.116.27.197:8065",  
      brmsURL: "http://103.116.27.197:8065/", 
      portalURL: "http://103.116.27.197:8065/dscl",
      dashBoardURL: "http://103.116.27.197:8065/DashboardDun/",
      apuniSarkarURL:"https://13.232.191.11/e-district-uk-client-user/login/smartcity?token=", */

  //new changes for UAT end

  // new changes for UAT start
      // eipURL: "http://103.116.27.197:8065",          //portalrest APIs are not working   
      /* baseURL: "http://103.116.27.197:8065",  
      brmsURL: "http://103.116.27.197:8065/", 
      portalURL: "http://103.116.27.197:8065/dscl",
      dashBoardURL: "http://103.116.27.197:8065/DashboardDun/",
      apuniSarkarURL:"https://13.232.191.11/e-district-uk-client-user/login/smartcity?token=", */

  //new changes for UAT end

      // environment:'uat',

      //<--UAT private IP start-->

     /*  eipURL: "http://10.67.169.15:8075",
      baseURL: "http://10.67.169.17:8065",  
      brmsURL: "http://10.67.169.17:8065", 
      dashBoardURL: "http://10.67.169.17:8065/DashboardDun/",
      portalURL: "http://10.67.169.15:8075/dscl",       
      apuniSarkarURL:"https://13.232.191.11/e-district-uk-client-user/login/smartcity?token=", */

      //<--UAT private IP end-->

    // Third Party APIs same for UAT & Production
    // swMURL: "http://103.116.27.194:8283/",
    // enviornmentURL: "http://103.116.27.194:8283/",
    swMURL: "https://dscliothub.uk.gov.in/api/",
    enviornmentURL: "https://dscliothub.uk.gov.in/api/",
    ITSURL: "https://dscliothub.uk.gov.in/api/",
    trafficURL:'http://dscliothub.uk.gov.in:5151/',
    upclURL:'https://www.upcl.org/',
    jalSansthanURL:'https://ujsbill.uk.gov.in/auth/BillPay.aspx?c=',
    // swmAdminName: "admin",
    // swmAdminPassword: "admin",
    swmAdminName: "abm",
    swmAdminPassword: "Welcome@123",
    gisToken:"eyJhbGciOiJSUzUxMiIsInR5cCI6IkpXVCJ9.eyJzZXJ2ZXJfb2JqIjoiZmRiYmFiYTZkYjBlN2Q3MWYxMTFiMzc3NThlNzU5ZjkuMzkxMGNiZmY5YzA3ZmQ0ODczZjcwM2ZkZDBkNmJjMjk1YjAyYTU0MWE3YjM2ODE2Y2ZhYTU4ZGM4MmY4ZDI3ZjE5NWE5YTA3OWM2YmZhOTE1ZGViYTk4M2E3MGUyYTZjMDNiYzczMjAwMGUyNDcxMTg5NWU5MDU3M2EzNWNmYzJiZjllYWNlNmY1ZjdmM2JkNTU2NmJkZmU4Njc4ZjI0NDUyNDk3MDIzOWVkMzkzOGM1M2FiY2RkOWVjMWIxZjk1MjljYTgyYWVlYWU4MDI4YWYxMmVjNWVkZWY5NDdjMjdkYTM4NzJmNWRmYzQ3YWYwYjcyOWU2Y2QyY2U0MDQyYmMyOWExNTMyNGRiZDk5NmJhMjJhODk4ODU5MzM2ZjYwIiwiaWF0IjoxNjcxMzgxMjAxLCJhdWQiOiJzZ2w6UHJvZmVzc2lvbmFsIiwiaXNzIjoic2dsLnRsZCJ9.NxmUq2oit6GxUcmS6Lx1e1ZSiN1OPeyl8lcO4He-hgW8M0JclHfobpTBZbYbP27fmPzmQW2eJ07o63wcVV96cTVHw61hlGkC5JrUM7eVoirER7YTRIQU9-IXiW3dofK0SPo3NFBGBvcLYO8797IdCqTqP2o5Sq1f_qYN12EmU3U",

    PUSHBOTS_APP_ID: "56779c061779594a6d8b456f",
    GCM_SENDER_ID: "1084889111210",

    // SOS API
    sosApi: "https://api.uk.ners.in/interconnect/api/event/create",

     // MDDA Creds

     MDDA_USER_NAME: "babloo72in@live.com",
     MDDA_PASSWORD: "1234",
     MDDA_AUTH_URL: "https://mddaonline.org.in/mdda/rest/auth/authenticatePublicUser",  
     MDDA_GET_SUMMARY: "https://mddaonline.org.in/mdda/rest/dashboard/getSummary",

  });


