
var _ct = require('./_commonTest.js');
var qtools = _ct.qtools;

var dataAccess = require('models/mz-mailing-lists');
dataAccess = new dataAccess({
	mzMongoUrl: process.env.mzMongoUrl,
	databaseName: 'TestZoom'
});

var assert = require('assert');

var testTitle = 'tq';
var testMailingList = {
	title: testTitle,
	ownerEmailAdr: 'test1@domain.com'
};

var testRecipient1 = {
	title: testTitle,
	emailAdr: 'test1@domain.com'
}

var testRecipient2 = {
	title: testTitle,
	emailAdr: 'test2@domain.com'
};

var comparisonListWithRecipients = qtools.clone(testMailingList);
comparisonListWithRecipients.recipients = [];
comparisonListWithRecipients.recipients.push({
	emailAdr: testRecipient1.emailAdr
});
comparisonListWithRecipients.recipients.push({
	emailAdr: testRecipient2.emailAdr
});

var secondCompleteListWithDifferentTitle=qtools.clone(comparisonListWithRecipients);
secondCompleteListWithDifferentTitle.title='second list'

describe("Mailing List Data Model", function() {
	after(function() {
		dataAccess.deleteAllForTest(function(err, result) {
			if (err) {
				qtools.dump({
					"ERR": err
				});
			}
		})
	})
	it ("should exist", function(done) {

		assert.equal('hello', dataAccess.ping('hello'));
		done();

	});

	it ("should reject a list with no email address", function(done) {
		badData = qtools.clone(testMailingList);
		delete badData.ownerEmailAdr;
		dataAccess.createList(badData, function(err, result) {
			assert(err);
			!err ? done('did not detect missing userName') : done();;
		});
	});

	it ("should create a new list", function(done) {
		assert.doesNotThrow(function() {
			dataAccess.createList(testMailingList, function(err, result) {
				done(err);
			});
		});
	});

	it ("should retrieve the list correctly", function(done) {

		dataAccess.getList(testMailingList.title, 'lean', function(err, result) {
			if (err) {
				done(err)
				return;
			}

			var comparisonData = qtools.clone(testMailingList);

			message = '';
			if (!err) {
				
			message=_ct.compareObjects(comparisonData, result, {noSubArraysExpected:true});
			}
			if (message) {
				done(new Error(message));
				return;
			}
			done();
		});

	});

	it ("should add a recipient", function(done) {
		assert.doesNotThrow(function() {
			dataAccess.addRecipient(testRecipient1, function(err, result) {
				done(err);
			});
		});
	});

	it ("should add a second recipient", function(done) {
		assert.doesNotThrow(function() {
			dataAccess.addRecipient(testRecipient2, function(err, result) {
				done(err);
			});
		});
	});

	it ("should retrieve the whole thing (recipients and all) correctly", function(done) {
		dataAccess.getList(testTitle, 'fat', function(err, result) {
			if (err) {
				done(err)
				return;
			}

			var subKeyReference={
				recipients:{possibly:'emailAdr',
							reference:'emailAdr'
							}
			};
			message=_ct.compareObjects(comparisonListWithRecipients, result, subKeyReference);

			if (message) {
				done(new Error(message));
				return;
			}
			done();

		});
	});

});

