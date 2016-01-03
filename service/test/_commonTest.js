'use strict';
var qtools = require('qtools'),
	qtools = new qtools(module);


	var compareObjects = function(referenceObject, possiblyIncorrectObject, subKeyReference) {
		var message = '';
		if (qtools.toType(possiblyIncorrectObject) != 'object') {
			message = "retrieved item is not an object";
			return message;
		}

		var referenceData = qtools.clone(referenceObject);
		var keyList = Object.keys(referenceData);

		for (var i = 0, len = keyList.length; i < len; i++) {
			var comparisonKey = keyList[i];

			var referenceItem = referenceData[comparisonKey];
			var possiblyIncorrectItem = possiblyIncorrectObject[comparisonKey];

			if (qtools.toType(referenceItem) == 'array') {

				for (var j = 0, len = referenceItem.length; j < len; j++) {
					var referenceSubItem = referenceItem[j];
					var possiblyIncorrectSubItem = possiblyIncorrectItem[j];
					var possiblySubKey = subKeyReference[comparisonKey].possibly;
					var referenceSubKey = subKeyReference[comparisonKey].reference;

					switch (qtools.toType(referenceSubItem)) {
						case 'object':
							var tmp = qtools.getByProperty(possiblyIncorrectSubItem, possiblySubKey, referenceSubItem[referenceSubKey]);
							var foundCorrectValue = typeof (tmp) != 'defined';

							break;
						case 'array':
							//this is untested. I wrote it by mistake and didn't have a working example to try it on
							var foundCorrectValue = possiblyIncorrectSubItem.indexOf(referenceSubItem[referenceSubKey]) > -1;
							break;
						default:
							throw new Error("_ct.compareObjects says, got a subElement data type I don't know about");
							return;
					}
					if (!foundCorrectValue) {
						message += '\nbad element: ' + comparisonKey + '/' + referenceSubKey + ' value= ' + referenceSubItem[referenceSubKey] + ' is missing, ';
					}

				}

			} else if (qtools.toType(referenceSubItem) == 'object') {
				//I don't have this right now but want a place for when I do
			} else {
				if (!possiblyIncorrectItem || referenceItem !== possiblyIncorrectItem) {
					message += 'bad element: ' + comparisonKey + ' should have value ' + referenceItem + ' actually is ' + possiblyIncorrectItem + ', ';
				}
			}

		}
		return message;
	}

module.exports = {

	qtools:qtools,
	targetPath:process.env.mzProjectPath+'/code/service/',
	compareObjects:compareObjects
};




