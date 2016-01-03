var _ct = require('./_commonTest.js');
var qtools = _ct.qtools;

var dataAccess = require('models/mz-user');
dataAccess = new dataAccess({
	mzMongoUrl: process.env.mzMongoUrl,
	databaseName: 'TestZoom'
});

var assert = require('assert');

var testUserName = 'tq';
var testUser = {
	displayName: 'tqwhite',
	userName: testUserName,
	emailAdr: 'tq@justkidding.com',
	password: 'tqpw'
};

var testRecipient = {
	emailAdr: 'debbie@tqwhite.com'
};

describe("User Data Model", function() {
	after(function() {
		dataAccess.deleteAllForTest(function(err, result) {
			if (err) {
				qtools.dump({
					"err": err
				});
			}
		})
	})
	it ("should exist", function(done) {

		assert.equal('hello', dataAccess.ping('hello'));
		done();

	});

	it ("should refuse to register with no userName", function(done) {
		badData = qtools.clone(testUser);
		delete badData.userName;
		dataAccess.registerUser(badData, function(err, result) {
			assert(err);
			!err ? done('did not detect missing userName') : done();;
		});

	});

	it ("should refuse to register with no password", function(done) {
		badData = qtools.clone(testUser);
		delete badData.password;
		dataAccess.registerUser(badData, function(err, result) {
			assert(err);
			!err ? done('did not detect missing password') : done();;
		});

	});

	it ("should register a correct user", function(done) {
		assert.doesNotThrow(function() {
			dataAccess.registerUser(testUser, function(err, result) {
				err?done(err):done();
			});
		});
	});

	it ("should retrieve the user with added user roles", function(done) {

		dataAccess.getUser(testUserName, 'lean', function(err, result) {
			if (err) {
				done(err)
				return;
			}
			var message = '';


			var comparisonData = qtools.clone(testUser);
			comparisonData.roles = [{
					role: 'admin'
				}, {
					role: 'recipient'
				}];

			if (!err) {
				for (var i in comparisonData) {}

				var subKeyReference = {
					roles: {
						possibly: 'role',
						reference: 'role'
					}
				};
				message = _ct.compareObjects(comparisonData, result, subKeyReference);


			}
			if (message) {
				done(new Error(message));
				return;
			}
			done();
		});

	});

	it ("should authenticate the user when the password is correct", function(done) {

		dataAccess.authenticate(testUser, function(err, result) {
			assert(result);
			err ? done(err) : done();;
		});

	});

	it ("should reject authentication when the password is incorrect", function(done) {
		var badData = qtools.clone(testUser);
		badData.password = 'xxx';
		dataAccess.authenticate(badData, function(err, result) {
			assert(err);
			!err ? done('did not detect bad password') : done();;
		});

	});

	it ("should add the recipient role without an error", function(done) {
		assert.doesNotThrow(function() {
			dataAccess.addRecipientRole(testRecipient, function(err, result) {
				err ? done(err) : done();
			});
		});
	});

	it ("should add the recipient role again without an error", function(done) {
		assert.doesNotThrow(function() {
			dataAccess.addRecipientRole(testRecipient, function(err, result) {
				err ? done(err) : done();
			});
		});
	});

	it ("should still only have one recipient role entry", function(done) {
		assert.doesNotThrow(function() {
			dataAccess.countRecipients({userName:testUserName}, function(err, result) {
				assert.equal(result, 1);
				err ? done(err) : done();
			});
		});
	});
});



