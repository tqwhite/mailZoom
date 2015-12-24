define([
	'/js/fidgets/core/start/setNameSpace.js',
	'/js/fidgets/core/state/state.js',
], function(nameSpaceName, stateInit) {
	//note: the directory for the canjs stuff is set by the call in the layout, foundation-default.phtml
/*

This is not longer called by anyone and may need to go away.

*/

console.log('I do not think that fidgets/core/start is being used.');
	var stateContainerName = 'State';

	var stateContainer = stateInit(nameSpaceName, stateContainerName);

	var serverControl = Fidgets.serverInterface.serverControl();


	for (var i = 0, len = serverControl.length; i < len; i++) {
		var element = serverControl[i];
		console.dir({
			message: 'initializing this list of js controls is not yet implemented in fidgets.core.start.fidgets.js',
			serverControl: element
		});
	}




	return Fidgets.State;

});




