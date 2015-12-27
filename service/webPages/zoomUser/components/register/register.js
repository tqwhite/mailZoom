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

			MailZoom.models.user.register({
				userName: this.proposedUser.userName,
				password: this.proposedUser.password,
				displayName: this.proposedUser.displayName
			}, function(user) {
				this.attr('title', "Thank you, "+this.proposedUser.displayName);
				can.route.attr('page', 'register');
				
				setTimeout(function(){
					can.route.attr('page', 'zoom');
				}, 2000);
				
			}.bind(this), function(user) {
				this.attr('title', "Registration rejected by Server");
			}.bind(this)
			)

		}
	}
});
