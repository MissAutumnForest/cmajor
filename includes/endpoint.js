var route = require("./route");

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

        route.listen("GET@" + route.strip(path), callback, false);
    },

    // Sets up a listener for RESTful API PUT requests at a specified route.
    put: function (path, callback) {
        "use strict";

        route.listen("PUT@" + route.strip(path), callback, true);
    },

    // Sets up a listener for RESTful API POST requests at a specified route.
    post: function (path, callback) {
        "use strict";

        route.listen("POST@" + route.strip(path), callback, true);
    },

    // Sets up a listener for RESTful API DELETE requests at a specified route.
    delete: function (path, callback) {
        "use strict";

        route.listen("DELETE@" + route.strip(path), callback, true);
    }
};

exports.push   = endpoint.push;

exports.get    = endpoint.get;
exports.put    = endpoint.put;
exports.post   = endpoint.post;
exports.delete = endpoint.delete;
