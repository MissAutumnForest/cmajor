var mongoose = require("mongoose"),
    respond  = require("./respond");

var database = {
    login: function (username, password, server, database) {
        "use strict";

        mongoose.connect(
            (
                "mongodb://" + username +
                ":"          + password +
                "@"          + server +
                "/"          + database
            ),
            function (error) {
                if (error) {
                    console.log("Couldn't Log Into Database: ");
                    console.log(error);
                } else {
                    console.log("Successfully Logged Into Database!");
                }
            }
        );
    }
};

function DocumentModel(name, schema) {
    "use strict";

    return mongoose.model(name, mongoose.Schema(schema));
}

function get(response, DocumentModel, query) {
    "use strict";

    DocumentModel.find(query, function (err, data) {
        if (err) { console.log(err); }
        respond.json(response, data);
    });
}

function post(DocumentModel, data) {
    "use strict";

    var documentModel = new DocumentModel(data);
    documentModel.save(function (err) {
        if (err) { console.log(err); }
    });
}

function put(DocumentModel, query, data) {
    "use strict";

    DocumentModel.update(query, data, function (err, numAffect, raw) {
        if (err) { console.log(err); }
    });
}

exports.login = database.login;
exports.DocumentModel = DocumentModel;
exports.get = get;
exports.put = put;
exports.post = post;
