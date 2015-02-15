# CMajor

[![NPM Version](http://img.shields.io/npm/v/cmajor.svg?style=flat)](https://npmjs.org/package/cmajor)
[![Dependency Status](https://david-dm.org/staticinteger/cmajor.svg)](https://david-dm.org/staticinteger/cmajor)
[![Downloads Per Month](https://img.shields.io/npm/dm/cmajor.svg)](https://npmjs.org/package/cmajor)

CMajor is a RESTful API framework for single page applications using [NodeJS](http://nodejs.org/) and [MongoDB](http://www.mongodb.org/)

## Support

- [Bug Reports](https://github.com/staticinteger/cmajor/issues/)

## Installation

 First install [node.js](http://nodejs.org/) and [mongodb](http://www.mongodb.org/downloads). Then:

```sh
$ npm install cmajor
```

## First Steps

Getting started with CMajor is super easy! Here is how you make a simple http server which has a RESTful API GET endpoint...

```sh
var app = require("cmajor");

app.get("/my/first/endpoint", function (request, response) {
   app.respond.text(response, "Hello RESTful World!", 200);
});

app.start(false, 8080);
```

It's as simple as that! CMajor takes care of serving files automatically so you don't have to worry about implementing that yourself! When using CMajor we put all of our client side code in a folder called "app". CMajor automatically goes to this folder when looking for a file the client has requested. This separates the server file system from the files which should be available to the client. Not only is this a way to make front-end code portable, it also protects you from anyone sniffing around your directory tree!

Let's take a closer - line by line - look at what is going on here!

```sh
var app = require("cmajor");
```

The first thing we need to do is create a variable, in this case "app", and load the CMajor framework into it. This gives us convenient access to CMajor's functions.

```sh
app.get("/my/first/endpoint", function (request, response) {
```

Here we are creating a "GET" request listener which listens for any HTTP GET requests on the "/my/first/endpoint" route. It is important that we pass in the "request" and "response" objects in our callback. This gives us access to all the raw data we need to talk with the client. Don't worry too much about what goes on in the background with these objects, CMajor does all of the hard work for you!

```sh
app.respond.text(response, "Hello RESTful World!", 200);
```

What we are doing here is telling CMajor to send a simple text response back to the client. We need to pass it the "response" object so it has access to the data needed to talk to the client. The second argument is the text we want to send to the client's browser. The third, and last, argument is the HTTP status code; 200 meaning "Everything went OK!".

```sh
app.start(false, 8080);
```

Lastly, we need to start the HTTP server using CMajors "start" function. The first argument tells CMajor if you want to run a secure HTTPS server or a regular HTTP server. In this case we are going to start a regular HTTP server. If the first argument were "true" you would need to add a third argument giving CMajor access to your SSL and CA certificates.

That's it! It's that simple to get started with the CMajor framework! If you would like to learn everything you can do with CMajor, check out our Wiki Page for more information.

## License

[MIT](LICENSE)
