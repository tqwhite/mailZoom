// can.fixture('POST /login', function(){
// return {userName:'hello'};
// });

var UserModel = can.Model.extend({
	findOne: 'POST /login'
}, {
	authenticate: function(inData, success, error) {
		UserModel.findOne(inData, function(user) {
			MailZoom.attr('authUser', user);
			success(user);
		}.bind(this), function() {
			error();
		});
	}
});

MailZoom.models.user = new UserModel();


