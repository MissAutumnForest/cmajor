var fs      = require("fs"),
    path    = require("path"),
    route   = require("./route"),
    respond = require("./respond");

// Get the file type of a file
function fileType(request) {
    "use strict";

    return path.extname(route.relative(request));
}

var file = {
    isFile: function (request) {
        "use strict";

        return fileType(request);
    },
    push: function (request, response) {
        "use strict";

        fs.readFile(
            route.absolute(request),
            "binary",
            function (err, file) {
                if (!err) {
                    respond.file(response, file, fileType(request), 200);
                } else {
                    respond.text(response, "404 Not Found", 404);
                }
            }
        );
    }
};

exports.isFile = file.isFile;
exports.push = file.push;
