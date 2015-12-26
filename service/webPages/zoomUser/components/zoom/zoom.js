var zoom=can.Map.extend({});
zoom=new zoom({
		message: 'Time to Zoom',
		goToLogin: function() {
			can.route.attr('page', 'login');
		}
	});

can.Component.extend({
	tag: 'mz-zoom',
	template: can.view('/zoomUser/components/zoom/zoom.stache'),
	viewModel: zoom
});

