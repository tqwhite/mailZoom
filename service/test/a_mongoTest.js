var _ct=require('./_commonTest.js');
var dataAccessPath=_ct.targetPath+'/node_modules/mz-user/';

var MongoClient = require(_ct.targetPath+'node_modules/models/node_modules/mongodb').MongoClient;
var assert = require('assert');
var url = 'mongodb://localhost:27017/test';

describe("Mongo and the driver", function() {
	it ("should connect without error", function(done) {
		MongoClient.connect(url, function(err, db) {
			if(err){
			console.log('ERROR: did you forget to start the Mongo server?');
			}
			assert.equal(null, err);
			db.close();
			done();
		});

	});

	it ("should also work with mongoose", function(done) {

		var mongoose = require(dataAccessPath+'node_modules/mongoose');
		mongoose.connect(url);
		var db = mongoose.connection;
		db.on('error', function() {
			throw ("mongoose failed")
		});
		db.once('open', function() {
			done();
		});
	});
});



