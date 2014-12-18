var path = require("path"),
    url  = require("url"),
    route = require("./route");

/*
* ##########################################
* # UTILITY FUNCTIONS                      #
* ##########################################
*/

// Get the data from route path
function routeData(request) {
  var path = relPath(request);
  return decodeURI(path.substring(path.lastIndexOf("/") + 1));
}

// Decode Post data
function decodePost(data) {
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
function relPath(request){
  return url.parse(request.url).pathname;
}

// Get Absolute URL Path
function absPath(request){
  request.url = "/app" + request.url;
  return path.join(process.cwd(), relPath(request));
}

// Put Together Full Request
function fullRequest(request){
  return request.method + "@" + route.base(relPath(request));
}

exports.routeData = routeData;
exports.decodePost = decodePost;

exports.relPath = relPath;
exports.absPath = absPath;
exports.fullRequest = fullRequest;
