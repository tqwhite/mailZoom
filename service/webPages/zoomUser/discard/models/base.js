define([
	'/js/fidgets/core/start/setNameSpace.js',
	'/js/widgets/resources/services/qtools.js',
	'can/model'], function(nameSpace) {
	var scopeObject = window[nameSpace];

	var modelName = nameSpace + '.Models.Base';
	
	can.Model.extend(modelName, {
	}, {});

});



