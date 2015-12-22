'use strict';
var qtools = require('qtools'),
	qtools = new qtools(module),
	events = require('events'),
	util = require('util');


var express = require('express');
var app = express();

//START OF moduleFunction() ============================================================

var moduleFunction = function(args) {
	events.EventEmitter.call(this);
	this.forceEvent = forceEvent;
	this.args = args;
	this.metaData = {};
	this.addMeta = function(name, data) {
		this.metaData[name] = data;
	}

	// 	qtools.validateProperties({
	// 		subject: args || {},
	// 		targetScope: this, //will add listed items to targetScope
	// 		propList: [
	// 			{
	// 				name: 'placeholder',
	// 				optional: true
	// 			}
	// 		]
	// 	});

	var self = this,
		forceEvent = function(eventName, outData) {
			this.emit(eventName, {
				eventName: eventName,
				data: outData
			});
		};

//LOCAL FUNCTIONS ====================================

var dummyDataSource=function(){
	return {information:"placeholder"}
}

//METHODS AND PROPERTIES ====================================

//INITIALIZATION ====================================

//SET UP SERVER =======================================================

var router = express.Router();
app.use('/', router);

var config={port:'5000'};

//START SERVER AUTHENTICATION =======================================================

//router.use(function(req, res, next) {});

//START SERVER ROUTING FUNCTION =======================================================

router.get('', function(req, res, next) {
	console.log('access from empty path/get');
	
	res.set({
	'content-type': 'application/json;charset=ISO-8859-1',
	 messageid: qtools.newGuid(),
	 messagetype: 'RESPONSE',
	 navigationcount: '100',
	 navigationpage: '1',
	 navigationpagesize: '10',
	 responsesource: 'PROVIDER',
	 connection: 'Close'
	});
	res.json({
		status: 'hello from {empty path}/get',
		body: req.body,
		query: req.query,
		data:dummyDataSource('empty path')
	});
});
//START SERVER ROUTE GROUP (ping) =======================================================

router.get('/ping', function(req, res, next) {
	console.log('/ping/get');
	
	res.json({
		status: 'hello from ping/get',
		body: req.body,
		query: req.query,
		data:dummyDataSource('get')
	});
});
     
router.post('/ping', function(req, res, next) {
	console.log('/ping/post');
	
	res.json({
		status: 'hello from ping/post',
		body: req.body,
		query: req.query,
		data:dummyDataSource('post')
	});
});

//START SERVER =======================================================

app.listen(config.port);

qtools.message('Magic happens on port ' + config.port);

	return this;
};

//END OF moduleFunction() ============================================================

util.inherits(moduleFunction, events.EventEmitter);
module.exports = new moduleFunction();

//test urls
//curl 'http://localhost:9000/ping' --data 'x=y'
//curl 'http://localhost:9000/ping'
//curl 'http://localhost:9000/'

