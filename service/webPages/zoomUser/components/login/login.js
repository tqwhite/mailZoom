can.Component.extend({
	tag: 'mz-login',
	template: can.view('/zoomUser/components/login/login.stache'),
	viewModel: {
		title: 'Log into Mail Zoom',
		wantRemember: false, //init from some model that looks at cookie

		goToRegister: function() {
			can.route.attr('page', 'register');
		},
		rememberMe: function(ev, el) {
			this.attr('wantRemember', el.prop('checked'));
		},
		submitLogin: function(ev, el) {

			MailZoom.models.user.authenticate({}, function(user) {
				can.route.attr('page', 'zoom');
			}.bind(this))

		}
	}
});


