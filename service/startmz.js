'use strict';
var qtools = require('qtools'),
	qtools = new qtools(module),
	events = require('events'),
	util = require('util');

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



	//VALIDATION ====================================

	if (!process.env.mzPort) {
		console.log("there must be an environment variable: mzPort to set the service port for MailZoom");
		throw ("there must be an environment variable: mzPort to set the service port for MailZoom");
	}
	if (!process.env.mzBaseUrl) {
		console.log("there must be an environment variable: mzBaseUrl, eg, demo.mailzoom.net, to choose the correct vhost");
		throw ("there must be an environment variable: mzBaseUrl, eg, demo.mailzoom.net, to choose the correct vhost");
	}
	if (!process.env.mzPassportSecret) {
		console.log("there must be an environment variable: mzPassportSecret, eg, 'some crypto phrase', to secure cookies");
		throw ("there must be an environment variable: mzPassportSecret, eg, 'some crypto phrase', to secure cookies");
	}

	//LOCAL FUNCTIONS ====================================

	var userAccess = require('models/mz-user');
	userAccess = new userAccess({
		mzMongoUrl: process.env.mzMongoUrl,
		databaseName: 'MailZoom'
	});

	var listAccess = require('models/mz-mailing-lists');
	listAccess = new listAccess({
		mzMongoUrl: process.env.mzMongoUrl,
		databaseName: 'MailZoom'
	});

	var webUser = require('mz-web-user');
	webUser = new webUser({
		staticPagesDirectoryPath: qtools.employerFilePath(module) + '/webPages/',
		mzPort: process.env.mzPort,
		mzBaseUrl: process.env.mzBaseUrl,
		userAccess:userAccess,
		listAccess:listAccess,
		mzPassportSecret:process.env.mzPassportSecret
	});
	webUser.startWebListener();


	//METHODS AND PROPERTIES ====================================



	//INITIALIZATION ====================================




	return this;
};

//END OF moduleFunction() ============================================================

util.inherits(moduleFunction, events.EventEmitter);
module.exports = moduleFunction;

var tmp = new moduleFunction();






