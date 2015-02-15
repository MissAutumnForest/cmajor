var crypto   = require("crypto"),
    database = require("./database");

var crypt = {
    token: function (username) {
        "use strict";

        var shasum = crypto.createHash("sha256"),
            sha512sum = crypto.createHash("sha512"),
            date = new Date().toISOString();

        shasum.update(date + username + date);
        sha512sum.update(date + shasum.digest('hex') + date);
        return sha512sum.digest('hex');
    },
    hash: function (password, salt) {
        "use strict";

        var shasum    = crypto.createHash("sha256"),
            sha512sum = crypto.createHash("sha512");

        shasum.update(salt + password + salt);
        shasum = shasum.digest('hex');
        sha512sum.update(shasum + salt + shasum);
        return sha512sum.digest('hex');
    }
};

var cookies = {
    decode: function (rawCookies) {
        "use strict";

        var result = {};
        if (rawCookies) {
            rawCookies = rawCookies.split("; ");
            rawCookies.forEach(function (cookie) {
                var key = cookie.substring(0, cookie.indexOf("=")),
                    value = cookie.substring(cookie.indexOf("=") + 1);

                result[key] = value;
            });
        }
        return result;
    }
};

var client = {
    auth: function (response, DocumentModel, username, password) {
        "use strict";

        DocumentModel.findOne({
            username: username
        }, function (err, doc) {
            if (!err && doc.password === crypt.hash(password, doc.salt)) {
                var token = crypt.token(username);

                database.put(
                    DocumentModel,
                    {"username": username},
                    {"token": token}
                );

                response.setHead(
                    200,
                    "Set-Cookie",
                    ["auth=" + token + ";path=/"]
                );
                response.end();
            } else {
                if (err) { console.log(err); }

                // Send unauthorized status code.
                response.setHead(401);
                response.end();
            }
        });
    },
    deauth: function (response) {
        "use strict";

        response.setHead(
            200,
            "Set-Cookie",
            ["auth=deleted; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT"]
        );
        response.end();
    },
    check: function (DocumentModel, cookie) {
        "use strict";

        cookie = cookies.decode(cookie);
        var query = DocumentModel.findOne({"token": cookie.authToken});
        return query.exec();
    }
};

exports.auth   = client.auth;
exports.deauth = client.deauth;
exports.check  = client.check;
