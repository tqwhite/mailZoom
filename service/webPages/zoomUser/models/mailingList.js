// can.fixture('POST /login', function(){
// return {userName:'hello'};
// });

var MailingList = can.Model.extend({
}, {

	save: function(inData, success, error) {
		$.ajax({
				method: "POST",
				url: "/mailingList",
				// 				headers: {
				// 					authorization: "<!userId!> <!authToken!>"
				// 				},
				data: {
					title: inData.attr('title'),
					_id: inData.attr('_id')
				}
			})
			.done(function(returnData, textStatus, jqXHR) {
				inData.attr('_id', returnData._id);
				inData.attr('ownerEmailAdr', returnData.ownerEmailAdr);
				success(returnData)
			})
			.fail(function(returnData) {
				error(returnData)
			})
			.always(function() {});

	}
});

MailZoom.models.mailingList = new MailingList();

