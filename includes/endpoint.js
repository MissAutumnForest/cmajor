var sutil        = require("./serverUtils"),
    route        = require("./route"),
    events       = require("events"),
    eventEmitter = new events.EventEmitter();

function push(request, response){
  request.urlData = sutil.routeData(request);
  eventEmitter.emit(sutil.fullRequest(request), request, response);
}

/*
* ##########################################
* # API REQUEST HANDLERS                   #
* ##########################################
*/

// Listens for RESTful API GET requests.
function get(path, callback) {
  eventEmitter.on("GET@" + route.base(path), function (request, response) {
    callback(request, response);
  });
}

// Listens for RESTful API PUT requests.
function put(path, callback) {
  eventEmitter.on("PUT@" + route.base(path), function (request, response) {
    request.on("data", function (chunk) {
      request.post = sutil.decodePost(chunk.toString());
      callback(request, response);
    });
  });
}

// Listens for RESTful API POST requests.
function post(path, callback) {
  eventEmitter.on("POST@" + route.base(path), function (request, response) {
    request.on("data", function (chunk) {
      request.post = sutil.decodePost(chunk.toString());
      callback(request, response);
    });
  });
}

// Listens for RESTful API DELETE requests.
function del(path, callback) {
  eventEmitter.on("DELETE@" + route.base(path), function (request, response) {
    request.on("data", function (chunk) {
      request.post = sutil.decodePost(chunk.toString());
      callback(request, response);
    });
  });
}

exports.push = push;
exports.get = get;
exports.put = put;
exports.post = post;
exports.delete = del;
