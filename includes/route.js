var path         = require("path"),
    url          = require("url"),
    file         = require("./file"),
    endpoint     = require("./endpoint"),
    events       = require("events"),
    eventEmitter = new events.EventEmitter(),
    wwwPath      = "";

var uri = {
    relative: function (request) {
        "use strict";

        return url.parse(request.url).pathname;
    },
    absolute: function (request) {
        "use strict";

        request.url = wwwPath + request.url;
        return path.join(process.cwd(), url.parse(request.url).pathname);
    },
    strip: function (path) {
        "use strict";

        path = path[0] === "/" ? path.substring(1) : path;
        path = path[-1] === "/" ? path.substring(-1) : path;
        return path;
    },

    //Generate Event String
    eventString: function (request) {
        "use strict";

        return request.method + "@" + uri.strip(uri.relative(request));
    }
};

var route = {
    // Set the www (file serve) directory
    setWwwPath: function (path) {
        wwwPath = path;
    },

    // Determine whether to treat this route as a file or endpoint.
    determine: function (request, response) {
        "use strict";

        var path = request.url;
        request.url = path[-1] === "/" ? path + "index.html" : path;

        // Try to read the file from disk and server if successful.
        if (file.isFile(request)) {
            file.push(request, response);
        } else if (!eventEmitter.listeners(uri.eventString(request))[0]) {
            request.url = "/index.html";
            file.push(request, response);
        } else {
            endpoint.push(request, response, eventEmitter);
        }
    },

    // Re-route HTTP requests to HTTPS if using Secure Server.
    elevate: function (request, response) {
        "use strict";

        response.writeHead(
            301,
            { "Location": "https://" + request.headers.host + request.url }
        );
        response.end();
    },

    // Setup an API Endpoint Listener for this Route.
    listen: function (eventString, callback, hasData) {
        "use strict";

        eventEmitter.on(
            eventString,
            function (request, response) {
                if (hasData) {
                    request.on("data", function (chunk) {
                        request.post = chunk.toString();
                        callback(request, response);
                    });
                } else {
                    callback(request, response);
                }
            }
        );
    }
};

exports.strip       = uri.strip;
exports.relative    = uri.relative;
exports.absolute    = uri.absolute;
exports.eventString = uri.eventString;

exports.setWwwPath  = route.setWwwPath;
exports.determine   = route.determine;
exports.elevate     = route.elevate;
exports.listen      = route.listen;
