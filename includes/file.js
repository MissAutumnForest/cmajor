var fs    = require("fs"),
    path  = require("path"),
    sutil = require("./serverUtils"),
    res   = require("./response");

// Get the file type of a file
function fileType(request) {
    "use strict";

    return path.extname(sutil.relPath(request));
}

// Check if a path is a file
function isFile(request) {
    "use strict";

    return fileType(request);
}

// Read A File From Disk
function push(request, response) {
    "use strict";

    fs.readFile(
        sutil.absPath(request),
        "binary",
        function (err, file) {
            if (!err) {
                response.conType = fileType(request);
                res.file(response, file);
            } else {
                res.text(response, 404, "404 Not Found");
            }
        }
    );
}

exports.isFile = isFile;
exports.push = push;
