// can.fixture('POST /login', function(){
// return {userName:'hello'};
// });

var UserModel = can.Model.extend({
}, {
	getCookieUserInfo: function(inData, success, error) {

		$.ajax({
				method: "GET",
				url: "/getCookieUserInfo",
				// 				headers: {
				// 					authorization: "<!userId!> <!authToken!>"
				// 				},
				data: {}
			})
			.done(function(inData, textStatus, jqXHR) {

				MailZoom.attr('authUser', inData.user);
				success(inData)
			})
			.fail(function(inData) {
				error(inData)
			})
			.always(function() {});

	},
	authenticate: function(inData, success, error) {

		$.ajax({
				method: "PUT",
				url: "/login",
				// 				headers: {
				// 					authorization: "<!userId!> <!authToken!>"
				// 				},
				data: inData
			})
			.done(function(inData, textStatus, jqXHR) {

				MailZoom.attr('authUser', inData.user);
				success(inData)
			})
			.fail(function(inData) {
				error(inData)
			})
			.always(function() {});

	},

	register: function(inData, success, error) {

		$.ajax({
				method: "POST",
				url: "/register",
				// 				headers: {
				// 					authorization: "<!userId!> <!authToken!>"
				// 				},
				data: inData
			})
			.done(function(inData, textStatus, jqXHR) {
				success(inData)
			})
			.fail(function(inData) {
				error(inData)
			})
			.always(function() {});

	}
});

MailZoom.models.user = new UserModel();


