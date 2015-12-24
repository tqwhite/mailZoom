can.Component.extend({
	tag: 'mz-register',
	template: can.view('/zoomUser/components/register/register.stache'),
	viewModel: {
		message: 'Hello from Mail Zoom Register',
		goToLogin: function() {
			can.route.attr('page', 'login');
		}
	}
});
