/*jslint node: true*/
"use strict";

var mongoose = require("mongoose"),
res = require("./response");

function login(username, password, server, database) {
  var dbString = "mongodb://" + username + ":" + password + "@" + server + "/" + database;
  mongoose.connect(dbString, function (error) {
    if (error) {
      console.log("Couldn't Log Into Database: ");
      console.log(error);
    } else {
      console.log("Successfully Logged Into Database!");
    }
  });
}

function DocumentModel(name, data) {
  return mongoose.model(name, mongoose.Schema(data));
}

function get(response, DocumentModel, query) {
  DocumentModel.find(query, function (err, data) {
    if (err) { console.log(err); }
    res.json(response, data);
  });
}

function post(DocumentModel, data) {
  var documentModel = new DocumentModel(data);
  documentModel.save(function (err) {
    if (err) { console.log(err); }
  });
}

exports.login = login;
exports.DocumentModel = DocumentModel;
exports.get = get;
exports.post = post;
