
var MailZoom = can.Map.extend({});
var MailZoom = new MailZoom({
	define: {
		authUser: {
			serialize: false //THIS IS SUPPOSED TO SUPRESS THIS IN THE HASH!!		
		}
	},
	emailLists:new can.List([])
});
MailZoom.models = {};

$(function() {

	$('body').on('click', 'a[href="javascript://"]', function(ev) {
		ev.preventDefault();
	});

	// Set up the routes
	can.route('register', {
		page: 'register'
	});
	can.route('login', {
		page: 'login'
	});
	can.route('forgot', {
		page: 'forgot'
	});
	can.route('reset', {
		page: 'reset'
	});
	can.route('zoom', {
		page: 'zoom'
	});

	can.route.map(MailZoom); // Bind the application state to the can.route
	can.route.ready();

	// Bind the application state to the root of the application
	$('body').html(can.view('/zoomUser/core/startup.stache', MailZoom));

	MailZoom.attr('page', 'register');

});

MailZoom.getByAttribute=function(inList, propertyName, propertyValue){
	var len=inList.length, inx=0;
	for (inx=0; inx<len; inx++){
		if (inList[inx].attr(propertyName)==propertyValue){ return inList[inx];	}
	}
	return null;
}

