var http  = require("http"),
    https = require("https"),
    route = require("./route");

/*
* ##########################################
* # CORE SERVER                            #
* ##########################################
*/
var server = {
    start: function (doEncrypt, port, options) {
        "use strict";

        if (doEncrypt) {
            if (options) {
                // Start HTTP server to elevate all HTTP traffic to HTTPS.
                http.createServer(route.elevate).listen(80);

                // Start HTTPS Server.
                https.createServer(options, route.determine).listen(port);
                console.log("Started HTTPS Server On " + port.toString());
            } else {
                console.log("You need to supply a Cert in server options");
            }

        } else {
            http.createServer(route.determine).listen(port);
            console.log("Started HTTP Server On " + port.toString());
        }
    }
};

exports.start = server.start;
