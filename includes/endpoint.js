var route = require("./route");

var getRouteVars = function (strRoute) {
    "use strict";
    console.log("sup");
};

var endpoint = {
    push: function (request, response, eventEmitter) {
        "use strict";

        var eventString = route.eventString(request);
        eventEmitter.emit(eventString, request, response);
    },

    /*##################################
    * ### ENDPOINT LISTENER CREATORS ###
    * ##################################*/

    // Sets up a listener for RESTful API GET requests at a specified route.
    get: function (path, callback) {
        "use strict";

        var before = function (request, response) {
            request.vars = route.vars(request, route.strip(path));

            callback(request, response);
        };

        route.listen("GET@" + route.wildify(route.strip(path)), before, false);
    },

    // Sets up a listener for RESTful API PUT requests at a specified route.
    put: function (path, callback) {
        "use strict";

        route.listen("PUT@" + route.wildify(route.strip(path)), callback, true);
    },

    // Sets up a listener for RESTful API POST requests at a specified route.
    post: function (path, callback) {
        "use strict";

        route.listen("POST@" + route.wildify(route.strip(path)), callback, true);
    },

    // Sets up a listener for RESTful API DELETE requests at a specified route.
    delete: function (path, callback) {
        "use strict";

        route.listen("DELETE@" + route.wildify(route.strip(path)), callback, true);
    }
};

exports.push   = endpoint.push;

exports.get    = endpoint.get;
exports.put    = endpoint.put;
exports.post   = endpoint.post;
exports.delete = endpoint.delete;
