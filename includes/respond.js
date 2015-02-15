var mimeTypes = {
    ".html": "text/html",
    ".css":  "text/css",
    ".js":   "application/javascript",
    ".json": "application/json",
    ".svg":  "image/svg+xml",
    ".png":  "image/png",
    ".jpg":  "image/jpeg",
    ".jpeg": "image/jpeg"
};

var respond = {
    text: function (response, message, status) {
        "use strict";

        response.writeHead(status, {"Content-Type": "text/plain"});
        response.end(message);
    },
    json: function (response, json, status) {
        "use strict";

        response.writeHead(status, {"Content-Type": "application/json"});
        response.end(JSON.stringify(json));
    },
    file: function (response, file, fileType, status) {
        "use strict";

        response.writeHead(status, {"Content-Type": mimeTypes[fileType]});
        response.end(file, "binary");
    }
};

/*
* Exports
*/
exports.text = respond.text;
exports.json = respond.json;
exports.file = respond.file;
