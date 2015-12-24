$(function () {
    var AppState = can.Map.extend({});
    var appState = new AppState();
    // Bind the application state to the root of the application
    $('body').html(can.view('/zoomUser/core/startup.stache', appState));
    
    // Set up the routes
    can.route('register', { page: 'register' });
    can.route('login', { page: 'login' });
    can.route('forgot', { page: 'forgot' });
    can.route('reset', { page: 'reset' });
    can.route('zoom', { page: 'zoom' });
    
    $('body').on('click', 'a[href="javascript://"]', function(ev) {
        ev.preventDefault();
    });
    
    // Bind the application state to the can.route
    can.route.map(appState);
    can.route.ready();
    
    appState.attr('page', 'login');
//     appState.bind('change', function(ev, prop, change, newVal, oldVal) {
//         alert('Changed the “' + prop + '” property from “' + oldVal + '” to “' + newVal + '”.');
//     });
});