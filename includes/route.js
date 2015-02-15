var path     = require("path"),
    url      = require("url"),
    file     = require("./file"),
    endpoint = require("./endpoint");

var uri = {
    relative: function (request) {
        "use strict";

        return url.parse(request.url).pathname;
    },
    absolute: function (request) {
        "use strict";

        request.url = "/app" + request.url;
        return path.join(process.cwd(), url.parse(request.url).pathname);
    },
    strip: function (path) {
        "use strict";

        path = path[0] === "/" ? path.substring(1) : path;
        path = path[-1] === "/" ? path.substring(-1) : path;
        return path;
    }
};

var route = {
    //Generate Event String
    eventString: function (request) {
        "use strict";

        return request.method + "@" + uri.strip(uri.relative(request));
    },

    /* ### Core Route Functions ### */
    data: function (request) {
        "use strict";

        var path = uri.relative(request);
        return decodeURI(path.substring(path.lastIndexOf("/") + 1));
    },
    determine: function (request, response) {
        "use strict";

        var path = request.url;
        request.url = path[-1] === "/" ? path + "index.html" : path;

        // Try to read the file from disk and server if successful.
        if (file.isFile(request)) {
            file.push(request, response);
        } else {
            endpoint.push(request, response);
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
    }
};

exports.strip       = uri.strip;
exports.relative    = uri.relative;
exports.absolute    = uri.absolute;

exports.eventString = route.eventString;
exports.data        = route.data;
exports.determine   = route.determine;
exports.elevate     = route.elevate;
