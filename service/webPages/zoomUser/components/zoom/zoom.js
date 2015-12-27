var zoom = can.Map.extend({});
zoom = new zoom({
	message: 'Simple List Management for Simple People'});

can.Component.extend({
	tag: 'mz-zoom',
	template: can.view('/zoomUser/components/zoom/zoom.stache'),
	viewModel: zoom
});

