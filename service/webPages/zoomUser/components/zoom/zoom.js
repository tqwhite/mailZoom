can.Component.extend({
	tag: 'mz-zoom',
	template: can.view('/zoomUser/components/zoom/zoom.stache'),
	viewModel: {
		message: 'Time to Zoom',
		goToLogin: function() {
			can.route.attr('page', 'login');
		}
	}
});

