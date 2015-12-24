define(['can/map'
], function() {

return function(nameSpaceName, stateContainerName) {

var mapStarter=can.Map.extend(nameSpaceName+'.'+stateContainerName, {

}, {}); //

	window[nameSpaceName][stateContainerName]=new mapStarter();
	window[nameSpaceName][stateContainerName].attr('initialization', 'done');
	return window[nameSpaceName][stateContainerName];
}

});
