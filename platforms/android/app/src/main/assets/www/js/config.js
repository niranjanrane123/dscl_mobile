//"use strict";

angular.module("starter")
  .constant("ENV", {
    name: "production",
   
            // Production url  start

            eipURL: "https://smartcitydehradun.uk.gov.in",
            baseURL: "https://dsclegov.uk.gov.in",
            brmsURL: "https://dsclegov.uk.gov.in",
            dashBoardURL: "https://dsclegov.uk.gov.in/DashboardDun/",
            portalURL: "https://smartcitydehradun.uk.gov.in/dscl",
            apuniSarkarURL:"https://eservices.uk.gov.in/user/login/smartcity?token=",
            environment:'production',

          // Production URL end
         
    //         baseURL: "http://192.168.100.59:8072",  
    // brmsURL: "http://192.168.100.59:8072", 


  // UAT  StartP  

  //old changes
      //  eipURL: "http://103.116.27.198",            
      //  baseURL: "http://103.116.27.197",  
      //  brmsURL: "http://103.116.27.197", 
      //  portalURL: "http://103.116.27.198/dscl",
      //  dashBoardURL: "http://103.116.27.197/DashboardDun/",
      //  apuniSarkarURL:"https://13.232.191.11/e-district-uk-client-user/login/smartcity?token=",

  //new changes
      //  eipURL: "http://103.116.27.198",            
      //  baseURL: "http://103.116.27.198",  
      //  brmsURL: "http://103.116.27.198", 
      //  portalURL: "http://103.116.27.198/dscl",
      //  dashBoardURL: "http://103.116.27.198/DashboardDun/",
      //  apuniSarkarURL:"https://13.232.191.11/e-district-uk-client-user/login/smartcity?token=",
      //  environment:'uat',

      //<--UAT private IP-->

      // eipURL: "http://10.67.169.15:8075",            
      // baseURL: "http://10.67.169.17:8065",  
      // brmsURL: "http://10.67.169.17:8065", 
      // dashBoardURL: "http://10.67.169.17:8065/DashboardDun/",
      // portalURL: "http://10.67.169.15:8075/dscl",       
      // apuniSarkarURL:"https://13.232.191.11/e-district-uk-client-user/login/smartcity?token=",

    // Third Party APIs same for UAT & Production
    // swMURL: "http://103.116.27.194:8283/",
    // enviornmentURL: "http://103.116.27.194:8283/",
    swMURL: "https://dscliothub.uk.gov.in/api/",
    enviornmentURL: "https://dscliothub.uk.gov.in/api/",
    ITSURL: "https://dscliothub.uk.gov.in/api/",
    // swmAdminName: "admin",
    // swmAdminPassword: "admin",
    swmAdminName: "abm",
    swmAdminPassword: "Welcome@123",

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


