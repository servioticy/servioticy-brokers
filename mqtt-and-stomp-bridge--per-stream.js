var Stomp = require('stompjs');
var api = require('restler');
 
// Use raw TCP sockets
var client = Stomp.overTCP('192.168.56.101', 1883);
// uncomment to print out the STOMP frames
//client.debug = console.log;
 
client.connect('compose', 'shines', function(frame) {
    client.subscribe('/topic/*.from', function(message) {
 
        var request = JSON.parse(message.body);
        console.log("Going for a " + request.meta.method);
        console.log("Posted data " + JSON.stringify(request.body));
        api.json("http://localhost:8080" + request.meta.url,
                request.body,
                {headers: {'Content-Type': 'application/json', 'Authorization': request.meta.authorization}},
                request.meta.method
        ).on('complete', function(data, response) {
             // send back the identifier if any, allowing the requesting client to match the response        
            data.messageId = request.meta.messageId || null;
            var urlparts = request.meta.url.split("/");
            client.send('/topic/' + request.meta.authorization + ".to", {}, JSON.stringify(data));
            client.send('/topic/' + request.meta.authorization + ".to." + urlparts[urlparts.length-3], {}, JSON.stringify(data));
            client.send('/topic/' + request.meta.authorization + ".to." + urlparts[urlparts.length-3] + "." + urlparts[urlparts.length-1], {}, JSON.stringify(data));
            console.log("result: " + JSON.stringify(data));
        });
    });
});
