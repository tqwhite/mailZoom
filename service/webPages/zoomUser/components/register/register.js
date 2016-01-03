can.Component.extend({
	tag: 'mz-register',
	template: can.view('/zoomUser/components/register/register.stache'),
	viewModel: {
		title: 'Create User Account Information',
		proposedUser: {},
		goToLogin: function() {
			can.route.attr('page', 'login');
		},
		submitRegistration: function(ev, el) {
			MailZoom.models.user.register(this.proposedUser._data, function(user) {
				this.attr('title', "Thank you, " + this.proposedUser.displayName);
				can.route.attr('page', 'register');

				setTimeout(function() {
					can.route.attr('page', 'zoom');
				}, 2000);

			}.bind(this), function(err) {

				var errNo = err.responseText.match(/^(.*?) /);
				switch (errNo[1]) {
					case 'E11000':
						var fieldName = err.responseText.match(/index: ([a-zA-Z]+).*\{.*:(.*?)\}/);

						humanMessage = "Duplicate " + fieldName[1] + " is not allowed. Value " + fieldName[2] + " is already in use";

						break;
					default:
						humanMessage = err.responseText;
						break;
				}


				//	E11000 duplicate key error collection: MailZoom.users index: userName_1 dup key: { : "tq" }

				this.attr('title', "Registration rejected by Server: " + humanMessage);
			}.bind(this)
			)

		}
	}
});

