/*jslint node: true*/
"use strict";

/*
 * ##########################################
 * # LIBRARY IMPORTS                        #
 * ##########################################
 */
var path   = require("path"),
    fs     = require("fs"),
    url    = require("url"),
    http   = require("http"),
    events = require('events'),
    res    = require("./response");

var eventEmitter = new events.EventEmitter();

/*
 * ##########################################
 * # UTILITY FUNCTIONS                      #
 * ##########################################
 */

// Get base path of route
function baseRoute(path) {
    path = path[0] === "/" ? path.substring(1) : path;
    return path.substring(0, path.lastIndexOf("/"));
}

// Get the data from route path
function routeData(path) {
    return decodeURI(path.substring(path.lastIndexOf("/") + 1));
}

// Decode Post data
function decodePost(data) {
    var result = {};
    data = data.split("&");
    data.forEach(function (dta) {
        var key = dta.substring(0, dta.indexOf("=")),
            value = dta.substring(dta.indexOf("=") + 1);
        result[key] = value;
    });
    return result;
}

/*
 * ##########################################
 * # API REQUEST HANDLERS                   #
 * ##########################################
 */

// Listens for RESTful API GET requests.
function get(path, callback) {
    eventEmitter.on("GET@" + baseRoute(path), function (request, response) {
        callback(request, response);
    });
}

// Listens for RESTful API PUT requests.
function put(path, callback) {
    eventEmitter.on("PUT@" + baseRoute(path), function (request, response) {
        request.on("data", function (chunk) {
            request.post = decodePost(chunk.toString());
            callback(request, response);
        });
    });
}

// Listens for RESTful API POST requests.
function post(path, callback) {
    eventEmitter.on("POST@" + baseRoute(path), function (request, response) {
        request.on("data", function (chunk) {
            request.post = decodePost(chunk.toString());
            callback(request, response);
        });
    });
}

// Listens for RESTful API DELETE requests.
function del(path, callback) {
    eventEmitter.on("DELETE@" + baseRoute(path), function (request, response) {
        request.on("data", function (chunk) {
            request.post = decodePost(chunk.toString());
            callback(request, response);
        });
    });
}

/*
 * ##########################################
 * # CORE SERVER                            #
 * ##########################################
 */

// Starts the server on the specified port.
function server(portNumber) {
	// The core listener for the server. This accepts requests and sends out responses.
	function onRequest(request, response) {
        request.url = request.url === "/" ? "/index.html" : request.url;
		// Get relative and absolute path of request url.
		var relPath = url.parse(request.url).pathname,
            absPath = path.join(process.cwd(), relPath),
            fullRequest = request.method + "@" + baseRoute(relPath);

		if (path.extname(relPath)) {
            // Try to read the file from disk.
			fs.readFile(absPath, "binary", function (err, file) {
				// Serve file if read successful, else respond with error 500.
				if (!err) {
                    res.file(response, file);
                } else {
                    res.text(response, 500, err.toString());
                }
			});
        } else {
            request.urlData = routeData(relPath);
            eventEmitter.emit(fullRequest, request, response);
        }
	}

	// Create the server and start on specified port.
	http.createServer(onRequest).listen(portNumber);
	console.log("Started Server On " + portNumber.toString());
}

/*
 * ##########################################
 * # EXPORTS                                #
 * ##########################################
 */
exports.decodePost = decodePost;
exports.get = get;
exports.put = put;
exports.post = post;
exports.del = del;
exports.server = server;