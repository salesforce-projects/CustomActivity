'use strict';

var util = require('util');
/*var jsdom = require("jsdom");
const { JSDOM } = jsdom;
const { window } = new JSDOM();
const { document } = (new JSDOM('')).window;
global.document = document;
var $ = jQuery = require('jquery')(window)*/

// Deps
const Path = require('path');
const JWT = require(Path.join(__dirname, '..', 'lib', 'jwtDecoder.js'));
var util = require('util');
var http = require('https');
var jwt = require('jsonwebtoken');

exports.logExecuteData = [];

function logData(req) { 
    exports.logExecuteData.push({
        body: req.body,
        headers: req.headers,
        trailers: req.trailers,
        method: req.method,
        url: req.url,
        params: req.params,
        query: req.query,
        route: req.route,
        cookies: req.cookies,
        ip: req.ip,
        path: req.path,
        host: req.host,
        fresh: req.fresh,
        stale: req.stale,
        protocol: req.protocol,
        secure: req.secure,
        originalUrl: req.originalUrl
    });
    console.log("body: " + util.inspect(req.body));
    console.log("headers: " + req.headers);
    console.log("trailers: " + req.trailers);
    console.log("method: " + req.method);
    console.log("url: " + req.url);
    console.log("params: " + util.inspect(req.params));
    console.log("query: " + util.inspect(req.query));
    console.log("route: " + req.route);
    console.log("cookies: " + req.cookies);
    console.log("ip: " + req.ip);
    console.log("path: " + req.path);
    console.log("host: " + req.host);
    console.log("fresh: " + req.fresh);
    console.log("stale: " + req.stale);
    console.log("protocol: " + req.protocol);
    console.log("secure: " + req.secure);
    console.log("originalUrl: " + req.originalUrl);
}

/*
 * POST Handler for / route of Activity (this is the edit route).
 */
exports.edit = function (req, res) {
    // Data from the req and put it in an array accessible to the main app.
    //console.log( req.body );
    logData(req);
    res.send(200, 'Edit');
};

/*
 * POST Handler for /save/ route of Activity.
 */
exports.save = function (req, res) {
    // Data from the req and put it in an array accessible to the main app.
    //console.log( req.body );
    logData(req);
    res.send(200, 'Save');
};

/*
 * POST Handler for /execute/ route of Activity.
 */
exports.execute = function (req, res) {
	console.log("teste de log");
	console.log(process.env.jwtSecret);
	
								
	
	
	
	
											
				/*$(document).ready(function () {
					var bodyText = {
					"grant_type":"client_credentials",
					"client_id":"cfly1ym6xx6y34jbqw0idypq",
					"client_secret":"FXaTXByn5UyO7r1equQ8OwxU",
					"variaveis" : "teste primeiro if"
					};
					var $j = jQuery.noConflict();
					var token;
					$j.support.cors = true;
					$j.ajax({
					type: "POST",
					url: process.env.postURL,
					headers: {
						'Origin' : process.env.postURL,
						'Access-Control-Allow-Headers' : 'Content-Type, Authorization, Content-Length, X-Requested-With',
						'Access-Control-Allow-Origin' : '*',
						'Access-Control-Allow-Methods' : 'GET, POST, PUT',
						'Content-Type': 'application/json'
					},
					crossDomain: true,
					data: JSON.stringify(bodyText),
					dataType: 'json',
					success: function(responseData, status, xhr) {
						console.log(responseData);
					},
					error: function(request, status, error) {
						console.log(request.responseText);
					}});
				});*/
	
    // example on how to decode JWT
    JWT(req.body, process.env.jwtSecret, (err, decoded) => {

        /*verification error -> unauthorized request
        if (err) {
            console.error('ERRO AQUI MANO: ' + err);
            return res.status(401).end();
        }*/
		
		
		
			
        if (decoded && decoded.inArguments && decoded.inArguments.length > 0) {
            console.log("entrou no if dos argumentos");
            // decoded in arguments
            var decodedArgs = decoded.inArguments[0];
            
								const data = JSON.stringify({
								  decodedArgs
								})

								const options = {
								  hostname: 'postb.in',
								  path: '/1567075800602-5334982301574',
								  method: 'POST',
								  headers: {
									'Content-Type': 'application/json',
									'Content-Length': data.length
								  }
								}

								const req2 = http.request(options, (res) => {
								  console.log(`statusCode: ${res.statusCode}`)

								  res.on('data', (d) => {
									process.stdout.write(d)
								  })
								}) 

								req2.on('error', (error) => {
								  console.error(error)
								})

								req2.write(data);
								req2.end();
            logData(req);
            res.send(200, 'Execute');
        } else {
            console.error('inArguments invalid.');
            return res.status(400).end();
        }
    });
};


/*
 * POST Handler for /publish/ route of Activity.
 */
exports.publish = function (req, res) {
    // Data from the req and put it in an array accessible to the main app.
    //console.log( req.body );
    logData(req);
    res.send(200, 'Publish');
};

/*
 * POST Handler for /validate/ route of Activity.
 */
exports.validate = function (req, res) {
    // Data from the req and put it in an array accessible to the main app.
    //console.log( req.body );
    logData(req);
    res.send(200, 'Validate');
};