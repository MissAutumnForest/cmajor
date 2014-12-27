var file     = require("./file"),
    endpoint = require("./endpoint");

// Get base path of route
function base(path){
  path = path[0] === "/" ? path.substring(1) : path;
  return path[path.length - 1] === "/" ? path.substring(0, path.length - 1) : path;
}

// Determine whether to treat as file or endpoint.
function find(request, response){
  if(request.url.indexOf("?") > -1){
    request.url = request.url.substring(0, request.url.indexOf("?"));
  }
  request.url = request.url[request.url.length - 1] === "/" ? request.url + "index.html" : request.url;

  // Try to read the file from disk and server if successful.
  if (file.isFile(request)) {
    file.push(request, response);
  } else {
    endpoint.push(request, response);
  }
}

// Redirect to secure connection. (HTTP to HTTPS)
function redirectSecure(request, response){
  response.writeHead(301, {
    "Location": "https://" + request.headers.host + request.url
  });
  response.end();
}

exports.base = base;
exports.find = find;
exports.redirectSecure = redirectSecure;