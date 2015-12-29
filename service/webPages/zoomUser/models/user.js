// can.fixture('POST /login', function(){
// return {userName:'hello'};
// });

var UserModel = can.Model.extend({
	findOne: 'PUT /login'
}, {
	authenticate: function(inData, success, error) {
		UserModel.findOne(inData, function(user) {
			MailZoom.attr('authUser', user);
			success(user);
		}.bind(this), function() {
			error();
		});
	},

	register: function(inData, success, error) {

		$.ajax({
				method: "POST",
				url: "/register",
				headers: {
					authorization: "<!userId!> <!authToken!>"
				},
				data: inData
			})
			.done(function(inData, textStatus, jqXHR) {
				success(inData)
			})
			.fail(function(inData) {
				error(inData)
			})
			.always(function() {
			console.log("complete registration");
		});

	}
});

MailZoom.models.user = new UserModel();

