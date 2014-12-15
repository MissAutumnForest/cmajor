/*jslint node: true*/
"use strict";

var mimeTypes = {
	".html": "text/html",
	".css": "text/css",
	".js": "application/javascript",
	".json": "application/json",
	".svg": "image/svg+xml",
	".png": "image/png",
	".jpg": "image/jpeg",
	".jpeg": "image/jpeg"
};

/*
* Serves a file
*/
function file(response, fileObject) {
	response.writeHeader(200, {"Content-Type": mimeTypes[response.conType]});
	response.end(fileObject, "binary");
}

/*
* Serves text (mostly used with errors)
*/
function text(response, header, message) {
	response.writeHeader(header, {"Content-Type": "text/plain"});
	response.end(message);
}

/*
* Serves JSON (used for RESTful responses)
*/
function json(response, jsonObject) {
	response.writeHeader(200, {"Content-Type": "application/json"});
	response.end(JSON.stringify(jsonObject));
}

/*
* Exports
*/
exports.file = file;
exports.text = text;
exports.json = json;
