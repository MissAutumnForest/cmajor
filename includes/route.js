var file     = require("./file"),
    endpoint = require("./endpoint");

// Get base path of route
function base(path){
  path = path[0] === "/" ? path.substring(1) : path;
  return path[path.length - 1] === "/" ? path.substring(0, path.length - 1) : path;
}

// Determine whether to treat as file or endpoint.
function find(request, response){
  request.url = request.url[request.url.length - 1] === "/" ? request.url + "index.html" : request.url;

  // Try to read the file from disk and server if successful.
  if (file.isFile(request)) {
    file.push(request, response);
  } else {
    endpoint.push(request, response);
  }
}

exports.base = base;
exports.find = find;
