var endpoint = require("./includes/endpoint"),
    server   = require("./includes/server"),
    client   = require("./includes/client"),
    respond  = require("./includes/respond"),
    database = require("./includes/database");

// ### Access to Core Server.
exports.start    = server.start;

// ### Access to REST Functions.
exports.get      = endpoint.get;
exports.put      = endpoint.put;
exports.post     = endpoint.post;
exports.delete   = endpoint.delete;

// ### Access to Response Functions.
exports.respond  = respond;

// ### Access to Database Functions.
exports.database = database;

// ### Access to Authentication Functions.
exports.auth     = client.auth;
exports.deauth   = client.deauth;
exports.check    = client.check;
