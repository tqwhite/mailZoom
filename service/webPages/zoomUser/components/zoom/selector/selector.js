var selector = can.Map.extend({});
selector = new selector({
	message: 'Click to Edit.',
	emailLists: MailZoom.attr('emailLists'),
	infoBoxDomObj: '',
	
	makeAddressList:function(listItem){
		var outString='';
		listItem.recipientList.each(function(item){
			outString+=item.emailAdr+'<br/>';
		});
		return outString;
	},

	showListInfo: function(ev, el) {
		var present = this.attr('infoBoxDomObj');
		var _id = $(el).attr('_id');
		var listItem = qtools.getByProperty(this.emailLists, '_id', _id);
		if (!present) {
			this.attr('infoBoxDomObj', $("<div can-click='clearListInfo' class='infoBlock'><b>" + listItem.title +'@mailzoom.com</b><br/><br/><b>'+this.makeAddressList(listItem)+ "</b></div>"));
			$(el).append(this.infoBoxDomObj);
		} else {
			$(this.attr('infoBoxDomObj')).remove();
			this.attr('infoBoxDomObj', '');
		}
		return false;
	},

	editList: function(el, ev) {
		var handler = MailZoom.editListHandler;
		handler($(el).attr('_id'));
	}
});

can.Component.extend({
	tag: 'mz-selector',
	template: can.view('/zoomUser/components/zoom/selector/selector.stache'),
	viewModel: selector
});
/*

		if (!this.infoBoxDomObj) {
			var infoBox = $("<div can-click='clearListInfo' style='position:absolute;top:0px;left:10vw;min-width:15vw;min-height:20vh;background:rgba(100,100,100,.4);'>hello</div>");
			$(el).append(infoBox);
			this.attr('infoBoxDomObj', infoBox);
		} else {
			$(this.attr('infoBoxDomObj')).remove();
			this.attr('infoBoxDomObj', '');
		}
		ev.stopPropagation();
	
	*/
