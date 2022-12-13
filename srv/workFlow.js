/**
 * @description To Trigger workflow based on CF Destinations.
 * @author Sai Santhosh (sai.santhosh@lntinfotech.com)
 */
 const xsenv = require("@sap/xsenv");
 const axios = require("axios").default;
 module.exports = class workFlow {
   constructor() {
     this.destination = "";
   }
 
   /**
    * WorkFlow CF Destination
    * @param {String} destination
    */
   setDestination(destination) {
     this.destination = destination === undefined ? "" : destination;
   }
 
   /**
    * To get Destination Environment Data
    */
   getDestinationData() {
     return xsenv.getServices({
       dest: { tag: "destination" },
     }).dest;
   }
 
   /**
    * Environmnet Token URL
    */
   getTokenURL() {
     return this.getDestinationData().url + "/oauth/token";
   }
 
   /**
    * To get the Destination from CF
    * @param {String} token
    */
   getDestination(token) {
     return axios({
       url:
         this.getDestinationData().uri +
         "/destination-configuration/v1/destinations/" +
         this.destination,
       method: "get",
       headers: {
         Authorization: "Bearer " + token,
       },
     });
   }
 
   /**
    * To Trigger the WorkFlow
    * @param {String} dest_service
    * @param {Sting} token
    * @param {JSONObject} data
    */
   tiggerWorkFlow(dest_service, token, data) {
     return axios({
       url: dest_service + "v1/workflow-instances",
       method: "post",
       headers: {
         "Content-Type": "application/json",
         Authorization: "Bearer " + token,
       },
       data: JSON.stringify(data),
     });
   }
 
   /**
    * To get the Token from CF
    * @param {String} dest_service
    */
   getToken(dest_service) {
     return axios({
       url: dest_service.url,
       method: "post",
       params: {
         grant_type: "client_credentials",
       },
       headers: {
         Accept: "application/json",
         "Content-Type": "application/x-www-form-urlencoded",
       },
       auth: {
         username: dest_service.clientid,
         password: dest_service.clientsecret,
       },
     });
   }
 
   /**
    * To Start the WorkFlow by accessing the Token for Destination and WorkFlow Tokens
    * @param {JSONObject} data
    */
   async start(data) {
     if (this.destination.length !== 0) {
       if (data !== undefined) {
         try {
           let oDestinationData = {
             url: this.getTokenURL(),
             clientid: this.getDestinationData().clientid,
             clientsecret: this.getDestinationData().clientsecret,
           };
           const destionationToken = await this.getToken(oDestinationData);
           const destination = await this.getDestination(
             destionationToken.data.access_token
           );
           console.log(destination.data.destinationConfiguration);
           let oDestionationData = destination.data.destinationConfiguration,
             tokenServiceURL = oDestionationData.tokenServiceURL,
             oWorkFlowData = {
               url: this.getTokenURL(),
               clientid: oDestionationData.clientId,
               clientsecret: oDestionationData.clientSecret,
             };
           const workflowToken = await this.getToken(oWorkFlowData);
           var data = data;
           const triggerWorkFlow = await this.tiggerWorkFlow(
             oDestionationData.URL,
             workflowToken.data.access_token,
             data
           );
           return triggerWorkFlow;
         } catch (error) {
           console.error(error);
         }
       } else {
         console.error("Please provide workflow payload Context.");
       }
     } else {
       console.error("Please provide the Destination to start WorkFlow.");
     }
   }
 };
 