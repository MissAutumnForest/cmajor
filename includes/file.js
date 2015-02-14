var fs    = require("fs"),
    path  = require("path"),
    route = require("./route"),
    res   = require("./response");

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
                    response.conType = fileType(request);
                    res.file(response, file);
                } else {
                    res.text(response, 404, "404 Not Found");
                }
            }
        );
    }
};

exports.isFile = file.isFile;
exports.push = file.push;
