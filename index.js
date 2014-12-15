/*jslint node: true*/
"use strict";

/*
* ##########################################
* # LIBRARY IMPORTS                        #
* ##########################################
*/
var http  = require("http"),
    https = require("https"),
    route = require("./includes/route"),
    fs  = require("fs"),
    endpoint = require("./includes/endpoint");

var config = {
  port: 80,
  sslPort: 443
};

/*
* ##########################################
* # CORE SERVER                            #
* ##########################################
*/

// Starts the server on the specified port.
function server() {
  http.createServer(route.find).listen(config.port);
  console.log("Started HTTP Server On " + config.port.toString());
}

function secureServer() {
  var options = {
    key: fs.readFileSync("ssl/key.pem"),
    cert: fs.readFileSync("ssl/certificate.pem"),
    rejectUnauthorized: false
  };

  https.createServer(options, function(request, response) {
    route.find(request, response);
  }).listen(config.sslPort);
  console.log("Started HTTPS Server On " + config.sslPort.toString());
}

/*
* ##########################################
* # EXPORTS                                #
* ##########################################
*/
exports.config = config;

exports.get = endpoint.get;
exports.put = endpoint.put;
exports.post = endpoint.post;
exports.delete = endpoint.delete;
exports.response = require("./includes/response");
exports.database = require("./includes/database");
exports.server = server;
exports.secureServer = secureServer;
