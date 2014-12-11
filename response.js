/*jslint node: true*/
"use strict";

/*
 * Serves a file
 */
function file(response, fileObject) {
	response.writeHeader(200);
	response.write(fileObject, "binary");
	response.end();
}

/*
 * Serves text (mostly used with errors)
 */
function text(response, header, message) {
	response.writeHeader(header, {"Content-Type": "text/plain"});
	response.write(message);
	response.end();
}

/*
 * Serves JSON (used for RESTful responses)
 */
function json(response, jsonObject) {
	response.writeHeader(200, {"Content-Type": "application/json"});
	response.write(JSON.stringify(jsonObject));
	response.end();
}

/*
 * Exports
 */
exports.file = file;
exports.text = text;
exports.json = json;