servioticy-brokers
==================

Brokers for interacting with servioticy REST API (MQTT, WS+STOMP, TCP+STOMP...)

Online MQTT broker can be reached at api.servioticy.com:1833
Online STOMP/TCP broker can be reached at api.servioticy.com:1833
Online STOMP/WS broker can be reached at api.servioticy.com:61623

In all cases: 
  User: compose
  Password: shines

Payload structure example:

{
   "meta": {
     "authorization": "API_TOKEN HERE",
     "method": "PUT",
     "url": "/13944639303973f5530eab507412d88bef305089a7720/streams/weather"
     "messageID": 17772
   },
   "body": {
     "lastUpdate": 1199192932,
     "channels": {
       "location": {
         "current-value": "40.12,-71.34",
         "unit": "degrees"
       },
       "temperature": {
         "current-value": 33,
         "unit": "degrees"
       }
     }
   }
}


For MQTT, the topic structure is:

  “API_TOKEN/from” to send requests to the API
  “API_TOKEN/to” to receive responses to the API

  Updates produced by subscriptions: “API_TOKEN/SOid/updates”


For STOMP (either over TCP or WS), the topic structure is:

  “/topic/API_TOKEN.from” to send requests to the API
  “/topic/API_TOKEN.to” to receive responses to the API

  Updates produced by subscriptions: “/topic/API_TOKEN.SOid.updates”
