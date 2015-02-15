var mongoose = require("mongoose"),
    respond  = require("./respond");

var houseKeeping = {
    // Login to the database.
    login: function (username, password, server, database) {
        "use strict";

        mongoose.connect(
            (
                "mongodb://" + username +
                ":"          + password +
                "@"          + server +
                "/"          + database
            ),
            function (err) {
                if (!err) {
                    console.log("Successfully Logged Into Database!");
                } else {
                    console.log("Couldn't Log Into Database: " + err);
                }
            }
        );
    },

    // Make DocumentModel.
    DocumentModel: function (name, schema) {
        "use strict";

        return mongoose.model(name, mongoose.Schema(schema));
    }
};

var rest = {
    // RESTful GET Function.
    get: function (response, Model, query) {
        "use strict";

        Model.find(query, function (err, data) {
            if (!err) {
                respond.json(response, data, 200);
            } else {
                console.log(err);
            }
        });
    },

    // RESTful PUT Function.
    put: function (response, Model, query, data) {
        "use strict";

        Model.update(query, data, function (err) {
            if (!err) {
                respond.status(response, 200);
            } else {
                console.log(err);
            }
        });
    },

    // RESTful POST Function.
    post: function (response, Model, data) {
        "use strict";

        var model = new Model(data);
        model.save(function (err) {
            if (!err) {
                respond.status(response, 200);
            } else {
                console.log(err);
            }
        });
    },

    // RESTful DELETE Function.
    delete: function (response, Model, query) {
        "use strict";

        Model.remove(query, function (err) {
            if (!err) {
                respond.status(response, 200);
            } else {
                console.log(err);
            }
        });
    }
};

// Housekeeping
exports.login         = houseKeeping.login;
exports.DocumentModel = houseKeeping.DocumentModel;

// RESTful.
exports.get           = rest.get;
exports.put           = rest.put;
exports.post          = rest.post;
exports.delete        = rest.delete;
