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

    wildify: function (path) {
        "use strict";

        path = path.split("/");
        var pathLen = path.length - 1;

        while (pathLen) {
            if (path[pathLen].indexOf(":") !== -1 || path[pathLen].indexOf("$") !== -1) {
                path[pathLen] = "*";
            }

            pathLen -= 1;
        }

        return path.join("/");
    },

    //Generate Event String
    eventString: function (request) {
        "use strict";

        var wildPath = uri.relative(request);
        wildPath = uri.strip(wildPath);
        wildPath = uri.wildify(wildPath, request);

        return request.method + "@" + wildPath;
    },

    vars: function (request, apiPath) {
        "use strict";

        apiPath = apiPath.split("/");
        var vars = {},
            reqPath = uri.relative(request),
            len = apiPath.length - 1;

        reqPath = uri.strip(reqPath);
        reqPath = reqPath.split("/");

        while (len) {
            if (apiPath[len].indexOf(":") !== -1 && reqPath[len].indexOf("$") !== -1) {
                apiPath[len] = apiPath[len].replace(":", "");
                reqPath[len] = reqPath[len].replace("$", "");

                vars[apiPath[len]] = reqPath[len];
            }

            len -= 1;
        }

        return vars;
    }
};

var route = {
    // Set the www (file serve) directory
    setWwwPath: function (path) {
        "use strict";

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
exports.wildify     = uri.wildify;
exports.eventString = uri.eventString;
exports.vars        = uri.vars;

exports.setWwwPath  = route.setWwwPath;
exports.determine   = route.determine;
exports.elevate     = route.elevate;
exports.listen      = route.listen;
