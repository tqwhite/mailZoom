// can.fixture('POST /login', function(){
// return {userName:'hello'};
// });

var UserModel = can.Model.extend({
	findOne: 'POST /login'
}, {
	authenticate: function(inData, callback) {
		UserModel.findOne(inData, function(user) {
			MailZoom.attr('authUser', user);
			callback(user);
		}.bind(this));
	}
});

MailZoom.models.user = new UserModel();
