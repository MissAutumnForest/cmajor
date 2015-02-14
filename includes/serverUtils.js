var path = require("path"),
    url  = require("url"),
    route = require("./route");

/*
* ##########################################
* # UTILITY FUNCTIONS                      #
* ##########################################
*/

// Decode Post data
function decodePost(data) {
    "use strict";

    var result = {};
    data = data.toString("utf8");
    data = data.replace(/\+/g, " ");
    data = decodeURIComponent(data);
    data = data.split("&");
    data.forEach(function (dta) {
        var key = dta.substring(0, dta.indexOf("=")),
            value = dta.substring(dta.indexOf("=") + 1);

        result[key] = value;
    });
    return JSON.stringify(result);
}

// Get Relative URL Path
function relPath(request) {
    "use strict";

    return url.parse(request.url).pathname;
}

// Get Absolute URL Path
function absPath(request) {
    "use strict";

    request.url = "/app" + request.url;
    return path.join(process.cwd(), relPath(request));
}

// Put Together Full Request
function fullRequest(request) {
    "use strict";

    return request.method + "@" + route.base(relPath(request));
}

// Get the data from route path
function routeData(request) {
    "use strict";

    var path = relPath(request);
    return decodeURI(path.substring(path.lastIndexOf("/") + 1));
}

exports.routeData = routeData;
exports.decodePost = decodePost;

exports.relPath = relPath;
exports.absPath = absPath;
exports.fullRequest = fullRequest;
