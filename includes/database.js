/*jslint node: true*/
"use strict";

var mongoose = require("mongoose"),
    res = require("./response"),
    auth = require("./auth");

/* ### UTILITY FUNCTIONS ### */

// Basically decode the cookies.
function digestCookies(cookies){
  var result = {};
  if(cookies){
    cookies = cookies.split("; ");
    cookies.forEach(function (dta) {
      var key = dta.substring(0, dta.indexOf("=")),
      value = dta.substring(dta.indexOf("=") + 1);
      result[key] = value;
    });
  }
  return result;
}

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

function put(DocumentModel, query, data){
  DocumentModel.update(query, data, function (err, numAffect, raw) {
    if (err) { console.log(err); }
  });
}

/* USER FUNCTIONS */

// Check if the user and password match, if so gen auth token and set the cookie.
function signIn(response, DocumentModel, userData){
  DocumentModel.findOne({username: userData.username}, function(err, doc){
    if (err) { console.log(err); }
    if (doc && doc.password == auth.hashPassword(userData.password, doc.salt)) {
      var token = auth.genToken(userData.username);

      put(DocumentModel, {"username": userData.username}, {"token": token});
      response.setHeader("Set-Cookie", ["authToken=" + token + ";path=/"]);
      response.end("success");
    } else {
      response.end("Username Or Password Incorrect!");
    }
  });
}

// Delete the auth token cookie (loggin the user out)
function signOut(response) {
  response.setHeader(
    "Set-Cookie",
    ["authToken=deleted; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT"]);
  response.end("success");
}

// Check if a token exists (aka a user is logged in).
function checkToken(DocumentModel, cookie){
  cookie = digestCookies(cookie);
  var query = DocumentModel.findOne({"token": cookie.authToken});
  return query.exec();
}

exports.login = login;
exports.DocumentModel = DocumentModel;
exports.get = get;
exports.put = put;
exports.post = post;

exports.signIn = signIn;
exports.signOut = signOut;
exports.checkToken = checkToken;
